import type { MetadataRoute } from "next";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { ar: `${SITE_URL}/ar`, en: `${SITE_URL}/en` };
  return (["ar", "en"] as const).map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    changeFrequency: "monthly",
    priority: locale === "ar" ? 1 : 0.9,
    alternates: { languages },
  }));
}
