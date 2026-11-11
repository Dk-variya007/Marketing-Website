import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Map } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { FeatureCard } from "../ui/FeatureCard";
import { PRODUCT_VISUALS } from "./ProductVisuals";
import { getProduct, productPath, type Product, type ProductSlug } from "@/lib/products";
import { TRACKING_MAP_PATH } from "@/lib/site";
import { upcomingFor, upcomingPath } from "@/lib/upcoming";
import { ComingSoonBadge } from "../upcoming/ComingSoonBadge";

/** Product preview framed as a mini app card, for the product page hero. */
export function ProductHeroVisual({ product }: { product: Product }) {
  const Visual = PRODUCT_VISUALS[product.slug];
  const Icon = product.icon;
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-bold text-navy-950">{product.name}</p>
          <p className="text-xs text-slate-500">{product.menuLabel}</p>
        </div>
      </div>
      <Visual />
    </div>
  );
}

export function ProductBenefits({ product }: { product: Product }) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container size="wide">
        <SectionHeader badge="Business benefits" title={`Why teams choose ${product.name}`} align="left" className="mb-10 sm:mb-12" />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {product.benefits.map((b) => (
            <li key={b.title} className="rounded-2xl border border-slate-200/90 bg-slate-50/60 p-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-bold text-navy-950">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function ProductSteps({ product }: { product: Product }) {
  return (
    <section className="border-y border-slate-200/80 bg-slate-50 py-20 sm:py-28">
      <Container size="wide">
        <SectionHeader badge="Workflow" title="How it works" align="left" className="mb-10 sm:mb-12" />
        <ol className="grid gap-5 md:grid-cols-3">
          {product.steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="font-mono text-sm font-bold text-brand-600">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-bold text-navy-950">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
            </li>
          ))}
        </ol>

        <Link
          href={TRACKING_MAP_PATH}
          className="group mt-8 flex flex-col gap-4 rounded-2xl bg-navy-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <span className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600">
              <Map className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-base font-bold">See it on the Tracking Map</span>
              <span className="mt-0.5 block text-sm text-slate-400">Follow one field day, stage by stage, on a live map.</span>
            </span>
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-300 group-hover:text-white">
            Open the walkthrough <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </Container>
    </section>
  );
}

export function RelatedProducts({ slugs }: { slugs: ProductSlug[] }) {
  const products = slugs.map(getProduct).filter((p): p is Product => !!p);
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container size="wide">
        <SectionHeader badge="Works together" title="Related capabilities" align="left" className="mb-10 sm:mb-12" />
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((p) => {
            const Icon = p.icon;
            return (
              <FeatureCard
                key={p.slug}
                href={productPath(p.slug)}
                icon={<Icon className="h-5 w-5" />}
                title={p.name}
                tag={p.tag}
                description={p.summary}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/** Upcoming features that build on this capability (e.g. Emergency SOS on Live GPS Tracking). */
export function ProductComingSoon({ product }: { product: Product }) {
  const features = upcomingFor(product.slug);
  if (!features.length) return null;
  return (
    <section className="bg-white pb-20 sm:pb-28">
      <Container size="wide">
        <div className="rounded-3xl border border-amber-200/80 bg-amber-50/50 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <ComingSoonBadge />
            <h2 className="text-lg font-bold text-navy-950">Coming soon to {product.name}</h2>
          </div>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {features.map((f) => (
              <li key={f.id}>
                <Link href={upcomingPath(f.id)} className="group flex h-full gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-amber-300">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <f.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold text-navy-950 group-hover:text-brand-600">{f.name}</span>
                    <span className="mt-1 block text-sm text-slate-600">{f.tagline}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
