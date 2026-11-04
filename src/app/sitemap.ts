import type { MetadataRoute } from "next";
import { POLICY_SLUGS } from "@/lib/policies";
import { SERVICE_SLUGS } from "@/lib/services";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = (["ar", "en"] as const).map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    changeFrequency: "monthly" as const,
    priority: locale === "ar" ? 1 : 0.9,
    alternates: { languages: { ar: `${SITE_URL}/ar`, en: `${SITE_URL}/en` } },
  }));
  const policies = POLICY_SLUGS.flatMap((slug) =>
    (["ar", "en"] as const).map((locale) => ({
      url: `${SITE_URL}/${locale}/${slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: { languages: { ar: `${SITE_URL}/ar/${slug}`, en: `${SITE_URL}/en/${slug}` } },
    })),
  );
  const services = SERVICE_SLUGS.flatMap((slug) =>
    (["ar", "en"] as const).map((locale) => ({
      url: `${SITE_URL}/${locale}/services/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: { ar: `${SITE_URL}/ar/services/${slug}`, en: `${SITE_URL}/en/services/${slug}` } },
    })),
  );
  return [...home, ...services, ...policies];
}
