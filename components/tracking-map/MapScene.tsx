"use client";

import React, { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionValue, useMotionValueEvent, useReducedMotion } from "framer-motion";
import type { StatusTone } from "./types";
import {
  OFFLINE_POINTS,
  ROUTE_D,
  ROUTE_SAMPLES,
  STOP_PT,
  TOTAL,
  ZONE,
  ZONE_IN,
  ZONE_OUT,
  headingAt,
  pointAt,
  type Pt,
} from "./journey";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/* ───────────────────────────── Theme ───────────────────────────── */

export const TONE_HEX: Record<StatusTone, string> = {
  idle: "#94a3b8",
  active: "#34d399",
  break: "#fbbf24",
  offline: "#fb7185",
  sync: "#60a5fa",
  visit: "#a78bfa",
  done: "#34d399",
};

const C = {
  ground: "#0b1222", // streets between blocks
  block: "#0f1830",
  building: "#14203d",
  buildingEdge: "#1c2a4d",
  park: "#0e2a2a",
  tree: "#134e4a",
  road: "#1a2645",
  roadEdge: "#24345c",
  roadLine: "#33467a",
  text: "#e2e8f0",
};

/** Places drawn on the map — city blocks are kept clear of these. */
const OFFICE = { x: 470, y: 160, w: 260, h: 175 };
const STALL = { x: 596, y: 1222, w: 112, h: 100 };
const PHARMA = { x: 930, y: 3236, w: 250, h: 175 };
const PLACES = [OFFICE, { x: 520, y: 340, w: 160, h: 70 }, STALL, { x: 600, y: 1320, w: 120, h: 80 }, PHARMA];
const GEOFENCE = { x: 930, y: 3320, r: 190 };
const FINAL_PIN = { x: STOP_PT.final.x + 60, y: STOP_PT.final.y + 4 };

// Camera: world units per screen pixel, and where on screen the scooter sits.
function cameraFor(w: number) {
  if (w >= 1024) return { k: 0.95, ax: 0.35, ay: 0.54 };
  if (w >= 640) return { k: 1.15, ax: 0.5, ay: 0.36 };
  return { k: 1.5, ax: 0.5, ay: 0.3 };
}

