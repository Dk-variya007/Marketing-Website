import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "../seo/JsonLd";
import { breadcrumbLd } from "@/lib/seo";

export interface Crumb {
  name: string;
  path: string;
}

/** Visible breadcrumb trail plus the matching BreadcrumbList structured data. */
export function Breadcrumbs({ items, theme = "light" }: { items: Crumb[]; theme?: "light" | "dark" }) {
  const trail = [{ name: "Home", path: "/" }, ...items];
  const dark = theme === "dark";
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className={`flex flex-wrap items-center gap-1.5 text-xs font-medium ${dark ? "text-slate-400" : "text-slate-500"}`}>
          {trail.map((c, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={dark ? "text-slate-200" : "text-navy-900"}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className={dark ? "hover:text-white" : "hover:text-brand-600"}>
                      {c.name}
                    </Link>
                    <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(trail)} />
    </>
  );
}
