import type { Metadata } from "next";
import { TrackingFlowPage } from "@/components/geo-journey/TrackingFlowPage";

export const metadata: Metadata = {
  title: "Tracking Flow | How Fietra Geo Tracking Works",
  description:
    "Follow a field employee's day — start tracking, take a break, resume, keep tracking offline, check in to a visit and stop tracking.",
};

export default function Page() {
  return <TrackingFlowPage />;
}
