import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TrackingMapStory } from "./TrackingMapStory";
import { TrackingStages } from "./TrackingStages";
import { getProduct, productPath, type ProductSlug } from "@/lib/products";
import { TRACKING_MAP_PATH } from "@/lib/site";

const RELATED: ProductSlug[] = ["live-tracking", "offline-tracking", "visit-management", "route-history"];

export function TrackingMapPage() {
  return (
    <main id="main" className="overflow-x-clip bg-navy-950">
      <section className="relative overflow-hidden bg-navy-950 pt-28 pb-12 text-white sm:pt-32 sm:pb-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        <div className="pointer-events-none absolute left-1/2 top-12 h-96 w-[52rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.22),transparent_65%)]" />
        <Container className="relative">
          <Breadcrumbs
            theme="dark"
            items={[
              { name: "Product", path: "/product" },
              { name: "Tracking Map", path: TRACKING_MAP_PATH },
            ]}
          />
        </Container>
        <Container className="relative mt-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Tracking Map
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Follow the route. <br />
            <span className="bg-gradient-to-r from-brand-300 to-emerald-300 bg-clip-text text-transparent">See every stage as it happens.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            One field day on a live map. Scroll to drive the route — start, break, resume, ride through a dead zone, check in to a
            visit and close the day, with the status updating at every step.
          </p>
          <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400">
            Scroll to follow the route
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </span>
        </Container>
      </section>

      <TrackingMapStory />

      {/* Crawlable recap of every stage + where each one lives in the product */}
      <TrackingStages
        badge="Recap"
        title="The whole journey at a glance"
        subtitle="Every stage you just followed on the map, and the Fietra capability behind it."
        footer={
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {RELATED.map((slug) => {
              const p = getProduct(slug)!;
              return (
                <li key={slug}>
                  <Link
                    href={productPath(slug)}
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-brand-400/50 hover:text-white"
                  >
                    {p.name}
                    <ArrowRight className="h-4 w-4 text-brand-400 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              );
            })}
          </ul>
        }
      />

      <FinalCTA />
    </main>
  );
}
