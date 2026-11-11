import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { DemoButton } from "../demo/DemoButton";
import { HeroMapVisual } from "./HeroMapVisual";
import { HeroBackground } from "./HeroBackground";
import { HeroScrollReveal } from "./HeroScrollReveal";
import { ArrowRight, ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-[#040810] pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      {/* Rich Tracking-Themed Animated Background */}
      <HeroBackground />

      <Container size="wide">
        {/* Centered Content Block */}
        <div className="flex flex-col items-center text-center relative z-10">
          {/* Eyebrow Badge — Fade In Animation */}
          <div className="hero-in" style={{ "--hero-dy": "16px", animationDuration: "0.5s" } as React.CSSProperties}>
            <Link
              href="/product/offline-tracking"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 shadow-xs mb-8 hover:border-brand-400/40 transition-colors"
            >
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="font-semibold text-brand-400">
                Offline-First Engine
              </span>
              <span className="text-white/20">|</span>
              <span className="text-slate-400">
                Zero data loss on low connectivity
              </span>
              <ArrowRight className="h-3 w-3 text-slate-500" />
            </Link>
          </div>

          {/* Main Centered Headline — Fade In Animation */}
          <h1
            id="hero-title"
            className="hero-title-in text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-extrabold tracking-tight text-white leading-[1.08] max-w-5xl"
          >
            Know where your{" "}
            <span className="text-brand-400 relative inline-block">
              field team
              <svg
                aria-hidden="true"
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

          {/* Centered Supporting Text — Fade In Animation */}
          <p
            style={{ animationDelay: "0.2s" }}
            className="hero-in mt-6 sm:mt-8 text-lg sm:text-xl text-slate-400 font-normal leading-relaxed max-w-2xl"
          >
            Fietra connects GPS tracking, attendance, visits, routes and field
            activity in one powerful platform — even when connectivity
            isn&apos;t available.
          </p>

          {/* Centered CTA Buttons — Fade In Animation */}
          <div
            style={{ animationDelay: "0.3s" }}
            className="hero-in mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <DemoButton size="lg" className="text-base px-8 py-4 shadow-lg shadow-brand-600/30" />

            <Button
              variant="secondary"
              size="lg"
              href="#how-it-works"
              className="text-base px-7 py-4 bg-white/5 border-white/15 text-white hover:bg-white/10 hover:border-white/25"
              icon={<ChevronDown className="h-4 w-4 text-slate-400" />}
            >
              See How It Works
            </Button>
          </div>

          {/* Product preview — fades in on load, then grows to full size as you scroll (HeroScrollReveal) */}
          <div
            style={{ animationDelay: "0.35s" }}
            className="hero-in mt-10 sm:mt-14 w-full max-w-[1040px] mx-auto relative"
          >
            <HeroScrollReveal>
              <div className="relative rounded-2xl sm:rounded-3xl">
                <div className="absolute -inset-6 sm:-inset-12 -z-10 rounded-[48px] bg-[radial-gradient(ellipse_at_30%_70%,rgba(37,99,235,0.22),transparent_60%),radial-gradient(ellipse_at_75%_30%,rgba(139,92,246,0.16),transparent_60%)]" />
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
                  <HeroMapVisual />
                </div>
              </div>
            </HeroScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
