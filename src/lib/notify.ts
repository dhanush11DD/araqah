import "server-only";
import { sendTemplate } from "./mail";
import { optionNames } from "./options";
import { STAGE_NAMES } from "./requests";
import { getSmtpConfig, siteUrl } from "./settings";
import type { RequestRow } from "./store";

const CONTACT_LABEL: Record<string, string> = { call: "Call", email: "Email" };

async function requestVars(r: RequestRow) {
  const names = await optionNames();
  const label = (kind: "service" | "profession" | "nationality", code: string) => names[kind][code]?.en ?? code;
  return {
    name: r.fullName,
    phone: r.phone,
    city: r.city ?? "-",
    service: label("service", r.serviceType),
    profession: label("profession", r.profession),
    nationality: label("nationality", r.nationality),
    contact: CONTACT_LABEL[r.contactMethod] ?? r.contactMethod,
    notes: r.notes ?? "-",
    trackingCode: r.trackingCode,
    adminUrl: `${siteUrl()}/admin/requests/${r.id}`,
    trackingUrl: `${siteUrl()}/${r.locale === "en" ? "en" : "ar"}#track`,
  };
}

/** Emails the staff addresses about a new request (template: New request alert). */
export async function alertStaffOfRequest(r: RequestRow) {
  const { adminEmails } = await getSmtpConfig();
  if (!adminEmails.length) return { ok: false as const, error: "No staff email addresses are set." };
  return sendTemplate("admin_new_request", adminEmails, "en", await requestVars(r), { actor: "system", entity: "request", entityId: r.id });
}

/** Emails the customer their request's current stage (template: Request status update). */
export async function emailCustomerStage(r: RequestRow, note: string | null, actor: string) {
  if (!r.email) return { ok: false as const, error: "This request has no email address." };
  const locale = r.locale === "en" ? "en" : "ar";
  const vars = {
    ...(await requestVars(r)),
    stage: STAGE_NAMES[locale][r.currentStage - 1] ?? String(r.currentStage),
    stageNumber: String(r.currentStage),
    note: note ?? "",
  };
  return sendTemplate("stage_update", r.email, locale, vars, { actor, entity: "request", entityId: r.id });
}
