"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { ArrowRight, ChevronDown, Map, Menu, ShieldCheck, Siren, UserCheck, X } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";
import { useDemo } from "../demo/DemoProvider";
import { PRODUCTS, productPath } from "@/lib/products";
import { SOLUTIONS, solutionPath } from "@/lib/solutions";
import { TRACKING_MAP_PATH } from "@/lib/site";
import { UPCOMING_PATH, upcomingPath } from "@/lib/upcoming";
import { FEATURES } from "@/lib/features";

const TRUST_LINKS = [
  { href: "/security", icon: ShieldCheck, title: "Security", text: "How location data is protected" },
  { href: "/employee-privacy", icon: UserCheck, title: "Employee Privacy", text: "Fair, transparent tracking & consent" },
];

type MenuId = "product" | "solutions";

const linkBase = "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors";
const linkIdle = "text-slate-700 hover:text-navy-900 hover:bg-slate-50";
const linkActive = "text-brand-600 bg-brand-50";

function MenuItem({ href, icon: Icon, title, text }: { href: string; icon: React.ElementType; title: string; text: string }) {
  return (
    <Link href={href} className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-100 bg-brand-50 text-brand-600">
        <Icon className="h-4 w-4" />
      </span>
      <span>
        <span className="block text-sm font-semibold text-navy-900 group-hover:text-brand-600">{title}</span>
        <span className="mt-0.5 block text-xs text-slate-500">{text}</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const { openDemo } = useDemo();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // Escape / outside click close the open dropdown.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [openMenu]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const inProduct = pathname.startsWith("/product");
  const inSolutions = pathname.startsWith("/solutions");

  const trigger = (id: MenuId, label: string, active: boolean) => (
    <button
      type="button"
      aria-expanded={openMenu === id}
      aria-controls={`menu-${id}`}
      onClick={() => setOpenMenu(openMenu === id ? null : id)}
      className={clsx(linkBase, active || openMenu === id ? linkActive : linkIdle)}
    >
      {label}
      <ChevronDown className={clsx("h-4 w-4 transition-transform duration-200", openMenu === id && "rotate-180")} />
    </button>
  );

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-40 border-b bg-white/[0.97] py-3.5 transition-shadow duration-200",
          isScrolled ? "border-slate-200/80 shadow-sm" : "border-slate-100"
        )}
      >
        <Container size="wide">
          <div className="flex items-center justify-between">
            <Logo />

            {/* Desktop navigation */}
            <nav ref={navRef} aria-label="Main" className="hidden items-center gap-1 lg:flex xl:gap-2">
              <div className="relative" onMouseEnter={() => setOpenMenu("product")} onMouseLeave={() => setOpenMenu(null)}>
                {trigger("product", "Product", inProduct)}
                {openMenu === "product" && (
                  <div id="menu-product" className="absolute left-0 top-full pt-2">
                    <div className="grid w-[760px] grid-cols-[1fr_240px] gap-3 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-2xl">
                      <div className="grid grid-cols-2 gap-1">
                        {PRODUCTS.map((p) => (
                          <MenuItem key={p.slug} href={productPath(p.slug)} icon={p.icon} title={p.name} text={p.menuLabel} />
                        ))}
                      </div>
                      <div className="flex flex-col justify-between rounded-xl bg-navy-950 p-4 text-white">
                        <div>
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
                            <Map className="h-4 w-4" />
                          </span>
                          <p className="mt-3 text-sm font-semibold">Tracking Map</p>
                          <p className="mt-1 text-xs leading-relaxed text-slate-400">
                            Follow one field day on a live map — start, break, offline, visit and finish.
                          </p>
                        </div>
                        <div className="mt-4 space-y-2">
                          <Link href={TRACKING_MAP_PATH} className="flex items-center gap-1 text-xs font-semibold text-brand-300 hover:text-white">
                            See how tracking works <ArrowRight className="h-3 w-3" />
                          </Link>
                          <Link href="/product" className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white">
                            Platform overview <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                      <Link
                        href={upcomingPath("emergency-sos")}
                        className="col-span-2 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50/60 px-4 py-3 hover:bg-amber-50"
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600 text-white">
                            <Siren className="h-4 w-4" />
                          </span>
                          <span>
                            <span className="flex items-center gap-2 text-sm font-semibold text-navy-900">
                              Emergency SOS
                              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700">Coming soon</span>
                            </span>
                            <span className="block text-xs text-slate-500">Plus punch, attendance regularisation and travel expense</span>
                          </span>
                        </span>
                        <span className="text-xs font-semibold text-brand-600">What&apos;s next →</span>
                      </Link>
                      {FEATURES.trustMenu && (
                        <div className="col-span-2 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-100 px-2 pt-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Trust</span>
                          {TRUST_LINKS.map(({ href, icon: Icon, title, text }) => (
                            <Link key={href} href={href} className="group flex items-center gap-2 text-sm">
                              <Icon className="h-4 w-4 text-emerald-600" />
                              <span className="font-semibold text-navy-900 group-hover:text-brand-600">{title}</span>
                              <span className="hidden text-xs text-slate-500 2xl:inline">— {text}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" onMouseEnter={() => setOpenMenu("solutions")} onMouseLeave={() => setOpenMenu(null)}>
                {trigger("solutions", "Solutions", inSolutions)}
                {openMenu === "solutions" && (
                  <div id="menu-solutions" className="absolute left-0 top-full pt-2">
                    <div className="w-[400px] rounded-2xl border border-slate-200/90 bg-white p-3 shadow-2xl">
                      {SOLUTIONS.map((s) => (
                        <MenuItem key={s.id} href={solutionPath(s.id)} icon={s.icon} title={s.name} text={s.menuLabel} />
                      ))}
                      <Link
                        href="/solutions"
                        className="mt-1 flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold text-brand-600 hover:bg-slate-50"
                      >
                        All industry solutions <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href={TRACKING_MAP_PATH}
                aria-current={pathname === TRACKING_MAP_PATH ? "page" : undefined}
                className={clsx(linkBase, pathname === TRACKING_MAP_PATH ? linkActive : linkIdle)}
              >
                How It Works
              </Link>

              <Link
                href="/pricing"
                aria-current={pathname === "/pricing" ? "page" : undefined}
                className={clsx(linkBase, pathname === "/pricing" ? linkActive : linkIdle)}
              >
                Pricing
              </Link>
            </nav>

            <div className="hidden items-center gap-3 sm:flex">
              <button type="button" onClick={openDemo} className="px-3.5 py-2 text-sm font-medium text-navy-800 transition-colors hover:text-brand-600">
                Login
              </button>
              <Button variant="primary" size="md" onClick={openDemo} icon={<ArrowRight className="h-4 w-4" />}>
                Book a Demo
              </Button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <Button variant="primary" size="sm" onClick={openDemo} className="sm:hidden">
                Book Demo
              </Button>
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-30 flex flex-col overflow-y-auto bg-white px-6 pb-6 pt-20 lg:hidden">
          <nav aria-label="Mobile" className="flex-1 space-y-6">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Product</p>
              <div className="grid gap-1 sm:grid-cols-2">
                {PRODUCTS.map((p) => (
                  <MenuItem key={p.slug} href={productPath(p.slug)} icon={p.icon} title={p.name} text={p.menuLabel} />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Solutions</p>
              <div className="grid gap-1 sm:grid-cols-2">
                {SOLUTIONS.map((s) => (
                  <MenuItem key={s.id} href={solutionPath(s.id)} icon={s.icon} title={s.name} text={s.menuLabel} />
                ))}
              </div>
            </div>
            {FEATURES.trustMenu && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Trust</p>
                <div className="grid gap-1 sm:grid-cols-2">
                  {TRUST_LINKS.map((t) => (
                    <MenuItem key={t.href} href={t.href} icon={t.icon} title={t.title} text={t.text} />
                  ))}
                </div>
              </div>
            )}
            <div className="grid gap-2 border-t border-slate-200 pt-4">
              <Link href={TRACKING_MAP_PATH} className="rounded-xl bg-slate-50 p-3 font-semibold text-navy-900">
                How It Works — Tracking Map
              </Link>
              <Link href="/product" className="rounded-xl bg-slate-50 p-3 font-semibold text-navy-900">
                Platform Overview
              </Link>
              <Link href={UPCOMING_PATH} className="flex items-center justify-between rounded-xl bg-amber-50 p-3 font-semibold text-navy-900">
                Upcoming Features
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700">Coming soon</span>
              </Link>
              <Link href="/pricing" className="rounded-xl bg-slate-50 p-3 font-semibold text-navy-900">
                Pricing
              </Link>
            </div>
          </nav>

          <div className="mt-6 space-y-3 border-t border-slate-200 pt-6">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => {
                setMobileOpen(false);
                openDemo();
              }}
            >
              Book a Demo
            </Button>
            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={() => {
                setMobileOpen(false);
                openDemo();
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
