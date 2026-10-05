"use client";

import React, { useState, useEffect } from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { PhoneMockup } from "../ui/DeviceMockup";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import {
  Wifi,
  WifiOff,
  Database,
  RefreshCw,
  CheckCircle2,
  HardDrive,
  ShieldCheck,
  Zap,
  ArrowRight,
  Play,
  RotateCcw,
} from "lucide-react";

export function OfflineFirstSection() {
  // Phases: 0: Online, 1: Offline, 2: Restored, 3: Syncing, 4: Synced
  const [phase, setPhase] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Auto-play cycling through the simulation
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setPhase((prev) => (prev + 1) % 5);
    }, 3200);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const pipelineSteps = [
    {
      step: 0,
      title: "ONLINE",
      subtitle: "Active cellular 4G/5G connection",
      icon: Wifi,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    {
      step: 1,
      title: "OFFLINE",
      subtitle: "Basements, remote routes, blind zones",
      icon: WifiOff,
      color: "text-rose-500",
      bg: "bg-rose-50",
      border: "border-rose-200",
    },
    {
      step: 2,
      title: "LOCAL STORAGE",
      subtitle: "Encrypted SQLite on employee device",
      icon: Database,
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    {
      step: 3,
      title: "CONNECTION RESTORED",
      subtitle: "Network detected automatically",
      icon: RefreshCw,
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      step: 4,
      title: "SYNC & DASHBOARD",
      subtitle: "Seamless cloud merge with zero data loss",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
  ];

  return (
    <section id="offline-tracking" className="py-24 sm:py-32 bg-navy-950 text-white relative overflow-hidden">
      {/* Dark grid background pattern */}
      <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      <Container size="wide" className="relative z-10">
        <SectionHeader
          theme="dark"
          badge="Proprietary Technology"
          badgeVariant="dark"
          title={
            <>
              Tracking doesn&apos;t stop <br />
              <span className="text-brand-400">when the internet does.</span>
            </>
          }
          subtitle="Fietra stores tracking data securely on the employee's device and automatically synchronizes it when connectivity returns."
          align="center"
        />

        {/* Visual Storytelling Pipeline Bar */}
        <div className="mb-14 p-4 sm:p-6 rounded-2xl bg-navy-900/80 border border-navy-800/80 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Interactive Offline-Sync Architecture
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-xs px-2.5 py-1 rounded bg-navy-800 hover:bg-navy-700 text-slate-300 transition flex items-center gap-1.5"
              >
                {isPlaying ? (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Auto-playing
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3" />
                    Resume Demo
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Stepper Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {pipelineSteps.map((s) => {
              const Icon = s.icon;
              const isCurrent = phase === s.step;
              return (
                <button
                  key={s.title}
                  onClick={() => {
                    setIsPlaying(false);
                    setPhase(s.step);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-300 ${
                    isCurrent
                      ? "bg-navy-800 border-brand-400 shadow-glow-blue"
                      : "bg-navy-950/60 border-navy-800/60 hover:bg-navy-900/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isCurrent ? "bg-brand-500 text-white" : "bg-navy-800 text-slate-400"
                      }`}
                    >
                      0{s.step + 1}
                    </span>
                    <Icon className={`h-4 w-4 ${s.color}`} />
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-white">
                    {s.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {s.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Column Deep Dive: Left Narrative Details & Right Dynamic Phone Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Explanatory deep dive */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 border border-navy-700 text-xs font-medium text-brand-300">
              <HardDrive className="h-3.5 w-3.5" />
              <span>Zero-Loss SQLite Buffered Queue</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              Basements, tunnels, or rural highways. Not a single meter is lost.
            </h3>

            <p className="text-base text-slate-300 leading-relaxed">
              Standard workforce apps depend on continuous 4G or 5G telemetry. When drivers enter underground parking or technicians visit basement utility rooms, standard tracking fails.
            </p>

            <p className="text-base text-slate-300 leading-relaxed">
              Fietra was architected with an offline-first foundation. Waypoints, timestamps, speeds, and battery state are encrypted and appended to an atomic local buffer on the device.
            </p>

            {/* Differentiator features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800">
                <div className="flex items-center gap-2 font-bold text-sm text-white mb-1">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  AES-256 Encrypted
                </div>
                <p className="text-xs text-slate-400">
                  Buffer data is secured locally against tampering or mock-GPS spoofing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800">
                <div className="flex items-center gap-2 font-bold text-sm text-white mb-1">
                  <Zap className="h-4 w-4 text-amber-400" />
                  Delta Sync Protocol
                </div>
                <p className="text-xs text-slate-400">
                  Compressed batch synchronization minimizes data bandwidth and battery consumption.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Simulated Mobile Phone Screen demonstrating the states */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[340px]">
              <PhoneMockup>
                {/* Mobile App Header */}
                <div className="p-4 bg-navy-950 text-white flex items-center justify-between border-b border-navy-800">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">
                      Field Mobile App
                    </div>
                    <div className="text-sm font-bold text-white">Rahul Sharma</div>
                  </div>
                  {/* Status Indicator */}
                  {phase === 0 && (
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Online
                    </span>
                  )}
                  {(phase === 1 || phase === 2) && (
                    <span className="text-[11px] font-semibold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded-full border border-rose-800 flex items-center gap-1">
                      <WifiOff className="h-3 w-3" />
                      Offline
                    </span>
                  )}
                  {phase === 3 && (
                    <span className="text-[11px] font-semibold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-800 flex items-center gap-1">
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      Syncing
                    </span>
                  )}
                  {phase === 4 && (
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Synced
                    </span>
                  )}
                </div>

                {/* Simulated Screen Content based on phase */}
                <div className="p-4 flex-1 flex flex-col justify-between bg-slate-900 text-white">
                  {/* Phase 0: Normal online */}
                  {phase === 0 && (
                    <div className="space-y-4">
                      <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 text-left">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-400">Network Status</span>
                          <span className="text-emerald-400 font-semibold">4G LTE Active</span>
                        </div>
                        <div className="text-lg font-bold text-white">Live Telemetry Active</div>
                        <div className="text-xs text-slate-400 mt-1">
                          GPS Waypoints transmitting directly to cloud console.
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-navy-900/60 border border-navy-800 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Current Speed:</span>
                        <span className="font-bold text-white">34 km/h</span>
                      </div>
                    </div>
                  )}

                  {/* Phase 1: Disconnected / Offline */}
                  {phase === 1 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-left">
                        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-1">
                          <WifiOff className="h-4 w-4" />
                          Offline Mode Triggered
                        </div>
                        <p className="text-xs text-slate-300">
                          Cellular signal lost in Basement B2. Background GPS engine continues recording.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-between">
                        <div className="text-xs">
                          <div className="text-slate-400">Stored Locally:</div>
                          <div className="text-base font-bold text-amber-400">
                            12 Waypoints Buffered
                          </div>
                        </div>
                        <Database className="h-6 w-6 text-amber-400" />
                      </div>
                    </div>
                  )}

                  {/* Phase 2: Local SQLite Storing 24 points */}
                  {phase === 2 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800 text-left">
                        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
                          <Database className="h-4 w-4" />
                          Local Encrypted Storage
                        </div>
                        <p className="text-xs text-slate-300">
                          Route coordinates, visit logs, and attendance checks safely preserved on device.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-between">
                        <div className="text-xs">
                          <div className="text-slate-400">Stored Locally:</div>
                          <div className="text-base font-bold text-amber-300">
                            24 Waypoints Buffered
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                          Awaiting Signal
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Phase 3: Connection restored & Syncing */}
                  {phase === 3 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800 text-left">
                        <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-1">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Connection Restored!
                        </div>
                        <p className="text-xs text-slate-300">
                          5G detected. Synchronizing local cache to Fietra cloud...
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Syncing 24 points...</span>
                          <span className="font-bold text-blue-400">82%</span>
                        </div>
                        <div className="h-2 w-full bg-navy-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full w-[82%] animate-pulse" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Phase 4: All synced */}
                  {phase === 4 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-left">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                          <CheckCircle2 className="h-4 w-4" />
                          All Data Synced ✓
                        </div>
                        <p className="text-xs text-slate-300">
                          24 GPS points uploaded. Manager map timeline reconstructed with 100% precision.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-between">
                        <div className="text-xs">
                          <div className="text-slate-400">Telemetry Lost:</div>
                          <div className="text-base font-bold text-emerald-400">
                            0 Points Lost (0.0%)
                          </div>
                        </div>
                        <ShieldCheck className="h-6 w-6 text-emerald-400" />
                      </div>
                    </div>
                  )}

                  {/* Bottom manual controls */}
                  <div className="pt-4 border-t border-navy-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Simulation Phase: {phase + 1}/5</span>
                    <button
                      onClick={() => setPhase((phase + 1) % 5)}
                      className="text-brand-400 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Next Phase</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </PhoneMockup>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
