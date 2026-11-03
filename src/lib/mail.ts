import "server-only";
import nodemailer from "nodemailer";
import { logActivity } from "./activity";
import { getDb, now } from "./db";
import { getSmtpConfig, siteUrl, type SmtpConfig } from "./settings";

// ---------------------------------------------------------------- templates

export type TemplateKey = "admin_new_request" | "admin_payment_received" | "stage_update" | "payment_link" | "payment_receipt";

export type TemplateDef = {
  key: TemplateKey;
  title: string;
  audience: "Staff" | "Customer";
  trigger: string;
  variables: string[];
  subject: { en: string; ar: string };
  body: { en: string; ar: string };
};

export const TEMPLATES: TemplateDef[] = [
  {
    key: "admin_new_request",
    title: "New request alert",
    audience: "Staff",
    trigger: "Sent automatically to the staff addresses when a customer submits the Request a worker form.",
    variables: ["name", "phone", "city", "service", "profession", "nationality", "contact", "notes", "trackingCode", "adminUrl"],
    subject: { en: "New recruitment request {{trackingCode}} - {{name}}", ar: "طلب استقدام جديد {{trackingCode}} - {{name}}" },
    body: {
      en: "A new recruitment request has been received.\n\nTracking number: {{trackingCode}}\nName: {{name}}\nMobile: {{phone}}\nCity: {{city}}\nService: {{service}}\nProfession: {{profession}}\nNationality: {{nationality}}\nPreferred contact: {{contact}}\nNotes: {{notes}}\n\nOpen it in the dashboard: {{adminUrl}}",
      ar: "تم استلام طلب استقدام جديد.\n\nرقم التتبع: {{trackingCode}}\nالاسم: {{name}}\nالجوال: {{phone}}\nالمدينة: {{city}}\nالخدمة: {{service}}\nالمهنة: {{profession}}\nالجنسية: {{nationality}}\nطريقة التواصل: {{contact}}\nملاحظات: {{notes}}\n\nافتح الطلب في لوحة التحكم: {{adminUrl}}",
    },
  },
  {
    key: "admin_payment_received",
    title: "Payment received alert",
    audience: "Staff",
    trigger: "Sent automatically to the staff addresses when a payment link is paid.",
    variables: ["name", "amount", "description", "reference", "adminUrl"],
    subject: { en: "Payment received: {{amount}} from {{name}}", ar: "تم استلام دفعة: {{amount}} من {{name}}" },
    body: {
      en: "A payment link has been paid.\n\nCustomer: {{name}}\nAmount: {{amount}}\nFor: {{description}}\nPayment reference: {{reference}}\n\nView it: {{adminUrl}}",
      ar: "تم سداد رابط دفع.\n\nالعميل: {{name}}\nالمبلغ: {{amount}}\nالبيان: {{description}}\nمرجع الدفع: {{reference}}\n\nعرض التفاصيل: {{adminUrl}}",
    },
  },
  {
    key: "stage_update",
    title: "Request status update",
    audience: "Customer",
    trigger: "Sent to the customer when staff change the stage of a request that has an email address. Only sent if the “Email the customer” box is ticked.",
    variables: ["name", "trackingCode", "stage", "stageNumber", "note", "trackingUrl"],
    subject: { en: "Update on your request {{trackingCode}}: {{stage}}", ar: "تحديث على طلبك {{trackingCode}}: {{stage}}" },
    body: {
      en: "Dear {{name}},\n\nYour request {{trackingCode}} has moved to stage {{stageNumber}} of 8: {{stage}}.\n\n{{note}}\n\nYou can follow every stage online, using your request number and mobile number:\n{{trackingUrl}}\n\nAraqah Recruitment Office\n011 266 2266",
      ar: "عزيزنا {{name}}،\n\nانتقل طلبك {{trackingCode}} إلى المرحلة {{stageNumber}} من 8: {{stage}}.\n\n{{note}}\n\nيمكنك متابعة كل مرحلة إلكترونيًا باستخدام رقم الطلب ورقم الجوال:\n{{trackingUrl}}\n\nمكتب عراقة للاستقدام\n011 266 2266",
    },
  },
  {
    key: "payment_link",
    title: "Payment link",
    audience: "Customer",
    trigger: "Sent to the customer when staff press “Email link” on a payment link (or tick “Email it now” when creating one).",
    variables: ["name", "amount", "description", "paymentLink", "expires"],
    subject: { en: "Your payment link from Araqah: {{amount}}", ar: "رابط الدفع من عراقة: {{amount}}" },
    body: {
      en: "Dear {{name}},\n\nPlease use the secure link below to pay {{amount}} for: {{description}}.\n\n{{paymentLink}}\n\n{{expires}}\n\nYou can pay with mada, Visa or Mastercard. If you have any questions, call us on 011 266 2266.\n\nAraqah Recruitment Office",
      ar: "عزيزنا {{name}}،\n\nيرجى استخدام الرابط الآمن أدناه لسداد مبلغ {{amount}} مقابل: {{description}}.\n\n{{paymentLink}}\n\n{{expires}}\n\nيمكنك الدفع عبر مدى أو فيزا أو ماستركارد. للاستفسار اتصل بنا على 011 266 2266.\n\nمكتب عراقة للاستقدام",
    },
  },
  {
    key: "payment_receipt",
    title: "Payment receipt",
    audience: "Customer",
    trigger: "Sent automatically to the customer, when the link has an email address, as soon as the payment is confirmed.",
    variables: ["name", "amount", "description", "reference", "paidAt"],
    subject: { en: "Payment received: thank you, {{name}}", ar: "تم استلام الدفعة: شكرًا {{name}}" },
    body: {
      en: "Dear {{name}},\n\nThank you. We have received your payment of {{amount}} for: {{description}}.\n\nPayment reference: {{reference}}\nDate: {{paidAt}}\n\nAraqah Recruitment Office\n011 266 2266",
      ar: "عزيزنا {{name}}،\n\nشكرًا لك. تم استلام دفعتك بمبلغ {{amount}} مقابل: {{description}}.\n\nمرجع الدفع: {{reference}}\nالتاريخ: {{paidAt}}\n\nمكتب عراقة للاستقدام\n011 266 2266",
    },
  },
];

