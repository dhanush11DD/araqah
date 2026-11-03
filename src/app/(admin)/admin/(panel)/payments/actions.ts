"use server";

import { redirect } from "next/navigation";
import { backWith } from "@/components/admin/ui";
import { logActivity } from "@/lib/activity";
import { requireAdmin } from "@/lib/auth";
import { sendTemplate } from "@/lib/mail";
import { cancelLink, createLink, formatSar, getLink, markEmailed, payUrl, verifyAndApply, type PaymentLink } from "@/lib/payments";
import { normalizeSaudiMobile } from "@/lib/requests";
import { getRequestByCode } from "@/lib/store";
import { fmtDate } from "@/lib/format";

const str = (f: FormData, k: string, max: number) => String(f.get(k) ?? "").trim().slice(0, max);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function emailLink(link: PaymentLink, actor: string) {
  if (!link.customerEmail) return { ok: false as const, error: "This link has no customer email." };
  const result = await sendTemplate(
    "payment_link",
    link.customerEmail,
    link.locale,
    {
      name: link.customerName,
      amount: formatSar(link.amountHalalas),
      description: link.description,
      paymentLink: payUrl(link),
      expires: link.expiresAt ? (link.locale === "ar" ? `هذا الرابط صالح حتى ${fmtDate(link.expiresAt)}.` : `This link is valid until ${fmtDate(link.expiresAt)}.`) : "",
    },
    { actor, entity: "payment_link", entityId: link.id, force: true },
  );
  if (result.ok) await markEmailed(link.id);
  return result;
}

export async function createLinkAction(formData: FormData) {
  const user = await requireAdmin();
  const back = (msg: string) => redirect(backWith(`/admin/payments/new${formData.get("request") ? `?request=${encodeURIComponent(str(formData, "request", 20))}` : ""}`, "err", msg));
  const amount = Number(str(formData, "amount", 12).replace(/,/g, ""));
  if (!Number.isFinite(amount) || amount < 1 || amount > 1_000_000) back("Enter an amount between 1 and 1,000,000 SAR.");
  const description = str(formData, "description", 250);
  const customerName = str(formData, "name", 120);
  if (!description || !customerName) back("Enter the customer’s name and what the payment is for.");
  const email = str(formData, "email", 190).toLowerCase();
  if (email && !EMAIL.test(email)) back("That email address does not look right.");
  const phoneRaw = str(formData, "phone", 32);
  const phone = phoneRaw ? normalizeSaudiMobile(phoneRaw) : null;
  if (phoneRaw && !phone) back("Enter a Saudi mobile number starting with 05, or leave it blank.");

  let requestId: number | null = null;
  const code = str(formData, "request", 20).toUpperCase();
  if (code) {
    const r = await getRequestByCode(code);
    if (!r) back(`No request has the number ${code}.`);
    requestId = r!.id;
  }
  const days = Number(formData.get("expires"));
  const link = await createLink({
    amountHalalas: Math.round(amount * 100),
    description,
    customerName,
    customerPhone: phone,
    customerEmail: email || null,
    requestId,
    locale: formData.get("locale") === "en" ? "en" : "ar",
    expiresInDays: days > 0 ? days : null,
    createdBy: user.email,
  });
  await logActivity({ actor: user.email, kind: "payment", message: `Created payment link ${link.code} for ${formatSar(link.amountHalalas)} (${customerName})`, entity: "payment_link", entityId: link.id });

  let message = "Payment link created.";
  if (formData.get("sendNow") === "on") {
    const sent = await emailLink(link, user.email);
    if (sent.ok) message += ` Emailed to ${link.customerEmail}.`;
    else redirect(backWith(`/admin/payments/${link.id}`, "err", `${message} The email was not sent: ${sent.error}`));
  }
  redirect(backWith(`/admin/payments/${link.id}`, "ok", message));
}

export async function emailLinkAction(id: number) {
  const user = await requireAdmin();
  const path = `/admin/payments/${id}`;
  const link = await getLink(id);
  if (!link) redirect("/admin/payments");
  if (link.status !== "pending") redirect(backWith(path, "err", "Only open links can be emailed."));
  const result = await emailLink(link, user.email);
  redirect(result.ok ? backWith(path, "ok", `Link emailed to ${link.customerEmail}.`) : backWith(path, "err", `Not sent: ${result.error}`));
}

export async function cancelLinkAction(id: number) {
  const user = await requireAdmin();
  const link = await getLink(id);
  if (!link) redirect("/admin/payments");
  const ok = await cancelLink(id);
  if (ok) await logActivity({ actor: user.email, kind: "payment", message: `Cancelled payment link ${link.code}`, entity: "payment_link", entityId: id });
  redirect(backWith(`/admin/payments/${id}`, ok ? "ok" : "err", ok ? "Link cancelled. It can no longer be paid." : "Only an open link can be cancelled."));
}

/** Asks Moyasar about a payment and applies the answer: for customers who paid but whose confirmation never arrived. */
export async function recheckAction(id: number, formData: FormData) {
  const user = await requireAdmin();
  const path = `/admin/payments/${id}`;
  const link = await getLink(id);
  if (!link) redirect("/admin/payments");
  const paymentId = str(formData, "paymentId", 64) || link.moyasarPaymentId;
  if (!paymentId) redirect(backWith(path, "err", "Enter the Moyasar payment ID (from the Moyasar dashboard) to check."));
  const outcome = await verifyAndApply(link, paymentId, user.email);
  const messages = {
    paid: ["ok", "Moyasar confirms this payment. The link is marked paid."],
    pending: ["err", outcome.message ?? "The payment is not complete yet."],
    failed: ["err", `Moyasar reports the payment failed: ${outcome.message}`],
    mismatch: ["err", "That payment does not belong to this link or its amount differs, so it was not applied."],
    error: ["err", `Could not check with Moyasar: ${outcome.message}`],
  } as const;
  const [kind, text] = messages[outcome.state];
  redirect(backWith(path, kind, text));
}
