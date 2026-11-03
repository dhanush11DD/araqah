import Link from "next/link";
import { Badge, Flash, PageTop, Pager } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { fmtDateTime, pageNumber, param } from "@/lib/format";
import { listOptions, optionNames } from "@/lib/options";
import { STAGE_NAMES } from "@/lib/requests";
import { listRequests, type RequestFilter } from "@/lib/store";

export const metadata = { title: "Requests" };
const PAGE_SIZE = 20;

export default async function RequestsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdmin();
  const sp = await searchParams;
  const filter: RequestFilter = {
    q: param(sp.q).trim() || undefined,
    stage: Number(param(sp.stage)) || undefined,
    serviceType: param(sp.service) || undefined,
    profession: param(sp.profession) || undefined,
    nationality: param(sp.nationality) || undefined,
    from: param(sp.from) || undefined,
    to: param(sp.to) || undefined,
  };
  const page = pageNumber(sp.page);
  const [{ rows, total }, options, names] = await Promise.all([listRequests(filter, page, PAGE_SIZE), listOptions(), optionNames()]);
  const query = { q: param(sp.q), stage: param(sp.stage), service: param(sp.service), profession: param(sp.profession), nationality: param(sp.nationality), from: param(sp.from), to: param(sp.to) };
  const exportHref = `/admin/export/requests?${new URLSearchParams(Object.entries(query).filter(([, v]) => v))}`;
  const select = (name: string, label: string, kind: "service" | "profession" | "nationality", value: string) => (
    <label className="f">{label}
      <select name={name} defaultValue={value}>
        <option value="">All</option>
        {options.filter((o) => o.kind === kind).map((o) => <option key={o.id} value={o.code}>{o.nameEn}{o.isActive ? "" : " (hidden)"}</option>)}
      </select>
    </label>
  );
  return (
    <>
      <PageTop title="Requests" intro="Everyone who submitted the Request a worker form. Open one to update its stage, add an email address or an internal note.">
        <a className="btn" href={exportHref}>Export CSV</a>
      </PageTop>
      <Flash ok={param(sp.ok)} err={param(sp.err)} />
      <form className="card filters" method="get" style={{ marginBottom: 16 }}>
        <label className="f wide">Search<input type="search" name="q" defaultValue={query.q} placeholder="Name, mobile, email, city or request number" /></label>
        <label className="f">Stage
          <select name="stage" defaultValue={query.stage}>
            <option value="">All</option>
            {STAGE_NAMES.en.map((n, i) => <option key={n} value={i + 1}>{i + 1}. {n}</option>)}
          </select>
        </label>
        {select("service", "Service type", "service", query.service)}
        {select("profession", "Profession", "profession", query.profession)}
        {select("nationality", "Nationality", "nationality", query.nationality)}
        <label className="f">From<input type="date" name="from" defaultValue={query.from} /></label>
        <label className="f">To<input type="date" name="to" defaultValue={query.to} /></label>
        <div className="row"><button className="btn primary" type="submit">Filter</button><Link className="btn" href="/admin/requests">Clear</Link></div>
      </form>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Request</th><th>Customer</th><th>Service</th><th>Profession · Nationality</th><th>Contact</th><th>Stage</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td><Link className="mono" href={`/admin/requests/${r.id}`}><b>{r.trackingCode}</b></Link><div className="muted small">{fmtDateTime(r.createdAt)}</div></td>
                <td>{r.fullName}<div className="muted small" dir="ltr" style={{ textAlign: "left" }}>{r.phone}</div>{r.email && <div className="muted small">{r.email}</div>}</td>
                <td>{names.service[r.serviceType]?.en ?? r.serviceType}</td>
                <td>{names.profession[r.profession]?.en ?? r.profession}<div className="muted small">{names.nationality[r.nationality]?.en ?? r.nationality}</div></td>
                <td>{r.contactMethod === "email" ? "Email" : "Call"}<div className="muted small">{r.locale === "ar" ? "Arabic site" : "English site"}</div></td>
                <td><Badge tone={r.currentStage === 8 ? "ok" : r.currentStage === 1 ? "warn" : ""}>{r.currentStage}/8</Badge><div className="muted small">{STAGE_NAMES.en[r.currentStage - 1]}</div></td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={6} className="empty">No requests match.</td></tr>}
          </tbody>
        </table>
      </div>
      <Pager base="/admin/requests" query={query} page={page} pageSize={PAGE_SIZE} total={total} />
    </>
  );
}
