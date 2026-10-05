"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionValue, useTransform } from "framer-motion";
import { CheckCircle2, Clock, MapPin, Signal, SignalZero } from "lucide-react";
import { RidingFigure, Scooter, SittingFigure, StandingFigure } from "./Figures";
import { PhoneHud } from "./PhoneHud";
import {
  BIKE_X,
  Beat,
  D_BREAK,
  D_VISIT,
  FIG_SCALE,
  GROUND_Y,
  OFFLINE_FROM,
  OFFLINE_TO,
  StatusTone,
  beatIndex,
} from "./timeline";

const VB_W = 800;
const VB_H = 640;
const FAR_BASE = 470; // far sidewalk / building base line
const ROAD_TOP = 480;
const ROAD_BOTTOM = 598;
const CRUMB_Y = 548;

// World positions (distance units) of landmarks.
const OFFICE_X = -150;
const STALL_X = 975;
const BENCH_WX = D_BREAK + (482 - BIKE_X);
const VISIT_X = 2960;
const DOOR_WX = D_VISIT + (446 - BIKE_X);

// Deterministic pseudo-random so server and client render identically.
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export const TONE_STYLES: Record<StatusTone, { dot: string; chip: string }> = {
  idle: { dot: "bg-slate-400", chip: "bg-white/90 text-slate-700 border-slate-200" },
  active: { dot: "bg-emerald-500", chip: "bg-white/90 text-emerald-700 border-emerald-200" },
  break: { dot: "bg-amber-500", chip: "bg-white/90 text-amber-700 border-amber-200" },
  offline: { dot: "bg-rose-500", chip: "bg-white/90 text-rose-700 border-rose-200" },
  sync: { dot: "bg-brand-500", chip: "bg-white/90 text-brand-700 border-brand-200" },
  visit: { dot: "bg-purple-500", chip: "bg-white/90 text-purple-700 border-purple-200" },
  done: { dot: "bg-emerald-500", chip: "bg-white/90 text-emerald-700 border-emerald-200" },
};

/* ───────────────────────── Static world layers ───────────────────────── */

const Skyline = memo(function Skyline() {
  const buildings = [];
  for (let i = 0, x = -220; x < 2100; i++) {
    const w = 38 + rand(i) * 40;
    const h = 70 + rand(i + 100) * 150;
    const shade = rand(i + 200) > 0.5 ? "#c7d2fe" : "#bfdbfe";
    buildings.push(
      <g key={i} opacity={0.75}>
        <rect x={x} y={FAR_BASE - 8 - h} width={w} height={h} rx={3} fill={shade} />
        {h > 120 &&
          Array.from({ length: Math.floor(h / 26) }).map((_, r) => (
            <rect key={r} x={x + 7} y={FAR_BASE - h + r * 26} width={w - 14} height={6} rx={2} fill="#e0e7ff" opacity={0.8} />
          ))}
      </g>
    );
    x += w + 6 + rand(i + 300) * 14;
  }
  return <g>{buildings}</g>;
});

function Tree({ x }: { x: number }) {
  return (
    <g>
      <rect x={x - 3} y={FAR_BASE - 34} width={6} height={34} rx={2} fill="#78716c" />
      <circle cx={x} cy={FAR_BASE - 52} r={22} fill="#4ade80" />
      <circle cx={x - 12} cy={FAR_BASE - 42} r={14} fill="#22c55e" />
      <circle cx={x + 12} cy={FAR_BASE - 44} r={15} fill="#16a34a" opacity={0.85} />
    </g>
  );
}

function Lamp({ x }: { x: number }) {
  return (
    <g>
      <rect x={x - 2} y={FAR_BASE - 96} width={4} height={96} rx={2} fill="#64748b" />
      <path d={`M${x},${FAR_BASE - 94} q0,-8 14,-8`} stroke="#64748b" strokeWidth={4} fill="none" />
      <rect x={x + 10} y={FAR_BASE - 104} width={14} height={5} rx={2.5} fill="#475569" />
    </g>
  );
}