export type StoredTemplate = { key: TemplateKey; subjectEn: string; subjectAr: string; bodyEn: string; bodyAr: string; enabled: boolean };

async function seedTemplates() {
  const db = await getDb();
  for (const t of TEMPLATES) {
    if (await db.get("SELECT tkey FROM mail_templates WHERE tkey = ?", [t.key])) continue;
    await db.run("INSERT INTO mail_templates (tkey, subject_en, subject_ar, body_en, body_ar, is_enabled, updated_at) VALUES (?, ?, ?, ?, ?, 1, ?)", [
      t.key, t.subject.en, t.subject.ar, t.body.en, t.body.ar, now(),
    ]);
  }
}

export async function getTemplate(key: TemplateKey): Promise<StoredTemplate> {
  await seedTemplates();
  const r = (await (await getDb()).get("SELECT * FROM mail_templates WHERE tkey = ?", [key]))!;
  return { key, subjectEn: String(r.subject_en), subjectAr: String(r.subject_ar), bodyEn: String(r.body_en), bodyAr: String(r.body_ar), enabled: Number(r.is_enabled) === 1 };
}

export async function listTemplates() {
  await seedTemplates();
  return Promise.all(TEMPLATES.map((def) => getTemplate(def.key).then((stored) => ({ def, stored }))));
}

export async function saveTemplate(t: StoredTemplate) {
  await (await getDb()).run("UPDATE mail_templates SET subject_en = ?, subject_ar = ?, body_en = ?, body_ar = ?, is_enabled = ?, updated_at = ? WHERE tkey = ?", [
    t.subjectEn, t.subjectAr, t.bodyEn, t.bodyAr, t.enabled ? 1 : 0, now(), t.key,
  ]);
}

export async function resetTemplate(key: TemplateKey) {
  const def = TEMPLATES.find((t) => t.key === key)!;
  await saveTemplate({ key, subjectEn: def.subject.en, subjectAr: def.subject.ar, bodyEn: def.body.en, bodyAr: def.body.ar, enabled: true });
}

// ---------------------------------------------------------------- rendering

const esc = (value: string) => value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const fill = (text: string, vars: Record<string, string>) => text.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, name: string) => vars[name] ?? "");

