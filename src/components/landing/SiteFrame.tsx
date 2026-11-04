"use client";

import type { CSSProperties, ReactNode } from "react";
import { copy } from "./copy";
import { ContactAr, FooterAr, HeaderAr } from "./LandingAr";
import { ContactEn, FooterEn, HeaderEn } from "./LandingEn";
import { useSite, type SiteOptions } from "./useSite";

const PARTS = {
  en: { Header: HeaderEn, Contact: ContactEn, Footer: FooterEn },
  ar: { Header: HeaderAr, Contact: ContactAr, Footer: FooterAr },
};

/** The home page's navbar and footer around an inner page, with the Contact section where asked. */
export default function SiteFrame({ children, withContact = false, ...options }: SiteOptions & { children: ReactNode; withContact?: boolean }) {
  const { bindings, modals } = useSite(options);
  const { Header, Contact, Footer } = PARTS[options.locale];
  const t = copy[options.locale];
  const style = { fontFamily: t.bodyFont, color: "#141414", background: "#FAF7F0", minWidth: 0, "--policy-heading": t.headingFont } as CSSProperties;
  return (
    <div style={style}>
      <Header b={bindings} />
      {children}
      {withContact && <Contact b={bindings} />}
      <Footer b={bindings} />
      {modals}
    </div>
  );
}
