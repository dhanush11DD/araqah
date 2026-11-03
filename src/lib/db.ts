import "server-only";
import { mkdirSync } from "node:fs";
import mysql, { type Pool, type PoolConnection, type ResultSetHeader } from "mysql2/promise";

export type Row = Record<string, unknown>;
type Param = string | number | null;

export interface Queryable {
  all(sql: string, params?: Param[]): Promise<Row[]>;
  get(sql: string, params?: Param[]): Promise<Row | null>;
  run(sql: string, params?: Param[]): Promise<{ insertId: number; changes: number }>;
}

export interface Db extends Queryable {
  dialect: "mysql" | "sqlite";
  transaction<T>(fn: (tx: Queryable) => Promise<T>): Promise<T>;
}

/** "YYYY-MM-DD HH:MM:SS" in UTC, the format both MySQL and SQLite store. */
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

const ID = { mysql: "INT NOT NULL AUTO_INCREMENT PRIMARY KEY", sqlite: "INTEGER PRIMARY KEY AUTOINCREMENT" };

function tables(d: Db["dialect"]): Table[] {
  const id = `id ${ID[d]}`;
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
  for (const t of tables(db.dialect)) {
    const tail = db.dialect === "mysql" ? ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci" : ")";
    const mysqlIndexes = db.dialect === "mysql" ? (t.indexes ?? []).map((c) => `, INDEX idx_${t.name}_${c.join("_")} (${c.join(", ")})`).join("") : "";
    await db.run(`CREATE TABLE IF NOT EXISTS ${t.name} (${t.columns.join(", ")}${mysqlIndexes}${tail}`);
    if (db.dialect === "sqlite") {
      for (const c of t.indexes ?? []) {
        await db.run(`CREATE INDEX IF NOT EXISTS idx_${t.name}_${c.join("_")} ON ${t.name} (${c.join(", ")})`);
      }
    }
  }
}

// ---------------------------------------------------------------- drivers

function mysqlDb(url: string): Db {
  const pool: Pool = mysql.createPool({ uri: url, connectionLimit: 8, timezone: "Z", dateStrings: true, charset: "utf8mb4" });
  const over = (q: Pool | PoolConnection): Queryable => ({
    async all(sql, params = []) {
      const [rows] = await q.query(sql, params);
      return rows as Row[];
    },
    async get(sql, params = []) {
      const [rows] = await q.query(sql, params);
      return ((rows as Row[])[0] as Row | undefined) ?? null;
    },
    async run(sql, params = []) {
      const [res] = await q.query(sql, params);
      const header = res as ResultSetHeader;
      return { insertId: Number(header.insertId ?? 0), changes: Number(header.affectedRows ?? 0) };
    },
  });
  return {
    dialect: "mysql",
    ...over(pool),
    async transaction(fn) {
      const conn = await pool.getConnection();
      try {
        await conn.beginTransaction();
        const result = await fn(over(conn));
        await conn.commit();
        return result;
      } catch (error) {
        await conn.rollback();
        throw error;
      } finally {
        conn.release();
      }
    },
  };
}

async function sqliteDb(): Promise<Db> {
  // Development only: a local file so the admin works without a MySQL server.
  const { DatabaseSync } = await import("node:sqlite");
  mkdirSync(".data", { recursive: true });
  const file = new DatabaseSync(".data/dev.sqlite");
  file.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");
  const clean = (params: Param[]) => params.map((p) => (p === undefined ? null : p));
  const q: Queryable = {
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
  return {
    dialect: "sqlite",
    ...q,
    async transaction(fn) {
      file.exec("BEGIN");
      try {
        const result = await fn(q);
        file.exec("COMMIT");
        return result;
      } catch (error) {
        file.exec("ROLLBACK");
        throw error;
      }
    },
  };
}

const globalDb = globalThis as unknown as { araqahDb?: Promise<Db> };

export function getDb(): Promise<Db> {
  globalDb.araqahDb ??= (async () => {
    const url = process.env.DATABASE_URL;
    if (!url && process.env.NODE_ENV === "production") throw new Error("DATABASE_URL is not set");
    if (!url) console.warn("DATABASE_URL is not set: using the local SQLite file .data/dev.sqlite (development only).");
    const db = url ? mysqlDb(url) : await sqliteDb();
    await migrate(db);
    return db;
  })().catch((error) => {
    globalDb.araqahDb = undefined;
    throw error;
  });
  return globalDb.araqahDb;
}
