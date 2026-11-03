import { getSessionUser } from "@/lib/auth";
import { adminEnabled } from "@/lib/features";
import { logActivity } from "@/lib/activity";
import { optionNames } from "@/lib/options";
import { allRequests, type RequestFilter } from "@/lib/store";

const cell = (v: unknown) => {
  let s = v == null ? "" : String(v);
  // A leading = + - @ would be run as a formula by Excel, so it is neutralised. Phone numbers are safe as they are.
  if (/^[=+\-@\t\r]/.test(s) && !/^\+?\d[\d\s-]*$/.test(s)) s = `'${s}`;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export async function GET(request: Request) {
  if (!adminEnabled()) return new Response(null, { status: 404 });
  const user = await getSessionUser();
  if (!user) return new Response("Unauthorized", { status: 401 });
  const p = new URL(request.url).searchParams;
  const filter: RequestFilter = {
    q: p.get("q") || undefined,
    stage: Number(p.get("stage")) || undefined,
    serviceType: p.get("service") || undefined,
    profession: p.get("profession") || undefined,
    nationality: p.get("nationality") || undefined,
    from: p.get("from") || undefined,
    to: p.get("to") || undefined,
  };
  const [rows, names] = await Promise.all([allRequests(filter), optionNames()]);
  const head = ["Request number", "Submitted (UTC)", "Name", "Mobile", "Email", "City", "Service", "Profession", "Nationality", "Contact method", "Stage", "Site language", "Customer notes", "Internal note"];
  const lines = [head.map(cell).join(",")];
  for (const r of rows) {
    lines.push([
      r.trackingCode, r.createdAt.toISOString(), r.fullName, r.phone, r.email, r.city,
      names.service[r.serviceType]?.en ?? r.serviceType, names.profession[r.profession]?.en ?? r.profession, names.nationality[r.nationality]?.en ?? r.nationality,
      r.contactMethod, r.currentStage, r.locale, r.notes, r.adminNote,
    ].map(cell).join(","));
  }
  await logActivity({ actor: user.email, kind: "request", message: `Exported ${rows.length} requests to CSV` });
  return new Response(`﻿${lines.join("\r\n")}\r\n`, {
    headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": `attachment; filename="araqah-requests-${new Date().toISOString().slice(0, 10)}.csv"`, "cache-control": "no-store" },
  });
}
