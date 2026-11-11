import React from "react";
import { clsx } from "clsx";

export function ComingSoonBadge({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        tone === "dark" ? "border-amber-400/30 bg-amber-400/10 text-amber-300" : "border-amber-200 bg-amber-50 text-amber-700",
        className
      )}
    >
      <span className={clsx("h-1.5 w-1.5 rounded-full", tone === "dark" ? "bg-amber-300" : "bg-amber-500")} />
      Coming soon
    </span>
  );
}
