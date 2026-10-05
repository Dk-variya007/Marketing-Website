"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { StatusBadge, FieldStatusType } from "./StatusBadge";
import { Battery, Signal, Navigation, MapPin } from "lucide-react";

export interface EmployeeData {
  id: string;
  name: string;
  role?: string;
  avatarBg?: string;
  initials: string;
  status: FieldStatusType;
  statusText?: string;
  distanceKm: string;
  duration?: string;
  currentLocation?: string;
  battery?: number;
  batteryCharging?: boolean;
  network?: "4G" | "5G" | "Offline" | "Synced";
  lastSync?: string;
}

interface MapCardProps {
  employee: EmployeeData;
  compact?: boolean;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

export function MapCard({
  employee,
  compact = false,
  className,
  onClick,
  selected = false,
}: MapCardProps) {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        clsx(
          "bg-white/95 backdrop-blur-md rounded-xl border transition-all duration-200 shadow-md",
          selected
            ? "border-brand-500 ring-2 ring-brand-500/20 shadow-lg"
            : "border-slate-200/90 hover:border-slate-300 hover:shadow-lg",
          compact ? "p-2.5 min-w-[190px]" : "p-3.5 min-w-[240px]",
          onClick && "cursor-pointer",
          className
        )
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {/* Avatar with status ring */}
          <div className="relative">
            <div
              className={clsx(
                "h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-inner",
                employee.avatarBg || "bg-gradient-to-br from-brand-600 to-indigo-700"
              )}
            >
              {employee.initials}
            </div>
            {/* Status dot */}
            <span
              className={clsx(
                "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white",
                employee.status === "tracking" || employee.status === "active"
                  ? "bg-emerald-500"
                  : employee.status === "on-visit"
                  ? "bg-purple-500"
                  : employee.status === "break"
                  ? "bg-amber-500"
                  : "bg-rose-500"
              )}
            />
          </div>

          <div>
            <div className="font-semibold text-xs sm:text-sm text-navy-900 leading-tight">
              {employee.name}
            </div>
            {employee.role && (
              <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                {employee.role}
              </div>
            )}
          </div>
        </div>

        <StatusBadge
          status={employee.status}
          label={employee.statusText}
          size="sm"
        />
      </div>

      {!compact && (
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1 font-medium text-navy-800">
            <Navigation className="h-3 w-3 text-brand-600 shrink-0" />
            <span>{employee.distanceKm}</span>
          </div>

          {employee.currentLocation && (
            <div className="flex items-center gap-1 truncate max-w-[110px]" title={employee.currentLocation}>
              <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
              <span className="truncate">{employee.currentLocation}</span>
            </div>
          )}

          {employee.battery !== undefined && (
            <div className="flex items-center gap-1">
              <Battery className="h-3 w-3 text-slate-400" />
              <span>{employee.battery}%</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
