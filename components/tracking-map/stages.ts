// Per-stage data for the top-view Tracking Map page.
// Each stage = one full-height block: map tile (left) + status/details (right).

import type { PhoneScreen, StatusTone } from "../geo-journey/timeline";

export interface StageStep {
  /** Shown in the right-side step list */
  label: string;
  phone: PhoneScreen;
  status: { tone: StatusTone; label: string };
  /** How long this step is shown before the next one starts (ms) */
  ms: number;
}

export interface StageConfig {
  /** Road from the top edge of the tile to the stop. Must start with M. */
  enterPath: string;
  /** Road from the stop onward. Must continue the same path (C/L commands). */
  exitPath: string;
  /** Scooter drives in from the tile above */
  hasEnter: boolean;
  /** Scooter drives out to the tile below */
  hasExit: boolean;
  /** State before the scooter arrives at the stop */
  before: { phone: PhoneScreen; status: { tone: StatusTone; label: string } };
  steps: StageStep[];
  /** Step that waits for the scooter to leave the zone (offline → sync) */
  gateAt?: number;
  clock: string;
  km: number;
  network: (step: number) => boolean;
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
} as const;

export const STAGES: StageConfig[] = [
  // 01 — Start tracking at the field office
  {
    enterPath: "M420,330",
    exitPath: "C420,430 300,450 300,545 C300,630 420,650 420,710 L420,800",
    hasEnter: false,
    hasExit: true,
    before: { phone: "home", status: S.idle },
    steps: [
      { label: "Open the app and tap Start Tracking", phone: "home", status: S.idle, ms: 1500 },
      { label: "Allow location permission", phone: "permission", status: S.perm, ms: 1700 },
      { label: "GPS locks the current location", phone: "gps", status: S.gps, ms: 1700 },
      { label: "Tracking started — ride begins", phone: "started", status: S.active, ms: 0 },
    ],
    clock: "9:02 AM",
    km: 0,
    network: () => true,
  },
  // 02 — Break at the chai stall
  {
    enterPath: "M420,0 L420,110 C420,220 340,240 340,350 L340,400",
    exitPath: "C340,520 420,560 420,680 L420,800",
    hasEnter: true,
    hasExit: false,
    before: { phone: "tracking", status: S.active },
    steps: [
      { label: "Arrive and park at Chai Point", phone: "tracking", status: S.arrivedBreak, ms: 1400 },
      { label: "Start break from the app", phone: "onBreak", status: S.break, ms: 1600 },
      { label: "Tracking paused · break timer running", phone: "onBreak", status: S.break, ms: 0 },
    ],
    clock: "11:05 AM",
    km: 5.8,
    network: () => true,
  },
  // 03 — Resume from the same stall
  {
    enterPath: "M420,0 L420,40 C420,130 340,150 340,240",
    exitPath: "C340,400 540,420 540,560 C540,680 420,700 420,800",
    hasEnter: false,
    hasExit: true,
    before: { phone: "onBreak", status: S.break },
    steps: [
      { label: "Finish break · 15 min recorded", phone: "onBreak", status: S.breakEnd, ms: 1500 },
      { label: "Back on the scooter", phone: "onBreak", status: S.breakEnd, ms: 1200 },
      { label: "Tracking resumed on the same journey", phone: "resumed", status: S.active, ms: 0 },
    ],
    clock: "11:20 AM",
    km: 5.8,
    network: () => true,
  },
  // 04 — Offline zone
  {
    enterPath: "M420,0 C420,120 500,160 500,280 L500,400",
    exitPath: "L500,520 C500,640 420,680 420,800",
    hasEnter: true,
    hasExit: true,
    before: { phone: "tracking", status: S.active },
    steps: [
      { label: "Network drops mid-ride", phone: "noNet", status: S.noNet, ms: 1400 },
      { label: "Offline tracking kicks in", phone: "offline", status: S.offline, ms: 1400 },
      { label: "Location points saved on device", phone: "offline", status: S.offline, ms: 600 },
      { label: "Network back · syncing points", phone: "syncing", status: S.syncing, ms: 1300 },
      { label: "Data synced — no gaps in route", phone: "synced", status: S.synced, ms: 0 },
    ],
    gateAt: 3,
    clock: "1:35 PM",
    km: 11.8,
    network: (step) => step < 0 || step >= 3,
  },
  // 05 — Visit check-in
  {
    enterPath: "M420,0 L420,100 C420,220 520,260 520,380 L520,420",
    exitPath: "C520,560 420,600 420,700 L420,800",
    hasEnter: true,
    hasExit: false,
    before: { phone: "tracking", status: S.active },
    steps: [
      { label: "Enter the visit geofence", phone: "arrive", status: S.atVisit, ms: 1500 },
      { label: "Check in — location verified", phone: "checkedIn", status: S.checkedIn, ms: 1500 },
      { label: "Complete the visit activity", phone: "visitForm", status: S.checkedIn, ms: 2400 },
      { label: "Submit · visit completed", phone: "visitDone", status: S.visitDone, ms: 0 },
    ],
    clock: "3:20 PM",
    km: 18.4,
    network: () => true,
  },
  // 06 — Stop tracking
  {
    enterPath: "M420,0 L420,100 C420,200 520,220 520,330",
    exitPath: "",
    hasEnter: false,
    hasExit: false,
    before: { phone: "visitDone", status: S.visitDone },
    steps: [
      { label: "Review the day and tap Stop Tracking", phone: "summary", status: S.active, ms: 1500 },
      { label: "Final location saved", phone: "stopping", status: S.stopping, ms: 1300 },
      { label: "Route closed at the final point", phone: "stopping", status: S.finalLoc, ms: 1100 },
      { label: "Journey completed · summary ready", phone: "complete", status: S.complete, ms: 0 },
    ],
    clock: "5:05 PM",
    km: 18.4,
    network: () => true,
  },
];
