import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/policy/ServicePage";
import { defaultChoices, getFormChoices } from "@/lib/options";
import type { Locale } from "@/lib/requests";
import { SERVICES, isServiceSlug } from "@/lib/services";

// The request form's choices come from the database, so the page is rendered per request.
export const dynamic = "force-dynamic";
export const dynamicParams = true;

type Params = Promise<{ locale: string; service: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, service: slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  const service = SERVICES[locale as Locale][slug];
  const title = `${service.title} | ${locale === "ar" ? "عراقة للاستقدام" : "Araqah Recruitment"}`;
  return {
    title,
    description: service.text,
    alternates: {
      canonical: `/${locale}/services/${slug}`,
      languages: { ar: `/ar/services/${slug}`, en: `/en/services/${slug}`, "x-default": `/ar/services/${slug}` },
    },
    openGraph: { type: "website", url: `/${locale}/services/${slug}`, title, description: service.text, images: [{ url: "/images/hero-housemaids.jpg", width: 820, height: 461 }] },
    twitter: { card: "summary", title, description: service.text },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { locale: value, service } = await params;
  if (!isServiceSlug(service)) notFound();
  const locale = value as Locale;
  // If the database is down the page still shows; submitting the form then reports a clear error.
  const choices = await getFormChoices(locale).catch((error) => {
    console.error("Could not load form options from the database:", error);
    return defaultChoices(locale);
  });
  return <ServicePage locale={locale} slug={service} choices={choices} />;
}
