// Site-wide constants: brand, canonical origin and shared navigation targets.

export const siteConfig = {
  name: "Fietra",
  legalName: "Fietra Technologies Inc.",
  tagline: "Field Operations OS",
  // Set NEXT_PUBLIC_SITE_URL per environment so canonical URLs, the sitemap and OG tags point at the right host.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://fietra.com").replace(/\/$/, ""),
  title: "Fietra | GPS Field Employee Tracking & Workforce Management",
  description:
    "Fietra helps businesses manage field teams with GPS employee tracking, geo attendance, visit verification, route history and offline-first tracking.",
  locale: "en_US",
} as const;

export const TRACKING_MAP_PATH = "/product/tracking-map";

export const absoluteUrl = (path = "/") => `${siteConfig.url}${path === "/" ? "" : path}`;
