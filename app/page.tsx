import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { TrustStrip } from "@/components/trust/TrustStrip";
import { ProblemSection } from "@/components/problem/ProblemSection";
import { ProductPillars } from "@/components/features/ProductPillars";
import { TrackingStages } from "@/components/tracking-map/TrackingStages";
import { EmergencySOSSection } from "@/components/upcoming/EmergencySOSSection";
import { FieldVisibilitySection } from "@/components/visibility/FieldVisibilitySection";
import { IndustriesPreview } from "@/components/industries/IndustriesPreview";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationLd, softwareLd, websiteLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  alternates: { canonical: "/" },
};

// The home page tells the story; the detail lives on each product page.
//   1. Hero — what Fietra is            5. Field visibility — Track → Understand → Act
//   2. Trust strip — who it's for       6. Industries — real-world use cases
//   3. Problem — why it matters         7. Final call to action
//   4. Products → How tracking works → Emergency SOS + other upcoming features
export default function HomePage() {
  return (
    <main id="main" className="overflow-x-clip">
      <Hero />
      <TrustStrip />
      <ProblemSection />
      <ProductPillars />
      <TrackingStages
        id="how-it-works"
        title={
          <>
            One field day. <br />
            <span className="text-brand-400">Tracked from start to finish.</span>
          </>
        }
        subtitle="Start, break, resume, ride through a dead zone, check in to a visit and close the day — every stage is captured, even without internet."
      />
      <EmergencySOSSection showMore />
      <FieldVisibilitySection />
      <IndustriesPreview />
      <FinalCTA />
      <JsonLd
        data={[organizationLd, websiteLd, softwareLd(siteConfig.name, siteConfig.description, "/")]}
      />
    </main>
  );
}
