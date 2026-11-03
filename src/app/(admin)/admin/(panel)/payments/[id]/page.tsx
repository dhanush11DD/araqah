import Link from "next/link";
import { notFound } from "next/navigation";
import CopyButton from "@/components/admin/CopyButton";
import SubmitButton from "@/components/admin/SubmitButton";
import { Badge, Flash, PageTop } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { fmtDateTime, param } from "@/lib/format";
import { formatSar, getLink, payUrl } from "@/lib/payments";
import { getRequest } from "@/lib/store";
import { cancelLinkAction, emailLinkAction, recheckAction } from "../actions";

export const metadata = { title: "Payment link" };

export default async function LinkDetail({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdmin();
  const id = Number((await params).id);
  const sp = await searchParams;
  const l = Number.isInteger(id) ? await getLink(id) : null;
  if (!l) notFound();
  const request = l.requestId ? await getRequest(l.requestId) : null;
  const url = payUrl(l);
  const tone = l.status === "paid" ? "ok" : l.status === "pending" ? "warn" : "bad";
  return (
    <>
      <PageTop title={l.code} intro={<>Created {fmtDateTime(l.createdAt)} by {l.createdBy ?? "-"}</>}>
        <Link className="btn" href="/admin/payments">← All links</Link>
        <Badge tone={tone}>{l.status === "pending" ? "open" : l.status}</Badge>
      </PageTop>
      <Flash ok={param(sp.ok)} err={param(sp.err)} />
      <div className="split">
        <div>
          <div className="card">
            <div className="card-head"><h2>{formatSar(l.amountHalalas)}</h2></div>
            <dl className="kv">
              <dt>For</dt><dd>{l.description}</dd>
              <dt>Customer</dt><dd>{l.customerName}</dd>
              <dt>Mobile</dt><dd>{l.customerPhone ? <bdi dir="ltr">{l.customerPhone}</bdi> : "-"}</dd>
              <dt>Email</dt><dd>{l.customerEmail ?? "-"}{l.emailedAt && <div className="muted small">Link emailed {fmtDateTime(l.emailedAt)}</div>}</dd>
              <dt>Request</dt><dd>{request ? <Link className="mono" href={`/admin/requests/${request.id}`}>{request.trackingCode}</Link> : "-"}</dd>
              <dt>Language</dt><dd>{l.locale === "ar" ? "Arabic" : "English"}</dd>
              <dt>Expires</dt><dd>{l.expiresAt ? fmtDateTime(l.expiresAt) : "Never"}</dd>
              {l.status === "paid" && <><dt>Paid</dt><dd>{fmtDateTime(l.paidAt)}{l.paymentMethod && <> · {l.paymentMethod}</>}</dd></>}
              <dt>Moyasar payment</dt><dd className="mono">{l.moyasarPaymentId ?? "-"}</dd>
              {l.lastError && l.status !== "paid" && <><dt>Last problem</dt><dd style={{ color: "var(--bad)" }}>{l.lastError}</dd></>}
            </dl>
          </div>
          {l.status !== "paid" && (
            <form action={recheckAction.bind(null, l.id)} className="card form">
              <h2>Paid but not showing?</h2>
              <p className="muted small">Asks Moyasar for the payment and, if it is paid for this exact amount, marks the link paid. Use it if a customer says they paid but the link is still open.</p>
              <label className="f">Moyasar payment ID <small>Leave blank to use the one already recorded. Find it in the Moyasar dashboard.</small><input type="text" name="paymentId" defaultValue={l.moyasarPaymentId ?? ""} className="mono" autoComplete="off" /></label>
              <div><SubmitButton className="btn" pending="Checking with Moyasar…">Check with Moyasar</SubmitButton></div>
            </form>
          )}
        </div>
        <div>
          <div className="card form">
            <h2>Payment link</h2>
            <div className="linkbox"><code>{url}</code><CopyButton value={url} /></div>
            <div className="row">
              <a className="btn sm" href={url} target="_blank" rel="noreferrer">Open customer page ↗</a>
            </div>
            {l.status === "pending" && (
              <>
                <form action={emailLinkAction.bind(null, l.id)}>
                  <SubmitButton className="btn gold" pending="Sending…">Email link to customer</SubmitButton>
                  {!l.customerEmail && <p className="muted small" style={{ marginTop: 6 }}>This link has no email address, so it cannot be emailed. Copy the link instead.</p>}
                </form>
                <form action={cancelLinkAction.bind(null, l.id)}><SubmitButton className="btn danger" confirm="Cancel this link? The customer will no longer be able to pay it." pending="…">Cancel link</SubmitButton></form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