function Office() {
  const x = OFFICE_X;
  return (
    <g>
      <rect x={x} y={FAR_BASE - 170} width={230} height={170} rx={6} fill="#e2e8f0" />
      <rect x={x} y={FAR_BASE - 170} width={230} height={14} rx={6} fill="#cbd5e1" />
      {Array.from({ length: 3 }).map((_, r) =>
        Array.from({ length: 5 }).map((__, c) => (
          <rect key={`${r}-${c}`} x={x + 16 + c * 42} y={FAR_BASE - 146 + r * 34} width={32} height={22} rx={3} fill="#93c5fd" opacity={0.7} />
        ))
      )}
      <rect x={x + 92} y={FAR_BASE - 44} width={46} height={44} rx={3} fill="#1e3a8a" opacity={0.85} />
      <rect x={x + 62} y={FAR_BASE - 64} width={106} height={16} rx={4} fill="#1d4ed8" />
      <text x={x + 115} y={FAR_BASE - 53} textAnchor="middle" fontSize={9} fontWeight={700} fill="#fff" letterSpacing={1}>
        FIELD OFFICE
      </text>
    </g>
  );
}

function ChaiStall() {
  const x = STALL_X;
  return (
    <g>
      <rect x={x} y={FAR_BASE - 92} width={150} height={92} rx={4} fill="#fef3c7" />
      <rect x={x + 10} y={FAR_BASE - 50} width={130} height={50} fill="#fde68a" />
      <rect x={x + 10} y={FAR_BASE - 54} width={130} height={6} fill="#b45309" />
      {/* Striped awning */}
      {Array.from({ length: 8 }).map((_, i) => (
        <path
          key={i}
          d={`M${x - 8 + i * 20.75},${FAR_BASE - 112} h20.75 v18 q-10.4,10 -20.75,0 Z`}
          fill={i % 2 ? "#fff7ed" : "#f97316"}
        />
      ))}
      <rect x={x + 30} y={FAR_BASE - 138} width={90} height={22} rx={5} fill="#7c2d12" />
      <text x={x + 75} y={FAR_BASE - 123} textAnchor="middle" fontSize={10} fontWeight={700} fill="#fff7ed" letterSpacing={0.8}>
        CHAI POINT
      </text>
      {/* Kettle + cups */}
      <ellipse cx={x + 40} cy={FAR_BASE - 62} rx={10} ry={8} fill="#94a3b8" />
      <rect x={x + 70} y={FAR_BASE - 64} width={6} height={9} rx={1} fill="#fff" />
      <rect x={x + 82} y={FAR_BASE - 64} width={6} height={9} rx={1} fill="#fff" />
    </g>
  );
}

function Bench() {
  const x = BENCH_WX;
  const s = FIG_SCALE;
  return (
    <g transform={`translate(${x} ${GROUND_Y}) scale(${s})`}>
      <ellipse cx={8} cy={0} rx={38} ry={3.5} fill="#0f172a" opacity={0.14} />
      <rect x={-26} y={-30} width={68} height={6} rx={2} fill="#92400e" />
      <rect x={-26} y={-52} width={6} height={28} rx={2} fill="#78350f" />
      <rect x={-26} y={-50} width={4} height={18} rx={1} fill="#a16207" />
      <rect x={-20} y={-24} width={4} height={24} fill="#57534e" />
      <rect x={34} y={-24} width={4} height={24} fill="#57534e" />
    </g>
  );
}

function VisitBuilding() {
  const x = VISIT_X;
  return (
    <g>
      <rect x={x} y={FAR_BASE - 190} width={260} height={190} rx={6} fill="#ede9fe" />
      <rect x={x} y={FAR_BASE - 190} width={260} height={16} rx={6} fill="#ddd6fe" />
      {Array.from({ length: 3 }).map((_, r) =>
        Array.from({ length: 6 }).map((__, c) => (
          <rect key={`${r}-${c}`} x={x + 14 + c * 40} y={FAR_BASE - 162 + r * 32} width={30} height={20} rx={3} fill="#c4b5fd" opacity={0.75} />
        ))
      )}
      <rect x={x + 30} y={FAR_BASE - 70} width={200} height={20} rx={4} fill="#6d28d9" />
      <text x={x + 130} y={FAR_BASE - 56} textAnchor="middle" fontSize={10} fontWeight={700} fill="#fff" letterSpacing={0.8}>
        METRO PHARMA DISTRIBUTORS
      </text>
      <rect x={DOOR_WX - 18} y={FAR_BASE - 44} width={36} height={44} rx={3} fill="#4c1d95" opacity={0.85} />
      <rect x={DOOR_WX - 1} y={FAR_BASE - 44} width={2} height={44} fill="#a78bfa" />
    </g>
  );
}

