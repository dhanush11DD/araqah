"use client";

import { useState, type MouseEvent } from "react";
import type { FormChoices } from "@/lib/options";
import type { Locale } from "@/lib/requests";
import { copy } from "./copy";
import LandingAr from "./LandingAr";
import LandingEn from "./LandingEn";
import type { LandingBindings } from "./types";
import { useSite } from "./useSite";
import { useSlideshow } from "./useSlideshow";

export default function Landing({ locale, choices }: { locale: Locale; choices: FormChoices }) {
  const t = copy[locale];
  const site = useSite({ locale, page: "home", choices });
  const [faqOpen, setFaqOpen] = useState(0);
  // The two company services carousel.
  const services = useSlideshow();

  const bindings: LandingBindings = {
    ...site.bindings,
    faqOpen,
    toggleFaq: (i) => setFaqOpen((open) => (open === i ? -1 : i)),
    openTrack: (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      site.openTrack();
    },
    slider: { ...services, labels: t.slider },
  };

  return (
    <>
      {locale === "ar" ? <LandingAr b={bindings} /> : <LandingEn b={bindings} />}
      {site.modals}
    </>
  );
}