function rand(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Server and browser Math can differ in the last digits — round so hydration matches.
const r1 = (v: number) => Math.round(v * 10) / 10;

/* ─────────────────────────── Static city ─────────────────────────── */

const CityGrid = memo(function CityGrid() {
  const out: React.ReactNode[] = [];
  const near = (x: number, y: number, w: number, h: number, pad: number) =>
    ROUTE_SAMPLES.some((p) => p.x > x - pad && p.x < x + w + pad && p.y > y - pad && p.y < y + h + pad);
  const onPlace = (x: number, y: number, w: number, h: number) =>
    PLACES.some((r) => x < r.x + r.w + 24 && x + w > r.x - 24 && y < r.y + r.h + 24 && y + h > r.y - 24);

  for (let r = -4; r < 27; r++) {
    for (let c = -5; c < 11; c++) {
      const x = c * 214 + 12;
      const y = r * 176 + 10;
      const w = 188, h = 150;
      if (near(x, y, w, h, 34) || onPlace(x, y, w, h)) continue;
      const k = (r + 10) * 37 + (c + 10) * 11;
      const park = rand(k) > 0.87;
      out.push(<rect key={`b${r}.${c}`} x={x} y={y} width={w} height={h} rx={10} fill={park ? C.park : C.block} />);
      if (park) {
        [[40, 44, 18], [110, 90, 22], [150, 40, 14]].forEach(([dx, dy, rr], i) =>
          out.push(<circle key={`t${r}.${c}.${i}`} cx={x + dx} cy={y + dy} r={rr} fill={C.tree} />)
        );
        continue;
      }
      const n = 2 + Math.floor(rand(k + 1) * 3);
      for (let i = 0; i < n; i++) {
        const bw = r1(44 + rand(k + i * 3) * 46);
        const bh = r1(36 + rand(k + i * 5) * 40);
        const bx = r1(x + 12 + rand(k + i * 7) * (w - bw - 24));
        const by = r1(y + 12 + rand(k + i * 9) * (h - bh - 24));
        out.push(
          <rect key={`h${r}.${c}.${i}`} x={bx} y={by} width={bw} height={bh} rx={4} fill={C.building} stroke={C.buildingEdge} strokeWidth={1.2} />
        );
      }
    }
  }
  return <g>{out}</g>;
});

function Label({ x, y, text, bg, fg = "#fff" }: { x: number; y: number; text: string; bg: string; fg?: string }) {
  const w = text.length * 8.2 + 26;
  return (
    <g>
      <rect x={x - w / 2} y={y - 14} width={w} height={28} rx={8} fill={bg} />
      <text x={x} y={y + 4.5} textAnchor="middle" fontSize={12.5} fontWeight={700} letterSpacing={1.1} fill={fg}>
        {text}
      </text>
    </g>
  );
}

function Roof({ x, y, w, h, edge, glow }: { x: number; y: number; w: number; h: number; edge: string; glow: string }) {
  return (
    <g>
      <rect x={x - 10} y={y - 10} width={w + 20} height={h + 20} rx={18} fill={glow} opacity={0.08} />
      <rect x={x} y={y} width={w} height={h} rx={12} fill="#121c38" stroke={edge} strokeOpacity={0.55} strokeWidth={2} />
      <rect x={x + 14} y={y + 14} width={w - 28} height={h - 28} rx={7} fill="none" stroke={edge} strokeOpacity={0.25} strokeWidth={1.5} strokeDasharray="4 6" />
      <rect x={x + 22} y={y + 22} width={30} height={20} rx={3} fill={edge} opacity={0.25} />
      <circle cx={x + w - 38} cy={y + 34} r={10} fill={edge} opacity={0.22} />
    </g>
  );
}

function Tower({ x, y, ok }: { x: number; y: number; ok: boolean }) {
  const c = ok ? TONE_HEX.active : TONE_HEX.offline;
  return (
    <g>
      <circle cx={x} cy={y} r={22} fill="#0b1222" stroke={c} strokeWidth={2.5} />
      <path d={`M${x},${y + 10} L${x - 7},${y + 12} L${x},${y - 9} L${x + 7},${y + 12} Z`} fill="none" stroke="#cbd5e1" strokeWidth={2} strokeLinejoin="round" />
      <path d={`M${x - 9},${y - 10} q-5,6 0,12 M${x + 9},${y - 10} q5,6 0,12`} stroke={ok ? c : "#475569"} strokeWidth={2} fill="none" strokeLinecap="round" />
      {!ok && <line x1={x - 15} y1={y + 15} x2={x + 15} y2={y - 15} stroke={c} strokeWidth={3} strokeLinecap="round" />}
    </g>
  );
}

const StaticWorld = memo(function StaticWorld() {
  const zoneLabelW = 190;
  return (
    <g>
      <rect x={-1400} y={-1000} width={4200} height={6600} fill={C.ground} />
      <CityGrid />

      {/* Field office + parking bay */}
      <Roof {...OFFICE} edge="#60a5fa" glow="#3b82f6" />
      <Label x={OFFICE.x + OFFICE.w / 2} y={OFFICE.y + OFFICE.h / 2} text="FIELD OFFICE" bg="#1d4ed8" />
      <rect x={530} y={346} width={140} height={58} rx={8} fill="#111a31" stroke="#24345c" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={544 + i * 28} y1={352} x2={544 + i * 28} y2={398} stroke="#24345c" strokeWidth={2} />
      ))}

      {/* Chai Point */}
      <g>
        <rect x={STALL.x - 8} y={STALL.y - 8} width={STALL.w + 16} height={STALL.h + 16} rx={14} fill="#f59e0b" opacity={0.08} />
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x={STALL.x + i * (STALL.w / 6)} y={STALL.y} width={STALL.w / 6} height={60} fill={i % 2 ? "#3b2410" : "#d97706"} />
        ))}
        <rect x={STALL.x} y={STALL.y} width={STALL.w} height={60} rx={6} fill="none" stroke="#f59e0b" strokeOpacity={0.7} strokeWidth={2} />
        <rect x={STALL.x} y={STALL.y + 60} width={STALL.w} height={40} rx={6} fill="#1f1a12" stroke="#78350f" strokeWidth={1.5} />
        <circle cx={STALL.x + 28} cy={STALL.y + 80} r={9} fill="#3b2410" stroke="#d97706" strokeWidth={1.5} />
        <circle cx={STALL.x + 64} cy={STALL.y + 80} r={9} fill="#3b2410" stroke="#d97706" strokeWidth={1.5} />
        <Label x={STALL.x + STALL.w / 2} y={STALL.y + 30} text="CHAI POINT" bg="#78350f" fg="#fef3c7" />
        <rect x={STALL.x + 20} y={STALL.y + 136} width={80} height={14} rx={7} fill="#1f1a12" stroke="#78350f" />
      </g>

      {/* Dead zone */}
      <g>
        <circle cx={ZONE.x} cy={ZONE.y} r={ZONE.r} fill="url(#tmx-hatch)" />
        <circle cx={ZONE.x} cy={ZONE.y} r={ZONE.r} fill="#f43f5e" fillOpacity={0.04} stroke="#fb7185" strokeOpacity={0.5} strokeWidth={2} strokeDasharray="10 10" />
        <rect x={ZONE.x - zoneLabelW / 2} y={ZONE.y - ZONE.r - 15} width={zoneLabelW} height={30} rx={15} fill="#2a0d17" stroke="#9f1239" />
        <text x={ZONE.x} y={ZONE.y - ZONE.r + 5} textAnchor="middle" fontSize={12.5} fontWeight={700} fill="#fda4af">
          No network coverage
        </text>
        <Tower x={ZONE.x - 150} y={ZONE.y - 90} ok={false} />
      </g>

      {/* Metro Pharma */}
      <Roof {...PHARMA} edge="#a78bfa" glow="#8b5cf6" />
      <Label x={PHARMA.x + PHARMA.w / 2} y={PHARMA.y + PHARMA.h / 2} text="METRO PHARMA" bg="#6d28d9" />
      <rect x={PHARMA.x - 6} y={PHARMA.y + 132} width={12} height={36} rx={3} fill="#a78bfa" opacity={0.6} />

      {/* The day's road */}
      <path d={ROUTE_D} stroke={C.roadEdge} strokeWidth={50} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={ROUTE_D} stroke={C.road} strokeWidth={42} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={ROUTE_D} stroke={C.roadLine} strokeWidth={2} strokeDasharray="16 16" fill="none" />

      {/* Start point */}
      <circle cx={STOP_PT.office.x} cy={STOP_PT.office.y} r={10} fill="#0b1222" stroke="#60a5fa" strokeWidth={4} />
    </g>
  );
});

