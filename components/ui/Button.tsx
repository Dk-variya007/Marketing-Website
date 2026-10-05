"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  fullWidth = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-lg";

  const variants = {
    primary:
      "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm hover:shadow-glow-blue border border-brand-500/20",
    secondary:
      "bg-white text-navy-900 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-sm active:bg-slate-100",
    dark:
      "bg-navy-950 text-white hover:bg-navy-900 border border-navy-800/80 shadow-sm hover:shadow-md",
    outline:
      "bg-transparent text-navy-850 hover:bg-slate-100/70 border border-slate-300 hover:border-slate-400",
    ghost:
      "bg-transparent text-slate-700 hover:text-navy-900 hover:bg-slate-100/60",
  };

  const sizes = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5 font-medium",
    md: "text-sm px-4.5 py-2.5 gap-2 font-medium tracking-tight",
    lg: "text-base px-6 py-3.5 gap-2.5 font-semibold",
  };

  const combinedClasses = twMerge(
    clsx(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth && "w-full",
      className
    )
  );

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
