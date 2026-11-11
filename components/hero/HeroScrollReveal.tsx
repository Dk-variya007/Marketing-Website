"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Keka-style reveal: the dashboard starts slightly smaller, lower and dimmer, and grows to full size as the
 * visitor scrolls it into the centre of the screen.
 * Only transform + opacity change (compositor work, no layout or repaint), and scroll maps straight to the
 * values — no spring — so there is no extra animation running after the scroll stops.
 */
export function HeroScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  const scale = useTransform(scrollYProgress, [0, 1], [0.84, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 1]);

  return (
    <motion.div ref={ref} style={reduced ? undefined : { scale, y, opacity }} className="origin-top">
      {children}
    </motion.div>
  );
}
