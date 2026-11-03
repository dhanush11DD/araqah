"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

type Props = {
  title: string;
  closeLabel: string;
  font: string;
  headingFont: string;
  onClose: () => void;
  children: ReactNode;
};

/** Dialog in the landing page's own colours, radii and type. */
export default function Modal({ title, closeLabel, font, headingFont, onClose, children }: Props) {
  const titleId = useId();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("input, button:not([data-close])")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panel.current) return;
      const items = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input, select, textarea");
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [onClose]);

  return (
    <div
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      style={{ position: "fixed", inset: "0", zIndex: "50", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: "rgba(20,20,20,0.55)", backdropFilter: "blur(4px)", overflowY: "auto" }}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="araqah-modal"
        style={{ position: "relative", width: "100%", maxWidth: "520px", margin: "auto", padding: "32px", borderRadius: "24px", background: "#FFFFFF", border: "1px solid #E4DCCB", boxShadow: "0 30px 80px rgba(0,0,0,0.35)", boxSizing: "border-box", fontFamily: font, color: "#141414" }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
          <h2 id={titleId} style={{ margin: "0", fontFamily: headingFont, fontSize: "30px", fontWeight: "600", lineHeight: "1.25", color: "#141414" }}>
            {title}
          </h2>
          <button
            type="button"
            data-close
            onClick={onClose}
            aria-label={closeLabel}
            style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "50%", border: "1.5px solid #141414", background: "transparent", color: "#141414", cursor: "pointer" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18"></path>
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
