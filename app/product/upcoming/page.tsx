import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { DemoButton } from "@/components/demo/DemoButton";
import { EmergencySOSSection } from "@/components/upcoming/EmergencySOSSection";
import { UpcomingFeatures } from "@/components/upcoming/UpcomingFeatures";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { pageMetadata } from "@/lib/seo";
import { UPCOMING_PATH, upcomingPath } from "@/lib/upcoming";

export const metadata = pageMetadata({
  title: "Upcoming Features: Emergency SOS & More",
  description:
    "Coming soon to Fietra: one-tap Emergency SOS for field staff, punch in and out, attendance regularisation and travel expense claims based on the route travelled.",
  path: UPCOMING_PATH,
});

export default function UpcomingPage() {
  return (
    <main id="main" className="overflow-x-clip">
      <PageHero
        eyebrow="Coming soon"
        title="What's next for"
        highlight="Fietra."
        intro="New features that keep field staff safe and take the paperwork out of attendance and travel claims — starting with one-tap Emergency SOS."
        breadcrumbs={[
          { name: "Product", path: "/product" },
          { name: "Upcoming Features", path: UPCOMING_PATH },
        ]}
        actions={
          <>
            <DemoButton size="lg">Get early access</DemoButton>
            <Button variant="secondary" size="lg" href={upcomingPath("emergency-sos")}>
              See Emergency SOS
            </Button>
          </>
        }
      />
      <EmergencySOSSection />
      <UpcomingFeatures />
      <FinalCTA />
    </main>
  );
}
