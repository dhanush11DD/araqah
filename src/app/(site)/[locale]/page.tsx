import Landing from "@/components/landing/Landing";
import { defaultChoices, getFormChoices } from "@/lib/options";
import type { Locale } from "@/lib/requests";

// The form choices come from the database, so the page is rendered per request.
export const dynamic = "force-dynamic";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

function jsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: locale === "ar" ? "عراقة للاستقدام" : "Araqah Recruitment Co.",
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/images/araqah-logo.png`,
    image: `${SITE_URL}/images/hero-housemaids.jpg`,
    telephone: "+966112662266",
    email: "info@araqah.com",
    identifier: "3701173",
    address: {
      "@type": "PostalAddress",
      streetAddress: locale === "ar" ? "2533 طريق الإمام سعود بن فيصل، حطين" : "2533 Imam Saud bin Faisal Road, Hittin",
      addressLocality: locale === "ar" ? "الرياض" : "Riyadh",
      postalCode: "13518",
      addressCountry: "SA",
    },
    areaServed: "SA",
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  // If the database is down the page still shows; submitting the form then reports a clear error.
  const choices = await getFormChoices(locale).catch((error) => {
    console.error("Could not load form options from the database:", error);
    return defaultChoices(locale);
  });
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale)).replace(/</g, "\\u003c") }}
      />
      <Landing locale={locale} choices={choices} />
    </>
  );
}
