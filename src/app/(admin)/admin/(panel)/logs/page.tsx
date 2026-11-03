import { Badge, PageTop, Pager } from "@/components/admin/ui";
import { ACTIVITY_KINDS, listActivity } from "@/lib/activity";
import { requireAdmin } from "@/lib/auth";
import { fmtDateTime, pageNumber, param } from "@/lib/format";
import Link from "next/link";

export const metadata = { title: "Activity logs" };
const PAGE_SIZE = 40;
const TONE: Record<string, "ok" | "warn" | "bad" | "dark" | ""> = { login: "dark", mail: "warn", payment: "ok" };

export default async function LogsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdmin();
  const sp = await searchParams;
  const kind = param(sp.kind);
  const q = param(sp.q).trim();
  const page = pageNumber(sp.page);
  const { rows, total } = await listActivity({ kind: kind || undefined, q: q || undefined, page, pageSize: PAGE_SIZE });
  return (
    <>
      <PageTop title="Activity logs" intro="Sign-ins, new requests, customers tracking their request, stage changes, emails sent (and failures), payments, and every settings change. Times are Riyadh time." />
      <form className="card filters" method="get" style={{ marginBottom: 16 }}>
        <label className="f wide">Search<input type="search" name="q" defaultValue={q} placeholder="Message, person or request number" /></label>
        <label className="f">Type
          <select name="kind" defaultValue={kind}>
            <option value="">All</option>
            {ACTIVITY_KINDS.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </label>
        <div className="row"><button className="btn primary" type="submit">Filter</button><Link className="btn" href="/admin/logs">Clear</Link></div>
      </form>
      <div className="table-wrap">
        <table>
          <thead><tr><th>When</th><th>Type</th><th>Who</th><th>What</th><th>IP</th></tr></thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.id}>
                <td className="small" style={{ whiteSpace: "nowrap" }}>{fmtDateTime(new Date(`${a.at.replace(" ", "T")}Z`))}</td>
                <td><Badge tone={a.message.startsWith("FAILED") || a.message.startsWith("Failed") ? "bad" : TONE[a.kind] ?? ""}>{a.kind}</Badge></td>
                <td>{a.actor}</td>
                <td>{a.entity === "request" && /^\d+$/.test(a.entityId ?? "") ? <Link href={`/admin/requests/${a.entityId}`}>{a.message}</Link> : a.entity === "payment_link" ? <Link href={`/admin/payments/${a.entityId}`}>{a.message}</Link> : a.message}</td>
                <td className="muted small mono">{a.ip ?? ""}</td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={5} className="empty">No activity matches.</td></tr>}
          </tbody>
        </table>
      </div>
      <Pager base="/admin/logs" query={{ q, kind }} page={page} pageSize={PAGE_SIZE} total={total} />
    </>
  );
}
