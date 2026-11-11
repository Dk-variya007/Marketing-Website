import type { MetadataRoute } from "next";
import { PRODUCTS, productPath } from "@/lib/products";
import { TRACKING_MAP_PATH, absoluteUrl } from "@/lib/site";
import { UPCOMING_PATH } from "@/lib/upcoming";
import { LEGAL_PAGES } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly",
    priority,
  });

  return [
    entry("/", 1),
    entry("/product", 0.9),
    ...PRODUCTS.map((p) => entry(productPath(p.slug), 0.8)),
    entry(TRACKING_MAP_PATH, 0.8),
    entry(UPCOMING_PATH, 0.7),
    entry("/solutions", 0.7),
    entry("/pricing", 0.7),
    ...LEGAL_PAGES.map((p) => entry(p.href, 0.3)),
  ];
}
