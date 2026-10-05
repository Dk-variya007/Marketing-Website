import type { Metadata } from "next";
import { TrackingMapPage } from "@/components/tracking-map/TrackingMapPage";

export const metadata: Metadata = {
  title: "Tracking Map | Fietra Geo Tracking, Stage by Stage",
  description:
    "A top-view walkthrough of Fietra Geo Tracking: start tracking, take a break, resume, track offline, check in to a visit and stop tracking.",
};

export default function Page() {
  return <TrackingMapPage />;
}
