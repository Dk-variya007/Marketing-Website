import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site";

interface PageMetadataInput {
  /** Page-specific title; the root layout appends "| Fietra". */
  title: string;
  description: string;
  /** Path of the page, e.g. "/product/live-tracking" — becomes the canonical URL. */
  path: string;
}

/** Canonical URL + Open Graph + Twitter tags for one page, from a single title/description pair. */
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  // A page-level openGraph object replaces the root one, so the shared share image is re-attached here.
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.title }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images },
  };
}

/* ───────────────────────────── Structured data ───────────────────────────── */

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  logo: absoluteUrl("/icon.svg"),
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
};

export function softwareLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Mobile, Web",
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
