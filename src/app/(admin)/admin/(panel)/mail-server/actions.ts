"use server";

import { redirect } from "next/navigation";
import { backWith } from "@/components/admin/ui";
import { logActivity } from "@/lib/activity";
import { requireAdmin } from "@/lib/auth";
import { isSmtpReady, sendMail, verifySmtp } from "@/lib/mail";
import { getSmtpConfig, saveSettings } from "@/lib/settings";

const PATH = "/admin/mail-server";
const str = (f: FormData, k: string, max = 190) => String(f.get(k) ?? "").trim().slice(0, max);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function saveSmtpAction(formData: FormData) {
  const user = await requireAdmin({ adminOnly: true });
  const port = Number(str(formData, "port"));
  if (!Number.isInteger(port) || port < 1 || port > 65535) redirect(backWith(PATH, "err", "Enter a port number such as 587 or 465."));
  const recipients = str(formData, "adminEmails", 1000).split(/[,;\s]+/).filter(Boolean);
  const bad = recipients.find((e) => !EMAIL.test(e));
  if (bad) redirect(backWith(PATH, "err", `“${bad}” is not a valid email address.`));
  const from = str(formData, "from");
  if (from && !/<[^>]+@[^>]+>|^[^\s@]+@[^\s@]+$/.test(from)) redirect(backWith(PATH, "err", "The “From” address should look like: Araqah <no-reply@araqah.com>"));

  const inputs = [
    { key: "smtp.host", value: str(formData, "host") },
    { key: "smtp.port", value: String(port) },
    { key: "smtp.secure", value: formData.get("secure") === "on" ? "1" : "0" },
    { key: "smtp.user", value: str(formData, "user") },
    { key: "smtp.from", value: from },
    { key: "mail.adminEmails", value: recipients.join(", ") },
  ];
  const pass = String(formData.get("pass") ?? "");
  // A blank password box keeps the saved password.
  const withPass = pass ? [...inputs, { key: "smtp.pass", value: pass, secret: true }] : inputs;
  await saveSettings(withPass);
  await logActivity({ actor: user.email, kind: "settings", message: `Mail server settings saved (${str(formData, "host") || "no host"}:${port}${pass ? ", password changed" : ""})` });
  redirect(backWith(PATH, "ok", "Mail server settings saved. Use “Test connection” to check them."));
}

export async function testConnectionAction() {
  const user = await requireAdmin({ adminOnly: true });
  let failure: string | null = null;
  try {
    await verifySmtp();
  } catch (error) {
    failure = error instanceof Error ? error.message : String(error);
  }
  // redirect() works by throwing, so it must stay outside the try block.
  if (failure) {
    await logActivity({ actor: user.email, kind: "mail", message: `FAILED: mail server connection test: ${failure}` });
    redirect(backWith(PATH, "err", `Could not connect: ${failure}`));
  }
  await logActivity({ actor: user.email, kind: "mail", message: "Mail server connection test passed" });
  redirect(backWith(PATH, "ok", "Connected and signed in to the mail server successfully."));
}

export async function sendTestMailAction(formData: FormData) {
  const user = await requireAdmin({ adminOnly: true });
  const to = str(formData, "to");
  if (!EMAIL.test(to)) redirect(backWith(PATH, "err", "Enter an email address to send the test to."));
  if (!isSmtpReady(await getSmtpConfig())) redirect(backWith(PATH, "err", "Save a mail server host and a From address first."));
  const text = "This is a test email from the Araqah admin dashboard. If you can read it, your mail server settings work.";
  const result = await sendMail(
    { to, subject: "Araqah mail server test", text, html: `<p style="font-family:Arial,sans-serif;font-size:15px">${text}</p>` },
    { actor: user.email, what: "mail server test" },
  );
  redirect(result.ok ? backWith(PATH, "ok", `Test email sent to ${to}.`) : backWith(PATH, "err", `Could not send: ${result.error}`));
}
