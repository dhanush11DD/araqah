import "server-only";
import { logActivity } from "./activity";
import { getDb, now, parseDate, type Row } from "./db";
import { sendTemplate } from "./mail";
import { getSmtpConfig, getMoyasarConfig, siteUrl } from "./settings";
import { newCode } from "./store";

export type LinkStatus = "pending" | "paid" | "cancelled" | "expired";

export type PaymentLink = {
  id: number;
  code: string;
  amountHalalas: number;
  currency: string;
  description: string;
  customerName: string;
  customerPhone: string | null;
  customerEmail: string | null;
  requestId: number | null;
  locale: "ar" | "en";
  status: LinkStatus;
  expiresAt: Date | null;
  moyasarPaymentId: string | null;
  paymentMethod: string | null;
  paidAt: Date | null;
  lastError: string | null;
  emailedAt: Date | null;
  createdBy: string | null;
  createdAt: Date;
};

export const formatSar = (halalas: number) => `SAR ${(halalas / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const payUrl = (l: Pick<PaymentLink, "code" | "locale">) => `${siteUrl()}/${l.locale}/pay/${l.code}`;

const toLink = (r: Row): PaymentLink => {
  const expiresAt = parseDate(r.expires_at);
  const stored = String(r.status);
  return {
    id: Number(r.id),
    code: String(r.code),
    amountHalalas: Number(r.amount_halalas),
    currency: String(r.currency),
    description: String(r.description),
    customerName: String(r.customer_name),
    customerPhone: (r.customer_phone as string) ?? null,
    customerEmail: (r.customer_email as string) ?? null,
    requestId: r.request_id == null ? null : Number(r.request_id),
    locale: r.locale === "en" ? "en" : "ar",
    status: stored === "pending" && expiresAt && expiresAt.getTime() < Date.now() ? "expired" : (stored as LinkStatus),
    expiresAt,
    moyasarPaymentId: (r.moyasar_payment_id as string) ?? null,
    paymentMethod: (r.payment_method as string) ?? null,
    paidAt: parseDate(r.paid_at),
    lastError: (r.last_error as string) ?? null,
    emailedAt: parseDate(r.emailed_at),
    createdBy: (r.created_by as string) ?? null,
    createdAt: parseDate(r.created_at)!,
  };
};

export type NewLink = {
  amountHalalas: number;
  description: string;
  customerName: string;
  customerPhone: string | null;
  customerEmail: string | null;
  requestId: number | null;
  locale: "ar" | "en";
  expiresInDays: number | null;
  createdBy: string;
};

export async function createLink(input: NewLink) {
  const db = await getDb();
  const at = now();
  const expires = input.expiresInDays ? now(new Date(Date.now() + input.expiresInDays * 86_400_000)) : null;
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = newCode("PAY");
    if (await db.get("SELECT id FROM payment_links WHERE code = ?", [code])) continue;
    const { insertId } = await db.run(
      `INSERT INTO payment_links
         (code, amount_halalas, currency, description, customer_name, customer_phone, customer_email, request_id, locale, status, expires_at, created_by, created_at, updated_at)
       VALUES (?, ?, 'SAR', ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?)`,
      [code, input.amountHalalas, input.description, input.customerName, input.customerPhone, input.customerEmail, input.requestId, input.locale, expires, input.createdBy, at, at],
    );
    return (await getLink(insertId))!;
  }
  throw new Error("Could not allocate a unique payment code");
}

export async function getLink(id: number) {
  const row = await (await getDb()).get("SELECT * FROM payment_links WHERE id = ?", [id]);
  return row ? toLink(row) : null;
}

export async function getLinkByCode(code: string) {
  const row = await (await getDb()).get("SELECT * FROM payment_links WHERE code = ?", [code]);
  return row ? toLink(row) : null;
}

export async function getLinkByPaymentId(paymentId: string) {
  const row = await (await getDb()).get("SELECT * FROM payment_links WHERE moyasar_payment_id = ?", [paymentId]);
  return row ? toLink(row) : null;
}

export async function listLinks(filter: { status?: string; q?: string; requestId?: number }, page: number, pageSize: number) {
  const db = await getDb();
  const where: string[] = [];
  const params: (string | number)[] = [];
  if (filter.q) {
    where.push("(code LIKE ? OR customer_name LIKE ? OR customer_phone LIKE ? OR customer_email LIKE ? OR description LIKE ?)");
    params.push(...Array<string>(5).fill(`%${filter.q}%`));
  }
  if (filter.requestId) (where.push("request_id = ?"), params.push(filter.requestId));
  // "expired" is computed from the expiry time, so it filters on pending + a past date.
  if (filter.status === "expired") (where.push("status = 'pending' AND expires_at IS NOT NULL AND expires_at < ?"), params.push(now()));
  else if (filter.status === "pending") (where.push("status = 'pending' AND (expires_at IS NULL OR expires_at >= ?)"), params.push(now()));
  else if (filter.status) (where.push("status = ?"), params.push(filter.status));
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const total = Number((await db.get(`SELECT COUNT(*) AS c FROM payment_links ${clause}`, params))?.c ?? 0);
  const rows = await db.all(`SELECT * FROM payment_links ${clause} ORDER BY id DESC LIMIT ? OFFSET ?`, [...params, pageSize, (page - 1) * pageSize]);
  return { total, rows: rows.map(toLink) };
}

export async function paymentStats() {
  const db = await getDb();
  const paid = await db.get("SELECT COUNT(*) AS c, COALESCE(SUM(amount_halalas), 0) AS s FROM payment_links WHERE status = 'paid'");
  const open = await db.get("SELECT COUNT(*) AS c, COALESCE(SUM(amount_halalas), 0) AS s FROM payment_links WHERE status = 'pending' AND (expires_at IS NULL OR expires_at >= ?)", [now()]);
  return { paidCount: Number(paid?.c ?? 0), paidTotal: Number(paid?.s ?? 0), openCount: Number(open?.c ?? 0), openTotal: Number(open?.s ?? 0) };
}

export async function cancelLink(id: number) {
  return (await (await getDb()).run("UPDATE payment_links SET status = 'cancelled', updated_at = ? WHERE id = ? AND status = 'pending'", [now(), id])).changes === 1;
}

export async function markEmailed(id: number) {
  await (await getDb()).run("UPDATE payment_links SET emailed_at = ? WHERE id = ?", [now(), id]);
}

// ---------------------------------------------------------------- Moyasar

type MoyasarPayment = {
  id: string;
  status: string;
  amount: number;
  currency: string;
  description?: string;
  metadata?: Record<string, string> | null;
  source?: { type?: string; message?: string; company?: string } | null;
};

async function moyasarFetch(path: string) {
  const config = await getMoyasarConfig();
  if (!config.secretKey) throw new Error("The Moyasar secret key is not set (Admin → Payment gateway).");
  return fetch(`${config.apiBase}${path}`, {
    headers: { authorization: `Basic ${Buffer.from(`${config.secretKey}:`).toString("base64")}`, accept: "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
}

export const keyMode = (key: string) => (key.includes("_test_") ? "test" : key.includes("_live_") ? "live" : "unknown");

/** Checks the stored keys against Moyasar: a cheap authenticated read. */
export async function testMoyasar() {
  const config = await getMoyasarConfig();
  const issues: string[] = [];
  if (!config.publishableKey) issues.push("The publishable key is not set.");
  if (!config.secretKey) issues.push("The secret key is not set.");
  if (config.publishableKey && config.secretKey && keyMode(config.publishableKey) !== keyMode(config.secretKey)) {
    issues.push("The publishable key and secret key are from different modes (one test, one live).");
  }
  if (!config.secretKey) return { ok: false, message: issues.join(" ") };
  try {
    const res = await moyasarFetch("/payments?page=1");
    if (res.status === 401 || res.status === 403) return { ok: false, message: "Moyasar rejected the secret key (HTTP " + res.status + "). Check that it was copied in full." };
    if (!res.ok) return { ok: false, message: `Moyasar answered with HTTP ${res.status}.` };
    return {
      ok: issues.length === 0,
      message: issues.length ? `Connected, but: ${issues.join(" ")}` : `Connected to Moyasar in ${keyMode(config.secretKey)} mode.`,
    };
  } catch (error) {
    return { ok: false, message: `Could not reach Moyasar: ${error instanceof Error ? error.message : String(error)}` };
  }
}

export async function fetchPayment(paymentId: string): Promise<MoyasarPayment> {
  const res = await moyasarFetch(`/payments/${encodeURIComponent(paymentId)}`);
  if (!res.ok) throw new Error(`Moyasar returned HTTP ${res.status} for payment ${paymentId}`);
  return (await res.json()) as MoyasarPayment;
}

export type VerifyOutcome = { state: "paid" | "failed" | "pending" | "mismatch" | "error"; message?: string };

/**
 * Asks Moyasar for the payment and applies the result to the link. Used by the customer's return
 * page, the webhook and the admin "Re-check" button, so it is safe to run more than once.
 */
export async function verifyAndApply(link: PaymentLink, paymentId: string, actor: string): Promise<VerifyOutcome> {
  let payment: MoyasarPayment;
  try {
    payment = await fetchPayment(paymentId);
  } catch (error) {
    return { state: "error", message: error instanceof Error ? error.message : String(error) };
  }
  const db = await getDb();

  // Never trust the browser or the webhook body alone: the payment must be for this link and amount.
  const sameLink = payment.metadata?.link_code === link.code;
  if (!sameLink || payment.amount !== link.amountHalalas || payment.currency !== link.currency) {
    await logActivity({ actor, kind: "payment", message: `Payment ${paymentId} does not match link ${link.code} (amount ${payment.amount} ${payment.currency})`, entity: "payment_link", entityId: link.id });
    return { state: "mismatch", message: "The payment does not match this link." };
  }

  if (payment.status === "paid" || payment.status === "captured") {
    const method = [payment.source?.type, payment.source?.company].filter(Boolean).join(" ").slice(0, 32) || null;
    const changed = await db.run(
      "UPDATE payment_links SET status = 'paid', moyasar_payment_id = ?, payment_method = ?, paid_at = ?, last_error = NULL, updated_at = ? WHERE id = ? AND status <> 'paid'",
      [paymentId, method, now(), now(), link.id],
    );
    if (changed.changes === 1) await onPaid((await getLink(link.id))!, actor);
    return { state: "paid" };
  }
  if (payment.status === "failed" || payment.status === "expired" || payment.status === "voided") {
    const reason = (payment.source?.message || payment.status).slice(0, 240);
    await db.run("UPDATE payment_links SET last_error = ?, updated_at = ? WHERE id = ? AND status = 'pending'", [reason, now(), link.id]);
    await logActivity({ actor, kind: "payment", message: `Payment attempt failed for ${link.code}: ${reason}`, entity: "payment_link", entityId: link.id });
    return { state: "failed", message: reason };
  }
  return { state: "pending", message: `Payment status is “${payment.status}”.` };
}

async function onPaid(link: PaymentLink, actor: string) {
  await logActivity({ actor, kind: "payment", message: `Paid: ${link.code} ${formatSar(link.amountHalalas)} from ${link.customerName}`, entity: "payment_link", entityId: link.id });
  const vars = {
    name: link.customerName,
    amount: formatSar(link.amountHalalas),
    description: link.description,
    reference: link.moyasarPaymentId ?? "",
    paidAt: (link.paidAt ?? new Date()).toLocaleString("en-GB", { timeZone: "Asia/Riyadh", dateStyle: "medium", timeStyle: "short" }),
    adminUrl: `${siteUrl()}/admin/payments/${link.id}`,
  };
  try {
    const { adminEmails } = await getSmtpConfig();
    if (adminEmails.length) await sendTemplate("admin_payment_received", adminEmails, "en", vars, { actor: "system", entity: "payment_link", entityId: link.id });
    if (link.customerEmail) await sendTemplate("payment_receipt", link.customerEmail, link.locale, vars, { actor: "system", entity: "payment_link", entityId: link.id });
  } catch (error) {
    console.error("Payment emails failed", error);
  }
}
