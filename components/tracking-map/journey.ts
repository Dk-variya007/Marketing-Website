// Single source of truth for the Tracking Map story.
// One continuous road, one scroll value `p` in [0, 1]. Every visual — scooter position,
// chapter, step, timers, counters — is a pure function of `p`, so the story can never be
// left half-played, skipped or cut between chapters, and scrolling back simply rewinds it.

import type { PhoneScreen, StatusTone } from "./types";

export type Pt = { x: number; y: number };
export type Status = { tone: StatusTone; label: string };

/* ───────────────────────────── Road geometry ───────────────────────────── */

const pt = (x: number, y: number): Pt => ({ x, y });
type Cubic = [Pt, Pt, Pt, Pt];

const CURVES: Cubic[] = [
  [pt(600, 420), pt(600, 760), pt(800, 900), pt(800, 1300)], // field office → Chai Point
  [pt(800, 1300), pt(800, 1700), pt(560, 1850), pt(560, 2350)], // → through the dead zone
  [pt(560, 2350), pt(560, 2800), pt(860, 2950), pt(860, 3350)], // → Metro Pharma
  [pt(860, 3350), pt(860, 3560), pt(700, 3600), pt(700, 3820)], // → final stop
];

export const ROUTE_D =
  `M${CURVES[0][0].x},${CURVES[0][0].y} ` +
  CURVES.map((c) => `C${c[1].x},${c[1].y} ${c[2].x},${c[2].y} ${c[3].x},${c[3].y}`).join(" ");

function bezier(c: Cubic, t: number): Pt {
  const u = 1 - t;
  const a = u * u * u, b = 3 * u * u * t, d = 3 * u * t * t, e = t * t * t;
  return { x: a * c[0].x + b * c[1].x + d * c[2].x + e * c[3].x, y: a * c[0].y + b * c[1].y + d * c[2].y + e * c[3].y };
}

// Arc-length lookup table, so distance along the road maps to a point without touching the DOM.
const TABLE: { d: number; x: number; y: number }[] = [{ d: 0, ...CURVES[0][0] }];
const CUM: number[] = [0];
{
  let acc = 0;
  let prev = CURVES[0][0];
  for (const c of CURVES) {
    for (let i = 1; i <= 300; i++) {
      const q = bezier(c, i / 300);
      acc += Math.hypot(q.x - prev.x, q.y - prev.y);
      TABLE.push({ d: acc, x: q.x, y: q.y });
      prev = q;
    }
    CUM.push(acc);
  }
}

export const TOTAL = CUM[CUM.length - 1];

export function pointAt(d: number): Pt {
  const v = Math.max(0, Math.min(TOTAL, d));
  let lo = 0, hi = TABLE.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (TABLE[mid].d <= v) lo = mid;
    else hi = mid;
  }
  const a = TABLE[lo], b = TABLE[hi];
  const t = b.d === a.d ? 0 : (v - a.d) / (b.d - a.d);
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

/** Direction of travel in degrees (0 = east, 90 = south). */
export function headingAt(d: number) {
  const a = pointAt(d - 4), b = pointAt(d + 4);
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
}

/** Sampled road points (for keeping city blocks off the road). */
export const ROUTE_SAMPLES: Pt[] = TABLE.filter((_, i) => i % 8 === 0);

export const STOP = { office: CUM[0], chai: CUM[1], visit: CUM[3], final: CUM[4] };
export const STOP_PT = {
  office: pointAt(STOP.office),
  chai: pointAt(STOP.chai),
  visit: pointAt(STOP.visit),
  final: pointAt(STOP.final),
};

/* ───────────────────────────── Offline zone ───────────────────────────── */

const zc = pointAt((CUM[1] + CUM[2]) / 2);
export const ZONE = { x: Math.round(zc.x), y: Math.round(zc.y), r: 250 };

