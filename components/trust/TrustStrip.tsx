import React from "react";
import { Container } from "../ui/Container";
import {
  Briefcase,
  Wrench,
  Truck,
  Package,
  HardHat,
  Boxes,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

export function TrustStrip() {
  const industries = [
    { label: "FIELD SALES", icon: Briefcase, desc: "B2B sales reps & territory reps" },
    { label: "FIELD SERVICE", icon: Wrench, desc: "Technicians & on-site repairs" },
    { label: "LOGISTICS", icon: Truck, desc: "Fleet operations & long haul" },
    { label: "DELIVERY", icon: Package, desc: "Last-mile courier & dispatch" },
    { label: "CONSTRUCTION", icon: HardHat, desc: "Jobsite teams & contractors" },
    { label: "DISTRIBUTION", icon: Boxes, desc: "FMCG routes & retail replenishment" },
  ];

  return (
    <section className="border-y border-slate-200/80 bg-slate-50/70 py-10 sm:py-12 relative overflow-hidden">
      <Container size="wide">
        <div className="flex flex-col items-center text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
            Built for teams that move.
          </p>

          {/* Simple, pristine industry tags */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <div
                  key={ind.label}
                  className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-brand-400 hover:shadow-sm transition-all duration-200 group"
                >
                  <Icon className="h-5 w-5 text-slate-400 group-hover:text-brand-600 transition-colors mb-2" />
                  <span className="text-xs sm:text-sm font-bold tracking-wider text-navy-900 group-hover:text-brand-600 transition-colors">
                    {ind.label}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                    {ind.desc}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Enterprise reliability metrics strip */}
          <div className="mt-8 pt-6 border-t border-slate-200/60 w-full flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-bold text-navy-950 text-base">99.98%</span>
              <span className="text-slate-500">Offline Sync Reliability</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-navy-950 text-base">&lt; 10m</span>
              <span className="text-slate-500">Average GPS Accuracy</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-navy-950 text-base">0%</span>
              <span className="text-slate-500">Data Loss in Blind Zones</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-navy-950 text-base">3%</span>
              <span className="text-slate-500">Mobile Battery Consumption / Day</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
