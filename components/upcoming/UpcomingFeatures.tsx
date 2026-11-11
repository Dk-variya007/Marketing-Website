import React from "react";
import { Check } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { ComingSoonBadge } from "./ComingSoonBadge";
import { UPCOMING_FEATURES } from "@/lib/upcoming";

/** Full detail for each upcoming attendance / expense feature, each with its own anchor. */
export function UpcomingFeatures() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container size="wide">
        <SectionHeader
          badge="Attendance & expenses"
          title="Less paperwork for every working day"
          subtitle="Three new modules that close the loop between the route, the timesheet and the reimbursement."
          align="center"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {UPCOMING_FEATURES.map((f) => (
            <article key={f.id} id={f.id} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-600">
                  <f.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <ComingSoonBadge />
              </div>
              <h3 className="mt-5 text-xl font-bold text-navy-950">{f.name}</h3>
              <p className="mt-1 text-sm font-semibold text-brand-600">{f.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.description}</p>
              <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                {f.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
