"use client";

import React, { useState } from "react";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import {
  MapPinOff,
  ClipboardX,
  FileQuestion,
  WifiOff,
  EyeOff,
  ArrowDown,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export function ProblemSection() {
  const [activeProblem, setActiveProblem] = useState<number>(0);

  const problems = [
    {
      num: "01",
      icon: MapPinOff,
      quote: "I don't know where my team is.",
      detail:
        "Managers rely on WhatsApp messages, phone calls, and end-of-day spreadsheets. There is no single live operational map showing who is on the road, at a customer, or idle.",
      impact: "Unplanned detours & delayed customer service",
    },
    {
      num: "02",
      icon: ClipboardX,
      quote: "Manual attendance doesn't tell the full story.",
      detail:
        "Field staff punch in from home or off-site. Without verified GPS geofencing and live session tracking, regular timesheets fail to prove actual time spent working.",
      impact: "Proxy punches and inaccurate overtime claims",
    },
    {
      num: "03",
      icon: FileQuestion,
      quote: "Customer visits are difficult to verify.",
      detail:
        "Did the rep actually visit the client site? How long did the meeting last? False claims and untracked cancellations eat into sales revenue and client satisfaction.",
      impact: "Unverified field visits and disputed client logs",
    },
    {
      num: "04",
      icon: WifiOff,
      quote: "Poor connectivity breaks tracking.",
      detail:
        "In basements, rural transit zones, and concrete facilities, standard GPS apps crash, drop sessions, or lose breadcrumb logs completely when offline.",
      impact: "Gaps in telemetry and lost employee trail data",
    },
    {
      num: "05",
      icon: EyeOff,
      quote: "Managers don't have real-time visibility.",
      detail:
        "By the time reports reach operations desks at the end of the day or week, it is too late to reroute technicians, assist stranded agents, or reallocate priority visits.",
      impact: "Reactive management instead of proactive dispatch",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Large typography & narrative */}
          <div className="lg:col-span-5 sticky top-28">
            <Badge variant="warning" size="md" className="mb-4">
              The Field Operations Blind Spot
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-[1.12]">
              Your field team is moving. <br />
              <span className="text-slate-400">
                Can you actually see what&apos;s happening?
              </span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed">
              When 80% of your workforce works away from a desk, traditional HR tools and static spreadsheets leave operations teams in the dark.
            </p>

            <div className="mt-8 p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                The Real Business Cost
              </div>
              <p className="text-sm text-amber-900 leading-normal">
                Companies lose an estimated <strong className="font-semibold">3.5 hours per field employee weekly</strong> to unoptimized travel, false check-ins, and manual reporting overhead.
              </p>
            </div>
          </div>

          {/* RIGHT: Problems appearing 01 through 05 */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {problems.map((prob, idx) => {
              const Icon = prob.icon;
              const isActive = activeProblem === idx;

              return (
                <div
                  key={prob.num}
                  onClick={() => setActiveProblem(idx)}
                  className={`group relative p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-slate-50 border-brand-500 shadow-md ring-1 ring-brand-500/20"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    {/* Number badge */}
                    <span
                      className={`text-xl sm:text-2xl font-mono font-extrabold tracking-tight transition-colors ${
                        isActive ? "text-brand-600" : "text-slate-300 group-hover:text-slate-400"
                      }`}
                    >
                      {prob.num}
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg sm:text-xl font-bold text-navy-950 group-hover:text-brand-700 transition-colors">
                          &ldquo;{prob.quote}&rdquo;
                        </h3>
                        <div
                          className={`p-2 rounded-lg transition-colors ${
                            isActive
                              ? "bg-brand-100 text-brand-700"
                              : "bg-slate-100 text-slate-500 group-hover:text-navy-900"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>

                      <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                        {prob.detail}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                        <span className="text-slate-500">
                          Operational risk:{" "}
                          <span className="font-semibold text-rose-600">
                            {prob.impact}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transition Visually into "Fietra changes that." */}
        <div className="mt-20 pt-10 border-t border-slate-200 text-center flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-50 text-brand-600 border border-brand-100 mb-4 animate-bounce">
            <ArrowDown className="h-5 w-5" />
          </div>

          <span className="text-sm font-bold uppercase tracking-widest text-brand-600">
            The Modern Solution
          </span>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight mt-2">
            Fietra changes that.
          </h3>
          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-xl">
            A single, intelligent platform built from the ground up for teams that never sit still.
          </p>
        </div>
      </Container>
    </section>
  );
}
