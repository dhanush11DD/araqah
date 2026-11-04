import SiteFrame from "@/components/landing/SiteFrame";
import { POLICIES, POLICY_SLUGS, type PolicySlug } from "@/lib/policies";
import type { Locale } from "@/lib/requests";

const LABELS = {
  en: {
    company: "Araqah Recruitment Co.",
    policies: "Policies",
    question: "Still have a question?",
    here: "We're here before, during and after recruitment.",
    call: "Call us",
    email: "Email us",
  },
  ar: {
    company: "شركة عراقة للاستقدام",
    policies: "السياسات",
    question: "لديك سؤال آخر؟",
    here: "نحن معك قبل الاستقدام وأثناءه وبعده.",
    call: "اتصل بنا",
    email: "راسلنا",
  },
} as const;

export default function PolicyPage({ locale, slug }: { locale: Locale; slug: PolicySlug }) {
  const t = LABELS[locale];
  const policy = POLICIES[locale][slug];
  const policyLinks = POLICY_SLUGS.map((other) => ({ slug: other, href: `/${locale}/${other}`, title: POLICIES[locale][other].title }));

  return (
    <SiteFrame locale={locale} page="policy" altPath={slug}>
      <main className="policy-main">
        <p className="policy-eyebrow">{t.company}</p>
        <h1>{policy.title}</h1>
        <nav aria-label={t.policies} className="policy-tabs">
          {policyLinks.map((link) => (
            <a key={link.slug} href={link.href} aria-current={link.slug === slug ? "page" : undefined}>
              {link.title}
            </a>
          ))}
        </nav>

        <article className="policy-body">
          {policy.blocks.map((block, i) => {
            if (block.type === "ul") {
              return (
                <ul key={i}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            const Tag = block.type;
            return <Tag key={i}>{block.text}</Tag>;
          })}
        </article>

        <aside className="policy-help">
          <div>
            <h2>{t.question}</h2>
            <p>{t.here}</p>
          </div>
          <div className="policy-help-actions">
            <a href="tel:0112662266">
              {t.call} <bdi dir="ltr">011 266 2266</bdi>
            </a>
            <a href="mailto:info@araqah.com">{t.email}</a>
          </div>
        </aside>
      </main>
    </SiteFrame>
  );
}
