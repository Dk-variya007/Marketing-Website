import React from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag?: string;
  visual?: React.ReactNode;
  /** Makes the card a link to the feature's own page. */
  href?: string;
  className?: string;
}

// Hover lift is a CSS transform (compositor only) — no animation library needed for a hover state.
export function FeatureCard({ icon, title, description, tag, visual, href, className }: FeatureCardProps) {
  return (
    <article
      className={twMerge(
        clsx(
          "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-card-hover motion-reduce:hover:translate-y-0",
          className
        )
      )}
    >
      {/* Background glow on hover */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_65%)] opacity-50 transition-opacity duration-300 group-hover:opacity-100" />

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
          {href ? (
            // Stretched link: the whole card is clickable, but only the title is announced as the link.
            <Link href={href} className="after:absolute after:inset-0 after:content-['']">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">{description}</p>
      </div>

      {visual && <div className="mt-6 pt-5 border-t border-slate-100/90">{visual}</div>}

      {href && (
        <span aria-hidden="true" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
          Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      )}
    </article>
  );
}
