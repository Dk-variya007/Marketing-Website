import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { DemoButton } from "@/components/demo/DemoButton";
import { ProductPillars } from "@/components/features/ProductPillars";
import { FieldVisibilitySection } from "@/components/visibility/FieldVisibilitySection";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { TRACKING_MAP_PATH } from "@/lib/site";

const description =
  "Explore the Fietra platform: live GPS tracking, offline tracking, route history, visit management, geo attendance and reports for field teams.";

export const metadata = pageMetadata({ title: "Field Workforce Tracking Platform", description, path: "/product" });

export default function ProductOverviewPage() {
  return (
    <main id="main" className="overflow-x-clip">
      <PageHero
        eyebrow="Platform"
        title="Everything your field operation needs,"
        highlight="in one platform."
        intro="Fietra connects GPS tracking, attendance, visits, routes and reports — with an offline-first mobile app that keeps working where the network doesn't."
        breadcrumbs={[{ name: "Product", path: "/product" }]}
        actions={
          <>
            <DemoButton size="lg" />
            <Button variant="secondary" size="lg" href={TRACKING_MAP_PATH}>
              See how tracking works
            </Button>
          </>
        }
      />
      <ProductPillars
        badge="Capabilities"
        title="Six capabilities. One connected system."
        subtitle="Each capability works on its own and gets stronger together — visits sit on routes, breaks feed attendance, and everything flows into reports."
      />
      <FieldVisibilitySection />
      <FinalCTA />
      <JsonLd data={softwareLd("Fietra", description, "/product")} />
    </main>
  );
}