export const ZONE_IN = TABLE.find((s) => s.d > STOP.chai && Math.hypot(s.x - ZONE.x, s.y - ZONE.y) <= ZONE.r)!.d;
export const ZONE_OUT = [...TABLE].reverse().find((s) => s.d < STOP.visit && Math.hypot(s.x - ZONE.x, s.y - ZONE.y) <= ZONE.r)!.d;
export const OFFLINE_POINTS = 214;

/* ─────────────────────────────── Chapters ─────────────────────────────── */

export interface StepDef {
  label: string;
  phone: PhoneScreen;
  status: Status;
}

export interface Chapter {
  /** State while riding in, before the chapter's first step */
  before: { phone: PhoneScreen; status: Status };
  steps: StepDef[];
  clock: string;
}

const S = {
  idle: { tone: "idle", label: "Ready to start" },
  perm: { tone: "idle", label: "Awaiting location permission" },
  gps: { tone: "sync", label: "Initializing GPS" },
  active: { tone: "active", label: "Tracking Active" },
  arrivedBreak: { tone: "active", label: "Arrived at break spot" },
  break: { tone: "break", label: "Break Mode" },
  breakEnd: { tone: "break", label: "Break ended" },
  noNet: { tone: "offline", label: "No internet connection" },
  offline: { tone: "offline", label: "Offline Tracking Active" },
  syncing: { tone: "sync", label: "Back online · Syncing" },
  synced: { tone: "sync", label: "Data Synced" },
  atVisit: { tone: "visit", label: "At Visit Location" },
  checkedIn: { tone: "visit", label: "Checked In" },
  visitDone: { tone: "done", label: "Visit Completed Successfully" },
  stopping: { tone: "idle", label: "Stopping tracking" },
  finalLoc: { tone: "idle", label: "Final location recorded" },
  complete: { tone: "done", label: "Journey Completed" },
} satisfies Record<string, Status>;

export const CHAPTERS: Chapter[] = [
  {
    before: { phone: "home", status: S.idle },
    steps: [
      { label: "Open the app and tap Start Tracking", phone: "home", status: S.idle },
      { label: "Allow location permission", phone: "permission", status: S.perm },
      { label: "GPS locks the current location", phone: "gps", status: S.gps },
      { label: "Tracking started — ride begins", phone: "started", status: S.active },
    ],
    clock: "9:02 AM",
  },
  {
    before: { phone: "tracking", status: S.active },
    steps: [
      { label: "Arrive and park at Chai Point", phone: "tracking", status: S.arrivedBreak },
      { label: "Start break from the app", phone: "onBreak", status: S.break },
      { label: "Tracking paused · break timer running", phone: "onBreak", status: S.break },
    ],
    clock: "11:05 AM",
  },
  {
    before: { phone: "onBreak", status: S.break },
    steps: [
      { label: "Finish break · 15 min recorded", phone: "onBreak", status: S.breakEnd },
      { label: "Back on the scooter", phone: "onBreak", status: S.breakEnd },
      { label: "Tracking resumed on the same journey", phone: "resumed", status: S.active },
    ],
    clock: "11:20 AM",
  },
  {
    before: { phone: "tracking", status: S.active },
    steps: [
      { label: "Network drops mid-ride", phone: "noNet", status: S.noNet },
      { label: "Offline tracking kicks in", phone: "offline", status: S.offline },
      { label: "Location points saved on device", phone: "offline", status: S.offline },
      { label: "Network back · syncing points", phone: "syncing", status: S.syncing },
      { label: "Data synced — no gaps in route", phone: "synced", status: S.synced },
    ],
    clock: "1:35 PM",
  },
  {
    before: { phone: "tracking", status: S.active },
    steps: [
      { label: "Enter the visit geofence", phone: "arrive", status: S.atVisit },
      { label: "Check in — location verified", phone: "checkedIn", status: S.checkedIn },
      { label: "Complete the visit activity", phone: "visitForm", status: S.checkedIn },
      { label: "Submit · visit completed", phone: "visitDone", status: S.visitDone },
    ],
    clock: "3:20 PM",
  },
  {
    before: { phone: "visitDone", status: S.visitDone },
    steps: [
      { label: "Review the day and tap Stop Tracking", phone: "summary", status: S.active },
      { label: "Final location saved", phone: "stopping", status: S.stopping },
      { label: "Route closed at the final point", phone: "stopping", status: S.finalLoc },
      { label: "Journey completed · summary ready", phone: "complete", status: S.complete },
    ],
    clock: "5:05 PM",
  },
];

