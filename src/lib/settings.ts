import "server-only";
import { decrypt, encrypt } from "./crypto";
import { getDb, now } from "./db";

/** Settings live in the database so admins can change them without redeploying; env vars are the fallback. */
export async function getSettings(keys: string[]) {
  const db = await getDb();
  const rows = await db.all(`SELECT skey, svalue, is_secret FROM settings WHERE skey IN (${keys.map(() => "?").join(",")})`, keys);
  const out: Record<string, string> = {};
  for (const row of rows) {
    const value = String(row.svalue ?? "");
    out[String(row.skey)] = Number(row.is_secret) ? decrypt(value) : value;
  }
  return out;
}

export type SettingInput = { key: string; value: string; secret?: boolean };

export async function saveSettings(inputs: SettingInput[]) {
  const db = await getDb();
  const at = now();
  for (const { key, value, secret } of inputs) {
    const stored = secret && value ? encrypt(value) : value;
    const existing = await db.get("SELECT skey FROM settings WHERE skey = ?", [key]);
    if (existing) {
      await db.run("UPDATE settings SET svalue = ?, is_secret = ?, updated_at = ? WHERE skey = ?", [stored, secret ? 1 : 0, at, key]);
    } else {
      await db.run("INSERT INTO settings (skey, svalue, is_secret, updated_at) VALUES (?, ?, ?, ?)", [key, stored, secret ? 1 : 0, at]);
    }
  }
}

export type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  adminEmails: string[];
};

export async function getSmtpConfig(): Promise<SmtpConfig> {
  const s = await getSettings(["smtp.host", "smtp.port", "smtp.secure", "smtp.user", "smtp.pass", "smtp.from", "mail.adminEmails"]);
  const env = process.env;
  const port = Number(s["smtp.port"] || env.SMTP_PORT || 587);
  const secure = s["smtp.secure"] ? s["smtp.secure"] === "1" : port === 465;
  return {
    host: s["smtp.host"] || env.SMTP_HOST || "",
    port,
    secure,
    user: s["smtp.user"] || env.SMTP_USER || "",
    pass: s["smtp.pass"] || env.SMTP_PASS || "",
    from: s["smtp.from"] || env.SMTP_FROM || "",
    adminEmails: (s["mail.adminEmails"] ?? env.ADMIN_EMAILS ?? "").split(/[,;\s]+/).filter(Boolean),
  };
}

export type MoyasarConfig = {
  publishableKey: string;
  secretKey: string;
  webhookSecret: string;
  apiBase: string;
};

export async function getMoyasarConfig(): Promise<MoyasarConfig> {
  const s = await getSettings(["moyasar.publishableKey", "moyasar.secretKey", "moyasar.webhookSecret"]);
  const env = process.env;
  return {
    publishableKey: s["moyasar.publishableKey"] || env.MOYASAR_PUBLISHABLE_KEY || "",
    secretKey: s["moyasar.secretKey"] || env.MOYASAR_SECRET_KEY || "",
    webhookSecret: s["moyasar.webhookSecret"] || env.MOYASAR_WEBHOOK_SECRET || "",
    apiBase: (env.MOYASAR_API_URL || "https://api.moyasar.com/v1").replace(/\/$/, ""),
  };
}

export function siteUrl() {
  return (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}
