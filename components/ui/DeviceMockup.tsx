import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ShieldCheck, Wifi, Battery } from "lucide-react";

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
  notch?: boolean;
}

export function PhoneMockup({
  children,
  className,
  notch = true,
}: PhoneMockupProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "relative mx-auto rounded-[40px] border-[8px] border-navy-950 bg-navy-950 shadow-2xl p-2.5 overflow-hidden",
          "w-full max-w-[320px] sm:max-w-[340px] aspect-[9/18]",
          className
        )
      )}
    >
      {/* Outer rim glare */}
      <div className="absolute inset-0 rounded-[32px] border border-white/10 pointer-events-none z-30" />

      {/* Dynamic island / Notch */}
      {notch && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-navy-950 rounded-full z-40 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-2" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
        </div>
      )}

      {/* Screen container */}
      <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-white flex flex-col z-20">
        {/* Mobile Status Bar */}
        <div className="h-9 px-5 pt-2 flex items-center justify-between text-[11px] font-semibold text-slate-700 select-none bg-slate-50/80 backdrop-blur border-b border-slate-100">
          <span>09:41</span>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Wifi className="h-3 w-3" />
            <span className="text-[10px]">5G</span>
            <Battery className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}

interface BrowserMockupProps {
  children: React.ReactNode;
  url?: string;
  className?: string;
  title?: string;
}

export function BrowserMockup({
  children,
  url = "https://app.fietra.com/operations/live-map",
  title = "Fietra Operations Console",
  className,
}: BrowserMockupProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "rounded-2xl border border-slate-200/90 bg-white shadow-2xl overflow-hidden flex flex-col",
          className
        )
      )}
    >
      {/* Browser Bar */}
      <div className="h-11 px-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-rose-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>

        {/* Address pill */}
        <div className="flex-1 max-w-md mx-auto h-7 px-3 rounded-md bg-white border border-slate-200/80 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-mono truncate">
          <ShieldCheck className="h-3 w-3 text-emerald-500 shrink-0" />
          <span className="truncate">{url}</span>
        </div>

        <div className="text-[11px] font-medium text-slate-400 shrink-0 hidden sm:block">
          {title}
        </div>
      </div>

      {/* Viewport Content */}
      <div className="relative flex-1 overflow-hidden bg-slate-50">
        {children}
      </div>
    </div>
  );
}
