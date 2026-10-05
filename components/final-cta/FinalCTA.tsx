"use client";

import React from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { ArrowRight, ShieldCheck, Zap, Sparkles, MapPin } from "lucide-react";

interface FinalCTAProps {
  onOpenDemo: () => void;
}

export function FinalCTA({ onOpenDemo }: FinalCTAProps) {
  return (
    <section className="py-24 sm:py-32 bg-navy-950 text-white relative overflow-hidden">
      {/* Background Dark Map Grid & Connected Nodes */}
      <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />

      {/* Atmospheric Radial Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-brand-600/20 via-indigo-600/20 to-emerald-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Background SVG Connected Location Points */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 100,200 Q 300,100 500,280 T 900,150 T 1300,300"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <circle cx="100" cy="200" r="4" fill="#38bdf8" />
        <circle cx="500" cy="280" r="4" fill="#38bdf8" />
        <circle cx="900" cy="150" r="4" fill="#34d399" />
        <circle cx="1300" cy="300" r="4" fill="#38bdf8" />
      </svg>

      <Container size="default" className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900 border border-navy-700/80 text-xs font-semibold text-brand-300 mb-6">
          <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
          <span>Real-Time Visibility For Field Operations</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
          Bring your field team <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">
            into view.
          </span>
        </h2>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
          Track every journey. Verify every visit. Understand every working day.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={onOpenDemo}
            className="text-base px-8 py-4 shadow-xl shadow-brand-600/30"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Book a Demo
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={onOpenDemo}
            className="text-base px-8 py-4 bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30"
          >
            Get Started Free
          </Button>
        </div>

        {/* Enterprise trust points below CTA */}
        <div className="mt-12 pt-8 border-t border-navy-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>No credit card required</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-navy-700 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-400" />
            <span>14-day full pilot license</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-navy-700 hidden sm:block" />
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-400" />
            <span>Deploy to field team in 15 mins</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