/* ─────────────────────────── Live markers ─────────────────────────── */

function Callout({ text, tone, icon, y = 96 }: { text: string; tone: StatusTone; icon?: "check"; y?: number }) {
  const w = text.length * 7.7 + 50;
  const color = TONE_HEX[tone];
  return (
    <motion.g
      initial={{ opacity: 0, y: y + 10 }}
      animate={{ opacity: 1, y }}
      exit={{ opacity: 0, y: y - 6, transition: { duration: 0.15, ease: "easeIn" } }}
      // Wait for the previous callout to clear, so their text never overlaps.
      transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
    >
      <rect x={-w / 2} y={-21} width={w} height={42} rx={21} fill="#0b1222" fillOpacity={0.94} filter="url(#tmx-shadow)" />
      <rect x={-w / 2} y={-21} width={w} height={42} rx={21} fill="none" stroke={color} strokeOpacity={0.55} strokeWidth={1.5} />
      {icon === "check" ? (
        <g>
          <circle cx={-w / 2 + 23} cy={0} r={9.5} fill={color} />
          <path d={`M${-w / 2 + 18.5},0 l3,3 l6,-6`} stroke="#0b1222" strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : (
        <g>
          <circle className="gj-ping" cx={-w / 2 + 23} cy={0} r={5} fill={color} opacity={0.5} />
          <circle cx={-w / 2 + 23} cy={0} r={5} fill={color} />
        </g>
      )}
      <text x={-w / 2 + 40} y={4.8} fontSize={14} fontWeight={600} fill={C.text}>
        {text}
      </text>
    </motion.g>
  );
}

function Rings({ x = 0, y = 0, color, r = 80 }: { x?: number; y?: number; color: string; r?: number }) {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {[0, 0.6, 1.2].map((d) => (
        <circle key={d} className="gj-ring" cx={x} cy={y} r={r} fill="none" stroke={color} strokeWidth={2.5} style={{ animationDelay: `${d}s` }} />
      ))}
    </motion.g>
  );
}

