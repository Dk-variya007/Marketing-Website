"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { StatusBadge, FieldStatusType } from "../ui/StatusBadge";
import { MapCard, EmployeeData } from "../ui/MapCard";
import {
  Users,
  Navigation,
  CheckCircle2,
  Filter,
  Search,
  Battery,
  MapPin,
  Clock,
  Zap,
  Maximize2,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

// Map geometry for each demo employee, in a 800 × 520 map space.
interface EmployeeMapData {
  /** Current position (end of route) */
  x: number;
  y: number;
  route: string;
  startX: number;
  startY: number;
  departure: string;
  stops: { x: number; y: number; label: string; kind: "visit" | "break" }[];
}

const MAP_W = 800;
const MAP_H = 520;

const EMPLOYEE_MAP: Record<string, EmployeeMapData> = {
  "emp-1": {
    x: 470, y: 380, startX: 70, startY: 470, departure: "09:00 AM Departure",
    route: "M70,470 C150,470 190,400 260,400 S380,430 470,380",
    stops: [{ x: 260, y: 400, label: "Visit: MedPlus (18m)", kind: "visit" }],
  },
  "emp-2": {
    x: 300, y: 220, startX: 80, startY: 80, departure: "09:20 AM Departure",
    route: "M80,80 C150,90 180,150 230,170 S280,210 300,220",
    stops: [{ x: 300, y: 220, label: "On site: Fortis Hospital", kind: "visit" }],
  },
  "emp-3": {
    x: 650, y: 430, startX: 360, startY: 500, departure: "08:45 AM Departure",
    route: "M360,500 C430,505 470,470 530,470 S610,450 650,430",
    stops: [{ x: 530, y: 470, label: "Visit: DLF Mall (30m)", kind: "visit" }],
  },
  "emp-4": {
    x: 160, y: 300, startX: 40, startY: 210, departure: "10:05 AM Departure",
    route: "M40,210 C80,220 110,280 160,300",
    stops: [{ x: 160, y: 300, label: "Break: Subway Express Hub", kind: "break" }],
  },
  "emp-5": {
    x: 560, y: 290, startX: 740, startY: 500, departure: "09:40 AM Departure",
    route: "M740,500 C710,430 650,380 610,345 S570,305 560,290",
    stops: [{ x: 560, y: 290, label: "On site: Reliance Retail Hub", kind: "visit" }],
  },
};

const STATUS_COLOR: Partial<Record<FieldStatusType, string>> = {
  tracking: "#2563eb",
  active: "#2563eb",
  "on-visit": "#8b5cf6",
  break: "#f59e0b",
  offline: "#f43f5e",
  synced: "#2563eb",
};

const pct = (x: number, y: number) => ({ left: `${(x / MAP_W) * 100}%`, top: `${(y / MAP_H) * 100}%` });

export function LiveTrackingShowcase() {
  const [filter, setFilter] = useState<string>("all");
  const [activeEmployeeId, setActiveEmployeeId] = useState<string>("emp-1");

  // Realistic Demo Employee Records
  const employees: EmployeeData[] = [
    {
      id: "emp-1",
      name: "Rahul Sharma",
      role: "Senior Territory Rep",
      avatarBg: "bg-blue-600",
      initials: "RS",
      status: "tracking",
      statusText: "En Route",
      distanceKm: "18.4 km",
      duration: "4h 12m",
      currentLocation: "Sector 62 Avenue, Noida",
      battery: 78,
      batteryCharging: false,
      network: "4G",
      lastSync: "Just now",
    },
    {
      id: "emp-2",
      name: "Amit Verma",
      role: "Field Service Engineer",
      avatarBg: "bg-purple-600",
      initials: "AV",
      status: "on-visit",
      statusText: "On Visit",
      distanceKm: "12.1 km",
      duration: "3h 45m",
      currentLocation: "Fortis Hospital - Site A",
      battery: 64,
      batteryCharging: false,
      network: "5G",
      lastSync: "1 min ago",
    },
    {
      id: "emp-3",
      name: "Priya Patel",
      role: "Key Account Manager",
      avatarBg: "bg-indigo-600",
      initials: "PP",
      status: "tracking",
      statusText: "Traveling",
      distanceKm: "24.6 km",
      duration: "5h 10m",
      currentLocation: "Cyber City Ring Road",
      battery: 91,
      batteryCharging: true,
      network: "5G",
      lastSync: "30s ago",
    },
    {
      id: "emp-4",
      name: "Vikram Malhotra",
      role: "Delivery Supervisor",
      avatarBg: "bg-amber-600",
      initials: "VM",
      status: "break",
      statusText: "Lunch Break",
      distanceKm: "9.3 km",
      duration: "2h 30m",
      currentLocation: "Subway Express Hub",
      battery: 45,
      batteryCharging: false,
      network: "4G",
      lastSync: "4 min ago",
    },
    {
      id: "emp-5",
      name: "Neha Joshi",
      role: "Installation Specialist",
      avatarBg: "bg-emerald-600",
      initials: "NJ",
      status: "on-visit",
      statusText: "On Visit",
      distanceKm: "15.8 km",
      duration: "3h 15m",
      currentLocation: "Reliance Retail Hub",
      battery: 82,
      batteryCharging: false,
      network: "4G",
      lastSync: "Just now",
    },
  ];

  const filteredEmployees = employees.filter((emp) => {
    if (filter === "all") return true;
    if (filter === "tracking") return emp.status === "tracking";
    if (filter === "on-visit") return emp.status === "on-visit";
    if (filter === "break") return emp.status === "break";
    return true;
  });

  const activeEmployee =
    filteredEmployees.find((e) => e.id === activeEmployeeId) || filteredEmployees[0] || employees[0];
  const activeMap = EMPLOYEE_MAP[activeEmployee.id];
  const activeColor = STATUS_COLOR[activeEmployee.status] ?? "#2563eb";

  // Keep the selection inside the filtered list so the map always matches it.
  const applyFilter = (next: string) => {
    setFilter(next);
    const visible = employees.filter((emp) => next === "all" || emp.status === next);
    if (!visible.some((emp) => emp.id === activeEmployeeId) && visible[0]) {
      setActiveEmployeeId(visible[0].id);
    }
  };

  return (
    <section id="live-tracking" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <Container size="wide">
        <SectionHeader
          badge="Real-Time Field Telemetry"
          title="See your team in real time."
          subtitle="Know where employees are, understand their movement, monitor client visits, and dispatch faster with total operational clarity."
          align="center"
        />

        {/* Demo KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 flex items-center justify-between shadow-xs">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Field Workforce
              </div>
              <div className="text-3xl font-extrabold text-navy-950 mt-1">
                24{" "}
                <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ● 100% active
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Employees currently tracking
              </div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0">
              <Users className="h-6 w-6" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 flex items-center justify-between shadow-xs">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Visits Verified
              </div>
              <div className="text-3xl font-extrabold text-navy-950 mt-1">
                8{" "}
                <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                  +3 in progress
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Completed customer appointments
              </div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-purple-100/80 text-purple-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-6 w-6" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 flex items-center justify-between shadow-xs">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Travel Logged
              </div>
              <div className="text-3xl font-extrabold text-navy-950 mt-1">
                142{" "}
                <span className="text-sm font-medium text-slate-600">km</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Total distance covered today
              </div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
              <Navigation className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Master Operations Workspace Interface */}
        <div className="rounded-3xl border border-slate-200/90 bg-white shadow-2xl overflow-hidden">
          {/* Top Control Bar */}
          <div className="p-4 sm:p-5 bg-slate-50/80 border-b border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2 hidden sm:inline">
                Filter:
              </span>
              <button
                onClick={() => applyFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filter === "all"
                    ? "bg-navy-900 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                All (24)
              </button>
              <button
                onClick={() => applyFilter("tracking")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filter === "tracking"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Tracking (14)
              </button>
              <button
                onClick={() => applyFilter("on-visit")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filter === "on-visit"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                On Visit (6)
              </button>
              <button
                onClick={() => applyFilter("break")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filter === "break"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                On Break (3)
              </button>
            </div>

            {/* Status indicators */}
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-medium text-navy-900">Live Satellite Stream</span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="font-mono text-[11px] bg-slate-200/70 px-2 py-0.5 rounded text-slate-700">
                10 sec polling
              </span>
            </div>
          </div>

          {/* Map & Live Employee Panel Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            {/* Left: Employee List */}
            <div className="lg:col-span-4 border-r border-slate-200/80 bg-slate-50/50 p-4 overflow-y-auto max-h-[520px] flex flex-col gap-2.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                Active Field Staff ({filteredEmployees.length})
              </div>

              {filteredEmployees.map((emp) => (
                <MapCard
                  key={emp.id}
                  employee={emp}
                  selected={emp.id === activeEmployee.id}
                  onClick={() => setActiveEmployeeId(emp.id)}
                />
              ))}
            </div>

            {/* Right: Interactive Large Map with Dynamic Trails */}
            <div className="lg:col-span-8 relative bg-[#f1f5f9] overflow-hidden min-h-[420px] sm:min-h-[500px]">
              {/* Road layer + routes (stretches to the panel; strokes stay crisp) */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox={`0 0 ${MAP_W} ${MAP_H}`}
                preserveAspectRatio="none"
                aria-hidden
              >
                <defs>
                  <pattern id="showcase-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width={MAP_W} height={MAP_H} fill="url(#showcase-grid)" />

                {/* Major Highways / Thoroughfares */}
                <g fill="none" stroke="#cbd5e1" vectorEffect="non-scaling-stroke">
                  <path d="M -50,150 C 200,100 400,250 850,180" strokeWidth="12" vectorEffect="non-scaling-stroke" />
                  <path d="M 220,-20 L 220,600" strokeWidth="8" vectorEffect="non-scaling-stroke" />
                  <path d="M 520,-20 Q 500,280 620,600" strokeWidth="8" vectorEffect="non-scaling-stroke" />
                  <path d="M -20,380 C 250,340 500,450 850,380" strokeWidth="10" vectorEffect="non-scaling-stroke" />
                </g>

                {/* Faint routes for everyone in the current filter */}
                <AnimatePresence>
                  {filteredEmployees
                    .filter((emp) => emp.id !== activeEmployee.id)
                    .map((emp) => (
                      <motion.path
                        key={`route-${emp.id}`}
                        d={EMPLOYEE_MAP[emp.id].route}
                        fill="none"
                        stroke={STATUS_COLOR[emp.status] ?? "#2563eb"}
                        strokeWidth={2.5}
                        strokeDasharray="5 6"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    ))}
                </AnimatePresence>

                {/* Selected employee's route draws itself in */}
                <motion.path
                  key={`glow-${activeEmployee.id}`}
                  d={activeMap.route}
                  fill="none"
                  stroke={activeColor}
                  strokeOpacity={0.18}
                  strokeWidth={12}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, ease: "easeInOut" }}
                />
                <motion.path
                  key={`active-${activeEmployee.id}`}
                  d={activeMap.route}
                  fill="none"
                  stroke={activeColor}
                  strokeWidth={4}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, ease: "easeInOut" }}
                />
              </svg>

              {/* Selected employee: start point + stops (appear after the route draws) */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`start-${activeEmployee.id}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                  style={pct(activeMap.startX, activeMap.startY)}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-6 w-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold ring-4 ring-white shadow">
                    S
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-7 text-[10px] font-bold text-slate-600 bg-white/95 px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                    {activeMap.departure}
                  </div>
                </motion.div>
                {activeMap.stops.map((stop) => (
                  <motion.div
                    key={`stop-${activeEmployee.id}-${stop.label}`}
                    className="absolute -translate-x-1/2 z-10"
                    style={{
                      ...pct(stop.x, stop.y),
                      marginTop: stop.x === activeMap.x && stop.y === activeMap.y ? -50 : 26,
                    }}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                  >
                    <div
                      className={`text-[10px] font-bold bg-white/95 px-2 py-0.5 rounded shadow whitespace-nowrap border ${
                        stop.kind === "break" ? "text-amber-800 border-amber-200" : "text-purple-900 border-purple-200"
                      }`}
                    >
                      {stop.label}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Live positions for everyone in the current filter */}
              <AnimatePresence>
                {filteredEmployees.map((emp) => {
                  const pos = EMPLOYEE_MAP[emp.id];
                  const selected = emp.id === activeEmployee.id;
                  const color = STATUS_COLOR[emp.status] ?? "#2563eb";
                  return (
                    <motion.button
                      key={`marker-${emp.id}`}
                      type="button"
                      onClick={() => setActiveEmployeeId(emp.id)}
                      aria-label={`Show ${emp.name} on the map`}
                      aria-pressed={selected}
                      className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                      style={{ ...pct(pos.x, pos.y), zIndex: selected ? 20 : 15 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: selected ? 1 : 0.8 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    >
                      {selected && (
                        <span className="absolute -inset-4 rounded-full animate-ping" style={{ backgroundColor: `${color}4d` }} />
                      )}
                      <span
                        className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-xl transition-opacity ${
                          selected ? "" : "opacity-80 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: color }}
                      >
                        {emp.initials}
                      </span>
                      {selected && (
                        <motion.span
                          key={`label-${emp.id}`}
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute left-1/2 -translate-x-1/2 top-11 bg-navy-950 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap flex items-center gap-1.5"
                        >
                          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: color === "#2563eb" ? "#34d399" : color }} />
                          <span>{emp.name}</span>
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </AnimatePresence>

              {/* Floating Inspector Panel for Selected Employee */}
              <motion.div
                key={`panel-${activeEmployee.id}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute top-4 right-4 max-w-xs w-full bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200/90 z-30 hidden sm:block"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className={`h-8 w-8 rounded-full ${activeEmployee.avatarBg ?? "bg-blue-600"} text-white flex items-center justify-center font-bold text-xs`}>
                      {activeEmployee.initials}
                    </div>
                    <div>
                      <div className="font-bold text-navy-950 text-xs sm:text-sm">
                        {activeEmployee.name}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {activeEmployee.role}
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={activeEmployee.status} size="sm" />
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Navigation className="h-3.5 w-3.5 text-brand-600" />
                      Trip Distance:
                    </span>
                    <span className="font-bold text-navy-900">
                      {activeEmployee.distanceKm}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      Shift Duration:
                    </span>
                    <span className="font-semibold text-navy-900">
                      {activeEmployee.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-purple-600" />
                      Current Geo-point:
                    </span>
                    <span className="font-medium text-navy-900 truncate max-w-[130px]">
                      {activeEmployee.currentLocation}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1.5">
                      <Battery className="h-3.5 w-3.5 text-emerald-600" />
                      Device Battery:
                    </span>
                    <span className="font-semibold text-emerald-700">
                      {activeEmployee.battery}% • Health Good
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
