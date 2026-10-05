"use client";

import React from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { HeroMapVisual } from "./HeroMapVisual";
import { HeroBackground } from "./HeroBackground";
import { ArrowRight, ChevronDown } from "lucide-react";

interface HeroProps {
  onOpenDemo: () => void;
}

export function Hero({ onOpenDemo }: HeroProps) {
  return (
    <section
      className="relative pt-32 sm:pt-36 pb-20 sm:pb-28 overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Rich Tracking-Themed Animated Background */}
      <HeroBackground />

      <Container size="wide">
        {/* Centered Content Block */}
        <div className="flex flex-col items-center text-center relative z-10">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 shadow-xs mb-8 hover:border-brand-400/40 transition-colors backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="font-semibold text-brand-400">
              Offline-First Engine
            </span>
            <span className="text-white/20">|</span>
            <span className="text-slate-400">
              Zero data loss on low connectivity
            </span>
            <ArrowRight className="h-3 w-3 text-slate-500" />
          </div>

          {/* Main Centered Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-extrabold tracking-tight text-white leading-[1.08] max-w-5xl">
            Know where your{" "}
            <span className="text-brand-400 relative inline-block">
              field team
              <svg
                className="absolute left-0 -bottom-1.5 w-full h-2 text-brand-500/40 -z-10"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,8 Q50,0 100,8"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            is.
            <br />
            Know what they&apos;re doing.
          </h1>

          {/* Centered Supporting Text */}
          <p className="mt-6 sm:mt-8 text-lg sm:text-xl text-slate-400 font-normal leading-relaxed max-w-2xl">
            Fietra connects GPS tracking, attendance, visits, routes and field
            activity in one powerful platform — even when connectivity
            isn&apos;t available.
          </p>

          {/* Centered CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenDemo}
              className="text-base px-8 py-4 shadow-lg shadow-brand-600/30"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Book a Demo
            </Button>

            <Button
              variant="secondary"
              size="lg"
              href="#live-tracking"
              className="text-base px-7 py-4 bg-white/5 border-white/15 text-white hover:bg-white/10 hover:border-white/25"
              icon={<ChevronDown className="h-4 w-4 text-slate-400" />}
            >
              See How It Works
            </Button>
          </div>

          {/* Product Dashboard Visual */}
          <div className="mt-14 sm:mt-16 w-full max-w-[1000px] mx-auto relative rounded-2xl sm:rounded-3xl">
            {/* Glow effect behind the dashboard */}
            <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-tr from-brand-600/20 via-blue-500/15 to-purple-500/15 rounded-3xl blur-2xl -z-10" />

            {/* Shadow and border container — GPU layer promoted */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 transform-gpu">
              <HeroMapVisual />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

