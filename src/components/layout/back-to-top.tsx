"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [scrolled, setScrolled] = useState(false);
  // Hidden while the footer is on screen: on phones the footer links wrap
  // to the bottom-right corner, where this fixed button sat over "Privacy".
  const [footerInView, setFooterInView] = useState(false);
  const visible = scrolled && !footerInView;
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 400);
        rafRef.current = null;
      });
    };

    // Sync initial state — covers deep links that land mid-page.
    // window is only readable after mount, so a lazy useState initializer would break SSR hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScrolled(window.scrollY > 400);

    const footer = document.querySelector("body > footer"); // the site footer from layout.tsx
    const observer = footer
      ? new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting))
      : null;
    if (footer && observer) observer.observe(footer);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  function handleClick() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <button
      type="button"
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-40 rounded-full border border-gray-800 bg-gray-900 p-3 text-gray-300 transition-opacity duration-200 hover:bg-gray-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
