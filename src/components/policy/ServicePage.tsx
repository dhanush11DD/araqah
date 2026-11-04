import Image from "next/image";
import type { ReactNode } from "react";
import SiteFrame from "@/components/landing/SiteFrame";
import type { FormChoices } from "@/lib/options";
import type { Locale } from "@/lib/requests";
import { SERVICES, type ServiceSlug, type WhyIcon } from "@/lib/services";

const LABELS = {
  en: { company: "Araqah Recruitment Co.", request: "Request this service", back: "All services" },
  ar: { company: "شركة عراقة للاستقدام", request: "اطلب هذه الخدمة", back: "كل الخدمات" },
} as const;

const ICONS: Record<WhyIcon, ReactNode> = {
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.6-3.4 8-8 9-4.6-1-8-4.4-8-9V6z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
    </>
  ),
  document: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </>
  ),
  support: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2zM20 14a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2zM18 18c0 2-2 3-5 3" />
    </>
  ),
  sliders: <path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 5v4M6 15v4" />,
};

export default function ServicePage({ locale, slug, choices }: { locale: Locale; slug: ServiceSlug; choices: FormChoices }) {
  const t = LABELS[locale];
  const service = SERVICES[locale][slug];

  return (
    <SiteFrame locale={locale} page="service" altPath={`services/${slug}`} choices={choices} service={slug} withContact>
      <main>
        <div className="policy-main service-hero">
          <div className="service-hero-text">
            <p className="policy-eyebrow">{t.company}</p>
            <h1>{service.title}</h1>
            <article className="policy-body">
              <p>{service.text}</p>
            </article>
            <div className="service-actions">
              <a href="#request" className="service-primary">
                {t.request}
              </a>
              <a href={`/${locale}#services`}>{t.back}</a>
            </div>
          </div>
          <div className="service-hero-image">
            <Image src={service.hero.image} alt={service.hero.alt} fill priority sizes="(max-width: 900px) 100vw, 560px" />
          </div>
        </div>

        <section className="why" aria-labelledby="why-title">
          <div className="why-inner">
            <div className="why-text">
              <h2 id="why-title">{service.why.title}</h2>
              <p className="why-sub">{service.why.subtitle}</p>
              <ul className="why-list">
                {service.why.items.map((item) => (
                  <li key={item.title}>
                    <span className="why-icon">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        {ICONS[item.icon]}
                      </svg>
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <a href="#request" className="why-cta">
                {t.request}
              </a>
            </div>
            <div className="why-image">
              <Image src={service.why.image} alt={service.why.alt} fill sizes="(max-width: 900px) 100vw, 560px" />
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
