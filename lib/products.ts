import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Clock, FileBarChart2, Navigation, Route, WifiOff } from "lucide-react";

// Single source of truth for product pages, the Product menu, the home feature grid,
// the footer and the sitemap. Add a product here and every one of those picks it up.

export type ProductSlug =
  | "live-tracking"
  | "offline-tracking"
  | "route-history"
  | "visit-management"
  | "attendance-breaks"
  | "reports";

export interface Product {
  slug: ProductSlug;
  name: string;
  icon: LucideIcon;
  tag: string;
  /** One line for menus. */
  menuLabel: string;
  /** Card copy on the home page and the product overview. */
  summary: string;
  seo: { title: string; description: string };
  hero: { eyebrow: string; title: string; highlight: string; intro: string };
  benefits: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  related: ProductSlug[];
}

export const PRODUCTS: Product[] = [
  {
    slug: "live-tracking",
    name: "Live GPS Tracking",
    icon: Navigation,
    tag: "Real-Time",
    menuLabel: "Real-time team map with speed & status",
    summary:
      "Continuous high-accuracy location tracking with low battery impact. View live speeds, directions, and moving or stopped states.",
    seo: {
      title: "Live GPS Employee Tracking",
      description:
        "See every field employee on one live map — location, speed, status, battery and last sync — with Fietra's battery-friendly GPS tracking.",
    },
    hero: {
      eyebrow: "Live GPS Tracking",
      title: "See your whole field team",
      highlight: "on one live map.",
      intro:
        "Fietra shows where every employee is right now — moving, on a visit or on a break — so managers can dispatch, support and plan without a single phone call.",
    },
    benefits: [
      { title: "One live operations map", text: "Every employee, their route and their current status in a single view, filterable by tracking, visit or break." },
      { title: "Context, not just dots", text: "Speed, distance travelled, battery level, network and last sync for each person, one click away." },
      { title: "Battery-friendly by design", text: "A low-drain background service records accurate locations without draining field devices." },
      { title: "Faster decisions", text: "Spot who is closest to an urgent job and reroute in minutes instead of waiting for end-of-day reports." },
    ],
    steps: [
      { title: "Employee starts tracking", text: "One tap in the mobile app starts the session after location permission is granted." },
      { title: "Locations stream in", text: "GPS points are captured in the background and sent to the dashboard as the employee moves." },
      { title: "Managers see it live", text: "The web console updates the map, the employee list and the KPIs in real time." },
    ],
    related: ["route-history", "offline-tracking", "visit-management"],
  },
  {
    slug: "offline-tracking",
    name: "Offline Tracking",
    icon: WifiOff,
    tag: "Zero Loss",
    menuLabel: "Keeps tracking without internet, syncs later",
    summary:
      "A local on-device queue keeps recording GPS points without internet. Everything synchronizes automatically the moment the network returns.",
    seo: {
      title: "Offline GPS Tracking for Field Teams",
      description:
        "Fietra keeps recording employee locations in basements, rural roads and dead zones, stores them on the device and syncs automatically when the network returns.",
    },
    hero: {
      eyebrow: "Offline-First Engine",
      title: "Tracking doesn't stop",
      highlight: "when the internet does.",
      intro:
        "GPS works without mobile data. Fietra keeps capturing the route in dead zones, stores every point on the device and fills the gap on the dashboard as soon as connectivity is back.",
    },
    benefits: [
      { title: "No gaps in the trail", text: "Routes through basements, highways and rural areas stay complete — no straight lines across missing data." },
      { title: "Stored securely on the device", text: "Location points are queued in encrypted local storage until they can be delivered." },
      { title: "Automatic sync", text: "When the network returns, buffered points upload in the background with no action from the employee." },
      { title: "Trustworthy reports", text: "Distance, visits and attendance are calculated on the full route, not just the parts with signal." },
    ],
    steps: [
      { title: "Connection drops", text: "The app detects there is no network and switches to offline capture." },
      { title: "Points stored locally", text: "GPS keeps working and every location is saved on the device." },
      { title: "Network returns", text: "Stored points sync automatically and the dashboard route is completed." },
    ],
    related: ["live-tracking", "route-history", "reports"],
  },
  {
    slug: "route-history",
    name: "Route History",
    icon: Route,
    tag: "Audit Trail",
    menuLabel: "Replay any shift with stops & timestamps",
    summary:
      "Replay the exact path taken on any shift. Examine halts, speeds, detours and timestamps with a complete audit trail.",
    seo: {
      title: "Employee Route History & Journey Replay",
      description:
        "Replay any field employee's day with Fietra route history — start and end times, visits, breaks, halts, speed and distance on one timeline.",
    },
    hero: {
      eyebrow: "Route History",
      title: "See the journey,",
      highlight: "not just the destination.",
      intro:
        "Every working day becomes a clean, replayable timeline — when tracking started, where the employee stopped, how long each visit and break lasted, and when the day ended.",
    },
    benefits: [
      { title: "Complete daily timeline", text: "Start, visits, breaks and end of day in order, each with its time and location." },
      { title: "Halts and detours visible", text: "Spot long stops, unplanned detours and idle time directly on the route." },
      { title: "Accurate distance", text: "Kilometres travelled are calculated from the recorded route for reimbursement and planning." },
      { title: "Evidence when you need it", text: "Resolve disputes about visits and travel with a timestamped record of the day." },
    ],
    steps: [
      { title: "Route is recorded", text: "Every location point from the shift is stored against the employee's session." },
      { title: "Events are placed on it", text: "Visits, breaks and offline stretches are marked on the timeline automatically." },
      { title: "Replay any day", text: "Managers open any date to replay the route stop by stop." },
    ],
    related: ["live-tracking", "visit-management", "reports"],
  },
  {
    slug: "visit-management",
    name: "Visit Management",
    icon: CheckCircle2,
    tag: "Client Visits",
    menuLabel: "Location-verified check-ins & visit proof",
    summary:
      "Assign client destinations, verify arrival and on-site duration, and collect notes, signatures and photo proof.",
    seo: {
      title: "Field Visit Verification & Management",
      description:
        "Verify customer visits with location-based check-in, on-site duration, notes, orders and photo proof — all linked to the employee's route in Fietra.",
    },
    hero: {
      eyebrow: "Visit Management",
      title: "Every customer visit,",
      highlight: "verified on location.",
      intro:
        "Fietra detects when an employee reaches a client, records a location-verified check-in, and captures the outcome of the visit — so every visit in your reports actually happened.",
    },
    benefits: [
      { title: "Location-verified check-in", text: "Check-ins are confirmed against the client's location, removing doubt about who visited where." },
      { title: "Time on site recorded", text: "Arrival, departure and meeting duration are logged automatically." },
      { title: "Proof attached", text: "Notes, orders, photos and signatures are captured in the app and stored with the visit." },
      { title: "Linked to the route", text: "Each visit sits on the employee's route history, in context with the rest of the day." },
    ],
    steps: [
      { title: "Arrive at the client", text: "The app detects the visit location as the employee arrives." },
      { title: "Check in and work", text: "A location-verified check-in starts the visit; the employee completes the activity." },
      { title: "Submit the visit", text: "Notes, orders and photos are submitted and appear for managers immediately." },
    ],
    related: ["route-history", "attendance-breaks", "reports"],
  },
  {
    slug: "attendance-breaks",
    name: "Geo Attendance & Breaks",
    icon: Clock,
    tag: "Compliance",
    menuLabel: "Geofenced punch-in and break tracking",
    summary:
      "Geofenced punch-in plus meal, tea and rest breaks — separating real breaks from idle time while keeping attendance accurate.",
    seo: {
      title: "Geo Attendance & Break Tracking for Field Staff",
      description:
        "Geofenced attendance, tamper-resistant punch-in and automatic break tracking for field employees — accurate timesheets without manual reporting.",
    },
    hero: {
      eyebrow: "Geo Attendance & Breaks",
      title: "Attendance that reflects",
      highlight: "real field work.",
      intro:
        "Punch-in is tied to location, and breaks are recorded when they happen — so timesheets show actual working time instead of guesses from the end of the day.",
    },
    benefits: [
      { title: "Geofenced punch-in", text: "Attendance is marked at approved locations, with mock-location and spoofing checks." },
      { title: "Breaks recorded automatically", text: "Employees pause tracking for a break and the duration is logged without manual entries." },
      { title: "Breaks vs. idle time", text: "Distinguish legitimate meal and tea breaks from unexplained idle time on the route." },
      { title: "Clean timesheets", text: "Working hours, breaks and overtime come straight from recorded activity." },
    ],
    steps: [
      { title: "Punch in on location", text: "The employee starts the day inside an approved geofence." },
      { title: "Take a break", text: "Tracking pauses for the break and the break timer runs automatically." },
      { title: "Resume and close", text: "Tracking resumes in one tap; the day closes with a complete attendance record." },
    ],
    related: ["live-tracking", "visit-management", "reports"],
  },
  {
    slug: "reports",
    name: "Reports & Analytics",
    icon: FileBarChart2,
    tag: "Analytics",
    menuLabel: "Distance, visits, breaks & attendance reports",
    summary:
      "Detailed tracking reports — distance, visits, breaks, idle time and attendance — plus custom reports with flexible filters and schedules.",
    seo: {
      title: "Field Workforce Reports & Analytics",
      description:
        "Turn field movement into insight: Fietra reports on distance, visits, breaks, idle time and attendance, with custom and scheduled reports for admins.",
    },
    hero: {
      eyebrow: "Reports & Analytics",
      title: "From employee movement",
      highlight: "to business insight.",
      intro:
        "Fietra turns every route, visit and break into reports your operations, sales and HR teams can act on — delivered on a schedule or built on demand.",
    },
    benefits: [
      { title: "Ready-made reports", text: "Daily distance, visit summaries, attendance and break reports out of the box." },
      { title: "Custom reports", text: "Admins choose the filters, columns and teams that matter to them." },
      { title: "Scheduled delivery", text: "Reports run automatically — daily, weekly or at the end of each shift." },
      { title: "Built on complete data", text: "Offline stretches are synced before reporting, so numbers are calculated on the full day." },
    ],
    steps: [
      { title: "Track", text: "Locations, routes and attendance are captured throughout the day." },
      { title: "Understand", text: "Visits, breaks and idle time are recognised and summarised per employee." },
      { title: "Act", text: "Managers review reports and adjust territories, schedules and staffing." },
    ],
    related: ["route-history", "visit-management", "attendance-breaks"],
  },
];

export const productPath = (slug: ProductSlug) => `/product/${slug}`;

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
