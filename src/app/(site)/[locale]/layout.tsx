import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { LOCALES, type Locale } from "@/lib/requests";
import "../../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// Font links exactly as in each design file's <helmet>.
const FONTS: Record<Locale, string> = {
  en: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Sans+Arabic:wght@500;600&display=swap",
  ar: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Noto+Kufi+Arabic:wght@500;600;700&display=swap",
};

const META: Record<Locale, { title: string; description: string; ogLocale: string }> = {
  en: {
    title: "Araqah Recruitment | Domestic Workers in Riyadh",
    description:
      "From choosing the profession and nationality to your worker's arrival in the Kingdom, the Araqah team is with you at every step. Follow your request online at any time.",
    ogLocale: "en_US",
  },
  ar: {
    title: "عراقة للاستقدام | استقدام عمالة منزلية في الرياض",
    description:
      "من اختيار المهنة والجنسية حتى وصول العامل إلى المملكة، يرافقك فريق عراقة في كل خطوة، مع إمكانية متابعة طلبك إلكترونيًا في أي وقت.",
    ogLocale: "ar_SA",
  },
};

type Params = Promise<{ locale: string }>;

function asLocale(value: string): Locale {
  if (!(LOCALES as readonly string[]).includes(value)) notFound();
  return value as Locale;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const locale = asLocale((await params).locale);
  const meta = META[locale];
  return {
    metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { ar: "/ar", en: "/en", "x-default": "/ar" },
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: locale === "ar" ? "عراقة للاستقدام" : "Araqah Recruitment",
      title: meta.title,
      description: meta.description,
      locale: meta.ogLocale,
      images: [{ url: "/images/hero-housemaids.jpg", width: 820, height: 461 }],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
    // Both languages are written natively. Without this Chrome offers to "translate" the Arabic
    // page, and translating rewrites the text but leaves dir="rtl", which breaks the layout.
    other: { google: "notranslate" },
    icons: { icon: "/images/araqah-logo.png" },
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#FAF7F0" };

export default async function RootLayout({ children, params }: { children: ReactNode; params: Params }) {
  const locale = asLocale((await params).locale);
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} translate="no">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href={FONTS[locale]} />
      </head>
      <body>{children}</body>
    </html>
  );
}
