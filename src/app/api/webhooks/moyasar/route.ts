import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { logActivity } from "@/lib/activity";
import { adminEnabled } from "@/lib/features";
import { getLinkByCode, verifyAndApply } from "@/lib/payments";
import { getMoyasarConfig } from "@/lib/settings";

const same = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

/**
 * Moyasar calls this when a payment changes. The body is only used to find the payment: the
 * payment is then fetched from Moyasar with our secret key, so a forged call cannot mark anything paid.
 */
export async function POST(request: Request) {
  if (!adminEnabled()) return new Response(null, { status: 404 });
  const { webhookSecret } = await getMoyasarConfig();
  if (!webhookSecret) return NextResponse.json({ error: "webhook_not_configured" }, { status: 503 });

  let body: { secret_token?: string; type?: string; data?: { id?: string; metadata?: Record<string, string> | null } };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  if (typeof body.secret_token !== "string" || !same(body.secret_token, webhookSecret)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const paymentId = body.data?.id;
  const code = body.data?.metadata?.link_code;
  if (!paymentId || !code) return NextResponse.json({ ok: true, ignored: true });

  const link = await getLinkByCode(code.toUpperCase());
  if (!link) return NextResponse.json({ ok: true, ignored: true });

  const outcome = await verifyAndApply(link, paymentId, "moyasar-webhook");
  await logActivity({ actor: "moyasar-webhook", kind: "payment", message: `Webhook ${body.type ?? "event"} for ${link.code}: ${outcome.state}`, entity: "payment_link", entityId: link.id });
  // A temporary failure to reach Moyasar returns 502 so that Moyasar retries the webhook.
  return NextResponse.json({ ok: outcome.state !== "error", state: outcome.state }, { status: outcome.state === "error" ? 502 : 200 });
}
