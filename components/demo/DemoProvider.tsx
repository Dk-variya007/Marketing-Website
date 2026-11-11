"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { MotionConfig } from "framer-motion";
import { DemoModal } from "../ui/DemoModal";

interface DemoContextValue {
  openDemo: () => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

/**
 * One "Book a Demo" modal for the whole site. Any client component can open it with `useDemo()`,
 * so pages stay server components instead of threading an `onOpenDemo` prop through every section.
 * Also opts every Framer Motion animation into the visitor's reduced-motion preference.
 */
export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openDemo = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ openDemo }), [openDemo]);

  return (
    <DemoContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
      <DemoModal isOpen={open} onClose={() => setOpen(false)} />
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside <DemoProvider>");
  return ctx;
}
