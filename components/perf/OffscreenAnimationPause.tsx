"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Pauses decorative CSS animation loops (pings, pulses, aurora…) while their section is off screen,
 * so phones only spend GPU time on what's visible. They resume where they left off when scrolled back.
 * Works with the `[data-offscreen]` rule in globals.css. Framer Motion / JS animations are untouched.
 */
export function OffscreenAnimationPause() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = document.querySelectorAll<HTMLElement>("main section, footer");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.toggleAttribute("data-offscreen", !e.isIntersecting)),
      { rootMargin: "200px 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      io.disconnect();
      sections.forEach((s) => s.removeAttribute("data-offscreen"));
    };
  }, [pathname]);

  return null;
}
