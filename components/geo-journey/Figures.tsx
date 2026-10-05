"use client";

import React, { useRef } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import type { Arm, Beacon, Mood } from "./timeline";

// Palette — kept identical across every scene so the character stays consistent.
const C = {
  skin: "#b9805a",
  skinShade: "#a06d4a",
  hair: "#1f2430",
  jacket: "#2563eb",
  jacketShade: "#1d4ed8",
  trousers: "#1e293b",
  trousersBack: "#0f172a",
  shoe: "#0b1120",
  pack: "#334155",
  helmet: "#f8fafc",
  helmetStripe: "#2563eb",
  visor: "#0f172a",
  scooter: "#1d4ed8",
  scooterLight: "#3b82f6",
  scooterDark: "#1e3a8a",
  tyre: "#0f172a",
  rim: "#64748b",
};

const BEACON_COLORS: Record<Beacon, string> = {
  off: "#94a3b8",
  active: "#10b981",
  break: "#f59e0b",
  offline: "#f43f5e",
};

function Helmet({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path
        d={`M${x - 12.5},${y + 3} C${x - 13},${y - 15} ${x + 12},${y - 16} ${x + 13.5},${y + 1} L${x + 13.5},${y + 5} L${x - 12.5},${y + 5} Z`}
        fill={C.helmet}
        stroke="#cbd5e1"
        strokeWidth={0.8}
      />
      <path
        d={`M${x - 9},${y - 9} C${x - 3},${y - 14} ${x + 6},${y - 14} ${x + 10},${y - 8}`}
        stroke={C.helmetStripe}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M${x + 3},${y - 4} L${x + 14},${y - 3} L${x + 14},${y + 4} L${x + 4},${y + 4} Z`}
        fill={C.visor}
        opacity={0.88}
      />
      <path d={`M${x + 6},${y - 2} L${x + 11},${y - 1.5}`} stroke="#93c5fd" strokeWidth={1} opacity={0.7} />
    </g>
  );
}

function Head({ x, y, helmet, mood }: { x: number; y: number; helmet: boolean; mood: Mood }) {
  return (
    <g>
      <rect x={x - 3.5} y={y + 7} width={7} height={8} rx={2} fill={C.skinShade} />
      <circle cx={x} cy={y} r={10} fill={C.skin} />
      {!helmet && (
        <path
          d={`M${x - 10},${y + 1} C${x - 12},${y - 13} ${x + 8},${y - 15} ${x + 11},${y - 4} C${x + 6},${y - 8} ${x - 1},${y - 8} ${x - 3},${y - 2} C${x - 4},${y + 2} ${x - 7},${y + 4} ${x - 10},${y + 1} Z`}
          fill={C.hair}
        />
      )}
      <circle cx={x - 2.5} cy={y + 1} r={2.2} fill={C.skinShade} />
      {/* Face (visible under the open visor too) */}
      <circle cx={x + 6} cy={y + 0.5} r={1.15} fill="#111827" />
      {mood === "concerned" && (
        <path d={`M${x + 3.5},${y - 4} L${x + 8.5},${y - 2.5}`} stroke="#111827" strokeWidth={1.1} strokeLinecap="round" />
      )}
      {mood === "happy" ? (
        <path d={`M${x + 4},${y + 5} Q${x + 7},${y + 7.5} ${x + 9.5},${y + 4.5}`} stroke="#5b3523" strokeWidth={1.2} fill="none" strokeLinecap="round" />
      ) : mood === "concerned" ? (
        <path d={`M${x + 4.5},${y + 6.5} Q${x + 7},${y + 4.5} ${x + 9.5},${y + 6.5}`} stroke="#5b3523" strokeWidth={1.2} fill="none" strokeLinecap="round" />
      ) : (
        <path d={`M${x + 5},${y + 5.5} L${x + 9},${y + 5.5}`} stroke="#5b3523" strokeWidth={1.2} strokeLinecap="round" />
      )}
      {helmet && <Helmet x={x} y={y - 1} />}
    </g>
  );
}

function Limb({ points, color, width }: { points: [number, number][]; color: string; width: number }) {
  const d = points.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
  return <path d={d} stroke={color} strokeWidth={width} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
}

function Phone({ x, y, rotate = 0 }: { x: number; y: number; rotate?: number }) {
  return (
    <g transform={`rotate(${rotate} ${x} ${y})`}>
      <rect x={x - 3.8} y={y - 6.5} width={7.6} height={13} rx={1.6} fill="#0f172a" />
      <rect x={x - 2.8} y={y - 5.3} width={5.6} height={10.4} rx={0.8} fill="#60a5fa" />
      <circle cx={x} cy={y - 1} r={6} fill="#60a5fa" opacity={0.18} />
    </g>
  );
}

/** Upper body for standing / sitting poses. `dy` shifts it down when seated. */
function UpperBody({ arm, helmet, mood, dy, stretch }: { arm: Arm; helmet: boolean; mood: Mood; dy: number; stretch?: boolean }) {
  const sh: [number, number] = [5, -86 + dy];
  let armPts: [number, number][];
  let prop: React.ReactNode = null;

  if (stretch) {
    armPts = [sh, [10, -104 + dy], [12, -124 + dy]];
  } else if (arm === "phone") {
    armPts = [sh, [11, -67 + dy], [17, -80 + dy]];
    prop = <Phone x={18} y={-86 + dy} rotate={12} />;
  } else if (arm === "cup") {
    armPts = [sh, [12, -70 + dy], [13, -91 + dy]];
    prop = (
      <g>
        <path d={`M${10},${-99 + dy} L${17},${-99 + dy} L${16},${-89 + dy} L${11},${-89 + dy} Z`} fill="#fff" stroke="#e2e8f0" strokeWidth={0.6} />
        <rect x={10} y={-96 + dy} width={7} height={3} fill="#b45309" opacity={0.75} />
        <path className="gj-steam" d={`M13,${-102 + dy} q-2,-4 0,-7 q2,-3 0,-6`} stroke="#cbd5e1" strokeWidth={1.2} fill="none" strokeLinecap="round" />
      </g>
    );
  } else if (arm === "clipboard") {
    armPts = [sh, [12, -66 + dy], [19, -72 + dy]];
    prop = (
      <g transform={`rotate(-14 22 ${-80 + dy})`}>
        <rect x={15} y={-90 + dy} width={14} height={18} rx={1.5} fill="#92400e" />
        <rect x={16.5} y={-87.5 + dy} width={11} height={14} rx={0.8} fill="#fff" />
        <rect x={19} y={-91.5 + dy} width={6} height={3} rx={1} fill="#64748b" />
        <path d={`M18.5,${-84 + dy} h7 M18.5,${-80.5 + dy} h7 M18.5,${-77 + dy} h5`} stroke="#94a3b8" strokeWidth={1} />
      </g>
    );
  } else if (arm === "helmet") {
    if (helmet) {
      armPts = [sh, [15, -96 + dy], [10, -108 + dy]];
    } else {
      armPts = [sh, [10, -68 + dy], [14, -58 + dy]];
      prop = (
        <g>
          <path d={`M8,${-58 + dy} C8,${-72 + dy} 28,${-72 + dy} 28,${-58 + dy} Z`} fill={C.helmet} stroke="#cbd5e1" strokeWidth={0.8} />
          <path d={`M11,${-64 + dy} C15,${-69 + dy} 22,${-69 + dy} 25,${-64 + dy}`} stroke={C.helmetStripe} strokeWidth={2.4} fill="none" />
        </g>
      );
    }
  } else {
    armPts = [sh, [8, -68 + dy], [9, -54 + dy]];
  }

  return (
    <g>
      {/* Back arm (only visible when stretching) */}
      {stretch && <Limb points={[[-2, -86 + dy], [-6, -104 + dy], [-6, -124 + dy]]} color={C.jacketShade} width={8.5} />}
      {stretch && <circle cx={-6} cy={-126 + dy} r={3.6} fill={C.skinShade} />}
      {/* Backpack */}
      <rect x={-23} y={-90 + dy} width={11} height={33} rx={4.5} fill={C.pack} />
      <rect x={-21} y={-74 + dy} width={7} height={9} rx={2} fill="#475569" />
      {/* Torso */}
      <path d={`M-14,${-50 + dy} L-15,${-82 + dy} C-15,${-96 + dy} 15,${-96 + dy} 15,${-82 + dy} L14,${-50 + dy} Z`} fill={C.jacket} />
      <path d={`M2,${-94 + dy} L2,${-50 + dy}`} stroke={C.jacketShade} strokeWidth={1.2} />
      <rect x={-14} y={-54 + dy} width={28} height={4} fill={C.jacketShade} />
      {/* Lanyard + ID card */}
      <path d={`M-3,${-93 + dy} L5,${-72 + dy} L11,${-92 + dy}`} stroke="#f59e0b" strokeWidth={1.2} fill="none" />
      <rect x={1} y={-73 + dy} width={8} height={10} rx={1.2} fill="#fff" />
      <rect x={2.5} y={-71 + dy} width={5} height={2.5} fill={C.jacket} />
      <Head x={2} y={-106 + dy} helmet={helmet} mood={mood} />
      {/* Front arm */}
      <Limb points={armPts} color={C.jacket} width={9} />
      <circle cx={armPts[2][0]} cy={armPts[2][1]} r={3.8} fill={C.skin} />
      {prop}
    </g>
  );
}

export function StandingFigure({ arm, helmet, mood, stretch }: { arm: Arm; helmet: boolean; mood: Mood; stretch?: boolean }) {
  return (
    <g>
      <ellipse cx={2} cy={0} rx={24} ry={4} fill="#0f172a" opacity={0.16} />
      <Limb points={[[-4, -52], [-5, -26], [-6, -4]]} color={C.trousersBack} width={12} />
      <Limb points={[[5, -52], [6, -26], [7, -4]]} color={C.trousers} width={12} />
      <ellipse cx={-1} cy={-3} rx={9} ry={4} fill={C.shoe} />
      <ellipse cx={11} cy={-3} rx={9} ry={4} fill={C.shoe} />
      <UpperBody arm={arm} helmet={helmet} mood={mood} dy={0} stretch={stretch} />
    </g>
  );
}

export function SittingFigure({ arm, helmet, mood }: { arm: Arm; helmet: boolean; mood: Mood }) {
  return (
    <g>
      <Limb points={[[-6, -31], [16, -31], [18, -4]]} color={C.trousersBack} width={12} />
      <Limb points={[[-2, -30], [22, -30], [24, -4]]} color={C.trousers} width={12} />
      <ellipse cx={22} cy={-3} rx={9} ry={4} fill={C.shoe} />
      <ellipse cx={28} cy={-3} rx={9} ry={4} fill={C.shoe} />
      <UpperBody arm={arm} helmet={helmet} mood={mood} dy={20} />
    </g>
  );
}

function Wheel({ cx, rotate }: { cx: number; rotate: MotionValue<number> }) {
  // Rotation is written straight to the SVG transform attribute: it pivots on
  // the wheel centre regardless of the parent scale.
  const spokesRef = useRef<SVGGElement>(null);
  useMotionValueEvent(rotate, "change", (deg) => {
    spokesRef.current?.setAttribute("transform", `rotate(${deg % 360} ${cx} -16)`);
  });

  return (
    <g>
      <circle cx={cx} cy={-16} r={16} fill={C.tyre} />
      <circle cx={cx} cy={-16} r={10} fill={C.rim} />
      <g ref={spokesRef}>
        {[0, 60, 120].map((a) => (
          <line
            key={a}
            x1={cx + Math.cos((a * Math.PI) / 180) * 9}
            y1={-16 + Math.sin((a * Math.PI) / 180) * 9}
            x2={cx - Math.cos((a * Math.PI) / 180) * 9}
            y2={-16 - Math.sin((a * Math.PI) / 180) * 9}
            stroke="#cbd5e1"
            strokeWidth={1.6}
          />
        ))}
      </g>
      <circle cx={cx} cy={-16} r={3} fill="#e2e8f0" />
    </g>
  );
}

export function Scooter({ wheelRotate, beacon }: { wheelRotate: MotionValue<number>; beacon: Beacon }) {
  const beaconColor = BEACON_COLORS[beacon];
  return (
    <g>
      <ellipse cx={0} cy={0} rx={70} ry={5} fill="#0f172a" opacity={0.2} />
      {/* GPS beacon on the tail */}
      <line x1={-50} y1={-56} x2={-53} y2={-74} stroke="#475569" strokeWidth={1.6} />
      {beacon !== "off" && <circle className="gj-ping" cx={-53} cy={-76} r={4} fill={beaconColor} opacity={0.5} />}
      <circle cx={-53} cy={-76} r={3.2} fill={beaconColor} />
      {/* Rear mudguard */}
      <path d="M-58,-22 C-56,-40 -22,-40 -18,-22" stroke={C.scooterDark} strokeWidth={4} fill="none" />
      <Wheel cx={-38} rotate={wheelRotate} />
      <Wheel cx={40} rotate={wheelRotate} />
      {/* Front fork */}
      <line x1={33} y1={-74} x2={40} y2={-16} stroke="#334155" strokeWidth={4.5} strokeLinecap="round" />
      {/* Rear body */}
      <path d="M-64,-28 C-66,-46 -48,-55 -22,-53 L-4,-48 L-2,-26 C-20,-22 -48,-22 -64,-28 Z" fill={C.scooter} />
      <path d="M-60,-40 C-50,-48 -30,-49 -10,-45" stroke={C.scooterLight} strokeWidth={2.5} fill="none" opacity={0.8} />
      {/* Floorboard */}
      <rect x={-8} y={-31} width={36} height={7} rx={3} fill="#1e293b" />
      {/* Seat */}
      <path d="M-54,-54 C-52,-63 -10,-64 -6,-54 Z" fill="#111827" />
      {/* Front apron */}
      <path d="M22,-25 L31,-25 C42,-46 42,-66 35,-80 L25,-80 C30,-62 28,-42 22,-25 Z" fill={C.scooter} />
      <path d="M27,-76 C31,-62 31,-46 26,-30" stroke={C.scooterLight} strokeWidth={2} fill="none" opacity={0.7} />
      {/* Handlebar */}
      <line x1={30} y1={-79} x2={27} y2={-92} stroke="#1e293b" strokeWidth={4} strokeLinecap="round" />
      <line x1={18} y1={-92} x2={35} y2={-94} stroke="#1e293b" strokeWidth={4} strokeLinecap="round" />
      {/* Phone mount */}
      <rect x={28} y={-104} width={8} height={11} rx={1.5} fill="#0f172a" />
      <rect x={29.2} y={-102.8} width={5.6} height={8.6} rx={0.8} fill={beacon === "off" ? "#334155" : "#60a5fa"} />
      {/* Lights */}
      <ellipse cx={39} cy={-72} rx={4} ry={3} fill="#fde68a" />
      <ellipse cx={-64} cy={-36} rx={3} ry={2.2} fill="#ef4444" />
    </g>
  );
}

export function RidingFigure({ mood }: { mood: Mood }) {
  return (
    <g>
      <Limb points={[[-30, -60], [-2, -60], [4, -32]]} color={C.trousers} width={12} />
      <ellipse cx={9} cy={-30} rx={9} ry={4} fill={C.shoe} />
      {/* Backpack */}
      <g transform="rotate(14 -34 -96)">
        <rect x={-40} y={-112} width={11} height={33} rx={4.5} fill={C.pack} />
      </g>
      {/* Torso leaning forward */}
      <path d="M-38,-56 L-14,-56 L-4,-96 C-6,-110 -26,-112 -30,-102 Z" fill={C.jacket} />
      <path d="M-22,-56 L-12,-100" stroke={C.jacketShade} strokeWidth={1.2} />
      <Head x={-8} y={-114} helmet mood={mood} />
      <Limb points={[[-12, -96], [6, -84], [22, -91]]} color={C.jacket} width={9} />
      <circle cx={22} cy={-91} r={3.8} fill={C.skin} />
    </g>
  );
}
