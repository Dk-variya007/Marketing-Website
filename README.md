# Fietra — Marketing Website

Marketing site for **Fietra**, the field workforce geo-tracking platform (GPS tracking, geo attendance, visit verification,
route history and offline-first tracking).

---

## 🗺️ Site Structure

| URL | Page |
| --- | --- |
| `/` | Home — hero → who it's for → the problem → capabilities → how tracking works → Track/Understand/Act → industries → CTA |
| `/product` | Platform overview |
| `/product/[slug]` | One page per capability: `live-tracking`, `offline-tracking`, `route-history`, `visit-management`, `attendance-breaks`, `reports` |
| `/product/tracking-map` | Scroll-driven walkthrough of a full field day (nav: **How It Works**) |
| `/solutions` | Industries, each with its own anchor (`#field-sales`, `#field-service`, `#logistics-delivery`, `#construction`) |
| `/pricing` | Quote request, free pilot, FAQ |

`/tracking-flow` and `/tracking-map` permanently redirect to `/product/tracking-map`.

## 📁 Where Things Live

- `lib/products.ts`, `lib/solutions.ts` — content for product pages, menus, footer, home grid and sitemap (single source of truth)
- `lib/site.ts`, `lib/seo.ts` — site URL, per-page metadata helper, JSON-LD builders
- `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` — crawl + share metadata
- `components/demo/` — site-wide "Book a Demo" modal (`useDemo()`, `<DemoButton>`)
- `components/navbar`, `components/footer` — shared shell, rendered once in `app/layout.tsx`
- `components/product/` — product page sections and the mini product visuals
- `components/tracking-map/` — Tracking Map story, map scene, phone HUD and the shared `TrackingStages` section

Set `NEXT_PUBLIC_SITE_URL` (defaults to `https://fietra.com`) so canonical URLs, the sitemap and OG tags use the right host.

## 📨 Demo Requests

The "Book a Demo" form posts to `app/api/demo/route.ts`, which validates the request (rules in `lib/demo.ts`), filters bots
(honeypot + per-IP rate limit) and delivers the lead to whichever destinations are configured — see `.env.example`:

- `DEMO_WEBHOOK_URL` — JSON POST to Zapier, Make, a Google Apps Script (→ Google Sheets), Slack or your CRM
- `RESEND_API_KEY` + `DEMO_NOTIFY_EMAIL` (+ optional `DEMO_FROM_EMAIL`) — email to your sales inbox via Resend

In development with nothing configured, leads are logged to the server console. In production with nothing configured, the
form shows an error instead of silently losing the lead. The API route needs a Node server (`next start`, Vercel, etc.),
not a static export.

## ⚖️ Legal & Trust Pages

`/legal/privacy-policy`, `/legal/terms`, `/employee-privacy`, `/security`. Company details (address, emails, grievance
officer, jurisdiction, hosting region) live in `lib/legal.ts` — replace every `[…]` placeholder and have the text reviewed by
legal counsel before launch.

---

## 🛠️ Technology Stack & Architecture

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Typography:** Inter (via `next/font/google`)

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Start
```bash
npm run build
npm run start
```

### 4. Lint
```bash
npm run lint
```
