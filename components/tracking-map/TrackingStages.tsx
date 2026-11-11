import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { SECTIONS } from "./stages";
import { TRACKING_MAP_PATH } from "@/lib/site";

interface TrackingStagesProps {
  id?: string;
  badge?: string;
  title: React.ReactNode;
  subtitle: string;
  /** Extra content under the stage grid (CTAs, related links). */
  footer?: React.ReactNode;
}

/**
 * The six stages of a tracked field day as plain, server-rendered content. On the home page it's the
 * light-weight preview of the Tracking Map; on the Tracking Map page it's the crawlable recap of the
 * scroll story (whose chapters only render one at a time).
 */
export function TrackingStages({ id, badge = "How Tracking Works", title, subtitle, footer }: TrackingStagesProps) {
  return (
    <section id={id} className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
      <Container size="wide" className="relative">
        <SectionHeader badge={badge} badgeVariant="dark" title={title} subtitle={subtitle} theme="dark" align="center" />

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s, i) => {
            const Icon = s.points[0].icon;
            return (
              <li key={s.milestone} className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-brand-400">
                    {String(i + 1).padStart(2, "0")}
                    <span className="text-slate-600"> / {String(SECTIONS.length).padStart(2, "0")}</span>
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-brand-300">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{s.milestone}</p>
                <h3 className="mt-1 text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.description}</p>
              </li>
            );
          })}
        </ol>

        {footer ?? (
          <div className="mt-12 flex justify-center">
            <Link
              href={TRACKING_MAP_PATH}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/30 transition-colors hover:bg-brand-700"
            >
              Follow a full day on the Tracking Map <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
