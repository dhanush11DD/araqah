import Image from "next/image";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/requests";
import { payCopy } from "./copy";

/** Page frame for the customer payment pages, in the landing page's colours and type. */
export default function PayShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = payCopy[locale];
  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F0", color: "#141414", fontFamily: t.font }}>
      <header style={{ borderBottom: "1px solid #E4DCCB", background: "rgba(250,247,240,0.94)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <a href={`/${locale}`} aria-label="Araqah" style={{ display: "flex" }}>
            <Image src="/images/araqah-logo.png" alt="Araqah" width={128} height={46} priority style={{ height: 46, width: "auto" }} />
          </a>
          <a href="tel:0112662266" style={{ fontWeight: 700, fontSize: 14, textDecoration: "none" }}><bdi dir="ltr">011 266 2266</bdi></a>
        </div>
      </header>
      <main style={{ maxWidth: 560, margin: "0 auto", padding: "40px 20px 64px" }}>{children}</main>
      <p style={{ textAlign: "center", fontSize: 12, color: "#5C5A55", padding: "0 20px 32px" }}>{t.secure}</p>
    </div>
  );
}

export const cardStyle = { background: "#FFFFFF", border: "1px solid #E4DCCB", borderRadius: 24, padding: 32, boxShadow: "0 20px 60px rgba(20,20,20,0.06)" } as const;
export const buttonStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 50, padding: "0 24px", borderRadius: 10, background: "#F5C518", color: "#141414", fontWeight: 700, fontSize: 15, textDecoration: "none" } as const;
