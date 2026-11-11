"use client";

import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { Logo } from "../ui/Logo";
import { useDemo } from "../demo/DemoProvider";
import { PRODUCTS, productPath } from "@/lib/products";
import { SOLUTIONS, solutionPath } from "@/lib/solutions";
import { TRACKING_MAP_PATH } from "@/lib/site";
import { UPCOMING_PATH } from "@/lib/upcoming";
import { LEGAL_PAGES } from "@/lib/legal";

const linkClass = "transition-colors hover:text-brand-600";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-xs font-bold uppercase tracking-wider text-navy-950">{title}</p>
      <ul className="space-y-2.5 text-xs sm:text-sm">{children}</ul>
    </div>
  );
}

export function Footer() {
  const { openDemo } = useDemo();

  return (
    <footer className="border-t border-slate-200 bg-white pb-12 pt-16 text-slate-600">
      <Container size="wide">
        <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 space-y-4">
            <Logo compact />
            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              Field workforce geo-tracking platform. Giving operations teams real-time visibility into locations, routes, visits, and
              shift attendance — even offline.
            </p>
          </div>

          <Column title="Product">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link href={productPath(p.slug)} className={linkClass}>
                  {p.name}
                </Link>
              </li>
            ))}
          </Column>

          <Column title="Solutions">
            {SOLUTIONS.map((s) => (
              <li key={s.id}>
                <Link href={solutionPath(s.id)} className={linkClass}>
                  {s.name}
                </Link>
              </li>
            ))}
          </Column>

          <Column title="Explore">
            <li>
              <Link href="/product" className={linkClass}>
                Platform Overview
              </Link>
            </li>
            <li>
              <Link href={TRACKING_MAP_PATH} className={linkClass}>
                How Tracking Works
              </Link>
            </li>
            <li>
              <Link href={UPCOMING_PATH} className={linkClass}>
                Upcoming Features
              </Link>
            </li>
            <li>
              <Link href="/pricing" className={linkClass}>
                Pricing
              </Link>
            </li>
          </Column>

          <Column title="Company">
            <li>
              <button type="button" onClick={openDemo} className={linkClass}>
                Book a Demo
              </button>
            </li>
            <li>
              <button type="button" onClick={openDemo} className={linkClass}>
                Contact Sales
              </button>
            </li>
          </Column>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Fietra Technologies Inc. All rights reserved.</p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {LEGAL_PAGES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="transition-colors hover:text-navy-900">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