const Roadside = memo(function Roadside() {
  const items = [];
  const busy: [number, number][] = [
    [OFFICE_X - 30, OFFICE_X + 250],
    [STALL_X - 30, STALL_X + 170],
    [VISIT_X - 30, VISIT_X + 280],
  ];
  for (let i = 0, x = -520; x < 3800; i++, x += 120) {
    const jitter = (rand(i + 500) - 0.5) * 30;
    const px = x + jitter;
    if (busy.some(([a, b]) => px > a && px < b)) continue;
    items.push(i % 3 === 0 ? <Lamp key={i} x={px} /> : <Tree key={i} x={px} />);
  }
  return <g>{items}</g>;
});

const Breadcrumbs = memo(function Breadcrumbs({ synced }: { synced: boolean }) {
  const dots = [];
  for (let x = 30; x <= D_VISIT; x += 42) {
    const offline = x >= OFFLINE_FROM && x <= OFFLINE_TO;
    const pending = offline && !synced;
    dots.push(
      <circle
        key={x}
        cx={x}
        cy={CRUMB_Y}
        r={pending ? 3.6 : 3.4}
        fill={pending ? "#fffbeb" : "#3b82f6"}
        stroke={pending ? "#f59e0b" : "#ffffff"}
        strokeWidth={1.6}
        style={{ transition: "fill 0.5s, stroke 0.5s" }}
      />
    );
  }
  return (
    <g>
      <line x1={0} y1={CRUMB_Y} x2={D_VISIT} y2={CRUMB_Y} stroke="#60a5fa" strokeWidth={2} strokeDasharray="2 6" opacity={0.55} />
      {dots}
    </g>
  );
});

/* ───────────────────────────── Overlays ───────────────────────────── */

const MAP_PATH = "M14,96 C46,98 52,58 88,62 S128,90 150,64 S176,24 210,22";

function MiniMap({ fraction, synced, offlineActive }: { fraction: MotionValue<number>; synced: boolean; offlineActive: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [marks, setMarks] = useState<{ x: number; y: number }[]>([]);
  const offset = useTransform(fraction, (f) => `${Math.min(100, f * 100)}%`);
  const offStart = OFFLINE_FROM / D_VISIT;
  const offLen = useTransform(fraction, (f) => Math.max(0, Math.min(f, OFFLINE_TO / D_VISIT) - offStart));

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    setMarks([0, D_BREAK / D_VISIT, 1].map((f) => el.getPointAtLength(len * f)));
  }, []);

  const markColors = ["#2563eb", "#f59e0b", "#8b5cf6"];

  return (
    <div className="rounded-2xl border border-white/70 bg-white/85 p-2.5 shadow-card-hover backdrop-blur">
      <div className="mb-1 flex items-center justify-between px-0.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Live route</span>
        <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500">
          <MapPin className="h-3 w-3 text-brand-600" /> GPS
        </span>
      </div>
      <div className="relative h-[110px] w-[224px] overflow-hidden rounded-xl bg-slate-50">
        <div className="absolute inset-0 bg-grid-subtle" />
        <svg viewBox="0 0 224 110" className="absolute inset-0 h-full w-full">
          <path d="M0,40 H224 M0,80 H224 M60,0 V110 M140,0 V110" stroke="#e2e8f0" strokeWidth={6} />
          <path ref={pathRef} d={MAP_PATH} stroke="#cbd5e1" strokeWidth={5} fill="none" strokeLinecap="round" />
          <motion.path d={MAP_PATH} stroke="#2563eb" strokeWidth={3.5} fill="none" strokeLinecap="round" style={{ pathLength: fraction }} />
          {(offlineActive || !synced) && (
            <motion.path
              d={MAP_PATH}
              stroke="#f59e0b"
              strokeWidth={3.5}
              fill="none"
              style={{ pathLength: offLen, pathOffset: offStart }}
              opacity={synced ? 0 : 1}
            />
          )}
          {marks.map((m, i) => (
            <circle key={i} cx={m.x} cy={m.y} r={4.5} fill="#fff" stroke={markColors[i]} strokeWidth={2.5} />
          ))}
        </svg>
        <motion.div
          className="absolute left-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-brand-600 shadow-glow-blue"
          style={{
            offsetPath: `path('${MAP_PATH.replace(/,/g, " ")}')`,
            offsetDistance: offset,
            offsetRotate: "0deg",
            // offset-path uses the SVG's coordinate space; the container is drawn 1:1.
          }}
        />
      </div>
    </div>
  );
}

