"use client";

import React from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import {
  Briefcase,
  Wrench,
  Truck,
  HardHat,
  ArrowRight,
  MapPin,
  Route,
  Clock,
  ShieldCheck,
} from "lucide-react";

interface IndustriesPreviewProps {
  onOpenDemo: () => void;
}

export function IndustriesPreview({ onOpenDemo }: IndustriesPreviewProps) {
  const industries = [
    {
      title: "Field Sales",
      subtitle: "B2B Sales Reps & Territory Account Managers",
      stat: "+38% Client Visits",
      statDesc: "More verified client visits logged per rep each week",
      icon: Briefcase,
      color: "from-blue-600 to-indigo-700",
      accentBg: "bg-blue-50 text-blue-700 border-blue-200",
      mapVisual: (
        <div className="relative h-28 rounded-xl bg-slate-100 border border-slate-200/90 overflow-hidden p-2.5">
          <div className="absolute inset-0 bg-grid-subtle opacity-60" />
          <svg className="w-full h-full" viewBox="0 0 200 80">
            <path
              d="M 20,60 Q 70,20 120,50 T 180,25"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeDasharray="4 2"
            />
            <circle cx="20" cy="60" r="4" fill="#2563eb" />
            <circle cx="120" cy="50" r="4" fill="#8b5cf6" />
            <circle cx="180" cy="25" r="5" fill="#10b981" />
          </svg>
          <div className="absolute bottom-2 left-2 text-[10px] font-bold text-navy-900 bg-white/95 px-1.5 py-0.5 rounded shadow-xs border border-slate-200">
            3 Client Visits Geo-Verified
          </div>
        </div>
      ),
      points: [
        "Automatic client check-in via GPS geofence",
        "Digital meeting notes and order taking",
        "Expense and mileage audit trails",
      ],
    },
    {
      title: "Field Service",
      subtitle: "HVAC, Telecom, Equipment & Maintenance Engineers",
      stat: "26 Min Faster",
      statDesc: "Average reduction in emergency ticket response time",
      icon: Wrench,
      color: "from-emerald-600 to-teal-700",
      accentBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      mapVisual: (
        <div className="relative h-28 rounded-xl bg-slate-100 border border-slate-200/90 overflow-hidden p-2.5">
          <div className="absolute inset-0 bg-grid-subtle opacity-60" />
          <svg className="w-full h-full" viewBox="0 0 200 80">
            <path
              d="M 30,30 L 90,65 L 170,20"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
            />
            <circle cx="30" cy="30" r="4" fill="#10b981" />
            <circle cx="90" cy="65" r="4" fill="#10b981" />
            <circle cx="170" cy="20" r="5" fill="#2563eb" />
          </svg>
          <div className="absolute bottom-2 left-2 text-[10px] font-bold text-navy-900 bg-white/95 px-1.5 py-0.5 rounded shadow-xs border border-slate-200">
            Dispatch Nearest Tech (&lt;4 km)
          </div>
        </div>
      ),
      points: [
        "Smart dispatch to nearest available technician",
        "Time-on-site proof for work order billing",
        "Parts delivery and tool tracking",
      ],
    },
    {
      title: "Logistics & Delivery",
      subtitle: "Last-Mile Couriers, Distribution & Fleet Drivers",
      stat: "22% Fuel Saved",
      statDesc: "Reduction in unauthorized detours and idle engine burn",
      icon: Truck,
      color: "from-amber-600 to-orange-700",
      accentBg: "bg-amber-50 text-amber-800 border-amber-200",
      mapVisual: (
        <div className="relative h-28 rounded-xl bg-slate-100 border border-slate-200/90 overflow-hidden p-2.5">
          <div className="absolute inset-0 bg-grid-subtle opacity-60" />
          <svg className="w-full h-full" viewBox="0 0 200 80">
            <path
              d="M 10,40 C 60,10 130,70 190,40"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
            />
            <circle cx="10" cy="40" r="4" fill="#f59e0b" />
            <circle cx="190" cy="40" r="5" fill="#10b981" />
          </svg>
          <div className="absolute bottom-2 left-2 text-[10px] font-bold text-navy-900 bg-white/95 px-1.5 py-0.5 rounded shadow-xs border border-slate-200">
            Fleet Speed & Idle Monitoring
          </div>
        </div>
      ),
      points: [
        "Live vehicle route and speed alerts",
        "Proof of delivery with geo-stamped photos",
        "Accurate route mileage reimbursement",
      ],
    },
    {
      title: "Construction",
      subtitle: "General Contractors, Subcontractors & Inspectors",
      stat: "Zero Proxy Punches",
      statDesc: "100% verified on-site hours for compliance & payroll",
      icon: HardHat,
      color: "from-purple-600 to-indigo-800",
      accentBg: "bg-purple-50 text-purple-700 border-purple-200",
      mapVisual: (
        <div className="relative h-28 rounded-xl bg-slate-100 border border-slate-200/90 overflow-hidden p-2.5">
          <div className="absolute inset-0 bg-grid-subtle opacity-60" />
          <svg className="w-full h-full" viewBox="0 0 200 80">
            <polygon
              points="40,20 160,15 150,65 50,70"
              fill="#8b5cf6"
              fillOpacity="0.2"
              stroke="#8b5cf6"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <circle cx="100" cy="42" r="5" fill="#8b5cf6" />
          </svg>
          <div className="absolute bottom-2 left-2 text-[10px] font-bold text-navy-900 bg-white/95 px-1.5 py-0.5 rounded shadow-xs border border-slate-200">
            Jobsite Perimeter Geofence
          </div>
        </div>
      ),
      points: [
        "Virtual geofences around multiple job sites",
        "Subcontractor shift duration certification",
        "Safety compliance and emergency roll-call",
      ],
    },
  ];

  return (
    <section id="industries" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <Container size="wide">
        <SectionHeader
          badge="Specialized Operations"
          title="Built for teams that never sit still."
          subtitle="Whether managing pharmaceutical sales reps or heavy civil construction crews, Fietra adapts to your operational workflows."
          align="center"
        />

        {/* 4 Industry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.title}
                className="group rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-card-hover hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-11 w-11 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100/80 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${ind.accentBg}`}>
                      {ind.stat}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-950 group-hover:text-brand-600 transition-colors">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {ind.subtitle}
                  </p>

                  {/* Subtle map visual per card */}
                  <div className="mt-4 mb-5">
                    {ind.mapVisual}
                  </div>

                  {/* Feature bullet list */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    {ind.points.map((pt) => (
                      <div key={pt} className="flex items-start gap-2">
                        <span className="text-brand-600 font-bold">✓</span>
                        <span className="leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={onOpenDemo}
                    className="w-full text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center justify-center gap-1 group-hover:underline"
                  >
                    <span>View {ind.title} Blueprint</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link at bottom */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenDemo}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-brand-600 hover:text-brand-700 hover:underline"
          >
            <span>Explore all industry solutions and custom integrations</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </Container>
    </section>
  );
}
