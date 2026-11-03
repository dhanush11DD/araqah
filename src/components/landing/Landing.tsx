"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import type { FormChoices } from "@/lib/options";
import { normalizeSaudiMobile, type Locale } from "@/lib/requests";
import { copy } from "./copy";
import LandingAr from "./LandingAr";
import LandingEn from "./LandingEn";
import SuccessModal from "./SuccessModal";
import TrackModal from "./TrackModal";
import type { LandingBindings } from "./types";

// Shared by both languages, so switching language keeps what was typed.
const DRAFT_KEY = "araqah:request-draft";
// Keep in step with the compact-header media query in globals.css.
const MENU_HIDDEN_FROM = "(min-width: 1080px)";

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function readForm(form: HTMLFormElement) {
  const data: Record<string, string> = {};
  new FormData(form).forEach((value, key) => {
    if (typeof value === "string") data[key] = value;
  });
  return data;
}

export default function Landing({ locale, choices }: { locale: Locale; choices: FormChoices }) {
  const t = copy[locale];
  const formRef = useRef<HTMLFormElement>(null);
  const [faqOpen, setFaqOpen] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const [track, setTrack] = useState<{ code?: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // The menu closes on Escape and when the screen grows past the compact-header width.
  useEffect(() => {
    if (!menuOpen) return;
    const wide = window.matchMedia(MENU_HIDDEN_FROM);
    const close = () => setMenuOpen(false);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", close);
    return () => {
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", close);
    };
  }, [menuOpen]);

  useEffect(() => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
  }, [locale]);

  // Restore and keep saving the request form draft.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    try {
      const draft = JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? "{}") as Record<string, string>;
      for (const [name, value] of Object.entries(draft)) {
        const field = form.elements.namedItem(name);
        if (field instanceof RadioNodeList) field.value = value;
        else if (field instanceof HTMLSelectElement) {
          // A choice staff removed since the draft was saved is skipped.
          if (Array.from(field.options).some((o) => o.value === value)) field.value = value;
        } else if (field) (field as FieldElement).value = value;
      }
    } catch {
      // Storage can be unavailable (private mode); the form still works.
    }
    const save = () => {
      try {
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify(readForm(form)));
      } catch {}
    };
    form.addEventListener("input", save);
    form.addEventListener("change", save);
    return () => {
      form.removeEventListener("input", save);
      form.removeEventListener("change", save);
    };
  }, []);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = readForm(form);
      if ((data.fullName ?? "").trim().length < 2) {
        setFormError(t.errors.name);
        (form.elements.namedItem("fullName") as HTMLInputElement | null)?.focus();
        return;
      }
      if (!normalizeSaudiMobile(data.phone ?? "")) {
        setFormError(t.errors.phone);
        (form.elements.namedItem("phone") as HTMLInputElement | null)?.focus();
        return;
      }
      setFormError(null);
      setSubmitting(true);
      try {
        const res = await fetch("/api/requests", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ...data, locale }),
        });
        const json = (await res.json().catch(() => ({}))) as { trackingCode?: string; error?: string };
        if (res.ok && json.trackingCode) {
          form.reset();
          try {
            sessionStorage.removeItem(DRAFT_KEY);
          } catch {}
          setTrackingCode(json.trackingCode);
        } else if (json.error === "invalid_phone") {
          setFormError(t.errors.phone);
        } else if (json.error === "invalid_name") {
          setFormError(t.errors.name);
        } else {
          setFormError(res.status === 429 ? t.errors.rateLimited : t.errors.generic);
        }
      } catch {
        setFormError(t.errors.generic);
      } finally {
        setSubmitting(false);
      }
    },
    [locale, t],
  );

  const bindings: LandingBindings = {
    faqOpen,
    toggleFaq: (i) => setFaqOpen((open) => (open === i ? -1 : i)),
    formRef,
    onSubmit,
    submitting,
    formError,
    openTrack: (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setTrack({});
    },
    altLocaleHref: locale === "ar" ? "/en" : "/ar",
    options: choices,
    menuOpen,
    menuLabel: menuOpen ? t.menu.close : t.menu.open,
    toggleMenu: () => setMenuOpen((open) => !open),
    onHeaderClick: (event: MouseEvent<HTMLElement>) => {
      if ((event.target as Element).closest("a")) setMenuOpen(false);
    },
  };

  const closeSuccess = useCallback(() => setTrackingCode(null), []);
  const closeTrack = useCallback(() => setTrack(null), []);

  return (
    <>
      {locale === "ar" ? <LandingAr b={bindings} /> : <LandingEn b={bindings} />}
      {trackingCode && (
        <SuccessModal
          t={t}
          trackingCode={trackingCode}
          onClose={closeSuccess}
          onTrack={() => {
            setTrack({ code: trackingCode });
            setTrackingCode(null);
          }}
        />
      )}
      {track && <TrackModal t={t} initialCode={track.code} onClose={closeTrack} />}
    </>
  );
}
