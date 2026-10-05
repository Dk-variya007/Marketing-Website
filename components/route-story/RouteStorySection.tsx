"use client";

import React, { useState } from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { StatusBadge } from "../ui/StatusBadge";
import {
  Play,
  MapPin,
  Coffee,
  CheckCircle,
  Flag,
  Navigation,
  Clock,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export function RouteStorySection() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(1);

  const routeTimeline = [
    {
      time: "09:10",
      title: "Tracking Started",
      category: "start",
      description: "Shift check-in confirmed via geofenced biometric punch at Central Hub.",
      badge: "Shift Start",
      badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
      stats: { speed: "0 km/h", odometer: "0.0 km", status: "Active" },
      pinX: 80,
      pinY: 340,
    },
    {
      time: "10:15",
      title: "Customer Visit",
      category: "visit",
      description: "Arrived at Apollo Diagnostics. Verified 45-min on-site client meeting with digital sign-off.",
      badge: "Visit #1 Verified",
      badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
      stats: { speed: "34 km/h peak", odometer: "14.2 km", status: "On-Site" },
      pinX: 240,
      pinY: 180,
    },
    {
      time: "12:30",
      title: "Break Taken",
      category: "break",
      description: "Authorized lunch break initiated. Tracking paused for driver privacy & statutory compliance.",
      badge: "Break (35 min)",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      stats: { speed: "0 km/h", odometer: "21.6 km", status: "On Break" },
      pinX: 380,
      pinY: 280,
    },
    {
      time: "13:05",
      title: "Tracking Resumed",
      category: "tracking",
      description: "Automated route continuation towards Westside Retail Corridor with active speed telemetry.",
      badge: "Active En Route",
      badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
      stats: { speed: "42 km/h", odometer: "21.6 km", status: "Traveling" },
      pinX: 470,
      pinY: 220,
    },
    {
      time: "15:20",
      title: "Customer Visit",
      category: "visit",
      description: "Second client appointment at MedLife Pharmacy. Order catalog presentation & inventory audit.",
      badge: "Visit #2 Verified",
      badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
      stats: { speed: "28 km/h", odometer: "32.8 km", status: "On-Site" },
      pinX: 620,
      pinY: 140,
    },
    {
      time: "17:45",
      title: "Tracking Ended",
      category: "end",
      description: "Daily shift completed. Full journey audit sealed with 100% verified mileage & zero missing points.",
      badge: "Shift Complete",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      stats: { speed: "0 km/h", odometer: "42.4 km", status: "Completed" },
      pinX: 740,
      pinY: 290,
    },
  ];

  const currentStep = routeTimeline[activeStepIndex];

  return (
    <section id="route-story" className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-subtle opacity-50 pointer-events-none" />

      <Container size="wide">
        <SectionHeader
          badge="Forensic Journey Replay"
          title={
            <>
              See the journey. <br />
              <span className="text-brand-600">Not just the destination.</span>
            </>
          }
          subtitle="Every turn, stop, client visit, and break segment is captured with verifiable precision. Eliminate guesswork with turn-by-turn timeline replay."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Interactive Chronological Timeline */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Daily Journey Timeline
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Agent: Rahul Sharma
              </span>
            </div>

            {routeTimeline.map((step, idx) => {
              const isSelected = activeStepIndex === idx;

              return (
                <div
                  key={step.time}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-brand-50/50 border-brand-500 shadow-md ring-1 ring-brand-500/20"
                      : "bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/70"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Time pill */}
                    <div className="text-center shrink-0">
                      <span className="font-mono font-bold text-xs sm:text-sm text-navy-950 block">
                        {step.time}
                      </span>
                      <span className="text-[10px] text-slate-400">AM/PM</span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-sm sm:text-base text-navy-900">
                          {step.title}
                        </h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${step.badgeColor}`}
                        >
                          {step.badge}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {step.description}
                      </p>

                      {isSelected && (
                        <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                          <span>
                            Speed:{" "}
                            <strong className="text-navy-900 font-semibold">
                              {step.stats.speed}
                            </strong>
                          </span>
                          <span>
                            Cumulative:{" "}
                            <strong className="text-navy-900 font-semibold">
                              {step.stats.odometer}
                            </strong>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Route Map Canvas with Color-Coded Segments */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden flex flex-col">
            {/* Top header of map */}
            <div className="p-4 sm:p-5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Route Segmentation
                </span>
                <div className="text-sm sm:text-base font-bold text-navy-900 flex items-center gap-2">
                  <span>Shift Route #TF-8942</span>
                  <span className="text-xs font-normal text-slate-500">
                    (42.4 km logged)
                  </span>
                </div>
              </div>

              {/* Color legend */}
              <div className="hidden sm:flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  Active Tracking
                </span>
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Break Segment
                </span>
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Completed End
                </span>
              </div>
            </div>

            {/* Map Canvas */}
            <div className="relative h-[440px] sm:h-[480px] bg-[#f8fafc] overflow-hidden select-none">
              <svg
                className="absolute inset-0 w-full h-full text-slate-200"
                viewBox="0 0 800 480"
                preserveAspectRatio="none"
              >
                {/* Background road grid */}
                <path
                  d="M 0,100 L 800,100 M 0,200 L 800,200 M 0,300 L 800,300 M 0,400 L 800,400"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 150,0 L 150,480 M 350,0 L 350,480 M 550,0 L 550,480 M 700,0 L 700,480"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {/* Major streets */}
                <path
                  d="M 50,400 C 180,380 200,220 300,200"
                  stroke="#e2e8f0"
                  strokeWidth="14"
                  fill="none"
                />
                <path
                  d="M 300,200 C 400,180 500,320 650,220"
                  stroke="#e2e8f0"
                  strokeWidth="14"
                  fill="none"
                />

                {/* SEGMENT 1: Hub to Visit 1 (Blue Primary Color) */}
                <path
                  d="M 80,340 C 140,340 180,240 240,180"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />

                {/* SEGMENT 2: Visit 1 to Lunch Break (Blue Primary) */}
                <path
                  d="M 240,180 C 290,160 320,240 380,280"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* BREAK SEGMENT: Orange (Prompt: Break section should use orange) */}
                <path
                  d="M 380,280 C 410,290 440,260 470,220"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="5"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                />

                {/* SEGMENT 4: Resumed to Visit 2 (Blue Primary) */}
                <path
                  d="M 470,220 C 510,180 560,180 620,140"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* SEGMENT 5: Visit 2 to End Point (Success Green) */}
                <path
                  d="M 620,140 C 670,120 700,220 740,290"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Waypoint 1: 09:10 Start */}
              <div
                style={{ left: "80px", top: "340px" }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                onClick={() => setActiveStepIndex(0)}
              >
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-lg">
                  S
                </div>
                <div className="text-[10px] font-bold text-navy-900 bg-white/95 px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap">
                  09:10 Start
                </div>
              </div>

              {/* Waypoint 2: 10:15 Visit 1 */}
              <div
                style={{ left: "240px", top: "180px" }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                onClick={() => setActiveStepIndex(1)}
              >
                <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-lg">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="text-[10px] font-bold text-purple-900 bg-white/95 px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap border border-purple-200">
                  10:15 Customer Visit
                </div>
              </div>

              {/* Waypoint 3: 12:30 Break (Orange) */}
              <div
                style={{ left: "380px", top: "280px" }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                onClick={() => setActiveStepIndex(2)}
              >
                <div className="h-8 w-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-lg">
                  <Coffee className="h-4 w-4" />
                </div>
                <div className="text-[10px] font-bold text-amber-900 bg-white/95 px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap border border-amber-200">
                  12:30 Break (35m)
                </div>
              </div>

              {/* Waypoint 4: 13:05 Resumed */}
              <div
                style={{ left: "470px", top: "220px" }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer hidden sm:block"
                onClick={() => setActiveStepIndex(3)}
              >
                <div className="h-7 w-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-lg">
                  <Navigation className="h-3.5 w-3.5" />
                </div>
                <div className="text-[10px] font-bold text-blue-900 bg-white/95 px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap">
                  13:05 Resumed
                </div>
              </div>

              {/* Waypoint 5: 15:20 Visit 2 */}
              <div
                style={{ left: "620px", top: "140px" }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                onClick={() => setActiveStepIndex(4)}
              >
                <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-lg">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="text-[10px] font-bold text-purple-900 bg-white/95 px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap border border-purple-200">
                  15:20 Customer Visit
                </div>
              </div>

              {/* Waypoint 6: 17:45 End (Success Green) */}
              <div
                style={{ left: "740px", top: "290px" }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                onClick={() => setActiveStepIndex(5)}
              >
                <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-lg">
                  <Flag className="h-4 w-4" />
                </div>
                <div className="text-[10px] font-bold text-emerald-900 bg-white/95 px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap border border-emerald-200">
                  17:45 Shift End
                </div>
              </div>

              {/* Dynamic Focus Ring on Selected Waypoint */}
              <div
                style={{
                  left: `${currentStep.pinX}px`,
                  top: `${currentStep.pinY}px`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 z-20"
              >
                <span className="absolute -inset-4 rounded-full bg-brand-500/30 animate-ping" />
                <span className="absolute -inset-6 rounded-full border-2 border-brand-500/40" />
              </div>

              {/* Bottom Journey HUD */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xs">
                    {currentStep.time}
                  </div>
                  <div>
                    <div className="font-bold text-navy-950 text-sm">
                      {currentStep.title}
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      Selected Waypoint Inspector
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 text-slate-600">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">
                      Recorded Speed
                    </div>
                    <div className="font-bold text-navy-900">
                      {currentStep.stats.speed}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">
                      Odometer Log
                    </div>
                    <div className="font-bold text-navy-900">
                      {currentStep.stats.odometer}
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">
                      Verification
                    </div>
                    <div className="font-bold text-emerald-600 flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      GPS Validated
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
