import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "brand" | "neutral" | "success" | "warning" | "error" | "dark";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  children,
  variant = "brand",
  size = "md",
  dot = false,
  className,
  ...props
}: BadgeProps) {
  const variants = {
    brand: "bg-brand-50 text-brand-700 border-brand-200/80",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    error: "bg-rose-50 text-rose-700 border-rose-200",
    dark: "bg-navy-900 text-slate-200 border-navy-700/60",
  };

  const dotColors = {
    brand: "bg-brand-500",
    neutral: "bg-slate-400",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    error: "bg-rose-500",
    dark: "bg-brand-400",
  };

  const sizes = {
    sm: "text-xs px-2.5 py-0.5 font-medium",
    md: "text-xs sm:text-sm px-3 py-1 font-medium",
  };

  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center gap-1.5 rounded-full border tracking-wide select-none",
          variants[variant],
          sizes[size],
          className
        )
      )}
      {...props}
    >
      {dot && (
        <span
          className={clsx(
            "w-1.5 h-1.5 rounded-full shrink-0",
            dotColors[variant]
          )}
        />
      )}
      {children}
    </span>
  );
}
