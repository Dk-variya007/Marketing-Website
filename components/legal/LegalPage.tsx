import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { Breadcrumbs } from "../ui/Breadcrumbs";
import { LEGAL, LEGAL_PAGES } from "@/lib/legal";

export interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

interface LegalPageProps {
  title: string;
  intro: React.ReactNode;
  path: string;
  sections: LegalSection[];
  /** Shown above the sections (e.g. a summary card). */
  lead?: React.ReactNode;
}

// Long-form layout: sticky contents list on desktop, readable line length, consistent text styles
// for paragraphs and lists inside each section body.
const prose =
  "space-y-4 text-[15px] leading-relaxed text-slate-700 [&_a]:font-medium [&_a]:text-brand-600 [&_a]:underline [&_a]:underline-offset-2 [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-navy-950 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5";

export function LegalPage({ title, intro, path, sections, lead }: LegalPageProps) {
  return (
    <main id="main" className="bg-white">
      <section className="border-b border-slate-200/80 bg-slate-50 pb-12 pt-28 sm:pt-32">
        <Container size="default">
          <Breadcrumbs items={[{ name: title, path }]} />
          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">{title}</h1>
          <div className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">{intro}</div>
          <p className="mt-4 text-sm text-slate-500">Last updated: {LEGAL.lastUpdated}</p>
        </Container>
      </section>

      <Container size="default" className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-28">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">On this page</p>
              <ol className="mt-3 space-y-2 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-slate-600 hover:text-brand-600">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-xs font-bold uppercase tracking-wider text-slate-400">Related</p>
              <ul className="mt-3 space-y-2 text-sm">
                {LEGAL_PAGES.filter((p) => p.href !== path).map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="text-slate-600 hover:text-brand-600">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="max-w-3xl">
            {lead}
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className={i === 0 && !lead ? "" : "mt-12"}>
                <h2 className="text-2xl font-bold tracking-tight text-navy-950">{s.title}</h2>
                <div className={`mt-4 ${prose}`}>{s.body}</div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
