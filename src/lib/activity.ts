import "server-only";
import { getDb, now } from "./db";

export type ActivityKind =
  | "login"
  | "request"
  | "tracking"
  | "stage"
  | "mail"
  | "payment"
  | "settings"
  | "options"
  | "team";

export const ACTIVITY_KINDS: ActivityKind[] = ["login", "request", "tracking", "stage", "mail", "payment", "settings", "options", "team"];

type Entry = { actor: string; kind: ActivityKind; message: string; entity?: string; entityId?: string | number; ip?: string };

/** Never throws: a logging problem must not break the action being logged. */
export async function logActivity(entry: Entry) {
  try {
    const db = await getDb();
    await db.run(
      "INSERT INTO activity_logs (created_at, actor, kind, message, entity, entity_id, ip) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [now(), entry.actor, entry.kind, entry.message.slice(0, 500), entry.entity ?? null, entry.entityId == null ? null : String(entry.entityId), entry.ip ?? null],
    );
  } catch (error) {
    console.error("Could not write activity log", error);
  }
}

export type ActivityRow = { id: number; at: string; actor: string; kind: string; message: string; entity: string | null; entityId: string | null; ip: string | null };

export async function listActivity(filter: { kind?: string; q?: string; page: number; pageSize: number }) {
  const db = await getDb();
  const where: string[] = [];
  const params: (string | number)[] = [];
  if (filter.kind) {
    where.push("kind = ?");
    params.push(filter.kind);
  }
  if (filter.q) {
    where.push("(message LIKE ? OR actor LIKE ? OR entity_id LIKE ?)");
    params.push(`%${filter.q}%`, `%${filter.q}%`, `%${filter.q}%`);
  }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const total = Number((await db.get(`SELECT COUNT(*) AS c FROM activity_logs ${clause}`, params))?.c ?? 0);
  const rows = await db.all(
    `SELECT id, created_at, actor, kind, message, entity, entity_id, ip FROM activity_logs ${clause} ORDER BY id DESC LIMIT ? OFFSET ?`,
    [...params, filter.pageSize, (filter.page - 1) * filter.pageSize],
  );
  return {
    total,
    rows: rows.map<ActivityRow>((r) => ({
      id: Number(r.id),
      at: String(r.created_at),
      actor: String(r.actor),
      kind: String(r.kind),
      message: String(r.message),
      entity: (r.entity as string) ?? null,
      entityId: (r.entity_id as string) ?? null,
      ip: (r.ip as string) ?? null,
    })),
  };
}
