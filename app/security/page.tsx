import Link from "next/link";
import { CloudUpload, KeyRound, Lock, MapPinOff, Server, UserCog } from "lucide-react";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { LEGAL } from "@/lib/legal";

const PATH = "/security";

export const metadata = pageMetadata({
  title: "Security & Data Protection",
  description:
    "How Fietra protects field location data: encrypted on-device storage, encrypted transfer, role-based access, anti-spoofing checks and customer control over data.",
  path: PATH,
});

// ⚠️ Confirm each statement matches your production setup before launch.
const HIGHLIGHTS = [
  { icon: Lock, title: "Encrypted on the device", text: "Location points captured offline are kept in encrypted local storage until they sync." },
  { icon: CloudUpload, title: "Encrypted in transit", text: "Data moves between the app, servers and web console over HTTPS/TLS." },
  { icon: UserCog, title: "Role-based access", text: "Customers decide which managers and admins can see which teams." },
  { icon: MapPinOff, title: "Anti-spoofing", text: "Mock-location and VPN spoofing checks protect the integrity of attendance and visits." },
  { icon: Server, title: "Hosting", text: `Service data is hosted in ${LEGAL.dataLocation}.` },
  { icon: KeyRound, title: "Customer-owned data", text: "Customers own their data and can export it; it is deleted when the contract ends." },
];

const sections: LegalSection[] = [
  {
    id: "app",
    title: "Mobile app",
    body: (
      <ul>
        <li>Location permission is requested before tracking starts, and tracking runs only during an active session.</li>
        <li>When there is no network, location points are stored in encrypted storage on the device and uploaded automatically later.</li>
        <li>Mock-location and VPN spoofing checks help prevent falsified attendance and visits.</li>
      </ul>
    ),
  },
  {
    id: "platform",
    title: "Platform and access",
    body: (
      <ul>
        <li>All traffic between the app, our servers and the web console is encrypted with HTTPS/TLS.</li>
        <li>Customers control who can see which teams through manager and admin roles.</li>
        <li>Access by Fietra staff is limited to what is needed to operate and support the Service.</li>
      </ul>
    ),
  },
  {
    id: "data-control",
    title: "Your data, your control",
    body: (
      <ul>
        <li>Customers own the data in their account and can export it.</li>
        <li>Data is deleted after the contract ends, unless the law requires us to keep it.</li>
        <li>
          We process employee data only on the customer&apos;s instructions — see our <Link href="/legal/privacy-policy">Privacy Policy</Link>.
        </li>
      </ul>
    ),
  },
  {
    id: "report",
    title: "Reporting a security issue",
    body: (
      <p>
        If you believe you have found a vulnerability, please email {LEGAL.supportEmail} with details. We will investigate and respond as
        quickly as we can, and ask that you give us a reasonable chance to fix it before disclosing it.
      </p>
    ),
  },
];

export default function SecurityPage() {
  return (
    <LegalPage
      title="Security & Data Protection"
      path={PATH}
      intro="Location data is sensitive. Here is how Fietra protects it — on the device, in transit and on our platform."
      sections={sections}
      lead={
        <ul className="mb-4 grid gap-4 sm:grid-cols-2">
          {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
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
  );
}
