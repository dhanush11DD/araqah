import SubmitButton from "@/components/admin/SubmitButton";
import { Badge, Flash, PageTop } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { param } from "@/lib/format";
import { isSmtpReady } from "@/lib/mail";
import { getSettings, getSmtpConfig } from "@/lib/settings";
import { saveSmtpAction, sendTestMailAction, testConnectionAction } from "./actions";

export const metadata = { title: "Mail server" };

export default async function MailServerPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const user = await requireAdmin({ adminOnly: true });
  const sp = await searchParams;
  const [c, stored] = await Promise.all([getSmtpConfig(), getSettings(["smtp.host", "smtp.pass"])]);
  const fromEnv = !stored["smtp.host"] && !!process.env.SMTP_HOST;
  return (
    <>
      <PageTop title="Mail server" intro="The SMTP account the website sends email through: new-request alerts to staff, status updates, payment links and receipts.">
        <Badge tone={isSmtpReady(c) ? "ok" : "bad"}>{isSmtpReady(c) ? "Configured" : "Not configured"}</Badge>
      </PageTop>
      <Flash ok={param(sp.ok)} err={param(sp.err)} />
      {fromEnv && <p className="notice" style={{ marginBottom: 16 }}>These values come from the server’s environment variables. Saving here overrides them.</p>}
      <div className="split" style={{ gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr)" }}>
        <form action={saveSmtpAction} className="card form">
          <h2>SMTP settings</h2>
          <div className="grid g2">
            <label className="f">SMTP host<input type="text" name="host" defaultValue={c.host} placeholder="smtpout.secureserver.net" autoComplete="off" /></label>
            <label className="f">Port<input type="number" name="port" defaultValue={c.port} min={1} max={65535} required /></label>
          </div>
          <label className="check"><input type="checkbox" name="secure" defaultChecked={c.secure} /> Use SSL/TLS from the start <span className="muted small">(tick for port 465; leave off for 587 with STARTTLS)</span></label>
          <div className="grid g2">
            <label className="f">Username<input type="text" name="user" defaultValue={c.user} autoComplete="off" /></label>
            <label className="f">Password <small>{c.pass ? "A password is saved. Leave blank to keep it." : "No password saved yet."}</small><input type="password" name="pass" autoComplete="new-password" placeholder={c.pass ? "••••••••••" : ""} /></label>
          </div>
          <label className="f">“From” address <small>Shown to the recipient</small><input type="text" name="from" defaultValue={c.from} placeholder="Araqah <no-reply@araqah.com>" /></label>
          <label className="f">Staff email addresses <small>Get the new-request and payment alerts. Separate with commas.</small><textarea name="adminEmails" style={{ minHeight: 70 }} defaultValue={c.adminEmails.join(", ")} placeholder="info@araqah.com" /></label>
          <div><SubmitButton pending="Saving…">Save settings</SubmitButton></div>
        </form>
        <div>
          <div className="card form">
            <h2>Check it works</h2>
            <p className="muted small">Both checks use the settings last saved.</p>
            <form action={testConnectionAction}><SubmitButton className="btn" pending="Connecting…">Test connection</SubmitButton></form>
            <form action={sendTestMailAction} className="form">
              <label className="f">Send a test email to<input type="email" name="to" defaultValue={user.email} required /></label>
              <div><SubmitButton className="btn gold" pending="Sending…">Send test email</SubmitButton></div>
            </form>
          </div>
          <div className="card">
            <h2>Tips for GoDaddy / Microsoft 365</h2>
            <ul style={{ margin: "10px 0 0", paddingInlineStart: 18, display: "grid", gap: 6 }}>
              <li>GoDaddy Workspace email: host <code>smtpout.secureserver.net</code>, port 465 with SSL, or 587 without.</li>
              <li>Microsoft 365: host <code>smtp.office365.com</code>, port 587, SSL off (STARTTLS). The mailbox needs SMTP sending enabled.</li>
              <li>Use the full mailbox address as the username, and the same address in “From”.</li>
              <li>The password is stored encrypted and is never shown again.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
