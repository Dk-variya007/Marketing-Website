import React from "react";
import Link from "next/link";
import { clsx } from "clsx";

/** Fietra wordmark + geometric GPS emblem, shared by the header and footer. */
export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="Fietra home" className={clsx("group flex items-center gap-2.5", className)}>
      <span
        className={clsx(
          "flex items-center justify-center rounded-xl bg-navy-950 text-white shadow-md transition-colors duration-200 group-hover:bg-brand-600",
          compact ? "h-8 w-8" : "h-9 w-9"
        )}
      >
        <svg width={compact ? 18 : 20} height={compact ? 18 : 20} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2L20.5 7V17L12 22L3.5 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 6V18" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" fill="#38bdf8" />
          {!compact && <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />}
        </svg>
      </span>
      <span className="flex flex-col">
        <span className="text-xl font-bold tracking-tight text-navy-950">
          Fie<span className="text-brand-600">tra</span>
        </span>
        {!compact && (
          <span className="-mt-1 hidden text-[9px] font-semibold uppercase tracking-widest text-slate-600 sm:block">Field Operations OS</span>
        )}
      </span>
    </Link>
  );
}
