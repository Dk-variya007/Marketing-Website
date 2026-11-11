import type { LucideIcon } from "lucide-react";
import { Briefcase, HardHat, Truck, Wrench } from "lucide-react";

// Industries shown in the Solutions menu, the footer and on /solutions (each card has its own anchor).

export interface Solution {
  id: string;
  name: string;
  icon: LucideIcon;
  menuLabel: string;
}

export const SOLUTIONS: Solution[] = [
  { id: "field-sales", name: "Field Sales", icon: Briefcase, menuLabel: "Verified client visits, notes & orders" },
  { id: "field-service", name: "Field Service", icon: Wrench, menuLabel: "Dispatch the nearest technician, verify jobs" },
  { id: "logistics-delivery", name: "Logistics & Delivery", icon: Truck, menuLabel: "Routes, proof of delivery & idle alerts" },
  { id: "construction", name: "Construction", icon: HardHat, menuLabel: "Site geofences, check-ins & crew hours" },
];

export const solutionPath = (id: string) => `/solutions#${id}`;
