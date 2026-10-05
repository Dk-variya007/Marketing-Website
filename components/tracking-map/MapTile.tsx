"use client";

import React, { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import type { StatusTone } from "../geo-journey/timeline";
import { STAGES } from "./stages";

export const VB_W = 1000;
export const VB_H = 800;

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const TONE_HEX: Record<StatusTone, string> = {
  idle: "#64748b",
  active: "#10b981",
  break: "#f59e0b",
  offline: "#f43f5e",
  sync: "#2563eb",
  visit: "#8b5cf6",
  done: "#10b981",
};

// Offline zone (stage 04)
const ZONE = { cx: 470, cy: 400, r: 175 };

function rand(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/* ─────────────────────────── Map base ─────────────────────────── */

const CityBlocks = memo(function CityBlocks({ seed }: { seed: number }) {
  const blocks = [];
  for (let r = 0; r < 8; r++) {
    for (let c = -1; c < 9; c++) {
      const k = seed * 100 + r * 10 + c;
      const x = c * 125 + 10;
      const y = r * 100 + 9;
      const park = rand(k) > 0.86;
      blocks.push(
        <rect
          key={`${r}-${c}`}
          x={x}
          y={y}
          width={105}
          height={82}
          rx={10}
          fill={park ? "#d8f0df" : rand(k + 7) > 0.5 ? "#f6f8fb" : "#f1f4f9"}
          stroke={park ? "#bfe5cb" : "#e3e8f0"}
          strokeWidth={1.5}
        />
      );
      if (!park && rand(k + 3) > 0.45) {
        blocks.push(
          <rect key={`${r}-${c}-b`} x={x + 14} y={y + 14} width={34 + rand(k + 4) * 30} height={24 + rand(k + 5) * 30} rx={4} fill="#e6ebf2" />
        );
      }
      if (park) {
        blocks.push(<circle key={`${r}-${c}-t1`} cx={x + 30} cy={y + 30} r={11} fill="#a7dcb7" />);
        blocks.push(<circle key={`${r}-${c}-t2`} cx={x + 70} cy={y + 52} r={14} fill="#a7dcb7" />);
      }
    }
  }
  return <g>{blocks}</g>;
});

function RoofBuilding({
  x, y, w, h, roof, edge, label, labelBg,
}: { x: number; y: number; w: number; h: number; roof: string; edge: string; label: string; labelBg: string }) {
  return (
    <g>
      <rect x={x + 6} y={y + 8} width={w} height={h} rx={10} fill="#0f172a" opacity={0.08} />
      <rect x={x} y={y} width={w} height={h} rx={10} fill={roof} stroke={edge} strokeWidth={2} />
      <rect x={x + 14} y={y + 14} width={w - 28} height={h - 28} rx={6} fill="none" stroke={edge} strokeWidth={1.5} strokeDasharray="4 5" />
      <rect x={x + 22} y={y + 22} width={26} height={18} rx={3} fill={edge} opacity={0.6} />
      <rect x={x + w - 50} y={y + 24} width={18} height={18} rx={9} fill={edge} opacity={0.5} />
      <rect x={x + w / 2 - label.length * 4.4 - 12} y={y + h / 2 - 13} width={label.length * 8.8 + 24} height={26} rx={6} fill={labelBg} />
      <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fontSize={13} fontWeight={700} fill="#fff" letterSpacing={1}>
        {label}
      </text>
    </g>
  );
}

function ChaiStall({ x, y }: { x: number; y: number }) {
  // x,y = top-left; 110 × 100
  return (
    <g>
      <rect x={x + 5} y={y + 7} width={110} height={100} rx={8} fill="#0f172a" opacity={0.08} />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={x + i * (110 / 6)} y={y} width={110 / 6} height={62} fill={i % 2 ? "#fff7ed" : "#fb923c"} />
      ))}
      <rect x={x} y={y} width={110} height={62} rx={6} fill="none" stroke="#ea580c" strokeWidth={2} />
      <rect x={x} y={y + 62} width={110} height={38} rx={6} fill="#fef3c7" stroke="#fcd34d" strokeWidth={1.5} />
      <circle cx={x + 26} cy={y + 81} r={9} fill="#fde68a" stroke="#d97706" strokeWidth={1.5} />
      <circle cx={x + 62} cy={y + 81} r={9} fill="#fde68a" stroke="#d97706" strokeWidth={1.5} />
      <rect x={x + 10} y={y + 24} width={90} height={18} rx={5} fill="#7c2d12" />
      <text x={x + 55} y={y + 37} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff7ed" letterSpacing={0.8}>
        CHAI POINT
      </text>
    </g>
  );
}

