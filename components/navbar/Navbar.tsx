"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import {
  Navigation,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Clock,
  Route,
  CheckCircle,
  WifiOff,
  Coffee,
  Briefcase,
  Wrench,
  Truck,
  HardHat,
  ArrowRight,
} from "lucide-react";

interface NavbarProps {
  onOpenDemo: () => void;
}

export function Navbar({ onOpenDemo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-40 transition-colors duration-200 py-3.5",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80"
            : "bg-white/90 backdrop-blur-md shadow-xs border-b border-slate-100"
        )}
      >
        <Container size="wide">
          <div className="flex items-center justify-between">
            {/* Left: Fietra Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none"
              aria-label="Fietra Home"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-navy-950 text-white shadow-md group-hover:bg-brand-600 transition-colors duration-200">
                {/* Custom Fietra geometric GPS emblem */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform group-hover:scale-105"
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
                  <circle
                    cx="12"
                    cy="12"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeDasharray="2 2"
                  />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-navy-950 flex items-center">
                  Fie<span className="text-brand-600">tra</span>
                </span>
                <span className="text-[9px] tracking-widest uppercase text-slate-600 font-semibold -mt-1 hidden sm:block">
                  Field Operations OS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* Product Flyout */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("product")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href="/"
                  onClick={() => {
                    setActiveDropdown(null);
                    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                  }}
                  className={clsx(
                    "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    pathname === "/"
                      ? "text-brand-600 bg-brand-50"
                      : "text-slate-700 hover:text-navy-900 hover:bg-slate-50/80"
                  )}
                >
                  <span>Product</span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                </Link>

                {activeDropdown === "product" && (
                  <div className="absolute top-full left-0 w-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-4 pt-3 mt-1 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <a
                      href="/#live-tracking"
                      onClick={() => setActiveDropdown(null)}
                      className="p-3 rounded-xl hover:bg-slate-50 transition group flex gap-3 items-start"
                    >
                      <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:scale-105 transition-transform">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-navy-900 group-hover:text-brand-600">
                          Live GPS Tracking
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Real-time team map with live speed & telemetry
                        </div>
                      </div>
                    </a>

                    <a
                      href="/#features"
                      onClick={() => setActiveDropdown(null)}
                      className="p-3 rounded-xl hover:bg-slate-50 transition group flex gap-3 items-start"
                    >
                      <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-navy-900 group-hover:text-brand-600">
                          Geo Attendance
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Geofenced punch-in with biometric verification
                        </div>
                      </div>
                    </a>

                    <Link
                      href="/tracking-flow"
                      onClick={() => setActiveDropdown(null)}
                      className="p-3 rounded-xl hover:bg-slate-50 transition group flex gap-3 items-start"
                    >
                      <div className="h-9 w-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 group-hover:scale-105 transition-transform">
                        <Route className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-navy-900 group-hover:text-brand-600">
                          Tracking Flow
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Interactive day-in-the-field simulation
                        </div>
                      </div>
                    </Link>

                    <a
                      href="/#features"
                      onClick={() => setActiveDropdown(null)}
                      className="p-3 rounded-xl hover:bg-slate-50 transition group flex gap-3 items-start"
                    >
                      <div className="h-9 w-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100 group-hover:scale-105 transition-transform">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-navy-900 group-hover:text-brand-600">
                          Visit Management
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Client location checks, notes & photo proof
                        </div>
                      </div>
                    </a>

                    <a
                      href="/#offline-tracking"
                      onClick={() => setActiveDropdown(null)}
                      className="p-3 rounded-xl hover:bg-slate-50 transition group flex gap-3 items-start col-span-2 bg-gradient-to-r from-slate-50 to-brand-50/40 border border-brand-100"
                    >
                      <div className="h-9 w-9 rounded-lg bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <WifiOff className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-navy-900">
                            Offline-First Engine
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-600 text-white px-2 py-0.5 rounded-full">
                            Industry 1st
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5">
                          Stores GPS points locally during network outages and auto-syncs without loss.
                        </div>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              {/* Tracking Flow page */}
              <Link
                href="/tracking-flow"
                className={clsx(
                  "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === "/tracking-flow"
                    ? "text-brand-600 bg-brand-50"
                    : "text-slate-700 hover:text-navy-900 hover:bg-slate-50/80"
                )}
              >
                <span>Tracking Flow</span>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-brand-100 text-brand-700 px-1.5 py-0.5 rounded">
                  New
                </span>
              </Link>

              {/* Tracking Map page (top-view variant) */}
              <Link
                href="/tracking-map"
                className={clsx(
                  "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === "/tracking-map"
                    ? "text-brand-600 bg-brand-50"
                    : "text-slate-700 hover:text-navy-900 hover:bg-slate-50/80"
                )}
              >
                Tracking Map
              </Link>

              {/* Solutions Flyout */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("solutions")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={clsx(
                    "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    activeDropdown === "solutions"
                      ? "text-brand-600 bg-slate-50"
                      : "text-slate-700 hover:text-navy-900 hover:bg-slate-50/80"
                  )}
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "solutions" ? null : "solutions")
                  }
                >
                  <span>Solutions</span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                </button>

                {activeDropdown === "solutions" && (
                  <div className="absolute top-full left-0 w-[420px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-4 mt-1 grid grid-cols-1 gap-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <a
                      href="/#industries"
                      onClick={() => setActiveDropdown(null)}
                      className="p-2.5 rounded-xl hover:bg-slate-50 transition flex items-center gap-3"
                    >
                      <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Briefcase className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-navy-900">Field Sales Teams</div>
                        <div className="text-xs text-slate-500">Track client visits, meeting durations & pipeline</div>
                      </div>
                    </a>

                    <a
                      href="/#industries"
                      onClick={() => setActiveDropdown(null)}
                      className="p-2.5 rounded-xl hover:bg-slate-50 transition flex items-center gap-3"
                    >
                      <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                        <Wrench className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-navy-900">Service & Maintenance</div>
                        <div className="text-xs text-slate-500">Dispatch nearest technician and verify work orders</div>
                      </div>
                    </a>

                    <a
                      href="/#industries"
                      onClick={() => setActiveDropdown(null)}
                      className="p-2.5 rounded-xl hover:bg-slate-50 transition flex items-center gap-3"
                    >
                      <div className="h-8 w-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                        <Truck className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-navy-900">Logistics & Delivery</div>
                        <div className="text-xs text-slate-500">Fleet telemetry, proof of delivery & idle alerts</div>
                      </div>
                    </a>

                    <a
                      href="/#industries"
                      onClick={() => setActiveDropdown(null)}
                      className="p-2.5 rounded-xl hover:bg-slate-50 transition flex items-center gap-3"
                    >
                      <div className="h-8 w-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                        <HardHat className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-navy-900">Construction Sites</div>
                        <div className="text-xs text-slate-500">Site geofences, safety check-in & subcontractor hours</div>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              <a
                href="/#industries"
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-navy-900 hover:bg-slate-50/80 rounded-lg transition-colors"
              >
                Industries
              </a>

              <a
                href="/#visibility"
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-navy-900 hover:bg-slate-50/80 rounded-lg transition-colors"
              >
                Resources
              </a>

              <a
                href="/#pricing-preview"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenDemo();
                }}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-navy-900 hover:bg-slate-50/80 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Pricing</span>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">
                  Simple
                </span>
              </a>
            </nav>

            {/* Right: Login & Book a Demo CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={onOpenDemo}
                className="px-3.5 py-2 text-sm font-medium text-navy-800 hover:text-brand-600 transition-colors"
              >
                Login
              </button>

              <Button
                variant="primary"
                size="md"
                onClick={onOpenDemo}
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Book a Demo
              </Button>
            </div>

            {/* Mobile Hamburger & Quick CTA */}
            <div className="flex sm:hidden items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={onOpenDemo}
              >
                Book Demo
              </Button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 pt-20 pb-6 px-6 bg-white/98 backdrop-blur-xl lg:hidden flex flex-col justify-between overflow-y-auto border-b border-slate-200 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Product Navigation
            </div>

            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  "flex items-center gap-3 p-3 rounded-xl font-semibold",
                  pathname === "/" ? "bg-brand-50 text-brand-700" : "bg-slate-50 text-navy-900"
                )}
              >
                <Navigation className="h-5 w-5 text-brand-600" />
                <span>Product Home</span>
              </Link>

              <Link
                href="/tracking-flow"
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  "flex items-center gap-3 p-3 rounded-xl font-semibold",
                  pathname === "/tracking-flow" ? "bg-brand-50 text-brand-700" : "bg-slate-50 text-navy-900"
                )}
              >
                <Route className="h-5 w-5 text-brand-600" />
                <span>Tracking Flow</span>
              </Link>

              <Link
                href="/tracking-map"
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  "flex items-center gap-3 p-3 rounded-xl font-semibold",
                  pathname === "/tracking-map" ? "bg-brand-50 text-brand-700" : "bg-slate-50 text-navy-900"
                )}
              >
                <MapPin className="h-5 w-5 text-brand-600" />
                <span>Tracking Map</span>
              </Link>

              <a
                href="/#live-tracking"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-navy-900 font-semibold"
              >
                <MapPin className="h-5 w-5 text-brand-600" />
                <span>Live GPS Tracking</span>
              </a>

              <a
                href="/#offline-tracking"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-navy-900 font-semibold"
              >
                <WifiOff className="h-5 w-5 text-brand-600" />
                <span>Offline-First Engine</span>
              </a>

              <a
                href="/#industries"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-navy-900 font-semibold"
              >
                <Briefcase className="h-5 w-5 text-brand-600" />
                <span>Industries & Teams</span>
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 space-y-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
            >
              Book a Demo
            </Button>
            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
            >
              Login to Account
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
