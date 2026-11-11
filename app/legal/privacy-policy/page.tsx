import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { LEGAL } from "@/lib/legal";

const PATH = "/legal/privacy-policy";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Fietra collects, uses and protects personal data — for website visitors, customers, and the field employees whose locations are tracked through the Fietra app.",
  path: PATH,
});

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "1. Who we are",
    body: (
      <>
        <p>
          {LEGAL.companyName} (&ldquo;Fietra&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) provides a field workforce platform for GPS tracking,
          attendance, visits, routes and reports. Our registered office is at {LEGAL.registeredAddress}.
        </p>
        <p>
          This policy explains what personal data we handle, why, and the choices and rights you have. It covers our website, our mobile
          app and our web console (together, the &ldquo;Service&rdquo;).
        </p>
      </>
    ),
  },
  {
    id: "our-role",
    title: "2. Our role: your employer decides, we process",
    body: (
      <>
        <p>Fietra is used by businesses (&ldquo;Customers&rdquo;) to manage their field teams. That affects who is responsible for what:</p>
        <ul>
          <li>
            <strong>Employee data in the Service</strong> (locations, attendance, visits, breaks) is collected on behalf of the Customer. The
            Customer decides why and how it is used and is the data fiduciary / controller. Fietra processes it only on the Customer&apos;s
            instructions, as a data processor.
          </li>
          <li>
            <strong>Website visitors and Customer contacts</strong> (for example, someone requesting a demo): Fietra decides how that data is
            used and is responsible for it.
          </li>
        </ul>
        <p>
          If you are a field employee and have questions about how your employer uses your data, please contact your employer first. We
          will help them respond.
        </p>
      </>
    ),
  },
  {
    id: "data-we-collect",
    title: "3. Data we collect",
    body: (
      <>
        <p>
          <strong>When you visit our website or request a demo:</strong> your name, work email, company name, team size and industry, and
          standard technical data such as IP address, browser type and the pages you visit, recorded in server logs.
        </p>
        <p>
          <strong>When your employer uses Fietra:</strong>
        </p>
        <ul>
          <li>Account details: name, work contact details, role and team.</li>
          <li>
            Location data: GPS points recorded <strong>while a tracking session is active</strong> — from when tracking is started until it
            is stopped. Tracking pauses during breaks.
          </li>
          <li>Work activity: punch and attendance times, breaks, customer visits and check-ins, and distance travelled.</li>
          <li>Content you add: visit notes, orders, photos and other information you submit in the app.</li>
          <li>Device information needed to run tracking reliably, such as battery level, network status and app version.</li>
        </ul>
        <p>
          When there is no internet connection, location points are stored on the device in encrypted storage and uploaded automatically
          once the connection returns.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "4. How we use data",
    body: (
      <ul>
        <li>To provide the Service: live maps, route history, attendance, visit records and reports for the Customer.</li>
        <li>To respond to demo requests and communicate with Customers about their account.</li>
        <li>To keep the Service secure, including detecting fake or spoofed locations and preventing misuse.</li>
        <li>To maintain and improve the Service, using aggregated or de-identified data wherever possible.</li>
        <li>To meet legal obligations.</li>
      </ul>
    ),
  },
  {
    id: "consent",
    title: "5. Consent and legal basis",
    body: (
      <>
        <p>
          The mobile app asks for location permission before tracking starts, and the employee can see in the app when tracking is on.
          Customers are responsible for informing their employees about tracking and obtaining any consent required under applicable law,
          including India&apos;s Digital Personal Data Protection Act, 2023. Our{" "}
          <Link href="/employee-privacy">Employee Privacy guide</Link> explains how.
        </p>
        <p>
          For website visitors, we process demo requests based on your consent when you submit the form, and technical data based on our
          legitimate interest in running a secure website.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "6. Who we share data with",
    body: (
      <ul>
        <li>
          <strong>The Customer</strong> — your employer and the managers and admins it authorises.
        </li>
        <li>
          <strong>Service providers</strong> that help us run the Service (such as hosting, email delivery and maps), under contracts that
          require them to protect the data and use it only for us.
        </li>
        <li>
          <strong>Authorities</strong>, when the law requires it.
        </li>
      </ul>
    ),
  },
  {
    id: "retention",
    title: "7. How long we keep data",
    body: (
      <p>
        Employee data in the Service is kept for as long as the Customer&apos;s account is active, or for the retention period the Customer
        sets, and deleted or returned when the contract ends. Demo request details are kept for as long as needed to follow up, and deleted
        on request.
      </p>
    ),
  },
  {
    id: "security",
    title: "8. Security",
    body: (
      <p>
        We protect data with technical and organisational measures appropriate to its sensitivity. See our <Link href="/security">Security</Link>{" "}
        page for details.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "9. Your rights",
    body: (
      <>
        <p>Depending on where you live, you can ask to:</p>
        <ul>
          <li>access the personal data held about you;</li>
          <li>correct or complete it;</li>
          <li>have it erased;</li>
          <li>withdraw consent you have given;</li>
          <li>raise a grievance, and nominate someone to exercise your rights on your behalf.</li>
        </ul>
        <p>
          For data in the Service, send your request to your employer; we will assist them. For anything else, contact us at{" "}
          {LEGAL.privacyEmail}.
        </p>
      </>
    ),
  },
  {
    id: "transfers",
    title: "10. Where data is stored",
    body: (
      <p>
        Service data is hosted in {LEGAL.dataLocation}. If data is transferred to another country, we do so only as permitted by applicable
        law.
      </p>
    ),
  },
  {
    id: "children",
    title: "11. Children",
    body: <p>The Service is for businesses and their employees. It is not directed at children, and we do not knowingly collect their data.</p>,
  },
  {
    id: "changes",
    title: "12. Changes to this policy",
    body: (
      <p>
        We may update this policy. We will post the new version here with a new &ldquo;Last updated&rdquo; date, and tell Customers about
        significant changes.
      </p>
    ),
  },
  {
    id: "contact",
    title: "13. Contact and grievances",
    body: (
      <p>
        Privacy questions: {LEGAL.privacyEmail}. Grievance Officer: {LEGAL.grievanceOfficer}, {LEGAL.registeredAddress}. We aim to respond
        within the timelines required by applicable law.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path={PATH}
      intro="How we handle personal data for website visitors, our customers, and the field employees who use the Fietra app."
      sections={sections}
    />
  );
}
