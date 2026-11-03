import Link from "next/link";
import { Badge, Bars, PageTop } from "@/components/admin/ui";
import { listActivity } from "@/lib/activity";
import { requireAdmin } from "@/lib/auth";
import { fmtDateTime } from "@/lib/format";
import { optionNames } from "@/lib/options";
import { formatSar, paymentStats } from "@/lib/payments";
import { STAGE_NAMES } from "@/lib/requests";
import { getMoyasarConfig, getSmtpConfig } from "@/lib/settings";
import { countBy, listRequests, requestStats } from "@/lib/store";
import { isSmtpReady } from "@/lib/mail";

export const metadata = { title: "Dashboard" };

export default async function Overview({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const user = await requireAdmin();
  const sp = await searchParams;
  const [stats, pay, names, byStage, byService, byProfession, byNationality, recent, activity, smtp, moyasar] = await Promise.all([
    requestStats(), paymentStats(), optionNames(), countBy("current_stage"), countBy("service_type"), countBy("profession"), countBy("nationality"),
    listRequests({}, 1, 6), listActivity({ page: 1, pageSize: 8 }), getSmtpConfig(), getMoyasarConfig(),
  ]);
  const top = (counts: Map<string, number>, kind: "service" | "profession" | "nationality") =>
    [...counts].map(([code, count]) => ({ name: names[kind][code]?.en ?? code, count })).sort((a, b) => b.count - a.count).slice(0, 6);
  const maxTrend = Math.max(1, ...stats.trend.map((t) => t.count));
  const todo = [
    !isSmtpReady(smtp) && { text: "The mail server is not set up, so no emails are being sent.", href: "/admin/mail-server" },
    !smtp.adminEmails.length && { text: "No staff email addresses are set for new-request alerts.", href: "/admin/mail-server" },
    (!moyasar.publishableKey || !moyasar.secretKey) && { text: "The payment gateway (Moyasar) keys are not set, so payment links cannot be paid.", href: "/admin/payment-gateway" },
    !moyasar.webhookSecret && { text: "No Moyasar webhook secret is set. Payments still work, but a customer who closes the page early is only confirmed by a manual re-check.", href: "/admin/payment-gateway" },
  ].filter(Boolean) as { text: string; href: string }[];

  return (
    <>
      <PageTop title="Dashboard" intro={`Welcome back, ${user.name}.`}>
        <Link className="btn gold" href="/admin/payments/new">+ New payment link</Link>
        <Link className="btn" href="/admin/requests">All requests</Link>
      </PageTop>
      {sp.denied && <p className="flash err">That page is for administrators only.</p>}
      {user.role === "admin" && todo.length > 0 && (
        <div className="card" style={{ marginBottom: 16, background: "#FFF9E0" }}>
          <h2>Finish setting up</h2>
          <ul className="steps" style={{ marginTop: 10 }}>
            {todo.map((t) => (
              <li key={t.text}><Badge tone="warn">To do</Badge> <span>{t.text} <Link href={t.href}>Open settings →</Link></span></li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid g4">
        <div className="stat dark"><div className="l">Total requests</div><div className="n">{stats.total}</div></div>
        <div className="stat"><div className="l">New today</div><div className="n">{stats.today}</div></div>
        <div className="stat"><div className="l">Last 7 days</div><div className="n">{stats.week}</div></div>
        <div className="stat"><div className="l">Paid via links</div><div className="n" style={{ fontSize: 24 }}>{formatSar(pay.paidTotal)}</div><div className="muted small">{pay.paidCount} payments · {pay.openCount} open links ({formatSar(pay.openTotal)})</div></div>
      </div>

      <div className="split" style={{ marginTop: 16 }}>
        <div className="card">
          <div className="card-head"><h2>Requests, last 14 days</h2><span className="muted small">Riyadh time</span></div>
          <div className="trend" role="img" aria-label="Requests per day over the last 14 days">
            {stats.trend.map((t) => (
              <div key={t.day} title={`${t.day}: ${t.count}`}>
                <i style={{ height: `${(t.count / maxTrend) * 100}%` }} />
                <span><b>{t.count}</b><br />{t.day.slice(8)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-head"><h2>By tracking stage</h2></div>
          <Bars rows={STAGE_NAMES.en.map((name, i) => ({ name: `${i + 1}. ${name}`, count: byStage.get(String(i + 1)) ?? 0 }))} />
        </div>
      </div>

      <div className="grid g3" style={{ marginTop: 16 }}>
        <div className="card"><div className="card-head"><h2>Service type</h2></div><Bars rows={top(byService, "service")} /></div>
        <div className="card"><div className="card-head"><h2>Profession</h2></div><Bars rows={top(byProfession, "profession")} /></div>
        <div className="card"><div className="card-head"><h2>Nationality</h2></div><Bars rows={top(byNationality, "nationality")} /></div>
      </div>

      <div className="split" style={{ marginTop: 16 }}>
        <div className="card">
          <div className="card-head"><h2>Newest requests</h2><Link href="/admin/requests">View all →</Link></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Request</th><th>Customer</th><th>Profession</th><th>Stage</th></tr></thead>
              <tbody>
                {recent.rows.map((r) => (
                  <tr key={r.id}>
                    <td><Link className="mono" href={`/admin/requests/${r.id}`}>{r.trackingCode}</Link><div className="muted small">{fmtDateTime(r.createdAt)}</div></td>
                    <td>{r.fullName}<div className="muted small">{r.phone}</div></td>
                    <td>{names.profession[r.profession]?.en ?? r.profession}<div className="muted small">{names.nationality[r.nationality]?.en ?? r.nationality}</div></td>
                    <td><Badge tone={r.currentStage === 8 ? "ok" : r.currentStage === 1 ? "warn" : ""}>{r.currentStage}/8</Badge></td>
                  </tr>
                ))}
                {!recent.rows.length && <tr><td colSpan={4} className="empty">No requests yet. They appear here as soon as a customer submits the form.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-head"><h2>Recent activity</h2><Link href="/admin/logs">All logs →</Link></div>
          <ul className="steps" style={{ gap: 12 }}>
            {activity.rows.map((a) => (
              <li key={a.id} style={{ alignItems: "flex-start" }}>
                <Badge>{a.kind}</Badge>
                <span style={{ minWidth: 0 }}>{a.message}<div className="muted small">{a.actor} · {fmtDateTime(new Date(`${a.at.replace(" ", "T")}Z`))}</div></span>
              </li>
            ))}
            {!activity.rows.length && <li className="muted">Nothing yet.</li>}
          </ul>
        </div>
      </div>
    </>
  );
}