function Tower({ x, y, ok }: { x: number; y: number; ok: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={22} fill="#fff" stroke={ok ? "#10b981" : "#f43f5e"} strokeWidth={2.5} />
      <path d={`M${x},${y + 10} L${x - 7},${y + 12} L${x},${y - 9} L${x + 7},${y + 12} Z`} fill="none" stroke="#334155" strokeWidth={2} strokeLinejoin="round" />
      <path d={`M${x - 9},${y - 10} q-5,6 0,12 M${x + 9},${y - 10} q5,6 0,12`} stroke={ok ? "#10b981" : "#94a3b8"} strokeWidth={2} fill="none" strokeLinecap="round" />
      {!ok && <line x1={x - 15} y1={y + 15} x2={x + 15} y2={y - 15} stroke="#f43f5e" strokeWidth={3} strokeLinecap="round" />}
    </g>
  );
}

/* ─────────────────────────── Markers ─────────────────────────── */

function Callout({
  x, y, text, tone, align = "center", icon,
}: { x: number; y: number; text: string; tone: StatusTone; align?: "center" | "left" | "right"; icon?: "check" | "dot" }) {
  const w = text.length * 7.6 + 46;
  const left = align === "center" ? x - w / 2 : align === "right" ? x : x - w;
  const color = TONE_HEX[tone];
  return (
    <motion.g
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <rect x={left} y={y - 20} width={w} height={40} rx={20} fill="#fff" filter="url(#tm-shadow)" />
      <rect x={left} y={y - 20} width={w} height={40} rx={20} fill="none" stroke={color} strokeOpacity={0.35} strokeWidth={1.5} />
      {icon === "check" ? (
        <g>
          <circle cx={left + 22} cy={y} r={9} fill={color} />
          <path d={`M${left + 17.5},${y} l3,3 l6,-6`} stroke="#fff" strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : (
        <g>
          <circle className="gj-ping" cx={left + 22} cy={y} r={5} fill={color} opacity={0.5} />
          <circle cx={left + 22} cy={y} r={5} fill={color} />
        </g>
      )}
      <text x={left + 38} y={y + 4.5} fontSize={13.5} fontWeight={650} fill="#0f172a">
        {text}
      </text>
    </motion.g>
  );
}

function DropPin({ x, y, color, label }: { x: number; y: number; color: string; label: string }) {
  const w = label.length * 7.4 + 26;
  return (
    <motion.g
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
    >
      <ellipse cx={x} cy={y + 2} rx={9} ry={4} fill="#0f172a" opacity={0.2} />
      <path d={`M${x},${y} c-17,-20 -17,-44 0,-44 c17,0 17,24 0,44 Z`} fill={color} stroke="#fff" strokeWidth={2.5} />
      <circle cx={x} cy={y - 28} r={6} fill="#fff" />
      <rect x={x - w / 2} y={y - 84} width={w} height={28} rx={14} fill="#fff" filter="url(#tm-shadow)" />
      <text x={x} y={y - 65} textAnchor="middle" fontSize={13} fontWeight={700} fill="#0f172a">
        {label}
      </text>
    </motion.g>
  );
}

function Rings({ x, y, color, r = 70 }: { x: number; y: number; color: string; r?: number }) {
  return (
    <g>
      {[0, 0.6, 1.2].map((d) => (
        <circle key={d} className="gj-ring" cx={x} cy={y} r={r} fill="none" stroke={color} strokeWidth={2.5} style={{ animationDelay: `${d}s` }} />
      ))}
    </g>
  );
}

function TopScooter({ rider }: { rider: boolean }) {
  // Drawn pointing "up" (−y), centred on 0,0.
  return (
    <g>
      <ellipse cx={3} cy={4} rx={14} ry={28} fill="#0f172a" opacity={0.18} />
      <rect x={-4} y={-30} width={8} height={12} rx={3} fill="#0f172a" />
      <rect x={-4} y={17} width={8} height={12} rx={3} fill="#0f172a" />
      <path d="M-10,-16 C-10,-30 10,-30 10,-16 L11,16 C11,27 -11,27 -11,16 Z" fill="#1d4ed8" />
      <path d="M-6,-20 C-6,-26 6,-26 6,-20 L6,-12 L-6,-12 Z" fill="#3b82f6" />
      <rect x={-7} y={0} width={14} height={18} rx={6} fill="#111827" />
      <line x1={-15} y1={-17} x2={15} y2={-17} stroke="#1e293b" strokeWidth={3.5} strokeLinecap="round" />
      <ellipse cx={0} cy={-29} rx={4} ry={2.2} fill="#fde68a" />
      <ellipse cx={0} cy={26} rx={3.5} ry={1.8} fill="#ef4444" />
      {rider && (
        <g>
          <ellipse cx={0} cy={5} rx={13} ry={8} fill="#2563eb" />
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
      <circle className="gj-ping" cx={0} cy={0} r={20} fill={c} opacity={0.35} />
      <circle cx={0} cy={0} r={20} fill="#fff" filter="url(#tm-shadow)" />
      <circle cx={0} cy={0} r={17} fill="#1e3a8a" stroke={c} strokeWidth={3} />
      <text x={0} y={4.5} textAnchor="middle" fontSize={12} fontWeight={700} fill="#fff">
        RS
      </text>
    </g>
  );
}

/* ───────────────────── Stage-specific visuals ───────────────────── */

type Pt = { x: number; y: number };

/** Where Rahul is when he's off the scooter (null = riding / on it). */
function offBike(stage: number, step: number): Pt | null {
  switch (stage) {
    case 0:
      return step < 3 ? { x: 368, y: 338 } : null;
    case 1:
      return step >= 1 ? { x: 250, y: 470 } : null;
    case 2:
      return step <= 0 ? { x: 250, y: 310 } : null;
    case 4:
      return step >= 1 ? { x: 400, y: 478 } : null;
    case 5:
      return { x: 470, y: 344 };
    default:
      return null;
  }
}

function useBreakTimer(running: boolean) {
  const [mins, setMins] = useState(0);
  useEffect(() => {
    if (!running) {
      setMins(0);
      return;
    }
    const id = setInterval(() => setMins((m) => (m >= 15 ? 15 : m + 1)), 140);
    return () => clearInterval(id);
  }, [running]);
  return `00:${String(mins).padStart(2, "0")}:00`;
}

function useCounter(running: boolean, target: number, done: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (done) {
      setN(target);
      return;
    }
    if (!running) {
      setN(0);
      return;
    }
    const id = setInterval(() => setN((v) => Math.min(target, v + 9)), 60);
    return () => clearInterval(id);
  }, [running, target, done]);
  return n;
}

function StageBackground({ stage }: { stage: number }) {
  switch (stage) {
    case 0:
      return (
        <g>
          <RoofBuilding x={290} y={110} w={260} h={170} roof="#e0e7ff" edge="#a5b4fc" label="FIELD OFFICE" labelBg="#1d4ed8" />
          {/* parking bay */}
          <rect x={360} y={290} width={120} height={66} rx={8} fill="#e2e8f0" stroke="#cbd5e1" />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={372 + i * 32} y1={296} x2={372 + i * 32} y2={350} stroke="#fff" strokeWidth={2} />
          ))}
        </g>
      );
    case 1:
      return <ChaiStall x={196} y={340} />;
    case 2:
      return <ChaiStall x={196} y={180} />;
    case 3:
      return (
        <g>
          <circle cx={ZONE.cx} cy={ZONE.cy} r={ZONE.r} fill="url(#tm-hatch)" />
          <circle cx={ZONE.cx} cy={ZONE.cy} r={ZONE.r} fill="#f43f5e" fillOpacity={0.06} stroke="#f43f5e" strokeOpacity={0.45} strokeWidth={2} strokeDasharray="8 8" />
          <rect x={ZONE.cx - 92} y={ZONE.cy - ZONE.r - 14} width={184} height={28} rx={14} fill="#fff1f2" stroke="#fecdd3" />
          <text x={ZONE.cx} y={ZONE.cy - ZONE.r + 5} textAnchor="middle" fontSize={12.5} fontWeight={700} fill="#be123c">
            No network coverage
          </text>
        </g>
      );
    case 4:
    case 5: {
      const y = stage === 4 ? 340 : 245;
      return (
        <g>
          <RoofBuilding x={232} y={y} w={230} h={170} roof="#ede9fe" edge="#c4b5fd" label="METRO PHARMA" labelBg="#6d28d9" />
        </g>
      );
    }
    default:
      return null;
  }
}

