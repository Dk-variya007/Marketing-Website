import type React from "react";
import {
  BatteryCharging,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  CloudUpload,
  Coffee,
  Database,
  FileText,
  Flag,
  History,
  LocateFixed,
  MapPin,
  MapPinCheck,
  PauseCircle,
  PlayCircle,
  Power,
  Route,
  Satellite,
  Send,
  ShieldCheck,
  Smartphone,
  WifiOff,
} from "lucide-react";

export type Point = { icon: React.ElementType; text: string };

export const SECTIONS: {
  milestone: string;
  title: string;
  description: string;
  points: Point[];
}[] = [
  {
    milestone: "Start",
    title: "Start Tracking",
    description:
      "Start your journey with a single tap. Once location permission is granted, the application begins tracking your journey in the background.",
    points: [
      { icon: ShieldCheck, text: "Location permission requested once" },
      { icon: Satellite, text: "GPS locks your current location" },
      { icon: Smartphone, text: "Keeps tracking in the background" },
      { icon: PlayCircle, text: "Journey starts with one tap" },
      { icon: LocateFixed, text: "Real-time location updates" },
    ],
  },
  {
    milestone: "Break",
    title: "Take a Break",
    description:
      "Need a short break? Pause your journey when required and continue tracking when you're ready to move again.",
    points: [
      { icon: Coffee, text: "Take a break anywhere on the route" },
      { icon: PauseCircle, text: "Tracking pauses temporarily" },
      { icon: Clock, text: "Break duration recorded automatically" },
      { icon: PlayCircle, text: "Resume whenever you're ready" },
      { icon: History, text: "Journey timeline stays organized" },
    ],
  },
  {
    milestone: "Resume",
    title: "Tracking Resumed",
    description:
      "Your break is over. Resume tracking and continue your journey without losing the flow of your workday.",
    points: [
      { icon: PlayCircle, text: "Tracking resumed in one tap" },
      { icon: LocateFixed, text: "Location updates active again" },
      { icon: Route, text: "Journey continues on the same route" },
      { icon: History, text: "Previous journey context maintained" },
    ],
  },
  {
    milestone: "Offline",
    title: "Track Even Without Internet",
    description:
      "No internet connection? Your journey can continue. Location data is stored securely on the device and synchronized when connectivity is restored.",
    points: [
      { icon: Satellite, text: "GPS keeps working without data" },
      { icon: Database, text: "Location points stored locally" },
      { icon: WifiOff, text: "No internet needed to capture locations" },
      { icon: CloudUpload, text: "Automatic sync when network returns" },
      { icon: BatteryCharging, text: "No interruption to the journey" },
    ],
  },
  {
    milestone: "Visit",
    title: "Check In to Your Visit",
    description:
      "Reach your destination, check in to the visit, complete the required activity, and submit the visit details.",
    points: [
      { icon: MapPin, text: "Visit location detected on arrival" },
      { icon: MapPinCheck, text: "Location-verified check-in" },
      { icon: ClipboardCheck, text: "Complete the visit activity" },
      { icon: FileText, text: "Add notes, orders and photos" },
      { icon: Send, text: "Submit with completion confirmation" },
    ],
  },
  {
    milestone: "Complete",
    title: "Stop Tracking",
    description:
      "Once your work journey is complete, stop tracking to end the tracking session. Your full day is saved as one clean journey.",
    points: [
      { icon: Flag, text: "Final location recorded" },
      { icon: Route, text: "Journey completed end to end" },
      { icon: Power, text: "Tracking stopped — no more pings" },
      { icon: CheckCircle2, text: "Visit marked as completed" },
      { icon: FileText, text: "Tracking summary for the day" },
    ],
  },
];
