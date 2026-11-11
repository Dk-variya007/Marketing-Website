"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Check, CheckCircle2, Clock, Navigation, RefreshCw } from "lucide-react";
import type { StatusTone } from "./types";
import { PhoneHud } from "./PhoneHud";
import { SECTIONS } from "./stages";
import { MapScene, type SceneState } from "./MapScene";
import {
  CHAPTERS,
  CHAPTER_P,
  TOTAL,
  TOTAL_KM,
  TOTAL_WEIGHT,
  breakMinutes,
  distanceAt,
  frameAt,
  isOffline,
  isSynced,
  offBikeAt,
  storedPoints,
} from "./journey";

const EASE = [0.22, 1, 0.36, 1] as const;

const CHIP: Record<StatusTone, { chip: string; dot: string }> = {
  idle: { chip: "border-slate-400/30 bg-slate-400/10 text-slate-200", dot: "bg-slate-300" },
  active: { chip: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300", dot: "bg-emerald-400" },
  break: { chip: "border-amber-400/30 bg-amber-400/10 text-amber-300", dot: "bg-amber-400" },
  offline: { chip: "border-rose-400/30 bg-rose-400/10 text-rose-300", dot: "bg-rose-400" },
  sync: { chip: "border-sky-400/30 bg-sky-400/10 text-sky-300", dot: "bg-sky-400" },
  visit: { chip: "border-violet-400/30 bg-violet-400/10 text-violet-300", dot: "bg-violet-400" },
  done: { chip: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300", dot: "bg-emerald-400" },
};

/* ─────────────────────────── Story state ─────────────────────────── */

interface View extends SceneState {
  km: number;
  offline: boolean;
}

function viewAt(p: number): View {
  const f = frameAt(p);
  const cfg = CHAPTERS[f.chapter];
  const state = f.step >= 0 ? cfg.steps[f.step] : cfg.before;
  return {
    chapter: f.chapter,
    step: f.step,
    tone: state.status.tone,
    breakMins: breakMinutes(f),
    stored: storedPoints(f),
    synced: isSynced(f),
    offBike: offBikeAt(f.chapter, f.step),
    offline: isOffline(f),
    km: Math.round((TOTAL_KM * f.d) / TOTAL * 10) / 10,
  };
}

const sameView = (a: View, b: View) =>
  a.chapter === b.chapter && a.step === b.step && a.breakMins === b.breakMins && a.stored === b.stored && a.km === b.km;

/* ─────────────────────────────── Bits ─────────────────────────────── */

function StatusChip({ tone, label }: { tone: StatusTone; label: string }) {
  const t = CHIP[tone];
  const check = tone === "done" || label === "Data Synced" || label === "Checked In";
  return (
    <span aria-live="polite" className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-300 sm:text-sm ${t.chip}`}>
      {check ? (
        <CheckCircle2 className="h-4 w-4" />
      ) : tone === "sync" ? (
        <RefreshCw className="h-3.5 w-3.5 animate-spin-slow" />
      ) : (
        <span className="relative flex h-2.5 w-2.5">
          {tone !== "idle" && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${t.dot}`} />}
          <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${t.dot}`} />
        </span>
      )}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2, ease: EASE }}>
          {label}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function StepList({ chapter, step, compact }: { chapter: number; step: number; compact?: boolean }) {
  const steps = CHAPTERS[chapter].steps;
  return (
    <ol className={compact ? "mt-3 space-y-1.5" : "mt-4 space-y-2.5"}>
      {steps.map((s, i) => {
        const done = i < step || (i === step && i === steps.length - 1);
        const current = i === step && !done;
        return (
          <li key={s.label} className="flex items-center gap-3">
            <span
              className={`flex shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${compact ? "h-5 w-5" : "h-6 w-6"} ${
                done ? "border-emerald-400 bg-emerald-400 text-navy-950" : current ? "border-brand-400 bg-brand-500/15" : "border-white/15 bg-white/[0.03]"
              }`}
            >
              {done ? <Check className="h-3 w-3" strokeWidth={3.5} /> : current ? <span className="h-2 w-2 animate-pulse rounded-full bg-brand-400" /> : null}
            </span>
            <span className={`transition-colors duration-300 ${compact ? "text-xs" : "text-sm"} ${done ? "text-slate-300" : current ? "font-semibold text-white" : "text-slate-500"}`}>
              {s.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function ChapterNav({ active, onJump, className = "" }: { active: number; onJump: (i: number) => void; className?: string }) {
  return (
    <ol className={`flex items-center gap-1 ${className}`}>
      {SECTIONS.map((s, i) => (
        <li key={s.milestone} className="flex-1">
          <button
            onClick={() => onJump(i)}
            aria-label={`Go to ${s.title}`}
            aria-current={i === active ? "step" : undefined}
            className="group flex w-full flex-col gap-1.5 text-left"
          >
            <span className={`h-1 w-full rounded-full transition-colors duration-300 ${i < active ? "bg-brand-400" : i === active ? "bg-white" : "bg-white/15 group-hover:bg-white/30"}`} />
            <span className={`hidden text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors sm:block ${i === active ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}>
              {s.milestone}
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}

/* ─────────────────────────────── Story ─────────────────────────────── */

export function TrackingMapStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  // Smoothed, so wheel steps glide — and a fast flick still passes through every frame of the story.
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4, restDelta: 0.0001 });
  const progress = reduced ? scrollYProgress : smooth;
  const distance = useTransform(progress, (v) => distanceAt(v));

  const [view, setView] = useState<View>(() => viewAt(0));
  const sync = (v: number) => {
    const next = viewAt(v);
    setView((prev) => (sameView(prev, next) ? prev : next));
  };
  useMotionValueEvent(progress, "change", sync);
  useEffect(() => sync(progress.get()), [progress]); // eslint-disable-line react-hooks/exhaustive-deps

  const { chapter, step, km } = view;
  const cfg = CHAPTERS[chapter];
  const state = step >= 0 ? cfg.steps[step] : cfg.before;
  const content = SECTIONS[chapter];

  const jump = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (el.offsetHeight - window.innerHeight) * CHAPTER_P[i], behavior: "smooth" });
  };

  const phone = (
    <PhoneHud
      screen={state.phone}
      clock={cfg.clock}
      km={km}
      network={!view.offline}
      storedPoints={chapter === 3 ? view.stored : 0}
      className="h-full w-full"
    />
  );

  return (
    <section id="tracking-map" aria-label="Tracking map walkthrough" className="relative bg-navy-950">
      <div ref={trackRef} className="relative" style={{ height: `${Math.round(TOTAL_WEIGHT * 60 + 100)}vh` }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* Map */}
          <div className="absolute inset-x-0 bottom-0 top-[68px]">
            <MapScene distance={distance} state={view} />
            {/* Edge vignette */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(6,9,19,0.75)_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-navy-950/80 to-transparent" />
          </div>

          {/* Live session tag */}
          <div className="pointer-events-none absolute left-4 top-[84px] flex items-center gap-2 rounded-full border border-white/10 bg-navy-950/90 px-3 py-1.5 text-[11px] font-semibold text-slate-200 sm:left-6 lg:left-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            LIVE · Rahul S. · Field Sales
            <span className="hidden text-slate-500 sm:inline">·</span>
            <span className="hidden font-mono text-slate-400 sm:inline">{km.toFixed(1)} km</span>
          </div>

          {/* Phone (tablet: top-left under the tag, desktop: bottom-left) */}
          <div className="pointer-events-none absolute left-6 top-[124px] hidden h-[330px] w-[176px] origin-top-left scale-[0.72] md:block lg:bottom-8 lg:left-8 lg:top-auto lg:origin-bottom-left lg:scale-90 xl:scale-100">
            {phone}
          </div>

          {/* Details — side panel on desktop, bottom sheet below lg */}
          <div className="absolute inset-x-3 bottom-3 sm:inset-x-6 sm:bottom-6 lg:inset-x-auto lg:bottom-auto lg:right-8 lg:top-[calc(50%+34px)] lg:max-h-[calc(100svh-112px)] lg:w-[420px] lg:-translate-y-1/2 xl:w-[460px]">
            <div className="flex flex-col rounded-2xl border border-white/10 bg-navy-900/[0.96] p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] sm:p-5 lg:rounded-3xl lg:p-7">
              <ChapterNav active={chapter} onJump={jump} />

              <div className="mt-4 flex flex-col lg:mt-7">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={chapter}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-brand-400 sm:text-sm">
                        {String(chapter + 1).padStart(2, "0")}
                        <span className="text-slate-600"> / {String(CHAPTERS.length).padStart(2, "0")}</span>
                      </span>
                      <span className="h-px w-8 bg-white/15" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:text-[11px]">{content.milestone}</span>
                    </div>
                    <h2 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl lg:mt-3 lg:text-3xl xl:text-[2.1rem] xl:leading-[1.15]">
                      {content.title}
                    </h2>
                    <p className="mt-2 hidden text-sm leading-relaxed text-slate-400 sm:block lg:mt-3 lg:text-[15px]">{content.description}</p>
                  </motion.div>
                </AnimatePresence>

                {/* Live status — follows the map step by step */}
                <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:p-4 lg:mt-6 lg:rounded-2xl">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <StatusChip tone={state.status.tone} label={state.status.label} />
                    <span className="flex items-center gap-3 text-[11px] font-medium text-slate-400 sm:text-xs">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {cfg.clock}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono">
                        <Navigation className="h-3.5 w-3.5 text-brand-400" /> {km.toFixed(1)} km
                      </span>
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <StepList chapter={chapter} step={step} />
                  </div>
                  <div className="sm:hidden">
                    <StepList chapter={chapter} step={step} compact />
                  </div>
                </div>

                {/* Feature points (desktop) */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.ul
                    key={chapter}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-6 hidden grid-cols-1 gap-2.5 lg:grid xl:grid-cols-2"
                  >
                    {content.points.slice(0, 4).map(({ icon: Icon, text }) => (
                      <li key={text} className="flex items-center gap-2.5 text-[13px] text-slate-300">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-brand-400">
                          <Icon className="h-4 w-4" />
                        </span>
                        {text}
                      </li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
