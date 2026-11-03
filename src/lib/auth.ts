import "server-only";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { adminEnabled } from "./features";
import { logActivity } from "./activity";
import { hashPassword, signToken, verifyPassword, verifyToken } from "./crypto";
import { getDb, now, parseDate, type Row } from "./db";
import { allow } from "./rate-limit";

export type AdminUser = { id: number; email: string; name: string; role: "admin" | "staff"; isActive: boolean; lastLoginAt: Date | null; createdAt: Date };

const COOKIE = "araqah_admin";
const SESSION_HOURS = 12;

const toUser = (r: Row): AdminUser => ({
  id: Number(r.id),
  email: String(r.email),
  name: String(r.name),
  role: r.role === "staff" ? "staff" : "admin",
  isActive: Number(r.is_active) === 1,
  lastLoginAt: parseDate(r.last_login_at),
  createdAt: parseDate(r.created_at)!,
});

/** On a fresh database, creates the first admin from ADMIN_EMAIL and ADMIN_PASSWORD. */
export async function ensureFirstAdmin() {
  if (!adminEnabled()) return;
  const db = await getDb();
  if (Number((await db.get("SELECT COUNT(*) AS c FROM admin_users"))?.c ?? 0) > 0) return;
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return;
  await db.run("INSERT INTO admin_users (email, name, password_hash, role, is_active, created_at) VALUES (?, ?, ?, 'admin', 1, ?)", [
    ADMIN_EMAIL.trim().toLowerCase(),
    "Administrator",
    await hashPassword(ADMIN_PASSWORD),
    now(),
  ]);
  await logActivity({ actor: "system", kind: "team", message: `First admin ${ADMIN_EMAIL} created from environment settings` });
}

export async function hasAnyAdmin() {
  await ensureFirstAdmin();
  return Number((await (await getDb()).get("SELECT COUNT(*) AS c FROM admin_users"))?.c ?? 0) > 0;
}

export async function getSessionUser(): Promise<AdminUser | null> {
  if (!adminEnabled()) return null;
  const token = verifyToken<{ uid: number; exp: number }>((await cookies()).get(COOKIE)?.value);
  if (!token || token.exp < Date.now()) return null;
  const row = await (await getDb()).get("SELECT * FROM admin_users WHERE id = ? AND is_active = 1", [token.uid]);
  return row ? toUser(row) : null;
}

/** Use at the top of every admin page and server action. */
export async function requireAdmin(options: { adminOnly?: boolean } = {}): Promise<AdminUser> {
  if (!adminEnabled()) notFound();
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  if (options.adminOnly && user.role !== "admin") redirect("/admin?denied=1");
  return user;
}

export async function signIn(email: string, password: string, ip: string): Promise<string | null> {
  if (!adminEnabled()) return "The dashboard is switched off.";
  await ensureFirstAdmin();
  const address = email.trim().toLowerCase();
  if (!allow(`login:ip:${ip}`, 10, 15 * 60_000) || !allow(`login:email:${address}`, 6, 15 * 60_000)) {
    return "Too many attempts. Please wait 15 minutes and try again.";
  }
  const db = await getDb();
  const row = await db.get("SELECT * FROM admin_users WHERE email = ?", [address]);
  // Hash even when the user is unknown, so response time does not reveal which emails exist.
  const ok = await verifyPassword(password, row ? String(row.password_hash) : "scrypt$AAAAAAAAAAAAAAAAAAAAAA==$AAAA");
  if (!row || !ok || Number(row.is_active) !== 1) {
    await logActivity({ actor: address || "unknown", kind: "login", message: "Failed sign-in", ip });
    return "The email or password is not correct.";
  }
  await db.run("UPDATE admin_users SET last_login_at = ? WHERE id = ?", [now(), row.id as number]);
  (await cookies()).set(COOKIE, signToken({ uid: Number(row.id), exp: Date.now() + SESSION_HOURS * 3600_000 }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV !== "development",
    path: "/",
    maxAge: SESSION_HOURS * 3600,
  });
  await logActivity({ actor: address, kind: "login", message: "Signed in", ip });
  return null;
}

export async function signOut() {
  (await cookies()).delete(COOKIE);
}

export async function listUsers() {
  return (await (await getDb()).all("SELECT * FROM admin_users ORDER BY id")).map(toUser);
}

export async function createUser(input: { email: string; name: string; role: "admin" | "staff"; password: string }) {
  await (await getDb()).run("INSERT INTO admin_users (email, name, password_hash, role, is_active, created_at) VALUES (?, ?, ?, ?, 1, ?)", [
    input.email.trim().toLowerCase(), input.name.trim(), await hashPassword(input.password), input.role, now(),
  ]);
}

export async function setUserActive(id: number, active: boolean) {
  await (await getDb()).run("UPDATE admin_users SET is_active = ? WHERE id = ?", [active ? 1 : 0, id]);
}

export async function setUserRole(id: number, role: "admin" | "staff") {
  await (await getDb()).run("UPDATE admin_users SET role = ? WHERE id = ?", [role, id]);
}

export async function setUserPassword(id: number, password: string) {
  await (await getDb()).run("UPDATE admin_users SET password_hash = ? WHERE id = ?", [await hashPassword(password), id]);
}

export async function checkPassword(id: number, password: string) {
  const row = await (await getDb()).get("SELECT password_hash FROM admin_users WHERE id = ?", [id]);
  return !!row && (await verifyPassword(password, String(row.password_hash)));
}

export async function countActiveAdmins() {
  return Number((await (await getDb()).get("SELECT COUNT(*) AS c FROM admin_users WHERE is_active = 1 AND role = 'admin'"))?.c ?? 0);
}
