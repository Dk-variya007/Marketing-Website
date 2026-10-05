"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StatusBadge, FieldStatusType } from "../ui/StatusBadge";
import {
  Navigation,
  MapPin,
  Layers,
  Search,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Battery,
  Wifi,
  Clock,
  ChevronRight,
  TrendingUp,
  Activity,
  Crosshair,
} from "lucide-react";

interface AgentTelemetry {
  id: string;
  name: string;
  role: string;
  initials: string;
  status: FieldStatusType;
  statusLabel: string;
  speed: string;
  distance: string;
  battery: number;
  network: string;
  heading: string;
  currentLocation: string;
  lastPing: string;
  nextStop?: string;
  eta?: string;
  verifiedSite?: string;
  durationOnSite?: string;
  posX: number;
  posY: number;
}

export function HeroMapVisual() {
  const [selectedAgentId, setSelectedAgentId] = useState<string>("rahul");
  const [mapLayer, setMapLayer] = useState<"telemetry" | "geofences">("telemetry");

  const agents: Record<string, AgentTelemetry> = {
    rahul: {
      id: "rahul",
      name: "Rahul Sharma",
      role: "Lead Field Executive",
      initials: "RS",
      status: "tracking",
      statusLabel: "In Transit",
      speed: "34 km/h",
      distance: "2.4 km covered",
      battery: 86,
      network: "5G",
      heading: "142° SE",
      currentLocation: "Sector 62 Spine • Cyber Parkway",
      lastPing: "Just now (RTK ±1.1m)",
      nextStop: "Apex Healthcare Hub",
      eta: "6 mins",
      posX: 340,
      posY: 165,
    },
    amit: {
      id: "amit",
      name: "Amit Verma",
      role: "Field Service Engineer",
      initials: "AV",
      status: "on-visit",
      statusLabel: "On Customer Visit",
      speed: "0 km/h (Parked)",
      distance: "14.2 km total",
      battery: 68,
      network: "4G LTE",
      heading: "Stationary",
      currentLocation: "Apollo Diagnostics • Building 4",
      lastPing: "12s ago",
      verifiedSite: "Client Geofence #GF-204",
      durationOnSite: "42 min logged",
      posX: 460,
      posY: 130,
    },
    priya: {
      id: "priya",
      name: "Priya Patel",
      role: "Territory Sales Lead",
      initials: "PP",
      status: "tracking",
      statusLabel: "Active Route",
      speed: "41 km/h",
      distance: "4.8 km covered",
      battery: 92,
      network: "5G",
      heading: "084° E",
      currentLocation: "West Ring Expressway",
      lastPing: "4s ago",
      nextStop: "MedLife Distribution Hub",
      eta: "11 mins",
      posX: 540,
      posY: 275,
    },
  };

  const currentAgent = agents[selectedAgentId] || agents.rahul;

  return (
    <div className="relative w-full mx-auto">
      {/* Outer ambient glow & depth layer */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-brand-600/15 via-blue-500/10 to-emerald-500/10 rounded-3xl blur-2xl -z-10" />

      {/* Main Terminal Window */}
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl sm:rounded-3xl border border-slate-300/80 bg-white shadow-2xl overflow-hidden"
      >
        {/* Top Enterprise Console Bar */}
        <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between text-xs border-b border-slate-800">
          <div className="flex items-center gap-3">
            {/* Fietra Brand Badge */}
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-md bg-brand-500 flex items-center justify-center text-white shadow-sm font-black text-[10px]">
                F
              </div>
              <span className="font-bold tracking-tight text-white">
                Fietra <span className="text-brand-400 font-semibold text-[11px]">Live Grid</span>
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-800 text-[11px] text-slate-300">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-medium">18 Active Agents</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-mono">99.8% Sync</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 font-mono">0 Loss</span>
            </div>
          </div>

          {/* Layer Mode Switchers */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-lg">
            <button
              onClick={() => setMapLayer("telemetry")}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                mapLayer === "telemetry"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Telemetry
            </button>
            <button
              onClick={() => setMapLayer("geofences")}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                mapLayer === "geofences"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Geofences (2)
            </button>
          </div>
        </div>

        {/* High-Fidelity Cartographic Map Canvas */}
        <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] bg-[#0c1222] overflow-hidden select-none">
          {/* GIS Coordinates & Grid Ticks */}
          <div className="absolute top-2 left-3 z-10 font-mono text-[10px] text-slate-400/80 pointer-events-none hidden sm:block">
            28°36&apos;44.2&quot;N 77°19&apos;12.8&quot;E • ZOOM 14.8x • HIGH ACCURACY GIS
          </div>

          {/* Vector Map Layer (Streets, Blocks, Waterways, Routes) */}
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 700 520"
            preserveAspectRatio="none"
          >
            <defs>
              {/* City block subtle pattern */}
              <pattern
                id="fietra-city-grid"
                width="70"
                height="70"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 70 0 L 0 0 0 70"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="0.8"
                  strokeOpacity="0.4"
                />
              </pattern>

              {/* Glowing gradients for routes */}
              <linearGradient id="route-rahul-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="1" />
              </linearGradient>

              <linearGradient id="route-amit-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#9333ea" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="route-priya-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Dark background grid */}
            <rect width="100%" height="100%" fill="url(#fietra-city-grid)" />

            {/* City Parcels / Building Footprints (Soft geometric shapes) */}
            <g fill="#141e33" opacity="0.7">
              <rect x="30" y="40" width="80" height="50" rx="3" />
              <rect x="130" y="30" width="90" height="60" rx="3" />
              <rect x="40" y="120" width="70" height="70" rx="3" />
              <rect x="250" y="40" width="110" height="60" rx="3" />
              <rect x="250" y="130" width="70" height="80" rx="3" />
              <rect x="380" y="30" width="80" height="50" rx="3" />
              <rect x="490" y="40" width="100" height="60" rx="3" />
              <rect x="50" y="270" width="90" height="80" rx="3" />
              <rect x="160" y="330" width="110" height="70" rx="3" />
              <rect x="290" y="270" width="80" height="70" rx="3" />
              <rect x="390" y="220" width="90" height="80" rx="3" />
              <rect x="510" y="180" width="120" height="70" rx="3" />
              <rect x="420" y="350" width="140" height="90" rx="3" />
              <rect x="290" y="380" width="100" height="80" rx="3" />
            </g>

            {/* Park / Green Reserve Zone */}
            <rect
              x="130"
              y="120"
              width="90"
              height="80"
              rx="6"
              fill="#064e3b"
              fillOpacity="0.25"
              stroke="#059669"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text x="145" y="165" fill="#34d399" fontSize="9" fontWeight="600" opacity="0.7">
              City Eco Park
            </text>

            {/* River / Water Canal */}
            <path
              d="M 640,-20 Q 590,160 630,300 T 670,540"
              fill="none"
              stroke="#0c4a6e"
              strokeWidth="28"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Secondary Streets (Dark slate lines) */}
            <g stroke="#1e293b" strokeWidth="3" fill="none">
              <path d="M 0,110 L 700,110" />
              <path d="M 0,210 L 700,210" />
              <path d="M 0,320 L 700,320" />
              <path d="M 0,430 L 700,430" />
              <path d="M 120,0 L 120,520" />
              <path d="M 240,0 L 240,520" />
              <path d="M 370,0 L 370,520" />
              <path d="M 490,0 L 490,520" />
            </g>

            {/* Major Arterial Expressways (Gleaming roads) */}
            <path
              d="M -30,220 C 140,210 200,160 380,160 S 520,240 730,230"
              fill="none"
              stroke="#334155"
              strokeWidth="10"
            />
            <path
              d="M 180,-20 Q 210,240 280,380 T 400,540"
              fill="none"
              stroke="#334155"
              strokeWidth="8"
            />
            {/* Street Names */}
            <text x="260" y="152" fill="#64748b" fontSize="8" fontWeight="bold" letterSpacing="1">
              CYBER PARKWAY EXPRESS
            </text>
            <text x="390" y="325" fill="#64748b" fontSize="8" fontWeight="bold" letterSpacing="1">
              SOUTHERN LOGISTICS CORRIDOR
            </text>

            {/* Geofence Zones (Active if toggled) */}
            {mapLayer === "geofences" && (
              <>
                {/* Geofence 1: Tech Park Commercial */}
                <motion.polygon
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  points="230,50 370,50 370,180 230,180"
                  fill="#2563eb"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <text x="240" y="70" fill="#38bdf8" fontSize="9" fontWeight="bold">
                  GF-108: Tech Park (Geofenced)
                </text>

                {/* Geofence 2: Apollo Health District */}
                <motion.polygon
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  points="420,80 580,70 560,200 410,190"
                  fill="#9333ea"
                  stroke="#c084fc"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <text x="430" y="95" fill="#c084fc" fontSize="9" fontWeight="bold">
                  GF-204: Medical Center
                </text>
              </>
            )}

            {/* ROUTE 1: Rahul Sharma (Active Blue Route with glowing trail) */}
            <motion.path
              d="M 90,280 C 150,280 180,210 240,190 S 290,210 340,165"
              fill="none"
              stroke="url(#route-rahul-glow)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.2, ease: "easeInOut" }}
            />
            {/* GPS Breadcrumb fixes along Rahul's route */}
            <circle cx="120" cy="275" r="2.5" fill="#38bdf8" opacity="0.7" />
            <circle cx="160" cy="250" r="2.5" fill="#38bdf8" opacity="0.7" />
            <circle cx="200" cy="205" r="2.5" fill="#38bdf8" opacity="0.7" />
            <circle cx="250" cy="190" r="2.5" fill="#38bdf8" opacity="0.8" />
            <circle cx="295" cy="195" r="2.5" fill="#38bdf8" opacity="0.9" />

            {/* ROUTE 2: Amit Verma (Completed Purple Route to Customer) */}
            <motion.path
              d="M 140,90 C 210,85 260,110 330,85 S 410,110 460,130"
              fill="none"
              stroke="url(#route-amit-glow)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="5 3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
            />

            {/* ROUTE 3: Priya Patel (Cyan Transit Path) */}
            <motion.path
              d="M 210,390 C 290,370 360,410 440,350 S 500,310 540,275"
              fill="none"
              stroke="url(#route-priya-glow)"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            />
          </svg>

          {/* Central Headquarters Hub */}
          <div className="absolute top-[280px] left-[90px] -translate-x-1/2 -translate-y-1/2 z-10 hidden sm:block">
            <div className="flex flex-col items-center">
              <div className="h-7 w-7 rounded-lg bg-slate-800 text-white border border-slate-600 flex items-center justify-center text-[10px] font-bold shadow-lg">
                HQ
              </div>
              <span className="text-[9px] font-mono text-slate-400 bg-slate-900/90 px-1.5 py-0.5 rounded mt-1 border border-slate-700">
                Hub Alpha
              </span>
            </div>
          </div>

          {/* AGENT 1: Rahul Sharma (Active In-Transit Marker) */}
          <div
            className="absolute top-[165px] left-[340px] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
            onClick={() => setSelectedAgentId("rahul")}
          >
            {/* Precision Radar Sweep Ring */}
            <span className="absolute -inset-3.5 rounded-full bg-blue-500/30 animate-ping" />
            <div className="relative">
              <div
                className={`h-11 w-11 rounded-full border-2 bg-gradient-to-br from-blue-500 to-indigo-700 shadow-xl flex items-center justify-center text-white font-bold text-xs transition-transform hover:scale-110 ${
                  selectedAgentId === "rahul"
                    ? "border-white ring-4 ring-blue-500/40"
                    : "border-slate-300"
                }`}
              >
                RS
              </div>
              {/* Heading arrow / orientation marker */}
              <div className="absolute -top-1.5 -right-1 h-4 w-4 rounded-full bg-brand-500 border border-white text-white flex items-center justify-center shadow-xs">
                <Navigation className="h-2.5 w-2.5 transform rotate-45" />
              </div>
              {/* Active green telemetry dot */}
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
            </div>

            {/* Rahul's Floating Badge */}
            <div className="absolute left-1/2 -translate-x-1/2 top-12 bg-slate-900/95 backdrop-blur-md text-white rounded-lg px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap shadow-xl border border-slate-700 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Rahul (34 km/h)</span>
            </div>
          </div>

          {/* AGENT 2: Amit Verma (On Customer Visit Marker) */}
          <div
            className="absolute top-[130px] left-[460px] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
            onClick={() => setSelectedAgentId("amit")}
          >
            <div className="relative">
              <div
                className={`h-11 w-11 rounded-full border-2 bg-gradient-to-br from-purple-500 to-indigo-800 shadow-xl flex items-center justify-center text-white font-bold text-xs transition-transform hover:scale-110 ${
                  selectedAgentId === "amit"
                    ? "border-white ring-4 ring-purple-500/40"
                    : "border-slate-300"
                }`}
              >
                AV
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-purple-400 ring-2 ring-slate-900" />
            </div>

            {/* Amit's Floating Badge */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-8 bg-purple-950/95 backdrop-blur-md text-purple-200 rounded-lg px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap shadow-xl border border-purple-800 flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-purple-400" />
              <span>Amit • On Visit</span>
            </div>
          </div>

          {/* AGENT 3: Priya Patel (Expressway Route Marker) */}
          <div
            className="absolute top-[275px] left-[540px] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer hidden md:block"
            onClick={() => setSelectedAgentId("priya")}
          >
            <span className="absolute -inset-3 rounded-full bg-cyan-500/25 animate-ping" />
            <div className="relative">
              <div
                className={`h-10 w-10 rounded-full border-2 bg-gradient-to-br from-cyan-600 to-blue-700 shadow-xl flex items-center justify-center text-white font-bold text-xs transition-transform hover:scale-110 ${
                  selectedAgentId === "priya"
                    ? "border-white ring-4 ring-cyan-500/40"
                    : "border-slate-300"
                }`}
              >
                PP
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
            </div>

            {/* Priya Badge */}
            <div className="absolute left-1/2 -translate-x-1/2 top-11 bg-slate-900/95 text-white rounded-lg px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap shadow-md border border-slate-700">
              Priya • 4.8 km
            </div>
          </div>

          {/* REAL-TIME AGENT INSPECTION HUD (Floating Top-Right Card) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAgent.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25 }}
              className="absolute top-2.5 right-2.5 w-[210px] sm:w-[245px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/90 rounded-xl p-2.5 sm:p-3 shadow-2xl text-white z-30"
            >
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-brand-600 font-bold text-xs flex items-center justify-center text-white">
                    {currentAgent.initials}
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-white leading-tight">
                      {currentAgent.name}
                    </div>
                    <div className="text-[10px] text-slate-400 leading-tight">
                      {currentAgent.role}
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    currentAgent.status === "tracking"
                      ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                      : "bg-purple-950 text-purple-300 border-purple-800"
                  }`}
                >
                  {currentAgent.statusLabel}
                </span>
              </div>

              {/* Telemetry Readout */}
              <div className="mt-2.5 space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Activity className="h-3 w-3 text-brand-400" />
                    Live Telemetry:
                  </span>
                  <span className="font-mono font-bold text-white">
                    {currentAgent.speed}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Navigation className="h-3 w-3 text-brand-400" />
                    Distance Log:
                  </span>
                  <span className="font-semibold text-white">
                    {currentAgent.distance}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400 flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-purple-400" />
                    Location:
                  </span>
                  <span className="truncate max-w-[130px] font-medium text-slate-200">
                    {currentAgent.currentLocation}
                  </span>
                </div>

                {currentAgent.nextStop && (
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Next Destination:</span>
                    <span className="text-amber-400 font-semibold truncate max-w-[120px]">
                      {currentAgent.nextStop} ({currentAgent.eta})
                    </span>
                  </div>
                )}

                {currentAgent.verifiedSite && (
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Geofence Check:</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified ({currentAgent.durationOnSite})
                    </span>
                  </div>
                )}

                {/* Device Hardware Health */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Battery className="h-3 w-3 text-emerald-400" />
                    {currentAgent.battery}% Battery
                  </span>
                  <span className="flex items-center gap-1">
                    <Wifi className="h-3 w-3 text-blue-400" />
                    {currentAgent.network} Connected
                  </span>
                  <span className="text-emerald-400 font-semibold">Active</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Compass Rose & Scale Bar - Bottom Right */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
            <div className="bg-slate-900/90 text-slate-300 border border-slate-700 rounded-lg px-2 py-1 text-[10px] font-mono shadow-md flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Scale: 500m</span>
            </div>
            <div className="bg-slate-900/90 text-slate-300 border border-slate-700 rounded-lg p-1.5 shadow-md">
              <Compass className="h-4 w-4 text-brand-400 animate-spin-slow" />
            </div>
          </div>
        </div>

        {/* Live Operational Ticker Bar */}
        <div className="px-4 py-2.5 bg-slate-950 text-white flex items-center justify-between text-xs border-t border-slate-800">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0 animate-ping" />
            <span className="font-semibold text-slate-300 shrink-0">Live Stream:</span>
            <span className="text-slate-400 truncate text-[11px]">
              Rahul Sharma logged 34 km/h on Cyber Parkway • Amit Verma signature captured at Apollo Diagnostics
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 shrink-0 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80">
            <Zap className="h-3 w-3" />
            <span>FIETRA RTK-ACTIVE</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
