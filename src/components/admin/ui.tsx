import Link from "next/link";
import type { ReactNode } from "react";

export function Flash({ ok, err }: { ok?: string; err?: string }) {
  if (!ok && !err) return null;
  return (
    <div className={`flash ${err ? "err" : "ok"}`} role={err ? "alert" : "status"}>
      {err || ok}
    </div>
  );
}

export function PageTop({ title, intro, children }: { title: string; intro?: ReactNode; children?: ReactNode }) {
  return (
    <div className="top">
      <div>
        <h1>{title}</h1>
        {intro && <p className="muted">{intro}</p>}
      </div>
      {children && <div className="row">{children}</div>}
    </div>
  );
}

export function Badge({ tone = "", children }: { tone?: "ok" | "warn" | "bad" | "dark" | ""; children: ReactNode }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

export function Bars({ rows, total }: { rows: { name: string; count: number }[]; total?: number }) {
  const max = total ?? Math.max(1, ...rows.map((r) => r.count));
  if (!rows.length) return <p className="muted">No data yet.</p>;
  return (
    <div className="bars">
      {rows.map((r) => (
        <div key={r.name} className="bar">
          <span className="name" title={r.name}>{r.name}</span>
          <span className="track"><span className="fill" style={{ display: "block", width: `${(r.count / max) * 100}%` }} /></span>
          <b>{r.count}</b>
        </div>
      ))}
    </div>
  );
}

/** Previous / next links that keep the current filters. */
export function Pager({ base, query, page, pageSize, total }: { base: string; query: Record<string, string>; page: number; pageSize: number; total: number }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const href = (p: number) => {
    const q = new URLSearchParams(Object.entries(query).filter(([, v]) => v));
    if (p > 1) q.set("page", String(p));
    const s = q.toString();
    return s ? `${base}?${s}` : base;
  };
  const from = total ? (page - 1) * pageSize + 1 : 0;
  return (
    <div className="pager">
      <span className="muted">{from}–{Math.min(total, page * pageSize)} of {total}</span>
      <div className="row">
        {page > 1 ? <Link className="btn sm" href={href(page - 1)}>← Previous</Link> : <span className="btn sm" aria-disabled style={{ opacity: 0.4 }}>← Previous</span>}
        <span className="muted">Page {page} of {pages}</span>
        {page < pages ? <Link className="btn sm" href={href(page + 1)}>Next →</Link> : <span className="btn sm" aria-disabled style={{ opacity: 0.4 }}>Next →</span>}
      </div>
    </div>
  );
}

/** Stops an action and sends the user back with a message in the URL. */
export function backWith(path: string, kind: "ok" | "err", message: string) {
  const joiner = path.includes("?") ? "&" : "?";
  return `${path}${joiner}${kind}=${encodeURIComponent(message)}`;
}
