import type { FormEvent, MouseEvent, RefObject } from "react";
import type { Slideshow } from "./useSlideshow";
import type { FormChoices } from "@/lib/options";

/** What the shared navbar, Contact section and footer are wired to, on every page. */
export type SiteBindings = {
  page: "home" | "service" | "policy";
  /** Where a "#section" link goes from the current page. */
  to: (hash: string) => string;
  formRef: RefObject<HTMLFormElement | null>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
  formError: string | null;
  altLocaleHref: string;
  /** Dropdown choices for the request form, managed in the admin dashboard. */
  options: FormChoices;
  /** The service the form starts on, on a service page. */
  defaultService?: string;
  /** Narrow-screen header menu. */
  menuOpen: boolean;
  menuLabel: string;
  toggleMenu: () => void;
  onHeaderClick: (event: MouseEvent<HTMLElement>) => void;
  /** The Services dropdown in the navbar. */
  servicesMenu: { open: boolean; toggle: () => void; items: { href: string; title: string; current: boolean }[] };
};

/** Everything else the generated home page is wired to. */
export type LandingBindings = SiteBindings & {
  faqOpen: number;
  toggleFaq: (index: number) => void;
  openTrack: (event: MouseEvent<HTMLAnchorElement>) => void;
  /** Services carousel. */
  slider: Slideshow & { labels: { region: string; prev: string; next: string; dot: (n: number) => string } };
};
