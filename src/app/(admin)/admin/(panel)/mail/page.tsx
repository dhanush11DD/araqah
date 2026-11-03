import Link from "next/link";
import SubmitButton from "@/components/admin/SubmitButton";
import { Badge, Flash, PageTop } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { param } from "@/lib/format";
import { listTemplates } from "@/lib/mail";
import { toggleTemplateAction } from "./actions";

export const metadata = { title: "Mail templates" };

export default async function MailTemplates({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdmin();
  const sp = await searchParams;
  const items = await listTemplates();
  return (
    <>
      <PageTop title="Mail templates" intro="The emails the system sends. Each has an English and an Arabic version; customers get the language they used on the website. Switch an email off to stop it being sent automatically." />
      <Flash ok={param(sp.ok)} err={param(sp.err)} />
      <div className="grid">
        {items.map(({ def, stored }) => (
          <div key={def.key} className="card">
            <div className="card-head">
              <div className="row"><h2>{def.title}</h2><Badge tone={def.audience === "Staff" ? "dark" : ""}>To {def.audience.toLowerCase()}</Badge><Badge tone={stored.enabled ? "ok" : "bad"}>{stored.enabled ? "On" : "Off"}</Badge></div>
              <div className="row">
                <form action={toggleTemplateAction.bind(null, def.key, !stored.enabled)}><SubmitButton className="btn sm" pending="…">{stored.enabled ? "Switch off" : "Switch on"}</SubmitButton></form>
                <Link className="btn sm primary" href={`/admin/mail/${def.key}`}>Edit & preview</Link>
              </div>
            </div>
            <p className="muted">{def.trigger}</p>
            <p style={{ marginTop: 10 }}><b>Subject:</b> <span className="muted">{stored.subjectEn}</span></p>
          </div>
        ))}
      </div>
    </>
  );
}
