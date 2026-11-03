"use server";

import { redirect } from "next/navigation";
import { backWith } from "@/components/admin/ui";
import { logActivity } from "@/lib/activity";
import { requireAdmin } from "@/lib/auth";
import { SAMPLE_VARS, TEMPLATES, getTemplate, renderTemplate, resetTemplate, saveTemplate, sendMail, type TemplateKey } from "@/lib/mail";

const known = (key: string) => TEMPLATES.some((t) => t.key === key);
const str = (f: FormData, k: string, max: number) => String(f.get(k) ?? "").trim().slice(0, max);

export async function toggleTemplateAction(key: TemplateKey, enabled: boolean) {
  const user = await requireAdmin();
  if (!known(key)) redirect("/admin/mail");
  const t = await getTemplate(key);
  await saveTemplate({ ...t, enabled });
  await logActivity({ actor: user.email, kind: "settings", message: `${enabled ? "Switched on" : "Switched off"} the “${TEMPLATES.find((x) => x.key === key)!.title}” email` });
  redirect(backWith("/admin/mail", "ok", enabled ? "This email will now be sent automatically." : "This email is switched off and will not be sent."));
}

export async function saveTemplateAction(key: TemplateKey, formData: FormData) {
  const user = await requireAdmin();
  const path = `/admin/mail/${key}`;
  if (!known(key)) redirect("/admin/mail");
  const t = {
    key,
    subjectEn: str(formData, "subjectEn", 250),
    subjectAr: str(formData, "subjectAr", 250),
    bodyEn: str(formData, "bodyEn", 8000),
    bodyAr: str(formData, "bodyAr", 8000),
    enabled: formData.get("enabled") === "on",
  };
  if (!t.subjectEn || !t.subjectAr || !t.bodyEn || !t.bodyAr) redirect(backWith(path, "err", "Every subject and message needs text, in both languages."));
  await saveTemplate(t);
  await logActivity({ actor: user.email, kind: "settings", message: `Edited the “${TEMPLATES.find((x) => x.key === key)!.title}” email template` });
  redirect(backWith(path, "ok", "Template saved."));
}

export async function resetTemplateAction(key: TemplateKey) {
  const user = await requireAdmin();
  if (!known(key)) redirect("/admin/mail");
  await resetTemplate(key);
  await logActivity({ actor: user.email, kind: "settings", message: `Reset the “${TEMPLATES.find((x) => x.key === key)!.title}” template to its default` });
  redirect(backWith(`/admin/mail/${key}`, "ok", "Restored the default wording."));
}

export async function sendTestAction(key: TemplateKey, formData: FormData) {
  const user = await requireAdmin();
  const path = `/admin/mail/${key}`;
  if (!known(key)) redirect("/admin/mail");
  const to = str(formData, "to", 190);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) redirect(backWith(path, "err", "Enter an email address to send the test to."));
  const locale = formData.get("locale") === "ar" ? "ar" : "en";
  const rendered = await renderTemplate(key, locale, SAMPLE_VARS);
  const result = await sendMail(
    { to, subject: `[TEST] ${rendered.subject}`, text: rendered.text, html: rendered.html },
    { actor: user.email, what: `test of “${TEMPLATES.find((x) => x.key === key)!.title}”` },
  );
  redirect(result.ok ? backWith(path, "ok", `Test email sent to ${to}. It uses sample details.`) : backWith(path, "err", `Could not send: ${result.error}`));
}
