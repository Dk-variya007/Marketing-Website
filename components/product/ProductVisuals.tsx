import React from "react";
import { BarChart3, ClipboardList, MapPin, Navigation, Settings2, Zap } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";
import type { ProductSlug } from "@/lib/products";

// Small static product previews used on feature cards and product page heroes.

function LiveTrackingVisual() {
  return (
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
  );
}

function OfflineVisual() {
  return (
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
  );
}

function VisitVisual() {
  return (
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
  );
}

function ReportsVisual() {
  return (
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
  );
}

function RouteHistoryVisual() {
  return (
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
  );
}

function AttendanceVisual() {
  return (
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
  );
}

export const PRODUCT_VISUALS: Record<ProductSlug, React.FC> = {
  "live-tracking": LiveTrackingVisual,
  "offline-tracking": OfflineVisual,
  "visit-management": VisitVisual,
  "reports": ReportsVisual,
  "route-history": RouteHistoryVisual,
  "attendance-breaks": AttendanceVisual,
};
