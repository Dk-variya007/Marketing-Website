// Single source of truth for the Geo Tracking scroll story.
// Everything is driven by one scroll progress value `p` in [0, 1].

export type Pose = "stand" | "ride" | "sit" | "stretch";
export type Arm = "down" | "phone" | "cup" | "clipboard" | "helmet";
export type Mood = "neutral" | "concerned" | "happy";
export type Beacon = "off" | "active" | "break" | "offline";

export type PhoneScreen =
  | "home"
  | "permission"
  | "gps"
  | "started"
  | "tracking"
  | "onBreak"
  | "resumed"
  | "noNet"
  | "offline"
  | "syncing"
  | "synced"
  | "arrive"
  | "checkedIn"
  | "visitForm"
  | "visitDone"
  | "summary"
  | "stopping"
  | "complete";

export type StatusTone = "idle" | "active" | "break" | "offline" | "sync" | "visit" | "done";

export interface Beat {
  key: string;
  at: number;
  pose: Pose;
  arm: Arm;
  helmet: boolean;
  mood: Mood;
  /** Rider's screen x when off the bike (scene units) */
  riderX: number;
  phone: PhoneScreen;
  beacon: Beacon;
  status: { tone: StatusTone; label: string };
  bubble?: string;
  network: boolean;
}

/** Screen x of the scooter. The world scrolls past it. */
export const BIKE_X = 300;
/** Ground line for rider + bike. */
export const GROUND_Y = 572;
/** Rider / bike drawing scale. */
export const FIG_SCALE = 1.5;

/** Distances along the road (world units). */
export const D_BREAK = 920;
export const D_VISIT = 2930;

// Scroll progress → distance travelled. Flat segments are stops.
export const DIST_P = [0, 0.118, 0.19, 0.212, 0.385, 0.405, 0.685, 0.712, 1];
export const DIST_V = [0, 0, D_BREAK - 70, D_BREAK, D_BREAK, D_BREAK + 40, D_VISIT - 60, D_VISIT, D_VISIT];

export function distanceAt(p: number) {
  if (p <= DIST_P[0]) return DIST_V[0];
  for (let i = 1; i < DIST_P.length; i++) {
    if (p <= DIST_P[i]) {
      const t = (p - DIST_P[i - 1]) / (DIST_P[i] - DIST_P[i - 1]);
      return DIST_V[i - 1] + (DIST_V[i] - DIST_V[i - 1]) * t;
    }
  }
  return DIST_V[DIST_V.length - 1];
}

export const OFFLINE_START_P = 0.515;
export const SYNC_P = 0.625;
export const OFFLINE_FROM = distanceAt(OFFLINE_START_P);
export const OFFLINE_TO = distanceAt(SYNC_P);

const STAND_X = 180;
const BENCH_X = 482;
const DOOR_X = 446;

const S = {
  idle: { tone: "idle", label: "Ready to start" },
  perm: { tone: "idle", label: "Awaiting location permission" },
  gps: { tone: "sync", label: "Initializing GPS" },
  active: { tone: "active", label: "Tracking Active" },
  break: { tone: "break", label: "Break Mode" },
  breakEnd: { tone: "break", label: "Ending break" },
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
} as const satisfies Record<string, Beat["status"]>;

type BeatInput = Omit<Beat, "mood" | "network" | "riderX"> &
  Partial<Pick<Beat, "mood" | "network" | "riderX">>;

const b = (beat: BeatInput): Beat => ({
  mood: "neutral",
  network: true,
  riderX: STAND_X,
  ...beat,
});

