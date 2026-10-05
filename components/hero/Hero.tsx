"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { HeroMapVisual } from "./HeroMapVisual";
import { HeroBackground } from "./HeroBackground";
import { ArrowRight, ChevronDown } from "lucide-react";

interface HeroProps {
  onOpenDemo: () => void;
}

// Snappy spring config: responsive and instant, zero ghost gliding on tab switch
const SPRING_CONFIG = { stiffness: 120, damping: 24, mass: 0.2 };

export function Hero({ onOpenDemo }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress through the hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Smooth the raw scroll value with a responsive spring
  const smoothProgress = useSpring(scrollYProgress, SPRING_CONFIG);

  // When mounting or returning to Product page at scroll 0, reset spring immediately
  useEffect(() => {
    if (typeof window !== "undefined" && window.scrollY < 20) {
      smoothProgress.set(0);
    }
  }, [smoothProgress]);

  // When scrolling down, tracking image gets bigger and fully opaque, safely bounded so it never frames out
  const imageScale = useTransform(smoothProgress, [0, 0.4], [0.82, 0.96]);
  const imageOpacity = useTransform(smoothProgress, [0, 0.22], [0.65, 1]);
  const imageY = useTransform(smoothProgress, [0, 0.4], [35, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative pt-28 sm:pt-34 pb-14 sm:pb-20 overflow-hidden min-h-[120vh]"
    >
      {/* Rich Tracking-Themed Animated Background */}
      <HeroBackground />

      <Container size="wide">
        {/* Centered Content Block */}
        <div className="flex flex-col items-center text-center relative z-10">
          {/* Eyebrow Badge — Fade In Animation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.div>

          {/* Main Centered Headline — Fade In Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-extrabold tracking-tight text-white leading-[1.08] max-w-5xl"
          >
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
          </motion.h1>

          {/* Centered Supporting Text — Fade In Animation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 sm:mt-8 text-lg sm:text-xl text-slate-400 font-normal leading-relaxed max-w-2xl"
          >
            Fietra connects GPS tracking, attendance, visits, routes and field
            activity in one powerful platform — even when connectivity
            isn&apos;t available.
          </motion.p>

          {/* Centered CTA Buttons — Fade In Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
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
          </motion.div>

          {/* Product Dashboard Visual — Gets Bigger & Scales Up Smoothly When Scrolling */}
          <motion.div
            style={{
              scale: imageScale,
              opacity: imageOpacity,
              y: imageY,
              willChange: "transform, opacity",
            }}
            className="mt-10 sm:mt-14 w-full max-w-[820px] mx-auto relative rounded-2xl sm:rounded-3xl"
          >
            {/* Glow effect behind the dashboard */}
            <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-tr from-brand-600/20 via-blue-500/15 to-purple-500/15 rounded-3xl blur-2xl -z-10" />

            {/* Shadow and border container — GPU layer promoted */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 transform-gpu">
              <HeroMapVisual />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
