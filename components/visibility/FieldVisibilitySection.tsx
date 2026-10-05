"use client";

import React from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import {
  Navigation,
  Route,
  Clock,
  CheckCircle2,
  Coffee,
  Briefcase,
  TrendingUp,
  Sliders,
  DollarSign,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export function FieldVisibilitySection() {
  const stages = [
    {
      step: "01",
      name: "TRACK",
      tagline: "High-Fidelity Telemetry Capture",
      accent: "border-blue-500 text-blue-600 bg-blue-50",
      pillBg: "bg-blue-600 text-white",
      items: [
        {
          title: "GPS Location",
          desc: "Sub-10m coordinates recorded with battery-optimized low-drain background service.",
          icon: Navigation,
        },
        {
          title: "Routes & Trails",
          desc: "Turn-by-turn trajectory lines, halt locations, idle time, and average travel speed.",
          icon: Route,
        },
        {
          title: "Geo-Attendance",
          desc: "Tamper-proof geofenced punch-in with mock-location and VPN spoof detection.",
          icon: Clock,
        },
      ],
    },
    {
      step: "02",
      name: "UNDERSTAND",
      tagline: "Contextual Operations Intelligence",
      accent: "border-purple-500 text-purple-600 bg-purple-50",
      pillBg: "bg-purple-600 text-white",
      items: [
        {
          title: "Customer Visits",
          desc: "Auto-detect arrival at client coordinates, time spent in meetings, and visit notes.",
          icon: CheckCircle2,
        },
        {
          title: "Break Durations",
          desc: "Separate statutory lunch and tea breaks from unauthorized field idling.",
          icon: Coffee,
        },
        {
          title: "Working Hours",
          desc: "Automated session reconciliation: travel hours vs. meeting hours vs. rest time.",
          icon: Briefcase,
        },
      ],
    },
    {
      step: "03",
      name: "ACT",
      tagline: "Executive ROI & Automation",
      accent: "border-emerald-500 text-emerald-600 bg-emerald-50",
      pillBg: "bg-emerald-600 text-white",
      items: [
        {
          title: "Improve Routes",
          desc: "Eliminate 25% redundant mileage with intelligent territory boundary dispatching.",
          icon: TrendingUp,
        },
        {
          title: "Improve Productivity",
          desc: "Increase verified customer meetings per field executive from 3.2 to 5.4 daily.",
          icon: Sliders,
        },
        {
          title: "Improve Field Operations",
          desc: "Automate distance reimbursement and payroll approval with audited GPS logs.",
          icon: DollarSign,
        },
      ],
    },
  ];

  return (
    <section id="visibility" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-subtle opacity-40 pointer-events-none" />

      <Container size="wide">
        <SectionHeader
          badge="Operational Transformation"
          title={
            <>
              From employee movement <br />
              <span className="text-brand-600">to business insight.</span>
            </>
          }
          subtitle="Fietra turns raw GPS telemetry into verifiable business intelligence that helps management cut wasted hours, dispatch smartly, and verify visits."
          align="center"
        />

        {/* 3 Connected Stages with horizontal connectors */}
        <div className="relative mt-8">
          {/* Animated Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[18%] right-[18%] h-0.5 border-t-2 border-dashed border-slate-300 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {stages.map((stg, idx) => (
              <div
                key={stg.name}
                className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-slate-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step header pill */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`h-9 px-3.5 rounded-full font-mono font-extrabold text-xs flex items-center justify-center tracking-wider ${stg.pillBg}`}
                    >
                      STAGE {stg.step}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Step {idx + 1} of 3
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-navy-950 tracking-tight">
                    {stg.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-1 mb-6">
                    {stg.tagline}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-4 pt-2 border-t border-slate-100">
                    {stg.items.map((it) => {
                      const Icon = it.icon;
                      return (
                        <div key={it.title} className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-xl shrink-0 mt-0.5 ${stg.accent}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-navy-900">
                              {it.title}
                            </div>
                            <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                              {it.desc}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium text-emerald-600">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Automated Pipeline
                  </span>
                  {idx < 2 && (
                    <span className="hidden lg:flex items-center gap-1 font-semibold text-brand-600">
                      <span>Next Stage</span>
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