export const TOTAL_KM = 18.4;

/* ─────────────────────────────── Timeline ─────────────────────────────── */

type Mark = { d: number; chapter: number; step: number };
type Phase =
  | { kind: "dwell"; w: number; d: number; chapter: number; steps: [number, number] }
  /** `keys` = [phase progress, distance] — the ride's speed profile (starts and ends at rest). */
  | { kind: "move"; w: number; keys: [number, number][]; marks: Mark[] };

const SYNC_AT = ZONE_OUT + 110;
const VISIT_AT = ZONE_OUT + 300;

// `w` = share of the scroll. Each ride is one smooth move (no stutter mid-route); ride-time
// steps (offline → sync) are keyed to where the scooter is on the road, not to the scroll.
const PHASES: Phase[] = [
  { kind: "dwell", w: 1.2, d: STOP.office, chapter: 0, steps: [0, 3] },
  { kind: "move", w: 0.9, keys: [[0, STOP.office], [1, STOP.chai]], marks: [{ d: STOP.office, chapter: 1, step: -1 }] },
  { kind: "dwell", w: 1.1, d: STOP.chai, chapter: 1, steps: [0, 2] },
  { kind: "dwell", w: 1.0, d: STOP.chai, chapter: 2, steps: [0, 2] },
  {
    kind: "move",
    w: 3.2,
    // Slower through the dead zone so the offline → sync story gets room to play.
    keys: [[0, STOP.chai], [0.16, ZONE_IN], [0.55, ZONE_OUT], [0.75, VISIT_AT], [1, STOP.visit]],
    marks: [
      { d: STOP.chai, chapter: 3, step: -1 },
      { d: ZONE_IN, chapter: 3, step: 0 },
      { d: ZONE_IN + (ZONE_OUT - ZONE_IN) / 3, chapter: 3, step: 1 },
      { d: ZONE_IN + ((ZONE_OUT - ZONE_IN) * 2) / 3, chapter: 3, step: 2 },
      { d: ZONE_OUT, chapter: 3, step: 3 },
      { d: SYNC_AT, chapter: 3, step: 4 },
      { d: VISIT_AT, chapter: 4, step: -1 },
    ],
  },
  { kind: "dwell", w: 1.3, d: STOP.visit, chapter: 4, steps: [0, 3] },
  { kind: "move", w: 0.45, keys: [[0, STOP.visit], [1, STOP.final]], marks: [{ d: STOP.visit, chapter: 5, step: -1 }] },
  { kind: "dwell", w: 1.2, d: STOP.final, chapter: 5, steps: [0, 3] },
  { kind: "dwell", w: 0.35, d: STOP.final, chapter: 5, steps: [3, 3] },
];

export const TOTAL_WEIGHT = PHASES.reduce((s, ph) => s + ph.w, 0);

const RANGES = (() => {
  let acc = 0;
  return PHASES.map((ph) => {
    const from = acc / TOTAL_WEIGHT;
    acc += ph.w;
    return { from, to: acc / TOTAL_WEIGHT };
  });
})();

