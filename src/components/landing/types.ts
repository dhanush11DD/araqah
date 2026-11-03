import type { FormEvent, MouseEvent, RefObject } from "react";
import type { FormChoices } from "@/lib/options";

/** Behaviour the generated LandingEn / LandingAr markup is wired to. */
export type LandingBindings = {
  faqOpen: number;
  toggleFaq: (index: number) => void;
  formRef: RefObject<HTMLFormElement | null>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
  formError: string | null;
  openTrack: (event: MouseEvent<HTMLAnchorElement>) => void;
  altLocaleHref: string;
  /** Dropdown choices for the request form, managed in the admin dashboard. */
  options: FormChoices;
  /** Narrow-screen header menu. */
  menuOpen: boolean;
  menuLabel: string;
  toggleMenu: () => void;
  onHeaderClick: (event: MouseEvent<HTMLElement>) => void;
};
