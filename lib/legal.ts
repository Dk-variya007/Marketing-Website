// Company details used on the Privacy Policy, Terms, Security and Employee Privacy pages.
// ⚠️ Replace every "[…]" placeholder before launch, and have the final legal text reviewed by counsel.

export const LEGAL = {
  companyName: "Fietra Technologies Inc.",
  registeredAddress: "[Registered office address]",
  privacyEmail: "[privacy@your-domain.com]",
  supportEmail: "[support@your-domain.com]",
  grievanceOfficer: "[Name of Grievance Officer]",
  governingLaw: "the laws of India",
  courts: "[City], India",
  dataLocation: "[Hosting region, e.g. India]",
  lastUpdated: "24 October 2026",
} as const;

export const LEGAL_PAGES = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Employee Privacy", href: "/employee-privacy" },
  { label: "Security", href: "/security" },
] as const;