function StageOverlay({ stage, step, synced }: { stage: number; step: number; synced: boolean }) {
  const breakTimer = useBreakTimer(stage === 1 && step >= 1);
  const stored = useCounter(stage === 3 && step >= 1, 214, synced || step >= 3);

  switch (stage) {
    case 0:
      return (
        <AnimatePresence>
          {step === 1 && <Callout key="perm" x={470} y={410} align="right" text="Allow location access?" tone="idle" />}
          {step === 2 && <Rings key="rings" x={420} y={330} color="#3b82f6" r={90} />}
          {step === 2 && <Callout key="gps" x={470} y={410} align="right" text="Acquiring GPS · ±8 m" tone="sync" />}
          {step >= 3 && <Callout key="started" x={470} y={410} align="right" text="Tracking started · 9:02 AM" tone="active" icon="check" />}
        </AnimatePresence>
      );
    case 1:
      return (
        <AnimatePresence>
          {step >= 1 && (
            <motion.circle
              key="ring"
              cx={250}
              cy={410}
              r={100}
              fill="#f59e0b"
              fillOpacity={0.08}
              stroke="#f59e0b"
              strokeWidth={2.5}
              strokeDasharray="8 8"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          )}
          {step === 0 && <Callout key="arrived" x={385} y={470} align="right" text="Parked near Chai Point" tone="active" />}
          {step >= 1 && <Callout key="break" x={385} y={520} align="right" text={`On break · ${breakTimer}`} tone="break" />}
        </AnimatePresence>
      );
    case 2:
      return (
        <AnimatePresence>
          {step <= 0 && (
            <motion.circle
              key="ring"
              cx={250}
              cy={250}
              r={100}
              fill="#f59e0b"
              fillOpacity={0.08}
              stroke="#f59e0b"
              strokeWidth={2.5}
              strokeDasharray="8 8"
              exit={{ opacity: 0 }}
            />
          )}
          {step === -1 && <Callout key="on" x={385} y={330} align="right" text="On break · 00:15:00" tone="break" />}
          {step === 0 && <Callout key="end" x={385} y={330} align="right" text="Break ended · 15 min" tone="break" icon="check" />}
          {step === 1 && <Callout key="ready" x={385} y={330} align="right" text="Helmet on · ready to ride" tone="break" />}
          {step >= 2 && <Rings key="rings" x={340} y={240} color="#10b981" r={70} />}
          {step >= 2 && <Callout key="resumed" x={385} y={330} align="right" text="Tracking resumed · 11:20 AM" tone="active" icon="check" />}
        </AnimatePresence>
      );
    case 3: {
      const text =
        step >= 4 ? "Data synced · 214 points" : step === 3 ? "Back online · syncing…" : step === 2 ? `Saved on device · ${stored} pts` : step === 1 ? "Offline tracking active" : step === 0 ? "No internet connection" : null;
      const tone: StatusTone = step >= 3 ? "sync" : "offline";
      return (
        <g>
          <Tower x={300} y={300} ok={false} />
          <AnimatePresence>
            {step >= 3 && (
              <motion.g key="tower" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
                <Tower x={300} y={690} ok />
              </motion.g>
            )}
            {text && <Callout key={text.split(" ")[0] + step} x={455} y={step >= 3 ? 640 : 400} align="left" text={text} tone={tone} icon={step >= 4 ? "check" : "dot"} />}
          </AnimatePresence>
        </g>
      );
    }
    case 4:
      return (
        <g>
          <motion.circle
            cx={410}
            cy={430}
            r={170}
            fill="#8b5cf6"
            stroke="#8b5cf6"
            strokeWidth={2.5}
            strokeDasharray="9 9"
            animate={{ fillOpacity: step === 0 ? 0.14 : 0.06, strokeOpacity: step >= 0 ? 0.8 : 0.4 }}
          />
          <AnimatePresence>
            {step >= 0 && <DropPin key="pin" x={347} y={320} color="#8b5cf6" label="Visit location" />}
            {step === 0 && <Callout key="geo" x={560} y={520} align="right" text="Inside geofence · 40 m" tone="visit" />}
            {step === 1 && <Callout key="in" x={560} y={520} align="right" text="Checked in · 3:20 PM" tone="visit" icon="check" />}
            {step === 2 && <Callout key="act" x={560} y={520} align="right" text="Visit in progress…" tone="visit" />}
            {step >= 3 && <Callout key="done" x={560} y={520} align="right" text="Visit completed" tone="done" icon="check" />}
          </AnimatePresence>
        </g>
      );
    case 5:
      return (
        <AnimatePresence>
          {step >= 2 && <DropPin key="flag" x={520} y={284} color="#10b981" label="Final location" />}
          {step === 1 && <Callout key="saving" x={565} y={410} align="right" text="Saving final location…" tone="idle" />}
          {step >= 3 && <Callout key="done" x={565} y={410} align="right" text="Journey completed" tone="done" icon="check" />}
        </AnimatePresence>
      );
    default:
      return null;
  }
}

