"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  ClipboardCheck,
  Coffee,
  Database,
  Flag,
  LocateFixed,
  MapPin,
  Navigation,
  Play,
  RefreshCw,
  Signal,
  SignalZero,
  Square,
  WifiOff,
} from "lucide-react";
import type { PhoneScreen } from "./timeline";

interface PhoneHudProps {
  screen: PhoneScreen;
  clock: string;
  km: number;
  network: boolean;
  storedPoints: number;
  className?: string;
}

function TapHint() {
  return (
    <span className="pointer-events-none absolute -right-1 -bottom-1 flex h-6 w-6">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
      <span className="relative inline-flex h-6 w-6 rounded-full border-2 border-white/90 bg-white/40" />
    </span>
  );
}

function BigIcon({ tone, children }: { tone: string; children: React.ReactNode }) {
  return (
    <div className={`mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full ${tone}`}>{children}</div>
  );
}

function MiniRoute({ offline }: { offline?: boolean }) {
  return (
    <div className="relative h-16 overflow-hidden rounded-lg bg-slate-100">
      <div className="absolute inset-0 bg-grid-subtle" />
      <svg viewBox="0 0 160 64" className="absolute inset-0 h-full w-full">
        <path d="M8,54 C40,54 44,22 80,28 S120,52 152,12" stroke="#cbd5e1" strokeWidth={5} fill="none" strokeLinecap="round" />
        <path
          d="M8,54 C40,54 44,22 80,28 S120,52 152,12"
          stroke={offline ? "#f59e0b" : "#2563eb"}
          strokeWidth={2.5}
          strokeDasharray={offline ? "3 4" : undefined}
          fill="none"
          strokeLinecap="round"
          className="gj-route-draw"
        />
        <circle cx={152} cy={12} r={4} fill={offline ? "#f59e0b" : "#2563eb"} stroke="#fff" strokeWidth={1.5} />
      </svg>
    </div>
  );
}

