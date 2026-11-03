import "server-only";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

export type Row = Record<string, unknown>;
type Param = string | number | null;

export interface Queryable {
  all(sql: string, params?: Param[]): Promise<Row[]>;
  get(sql: string, params?: Param[]): Promise<Row | null>;
  run(sql: string, params?: Param[]): Promise<{ insertId: number; changes: number }>;
}

export interface Db extends Queryable {
  transaction<T>(fn: (tx: Queryable) => Promise<T>): Promise<T>;
}

/** "YYYY-MM-DD HH:MM:SS" in UTC, the format stored in every DATETIME column. */
export function now(date = new Date()) {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

export function parseDate(value: unknown): Date | null {
  if (!value) return null;
  const text = String(value);
  return new Date(/[zZ]|[+-]\d\d:?\d\d$/.test(text) ? text : `${text.replace(" ", "T")}Z`);
}

// ---------------------------------------------------------------- schema

type Table = { name: string; columns: string[]; indexes?: string[][] };

function tables(): Table[] {
  const id = "id INTEGER PRIMARY KEY AUTOINCREMENT";
  return [
    {
      name: "admin_users",
      columns: [
        id,
        "email VARCHAR(190) NOT NULL UNIQUE",
        "name VARCHAR(120) NOT NULL",
        "password_hash VARCHAR(255) NOT NULL",
        "role VARCHAR(16) NOT NULL DEFAULT 'admin'",
        "is_active TINYINT NOT NULL DEFAULT 1",
        "last_login_at DATETIME NULL",
        "created_at DATETIME NOT NULL",
      ],
    },
    {
      name: "settings",
      columns: [
        "skey VARCHAR(100) NOT NULL PRIMARY KEY",
        "svalue TEXT NULL",
        "is_secret TINYINT NOT NULL DEFAULT 0",
        "updated_at DATETIME NOT NULL",
      ],
    },
    {
      name: "form_options",
      columns: [
        id,
        "kind VARCHAR(20) NOT NULL",
        "code VARCHAR(40) NOT NULL",
        "name_en VARCHAR(120) NOT NULL",
        "name_ar VARCHAR(120) NOT NULL",
        "sort_order INT NOT NULL DEFAULT 0",
        "is_active TINYINT NOT NULL DEFAULT 1",
        "UNIQUE (kind, code)",
      ],
    },
    {
      name: "recruitment_requests",
      columns: [
        id,
        "tracking_code VARCHAR(16) NOT NULL UNIQUE",
        "full_name VARCHAR(120) NOT NULL",
        "phone VARCHAR(16) NOT NULL",
        "email VARCHAR(190) NULL",
        "city VARCHAR(80) NULL",
        "service_type VARCHAR(40) NOT NULL",
        "profession VARCHAR(40) NOT NULL",
        "nationality VARCHAR(40) NOT NULL",
        "contact_method VARCHAR(16) NOT NULL",
        "notes TEXT NULL",
        "admin_note TEXT NULL",
        "current_stage INT NOT NULL DEFAULT 1",
        "locale VARCHAR(2) NOT NULL DEFAULT 'ar'",
        "created_at DATETIME NOT NULL",
        "updated_at DATETIME NOT NULL",
      ],
      indexes: [["phone"], ["created_at"], ["current_stage"]],
    },
    {
      name: "request_stage_history",
      columns: [
        id,
        "request_id INT NOT NULL",
        "stage INT NOT NULL",
        "note VARCHAR(500) NULL",
        "actor VARCHAR(190) NULL",
        "created_at DATETIME NOT NULL",
        "FOREIGN KEY (request_id) REFERENCES recruitment_requests (id) ON DELETE CASCADE",
      ],
      indexes: [["request_id"]],
    },
    {
      name: "mail_templates",
      columns: [
        "tkey VARCHAR(40) NOT NULL PRIMARY KEY",
        "subject_en VARCHAR(250) NOT NULL",
        "subject_ar VARCHAR(250) NOT NULL",
        "body_en TEXT NOT NULL",
        "body_ar TEXT NOT NULL",
        "is_enabled TINYINT NOT NULL DEFAULT 1",
        "updated_at DATETIME NOT NULL",
      ],
    },
    {
      name: "payment_links",
      columns: [
        id,
        "code VARCHAR(16) NOT NULL UNIQUE",
        "amount_halalas INT NOT NULL",
        "currency VARCHAR(3) NOT NULL DEFAULT 'SAR'",
        "description VARCHAR(250) NOT NULL",
        "customer_name VARCHAR(120) NOT NULL",
        "customer_phone VARCHAR(16) NULL",
        "customer_email VARCHAR(190) NULL",
        "request_id INT NULL",
        "locale VARCHAR(2) NOT NULL DEFAULT 'ar'",
        "status VARCHAR(16) NOT NULL DEFAULT 'pending'",
        "expires_at DATETIME NULL",
        "moyasar_payment_id VARCHAR(64) NULL",
        "payment_method VARCHAR(32) NULL",
        "paid_at DATETIME NULL",
        "last_error VARCHAR(250) NULL",
        "emailed_at DATETIME NULL",
        "created_by VARCHAR(190) NULL",
        "created_at DATETIME NOT NULL",
        "updated_at DATETIME NOT NULL",
      ],
      indexes: [["status"], ["created_at"]],
    },
    {
      name: "activity_logs",
      columns: [
        id,
        "created_at DATETIME NOT NULL",
        "actor VARCHAR(190) NOT NULL",
        "kind VARCHAR(32) NOT NULL",
        "message VARCHAR(500) NOT NULL",
        "entity VARCHAR(32) NULL",
        "entity_id VARCHAR(64) NULL",
        "ip VARCHAR(64) NULL",
      ],
      indexes: [["created_at"], ["kind"]],
    },
  ];
}

async function migrate(db: Db) {
  for (const t of tables()) {
    await db.run(`CREATE TABLE IF NOT EXISTS ${t.name} (${t.columns.join(", ")})`);
    for (const c of t.indexes ?? []) {
      await db.run(`CREATE INDEX IF NOT EXISTS idx_${t.name}_${c.join("_")} ON ${t.name} (${c.join(", ")})`);
    }
  }
}

// ---------------------------------------------------------------- database file

/**
 * The whole site's data lives in one SQLite file. Set DATABASE_PATH to keep it somewhere that
 * survives redeploys (and back it up); the default is .data/araqah.sqlite next to the app.
 */
export const databasePath = () => process.env.DATABASE_PATH || ".data/araqah.sqlite";

async function openDatabase(): Promise<Db> {
  // webpackIgnore keeps this a real runtime import of Node's built-in SQLite (Node 22.5 or newer).
  const { DatabaseSync } = await import(/* webpackIgnore: true */ "node:sqlite");
  const path = databasePath();
  mkdirSync(dirname(path), { recursive: true });
  const file = new DatabaseSync(path);
  file.exec("PRAGMA busy_timeout = 5000; PRAGMA foreign_keys = ON;");
  try {
    file.exec("PRAGMA journal_mode = WAL;");
  } catch {
    // Some network drives cannot do WAL; the default journal still works.
  }
  const clean = (params: Param[]) => params.map((p) => (p === undefined ? null : p));
  const raw: Queryable = {
    async all(sql, params = []) {
      return file.prepare(sql).all(...clean(params)) as Row[];
    },
    async get(sql, params = []) {
      return (file.prepare(sql).get(...clean(params)) as Row | undefined) ?? null;
    },
    async run(sql, params = []) {
      const res = file.prepare(sql).run(...clean(params));
      return { insertId: Number(res.lastInsertRowid), changes: Number(res.changes) };
    },
  };

  // One connection serves every visitor, so work runs one job at a time. That keeps a
  // transaction from being interleaved with another request's statements.
  let queue: Promise<unknown> = Promise.resolve();
  const exclusive = <T,>(job: () => Promise<T>): Promise<T> => {
    const result = queue.then(job, job);
    queue = result.catch(() => undefined);
    return result;
  };

  return {
    all: (sql, params) => exclusive(() => raw.all(sql, params)),
    get: (sql, params) => exclusive(() => raw.get(sql, params)),
    run: (sql, params) => exclusive(() => raw.run(sql, params)),
    transaction: (fn) =>
      exclusive(async () => {
        file.exec("BEGIN IMMEDIATE");
        try {
          const result = await fn(raw);
          file.exec("COMMIT");
          return result;
        } catch (error) {
          file.exec("ROLLBACK");
          throw error;
        }
      }),
  };
}

const globalDb = globalThis as unknown as { araqahDb?: Promise<Db> };

export function getDb(): Promise<Db> {
  globalDb.araqahDb ??= (async () => {
    const db = await openDatabase();
    await migrate(db);
    return db;
  })().catch((error) => {
    globalDb.araqahDb = undefined;
    throw error;
  });
  return globalDb.araqahDb;
}
