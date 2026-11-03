import { NextResponse } from "next/server";
import { allow, clientIp } from "@/lib/rate-limit";
import { normalizeSaudiMobile, normalizeTrackingCode } from "@/lib/requests";
import { logActivity } from "@/lib/activity";
import { findForTracking } from "@/lib/store";

export async function POST(request: Request) {
  // Tracking needs both the code and the phone, and is rate-limited, so
  // nobody can look up another family's request by guessing.
  const ip = clientIp(request);
  if (!allow(`track:${ip}`, 20, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const code = typeof body.code === "string" ? normalizeTrackingCode(body.code) : "";
  const phone = typeof body.phone === "string" ? normalizeSaudiMobile(body.phone) : null;
  if (!/^ARQ-\d{2}-[2-9A-HJ-NP-Z]{6}$/.test(code) || !phone) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  try {
    const result = await findForTracking(code, phone);
    await logActivity({ actor: "customer", kind: "tracking", message: result ? `Tracked ${code} (stage ${result.currentStage})` : `Tracking lookup failed for ${code}`, entity: "request", entityId: code, ip });
    if (!result) return NextResponse.json({ error: "not_found" }, { status: 404 });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Tracking lookup failed", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
