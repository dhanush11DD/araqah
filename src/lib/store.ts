import "server-only";
import { randomInt } from "node:crypto";
import { getDb, now, parseDate, type Row } from "./db";

export type NewRequest = {
  fullName: string;
  phone: string;
  city: string | null;
  serviceType: string;
  profession: string;
  nationality: string;
  contactMethod: string;
  notes: string | null;
  locale: string;
};

export type TrackingResult = {
  trackingCode: string;
  currentStage: number;
  history: { stage: number; at: string }[];
};

export type RequestRow = NewRequest & {
  id: number;
  trackingCode: string;
  email: string | null;
  adminNote: string | null;
  currentStage: number;
  createdAt: Date;
  updatedAt: Date;
};

export type HistoryRow = { id: number; stage: number; note: string | null; actor: string | null; at: Date };

// No 0/O/1/I so codes read back cleanly over the phone.
const CODE_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

export function newCode(prefix: string) {
  let suffix = "";
  for (let i = 0; i < 6; i++) suffix += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)];
  return `${prefix}-${String(new Date().getFullYear()).slice(2)}-${suffix}`;
}

const toRequest = (r: Row): RequestRow => ({
  id: Number(r.id),
  trackingCode: String(r.tracking_code),
  fullName: String(r.full_name),
  phone: String(r.phone),
  email: (r.email as string) ?? null,
  city: (r.city as string) ?? null,
  serviceType: String(r.service_type),
  profession: String(r.profession),
  nationality: String(r.nationality),
  contactMethod: String(r.contact_method),
  notes: (r.notes as string) ?? null,
  adminNote: (r.admin_note as string) ?? null,
  currentStage: Number(r.current_stage),
  locale: String(r.locale),
  createdAt: parseDate(r.created_at)!,
  updatedAt: parseDate(r.updated_at)!,
});

export async function createRequest(request: NewRequest): Promise<{ id: number; trackingCode: string }> {
  const db = await getDb();
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = newCode("ARQ");
    if (await db.get("SELECT id FROM recruitment_requests WHERE tracking_code = ?", [code])) continue;
    const at = now();
    return db.transaction(async (tx) => {
      const { insertId } = await tx.run(
        `INSERT INTO recruitment_requests
           (tracking_code, full_name, phone, city, service_type, profession, nationality, contact_method, notes, current_stage, locale, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)`,
        [code, request.fullName, request.phone, request.city, request.serviceType, request.profession, request.nationality, request.contactMethod, request.notes, request.locale, at, at],
      );
      await tx.run("INSERT INTO request_stage_history (request_id, stage, note, actor, created_at) VALUES (?, 1, NULL, 'customer', ?)", [insertId, at]);
      return { id: insertId, trackingCode: code };
    });
  }
  throw new Error("Could not allocate a unique tracking code");
}

export async function findForTracking(trackingCode: string, phone: string): Promise<TrackingResult | null> {
  const db = await getDb();
  const row = await db.get("SELECT id, tracking_code, current_stage FROM recruitment_requests WHERE tracking_code = ? AND phone = ?", [trackingCode, phone]);
  if (!row) return null;
  const history = await db.all("SELECT stage, created_at FROM request_stage_history WHERE request_id = ? ORDER BY created_at, id", [row.id as number]);
  return {
    trackingCode: String(row.tracking_code),
    currentStage: Number(row.current_stage),
    history: history.map((h) => ({ stage: Number(h.stage), at: parseDate(h.created_at)!.toISOString() })),
  };
}

export type RequestFilter = {
  q?: string;
  stage?: number;
  serviceType?: string;
  profession?: string;
  nationality?: string;
  from?: string; // YYYY-MM-DD, Riyadh time
  to?: string;
};

/** Riyadh is UTC+3 all year, so a calendar day there starts at 21:00 UTC the day before. */
export function riyadhDayStart(day: string, offsetDays = 0) {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + offsetDays);
  d.setUTCHours(d.getUTCHours() - 3);
  return now(d);
}

export const riyadhToday = () => new Date(Date.now() + 3 * 3600_000).toISOString().slice(0, 10);

