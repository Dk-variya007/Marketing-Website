import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

// Default social-share card for every page (generated once at build time).
export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(ellipse 120% 80% at 50% -20%, #1e3a5f 0%, #0f1f3d 35%, #080e1f 60%, #040810 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 40, fontWeight: 700 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#2563eb", display: "flex" }} />
          <span>
            Fie<span style={{ color: "#60a5fa" }}>tra</span>
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>Know where your field team is.</div>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: "#60a5fa" }}>
            Know what they&apos;re doing.
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#94a3b8" }}>GPS tracking · Geo attendance · Visit verification · Offline-first</div>
      </div>
    ),
    size
  );
}
