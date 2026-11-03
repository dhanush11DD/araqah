import Link from "next/link";
import { Badge, Flash, PageTop, Pager } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { fmtDateTime, pageNumber, param } from "@/lib/format";
import { formatSar, listLinks, paymentStats } from "@/lib/payments";

export const metadata = { title: "Payment links" };
const PAGE_SIZE = 20;
const statusTone = (s: string) => (s === "paid" ? "ok" : s === "pending" ? "warn" : "bad") as "ok" | "warn" | "bad";

export default async function PaymentsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdmin();
  const sp = await searchParams;
  const q = param(sp.q).trim();
  const status = param(sp.status);
  const page = pageNumber(sp.page);
  const [{ rows, total }, stats] = await Promise.all([listLinks({ q: q || undefined, status: status || undefined }, page, PAGE_SIZE), paymentStats()]);
  return (
    <>
      <PageTop title="Payment links" intro="Create a secure link for an amount, send it to a customer, and watch it get paid.">
        <Link className="btn gold" href="/admin/payments/new">+ New payment link</Link>
      </PageTop>
      <Flash ok={param(sp.ok)} err={param(sp.err)} />
      <div className="grid g3" style={{ marginBottom: 16 }}>
        <div className="stat dark"><div className="l">Collected</div><div className="n">{formatSar(stats.paidTotal)}</div><div className="muted small">{stats.paidCount} paid links</div></div>
        <div className="stat"><div className="l">Waiting to be paid</div><div className="n">{formatSar(stats.openTotal)}</div><div className="muted small">{stats.openCount} open links</div></div>
        <div className="stat"><div className="l">Gateway</div><div className="n" style={{ fontSize: 18 }}><Link href="/admin/payment-gateway">Check connection →</Link></div></div>
      </div>
      <form className="card filters" method="get" style={{ marginBottom: 16 }}>
        <label className="f wide">Search<input type="search" name="q" defaultValue={q} placeholder="Code, customer, mobile, email or description" /></label>
        <label className="f">Status
          <select name="status" defaultValue={status}>
            <option value="">All</option><option value="pending">Open</option><option value="paid">Paid</option><option value="expired">Expired</option><option value="cancelled">Cancelled</option>
          </select>
        </label>
        <div className="row"><button className="btn primary" type="submit">Filter</button><Link className="btn" href="/admin/payments">Clear</Link></div>
      </form>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Link</th><th>Customer</th><th>For</th><th className="num">Amount</th><th>Status</th></tr></thead>
          <tbody>
            {rows.map((l) => (
              <tr key={l.id}>
                <td><Link className="mono" href={`/admin/payments/${l.id}`}><b>{l.code}</b></Link><div className="muted small">{fmtDateTime(l.createdAt)}</div></td>
                <td>{l.customerName}<div className="muted small">{l.customerEmail ?? l.customerPhone ?? ""}</div></td>
                <td style={{ maxWidth: 260 }}>{l.description}</td>
                <td className="num"><b>{formatSar(l.amountHalalas)}</b></td>
                <td><Badge tone={statusTone(l.status)}>{l.status === "pending" ? "open" : l.status}</Badge>{l.paidAt && <div className="muted small">{fmtDateTime(l.paidAt)}</div>}</td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={5} className="empty">No payment links yet.</td></tr>}
          </tbody>
        </table>
      </div>
      <Pager base="/admin/payments" query={{ q, status }} page={page} pageSize={PAGE_SIZE} total={total} />
    </>
  );
}
