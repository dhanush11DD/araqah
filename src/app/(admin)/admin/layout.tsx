import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./admin.css";

export const metadata: Metadata = { title: { default: "Araqah Admin", template: "%s · Araqah Admin" }, robots: { index: false, follow: false } };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

// The admin is a separate root layout from the public site: its own fonts, no translation prompt.
export default function AdminRoot({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" translate="no">
      <head>
        <meta name="google" content="notranslate" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
