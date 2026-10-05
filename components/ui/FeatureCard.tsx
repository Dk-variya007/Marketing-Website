"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag?: string;
  visual?: React.ReactNode;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  tag,
  visual,
  className,
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={twMerge(
        clsx(
          "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:border-brand-500/40 hover:shadow-card-hover",
          className
        )
      )}
    >
      {/* Background glow on hover */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-brand-500/5 blur-2xl transition-opacity duration-300 group-hover:opacity-100 group-hover:bg-brand-500/10" />

      <div>
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 border border-brand-100/80 transition-colors duration-200 group-hover:bg-brand-600 group-hover:text-white">
            {icon}
          </div>
          {tag && (
            <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
              {tag}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-navy-900 tracking-tight group-hover:text-brand-600 transition-colors duration-200">
          {title}
        </h3>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>

      {visual && (
        <div className="mt-6 pt-5 border-t border-slate-100/90">
          {visual}
        </div>
      )}
    </motion.div>
  );
}