export const BEATS: Beat[] = [
  // 01 — Start tracking
  b({ key: "idle", at: 0, pose: "stand", arm: "down", helmet: false, phone: "home", beacon: "off", status: S.idle }),
  b({ key: "openApp", at: 0.014, pose: "stand", arm: "phone", helmet: false, phone: "home", beacon: "off", status: S.idle }),
  b({ key: "permission", at: 0.034, pose: "stand", arm: "phone", helmet: false, phone: "permission", beacon: "off", status: S.perm }),
  b({ key: "gps", at: 0.054, pose: "stand", arm: "phone", helmet: false, phone: "gps", beacon: "active", status: S.gps }),
  b({ key: "started", at: 0.072, pose: "stand", arm: "phone", helmet: false, mood: "happy", phone: "started", beacon: "active", status: S.active }),
  b({ key: "helmet", at: 0.09, pose: "stand", arm: "helmet", helmet: true, phone: "tracking", beacon: "active", status: S.active }),
  b({ key: "mount", at: 0.104, pose: "ride", arm: "down", helmet: true, phone: "tracking", beacon: "active", status: S.active }),
  b({ key: "ride1", at: 0.118, pose: "ride", arm: "down", helmet: true, phone: "tracking", beacon: "active", status: S.active }),
  // 02 — Break
  b({ key: "parkBreak", at: 0.214, pose: "stand", arm: "helmet", helmet: false, phone: "tracking", beacon: "active", status: S.active }),
  b({ key: "break", at: 0.232, pose: "sit", arm: "cup", helmet: false, mood: "happy", riderX: BENCH_X, phone: "onBreak", beacon: "break", status: S.break, bubble: "Quick chai break" }),
  b({ key: "breakPhone", at: 0.27, pose: "sit", arm: "phone", helmet: false, riderX: BENCH_X, phone: "onBreak", beacon: "break", status: S.break }),
  b({ key: "relax", at: 0.3, pose: "sit", arm: "cup", helmet: false, mood: "happy", riderX: BENCH_X, phone: "onBreak", beacon: "break", status: S.break }),
  // 03 — Resume
  b({ key: "getUp", at: 0.338, pose: "stand", arm: "down", helmet: false, phone: "onBreak", beacon: "break", status: S.breakEnd }),
  b({ key: "helmetOn", at: 0.352, pose: "stand", arm: "helmet", helmet: true, phone: "onBreak", beacon: "break", status: S.breakEnd }),
  b({ key: "mount2", at: 0.366, pose: "ride", arm: "down", helmet: true, mood: "happy", phone: "resumed", beacon: "active", status: S.active, bubble: "Tracking resumed" }),
  b({ key: "ride2", at: 0.392, pose: "ride", arm: "down", helmet: true, phone: "tracking", beacon: "active", status: S.active }),
  // 04 — Offline
  b({ key: "netLost", at: OFFLINE_START_P, pose: "ride", arm: "down", helmet: true, network: false, phone: "noNet", beacon: "offline", status: S.noNet }),
  b({ key: "concerned", at: 0.532, pose: "ride", arm: "down", helmet: true, network: false, mood: "concerned", phone: "noNet", beacon: "offline", status: S.noNet, bubble: "No signal…?" }),
  b({ key: "offline", at: 0.556, pose: "ride", arm: "down", helmet: true, network: false, mood: "happy", phone: "offline", beacon: "offline", status: S.offline, bubble: "Still tracking. Phew." }),
  b({ key: "offlineRide", at: 0.578, pose: "ride", arm: "down", helmet: true, network: false, phone: "offline", beacon: "offline", status: S.offline }),
  b({ key: "netBack", at: SYNC_P, pose: "ride", arm: "down", helmet: true, phone: "syncing", beacon: "active", status: S.syncing }),
  b({ key: "synced", at: 0.643, pose: "ride", arm: "down", helmet: true, phone: "synced", beacon: "active", status: S.synced }),
  // 05 — Visit
  b({ key: "destAppear", at: 0.672, pose: "ride", arm: "down", helmet: true, phone: "tracking", beacon: "active", status: S.active }),
  b({ key: "arriveVisit", at: 0.714, pose: "stand", arm: "helmet", helmet: false, phone: "arrive", beacon: "active", status: S.atVisit }),
  b({ key: "visitDetected", at: 0.728, pose: "stand", arm: "phone", helmet: false, phone: "arrive", beacon: "active", status: S.atVisit }),
  b({ key: "checkedIn", at: 0.746, pose: "stand", arm: "phone", helmet: false, mood: "happy", phone: "checkedIn", beacon: "active", status: S.checkedIn }),
  b({ key: "activity", at: 0.764, pose: "stand", arm: "clipboard", helmet: false, riderX: DOOR_X, phone: "visitForm", beacon: "active", status: S.checkedIn }),
  b({ key: "visitDone", at: 0.8, pose: "stand", arm: "phone", helmet: false, mood: "happy", riderX: DOOR_X, phone: "visitDone", beacon: "active", status: S.visitDone }),
  // 06 — Stop tracking
  b({ key: "review", at: 0.838, pose: "stand", arm: "phone", helmet: false, phone: "summary", beacon: "active", status: S.active }),
  b({ key: "stopping", at: 0.862, pose: "stand", arm: "phone", helmet: false, phone: "stopping", beacon: "off", status: S.stopping }),
  b({ key: "finalLoc", at: 0.884, pose: "stand", arm: "phone", helmet: false, phone: "stopping", beacon: "off", status: S.finalLoc }),
  b({ key: "relaxEnd", at: 0.91, pose: "stretch", arm: "down", helmet: false, mood: "happy", phone: "complete", beacon: "off", status: S.complete }),
];

export function beatAt(p: number): Beat {
  let current = BEATS[0];
  for (const beat of BEATS) {
    if (p >= beat.at) current = beat;
    else break;
  }
  return current;
}

export function beatIndex(key: string) {
  return BEATS.findIndex((beat) => beat.key === key);
}

/** Moving = distance changes around p. */
export function isMovingAt(p: number) {
  return Math.abs(distanceAt(p + 0.004) - distanceAt(p)) > 1;
}

export const SECTION_COUNT = 6;

export function sectionAt(p: number) {
  return Math.min(SECTION_COUNT - 1, Math.max(0, Math.floor(p * SECTION_COUNT)));
}

/** Clock time shown in the story (09:00 → 17:30). */
export function clockAt(p: number) {
  const minutes = 9 * 60 + Math.round(p * 510);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

export const TOTAL_KM = 18.4;
export function kmAt(p: number) {
  return (distanceAt(p) / D_VISIT) * TOTAL_KM;
}
