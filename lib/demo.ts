// Demo request: field options + validation, shared by the form (browser) and /api/demo (server)
// so both always agree on what a valid request is.

import { FEATURES } from "./features";

export const TEAM_SIZES = [
  { value: "1-10", label: "1 – 10 field agents" },
  { value: "10-50", label: "10 – 50 field agents" },
  { value: "50-200", label: "50 – 200 field agents" },
  { value: "200+", label: "200+ field workforce" },
] as const;

export const INDUSTRIES = [
  { value: "Field Sales", label: "Field Sales & Lead Visits" },
  { value: "Field Service", label: "Field Service & Maintenance" },
  { value: "Logistics & Delivery", label: "Logistics & Last-Mile Delivery" },
  { value: "Construction", label: "Construction & Site Inspection" },
  { value: "Distribution", label: "Wholesale & FMCG Distribution" },
] as const;

export interface DemoRequest {
  name: string;
  email: string;
  company: string;
  teamSize: string;
  industry: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns a cleaned request, or an error message for the first problem found. */
export function validateDemoRequest(input: unknown): { ok: true; data: DemoRequest } | { ok: false; error: string } {
  const raw = (input ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const data: DemoRequest = {
    name: str(raw.name),
    email: str(raw.email).toLowerCase(),
    company: str(raw.company),
    teamSize: str(raw.teamSize),
    industry: str(raw.industry),
  };

  if (data.name.length < 2 || data.name.length > 100) return { ok: false, error: "Please enter your full name." };
  if (!EMAIL_RE.test(data.email) || data.email.length > 200) return { ok: false, error: "Please enter a valid work email." };
  if (data.company.length < 2 || data.company.length > 150) return { ok: false, error: "Please enter your company name." };
  if (!TEAM_SIZES.some((t) => t.value === data.teamSize)) return { ok: false, error: "Please choose a team size." };
  if (!INDUSTRIES.some((i) => i.value === data.industry)) return { ok: false, error: "Please choose an industry." };
  if (FEATURES.demoConsentCheckbox && raw.consent !== true) {
    return { ok: false, error: "Please agree to be contacted about your demo request." };
  }
  return { ok: true, data };
}
