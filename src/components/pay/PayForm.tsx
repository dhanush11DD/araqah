"use client";

import Script from "next/script";
import { useRef } from "react";

declare global {
  interface Window {
    Moyasar?: { init: (config: Record<string, unknown>) => void };
  }
}

type Props = {
  publishableKey: string;
  amountHalalas: number;
  description: string;
  callbackUrl: string;
  code: string;
  locale: "ar" | "en";
  loading: string;
};

// Pinned version of Moyasar's hosted form assets.
const CDN = "https://cdn.moyasar.com/mpf/1.14.0";

export default function PayForm({ publishableKey, amountHalalas, description, callbackUrl, code, locale, loading }: Props) {
  const started = useRef(false);
  const mount = () => {
    if (started.current || !window.Moyasar) return;
    started.current = true;
    document.querySelector(".mysr-form")?.replaceChildren(); // drop the "loading" text
    window.Moyasar.init({
      element: ".mysr-form",
      amount: amountHalalas,
      currency: "SAR",
      description,
      publishable_api_key: publishableKey,
      callback_url: callbackUrl,
      methods: ["creditcard"],
      supported_networks: ["mada", "visa", "mastercard"],
      language: locale,
      // The server checks this on return, so a payment can only complete this link.
      metadata: { link_code: code },
    });
  };
  return (
    <>
      <link rel="stylesheet" href={`${CDN}/moyasar.css`} />
      <div className="mysr-form" style={{ minHeight: 120 }}>
        <p style={{ color: "#5C5A55" }}>{loading}</p>
      </div>
      <Script src={`${CDN}/moyasar.js`} strategy="afterInteractive" onReady={mount} />
    </>
  );
}
