import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Badge } from "./Badge";

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: "brand" | "neutral" | "success" | "warning" | "error" | "dark";
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  badge,
  badgeVariant = "brand",
  title,
  subtitle,
  align = "center",
  theme = "light",
  className,
  titleClassName,
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={twMerge(
        clsx(
          "max-w-3xl flex flex-col mb-12 sm:mb-16",
          isCenter ? "mx-auto text-center items-center" : "text-left items-start",
          className
        )
      )}
    >
      {badge && (
        <Badge
          variant={badgeVariant}
          size="md"
          className="mb-4 shadow-sm"
        >
          {badge}
        </Badge>
      )}

      <h2
        className={twMerge(
          clsx(
            "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.12]",
            isDark ? "text-white" : "text-navy-900",
            titleClassName
          )
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={clsx(
            "mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl",
            isDark ? "text-slate-400" : "text-slate-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
