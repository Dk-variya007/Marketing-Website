import React from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { FeatureCard } from "../ui/FeatureCard";
import { PRODUCT_VISUALS } from "../product/ProductVisuals";
import { PRODUCTS, productPath, type ProductSlug } from "@/lib/products";

interface ProductPillarsProps {
  /** Products to leave out — e.g. the one whose page this grid is shown on. */
  exclude?: ProductSlug[];
  badge?: string;
  title?: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function ProductPillars({
  exclude = [],
  badge = "Unified Operations Platform",
  title = (
    <>
      One platform. <br />
      <span className="text-brand-600">Every field movement.</span>
    </>
  ),
  subtitle = "Fietra brings location, attendance, visits, routes and field activity together into a single cohesive system.",
  className = "",
}: ProductPillarsProps) {
  const products = PRODUCTS.filter((p) => !exclude.includes(p.slug));

  return (
    <section id="features" className={`py-24 sm:py-32 bg-slate-50/50 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-grid-subtle opacity-40 pointer-events-none" />

      <Container size="wide" className="relative">
        <SectionHeader badge={badge} title={title} subtitle={subtitle} align="center" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((p) => {
            const Visual = PRODUCT_VISUALS[p.slug];
            const Icon = p.icon;
            return (
              <FeatureCard
                key={p.slug}
                href={productPath(p.slug)}
                icon={<Icon className="h-5 w-5" />}
                title={p.name}
                tag={p.tag}
                description={p.summary}
                visual={<Visual />}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