function Screen({ screen, km, storedPoints }: { screen: PhoneScreen; km: number; storedPoints: number }) {
  const kmText = `${km.toFixed(1)} km`;

  switch (screen) {
    case "home":
      return (
        <div className="flex h-full flex-col">
          <p className="text-[10px] text-slate-500">Good morning,</p>
          <p className="text-[13px] font-bold text-navy-950">Rahul Sharma</p>
          <div className="mt-2 rounded-xl bg-slate-50 p-2.5 text-[10px] text-slate-500">
            <p className="font-semibold text-slate-700">Today</p>
            <p>1 visit planned · Field Sales</p>
          </div>
          <div className="mt-auto">
            <div className="relative rounded-xl bg-brand-600 py-2.5 text-center text-[11px] font-bold text-white shadow-glow-blue">
              <Play className="mr-1 inline h-3 w-3 fill-white" /> Start Tracking
              <TapHint />
            </div>
          </div>
        </div>
      );
    case "permission":
      return (
        <div className="flex h-full flex-col justify-center">
          <div className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-lg">
            <BigIcon tone="bg-brand-50 text-brand-600">
              <MapPin className="h-5 w-5" />
            </BigIcon>
            <p className="text-[11px] font-bold leading-tight text-navy-950">Allow Fietra to access this device&apos;s location?</p>
            <p className="mt-1 text-[9px] text-slate-500">Needed to track your field journey in the background.</p>
            <div className="relative mt-2.5 rounded-lg bg-brand-600 py-1.5 text-[10px] font-bold text-white">
              Allow all the time
              <TapHint />
            </div>
            <div className="mt-1 py-1 text-[10px] font-medium text-slate-500">While using the app</div>
          </div>
        </div>
      );
    case "gps":
      return (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="relative mb-3 flex h-16 w-16 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand-400/30" />
            <span className="absolute inset-2 rounded-full border-2 border-dashed border-brand-300 animate-spin-slow" />
            <LocateFixed className="h-6 w-6 text-brand-600" />
          </div>
          <p className="text-[12px] font-bold text-navy-950">Acquiring GPS…</p>
          <p className="text-[10px] text-slate-500">Accuracy ± 8 m</p>
          <div className="mt-2 h-1 w-24 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-2/3 rounded-full bg-brand-500 gj-loading" />
          </div>
        </div>
      );
    case "started":
      return (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <BigIcon tone="bg-emerald-100 text-emerald-600">
            <Check className="h-6 w-6" strokeWidth={3} />
          </BigIcon>
          <p className="text-[13px] font-bold text-navy-950">Tracking Started</p>
          <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-500">
            <MapPin className="h-3 w-3 text-brand-600" /> Field Office, Sector 21
          </p>
          <span className="mt-2 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
            Background tracking on
          </span>
        </div>
      );
    case "tracking":
    case "resumed":
      return (
        <div className="flex h-full flex-col">
          {screen === "resumed" && (
            <div className="mb-2 flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2 py-1.5 text-[10px] font-bold text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" /> Tracking Resumed
            </div>
          )}
          <MiniRoute />
          <div className="mt-2 grid grid-cols-2 gap-1.5 text-center">
            <div className="rounded-lg bg-slate-50 py-1.5">
              <p className="text-[12px] font-bold text-navy-950">{kmText}</p>
              <p className="text-[8.5px] text-slate-500">Distance</p>
            </div>
            <div className="rounded-lg bg-slate-50 py-1.5">
              <p className="text-[12px] font-bold text-navy-950">± 6 m</p>
              <p className="text-[8.5px] text-slate-500">Accuracy</p>
            </div>
          </div>
          <div className="mt-auto flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 py-2 text-center text-[10px] font-bold text-amber-700 justify-center">
            <Coffee className="h-3 w-3" /> Take a Break
          </div>
        </div>
      );
    case "onBreak":
      return (
        <div className="flex h-full flex-col items-center text-center">
          <BigIcon tone="bg-amber-100 text-amber-600">
            <Coffee className="h-5 w-5" />
          </BigIcon>
          <p className="text-[12px] font-bold text-navy-950">On Break</p>
          <p className="font-mono text-[20px] font-bold text-amber-600 gj-tick">00:14:32</p>
          <p className="text-[9.5px] text-slate-500">Journey paused at {kmText}</p>
          <div className="relative mt-auto w-full rounded-xl bg-emerald-600 py-2 text-[10px] font-bold text-white">
            <Play className="mr-1 inline h-3 w-3 fill-white" /> Resume Tracking
          </div>
        </div>
      );
    case "noNet":
      return (
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-1.5 rounded-lg bg-rose-50 px-2 py-1.5 text-[10px] font-bold text-rose-700">
            <WifiOff className="h-3.5 w-3.5" /> No internet connection
          </div>
          <div className="mt-2 opacity-60">
            <MiniRoute />
          </div>
          <p className="mt-2 text-center text-[10px] text-slate-500">Checking tracking status…</p>
        </div>
      );
    case "offline":
      return (
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-2 py-1.5 text-[10px] font-bold text-amber-700">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" /> Offline Tracking Active
          </div>
          <div className="mt-2">
            <MiniRoute offline />
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-slate-50 p-2">
            <Database className="h-4 w-4 text-slate-500" />
            <div>
              <p className="text-[12px] font-bold text-navy-950">{storedPoints} points</p>
              <p className="text-[8.5px] text-slate-500">Saved securely on device</p>
            </div>
          </div>
          <p className="mt-auto text-center text-[9px] text-slate-400">Will sync automatically when online</p>
        </div>
      );
    case "syncing":
      return (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <BigIcon tone="bg-brand-50 text-brand-600">
            <RefreshCw className="h-5 w-5 animate-spin" />
          </BigIcon>
          <p className="text-[12px] font-bold text-navy-950">Back online</p>
          <p className="text-[10px] text-slate-500">Syncing {storedPoints} points…</p>
          <div className="mt-2 h-1.5 w-28 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-brand-500 gj-fill" />
          </div>
        </div>
      );
    case "synced":
      return (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <BigIcon tone="bg-brand-100 text-brand-600">
            <Check className="h-6 w-6" strokeWidth={3} />
          </BigIcon>
          <p className="text-[13px] font-bold text-navy-950">Data Synced</p>
          <p className="text-[10px] text-slate-500">{storedPoints} offline points uploaded</p>
          <p className="mt-1 text-[9px] text-emerald-600 font-semibold">No gaps in your route</p>
        </div>
      );
    case "arrive":
      return (
        <div className="flex h-full flex-col">
          <div className="rounded-xl bg-purple-50 p-2.5">
            <p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide text-purple-600">
              <MapPin className="h-3 w-3" /> You&apos;ve arrived
            </p>
            <p className="mt-0.5 text-[12px] font-bold text-navy-950">Metro Pharma Distributors</p>
            <p className="text-[9px] text-slate-500">Within 40 m of visit location</p>
          </div>
          <div className="mt-auto relative rounded-xl bg-purple-600 py-2.5 text-center text-[11px] font-bold text-white">
            Check In
            <TapHint />
          </div>
        </div>
      );
    case "checkedIn":
      return (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <BigIcon tone="bg-purple-100 text-purple-600">
            <Check className="h-6 w-6" strokeWidth={3} />
          </BigIcon>
          <p className="text-[13px] font-bold text-navy-950">Checked In</p>
          <p className="text-[10px] text-slate-500">Metro Pharma Distributors</p>
          <p className="mt-1 text-[9px] text-slate-400">Location verified</p>
        </div>
      );
    case "visitForm":
      return (
        <div className="flex h-full flex-col">
          <p className="flex items-center gap-1 text-[11px] font-bold text-navy-950">
            <ClipboardCheck className="h-3.5 w-3.5 text-purple-600" /> Visit details
          </p>
          {["Meet store manager", "Capture order", "Add notes & photo"].map((item, i) => (
            <div key={item} className="mt-1.5 flex items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1.5 text-[10px] text-slate-600">
              <span
                className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-purple-600 text-white gj-pop"
                style={{ animationDelay: `${0.3 + i * 0.5}s` }}
              >
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
              {item}
            </div>
          ))}
          <div className="mt-auto rounded-xl bg-purple-600 py-2 text-center text-[10px] font-bold text-white">Submit Visit</div>
        </div>
      );
    case "visitDone":
      return (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <BigIcon tone="bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </BigIcon>
          <p className="text-[12px] font-bold leading-tight text-navy-950">Visit Completed Successfully</p>
          <p className="mt-1 text-[9.5px] text-slate-500">Submitted · 38 min on site</p>
        </div>
      );
    case "summary":
    case "stopping":
      return (
        <div className="flex h-full flex-col">
          <p className="text-[11px] font-bold text-navy-950">Today&apos;s journey</p>
          <div className="mt-1.5 grid grid-cols-2 gap-1.5 text-center">
            {[
              [kmText, "Distance"],
              ["1", "Visit"],
              ["1", "Break"],
              ["0", "Gaps"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-lg bg-slate-50 py-1.5">
                <p className="text-[12px] font-bold text-navy-950">{v}</p>
                <p className="text-[8.5px] text-slate-500">{l}</p>
              </div>
            ))}
          </div>
          <div className="relative mt-auto rounded-xl bg-rose-600 py-2.5 text-center text-[11px] font-bold text-white">
            {screen === "stopping" ? (
              <span className="inline-flex items-center gap-1">
                <RefreshCw className="h-3 w-3 animate-spin" /> Saving final location…
              </span>
            ) : (
              <>
                <Square className="mr-1 inline h-2.5 w-2.5 fill-white" /> Stop Tracking
                <TapHint />
              </>
            )}
          </div>
        </div>
      );
    case "complete":
      return (
        <div className="flex h-full flex-col items-center text-center">
          <BigIcon tone="bg-emerald-100 text-emerald-600">
            <Flag className="h-5 w-5" />
          </BigIcon>
          <p className="text-[13px] font-bold text-navy-950">Journey Completed</p>
          <p className="text-[9.5px] text-slate-500">Tracking stopped</p>
          <div className="mt-2 w-full space-y-1 text-left text-[9.5px]">
            {[
              ["Distance", kmText],
              ["Visits", "1 completed"],
              ["Break", "15 min"],
              ["Offline points", "Synced"],
            ].map(([l, v]) => (
              <div key={l} className="flex justify-between rounded-md bg-slate-50 px-2 py-1">
                <span className="text-slate-500">{l}</span>
                <span className="font-semibold text-navy-950">{v}</span>
              </div>
            ))}
          </div>
        </div>
      );
  }
}

