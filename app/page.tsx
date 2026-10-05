"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import { TrustStrip } from "@/components/trust/TrustStrip";
import { ProblemSection } from "@/components/problem/ProblemSection";
import { ProductPillars } from "@/components/features/ProductPillars";
import { LiveTrackingShowcase } from "@/components/live-tracking/LiveTrackingShowcase";
import { OfflineFirstSection } from "@/components/offline-tracking/OfflineFirstSection";
import { FieldVisibilitySection } from "@/components/visibility/FieldVisibilitySection";
import { IndustriesPreview } from "@/components/industries/IndustriesPreview";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { Footer } from "@/components/footer/Footer";
import { DemoModal } from "@/components/ui/DemoModal";

export default function HomePage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleOpenDemo = () => {
    setDemoModalOpen(true);
  };

  const handleCloseDemo = () => {
    setDemoModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-white text-navy-950 font-sans selection:bg-brand-600 selection:text-white overflow-x-hidden">
      {/* Sticky Header Navigation */}
      <Navbar onOpenDemo={handleOpenDemo} />

      {/* Main Landing Page Content */}
      <main>
        {/* 1. Hero Section */}
        <Hero onOpenDemo={handleOpenDemo} />

        {/* 2. Trust Strip */}
        <TrustStrip />

        {/* 3. Problem Section */}
        <ProblemSection />

        {/* 4. Product Pillars (6 Core Feature Cards) */}
        <ProductPillars />

        {/* 5. Live Tracking Showcase */}
        <LiveTrackingShowcase />

        {/* 6. Offline-First Differentiator Section */}
        <OfflineFirstSection />

        {/* 7. Field Visibility Section (Track -> Understand -> Act) */}
        <FieldVisibilitySection />

        {/* 9. Industries Preview */}
        <IndustriesPreview onOpenDemo={handleOpenDemo} />

        {/* 11. Final High-Impact CTA */}
        <FinalCTA onOpenDemo={handleOpenDemo} />
      </main>

      {/* Footer */}
      <Footer onOpenDemo={handleOpenDemo} />

      {/* Interactive Book a Demo Modal */}
      <DemoModal isOpen={demoModalOpen} onClose={handleCloseDemo} />
    </div>
  );
}
