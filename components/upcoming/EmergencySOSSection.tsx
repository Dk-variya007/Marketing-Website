import React from "react";
import Link from "next/link";
import { ArrowRight, BellRing, MapPinned, PhoneCall, Siren } from "lucide-react";
import { Container } from "../ui/Container";
import { ComingSoonBadge } from "./ComingSoonBadge";
import { EMERGENCY_SOS, EMERGENCY_TYPES, SOS_FLOW, UPCOMING_FEATURES, UPCOMING_PATH, upcomingPath } from "@/lib/upcoming";

/** Static preview of the SOS screen + the manager's alert. CSS-only pulse, paused off screen. */
function SosPreview() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[420px]">
      {/* Phone */}
      <div className="relative mx-auto w-[250px] rounded-[2.2rem] border-[6px] border-navy-800 bg-navy-900 p-4 shadow-2xl shadow-black/50">
        <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-navy-700" />
        <p className="text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">Tracking active · 11.7 km</p>
        <div className="relative mx-auto my-6 flex h-32 w-32 items-center justify-center">
          <span className="absolute inset-0 animate-ping-slow rounded-full bg-rose-500/30" />
          <span className="absolute inset-3 rounded-full bg-rose-500/20" />
          <span className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full bg-rose-600 text-white shadow-[0_0_40px_rgba(244,63,94,0.55)]">
            <Siren className="h-7 w-7" />
            <span className="mt-1 text-sm font-extrabold tracking-wider">SOS</span>
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2.5 text-[11px] text-slate-200">
            <PhoneCall className="h-4 w-4 shrink-0 text-emerald-400" />
            Calling emergency contact…
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2.5 text-[11px] text-slate-200">
            <MapPinned className="h-4 w-4 shrink-0 text-sky-400" />
            Live location shared with manager
          </div>
        </div>
      </div>

      {/* Manager alert */}
      <div className="absolute -bottom-6 -right-2 w-[210px] rounded-2xl border border-rose-400/30 bg-navy-950 p-3.5 shadow-xl sm:-right-6">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-rose-300">
          <BellRing className="h-3.5 w-3.5" /> Emergency alert
        </div>
        <p className="mt-1.5 text-xs font-semibold text-white">Rahul S. raised an SOS</p>
        <p className="mt-0.5 text-[11px] text-slate-400">Ring Road, 2 min ago · location live</p>
      </div>
    </div>
  );
}

interface EmergencySOSSectionProps {
  /** Home page: also preview the other upcoming features and link to the roadmap page. */
  showMore?: boolean;
}

export function EmergencySOSSection({ showMore = false }: EmergencySOSSectionProps) {
  return (
    <section
      id="emergency-sos"
      aria-labelledby="emergency-sos-title"
      className="relative overflow-hidden bg-[#0b0710] py-24 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30" />
      <div className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[720px] bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.18),transparent_65%)]" />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-rose-300">
                <Siren className="h-3.5 w-3.5" /> Field safety
              </span>
              <ComingSoonBadge tone="dark" />
            </div>
            <h2 id="emergency-sos-title" className="mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              When something goes wrong on the road, <span className="text-rose-400">help is one tap away.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">{EMERGENCY_SOS.description}</p>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Built for every kind of emergency</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {EMERGENCY_TYPES.map(({ label, icon: Icon }) => (
                <li key={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200">
                  <Icon className="h-4 w-4 text-rose-300" aria-hidden="true" /> {label}
                </li>
              ))}
            </ul>
          </div>

          <SosPreview />
        </div>

        {/* How SOS works */}
        <ol className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SOS_FLOW.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-rose-300">{String(i + 1).padStart(2, "0")}</span>
                <s.icon className="h-4 w-4 text-slate-400" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-base font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.text}</p>
            </li>
          ))}
        </ol>

        {showMore && (
          <div className="mt-16 border-t border-white/10 pt-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">Also coming soon</p>
                <p className="mt-2 text-2xl font-bold">More for attendance and expenses</p>
              </div>
              <Link href={UPCOMING_PATH} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 hover:text-white">
                See all upcoming features <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {UPCOMING_FEATURES.map((f) => (
                <li key={f.id}>
                  <Link
                    href={upcomingPath(f.id)}
                    className="group flex h-full gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-amber-300/40"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                      <f.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-semibold text-white group-hover:text-amber-200">{f.name}</span>
                      <span className="mt-1 block text-sm text-slate-400">{f.tagline}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
