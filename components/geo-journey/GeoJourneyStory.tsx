"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { CheckCircle2, Navigation, RefreshCw } from "lucide-react";
import { JourneyScene, TONE_STYLES } from "./JourneyScene";
import { SECTIONS } from "./sections";
import {
  DIST_P,
  DIST_V,
  OFFLINE_START_P,
  SECTION_COUNT,
  SYNC_P,
  beatAt,
  clockAt,
  isMovingAt,
  kmAt,
  sectionAt,
} from "./timeline";

function useIsCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return compact;
}

const OFFLINE_POINTS_TOTAL = 214;

export function GeoJourneyStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const compact = useIsCompact();

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.35 });
  const distance = useTransform(progress, DIST_P, DIST_V);
  const railFill = useTransform(progress, [0, 1], [0, 1]);

  const [p, setP] = useState(0);
  useMotionValueEvent(progress, "change", (v) => setP(Math.round(Math.min(1, Math.max(0, v)) * 1000) / 1000));

  const beat = beatAt(p);
  const section = sectionAt(p);
  const moving = isMovingAt(p);
  const clock = clockAt(p);
  const km = Math.round(kmAt(p) * 10) / 10;
  const storedPoints =
    p < OFFLINE_START_P
      ? 0
      : Math.round(OFFLINE_POINTS_TOTAL * Math.min(1, (p - OFFLINE_START_P) / (SYNC_P - OFFLINE_START_P)));

  const content = SECTIONS[section];
  const tone = TONE_STYLES[beat.status.tone];

  const jumpTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * ((i + 0.02) / SECTION_COUNT), behavior: "smooth" });
  };

  return (
    <section id="tracking-flow" className="relative bg-slate-50">
      {/* Scroll track: tall container, sticky stage inside */}
      <div ref={trackRef} className="relative" style={{ height: `${SECTION_COUNT * 120 + 100}vh` }}>
        <div className="sticky top-0 flex h-[100svh] flex-col pt-[76px] pb-3 lg:pb-5">
          <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col gap-3 px-3 sm:px-6 lg:flex-row lg:gap-6 lg:px-8">
            {/* LEFT — animated story */}
            <div className="relative h-[48%] shrink-0 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl md:h-[52%] lg:h-full lg:w-[58%] xl:w-[60%]">
              <JourneyScene
                progress={progress}
                distance={distance}
                beat={beat}
                moving={moving}
                clock={clock}
                km={km}
                storedPoints={storedPoints}
                compact={compact}
              />
            </div>

            {/* RIGHT — explanation */}
            <div className="relative flex min-h-0 flex-1 gap-5 lg:gap-8">
              {/* Road-style milestone rail (desktop) */}
              <div className="relative hidden w-28 shrink-0 flex-col justify-between py-6 lg:flex">
                <div className="absolute bottom-6 left-[15px] top-6 w-[6px] rounded-full bg-slate-200" />
                <motion.div
                  className="absolute left-[15px] top-6 w-[6px] origin-top rounded-full bg-gradient-to-b from-brand-500 to-emerald-500"
                  style={{ scaleY: railFill, height: "calc(100% - 48px)" }}
                />
                {SECTIONS.map((s, i) => {
                  const done = i < section;
                  const current = i === section;
                  return (
                    <button
                      key={s.milestone}
                      onClick={() => jumpTo(i)}
                      className="group relative z-10 flex items-center gap-3 text-left"
                      aria-label={`Go to ${s.title}`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold transition-all duration-300 ${
                          current
                            ? "scale-110 border-brand-600 bg-brand-600 text-white shadow-glow-blue"
                            : done
                              ? "border-brand-500 bg-white text-brand-600"
                              : "border-slate-300 bg-white text-slate-400 group-hover:border-slate-400"
                        }`}
                      >
                        {done ? <CheckCircle2 className="h-4 w-4" /> : String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${
                          current ? "text-navy-950" : "text-slate-400 group-hover:text-slate-600"
                        }`}
                      >
                        {s.milestone}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex min-h-0 flex-1 flex-col">
                {/* Compact progress (mobile/tablet) */}
                <div className="mb-3 flex items-center gap-1.5 lg:hidden">
                  {SECTIONS.map((s, i) => (
                    <button
                      key={s.milestone}
                      onClick={() => jumpTo(i)}
                      aria-label={`Go to ${s.title}`}
                      className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                        i < section ? "bg-brand-400" : i === section ? "bg-brand-600" : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>

                <div className="relative min-h-0 flex-1 lg:flex lg:items-center">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={section}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full max-w-xl"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-brand-600">
                          {String(section + 1).padStart(2, "0")}
                          <span className="text-slate-300"> / 0{SECTION_COUNT}</span>
                        </span>
                        <span className="h-px w-8 bg-slate-300" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                          {content.milestone}
                        </span>
                      </div>

                      <h3 className="mt-2 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl xl:text-[2.6rem] xl:leading-[1.1]">
                        {content.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base lg:mt-4 lg:text-lg">
                        {content.description}
                      </p>

                      <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:mt-6 lg:grid-cols-1 lg:gap-2.5 xl:grid-cols-2">
                        {content.points.map(({ icon: Icon, text }, i) => (
                          <motion.li
                            key={text}
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.08 + i * 0.05 }}
                            className={`flex items-center gap-2.5 text-sm text-slate-700 ${i > 2 ? "hidden sm:flex" : ""}`}
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-brand-600 shadow-card">
                              <Icon className="h-4 w-4" />
                            </span>
                            {text}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Live status — updates with every beat, not just per section */}
                <div className="mt-3 flex flex-wrap items-center gap-2 lg:mb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Status</span>
                    <motion.span
                      key={beat.status.label}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.18 }}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold ${tone.chip}`}
                    >
                      {beat.status.tone === "done" || beat.status.label === "Data Synced" || beat.status.label === "Checked In" ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : beat.status.tone === "sync" ? (
                        <RefreshCw className="h-3.5 w-3.5" />
                      ) : (
                        <span className={`h-2.5 w-2.5 rounded-full ${tone.dot}`} />
                      )}
                      {beat.status.label}
                    </motion.span>
                  <span className="ml-auto hidden items-center gap-1.5 text-xs font-medium text-slate-500 sm:inline-flex">
                    <Navigation className="h-3.5 w-3.5 text-brand-600" /> {km.toFixed(1)} km travelled
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
