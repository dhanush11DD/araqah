import SubmitButton from "@/components/admin/SubmitButton";
import { Badge, Flash, PageTop } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { param } from "@/lib/format";
import { KIND_TITLES, OPTION_KINDS, listOptions } from "@/lib/options";
import { addOptionAction, deleteOptionAction, moveOptionAction, saveOptionAction, toggleOptionAction } from "./actions";

export const metadata = { title: "Form options" };

export default async function FormOptionsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdmin();
  const sp = await searchParams;
  const all = await listOptions();
  return (
    <>
      <PageTop title="Form options" intro="Control the dropdown choices in the website’s “Request a worker” form. Changes appear on both the Arabic and English pages straight away." />
      <Flash ok={param(sp.ok)} err={param(sp.err)} />
      <div className="grid">
        {OPTION_KINDS.map((kind) => {
          const rows = all.filter((o) => o.kind === kind);
          const meta = KIND_TITLES[kind];
          return (
            <section key={kind} className="card">
              <div className="card-head"><div><h2>{meta.title}</h2><p className="muted small">{meta.hint}</p></div><Badge>{rows.filter((r) => r.isActive).length} shown · {rows.filter((r) => !r.isActive).length} hidden</Badge></div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th style={{ width: 90 }}>Order</th><th>English name</th><th>Arabic name</th><th>On form</th><th /></tr></thead>
                  <tbody>
                    {rows.map((o, i) => {
                      const formId = `opt-${o.id}`;
                      return (
                        <tr key={o.id} style={o.isActive ? undefined : { opacity: 0.6 }}>
                          <td>
                            <div className="row" style={{ gap: 4, flexWrap: "nowrap" }}>
                              <form action={moveOptionAction.bind(null, o.id, "up")}><button className="btn sm" disabled={i === 0} aria-label={`Move ${o.nameEn} up`}>↑</button></form>
                              <form action={moveOptionAction.bind(null, o.id, "down")}><button className="btn sm" disabled={i === rows.length - 1} aria-label={`Move ${o.nameEn} down`}>↓</button></form>
                            </div>
                          </td>
                          <td><input form={formId} type="text" name="nameEn" defaultValue={o.nameEn} required maxLength={120} aria-label="English name" /><div className="muted small mono">{o.code}</div></td>
                          <td><input form={formId} className="ar" dir="rtl" type="text" name="nameAr" defaultValue={o.nameAr} required maxLength={120} aria-label="Arabic name" /></td>
                          <td>
                            <form action={toggleOptionAction.bind(null, o.id, !o.isActive)}>
                              <SubmitButton className={`btn sm ${o.isActive ? "" : "gold"}`} pending="…">{o.isActive ? "Hide" : "Show"}</SubmitButton>
                            </form>
                          </td>
                          <td>
                            <div className="row" style={{ flexWrap: "nowrap" }}>
                              <form id={formId} action={saveOptionAction.bind(null, o.id)}><SubmitButton className="btn sm primary" pending="Saving…">Save</SubmitButton></form>
                              <form action={deleteOptionAction.bind(null, o.id)}><SubmitButton className="btn sm danger" confirm={`Delete “${o.nameEn}”? Requests already submitted keep their value.`} pending="…">Delete</SubmitButton></form>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <form action={addOptionAction.bind(null, kind)} className="filters" style={{ marginTop: 16, gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr) auto" }}>
                <label className="f">New English name<input type="text" name="nameEn" required maxLength={120} /></label>
                <label className="f">New Arabic name<input className="ar" dir="rtl" type="text" name="nameAr" required maxLength={120} /></label>
                <SubmitButton className="btn gold" pending="Adding…">+ Add</SubmitButton>
              </form>
            </section>
          );
        })}
      </div>
    </>
  );
}
