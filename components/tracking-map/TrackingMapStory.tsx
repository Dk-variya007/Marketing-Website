"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Check, CheckCircle2, Clock, Navigation, RefreshCw } from "lucide-react";
import { PhoneHud } from "../geo-journey/PhoneHud";
import { TONE_STYLES } from "../geo-journey/JourneyScene";
import { SECTIONS } from "../geo-journey/sections";
import { MapTile } from "./MapTile";
import { STAGES, StageConfig } from "./stages";

/* ───────────────────────── Step timeline ───────────────────────── */

/**
 * Plays a stage's steps one after another once `active` turns on.
 * Returns -1 until then. Stops before `gateAt` until `gateOpen`.
 */
function useStepTimeline(cfg: StageConfig, active: boolean, gateOpen: boolean) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(-1);
  const last = cfg.steps.length - 1;
  const ceiling = cfg.gateAt !== undefined && !gateOpen ? cfg.gateAt - 1 : last;

  useEffect(() => {
    if (!active) {
      setStep(-1);
      return;
    }
    if (reduced) {
      setStep(ceiling);
      return;
    }
    if (step === -1) {
      setStep(0);
      return;
    }
    if (step >= ceiling) return;
    const id = setTimeout(() => setStep((s) => s + 1), cfg.steps[step].ms);
    return () => clearTimeout(id);
  }, [active, step, ceiling, reduced, cfg.steps]);

  return step;
}

/* ─────────────────────────── Stage block ─────────────────────────── */

