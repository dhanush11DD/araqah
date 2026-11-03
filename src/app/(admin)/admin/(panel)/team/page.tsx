import SubmitButton from "@/components/admin/SubmitButton";
import { Badge, Flash, PageTop } from "@/components/admin/ui";
import { listUsers, requireAdmin } from "@/lib/auth";
import { fmtDateTime, param } from "@/lib/format";
import { addUserAction, changeOwnPasswordAction, resetPasswordAction, setRoleAction, toggleUserAction } from "./actions";

export const metadata = { title: "Team & account" };

export default async function TeamPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const me = await requireAdmin();
  const sp = await searchParams;
  const users = me.role === "admin" ? await listUsers() : [];
  return (
    <>
      <PageTop title="Team & account" intro="Dashboard accounts. Admins can change settings and manage the team; staff can work with requests, payment links and mail templates." />
      <Flash ok={param(sp.ok)} err={param(sp.err)} />
      <div className="grid">
        <div>
          {me.role === "admin" && (
            <div className="card">
              <h2 style={{ marginBottom: 14 }}>Team</h2>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Person</th><th>Role</th><th>Last sign-in</th><th /></tr></thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} style={u.isActive ? undefined : { opacity: 0.6 }}>
                        <td><b>{u.name}</b>{u.id === me.id && " (you)"}<div className="muted small">{u.email}</div>{!u.isActive && <Badge tone="bad">Deactivated</Badge>}</td>
                        <td>
                          <form action={setRoleAction.bind(null, u.id)} className="row" style={{ flexWrap: "nowrap" }}>
                            <select name="role" defaultValue={u.role} aria-label={`Role of ${u.name}`} style={{ minWidth: 100 }}><option value="admin">Admin</option><option value="staff">Staff</option></select>
                            <SubmitButton className="btn sm" pending="…">Set</SubmitButton>
                          </form>
                        </td>
                        <td className="small">{fmtDateTime(u.lastLoginAt)}</td>
                        <td>
                          <div className="row" style={{ flexWrap: "nowrap" }}>
                            <form action={resetPasswordAction.bind(null, u.id)} className="row" style={{ flexWrap: "nowrap" }}>
                              <input type="password" name="password" placeholder="New password" autoComplete="new-password" minLength={10} required aria-label={`New password for ${u.name}`} style={{ minWidth: 130 }} />
                              <SubmitButton className="btn sm" pending="…">Reset</SubmitButton>
                            </form>
                            <form action={toggleUserAction.bind(null, u.id, !u.isActive)}>
                              <SubmitButton className={`btn sm ${u.isActive ? "danger" : ""}`} pending="…" confirm={u.isActive ? `Deactivate ${u.name}?` : undefined}>{u.isActive ? "Deactivate" : "Reactivate"}</SubmitButton>
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <form action={addUserAction} className="form" style={{ marginTop: 18 }}>
                <h3>Add a team member</h3>
                <div className="grid g2">
                  <label className="f">Name<input type="text" name="name" required /></label>
                  <label className="f">Email<input type="email" name="email" required autoComplete="off" /></label>
                  <label className="f">Role<select name="role" defaultValue="staff"><option value="staff">Staff</option><option value="admin">Admin</option></select></label>
                  <label className="f">Temporary password <small>At least 10 characters</small><input type="password" name="password" minLength={10} required autoComplete="new-password" /></label>
                </div>
                <div><SubmitButton className="btn gold" pending="Creating…">Create account</SubmitButton></div>
              </form>
            </div>
          )}
        </div>
        <form action={changeOwnPasswordAction} className="card form" style={{ maxWidth: 520 }}>
          <h2>Change my password</h2>
          <p className="muted small">Signed in as {me.email}.</p>
          <label className="f">Current password<input type="password" name="current" autoComplete="current-password" required /></label>
          <label className="f">New password<input type="password" name="next" minLength={10} autoComplete="new-password" required /></label>
          <label className="f">Repeat new password<input type="password" name="confirm" minLength={10} autoComplete="new-password" required /></label>
          <div><SubmitButton pending="Saving…">Change password</SubmitButton></div>
        </form>
      </div>
    </>
  );
}