function filterSql(f: RequestFilter) {
  const where: string[] = [];
  const params: (string | number)[] = [];
  if (f.q) {
    const like = `%${f.q}%`;
    where.push("(tracking_code LIKE ? OR full_name LIKE ? OR phone LIKE ? OR email LIKE ? OR city LIKE ?)");
    params.push(like, like, like, like, like);
  }
  if (f.stage) (where.push("current_stage = ?"), params.push(f.stage));
  if (f.serviceType) (where.push("service_type = ?"), params.push(f.serviceType));
  if (f.profession) (where.push("profession = ?"), params.push(f.profession));
  if (f.nationality) (where.push("nationality = ?"), params.push(f.nationality));
  if (f.from) (where.push("created_at >= ?"), params.push(riyadhDayStart(f.from)));
  if (f.to) (where.push("created_at < ?"), params.push(riyadhDayStart(f.to, 1)));
  return { clause: where.length ? `WHERE ${where.join(" AND ")}` : "", params };
}

export async function listRequests(filter: RequestFilter, page: number, pageSize: number) {
  const db = await getDb();
  const { clause, params } = filterSql(filter);
  const total = Number((await db.get(`SELECT COUNT(*) AS c FROM recruitment_requests ${clause}`, params))?.c ?? 0);
  const rows = await db.all(`SELECT * FROM recruitment_requests ${clause} ORDER BY id DESC LIMIT ? OFFSET ?`, [...params, pageSize, (page - 1) * pageSize]);
  return { total, rows: rows.map(toRequest) };
}

export async function allRequests(filter: RequestFilter) {
  const db = await getDb();
  const { clause, params } = filterSql(filter);
  return (await db.all(`SELECT * FROM recruitment_requests ${clause} ORDER BY id DESC LIMIT 5000`, params)).map(toRequest);
}

export async function getRequest(id: number) {
  const row = await (await getDb()).get("SELECT * FROM recruitment_requests WHERE id = ?", [id]);
  return row ? toRequest(row) : null;
}

export async function getRequestByCode(code: string) {
  const row = await (await getDb()).get("SELECT * FROM recruitment_requests WHERE tracking_code = ?", [code]);
  return row ? toRequest(row) : null;
}

export async function getHistory(requestId: number): Promise<HistoryRow[]> {
  const rows = await (await getDb()).all("SELECT * FROM request_stage_history WHERE request_id = ? ORDER BY created_at DESC, id DESC", [requestId]);
  return rows.map((r) => ({ id: Number(r.id), stage: Number(r.stage), note: (r.note as string) ?? null, actor: (r.actor as string) ?? null, at: parseDate(r.created_at)! }));
}

export async function setStage(id: number, stage: number, note: string | null, actor: string) {
  const db = await getDb();
  const at = now();
  await db.transaction(async (tx) => {
    await tx.run("UPDATE recruitment_requests SET current_stage = ?, updated_at = ? WHERE id = ?", [stage, at, id]);
    await tx.run("INSERT INTO request_stage_history (request_id, stage, note, actor, created_at) VALUES (?, ?, ?, ?, ?)", [id, stage, note, actor, at]);
  });
}

export async function updateRequestDetails(id: number, d: { email: string | null; adminNote: string | null; city: string | null }) {
  await (await getDb()).run("UPDATE recruitment_requests SET email = ?, admin_note = ?, city = ?, updated_at = ? WHERE id = ?", [d.email, d.adminNote, d.city, now(), id]);
}

export async function countBy(column: "current_stage" | "service_type" | "profession" | "nationality") {
  const rows = await (await getDb()).all(`SELECT ${column} AS k, COUNT(*) AS c FROM recruitment_requests GROUP BY ${column}`);
  return new Map(rows.map((r) => [String(r.k), Number(r.c)]));
}

export async function requestStats() {
  const db = await getDb();
  const today = riyadhToday();
  const count = async (since?: string) =>
    Number((await db.get(`SELECT COUNT(*) AS c FROM recruitment_requests ${since ? "WHERE created_at >= ?" : ""}`, since ? [since] : []))?.c ?? 0);
  const days = 14;
  const first = riyadhDayStart(today, -(days - 1));
  const recent = await db.all("SELECT created_at FROM recruitment_requests WHERE created_at >= ?", [first]);
  const trend = Array.from({ length: days }, (_, i) => {
    const start = riyadhDayStart(today, i - (days - 1));
    const end = riyadhDayStart(today, i - (days - 2));
    const day = new Date(Date.parse(`${start.replace(" ", "T")}Z`) + 3 * 3600_000).toISOString().slice(0, 10);
    return { day, count: recent.filter((r) => String(r.created_at) >= start && String(r.created_at) < end).length };
  });
  return {
    total: await count(),
    today: await count(riyadhDayStart(today)),
    week: await count(riyadhDayStart(today, -6)),
    withEmail: Number((await db.get("SELECT COUNT(*) AS c FROM recruitment_requests WHERE email IS NOT NULL AND email <> ''"))?.c ?? 0),
    trend,
  };
}