function Bubble({ x, y, text }: { x: number; y: number; text: string }) {
  const w = text.length * 6.4 + 22;
  return (
    <motion.g
      initial={{ opacity: 0, y: 6, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.25 }}
      style={{ transformBox: "fill-box", transformOrigin: "bottom left" }}
    >
      <rect x={x} y={y - 30} width={w} height={26} rx={13} fill="#ffffff" stroke="#e2e8f0" filter="url(#gj-soft)" />
      <path d={`M${x + 14},${y - 5} l-6,9 l12,-9 Z`} fill="#ffffff" />
      <text x={x + w / 2} y={y - 13} textAnchor="middle" fontSize={11.5} fontWeight={600} fill="#0f172a">
        {text}
      </text>
    </motion.g>
  );
}

function MapPinMarker({ x, y, color, label }: { x: number; y: number; color: string; label: string }) {
  const w = label.length * 6 + 24;
  return (
    <motion.g
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 16 }}
    >
      <circle className="gj-ping" cx={x} cy={y + 2} r={10} fill={color} opacity={0.35} />
      <path d={`M${x},${y} c-14,-16 -14,-36 0,-36 c14,0 14,20 0,36 Z`} fill={color} stroke="#fff" strokeWidth={2} />
      <circle cx={x} cy={y - 23} r={5} fill="#fff" />
      <rect x={x - w / 2} y={y - 66} width={w} height={22} rx={11} fill="#ffffff" filter="url(#gj-soft)" />
      <text x={x} y={y - 51} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="#0f172a">
        {label}
      </text>
    </motion.g>
  );
}

/* ─────────────────────────────── Scene ─────────────────────────────── */

interface JourneySceneProps {
  progress: MotionValue<number>;
  distance: MotionValue<number>;
  beat: Beat;
  moving: boolean;
  clock: string;
  km: number;
  storedPoints: number;
  compact: boolean;
}