export function PhoneHud({ screen, clock, km, network, storedPoints, className }: PhoneHudProps) {
  return (
    <div className={className}>
      <div className="h-full rounded-[26px] bg-navy-950 p-[5px] shadow-[0_24px_48px_-12px_rgba(10,15,29,0.45)] ring-1 ring-white/10">
        <div className="relative h-full overflow-hidden rounded-[21px] bg-white">
          {/* Status bar */}
          <div className="flex items-center justify-between px-3.5 pt-2 text-[9px] font-semibold text-navy-950">
            <span>{clock.replace(/ (AM|PM)/, "")}</span>
            <span className="absolute left-1/2 top-1.5 h-3.5 w-12 -translate-x-1/2 rounded-full bg-navy-950" />
            <span className="flex items-center gap-1">
              {network ? <Signal className="h-2.5 w-2.5" /> : <SignalZero className="h-2.5 w-2.5 text-rose-500" />}
              <span className={network ? "" : "text-rose-500"}>{network ? "4G" : "—"}</span>
            </span>
          </div>
          <div className="flex items-center gap-1 px-3.5 pt-2 pb-1.5 border-b border-slate-100">
            <Navigation className="h-3 w-3 text-brand-600" />
            <span className="text-[10px] font-bold text-navy-950">Fietra</span>
            <span className="ml-auto text-[8.5px] font-medium text-slate-400">Geo Tracking</span>
          </div>
          <div className="relative h-[calc(100%-52px)] p-3">
            <AnimatePresence initial={false}>
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="absolute inset-3"
              >
                <Screen screen={screen} km={km} storedPoints={storedPoints} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