function DropPin({ x, y, color, label }: { x: number; y: number; color: string; label: string }) {
  const w = label.length * 7.6 + 28;
  return (
    <motion.g
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
    >
      <ellipse cx={x} cy={y + 2} rx={10} ry={4} fill="#000" opacity={0.4} />
      <path d={`M${x},${y} c-17,-20 -17,-44 0,-44 c17,0 17,24 0,44 Z`} fill={color} stroke="#0b1222" strokeWidth={2.5} />
      <circle cx={x} cy={y - 28} r={6} fill="#0b1222" />
      <rect x={x - w / 2} y={y - 86} width={w} height={30} rx={15} fill="#0b1222" stroke={color} strokeOpacity={0.6} filter="url(#tmx-shadow)" />
      <text x={x} y={y - 66} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.text}>
        {label}
      </text>
    </motion.g>
  );
}

function Scooter({ rider }: { rider: boolean }) {
  // Drawn pointing "up" (−y), centred on 0,0.
  return (
    <g transform="scale(1.3)">
      {rider && <path d="M-9,-30 L-34,-120 L34,-120 L9,-30 Z" fill="url(#tmx-beam)" />}
      <ellipse cx={3} cy={4} rx={15} ry={29} fill="#000" opacity={0.45} />
      <rect x={-4} y={-30} width={8} height={12} rx={3} fill="#020617" />
      <rect x={-4} y={17} width={8} height={12} rx={3} fill="#020617" />
      <path d="M-10,-16 C-10,-30 10,-30 10,-16 L11,16 C11,27 -11,27 -11,16 Z" fill="#2563eb" />
      <path d="M-6,-20 C-6,-26 6,-26 6,-20 L6,-12 L-6,-12 Z" fill="#60a5fa" />
      <rect x={-7} y={0} width={14} height={18} rx={6} fill="#0f172a" />
      <line x1={-15} y1={-17} x2={15} y2={-17} stroke="#94a3b8" strokeWidth={3.5} strokeLinecap="round" />
      <ellipse cx={0} cy={-29} rx={4} ry={2.2} fill="#fef08a" />
      <ellipse cx={0} cy={26} rx={3.5} ry={1.8} fill="#f43f5e" />
      {rider && (
        <g>
          <ellipse cx={0} cy={5} rx={13} ry={8} fill="#1d4ed8" />
          <rect x={-10} y={8} width={20} height={9} rx={4} fill="#334155" />
          <circle cx={0} cy={-2} r={7.5} fill="#f8fafc" stroke="#cbd5e1" strokeWidth={1} />
          <path d="M-5,-6 C-2,-9 2,-9 5,-6" stroke="#2563eb" strokeWidth={2.4} fill="none" />
        </g>
      )}
    </g>
  );
}

function Avatar({ tone }: { tone: StatusTone }) {
  const c = TONE_HEX[tone];
  return (
    <g>
      <circle className="gj-ping" cx={0} cy={0} r={21} fill={c} opacity={0.35} />
      <circle cx={0} cy={0} r={21} fill="#0b1222" filter="url(#tmx-shadow)" />
      <circle cx={0} cy={0} r={18} fill="#1e3a8a" stroke={c} strokeWidth={3} />
      <text x={0} y={4.5} textAnchor="middle" fontSize={12} fontWeight={700} fill="#fff">
        RS
      </text>
    </g>
  );
}