function StageBlock({ index }: { index: number }) {
  const cfg = STAGES[index];
  const content = SECTIONS[index];
  const tileRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: tileRef, offset: ["start end", "end start"] });

  const [arrived, setArrived] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const arriveAt = cfg.hasEnter ? 0.44 : index === 0 ? 0.3 : 0.36;

  const check = (p: number) => {
    if (p >= arriveAt) setArrived(true);
    else if (p < 0.2) setArrived(false);
    setGateOpen(p >= 0.72);
  };
  useMotionValueEvent(scrollYProgress, "change", check);
  useEffect(() => check(scrollYProgress.get()), []); // eslint-disable-line react-hooks/exhaustive-deps

  const step = useStepTimeline(cfg, arrived, gateOpen);
  const state = step >= 0 ? cfg.steps[step] : cfg.before;
  const tone = TONE_STYLES[state.status.tone];
  const synced = index === 3 && step >= 4;
  const network = cfg.network(step);
  const storedPoints = index === 3 ? (step >= 1 ? 214 : 0) : 0;

  return (
    <div id={`stage-${index + 1}`} data-stage={index} className="grid grid-cols-1 lg:grid-cols-[58%_42%]">
      {/* Map (top view) */}
      <div ref={tileRef} className="relative h-[64svh] overflow-hidden border-slate-200 bg-slate-200 lg:h-[100svh] lg:border-x">
        <MapTile stage={index} progress={scrollYProgress} step={step} tone={state.status.tone} synced={synced} isFirst={index === 0} isLast={index === STAGES.length - 1} />

        {/* Stage tag */}
        <div className="pointer-events-none absolute left-4 top-4 hidden items-center gap-2 sm:flex sm:left-6 sm:top-16 lg:top-32">
          <span className="rounded-full bg-navy-950/90 px-3 py-1 font-mono text-[11px] font-bold text-white shadow-lg backdrop-blur">
            {String(index + 1).padStart(2, "0")} · {content.milestone.toUpperCase()}
          </span>
        </div>

        <PhoneHud
          screen={state.phone}
          clock={cfg.clock}
          km={cfg.km}
          network={network}
          storedPoints={storedPoints}
          className="pointer-events-none absolute right-3 top-16 h-[330px] w-[176px] origin-top-right scale-[0.56] sm:right-6 sm:top-16 sm:scale-75 lg:top-32 lg:scale-90 xl:scale-100"
        />
      </div>

      {/* Details */}
      <div className="relative flex items-center px-4 py-10 sm:px-8 lg:px-12 lg:py-0 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-brand-600">
              {String(index + 1).padStart(2, "0")}
              <span className="text-slate-300"> / 0{STAGES.length}</span>
            </span>
            <span className="h-px w-8 bg-slate-300" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{content.milestone}</span>
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl xl:text-[2.75rem] xl:leading-[1.1]">
            {content.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 lg:text-lg">{content.description}</p>

          {/* Live status card — follows the map animation step by step */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-card sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                aria-live="polite"
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${tone.chip}`}
              >
                {state.status.tone === "done" || state.status.label === "Data Synced" || state.status.label === "Checked In" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : state.status.tone === "sync" ? (
                  <RefreshCw className="h-3.5 w-3.5" />
                ) : (
                  <span className="relative flex h-2.5 w-2.5">
                    {state.status.tone !== "idle" && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${tone.dot}`} />}
                    <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${tone.dot}`} />
                  </span>
                )}
                {state.status.label}
              </span>
              <span className="flex items-center gap-3 text-xs font-medium text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {cfg.clock}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Navigation className="h-3.5 w-3.5 text-brand-600" /> {cfg.km.toFixed(1)} km
                </span>
              </span>
            </div>

            <ol className="mt-4 space-y-2.5">
              {cfg.steps.map((s, i) => {
                const done = i < step || (i === step && i === cfg.steps.length - 1);
                const current = i === step && !done;
                return (
                  <li key={s.label} className="flex items-center gap-3">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        done
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : current
                            ? "border-brand-500 bg-brand-50"
                            : "border-slate-200 bg-white"
                      }`}
                    >
                      {done ? (
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      ) : current ? (
                        <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />
                      ) : null}
                    </span>
                    <span className={`text-sm transition-colors duration-300 ${done ? "text-slate-700" : current ? "font-semibold text-navy-950" : "text-slate-400"}`}>
                      {s.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {content.points.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2.5 text-sm text-slate-700">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-brand-600 shadow-card">
                  <Icon className="h-4 w-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Stage bar ─────────────────────────── */

function StageBar({ active }: { active: number }) {
  const jump = (i: number) => {
    const el = document.getElementById(`stage-${i + 1}`);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 40, behavior: "smooth" });
  };
  return (
    <div className="pointer-events-none sticky top-[68px] z-20 h-0">
      <div className="pointer-events-auto mx-auto w-fit max-w-[calc(100%-24px)] translate-y-3 rounded-full border border-slate-200/80 bg-white/90 p-1 shadow-card-hover backdrop-blur">
        <ol className="flex items-center gap-0.5 overflow-x-auto">
          {SECTIONS.map((s, i) => (
            <li key={s.milestone}>
              <button
                onClick={() => jump(i)}
                aria-current={i === active ? "step" : undefined}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[11px] font-semibold transition-colors sm:px-3 sm:text-xs ${
                  i === active ? "bg-brand-600 text-white" : i < active ? "text-brand-700 hover:bg-slate-100" : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <span className="font-mono">{String(i + 1).padStart(2, "0")}</span>
                <span className={i === active ? "inline" : "hidden md:inline"}>{s.milestone}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ─────────────────────────────── Story ─────────────────────────────── */

export function TrackingMapStory() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const blocks = document.querySelectorAll<HTMLElement>("[data-stage]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.getAttribute("data-stage")));
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  return (
    <section id="tracking-map" aria-label="Tracking map walkthrough" className="relative bg-slate-50">
      {/* Shared SVG defs for every map tile */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <filter id="tm-shadow" x="-20%" y="-40%" width="140%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0f172a" floodOpacity="0.14" />
          </filter>
          <pattern id="tm-hatch" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="14" height="14" fill="#fff1f2" />
            <line x1="0" y1="0" x2="0" y2="14" stroke="#fecdd3" strokeWidth="5" />
          </pattern>
        </defs>
      </svg>

      <StageBar active={active} />
      <div className="mx-auto max-w-[1440px] lg:px-8">
        {STAGES.map((_, i) => (
          <StageBlock key={i} index={i} />
        ))}
      </div>
    </section>
  );
}
