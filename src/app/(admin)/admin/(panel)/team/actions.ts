"use server";

import { redirect } from "next/navigation";
import { backWith } from "@/components/admin/ui";
import { logActivity } from "@/lib/activity";
import { checkPassword, countActiveAdmins, createUser, listUsers, requireAdmin, setUserActive, setUserPassword, setUserRole } from "@/lib/auth";

const PATH = "/admin/team";
const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const MIN = 10;

export async function addUserAction(formData: FormData) {
  const me = await requireAdmin({ adminOnly: true });
  const email = str(formData, "email").toLowerCase();
  const name = str(formData, "name");
  const role = formData.get("role") === "admin" ? "admin" : "staff";
  const password = String(formData.get("password") ?? "");
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) redirect(backWith(PATH, "err", "Enter a name and a valid email."));
  if (password.length < MIN) redirect(backWith(PATH, "err", `The password must be at least ${MIN} characters.`));
  if ((await listUsers()).some((u) => u.email === email)) redirect(backWith(PATH, "err", "That email already has an account."));
  await createUser({ email, name, role, password });
  await logActivity({ actor: me.email, kind: "team", message: `Created ${role} account for ${email}` });
  redirect(backWith(PATH, "ok", `Account created for ${email}.`));
}

export async function toggleUserAction(id: number, active: boolean) {
  const me = await requireAdmin({ adminOnly: true });
  const target = (await listUsers()).find((u) => u.id === id);
  if (!target) redirect(PATH);
  if (!active && (target.id === me.id || (target.role === "admin" && (await countActiveAdmins()) <= 1))) {
    redirect(backWith(PATH, "err", "You cannot deactivate yourself or the last active admin."));
  }
  await setUserActive(id, active);
  await logActivity({ actor: me.email, kind: "team", message: `${active ? "Reactivated" : "Deactivated"} ${target.email}` });
  redirect(backWith(PATH, "ok", active ? "Account reactivated." : "Account deactivated. They can no longer sign in."));
}

export async function setRoleAction(id: number, formData: FormData) {
  const me = await requireAdmin({ adminOnly: true });
  const role = formData.get("role") === "admin" ? "admin" : "staff";
  const target = (await listUsers()).find((u) => u.id === id);
  if (!target) redirect(PATH);
  if (role === "staff" && target.role === "admin" && (await countActiveAdmins()) <= 1) redirect(backWith(PATH, "err", "There must be at least one active admin."));
  await setUserRole(id, role);
  await logActivity({ actor: me.email, kind: "team", message: `Set ${target.email} to ${role}` });
  redirect(backWith(PATH, "ok", "Role updated."));
}

export async function resetPasswordAction(id: number, formData: FormData) {
  const me = await requireAdmin({ adminOnly: true });
  const password = String(formData.get("password") ?? "");
  if (password.length < MIN) redirect(backWith(PATH, "err", `The password must be at least ${MIN} characters.`));
  const target = (await listUsers()).find((u) => u.id === id);
  if (!target) redirect(PATH);
  await setUserPassword(id, password);
  await logActivity({ actor: me.email, kind: "team", message: `Reset the password of ${target.email}` });
  redirect(backWith(PATH, "ok", `Password reset for ${target.email}.`));
}

export async function changeOwnPasswordAction(formData: FormData) {
  const me = await requireAdmin();
  const next = String(formData.get("next") ?? "");
  if (!(await checkPassword(me.id, String(formData.get("current") ?? "")))) redirect(backWith(PATH, "err", "Your current password is not correct."));
  if (next.length < MIN) redirect(backWith(PATH, "err", `The new password must be at least ${MIN} characters.`));
  if (next !== String(formData.get("confirm") ?? "")) redirect(backWith(PATH, "err", "The two new passwords do not match."));
  await setUserPassword(me.id, next);
  await logActivity({ actor: me.email, kind: "team", message: "Changed their own password" });
  redirect(backWith(PATH, "ok", "Password changed."));
}