/** Monotone cubic (Fritsch–Carlson) through the keys, at rest at both ends: smooth, never reverses. */
function speedCurve(keys: [number, number][]) {
  const n = keys.length;
  const t = keys.map((k) => k[0]);
  const d = keys.map((k) => k[1]);
  const h: number[] = [];
  const s: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    h.push(t[i + 1] - t[i]);
    s.push((d[i + 1] - d[i]) / h[i]);
  }
  const m = new Array<number>(n).fill(0);
  for (let i = 1; i < n - 1; i++) {
    if (s[i - 1] * s[i] <= 0) continue;
    const w1 = 2 * h[i] + h[i - 1];
    const w2 = h[i] + 2 * h[i - 1];
    m[i] = (w1 + w2) / (w1 / s[i - 1] + w2 / s[i]);
  }
  return (x: number) => {
    let i = 0;
    while (i < n - 2 && x > t[i + 1]) i++;
    const u = (x - t[i]) / h[i];
    const u2 = u * u, u3 = u2 * u;
    return (2 * u3 - 3 * u2 + 1) * d[i] + (u3 - 2 * u2 + u) * h[i] * m[i] + (-2 * u3 + 3 * u2) * d[i + 1] + (u3 - u2) * h[i] * m[i + 1];
  };
}

const CURVE_OF = new Map<Phase, (x: number) => number>();
PHASES.forEach((ph) => ph.kind === "move" && CURVE_OF.set(ph, speedCurve(ph.keys)));

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export interface Frame {
  /** Distance along the road */
  d: number;
  chapter: number;
  /** -1 = riding in, before the chapter's first step */
  step: number;
  /** Progress through the current phase (0..1) */
  t: number;
}

export function frameAt(pRaw: number): Frame {
  const p = clamp01(pRaw);
  let i = RANGES.findIndex((r) => p <= r.to);
  if (i < 0) i = PHASES.length - 1;
  const ph = PHASES[i];
  const r = RANGES[i];
  const t = r.to > r.from ? clamp01((p - r.from) / (r.to - r.from)) : 1;

  if (ph.kind === "dwell") {
    const [a, b] = ph.steps;
    return { d: ph.d, chapter: ph.chapter, step: Math.min(b, a + Math.floor(t * (b - a + 1))), t };
  }
  const d = CURVE_OF.get(ph)!(t);
  let mark = ph.marks[0];
  for (const m of ph.marks) if (d >= m.d) mark = m;
  return { d, chapter: mark.chapter, step: mark.step, t };
}

export const distanceAt = (p: number) => frameAt(p).d;

/** Scroll position to jump to for each chapter (start of its first phase or ride mark). */
export const CHAPTER_P: number[] = CHAPTERS.map((_, c) => {
  for (let i = 0; i < PHASES.length; i++) {
    const ph = PHASES[i];
    if (ph.kind === "dwell" && ph.chapter === c) return RANGES[i].from + 0.0005;
    if (ph.kind === "move" && ph.marks[0].chapter === c) return RANGES[i].from + 0.0005;
  }
  return 0;
});

/* ───────────────────────────── Derived state ───────────────────────────── */

/** Break timer in minutes (0..15). */
export function breakMinutes(f: Frame) {
  if (f.chapter > 1) return 15;
  if (f.chapter < 1 || f.step < 1) return 0;
  return Math.round(15 * clamp01((f.t - 1 / 3) * 1.5));
}

/** Location points captured while offline. */
export function storedPoints(f: Frame) {
  if (f.chapter > 3) return OFFLINE_POINTS;
  if (f.chapter < 3) return 0;
  return Math.round(OFFLINE_POINTS * clamp01((f.d - ZONE_IN) / (ZONE_OUT - ZONE_IN)));
}

export const isSynced = (f: Frame) => f.chapter > 3 || (f.chapter === 3 && f.step >= 4);
export const isOffline = (f: Frame) => f.chapter === 3 && f.step >= 0 && f.step <= 2;

/** Where Rahul stands when he's off the scooter (null = riding / on it). */
export function offBikeAt(chapter: number, step: number): Pt | null {
  if (chapter === 0) return step < 3 ? pt(540, 392) : null;
  if (chapter === 1) return step >= 1 ? pt(658, 1372) : null;
  if (chapter === 2) return step <= 0 ? pt(658, 1372) : null;
  if (chapter === 4) return step >= 1 ? pt(952, 3398) : null;
  if (chapter === 5) return step >= 0 ? pt(632, 3792) : null;
  return null;
}
