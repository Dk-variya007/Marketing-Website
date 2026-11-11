import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { DemoButton } from "@/components/demo/DemoButton";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductBenefits, ProductComingSoon, ProductHeroVisual, ProductSteps, RelatedProducts } from "@/components/product/ProductSections";
import { PRODUCTS, getProduct, productPath, type ProductSlug } from "@/lib/products";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { TRACKING_MAP_PATH } from "@/lib/site";

// Interactive showcases are split per product, so each page only ships the demo it shows.
// They are still server-rendered, so their content is in the HTML for crawlers.
const SHOWCASES: Partial<Record<ProductSlug, React.ComponentType>> = {
  "live-tracking": dynamic(() => import("@/components/live-tracking/LiveTrackingShowcase").then((m) => m.LiveTrackingShowcase)),
  "offline-tracking": dynamic(() => import("@/components/offline-tracking/OfflineFirstSection").then((m) => m.OfflineFirstSection)),
  "route-history": dynamic(() => import("@/components/route-story/RouteStorySection").then((m) => m.RouteStorySection)),
};

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return pageMetadata({ ...product.seo, path: productPath(product.slug) });
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const Showcase = SHOWCASES[product.slug];
  const path = productPath(product.slug);

  return (
    <main id="main" className="overflow-x-clip">
      <PageHero
        eyebrow={product.hero.eyebrow}
        title={product.hero.title}
        highlight={product.hero.highlight}
        intro={product.hero.intro}
        breadcrumbs={[
          { name: "Product", path: "/product" },
          { name: product.name, path },
        ]}
        actions={
          <>
            <DemoButton size="lg" />
            <Button variant="secondary" size="lg" href={TRACKING_MAP_PATH}>
              See how tracking works
            </Button>
          </>
        }
        visual={<ProductHeroVisual product={product} />}
      />
      {Showcase && <Showcase />}
      <ProductBenefits product={product} />
      <ProductComingSoon product={product} />
      <ProductSteps product={product} />
      <RelatedProducts slugs={product.related} />
      <FinalCTA />
      <JsonLd data={softwareLd(`${product.name} — Fietra`, product.seo.description, path)} />
    </main>
  );
}
