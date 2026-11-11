import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { DemoButton } from "@/components/demo/DemoButton";
import { IndustriesPreview } from "@/components/industries/IndustriesPreview";
import { TrackingStages } from "@/components/tracking-map/TrackingStages";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Field Team Tracking Solutions by Industry",
  description:
    "How field sales, field service, logistics and construction teams use Fietra for GPS tracking, verified visits, geo attendance and offline-first route capture.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <main id="main" className="overflow-x-clip">
      <PageHero
        eyebrow="Solutions"
        title="Built around the way"
        highlight="your field team works."
        intro="Sales reps, service engineers, delivery drivers and site crews move differently. Fietra adapts tracking, visits and attendance to each of them."
        breadcrumbs={[{ name: "Solutions", path: "/solutions" }]}
        actions={
          <>
            <DemoButton size="lg" />
            <Button variant="secondary" size="lg" href="/product">
              Explore the platform
            </Button>
          </>
        }
      />
      <IndustriesPreview showAllLink={false} />
      <TrackingStages
        title="The same tracked day, in every industry"
        subtitle="Whatever the job, every field day follows the same six stages — and Fietra captures each one."
      />
      <FinalCTA />
    </main>
  );
}
