import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { adminEnabled } from "@/lib/features";
import PayShell, { buttonStyle, cardStyle } from "@/components/pay/PayShell";
import { payCopy } from "@/components/pay/copy";
import { param } from "@/lib/format";
import { formatSar, getLinkByCode, verifyAndApply } from "@/lib/payments";
import { LOCALES, type Locale } from "@/lib/requests";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Payment", robots: { index: false, follow: false } };

export default async function PayResult({ params, searchParams }: { params: Promise<{ locale: string; code: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (!adminEnabled()) notFound();
  const { locale: raw, code } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const t = payCopy[locale];
  const sp = await searchParams;
  const link = await getLinkByCode(code.toUpperCase());
  if (!link) notFound();

  // Moyasar sends the customer back with ?id=…; the server asks Moyasar itself rather than trusting the URL.
  const paymentId = param(sp.id);
  const outcome = paymentId ? await verifyAndApply(link, paymentId, "customer") : null;
  const state = link.status === "paid" || outcome?.state === "paid" ? "paid" : (outcome?.state ?? "pending");

  const view = {
    paid: { title: t.paidTitle, text: t.paidText, tone: "#1B7F4B" },
    failed: { title: t.failedTitle, text: t.failedText, tone: "#B42318" },
    pending: { title: t.pendingTitle, text: t.pendingText, tone: "#7A5D00" },
    mismatch: { title: t.problemTitle, text: t.problemText, tone: "#B42318" },
    error: { title: t.problemTitle, text: t.problemText, tone: "#B42318" },
  }[state];

  return (
    <PayShell locale={locale}>
      <div style={cardStyle}>
        <h1 style={{ margin: 0, fontFamily: t.heading, fontSize: 30, fontWeight: 600, lineHeight: 1.25, color: view.tone }}>{view.title}</h1>
        <p style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.7, color: "#3D3D3D" }} role={state === "paid" ? "status" : undefined}>{view.text}</p>
        {state === "failed" && outcome?.message && <p style={{ margin: "10px 0 0", fontSize: 14, color: "#5C5A55" }}>{outcome.message}</p>}
        <div style={{ margin: "22px 0", padding: "16px 20px", borderRadius: 16, background: "#FAF7F0", border: "1px solid #E4DCCB", fontSize: 14 }}>
          <p style={{ margin: 0 }}><b>{t.amount}:</b> <bdi dir="ltr">{formatSar(link.amountHalalas)}</bdi></p>
          <p style={{ margin: "4px 0 0" }}><b>{t.forLabel}:</b> {link.description}</p>
          <p style={{ margin: "4px 0 0", color: "#5C5A55" }}>{t.reference}: <bdi dir="ltr">{paymentId || link.code}</bdi></p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {(state === "failed" || state === "pending") && link.status === "pending" && <a href={`/${locale}/pay/${link.code}`} style={buttonStyle}>{t.tryAgain}</a>}
          <a href={`/${locale}`} style={{ ...buttonStyle, background: "transparent", border: "1.5px solid #141414" }}>{t.back}</a>
        </div>
      </div>
    </PayShell>
  );
}