/* ─────────────────────────── Offline dots ─────────────────────────── */

function ZoneDot({ f, x, y, frac, synced }: { f: MotionValue<number>; x: number; y: number; frac: number; synced: boolean }) {
  const opacity = useTransform(f, (v) => (v >= frac ? 1 : 0));
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={6}
      style={{ opacity, transition: "fill 0.5s, stroke 0.5s" }}
      fill={synced ? "#2563eb" : "#fffbeb"}
      stroke={synced ? "#ffffff" : "#f59e0b"}
      strokeWidth={2.5}
    />
  );
}

/* ─────────────────────────────── Tile ─────────────────────────────── */

function useIsCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return compact;
}

interface MapTileProps {
  stage: number;
  progress: MotionValue<number>;
  step: number;
  tone: StatusTone;
  synced: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export function MapTile({ stage, progress, step, tone, synced, isFirst, isLast }: MapTileProps) {
  const cfg = STAGES[stage];
  const fullPath = `${cfg.enterPath} ${cfg.exitPath}`.trim();

  const pathRef = useRef<SVGPathElement>(null);
  const enterRef = useRef<SVGPathElement>(null);
  const scooterRef = useRef<SVGGElement>(null);
  const labelRef = useRef<SVGGElement>(null);
  const geo = useRef({ len: 1, fs: 0 });
  const [zone, setZone] = useState<{ from: number; to: number; dots: { frac: number; x: number; y: number }[] } | null>(null);

  // Scroll progress of this tile → position along the road (0..1).
  const f = useTransform(progress, (p) => {
    const { fs } = geo.current;
    if (cfg.hasEnter && p < 0.45) return p <= 0.3 ? 0 : (fs * (p - 0.3)) / 0.15;
    if (cfg.hasExit && p > 0.6) return p >= 0.8 ? 1 : fs + ((1 - fs) * (p - 0.6)) / 0.2;
    return fs;
  });

  // Only one scooter is visible at a time across the stacked tiles.
  const scooterOpacity = useTransform(progress, (p) => {
    let o = 1;
    if (cfg.hasEnter && p < 0.3) o = 0;
    if (cfg.hasExit && p > 0.8) o = 0;
    if (!cfg.hasEnter && !isFirst) o *= Math.min(1, Math.max(0, (p - 0.32) / 0.08));
    if (!cfg.hasExit && !isLast) o *= 1 - Math.min(1, Math.max(0, (p - 0.6) / 0.08));
    return o;
  });

  const place = (v: number) => {
    const path = pathRef.current;
    if (!path) return;
    const { len } = geo.current;
    const at = Math.max(0, Math.min(len, v * len));
    const pt = path.getPointAtLength(at);
    const a = at + 2 <= len ? path.getPointAtLength(at + 2) : pt;
    const b = at + 2 <= len ? pt : path.getPointAtLength(Math.max(0, at - 2));
    const angle = len < 1 ? 90 : (Math.atan2(a.y - b.y, a.x - b.x) * 180) / Math.PI;
    scooterRef.current?.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${angle + 90})`);
    labelRef.current?.setAttribute("transform", `translate(${pt.x} ${pt.y - 48})`);
  };

  useIsoLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const enterLen = enterRef.current?.getTotalLength() ?? 0;
    geo.current = { len: Math.max(len, 0.0001), fs: len > 0 ? enterLen / len : 0 };

    if (stage === 3) {
      const inside: number[] = [];
      for (let i = 0; i <= 200; i++) {
        const pt = path.getPointAtLength((len * i) / 200);
        if (Math.hypot(pt.x - ZONE.cx, pt.y - ZONE.cy) <= ZONE.r) inside.push(i / 200);
      }
      const from = inside[0] ?? 0;
      const to = inside[inside.length - 1] ?? 0;
      const dots = Array.from({ length: 8 }, (_, i) => {
        const frac = from + ((to - from) * (i + 0.5)) / 8;
        const pt = path.getPointAtLength(len * frac);
        return { frac, x: pt.x, y: pt.y };
      });
      setZone({ from, to, dots });
    }
    place(f.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullPath]);

  useMotionValueEvent(f, "change", place);

  const off = offBike(stage, step);
  const compact = useIsCompact();
  // Hide the zero-length trail (round caps would otherwise draw a dot).
  const trailOpacity = useTransform(f, (v) => (v > 0.002 ? 1 : 0));

  return (
    <svg viewBox={`${compact ? -70 : 0} 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" role="img" aria-label={`Map view, stage ${stage + 1}`}>
      {stage === 3 && (
        <defs>
          <clipPath id="tm-zone-clip">
            <circle cx={ZONE.cx} cy={ZONE.cy} r={ZONE.r} />
          </clipPath>
        </defs>
      )}
      <rect x={-200} width={VB_W + 400} height={VB_H} fill="#e2e8f0" />
      <CityBlocks seed={stage + 1} />
      <StageBackground stage={stage} />

      {/* Main road */}
      <path d={fullPath} stroke="#cbd5e1" strokeWidth={46} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path ref={pathRef} d={fullPath} stroke="#ffffff" strokeWidth={38} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={fullPath} stroke="#e2e8f0" strokeWidth={2} strokeDasharray="14 14" fill="none" />
      <path ref={enterRef} d={cfg.enterPath} fill="none" stroke="none" />

      {/* Travelled route */}
      <motion.path d={fullPath} stroke="#93c5fd" strokeOpacity={0.45} strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: f, opacity: trailOpacity }} />
      <motion.path d={fullPath} stroke="#2563eb" strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: f, opacity: trailOpacity }} />
      {zone && (
        <motion.g clipPath="url(#tm-zone-clip)" animate={{ opacity: synced ? 0 : 1 }} transition={{ duration: 0.6 }}>
          <motion.path d={fullPath} stroke="#f59e0b" strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: f }} />
        </motion.g>
      )}
      {zone?.dots.map((d) => <ZoneDot key={d.frac} f={f} x={d.x} y={d.y} frac={d.frac} synced={synced} />)}

      {isFirst && <circle cx={420} cy={330} r={9} fill="#fff" stroke="#2563eb" strokeWidth={4} />}

      <StageOverlay stage={stage} step={step} synced={synced} />

      {/* Scooter + rider, placed along the road by scroll */}
      <motion.g style={{ opacity: scooterOpacity }}>
        <g ref={scooterRef}>
          {!off && tone !== "idle" && <circle className="gj-ping" cx={0} cy={0} r={26} fill={TONE_HEX[tone]} opacity={0.3} />}
          <g transform="scale(1.25)">
            <TopScooter rider={!off} />
          </g>
        </g>
        <g ref={labelRef} opacity={off ? 0 : 1} style={{ transition: "opacity 0.3s" }}>
          <rect x={-40} y={-16} width={80} height={28} rx={14} fill="#0f172a" />
          <circle cx={-24} cy={-2} r={4.5} fill={TONE_HEX[tone]} />
          <text x={-14} y={3} fontSize={12.5} fontWeight={700} fill="#fff">
            Rahul
          </text>
        </g>
      </motion.g>

      {/* Rahul off the scooter (on break, inside the visit, etc.) */}
      <AnimatePresence>
        {off && (
          <motion.g
            key="avatar"
            initial={{ opacity: 0, x: off.x, y: off.y }}
            animate={{ opacity: 1, x: off.x, y: off.y }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Avatar tone={tone} />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
