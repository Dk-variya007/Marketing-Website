"use client";

import React, { useEffect, useState } from "react";
import { X, CheckCircle2, Calendar, Users, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { INDUSTRIES, TEAM_SIZES } from "@/lib/demo";
import { FEATURES } from "@/lib/features";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  // Honeypot — hidden from people, filled in by bots.
  const [website, setWebsite] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "10-50",
    industry: "Field Sales",
  });

  // Escape closes the dialog; the page behind it doesn't scroll while it's open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, consent, website, source: window.location.pathname }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setError(null);
    setConsent(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/75 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      {/* Never taller than the screen: the header (with the close button) stays visible and only the
          body scrolls. A centered dialog taller than the viewport would push its header off-screen. */}
      <div className="relative z-10 flex max-h-[calc(100dvh-2rem)] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:max-h-[calc(100dvh-3rem)]">
        {/* Header bar */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-600 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Fietra Product Demo
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-navy-900 hover:bg-slate-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 id="demo-modal-title" className="text-2xl font-bold text-navy-900">
                You&apos;re all set, {formData.name || "there"}!
              </h2>
              <p className="mt-2 text-slate-600 max-w-md mx-auto text-sm sm:text-base">
                Our workforce solutions engineer has received your request for{" "}
                <span className="font-semibold text-navy-900">
                  {formData.company || "your team"}
                </span>
                . We will reach out within 15 minutes to configure your customized live tour.
              </p>

              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-left text-xs sm:text-sm text-slate-600 space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-brand-600 shrink-0" />
                  <span>Interactive 25-minute live platform walkthrough</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-brand-600 shrink-0" />
                  <span>Tailored to {formData.industry} operations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand-600 shrink-0" />
                  <span>Live test on offline-sync mobile app included</span>
                </div>
              </div>

              <div className="mt-8">
                <Button variant="primary" onClick={handleReset} fullWidth>
                  Done & Return to Website
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <Badge variant="brand" size="sm" className="mb-3">
                Live 1-on-1 Walkthrough
              </Badge>
              <h2 id="demo-modal-title" className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight">
                See Fietra in action
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Discover how top field operations monitor routes, verify customer visits, and sync telemetry without connectivity loss.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="demo-name" className="block text-xs font-semibold text-navy-800 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="demo-name"
                      name="name"
                      autoComplete="name"
                      type="text"
                      required
                      placeholder="e.g. Vikram Mehta"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="demo-email" className="block text-xs font-semibold text-navy-800 mb-1">
                      Work Email *
                    </label>
                    <input
                      id="demo-email"
                      name="email"
                      autoComplete="email"
                      type="email"
                      required
                      placeholder="vikram@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="demo-company" className="block text-xs font-semibold text-navy-800 mb-1">
                      Company Name *
                    </label>
                    <input
                      id="demo-company"
                      name="company"
                      autoComplete="organization"
                      type="text"
                      required
                      placeholder="Acme Logistics"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="demo-team" className="block text-xs font-semibold text-navy-800 mb-1">
                      Field Team Size
                    </label>
                    <select
                      id="demo-team"
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={(e) =>
                        setFormData({ ...formData, teamSize: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition bg-white"
                    >
                      {TEAM_SIZES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="demo-industry" className="block text-xs font-semibold text-navy-800 mb-1">
                    Primary Operational Industry
                  </label>
                  <select
                    id="demo-industry"
                    name="industry"
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData({ ...formData, industry: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition bg-white"
                  >
                    {INDUSTRIES.map((i) => (
                      <option key={i.value} value={i.value}>
                        {i.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Honeypot: off-screen and skipped by keyboard + screen readers */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="demo-website">Website</label>
                  <input
                    id="demo-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                {/* Privacy notice sits right above the button so it's read before submitting */}
                {FEATURES.demoConsentCheckbox ? (
                  <label htmlFor="demo-consent" className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-700">
                    <input
                      id="demo-consent"
                      name="consent"
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-brand-600"
                    />
                    <span>
                      I agree to Fietra contacting me about this demo request, as described in the{" "}
                      <Link href="/legal/privacy-policy" target="_blank" className="font-semibold text-brand-600 underline underline-offset-2">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                ) : (
                  <p className="rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-700">
                    We use these details only to arrange your demo. See our{" "}
                    <Link href="/legal/privacy-policy" target="_blank" className="font-semibold text-brand-600 underline underline-offset-2">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                )}

                {error && (
                  <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
                    {error}
                  </p>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={loading}
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    {loading ? "Sending request..." : "Confirm Demo Request"}
                  </Button>
                </div>

                <p className="text-[11px] text-center text-slate-400">
                  No credit card required. Free 14-day operational pilot included.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
