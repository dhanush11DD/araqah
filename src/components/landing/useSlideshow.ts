"use client";

import { useCallback, useEffect, useRef, useState, type RefObject, type UIEvent } from "react";

export type Slideshow = {
  ref: RefObject<HTMLDivElement | null>;
  onScroll: (event: UIEvent<HTMLDivElement>) => void;
  pause: () => void;
  resume: () => void;
  touch: () => void;
  prev: () => void;
  next: () => void;
  go: (page: number) => void;
  pages: number;
  page: number;
};

/**
 * A row of cards that scrolls sideways one card at a time, with arrows, dots and autoplay.
 * It advances every few seconds while it is on screen and nobody is using it.
 */
export function useSlideshow(): Slideshow {
  const ref = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState({ pages: 1, page: 0 });
  const slideNow = useRef(slide); // latest position, readable from timers without re-subscribing
  slideNow.current = slide;
  const pausedUntil = useRef(0);

  const step = useCallback(() => {
    const track = ref.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 0;
    return first.offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 0);
  }, []);

  const measure = useCallback(() => {
    const track = ref.current;
    const size = step();
    if (!track || !size) return;
    const pages = Math.max(1, Math.round((track.scrollWidth - track.clientWidth) / size) + 1);
    const page = Math.min(pages - 1, Math.round(Math.abs(track.scrollLeft) / size));
    setSlide((old) => (old.pages === pages && old.page === page ? old : { pages, page }));
  }, [step]);

  const goTo = useCallback(
    (page: number) => {
      const track = ref.current;
      if (!track) return;
      // In right-to-left pages the browser counts scroll positions as negative.
      const direction = getComputedStyle(track).direction === "rtl" ? -1 : 1;
      const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({ left: direction * page * step(), behavior: calm ? "auto" : "smooth" });
    },
    [step],
  );

  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    const track = ref.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    const watcher = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.4 });
    watcher.observe(track);
    const timer = setInterval(() => {
      if (!visible || document.hidden || Date.now() < pausedUntil.current) return;
      const { page, pages } = slideNow.current;
      if (pages > 1) goTo(page + 1 >= pages ? 0 : page + 1);
    }, 4500);
    return () => {
      clearInterval(timer);
      watcher.disconnect();
    };
  }, [goTo]);

  const hold = () => (pausedUntil.current = Date.now() + 8000);

  return {
    ref,
    onScroll: () => requestAnimationFrame(measure),
    pause: () => (pausedUntil.current = Infinity),
    resume: () => (pausedUntil.current = 0),
    touch: hold,
    prev: () => {
      hold();
      goTo(slide.page === 0 ? slide.pages - 1 : slide.page - 1);
    },
    next: () => {
      hold();
      goTo(slide.page + 1 >= slide.pages ? 0 : slide.page + 1);
    },
    go: (page) => {
      hold();
      goTo(page);
    },
    pages: slide.pages,
    page: slide.page,
  };
}