/** Chapter/step-specific markers. Callouts sit just below the scooter (inside the follow group). */
function ScooterCallouts({ chapter, step, breakMins, stored }: { chapter: number; step: number; breakMins: number; stored: number }) {
  let c: { key: string; text: string; tone: StatusTone; icon?: "check" } | null = null;
  if (chapter === 0) {
    if (step === 1) c = { key: "perm", text: "Allow location access?", tone: "idle" };
    if (step === 2) c = { key: "gps", text: "Acquiring GPS · ±8 m", tone: "sync" };
    if (step === 3) c = { key: "started", text: "Tracking started · 9:02 AM", tone: "active", icon: "check" };
  } else if (chapter === 1) {
    if (step === 0) c = { key: "parked", text: "Parked near Chai Point", tone: "active" };
    if (step >= 1) c = { key: "break", text: `On break · 00:${String(breakMins).padStart(2, "0")}:00`, tone: "break" };
  } else if (chapter === 2) {
    if (step === 0) c = { key: "end", text: "Break ended · 15 min", tone: "break", icon: "check" };
    if (step === 1) c = { key: "ready", text: "Helmet on · ready to ride", tone: "break" };
    if (step === 2) c = { key: "resumed", text: "Tracking resumed · 11:20 AM", tone: "active", icon: "check" };
  } else if (chapter === 3) {
    if (step === 0) c = { key: "nonet", text: "No internet connection", tone: "offline" };
    if (step === 1) c = { key: "offline", text: "Offline tracking active", tone: "offline" };
    if (step === 2) c = { key: "saved", text: `Saved on device · ${stored} pts`, tone: "offline" };
    if (step === 3) c = { key: "sync", text: "Back online · syncing…", tone: "sync" };
    if (step === 4) c = { key: "synced", text: `Data synced · ${OFFLINE_POINTS} points`, tone: "sync", icon: "check" };
  } else if (chapter === 4) {
    if (step === 0) c = { key: "geo", text: "Inside geofence · 40 m", tone: "visit" };
    if (step === 1) c = { key: "in", text: "Checked in · 3:20 PM", tone: "visit", icon: "check" };
    if (step === 2) c = { key: "act", text: "Visit in progress…", tone: "visit" };
    if (step === 3) c = { key: "vdone", text: "Visit completed", tone: "done", icon: "check" };
  } else if (chapter === 5) {
    if (step === 0) c = { key: "review", text: "Stop tracking for today?", tone: "idle" };
    if (step === 1) c = { key: "saving", text: "Saving final location…", tone: "idle" };
    if (step === 2) c = { key: "closed", text: "Route closed · 18.4 km", tone: "idle", icon: "check" };
    if (step === 3) c = { key: "jdone", text: "Journey completed", tone: "done", icon: "check" };
  }

  return (
    <>
      <AnimatePresence>
        {chapter === 0 && step === 2 && <Rings key="gps" color="#60a5fa" r={90} />}
        {chapter === 2 && step === 2 && <Rings key="resume" color={TONE_HEX.active} r={70} />}
      </AnimatePresence>
      {/* Keyed by text prefix so the live counters update in place instead of re-animating */}
      <AnimatePresence>{c && <Callout key={c.key} text={c.text} tone={c.tone} icon={c.icon} />}</AnimatePresence>
    </>
  );
}

