"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Calendar, Users, Shield, ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { Badge } from "./Badge";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "10-50",
    industry: "Field Sales",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header bar */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
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

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900">
                You're all set, {formData.name || "there"}!
              </h3>
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
              <h3 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight">
                See Fietra in action
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Discover how top field operations monitor routes, verify customer visits, and sync telemetry without connectivity loss.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy-800 mb-1">
                      Full Name *
                    </label>
                    <input
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
                    <label className="block text-xs font-semibold text-navy-800 mb-1">
                      Work Email *
                    </label>
                    <input
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
                    <label className="block text-xs font-semibold text-navy-800 mb-1">
                      Company Name *
                    </label>
                    <input
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
                    <label className="block text-xs font-semibold text-navy-800 mb-1">
                      Field Team Size
                    </label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) =>
                        setFormData({ ...formData, teamSize: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition bg-white"
                    >
                      <option value="1-10">1 – 10 field agents</option>
                      <option value="10-50">10 – 50 field agents</option>
                      <option value="50-200">50 – 200 field agents</option>
                      <option value="200+">200+ field workforce</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-800 mb-1">
                    Primary Operational Industry
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData({ ...formData, industry: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition bg-white"
                  >
                    <option value="Field Sales">Field Sales & Lead Visits</option>
                    <option value="Field Service">Field Service & Maintenance</option>
                    <option value="Logistics & Delivery">Logistics & Last-Mile Delivery</option>
                    <option value="Construction">Construction & Site Inspection</option>
                    <option value="Distribution">Wholesale & FMCG Distribution</option>
                  </select>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={loading}
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    {loading ? "Scheduling Demo..." : "Confirm Demo Request"}
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
