# TrackField — Marketing Website Homepage

A modern, high-converting B2B SaaS marketing website homepage built for **TrackField** — the field workforce geo-tracking platform.

Inspired by the marketing quality and storytelling of Keka HR, Linear, Stripe, and Vercel, with a bespoke TrackField visual identity centered around GPS routes, live operations, and an offline-first telemetry engine.

---

## 🚀 Key Homepage Sections & Storytelling Flow

1. **Sticky Header Navigation**
   - Brand logo mark with custom geometric GPS compass emblem
   - Rich mega-dropdowns for *Product* and *Solutions*
   - Interactive *Login* and *Book a Demo* triggers
   - Responsive mobile navigation drawer with backdrop blur

2. **Hero Section & Hero Product Visual**
   - **H1 Headline:** *"Know where your field team is. Know what they're doing."*
   - Dual CTAs: `Book a Demo` (modal) and `See How It Works ↓` (smooth scroll)
   - Original TrackField product visualization:
     - SVG map with animated route paths drawing themselves
     - Employee live cards: Rahul (● Tracking 2.4 km), Amit (● On Visit, Apollo Diagnostics), Priya (● Tracking 4.8 km)
     - Geofence polygon toggle and live operations status ticker

3. **Trust Strip**
   - *"Built for teams that move."*
   - Clean industry badges: FIELD SALES, FIELD SERVICE, LOGISTICS, DELIVERY, CONSTRUCTION, DISTRIBUTION
   - Enterprise benchmarks (99.98% sync reliability, &lt;10m GPS accuracy, 0% data loss, 3% battery drain/day)

4. **Problem Section**
   - *"Your field team is moving. Can you actually see what's happening?"*
   - Split layout with interactive numbered cards (01 to 05) highlighting common field operational blind spots
   - Seamless visual transition into: *"TrackField changes that."*

5. **Product Introduction (6 Core Pillars)**
   - *"One platform. Every field movement."*
   - 6 feature cards with minimal icons, micro-visual previews, and hover states:
     - Live GPS Tracking
     - Geo-Attendance
     - Route History
     - Visit Management
     - Break Tracking
     - Offline Tracking

6. **Live Tracking Showcase**
   - *"See your team in real time."*
   - Large operations map with live employee sidebar and telemetry inspector
   - Dynamic filters (`All`, `Tracking`, `On Visit`, `Break`)
   - KPI counters: `24 employees tracking`, `8 visits completed`, `142 km travelled`

7. **Offline-First Section (Core Differentiator)**
   - *"Tracking doesn't stop when the internet does."*
   - Visual architectural pipeline: `ONLINE` → `GPS LOCATION` → `OFFLINE` → `LOCAL STORAGE` → `CONNECTION RESTORED` → `SYNC` → `MANAGER DASHBOARD`
   - Simulated smartphone frame running the full cycle from disconnection to batch delta upload with 0% data loss

8. **Route Story Section**
   - *"See the journey. Not just the destination."*
   - Interactive chronological timeline:
     - `09:10` Tracking started
     - `10:15` Customer visit
     - `12:30` Break (orange segment)
     - `13:05` Tracking resumed
     - `15:20` Customer visit
     - `17:45` Tracking ended (success green)
   - Synchronized map waypoint inspector with speed and odometer metrics

9. **Field Visibility Section**
   - *"From employee movement to business insight."*
   - 3 connected stages with animated connectors: `01 TRACK` → `02 UNDERSTAND` → `03 ACT`

10. **Mobile + Web Experience**
    - *"Built for employees in the field. Designed for managers at the desk."*
    - Interactive tab switcher: *Side-by-Side Dual View*, *Mobile Field App*, *Manager Console*
    - Realistic UI frames (`PhoneMockup` and `BrowserMockup`)

11. **Industries Preview**
    - Cards for *Field Sales*, *Field Service*, *Logistics & Delivery*, and *Construction*
    - Bespoke mini SVG route diagrams per industry

12. **Final High-Impact CTA**
    - Subtle dark map grid with glowing connected location constellation points
    - *"Bring your field team into view."*
    - Reassurances: 14-day pilot, zero credit card, 15-minute deployment

13. **Footer**
    - 5-column SaaS structure: Product, Solutions, Resources, Company, Legal
    - Copyright © 2026 TrackField. All rights reserved.

14. **Book a Demo Modal**
    - Interactive modal dialog across the website with form validation and confirmation state

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
