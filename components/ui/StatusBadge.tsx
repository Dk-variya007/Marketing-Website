import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type FieldStatusType =
  | "active"
  | "tracking"
  | "on-visit"
  | "break"
  | "offline"
  | "synced";

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: FieldStatusType;
  label?: string;
  showPulse?: boolean;
  size?: "sm" | "md";
}

export function StatusBadge({
  status,
  label,
  showPulse = true,
  size = "md",
  className,
  ...props
}: StatusBadgeProps) {
  const statusConfig: Record<
    FieldStatusType,
    { text: string; bg: string; textCol: string; border: string; dot: string; pulse: string }
  > = {
    active: {
      text: "Active",
      bg: "bg-emerald-50",
      textCol: "text-emerald-700",
      border: "border-emerald-200",
      dot: "bg-emerald-500",
      pulse: "bg-emerald-400",
    },
    tracking: {
      text: "Tracking",
      bg: "bg-emerald-50",
      textCol: "text-emerald-700",
      border: "border-emerald-200",
      dot: "bg-emerald-500",
      pulse: "bg-emerald-400",
    },
    "on-visit": {
      text: "On Visit",
      bg: "bg-purple-50",
      textCol: "text-purple-700",
      border: "border-purple-200",
      dot: "bg-purple-500",
      pulse: "bg-purple-400",
    },
    break: {
      text: "On Break",
      bg: "bg-amber-50",
      textCol: "text-amber-800",
      border: "border-amber-200",
      dot: "bg-amber-500",
      pulse: "bg-amber-400",
    },
    offline: {
      text: "Offline",
      bg: "bg-rose-50",
      textCol: "text-rose-700",
      border: "border-rose-200",
      dot: "bg-rose-500",
      pulse: "bg-rose-400",
    },
    synced: {
      text: "Synced",
      bg: "bg-blue-50",
      textCol: "text-blue-700",
      border: "border-blue-200",
      dot: "bg-blue-500",
      pulse: "bg-blue-400",
    },
  };

  const config = statusConfig[status];
  const displayText = label || config.text;

  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center gap-1.5 font-medium border rounded-full select-none",
          config.bg,
          config.textCol,
          config.border,
          size === "sm" ? "text-[11px] px-2 py-0.5" : "text-xs px-2.5 py-1",
          className
        )
      )}
      {...props}
    >
      <span className="relative flex h-2 w-2">
        {showPulse && (status === "tracking" || status === "active" || status === "on-visit") && (
          <span
            className={clsx(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              config.pulse
            )}
          />
        )}
        <span
          className={clsx("relative inline-flex rounded-full h-2 w-2", config.dot)}
        />
      </span>
      <span>{displayText}</span>
    </span>
  );
}
