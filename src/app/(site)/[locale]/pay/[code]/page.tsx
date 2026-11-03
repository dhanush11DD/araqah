import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { adminEnabled } from "@/lib/features";
import PayForm from "@/components/pay/PayForm";
import PayShell, { cardStyle } from "@/components/pay/PayShell";
import { payCopy } from "@/components/pay/copy";
import { formatSar, getLinkByCode } from "@/lib/payments";
import { LOCALES, type Locale } from "@/lib/requests";
import { getMoyasarConfig, siteUrl } from "@/lib/settings";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Secure payment", robots: { index: false, follow: false } };

export default async function PayPage({ params }: { params: Promise<{ locale: string; code: string }> }) {
  if (!adminEnabled()) notFound();
  const { locale: raw, code } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const t = payCopy[locale];
  const link = await getLinkByCode(code.toUpperCase());
  const gateway = await getMoyasarConfig();

  const message = !link ? t.notFound
    : link.status === "paid" ? t.alreadyPaid
    : link.status === "cancelled" ? t.cancelled
    : link.status === "expired" ? t.expired
    : !gateway.publishableKey || !gateway.secretKey ? t.unavailable
    : null;

  return (
    <PayShell locale={locale}>
      <div style={cardStyle}>
        <h1 style={{ margin: 0, fontFamily: t.heading, fontSize: 30, fontWeight: 600, lineHeight: 1.25 }}>{t.title}</h1>
        {message || !link ? (
          <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.7, color: "#3D3D3D" }}>{message}</p>
        ) : (
          <>
            <p style={{ margin: "12px 0 0", fontSize: 15, lineHeight: 1.7, color: "#3D3D3D" }}>{t.intro}</p>
            <div style={{ margin: "22px 0", padding: "18px 20px", borderRadius: 16, background: "#FAF7F0", border: "1px solid #E4DCCB" }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5C5A55" }}>{t.amountDue}</p>
              <p style={{ margin: "4px 0 0", fontFamily: "'Fraunces', Georgia, serif", fontSize: 34, fontWeight: 600 }}><bdi dir="ltr">{formatSar(link.amountHalalas)}</bdi></p>
              <p style={{ margin: "12px 0 0", fontSize: 14 }}><b>{t.forLabel}:</b> {link.description}</p>
              <p style={{ margin: "4px 0 0", fontSize: 14 }}><b>{t.customer}:</b> {link.customerName}</p>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#5C5A55" }}>{t.reference}: <bdi dir="ltr">{link.code}</bdi></p>
            </div>
            <PayForm
              publishableKey={gateway.publishableKey}
              amountHalalas={link.amountHalalas}
              description={`${link.description} (${link.code})`.slice(0, 250)}
              callbackUrl={`${siteUrl()}/${locale}/pay/${link.code}/result`}
              code={link.code}
              locale={locale}
              loading={t.loading}
            />
          </>
        )}
      </div>
    </PayShell>
  );
}
