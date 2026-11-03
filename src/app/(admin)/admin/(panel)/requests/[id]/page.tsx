import Link from "next/link";
import { notFound } from "next/navigation";
import SubmitButton from "@/components/admin/SubmitButton";
import { Badge, Flash, PageTop } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { fmtDateTime, param } from "@/lib/format";
import { optionNames } from "@/lib/options";
import { formatSar, listLinks } from "@/lib/payments";
import { STAGE_NAMES } from "@/lib/requests";
import { getHistory, getRequest } from "@/lib/store";
import { saveDetailsAction, updateStageAction } from "../actions";

export const metadata = { title: "Request" };

export default async function RequestDetail({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdmin();
  const id = Number((await params).id);
  const sp = await searchParams;
  const r = Number.isInteger(id) ? await getRequest(id) : null;
  if (!r) notFound();
  const [history, names, links] = await Promise.all([getHistory(r.id), optionNames(), listLinks({ requestId: r.id }, 1, 20)]);
  const updateStage = updateStageAction.bind(null, r.id);
  const saveDetails = saveDetailsAction.bind(null, r.id);
  const dd = (label: string, value: React.ReactNode) => (<><dt>{label}</dt><dd>{value || "-"}</dd></>);
  return (
    <>
      <PageTop title={r.trackingCode} intro={<>Submitted {fmtDateTime(r.createdAt)} from the {r.locale === "ar" ? "Arabic" : "English"} site</>}>
        <Link className="btn" href="/admin/requests">← All requests</Link>
        <Link className="btn gold" href={`/admin/payments/new?request=${r.trackingCode}`}>Create payment link</Link>
      </PageTop>
      <Flash ok={param(sp.ok)} err={param(sp.err)} />
      <div className="split">
        <div>
          <div className="card">
            <div className="card-head"><h2>Customer request</h2><Badge tone={r.currentStage === 8 ? "ok" : r.currentStage === 1 ? "warn" : "dark"}>Stage {r.currentStage}/8 · {STAGE_NAMES.en[r.currentStage - 1]}</Badge></div>
            <dl className="kv">
              {dd("Name", r.fullName)}
              {dd("Mobile", <bdi dir="ltr">{r.phone}</bdi>)}
              {dd("Service type", names.service[r.serviceType]?.en ?? r.serviceType)}
              {dd("Profession", names.profession[r.profession]?.en ?? r.profession)}
              {dd("Nationality", names.nationality[r.nationality]?.en ?? r.nationality)}
              {dd("Preferred contact", r.contactMethod === "email" ? "Email" : "Call")}
              {dd("Customer notes", r.notes && <span style={{ whiteSpace: "pre-wrap" }}>{r.notes}</span>)}
            </dl>
          </div>
          <form action={saveDetails} className="card form">
            <div className="card-head" style={{ margin: 0 }}><h2>Staff details</h2></div>
            <p className="muted small">The form does not ask for an email address. Add one here to email this customer stage updates and payment links.</p>
            <div className="grid g2">
              <label className="f">Email<input type="email" name="email" defaultValue={r.email ?? ""} placeholder="customer@example.com" /></label>
              <label className="f">City<input type="text" name="city" defaultValue={r.city ?? ""} /></label>
            </div>
            <label className="f">Internal note <small>Only staff see this.</small><textarea name="adminNote" defaultValue={r.adminNote ?? ""} /></label>
            <div><SubmitButton pending="Saving…">Save details</SubmitButton></div>
          </form>
          <div className="card">
            <div className="card-head"><h2>Payment links</h2><Link className="btn sm" href={`/admin/payments/new?request=${r.trackingCode}`}>+ New</Link></div>
            {links.rows.length ? (
              <div className="table-wrap"><table><tbody>
                {links.rows.map((l) => (
                  <tr key={l.id}><td><Link className="mono" href={`/admin/payments/${l.id}`}>{l.code}</Link></td><td>{formatSar(l.amountHalalas)}</td><td><Badge tone={l.status === "paid" ? "ok" : l.status === "pending" ? "warn" : "bad"}>{l.status}</Badge></td></tr>
                ))}
              </tbody></table></div>
            ) : <p className="muted">No payment links for this request.</p>}
          </div>
        </div>
        <div>
          <form action={updateStage} className="card form">
            <div className="card-head" style={{ margin: 0 }}><h2>Update tracking stage</h2></div>
            <label className="f">Stage
              <select name="stage" defaultValue={Math.min(8, r.currentStage + 1)}>
                {STAGE_NAMES.en.map((n, i) => <option key={n} value={i + 1}>{i + 1}. {n}{i + 1 === r.currentStage ? " (current)" : ""}</option>)}
              </select>
            </label>
            <label className="f">Note <small>Saved in the history. Included in the customer email if one is sent.</small><textarea name="note" style={{ minHeight: 80 }} /></label>
            <label className="check"><input type="checkbox" name="notify" defaultChecked={!!r.email} disabled={!r.email} /> Email the customer {r.email ? <span className="muted small">({r.email})</span> : <span className="muted small">(no email on file)</span>}</label>
            <div><SubmitButton pending="Updating…" className="btn gold">Update stage</SubmitButton></div>
            <p className="muted small">The customer sees the new stage on the website’s tracking page straight away.</p>
          </form>
          <div className="card">
            <h2 style={{ marginBottom: 14 }}>History</h2>
            <ol className="timeline">
              {history.map((h, i) => (
                <li key={h.id}>
                  <span className={`dot ${i === 0 ? "now" : ""}`}>{h.stage}</span>
                  <div><strong>{STAGE_NAMES.en[h.stage - 1]}</strong>{h.note && <div style={{ whiteSpace: "pre-wrap" }}>{h.note}</div>}<div className="muted small">{fmtDateTime(h.at)} · {h.actor ?? "-"}</div></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