export function JourneyScene({ progress, distance, beat, moving, clock, km, storedPoints, compact }: JourneySceneProps) {
  const idx = beatIndex(beat.key);
  const after = (key: string) => idx >= beatIndex(key);
  const between = (a: string, b: string) => after(a) && !after(b);

  const worldX = useTransform(distance, (d) => BIKE_X - d);
  const skylineX = useTransform(distance, (d) => -d * 0.32);
  const cloudX = useTransform(distance, (d) => -d * 0.08);
  const dashX = useTransform(distance, (d) => -(d % 64));
  const fgX = useTransform(distance, (d) => -((d * 1.25) % 220));
  const wheelRotate = useTransform(distance, (d) => d * 2.4);
  const routeFraction = useTransform(distance, (d) => d / D_VISIT);

  // Daylight: morning → noon → golden hour.
  const skyTop = useTransform(progress, [0, 0.45, 0.8, 1], ["#bfdbfe", "#93c5fd", "#a5b4fc", "#fdba74"]);
  const skyBottom = useTransform(progress, [0, 0.45, 0.8, 1], ["#eff6ff", "#e0f2fe", "#ede9fe", "#fde68a"]);
  const sunX = useTransform(progress, [0, 1], [120, 700]);
  const sunY = useTransform(progress, [0, 0.5, 1], [190, 90, 230]);
  const sunColor = useTransform(progress, [0, 0.7, 1], ["#fde68a", "#fef3c7", "#fb923c"]);

  const synced = after("synced");
  const offlineActive = between("netLost", "synced");
  const riding = beat.pose === "ride";

  const viewBox = compact ? "70 150 600 490" : `0 0 ${VB_W} ${VB_H}`;

  // Bubble anchor depends on where the rider is.
  const bubbleAnchor = riding
    ? { x: BIKE_X + 6, y: GROUND_Y - 190 }
    : beat.pose === "sit"
      ? { x: beat.riderX + 14, y: GROUND_Y - 168 }
      : { x: beat.riderX + 14, y: GROUND_Y - 198 };

  const tone = TONE_STYLES[beat.status.tone];

  return (
    <motion.div className="relative h-full w-full overflow-hidden" style={{ background: skyBottom }}>
      <svg viewBox={viewBox} preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full" role="img" aria-label={`Field employee journey: ${beat.status.label}`}>
        <defs>
          <motion.linearGradient id="gj-sky" x1="0" y1="0" x2="0" y2="1">
            <motion.stop offset="0%" style={{ stopColor: skyTop }} />
            <motion.stop offset="100%" style={{ stopColor: skyBottom }} />
          </motion.linearGradient>
          <linearGradient id="gj-road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <filter id="gj-soft" x="-20%" y="-30%" width="140%" height="180%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.14" />
          </filter>
          <clipPath id="gj-behind">
            <rect x={-200} y={0} width={BIKE_X - 70 + 200} height={VB_H} />
          </clipPath>
        </defs>

        {/* Sky + sun */}
        <rect x={-200} y={0} width={VB_W + 400} height={VB_H} fill="url(#gj-sky)" />
        <motion.circle cx={sunX} cy={sunY} r={34} style={{ fill: sunColor }} opacity={0.9} />
        <motion.circle cx={sunX} cy={sunY} r={58} style={{ fill: sunColor }} opacity={0.25} />

        {/* Clouds */}
        <motion.g style={{ x: cloudX }} opacity={0.9}>
          {[60, 330, 610, 880, 1150].map((cx, i) => (
            <g key={cx} transform={`translate(${cx} ${70 + (i % 2) * 50})`}>
              <ellipse cx={0} cy={0} rx={46} ry={14} fill="#fff" />
              <ellipse cx={-14} cy={-10} rx={22} ry={14} fill="#fff" />
              <ellipse cx={14} cy={-12} rx={18} ry={12} fill="#fff" />
            </g>
          ))}
        </motion.g>

        {/* Distant skyline (parallax) */}
        <motion.g style={{ x: skylineX }}>
          <Skyline />
        </motion.g>

        {/* Far sidewalk */}
        <rect x={-200} y={FAR_BASE - 8} width={VB_W + 400} height={ROAD_TOP - FAR_BASE + 8} fill="#e2e8f0" />
        <rect x={-200} y={ROAD_TOP - 3} width={VB_W + 400} height={3} fill="#cbd5e1" />

        {/* Road */}
        <rect x={-200} y={ROAD_TOP} width={VB_W + 400} height={ROAD_BOTTOM - ROAD_TOP} fill="url(#gj-road)" />
        <motion.g style={{ x: dashX }}>
          {Array.from({ length: 22 }).map((_, i) => (
            <rect key={i} x={-200 + i * 64} y={520} width={34} height={4} rx={2} fill="#f8fafc" opacity={0.75} />
          ))}
        </motion.g>
        <rect x={-200} y={ROAD_BOTTOM} width={VB_W + 400} height={6} fill="#cbd5e1" />
        <rect x={-200} y={ROAD_BOTTOM + 6} width={VB_W + 400} height={VB_H - ROAD_BOTTOM} fill="#86efac" />

        {/* World layer: everything placed by distance */}
        <motion.g style={{ x: worldX }}>
          <Roadside />
          <Office />
          <ChaiStall />
          <VisitBuilding />
          {/* Pull-over bays */}
          <rect x={D_BREAK - 150} y={GROUND_Y - 22} width={360} height={30} rx={15} fill="#64748b" opacity={0.35} />
          <rect x={D_VISIT - 150} y={GROUND_Y - 22} width={330} height={30} rx={15} fill="#64748b" opacity={0.35} />
          <Bench />

          <AnimatePresence>
            {between("started", "mount") && (
              <MapPinMarker key="start-pin" x={-120} y={GROUND_Y - 200} color="#2563eb" label="Current location" />
            )}
            {after("destAppear") && !after("review") && (
              <MapPinMarker
                key="visit-pin"
                x={DOOR_WX}
                y={FAR_BASE - 200}
                color="#8b5cf6"
                label={after("visitDone") ? "✓ Visit Completed" : after("checkedIn") ? "✓ Checked In" : "Visit Location"}
              />
            )}
            {after("finalLoc") && (
              <MapPinMarker key="final-pin" x={D_VISIT} y={GROUND_Y - 172} color="#10b981" label="Final location" />
            )}
          </AnimatePresence>
        </motion.g>

        {/* GPS breadcrumbs — only the part already travelled (behind the scooter) */}
        <g clipPath="url(#gj-behind)">
          <motion.g style={{ x: worldX }}>
            <Breadcrumbs synced={synced} />
          </motion.g>
        </g>

        {/* GPS signal rings while initialising */}
        {between("gps", "helmet") && (
          <g>
            {[0, 0.6, 1.2].map((delay) => (
              <circle
                key={delay}
                className="gj-ring"
                cx={beat.riderX}
                cy={GROUND_Y - 110}
                r={60}
                fill="none"
                stroke="#3b82f6"
                strokeWidth={2}
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </g>
        )}

        {/* Speed lines */}
        {moving && (
          <g opacity={0.6}>
            {[0, 1, 2].map((i) => (
              <rect key={i} className="gj-speed" x={BIKE_X - 170 - i * 24} y={GROUND_Y - 110 + i * 26} width={46} height={2.5} rx={1.25} fill="#ffffff" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </g>
        )}

        {/* Scooter (+ rider when riding) */}
        <g transform={`translate(${BIKE_X} ${GROUND_Y})`}>
          <g className={moving ? "gj-bob" : undefined}>
            <g transform={`scale(${FIG_SCALE})`}>
              <Scooter wheelRotate={wheelRotate} beacon={beat.beacon} />
              <AnimatePresence>
                {riding && (
                  <motion.g key="rider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                    <RidingFigure mood={beat.mood} />
                  </motion.g>
                )}
              </AnimatePresence>
            </g>
          </g>
        </g>

        {/* Rider off the bike */}
        <AnimatePresence>
          {!riding && (
            <motion.g
              key="walker"
              initial={{ opacity: 0, x: beat.riderX }}
              animate={{ opacity: 1, x: beat.riderX }}
              exit={{ opacity: 0 }}
              transition={{ x: { duration: 0.9, ease: "easeInOut" }, opacity: { duration: 0.25 } }}
            >
              <g transform={`translate(0 ${GROUND_Y}) scale(${FIG_SCALE})`}>
                <AnimatePresence mode="popLayout">
                  <motion.g
                    key={`${beat.pose}-${beat.arm}-${beat.helmet}-${beat.mood}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {beat.pose === "sit" ? (
                      <SittingFigure arm={beat.arm} helmet={beat.helmet} mood={beat.mood} />
                    ) : (
                      <StandingFigure arm={beat.arm} helmet={beat.helmet} mood={beat.mood} stretch={beat.pose === "stretch"} />
                    )}
                  </motion.g>
                </AnimatePresence>
              </g>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Near verge (faster parallax for depth) */}
        <motion.g style={{ x: fgX }}>
          {Array.from({ length: 7 }).map((_, i) => (
            <g key={i} transform={`translate(${-200 + i * 220} ${ROAD_BOTTOM + 30})`}>
              <ellipse cx={0} cy={0} rx={30} ry={11} fill="#4ade80" />
              <ellipse cx={20} cy={-4} rx={18} ry={9} fill="#22c55e" />
            </g>
          ))}
        </motion.g>

        {/* Thought / status bubble */}
        <AnimatePresence>
          {beat.bubble && <Bubble key={beat.bubble} x={bubbleAnchor.x} y={bubbleAnchor.y} text={beat.bubble} />}
        </AnimatePresence>
      </svg>

      {/* ─── HUD overlays ─── */}
      <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-2 sm:left-5 sm:top-5">
        <div className="flex flex-wrap items-center gap-1.5">
          <motion.span
            key={beat.status.label}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold shadow-sm backdrop-blur ${tone.chip}`}
          >
            {beat.status.tone === "done" ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              <span className="relative flex h-2 w-2">
                {beat.status.tone !== "idle" && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${tone.dot}`} />}
                <span className={`relative inline-flex h-2 w-2 rounded-full ${tone.dot}`} />
              </span>
            )}
            {beat.status.label}
          </motion.span>
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold shadow-sm backdrop-blur transition-colors ${
              beat.network ? "border-slate-200 bg-white/90 text-slate-600" : "border-rose-200 bg-rose-50/95 text-rose-600"
            }`}
          >
            {beat.network ? <Signal className="h-3 w-3" /> : <SignalZero className="h-3 w-3" />}
            <span className={beat.network ? "" : "hidden sm:inline"}>{beat.network ? "4G" : "No network"}</span>
          </span>
          <span className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-600 shadow-sm sm:inline-flex">
            <Clock className="h-3 w-3" /> {clock}
          </span>
        </div>
        {!compact && <MiniMap fraction={routeFraction} synced={synced} offlineActive={offlineActive} />}
      </div>

      <PhoneHud
        screen={beat.phone}
        clock={clock}
        km={km}
        network={beat.network}
        storedPoints={storedPoints}
        className={
          compact
            ? "pointer-events-none absolute right-3 top-3 h-[330px] w-[176px] origin-top-right scale-[0.58]"
            : "pointer-events-none absolute right-5 top-5 h-[330px] w-[176px] xl:h-[372px] xl:w-[196px]"
        }
      />
    </motion.div>
  );
}
