import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PolicyPage from "@/components/policy/PolicyPage";
import { POLICIES, POLICY_SLUGS, isPolicySlug } from "@/lib/policies";
import type { Locale } from "@/lib/requests";

export const dynamicParams = false;

export function generateStaticParams() {
  return POLICY_SLUGS.map((policy) => ({ policy }));
}

type Params = Promise<{ locale: string; policy: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, policy: slug } = await params;
  if (!isPolicySlug(slug)) notFound();
  const policy = POLICIES[locale as Locale][slug];
  const title = `${policy.title} | ${locale === "ar" ? "عراقة للاستقدام" : "Araqah Recruitment"}`;
  return {
    title,
    description: policy.description,
    alternates: {
      canonical: `/${locale}/${slug}`,
      languages: { ar: `/ar/${slug}`, en: `/en/${slug}`, "x-default": `/ar/${slug}` },
    },
    openGraph: { type: "website", url: `/${locale}/${slug}`, title, description: policy.description, images: [{ url: "/images/hero-housemaids.jpg", width: 820, height: 461 }] },
    twitter: { card: "summary", title, description: policy.description },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { locale, policy } = await params;
  if (!isPolicySlug(policy)) notFound();
  return <PolicyPage locale={locale as Locale} slug={policy} />;
}
