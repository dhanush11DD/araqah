import Link from "next/link";
import { notFound } from "next/navigation";
import SubmitButton from "@/components/admin/SubmitButton";
import { Badge, Flash, PageTop } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { param } from "@/lib/format";
import { SAMPLE_VARS, TEMPLATES, getTemplate, renderTemplate, type TemplateKey } from "@/lib/mail";
import { resetTemplateAction, saveTemplateAction, sendTestAction } from "../actions";

export const metadata = { title: "Edit template" };

export default async function EditTemplate({ params, searchParams }: { params: Promise<{ key: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const user = await requireAdmin();
  const key = (await params).key as TemplateKey;
  const def = TEMPLATES.find((t) => t.key === key);
  if (!def) notFound();
  const sp = await searchParams;
  const lang = param(sp.lang) === "ar" ? "ar" : "en";
  const t = await getTemplate(key);
  const preview = await renderTemplate(key, lang, SAMPLE_VARS);
  const save = saveTemplateAction.bind(null, key);
  return (
    <>
      <PageTop title={def.title} intro={def.trigger}>
        <Link className="btn" href="/admin/mail">← All templates</Link>
      </PageTop>
      <Flash ok={param(sp.ok)} err={param(sp.err)} />
      <div className="split" style={{ gridTemplateColumns: "minmax(0,1.2fr) minmax(0,1fr)" }}>
        <form action={save} className="card form">
          <label className="check"><input type="checkbox" name="enabled" defaultChecked={t.enabled} /> Send this email automatically</label>
          <div>
            <h3 style={{ marginBottom: 8 }}>You can use these placeholders</h3>
            <div className="vars">{def.variables.map((v) => <code key={v}>{`{{${v}}}`}</code>)}</div>
            <p className="muted small" style={{ marginTop: 8 }}>Leave a blank line between paragraphs. Web addresses become links.</p>
          </div>
          <label className="f">Subject (English)<input type="text" name="subjectEn" defaultValue={t.subjectEn} required maxLength={250} /></label>
          <label className="f">Message (English)<textarea className="tall" name="bodyEn" defaultValue={t.bodyEn} required /></label>
          <label className="f">Subject (Arabic)<input className="ar" dir="rtl" type="text" name="subjectAr" defaultValue={t.subjectAr} required maxLength={250} /></label>
          <label className="f">Message (Arabic)<textarea className="tall ar" dir="rtl" name="bodyAr" defaultValue={t.bodyAr} required /></label>
          <div className="row">
            <SubmitButton pending="Saving…">Save template</SubmitButton>
            <SubmitButton className="btn danger" formAction={resetTemplateAction.bind(null, key)} confirm="Replace this template with the default wording?" pending="…">Reset to default</SubmitButton>
          </div>
        </form>
        <div>
          <div className="card">
            <div className="card-head">
              <h2>Preview</h2>
              <div className="row">
                <Link className={`btn sm ${lang === "en" ? "primary" : ""}`} href={`/admin/mail/${key}?lang=en`}>English</Link>
                <Link className={`btn sm ${lang === "ar" ? "primary" : ""}`} href={`/admin/mail/${key}?lang=ar`}>العربية</Link>
              </div>
            </div>
            <p className="muted small" style={{ marginBottom: 8 }}>Shows the <b>saved</b> template with sample details. Save first to see your edits.</p>
            <p style={{ marginBottom: 10 }}><b>Subject:</b> <span dir={lang === "ar" ? "rtl" : "ltr"}>{preview.subject}</span></p>
            <iframe className="preview" title="Email preview" sandbox="" srcDoc={preview.html} />
          </div>
          <form action={sendTestAction.bind(null, key)} className="card form">
            <h2>Send a test</h2>
            <div className="grid g2">
              <label className="f">Send to<input type="email" name="to" defaultValue={user.email} required /></label>
              <label className="f">Language<select name="locale" defaultValue={lang}><option value="en">English</option><option value="ar">العربية</option></select></label>
            </div>
            <div><SubmitButton className="btn gold" pending="Sending…">Send test email</SubmitButton></div>
            <p className="muted small">Uses the saved template and sample details, through the mail server in <Link href="/admin/mail-server">Settings</Link>. <Badge>TEST</Badge> is added to the subject.</p>
          </form>
        </div>
      </div>
    </>
  );
}
