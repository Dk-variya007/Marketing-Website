import Link from "next/link";
import { Coffee, Eye, Lock, Power, ShieldCheck, Smartphone } from "lucide-react";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqLd, pageMetadata } from "@/lib/seo";
import { LEGAL } from "@/lib/legal";

const PATH = "/employee-privacy";

export const metadata = pageMetadata({
  title: "Employee Privacy & Consent",
  description:
    "How Fietra keeps field employee tracking fair and transparent: tracking only during work sessions, visible status, paused breaks, and a consent checklist for employers.",
  path: PATH,
});

// Each commitment matches how the app already behaves (see the Tracking Map stages).
const PRINCIPLES = [
  { icon: Power, title: "Only while working", text: "Locations are recorded only during an active tracking session — from Start Tracking to Stop Tracking." },
  { icon: Coffee, title: "Breaks are private", text: "Tracking pauses during a break and resumes when the employee continues." },
  { icon: Eye, title: "Always visible", text: "The app shows clearly when tracking is on, so employees always know." },
  { icon: Smartphone, title: "Permission first", text: "The app asks for location permission before tracking can start." },
  { icon: Lock, title: "Protected offline", text: "Points recorded without internet stay in encrypted storage on the device until they sync." },
  { icon: ShieldCheck, title: "For work only", text: "Our Terms require customers to use tracking only for legitimate work purposes." },
];

const FAQS = [
  {
    q: "Does Fietra track employees after work?",
    a: "No. Locations are recorded only while a tracking session is active. Once the employee stops tracking at the end of the day, no more locations are recorded.",
  },
  {
    q: "Is location recorded during breaks?",
    a: "No. When an employee takes a break, tracking pauses; only the break duration is recorded. Tracking resumes when they continue.",
  },
  {
    q: "Who can see an employee's location?",
    a: "Only the managers and admins the employer authorises in Fietra.",
  },
  {
    q: "Can employees ask to see or correct their data?",
    a: "Yes. Employees can ask their employer for access, correction or deletion of their data, and Fietra helps the employer respond.",
  },
];

const sections: LegalSection[] = [
  {
    id: "why-it-matters",
    title: "Why transparency matters",
    body: (
      <p>
        Tracking works best when employees trust it. When people know what is recorded, when, and why, they are far more likely to keep the
        app running — and the data managers rely on stays complete. Fietra is designed so tracking is limited to work and always visible.
      </p>
    ),
  },
  {
    id: "employer-checklist",
    title: "Consent checklist for employers",
    body: (
      <>
        <p>
          Under India&apos;s Digital Personal Data Protection Act, 2023 and similar laws, the employer is responsible for informing employees
          and obtaining consent where required. Before rolling out Fietra:
        </p>
        <ul>
          <li>
            <strong>Tell employees what is tracked:</strong> location during work sessions, attendance, breaks, visits and distance.
          </li>
          <li>
            <strong>Explain why:</strong> for example, visit verification, travel reimbursement, attendance and safety.
          </li>
          <li>
            <strong>Say when:</strong> only during working time, from the start to the end of the tracking session.
          </li>
          <li>
            <strong>Say who can see it:</strong> the specific managers and admins with access.
          </li>
          <li>
            <strong>Say how long it&apos;s kept,</strong> and how employees can access, correct or delete their data.
          </li>
          <li>
            <strong>Record consent</strong> where the law requires it, and give a contact for questions or grievances.
          </li>
        </ul>
        <p>
          Our <Link href="/legal/terms">Terms of Service</Link> make lawful, fair tracking a customer obligation.
        </p>
      </>
    ),
  },
  {
    id: "employee-rights",
    title: "Rights of employees",
    body: (
      <p>
        Employees can ask their employer to access, correct or erase their personal data, withdraw consent where consent is the basis, and
        raise a grievance. Fietra supports employers in responding. Read more in our <Link href="/legal/privacy-policy">Privacy Policy</Link>,
        or write to {LEGAL.privacyEmail}.
      </p>
    ),
  },
  {
    id: "faq",
    title: "Frequently asked questions",
    body: (
      <div className="space-y-5">
        {FAQS.map((f) => (
          <div key={f.q}>
            <h3 className="font-semibold text-navy-950">{f.q}</h3>
            <p className="mt-1">{f.a}</p>
          </div>
        ))}
      </div>
    ),
  },
];

export default function EmployeePrivacyPage() {
  return (
    <>
      <LegalPage
        title="Employee Privacy & Consent"
        path={PATH}
        intro="Tracking your team can trust: it only runs during work, pauses for breaks, and is always visible to the employee."
        sections={sections}
        lead={
          <ul className="mb-4 grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <h2 className="mt-3 text-base font-bold text-navy-950">{title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
              </li>
            ))}
          </ul>
        }
      />
      <JsonLd data={faqLd(FAQS)} />
    </>
  );
}
