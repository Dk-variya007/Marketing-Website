"use client";

import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { ShieldCheck, Heart, ArrowUpRight } from "lucide-react";

interface FooterProps {
  onOpenDemo: () => void;
}

export function Footer({ onOpenDemo }: FooterProps) {
  const productLinks = [
    { label: "GPS Tracking", href: "#live-tracking" },
    { label: "Attendance", href: "#features" },
    { label: "Route History", href: "#route-story" },
    { label: "Visit Management", href: "#features" },
    { label: "Offline Tracking", href: "#offline-tracking" },
  ];

  const solutionLinks = [
    { label: "Field Sales", href: "#industries" },
    { label: "Field Service", href: "#industries" },
    { label: "Logistics", href: "#industries" },
    { label: "Construction", href: "#industries" },
  ];

  const resourceLinks = [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Customer Stories", href: "#" },
    { label: "Security & Trust", href: "#" },
  ];

  const companyLinks = [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#", badge: "Hiring" },
    { label: "Contact Us", href: "#", action: true },
    { label: "Partners", href: "#" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "GDPR & DPDP Compliance", href: "#" },
  ];

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 pt-16 pb-12">
      <Container size="wide">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {/* Brand Info Column */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-navy-950 text-white shadow-sm">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L20.5 7V17L12 22L3.5 17V7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 6V18"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="12" r="3" fill="#38bdf8" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-navy-950">
                Fie<span className="text-brand-600">tra</span>
              </span>
            </Link>

            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Field workforce geo-tracking platform. Giving operations teams real-time visibility into locations, routes, visits, and shift attendance — even offline.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-medium text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational (99.99%)</span>
            </div>
          </div>

          {/* 1. Product Column */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-navy-950 mb-4">
              Product
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-brand-600 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Solutions Column */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-navy-950 mb-4">
              Solutions
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {solutionLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-brand-600 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Resources Column */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-navy-950 mb-4">
              Resources
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {resourceLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.href === "#") {
                        e.preventDefault();
                        onOpenDemo();
                      }
                    }}
                    className="hover:text-brand-600 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Company Column */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-navy-950 mb-4">
              Company
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.action || item.href === "#") {
                        e.preventDefault();
                        onOpenDemo();
                      }
                    }}
                    className="hover:text-brand-600 transition-colors flex items-center gap-1.5"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Fietra Technologies Inc. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {legalLinks.map((leg) => (
              <a
                key={leg.label}
                href={leg.href}
                onClick={(e) => {
                  e.preventDefault();
                  onOpenDemo();
                }}
                className="hover:text-navy-900 transition-colors"
              >
                {leg.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
