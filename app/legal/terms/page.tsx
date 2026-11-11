import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { LEGAL } from "@/lib/legal";

const PATH = "/legal/terms";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: "The terms that apply when businesses and their employees use Fietra's field workforce tracking platform and website.",
  path: PATH,
});

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "1. Agreement",
    body: (
      <p>
        These Terms govern access to and use of the Fietra website, mobile app and web console (the &ldquo;Service&rdquo;) provided by{" "}
        {LEGAL.companyName}. By using the Service, or by accepting an order form that refers to these Terms, the business you represent
        (the &ldquo;Customer&rdquo;) agrees to them. If an order form conflicts with these Terms, the order form applies.
      </p>
    ),
  },
  {
    id: "service",
    title: "2. The Service",
    body: (
      <p>
        Fietra provides GPS tracking, attendance, visit, route and reporting features for field teams. Features marked &ldquo;Coming
        soon&rdquo; are plans, not commitments: their scope and timing may change, and they are not part of the Service until released.
      </p>
    ),
  },
  {
    id: "accounts",
    title: "3. Accounts",
    body: (
      <p>
        The Customer is responsible for the users it invites, for keeping login details secure, and for all activity under its account.
        Tell us promptly at {LEGAL.supportEmail} if you suspect unauthorised access.
      </p>
    ),
  },
  {
    id: "lawful-tracking",
    title: "4. Lawful tracking — Customer responsibilities",
    body: (
      <>
        <p>Location tracking must be lawful and fair to employees. The Customer agrees to:</p>
        <ul>
          <li>tell employees, before tracking starts, what is tracked, when, why and who can see it;</li>
          <li>obtain any consent required by law and keep a record of it;</li>
          <li>use tracking only for legitimate work purposes and within working time;</li>
          <li>respond to employees&apos; requests about their personal data.</li>
        </ul>
        <p>
          Our <Link href="/employee-privacy">Employee Privacy guide</Link> sets out good practice. See also our{" "}
          <Link href="/legal/privacy-policy">Privacy Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "5. Acceptable use",
    body: (
      <>
        <p>You must not:</p>
        <ul>
          <li>track anyone without the notice and consent the law requires, or outside the work relationship;</li>
          <li>use the Service to harass, stalk or discriminate against anyone;</li>
          <li>falsify locations or attempt to defeat anti-spoofing checks;</li>
          <li>reverse engineer, overload or interfere with the Service, or access it by automated means we have not approved.</li>
        </ul>
      </>
    ),
  },
  {
    id: "pilot-and-fees",
    title: "6. Free pilot and fees",
    body: (
      <p>
        A free pilot, where offered, lasts for the period stated when it starts and needs no payment details. After the pilot, paid use is
        subject to the fees and payment terms in the Customer&apos;s order form or quote.
      </p>
    ),
  },
  {
    id: "customer-data",
    title: "7. Customer data",
    body: (
      <p>
        The Customer owns the data it and its users put into the Service. We process it only to provide and support the Service, as
        described in our Privacy Policy. When the agreement ends, the Customer may export its data within a reasonable period, after which
        we delete it unless the law requires us to keep it.
      </p>
    ),
  },
  {
    id: "emergency",
    title: "8. Emergency features",
    body: (
      <p>
        Emergency features (such as the planned Emergency SOS) are an extra layer of support. They depend on the device, battery and
        network coverage and may not always work. They are not a replacement for contacting emergency services directly, and the Customer
        remains responsible for its own employee safety procedures.
      </p>
    ),
  },
  {
    id: "ip",
    title: "9. Intellectual property",
    body: (
      <p>
        Fietra and its licensors own the Service, including its software, design and content. We grant the Customer a non-exclusive,
        non-transferable right to use the Service during the subscription. Feedback you give us may be used to improve the Service.
      </p>
    ),
  },
  {
    id: "availability",
    title: "10. Availability and changes",
    body: (
      <p>
        We work to keep the Service available and reliable but do not guarantee it will be uninterrupted or error-free. We may improve or
        change features; we will not materially reduce core functionality during a paid term without notice.
      </p>
    ),
  },
  {
    id: "warranties",
    title: "11. Disclaimers",
    body: (
      <p>
        Except as expressly stated in an order form, the Service is provided &ldquo;as is&rdquo;. GPS accuracy depends on the device and
        environment, and location data should be used with that in mind.
      </p>
    ),
  },
  {
    id: "liability",
    title: "12. Limitation of liability",
    body: (
      <p>
        To the extent permitted by law, neither party is liable for indirect or consequential losses, and each party&apos;s total liability
        is limited to the fees paid by the Customer in the 12 months before the claim. Nothing limits liability that cannot be limited by
        law.
      </p>
    ),
  },
  {
    id: "termination",
    title: "13. Suspension and termination",
    body: (
      <p>
        Either party may end the agreement as set out in the order form. We may suspend access that breaches these Terms or puts the
        Service or others at risk, and will tell the Customer where reasonably possible.
      </p>
    ),
  },
  {
    id: "law",
    title: "14. Governing law",
    body: (
      <p>
        These Terms are governed by {LEGAL.governingLaw}, and the courts of {LEGAL.courts} have exclusive jurisdiction.
      </p>
    ),
  },
  {
    id: "contact",
    title: "15. Changes and contact",
    body: (
      <p>
        We may update these Terms and will post the new version here. Questions: {LEGAL.supportEmail}, {LEGAL.registeredAddress}.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      path={PATH}
      intro="The rules for using Fietra — including what businesses must do to track their field teams fairly and lawfully."
      sections={sections}
    />
  );
}
