"use client";

import { useState } from "react";
import type { Copy } from "./copy";
import Modal from "./Modal";

type Props = { t: Copy; trackingCode: string; onClose: () => void; onTrack: () => void };

export default function SuccessModal({ t, trackingCode, onClose, onTrack }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(trackingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the number stays visible to copy by hand.
    }
  }

  return (
    <Modal title={t.success.title} closeLabel={t.close} font={t.bodyFont} headingFont={t.headingFont} onClose={onClose}>
      <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "56px", height: "56px", marginTop: "20px", borderRadius: "16px", background: "#F5C518", color: "#141414" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l4.5 4.5L19 7.5"></path>
        </svg>
      </span>
      <p role="status" style={{ margin: "18px 0 0", fontSize: "17px", lineHeight: "1.65", color: "#3D3D3D" }}>
        {t.success.message}
      </p>
      <div style={{ marginTop: "22px", padding: "18px 20px", borderRadius: "16px", background: "#FAF7F0", border: "1px solid #E4DCCB" }}>
        <p style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: "0.1em", textTransform: "uppercase", color: "#5C5A55" }}>{t.success.numberLabel}</p>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", marginTop: "6px" }}>
          <p style={{ margin: "0", fontFamily: "'Fraunces', Georgia, serif", fontSize: "28px", fontWeight: "600", color: "#141414" }}>
            <bdi dir="ltr">{trackingCode}</bdi>
          </p>
          <button
            type="button"
            onClick={copyCode}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", minHeight: "44px", padding: "0 16px", borderRadius: "10px", border: "1.5px solid #141414", background: "transparent", color: "#141414", fontFamily: "inherit", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="8" y="8" width="12" height="12" rx="2"></rect>
              <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"></path>
            </svg>
            {copied ? t.success.copied : t.success.copy}
          </button>
        </div>
        <p style={{ margin: "8px 0 0", fontSize: "14px", color: "#5C5A55" }}>{t.success.keep}</p>
      </div>
      <button
        type="button"
        onClick={onTrack}
        style={{ marginTop: "22px", width: "100%", height: "54px", border: "0", borderRadius: "12px", background: "#F5C518", color: "#141414", fontSize: "16px", fontWeight: "800", fontFamily: "inherit", cursor: "pointer" }}
      >
        {t.success.track}
      </button>
    </Modal>
  );
}
