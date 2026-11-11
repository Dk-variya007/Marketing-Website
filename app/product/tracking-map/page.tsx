import { TrackingMapPage } from "@/components/tracking-map/TrackingMapPage";
import { pageMetadata } from "@/lib/seo";
import { TRACKING_MAP_PATH } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Tracking Map: How Field Tracking Works",
  description:
    "Follow one field employee's day on a live map: start tracking, take a break, resume, keep tracking offline, check in to a visit and stop tracking.",
  path: TRACKING_MAP_PATH,
});

export default function Page() {
  return <TrackingMapPage />;
}
