import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SubmitButton from "@/components/admin/SubmitButton";
import { Flash } from "@/components/admin/ui";
import { getSessionUser, hasAnyAdmin } from "@/lib/auth";
import { param } from "@/lib/format";
import { loginAction } from "./actions";

export const metadata: Metadata = { title: "Sign in" };
export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (await getSessionUser()) redirect("/admin");
  const sp = await searchParams;
  const ready = await hasAnyAdmin();
  return (
    <div className="login">
      <div className="card">
        <div className="brand"><b>A</b> Araqah Admin</div>
        <h1 style={{ fontSize: 22 }}>Sign in</h1>
        <p className="muted" style={{ margin: "6px 0 18px" }}>Use your dashboard account.</p>
        <Flash err={param(sp.err)} />
        {!ready && (
          <p className="notice" style={{ marginBottom: 16 }}>
            No admin account exists yet. Set <code>ADMIN_EMAIL</code> and <code>ADMIN_PASSWORD</code> on the server, then restart. The first admin is created from them.
          </p>
        )}
        <form action={loginAction} className="form">
          <label className="f">Email<input type="email" name="email" autoComplete="username" required autoFocus /></label>
          <label className="f">Password<input type="password" name="password" autoComplete="current-password" required /></label>
          <SubmitButton pending="Signing in…" className="btn primary">Sign in</SubmitButton>
        </form>
      </div>
    </div>
  );
}
