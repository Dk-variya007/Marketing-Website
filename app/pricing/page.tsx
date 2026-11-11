import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DemoButton } from "@/components/demo/DemoButton";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqLd, pageMetadata } from "@/lib/seo";
import { PRODUCTS, productPath } from "@/lib/products";

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "Get a Fietra quote for your field team and try live GPS tracking, offline tracking, visits, attendance and reports free with a 14-day pilot.",
  path: "/pricing",
});

// Only claims already made elsewhere on the site (pilot, no card, deployment time, platforms).
const FAQS = [
  {
    q: "How is Fietra priced?",
    a: "Pricing is quoted for your team. Book a demo, tell us your field team size and industry, and we'll share a quote.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. Every team can run a free 14-day pilot with full access, and no credit card is required.",
  },
  {
    q: "How long does it take to get started?",
    a: "Most teams can deploy the mobile app to their field staff in about 15 minutes.",
  },
  {
    q: "Does tracking work without internet?",
    a: "Yes. Fietra stores location points on the device when there is no network and syncs them automatically when connectivity returns.",
  },
];

export default function PricingPage() {
  return (
    <main id="main" className="overflow-x-clip">
      <PageHero
        eyebrow="Pricing"
        title="Pricing that fits"
        highlight="your field team."
        intro="Tell us your team size and how your people work in the field, and we'll put together a quote. Every capability is included in a free 14-day pilot."
        breadcrumbs={[{ name: "Pricing", path: "/pricing" }]}
        actions={<DemoButton size="lg">Get a quote</DemoButton>}
      />

      <section className="bg-white py-20 sm:py-28">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
            <div>
              <SectionHeader badge="Included in your pilot" title="Try every capability" align="left" className="mb-8" />
              <ul className="grid gap-4 sm:grid-cols-2">
                {PRODUCTS.map((p) => (
                  <li key={p.slug} className="flex gap-3 rounded-2xl border border-slate-200 p-5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span>
                      <Link href={productPath(p.slug)} className="font-semibold text-navy-950 hover:text-brand-600">
                        {p.name}
                      </Link>
                      <span className="mt-1 block text-sm text-slate-600">{p.menuLabel}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="rounded-3xl bg-navy-950 p-8 text-white lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-300">Free pilot</p>
              <p className="mt-3 text-3xl font-extrabold">14 days, full access</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {["No credit card required", "Deploy to your field team in ~15 minutes", "Mobile app for staff, web console for managers", "Live 1-on-1 walkthrough with our team"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
              <DemoButton size="lg" fullWidth className="mt-8">
                Start your pilot
              </DemoButton>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200/80 bg-slate-50 py-20 sm:py-28">
        <Container size="narrow">
          <SectionHeader badge="FAQ" title="Pricing questions" align="center" className="mb-10" />
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {FAQS.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy-950">
                  <h3 className="text-base">{f.q}</h3>
                  <span className="text-xl leading-none text-brand-600 transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <FinalCTA />
      <JsonLd data={faqLd(FAQS)} />
    </main>
  );
}