function WorldMarkers({ chapter, step, synced, stored }: { chapter: number; step: number; synced: boolean; stored: number }) {
  const onBreak = (chapter === 1 && step >= 1) || (chapter === 2 && step <= 0);
  const dots = Array.from({ length: 10 }, (_, i) => {
    const d = ZONE_IN + ((ZONE_OUT - ZONE_IN) * (i + 0.5)) / 10;
    const p = pointAt(d);
    return { x: r1(p.x), y: r1(p.y), on: stored >= ((i + 0.5) / 10) * OFFLINE_POINTS };
  });
  const stall = { x: STALL.x + STALL.w / 2, y: STALL.y + 64 };

  return (
    <g>
      {/* Break zone around the stall */}
      <AnimatePresence>
        {onBreak && (
          <motion.circle
            key="break"
            cx={stall.x}
            cy={stall.y}
            r={124}
            fill="#f59e0b"
            fillOpacity={0.06}
            stroke="#fbbf24"
            strokeOpacity={0.6}
            strokeWidth={2.5}
            strokeDasharray="9 9"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.4 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        )}
      </AnimatePresence>

      {/* Points stored on the device while offline → turn blue once synced */}
      {dots.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={6.5}
          fill={synced ? "#60a5fa" : "#0b1222"}
          stroke={synced ? "#dbeafe" : "#fbbf24"}
          strokeWidth={2.5}
          style={{ opacity: p.on ? 1 : 0, transition: "opacity 0.25s, fill 0.5s, stroke 0.5s" }}
        />
      ))}
      <AnimatePresence>
        {chapter >= 3 && (chapter > 3 || step >= 3) && (
          <motion.g key="tower" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <Tower x={ZONE.x + 150} y={ZONE.y + ZONE.r + 70} ok />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Visit geofence + pin */}
      <motion.circle
        cx={GEOFENCE.x}
        cy={GEOFENCE.y}
        r={GEOFENCE.r}
        fill="#8b5cf6"
        stroke="#a78bfa"
        strokeWidth={2.5}
        strokeDasharray="10 10"
        initial={false}
        animate={{ fillOpacity: chapter === 4 && step === 0 ? 0.14 : 0.05, strokeOpacity: chapter >= 4 ? 0.8 : 0.35 }}
        transition={{ duration: 0.4 }}
      />
      <AnimatePresence>
        {chapter >= 4 && step >= 0 && <DropPin key="visit" x={PHARMA.x + PHARMA.w / 2} y={PHARMA.y - 8} color="#a78bfa" label="Visit location" />}
        {chapter === 5 && step >= 2 && <DropPin key="final" x={FINAL_PIN.x} y={FINAL_PIN.y} color={TONE_HEX.active} label="Final location" />}
      </AnimatePresence>
    </g>
  );
}

/* ─────────────────────────────── Scene ─────────────────────────────── */

export interface SceneState {
  chapter: number;
  step: number;
  tone: StatusTone;
  breakMins: number;
  stored: number;
  synced: boolean;
  offBike: Pt | null;
}

interface MapSceneProps {
  /** Distance along the road (smoothed scroll) */
  distance: MotionValue<number>;
  state: SceneState;
}

const WALK_S = 0.55;

/** Rider shows on the scooter only once Rahul has walked back to it (never two Rahuls at once). */
function useRiderOn(offBike: boolean, delayMs: number) {
  const [on, setOn] = useState(!offBike);
  useEffect(() => {
    if (offBike) {
      setOn(false);
      return;
    }
    if (delayMs <= 0) {
      setOn(true);
      return;
    }
    const id = setTimeout(() => setOn(true), delayMs);
    return () => clearTimeout(id);
  }, [offBike, delayMs]);
  return on;
}

