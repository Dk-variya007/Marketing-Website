"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { DemoModal } from "@/components/ui/DemoModal";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TrackingMapStory } from "./TrackingMapStory";

export function TrackingMapPage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const openDemo = () => setDemoModalOpen(true);

  return (
    <div className="relative min-h-screen bg-white text-navy-950 font-sans overflow-x-clip">
      <Navbar onOpenDemo={openDemo} />

      <main>
        <section className="relative overflow-hidden bg-slate-50 pt-32 pb-10 sm:pt-40 sm:pb-14">
          <div className="absolute inset-0 bg-grid-subtle opacity-60 pointer-events-none" />
          <Container className="relative">
            <SectionHeader
              badge="Tracking Map"
              title={
                <>
                  Follow the route. <br />
                  <span className="text-brand-600">See every stage as it happens.</span>
                </>
              }
              subtitle="A top-down view of one field day. Scroll to drive the route. At each stop, the map plays that stage and the live status updates beside it."
              align="center"
              className="mb-6 sm:mb-8"
            />
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-500">
                Scroll to follow the route
                <ChevronDown className="h-4 w-4 animate-bounce" />
              </span>
            </div>
          </Container>
        </section>

        <TrackingMapStory />

        <FinalCTA onOpenDemo={openDemo} />
      </main>

      <Footer onOpenDemo={openDemo} />
      <DemoModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </div>
  );
}
