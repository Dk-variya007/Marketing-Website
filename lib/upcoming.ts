import type { LucideIcon } from "lucide-react";
import {
  Ambulance,
  BellRing,
  CarFront,
  ClipboardPen,
  Fingerprint,
  HeartPulse,
  History,
  MapPinned,
  PhoneCall,
  Receipt,
  ShieldAlert,
  Siren,
  TriangleAlert,
} from "lucide-react";
import type { ProductSlug } from "./products";

// Features on the roadmap, shown as "Coming soon". They power /product/upcoming, the home page preview,
// the "Coming soon" strip on related product pages, the menus and the sitemap.
// Keep the copy to what the feature is planned to do — no dates or numbers until they're confirmed.

export const UPCOMING_PATH = "/product/upcoming";

export type UpcomingId = "emergency-sos" | "attendance-regularisation" | "punch" | "travel-expense";

export interface UpcomingFeature {
  id: UpcomingId;
  name: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  points: string[];
  /** Live capabilities this feature extends — the feature is teased on those product pages. */
  extends: ProductSlug[];
}

export const EMERGENCY_SOS: UpcomingFeature = {
  id: "emergency-sos",
  name: "Emergency SOS",
  icon: Siren,
  tagline: "One tap for help, with the location already shared.",
  description:
    "Field work happens on the road. If an employee has an accident or any other emergency while tracking, they can raise an SOS from the app — calling for help and sharing their live location with their manager in the same tap.",
  points: [
    "One-tap SOS button inside the tracking screen",
    "Call emergency services or your company's emergency contact from the app",
    "Live location shared instantly with the manager",
    "Alert raised on the manager dashboard",
    "Incident recorded on the employee's route timeline",
  ],
  extends: ["live-tracking", "route-history"],
};

/** Situations the SOS flow is designed for. */
export const EMERGENCY_TYPES: { label: string; icon: LucideIcon }[] = [
  { label: "Road accident", icon: CarFront },
  { label: "Medical emergency", icon: HeartPulse },
  { label: "Vehicle breakdown", icon: TriangleAlert },
  { label: "Personal safety threat", icon: ShieldAlert },
  { label: "Need urgent assistance", icon: Ambulance },
];

/** The SOS sequence, step by step. */
export const SOS_FLOW: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Tap SOS", text: "The employee presses SOS from the tracking screen.", icon: Siren },
  { title: "Call for help", text: "Emergency services or the company emergency contact is called from the app.", icon: PhoneCall },
  { title: "Location shared", text: "The live location goes to the manager straight away.", icon: MapPinned },
  { title: "Manager alerted", text: "An emergency alert appears on the dashboard so help can be coordinated.", icon: BellRing },
  { title: "Incident logged", text: "The SOS is saved on the day's route for follow-up.", icon: History },
];

export const UPCOMING_FEATURES: UpcomingFeature[] = [
  {
    id: "attendance-regularisation",
    name: "Attendance Regularisation",
    icon: ClipboardPen,
    tagline: "Fix a missed or wrong punch the right way.",
    description:
      "When a punch is missed or recorded incorrectly, employees request a correction from the app with a reason. Managers review it and approve or reject it, and the attendance record updates with a full audit trail.",
    points: [
      "Request a correction for a missed or incorrect punch",
      "Add a reason with every request",
      "Manager approval or rejection",
      "Attendance updated automatically once approved",
      "Every change kept in an audit trail",
    ],
    extends: ["attendance-breaks", "reports"],
  },
  {
    id: "punch",
    name: "Punch In & Out",
    icon: Fingerprint,
    tagline: "Start and end the working day in one tap.",
    description:
      "Employees punch in and out from the mobile app. Each punch is stamped with the time and location and linked to the day's tracking session, so attendance and the route always line up.",
    points: [
      "One-tap punch in and punch out from the app",
      "Time and location recorded with every punch",
      "Linked to the day's tracking session",
      "Feeds working hours straight into attendance",
    ],
    extends: ["attendance-breaks", "live-tracking"],
  },
  {
    id: "travel-expense",
    name: "Travel Expense",
    icon: Receipt,
    tagline: "Claims based on the distance actually travelled.",
    description:
      "Travel claims start from the route Fietra already records. Employees add receipts for fuel, tolls or parking, submit the claim from the app, and managers approve it with the trip right there for reference.",
    points: [
      "Distance taken from the recorded route",
      "Attach receipts for fuel, tolls and parking",
      "Submit claims from the mobile app",
      "Manager review with the trip for reference",
      "Expense reports for reimbursement",
    ],
    extends: ["route-history", "reports"],
  },
];

export const ALL_UPCOMING: UpcomingFeature[] = [EMERGENCY_SOS, ...UPCOMING_FEATURES];

export const upcomingPath = (id: UpcomingId) => `${UPCOMING_PATH}#${id}`;

export const upcomingFor = (slug: ProductSlug) => ALL_UPCOMING.filter((f) => f.extends.includes(slug));