export function MapScene({ distance, state }: MapSceneProps) {
  const { chapter, step, tone, breakMins, stored, synced, offBike } = state;
  const reduced = useReducedMotion();

  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const scooterRef = useRef<SVGGElement>(null);
  const followRef = useRef<SVGGElement>(null);
  const trailRefs = useRef<(SVGPathElement | null)[]>([]);
  const offlineRef = useRef<SVGPathElement>(null);
  const size = useRef({ w: 0, h: 0 });

  // Everything that moves with the scroll is written straight to the DOM — no React render per frame.
  const place = (d: number) => {
    const p = pointAt(d);
    scooterRef.current?.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${headingAt(d) + 90})`);
    followRef.current?.setAttribute("transform", `translate(${p.x} ${p.y})`);
    trailRefs.current.forEach((el) => el?.setAttribute("stroke-dasharray", `${d} ${TOTAL + 100}`));
    const seg = Math.max(0, Math.min(ZONE_OUT - ZONE_IN, d - ZONE_IN));
    offlineRef.current?.setAttribute("stroke-dasharray", `0 ${ZONE_IN} ${seg} ${TOTAL + 100}`);

    const { w, h } = size.current;
    if (!w || !h) return;
    const cam = cameraFor(w);
    const vw = w * cam.k;
    const vh = h * cam.k;
    svgRef.current?.setAttribute("viewBox", `${p.x - cam.ax * vw} ${p.y - cam.ay * vh} ${vw} ${vh}`);
  };

  useMotionValueEvent(distance, "change", place);

  useIsoLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      size.current = { w: el.clientWidth, h: el.clientHeight };
      place(distance.get());
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bike = pointAt(distance.get());
  const walk = { duration: reduced ? 0 : WALK_S, ease: [0.4, 0, 0.2, 1] as const };
  const rider = useRiderOn(!!offBike, reduced ? 0 : WALK_S * 1000 - 50);
  const toneHex = TONE_HEX[tone];

  return (
    <div ref={wrapRef} className="absolute inset-0 [contain:strict]">
      <svg ref={svgRef} viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label="Live map of Rahul's field day">
        <defs>
          <filter id="tmx-shadow" x="-30%" y="-60%" width="160%" height="220%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.5" />
          </filter>
          <pattern id="tmx-hatch" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="16" height="16" fill="#140a14" />
            <line x1="0" y1="0" x2="0" y2="16" stroke="#3b0d1c" strokeWidth="6" />
          </pattern>
          <linearGradient id="tmx-beam" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
          </linearGradient>
        </defs>

        <StaticWorld />

        {/* Planned route ahead */}
        <path d={ROUTE_D} stroke="#3b82f6" strokeOpacity={0.35} strokeWidth={3} strokeDasharray="2 12" strokeLinecap="round" fill="none" />

        {/* Travelled route. The halo is a wide translucent stroke, not a blur filter: its dash changes every
            scroll frame, and a filter would re-blur the whole route on each one. */}
        <path ref={(el) => { trailRefs.current[0] = el; }} d={ROUTE_D} pathLength={TOTAL} stroke="#3b82f6" strokeOpacity={0.22} strokeWidth={24} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`0 ${TOTAL + 100}`} />
        <path ref={(el) => { trailRefs.current[1] = el; }} d={ROUTE_D} pathLength={TOTAL} stroke="#60a5fa" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`0 ${TOTAL + 100}`} />
        {/* Offline stretch: amber while stored on the device, blends back to blue once synced */}
        <path
          ref={offlineRef}
          d={ROUTE_D}
          pathLength={TOTAL}
          stroke={synced ? "#60a5fa" : "#fbbf24"}
          strokeWidth={7}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`0 ${TOTAL + 100}`}
          style={{ transition: "stroke 0.6s" }}
        />

        <WorldMarkers chapter={chapter} step={step} synced={synced} stored={stored} />

        {/* Scooter (rotates with the road) */}
        <g ref={scooterRef}>
          {rider && tone !== "idle" && <circle className="gj-ping" cx={0} cy={0} r={30} fill={toneHex} opacity={0.3} />}
          <Scooter rider={rider} />
        </g>

        {/* Follows the scooter without rotating: name tag + callouts */}
        <g ref={followRef}>
          <g opacity={rider ? 1 : 0} style={{ transition: "opacity 0.3s" }}>
            <rect x={-42} y={-70} width={84} height={28} rx={14} fill="#0b1222" stroke="#24345c" />
            <circle cx={-25} cy={-56} r={4.5} fill={toneHex} />
            <text x={-14} y={-51} fontSize={12.5} fontWeight={700} fill="#fff">
              Rahul
            </text>
          </g>
          <ScooterCallouts chapter={chapter} step={step} breakMins={breakMins} stored={stored} />
        </g>

        {/* Rahul off the scooter (break, visit, end of day) — walks from / back to it */}
        <AnimatePresence initial={false}>
          {offBike && (
            <motion.g
              key="avatar"
              initial={{ opacity: 0, scale: 0.6, x: bike.x, y: bike.y }}
              animate={{ opacity: 1, scale: 1, x: offBike.x, y: offBike.y }}
              exit={{
                opacity: 0,
                scale: 0.6,
                x: bike.x,
                y: bike.y,
                transition: { ...walk, opacity: { duration: 0.18, delay: reduced ? 0 : WALK_S - 0.18 } },
              }}
              transition={{ ...walk, opacity: { duration: 0.2 } }}
            >
              <Avatar tone={tone} />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}