function htmlBody(text: string, rtl: boolean) {
  const paragraphs = esc(text)
    .split(/\n{2,}/)
    .map((p) => p.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" style="color:#141414;font-weight:700">$1</a>').replace(/\n/g, "<br>"))
    .map((p) => `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#3D3D3D">${p}</p>`)
    .join("");
  return `<!doctype html><html dir="${rtl ? "rtl" : "ltr"}"><body style="margin:0;background:#FAF7F0;padding:24px 12px;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="560" style="max-width:560px;background:#FFFFFF;border:1px solid #E4DCCB;border-radius:16px;overflow:hidden" cellpadding="0" cellspacing="0">
<tr><td style="background:#141414;padding:18px 28px;color:#F5C518;font-size:20px;font-weight:700">Araqah &middot; عراقة</td></tr>
<tr><td style="padding:28px;text-align:${rtl ? "right" : "left"}">${paragraphs}</td></tr>
<tr><td style="padding:14px 28px;background:#F2ECDF;color:#5C5A55;font-size:12px;text-align:center">Araqah Recruitment Office &middot; Hittin, Riyadh &middot; info@araqah.com</td></tr>
</table></td></tr></table></body></html>`;
}

export async function renderTemplate(key: TemplateKey, locale: "en" | "ar", vars: Record<string, string>) {
  const t = await getTemplate(key);
  const subject = fill(locale === "ar" ? t.subjectAr : t.subjectEn, vars).replace(/\s+/g, " ").trim();
  const text = fill(locale === "ar" ? t.bodyAr : t.bodyEn, vars).replace(/\n{3,}/g, "\n\n").trim();
  return { subject, text, html: htmlBody(text, locale === "ar"), enabled: t.enabled };
}

export const SAMPLE_VARS: Record<string, string> = {
  name: "Mohammed Al-Harbi", phone: "+966551234567", city: "Riyadh", service: "Worker Recruitment", profession: "Housemaid", nationality: "Philippines",
  contact: "Call", notes: "Prefer a candidate with nanny experience.", trackingCode: "ARQ-26-7K3Q9X", adminUrl: `${siteUrl()}/admin/requests/1`,
  stage: "Candidate Selected", stageNumber: "3", note: "We have shortlisted two CVs and will send them today.", trackingUrl: `${siteUrl()}/en#track`,
  amount: "SAR 1,500.00", description: "Recruitment service deposit", paymentLink: `${siteUrl()}/en/pay/PAY-26-ABC234`, expires: "This link is valid until 10 Nov 2026.",
  reference: "7f5d5c0c-1a2b-4c3d-9e8f-000000000000", paidAt: "3 Nov 2026, 14:05",
};

// ---------------------------------------------------------------- sending

function transport(c: SmtpConfig) {
  return nodemailer.createTransport({
    host: c.host,
    port: c.port,
    secure: c.secure,
    auth: c.user ? { user: c.user, pass: c.pass } : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}

export const isSmtpReady = (c: SmtpConfig) => !!(c.host && (c.from || c.user));

export async function verifySmtp(config?: SmtpConfig) {
  const c = config ?? (await getSmtpConfig());
  if (!c.host) throw new Error("No SMTP host is set.");
  await transport(c).verify();
}

type Outgoing = { to: string | string[]; subject: string; text: string; html: string };

/** Sends one email and records the outcome in the activity log. Never throws; returns the result instead. */
export async function sendMail(mail: Outgoing, context: { actor: string; what: string; entity?: string; entityId?: string | number }) {
  const to = Array.isArray(mail.to) ? mail.to.join(", ") : mail.to;
  const config = await getSmtpConfig();
  if (!isSmtpReady(config)) {
    await logActivity({ actor: context.actor, kind: "mail", message: `Not sent (mail server not configured): ${context.what} to ${to}`, entity: context.entity, entityId: context.entityId });
    return { ok: false as const, error: "The mail server is not configured yet (Admin → Mail server)." };
  }
  try {
    await transport(config).sendMail({ from: config.from || config.user, ...mail });
    await logActivity({ actor: context.actor, kind: "mail", message: `Sent: ${context.what} to ${to}`, entity: context.entity, entityId: context.entityId });
    return { ok: true as const };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await logActivity({ actor: context.actor, kind: "mail", message: `FAILED: ${context.what} to ${to}: ${message}`, entity: context.entity, entityId: context.entityId });
    return { ok: false as const, error: message };
  }
}

/** Renders a template and sends it, unless staff have switched that template off. */
export async function sendTemplate(
  key: TemplateKey,
  to: string | string[],
  locale: "en" | "ar",
  vars: Record<string, string>,
  context: { actor: string; entity?: string; entityId?: string | number; force?: boolean },
) {
  const rendered = await renderTemplate(key, locale, vars);
  if (!rendered.enabled && !context.force) return { ok: false as const, skipped: true as const, error: "This email is switched off under Mail templates." };
  const title = TEMPLATES.find((t) => t.key === key)!.title;
  return sendMail({ to, subject: rendered.subject, text: rendered.text, html: rendered.html }, { ...context, what: `“${title}”` });
}

