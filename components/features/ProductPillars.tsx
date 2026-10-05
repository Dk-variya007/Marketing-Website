"use client";

import React from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { FeatureCard } from "../ui/FeatureCard";
import {
  Navigation,
  Route,
  CheckCircle2,
  Coffee,
  WifiOff,
  MapPin,
  Zap,
  FileBarChart2,
  ClipboardList,
  BarChart3,
  Settings2,
} from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";

export function ProductPillars() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-slate-50/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-subtle opacity-40 pointer-events-none" />

      <Container size="wide">
        <SectionHeader
          badge="Unified Operations Platform"
          title={
            <>
              One platform. <br />
              <span className="text-brand-600">Every field movement.</span>
            </>
          }
          subtitle="Fietra brings location, attendance, visits, routes and field activity together into a single cohesive system."
          align="center"
        />

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* 1. Live GPS Tracking */}
          <FeatureCard
            icon={<Navigation className="h-5 w-5" />}
            title="Live GPS Tracking"
            tag="Real-Time"
            description="Continuous high-accuracy location tracking with low battery impact. View live speeds, directions, and vehicle/walking states."
            visual={
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-1.5 font-semibold text-navy-900">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Live GPS Telemetry</span>
                  </div>
                  <span className="font-mono text-slate-500 text-[11px]">32 km/h</span>
                </div>
                <div className="h-16 rounded-lg bg-white border border-slate-200 relative overflow-hidden flex items-center justify-center">
                  {/* Mini radar grid */}
                  <div className="absolute inset-0 bg-grid-subtle opacity-60" />
                  <div className="relative flex items-center gap-2">
                    <div className="relative">
                      <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                        JD
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    </div>
                    <div className="text-[11px] leading-tight">
                      <div className="font-bold text-navy-900">John D.</div>
                      <div className="text-slate-500 text-[10px]">Moving • Sector 18</div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          {/* 2. Offline Tracking */}
          <FeatureCard
            icon={<WifiOff className="h-5 w-5" />}
            title="Offline Tracking"
            tag="Zero Loss"
            description="Proprietary SQLite local queue keeps recording GPS points without internet. Everything automatically synchronizes the second network returns."
            visual={
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-navy-900">Offline Buffer Queue</span>
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Auto-Sync Active
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-navy-900">Stored Locally</div>
                    <div className="text-[10px] text-slate-500">18 GPS Points Buffered</div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <Zap className="h-3.5 w-3.5" />
                    <span>0% Loss</span>
                  </div>
                </div>
              </div>
            }
          />

          {/* 3. Visit Management */}
          <FeatureCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            title="Visit Management"
            tag="Client Visits"
            description="Assign client destinations, track arrival notifications, verify on-site duration, and collect customer signatures & photo proof."
            visual={
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-navy-900">Client Appointment</span>
                  <StatusBadge status="on-visit" label="In Meeting" size="sm" />
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-purple-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-navy-900">MedLife Clinic</div>
                      <div className="text-[10px] text-slate-500">Duration: 42 min logged</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    Proof Attached ✓
                  </span>
                </div>
              </div>
            }
          />

          {/* 4. Reports */}
          <FeatureCard
            icon={<FileBarChart2 className="h-5 w-5" />}
            title="Reports"
            tag="Analytics"
            description="Access detailed tracking reports — distance, visits, breaks, idle time, attendance. Admins can build custom reports with flexible filters and schedules."
            visual={
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-navy-900">Report Center</span>
                  <span className="text-[11px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                    Custom Reports
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <BarChart3 className="h-3.5 w-3.5 text-brand-500" />
                      <span className="font-medium text-navy-900">Daily Distance Report</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Auto • 6 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <ClipboardList className="h-3.5 w-3.5 text-purple-500" />
                      <span className="font-medium text-navy-900">Visit Summary</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Weekly</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Settings2 className="h-3.5 w-3.5 text-slate-400" />
                      <span className="font-medium text-slate-600">+ Create Custom Report</span>
                    </div>
                    <span className="text-[10px] text-brand-500 font-semibold">Admin</span>
                  </div>
                </div>
              </div>
            }
          />

          {/* 5. Route History */}
          <FeatureCard
            icon={<Route className="h-5 w-5" />}
            title="Route History"
            tag="Audit Trail"
            description="Replay the exact path taken on any shift. Examine halts, speeds, detours, and timestamps with complete forensic fidelity."
            visual={
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-navy-900">Daily Travel Log</span>
                  <span className="font-mono text-slate-500 text-[11px]">34.2 km total</span>
                </div>
                <div className="h-16 rounded-lg bg-white border border-slate-200 px-3 flex items-center justify-between relative">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="font-medium">09:00 AM</span>
                  </div>
                  <div className="flex-1 mx-2 border-b-2 border-dashed border-blue-400 relative">
                    <Navigation className="h-3 w-3 text-brand-600 absolute left-1/2 -top-2" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <div className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span className="font-medium">06:15 PM</span>
                  </div>
                </div>
              </div>
            }
          />

          {/* 6. Break Tracking */}
          <FeatureCard
            icon={<Coffee className="h-5 w-5" />}
            title="Break Tracking"
            tag="Compliance"
            description="Allow field personnel to log meal, tea, and rest intervals. Ensure labor compliance while differentiating true idle time from breaks."
            visual={
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-navy-900">Rest Interval</span>
                  <StatusBadge status="break" label="Lunch Break" size="sm" />
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-navy-900">Break Duration</div>
                    <div className="text-[10px] text-slate-500">Limit: 45 min max</div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      24m 12s elapsed
                    </span>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </Container>
    </section>
  );
}
