import Link from "next/link";
import SubmitButton from "@/components/admin/SubmitButton";
import { Flash, PageTop } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { param } from "@/lib/format";
import { getRequestByCode } from "@/lib/store";
import { createLinkAction } from "../actions";

export const metadata = { title: "New payment link" };

export default async function NewLink({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdmin();
  const sp = await searchParams;
  const code = param(sp.request).trim().toUpperCase();
  const r = code ? await getRequestByCode(code) : null;
  return (
    <>
      <PageTop title="New payment link" intro="Fill in what the customer should pay. You get a link to copy, or email it straight to them.">
        <Link className="btn" href="/admin/payments">← All links</Link>
      </PageTop>
      <Flash err={param(sp.err)} />
      <form action={createLinkAction} className="card form" style={{ maxWidth: 760 }}>
        {r && <p className="notice">For request <b>{r.trackingCode}</b> from {r.fullName}. Their details are filled in below.</p>}
        <div className="grid g2">
          <label className="f">Amount (SAR)<input type="number" name="amount" min={1} max={1000000} step="0.01" required placeholder="1500" inputMode="decimal" /></label>
          <label className="f">Link language <small>The language of the pay page and emails</small>
            <select name="locale" defaultValue={r?.locale === "en" ? "en" : "ar"}><option value="ar">العربية</option><option value="en">English</option></select>
          </label>
        </div>
        <label className="f">What is it for? <small>Shown to the customer and on their receipt</small><input type="text" name="description" required maxLength={250} placeholder="Recruitment service deposit" /></label>
        <div className="grid g2">
          <label className="f">Customer name<input type="text" name="name" required maxLength={120} defaultValue={r?.fullName ?? ""} /></label>
          <label className="f">Customer mobile <small>Optional</small><input type="text" name="phone" inputMode="tel" defaultValue={r?.phone ?? ""} placeholder="05XXXXXXXX" /></label>
          <label className="f">Customer email <small>Needed to email the link and send a receipt</small><input type="email" name="email" defaultValue={r?.email ?? ""} /></label>
          <label className="f">Link expires
            <select name="expires" defaultValue="7"><option value="0">Never</option><option value="1">After 1 day</option><option value="3">After 3 days</option><option value="7">After 7 days</option><option value="14">After 14 days</option><option value="30">After 30 days</option></select>
          </label>
        </div>
        <label className="f">Linked request number <small>Optional. Ties the payment to a recruitment request.</small><input type="text" name="request" defaultValue={code} placeholder="ARQ-26-XXXXXX" style={{ textTransform: "uppercase" }} /></label>
        <label className="check"><input type="checkbox" name="sendNow" /> Email the link to the customer now <span className="muted small">(needs an email address and a working mail server)</span></label>
        <div><SubmitButton className="btn gold" pending="Creating…">Create payment link</SubmitButton></div>
      </form>
    </>
  );
}
