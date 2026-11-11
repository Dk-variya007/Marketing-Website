import React from "react";
import { Container } from "./Container";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  intro: string;
  breadcrumbs: Crumb[];
  /** CTA buttons under the intro. */
  actions?: React.ReactNode;
  /** Optional preview shown beside the copy on large screens. */
  visual?: React.ReactNode;
}

/** Header for inner pages: breadcrumb, the page's single h1, intro and CTAs. */
export function PageHero({ eyebrow, title, highlight, intro, breadcrumbs, actions, visual }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-slate-50 pb-16 pt-28 sm:pb-20 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-grid-subtle opacity-60" />
      <div className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[640px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.12),transparent_65%)]" />

      <Container size="wide" className="relative">
        <Breadcrumbs items={breadcrumbs} />
        <div className={`mt-8 grid items-center gap-12 ${visual ? "lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
          <div className={visual ? "" : "max-w-3xl"}>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">{eyebrow}</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-950 sm:text-5xl lg:text-6xl">
              {title}
              {highlight && (
                <>
                  {" "}
                  <span className="text-brand-600">{highlight}</span>
                </>
              )}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">{intro}</p>
            {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>}
          </div>
          {visual && <div className="relative mx-auto w-full max-w-md">{visual}</div>}
        </div>
      </Container>
    </section>
  );
}
