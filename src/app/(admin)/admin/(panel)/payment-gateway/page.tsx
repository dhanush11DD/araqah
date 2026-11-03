import CopyButton from "@/components/admin/CopyButton";
import GenerateSecret from "@/components/admin/GenerateSecret";
import SubmitButton from "@/components/admin/SubmitButton";
import { Badge, Flash, PageTop } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { param } from "@/lib/format";
import { keyMode } from "@/lib/payments";
import { getMoyasarConfig, siteUrl } from "@/lib/settings";
import { saveGatewayAction, testGatewayAction } from "./actions";

export const metadata = { title: "Payment gateway" };

export default async function GatewayPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdmin({ adminOnly: true });
  const sp = await searchParams;
  const c = await getMoyasarConfig();
  const ready = !!(c.publishableKey && c.secretKey);
  const mode = keyMode(c.secretKey || c.publishableKey);
  const webhookUrl = `${siteUrl()}/api/webhooks/moyasar`;
  const isLocal = /localhost|127\.0\.0\.1/.test(siteUrl());
  return (
    <>
      <PageTop title="Payment gateway" intro="Connect Moyasar so customers can pay the links you generate with mada, Visa or Mastercard.">
        <Badge tone={ready ? "ok" : "bad"}>{ready ? "Keys saved" : "Not connected"}</Badge>
        {ready && mode !== "unknown" && <Badge tone={mode === "live" ? "dark" : "warn"}>{mode === "live" ? "LIVE mode" : "TEST mode"}</Badge>}
      </PageTop>
      <Flash ok={param(sp.ok)} err={param(sp.err)} />
      {isLocal && <p className="notice" style={{ marginBottom: 16 }}>The website address is <code>{siteUrl()}</code>. Moyasar’s webhook and live payments need your real HTTPS address, so set <code>SITE_URL</code> on the server. Test keys work for trying a payment on this computer.</p>}
      <div className="split" style={{ gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr)" }}>
        <form action={saveGatewayAction} className="card form">
          <h2>Moyasar keys</h2>
          <p className="muted small">Find them in the Moyasar dashboard under Settings → API Keys. Use <b>test</b> keys until you have tried a payment end to end.</p>
          <label className="f">Publishable key <small>Starts with pk_test_ or pk_live_. It is shown to customers’ browsers by design.</small><input type="text" name="publishableKey" defaultValue={c.publishableKey} autoComplete="off" spellCheck={false} placeholder="pk_test_…" /></label>
          <label className="f">Secret key <small>{c.secretKey ? "A secret key is saved (encrypted). Leave blank to keep it." : "Not saved yet."} Starts with sk_test_ or sk_live_.</small><input type="password" name="secretKey" autoComplete="new-password" placeholder={c.secretKey ? "••••••••••••" : "sk_test_…"} /></label>
          <label className="f">Webhook secret <small>{c.webhookSecret ? "A secret is saved. Leave blank to keep it." : "Not set."} Choose any long random value, then enter the same one in Moyasar.</small><GenerateSecret name="webhookSecret" placeholder={c.webhookSecret ? "Saved. Type a new one to replace it." : "Press Generate"} /></label>
          <div className="row">
            <SubmitButton pending="Saving…">Save keys</SubmitButton>
            <SubmitButton className="btn gold" formAction={testGatewayAction} pending="Checking with Moyasar…">Test connection</SubmitButton>
          </div>
        </form>
        <div>
          <div className="card">
            <h2>Set up the webhook in Moyasar</h2>
            <p className="muted small" style={{ margin: "6px 0 12px" }}>The webhook confirms a payment even when the customer closes the page right after paying.</p>
            <div className="linkbox"><code>{webhookUrl}</code><CopyButton value={webhookUrl} /></div>
            <ol style={{ margin: "12px 0 0", paddingInlineStart: 18, display: "grid", gap: 6 }}>
              <li>In Moyasar, open Settings → Webhooks → Add.</li>
              <li>Paste the address above as the endpoint.</li>
              <li>Paste your webhook secret as the secret token.</li>
              <li>Tick the <code>payment_paid</code> event, and save.</li>
            </ol>
          </div>
          <div className="card">
            <h2>How a payment flows</h2>
            <ol style={{ margin: "10px 0 0", paddingInlineStart: 18, display: "grid", gap: 6 }}>
              <li>You create a <b>payment link</b> and send it to the customer.</li>
              <li>The customer opens it and pays on a secure Moyasar form.</li>
              <li>The server asks Moyasar to confirm the amount, and marks the link paid.</li>
              <li>Staff and (if an email is on the link) the customer get an email.</li>
            </ol>
            <p className="muted small" style={{ marginTop: 10 }}>Card details never touch this server; they go straight to Moyasar.</p>
          </div>
        </div>
      </div>
    </>
  );
}
