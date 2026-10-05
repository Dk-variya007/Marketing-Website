"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Premium tracking-themed hero background with:
 * - Aurora gradient waves
 * - Network constellation mesh
 * - Radar sweep animation
 * - Topographic contour lines
 * - Glowing orbs and light beams
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* ═══ BASE GRADIENT — Deep space-like with rich blue/purple tones ═══ */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,#1e3a5f_0%,#0f1f3d_35%,#080e1f_60%,#040810_100%)]" />

      {/* ═══ AURORA GRADIENT WAVES — Animated color bands ═══ */}
      <div className="absolute top-0 left-0 right-0 h-[70%] opacity-40">
        {/* Primary aurora band */}
        <div
          className="absolute inset-0 animate-aurora-1"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 30% 20%, rgba(59,130,246,0.25) 0%, transparent 70%)",
          }}
        />
        {/* Secondary aurora band */}
        <div
          className="absolute inset-0 animate-aurora-2"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 70% 30%, rgba(139,92,246,0.2) 0%, transparent 60%)",
          }}
        />
        {/* Cyan accent glow */}
        <div
          className="absolute inset-0 animate-aurora-3"
          style={{
            background:
              "radial-gradient(ellipse 50% 35% at 50% 15%, rgba(6,182,212,0.18) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* ═══ LIGHT BEAMS — Diagonal light streaks ═══ */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute top-0 left-[20%] w-[1px] h-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.3) 60%, transparent 100%)",
            transform: "rotate(15deg)",
            transformOrigin: "top center",
          }}
        />
        <div
          className="absolute top-0 right-[30%] w-[1px] h-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.2) 70%, transparent 100%)",
            transform: "rotate(-12deg)",
            transformOrigin: "top center",
          }}
        />
      </div>

      {/* ═══ SVG LAYER — Radar, Network Mesh, Contours ═══ */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1920 1080"
      >
        <defs>
          {/* Fine grid pattern */}
          <pattern id="hero-fine-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148,163,184,0.04)" strokeWidth="0.5" />
          </pattern>

          {/* Dotted grid pattern */}
          <pattern id="hero-dot-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="0.5" fill="rgba(148,163,184,0.12)" />
          </pattern>

          {/* Radar sweep gradient */}
          <linearGradient id="radar-sweep" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>

          {/* Glow filter for nodes */}
          <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Route gradient */}
          <linearGradient id="mesh-line-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.06" />
          </linearGradient>
        </defs>

        {/* Grid layers */}
        <rect width="100%" height="100%" fill="url(#hero-fine-grid)" />
        <rect width="100%" height="100%" fill="url(#hero-dot-grid)" />

        {/* ═══ TOPOGRAPHIC CONTOUR LINES ═══ */}
        <g opacity="0.08" fill="none" stroke="#60a5fa" strokeWidth="0.8">
          <motion.ellipse
            cx="960" cy="350" rx="500" ry="200"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
          />
          <motion.ellipse
            cx="960" cy="350" rx="400" ry="160"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.3, ease: "easeOut" }}
          />
          <motion.ellipse
            cx="960" cy="350" rx="300" ry="120"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.6, ease: "easeOut" }}
          />
          <motion.ellipse
            cx="960" cy="350" rx="200" ry="80"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.9, ease: "easeOut" }}
          />
          <motion.ellipse
            cx="960" cy="350" rx="100" ry="40"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 1.2, ease: "easeOut" }}
          />
        </g>

        {/* ═══ RADAR CONCENTRIC RINGS — centered, pulsing outward ═══ */}
        <g className="animate-radar-pulse" style={{ transformOrigin: "960px 350px" }}>
          <circle cx="960" cy="350" r="80" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.15" />
          <circle cx="960" cy="350" r="160" fill="none" stroke="#3b82f6" strokeWidth="0.4" opacity="0.1" />
          <circle cx="960" cy="350" r="240" fill="none" stroke="#3b82f6" strokeWidth="0.3" opacity="0.07" />
          <circle cx="960" cy="350" r="320" fill="none" stroke="#3b82f6" strokeWidth="0.3" opacity="0.05" />
        </g>

        {/* Radar crosshair lines */}
        <line x1="960" y1="150" x2="960" y2="550" stroke="#3b82f6" strokeWidth="0.3" opacity="0.08" />
        <line x1="660" y1="350" x2="1260" y2="350" stroke="#3b82f6" strokeWidth="0.3" opacity="0.08" />

        {/* ═══ CONSTELLATION NETWORK MESH — Connected nodes ═══ */}
        {/* Network connection lines */}
        <g stroke="url(#mesh-line-1)" strokeWidth="0.8" fill="none">
          <motion.line x1="200" y1="150" x2="450" y2="280"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }} />
          <motion.line x1="450" y1="280" x2="700" y2="200"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.8 }} />
          <motion.line x1="700" y1="200" x2="960" y2="350"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.1 }} />
          <motion.line x1="960" y1="350" x2="1200" y2="250"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.4 }} />
          <motion.line x1="1200" y1="250" x2="1500" y2="380"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.7 }} />
          <motion.line x1="1500" y1="380" x2="1750" y2="200"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 2.0 }} />
          {/* Cross connections */}
          <motion.line x1="450" y1="280" x2="350" y2="500"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.0 }} />
          <motion.line x1="700" y1="200" x2="850" y2="500"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.3 }} />
          <motion.line x1="960" y1="350" x2="1100" y2="550"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.6 }} />
          <motion.line x1="1200" y1="250" x2="1350" y2="480"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.9 }} />
          {/* Bottom row connections */}
          <motion.line x1="350" y1="500" x2="850" y2="500"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.5 }} />
          <motion.line x1="850" y1="500" x2="1100" y2="550"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.8 }} />
          <motion.line x1="1100" y1="550" x2="1350" y2="480"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 2.1 }} />
        </g>

        {/* Network Nodes — glowing dots at intersections */}
        {[
          { cx: 200, cy: 150, r: 2.5, color: "#60a5fa", delay: 0.4 },
          { cx: 450, cy: 280, r: 3, color: "#3b82f6", delay: 0.7 },
          { cx: 700, cy: 200, r: 2.5, color: "#8b5cf6", delay: 1.0 },
          { cx: 960, cy: 350, r: 4, color: "#3b82f6", delay: 1.3 },
          { cx: 1200, cy: 250, r: 3, color: "#06b6d4", delay: 1.6 },
          { cx: 1500, cy: 380, r: 2.5, color: "#8b5cf6", delay: 1.9 },
          { cx: 1750, cy: 200, r: 2, color: "#60a5fa", delay: 2.2 },
          { cx: 350, cy: 500, r: 2, color: "#10b981", delay: 1.2 },
          { cx: 850, cy: 500, r: 2.5, color: "#06b6d4", delay: 1.5 },
          { cx: 1100, cy: 550, r: 2, color: "#3b82f6", delay: 1.8 },
          { cx: 1350, cy: 480, r: 2.5, color: "#10b981", delay: 2.1 },
        ].map((node, i) => (
          <motion.g key={`node-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: node.delay }}
          >
            {/* Outer glow */}
            <circle cx={node.cx} cy={node.cy} r={node.r * 3} fill={node.color} opacity="0.08" />
            {/* Node body */}
            <circle cx={node.cx} cy={node.cy} r={node.r} fill={node.color} opacity="0.5" filter="url(#node-glow)" />
            {/* Core bright dot */}
            <circle cx={node.cx} cy={node.cy} r={node.r * 0.4} fill="white" opacity="0.7" />
          </motion.g>
        ))}

        {/* ═══ ANIMATED GPS ROUTES — Dashed paths flowing across ═══ */}
        <motion.path
          d="M -50,300 C 300,250 500,400 800,320 S 1200,200 1500,350 1700,250 1950,350"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1.5"
          strokeDasharray="8 4"
          strokeLinecap="round"
          opacity="0.15"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M -30,600 C 200,550 450,650 750,580 S 1100,500 1400,600 1650,520 1950,620"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="1.2"
          strokeDasharray="6 6"
          strokeLinecap="round"
          opacity="0.1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4.5, delay: 1, ease: "easeInOut" }}
        />

        {/* ═══ COMPASS ROSE — Large subtle watermark ═══ */}
        <g transform="translate(960, 350)" opacity="0.04">
          {/* Outer ring */}
          <circle cx="0" cy="0" r="180" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="0" cy="0" r="175" fill="none" stroke="white" strokeWidth="0.3" />
          {/* Cardinal directions */}
          <line x1="0" y1="-190" x2="0" y2="-160" stroke="white" strokeWidth="2" />
          <line x1="0" y1="160" x2="0" y2="190" stroke="white" strokeWidth="2" />
          <line x1="-190" y1="0" x2="-160" y2="0" stroke="white" strokeWidth="2" />
          <line x1="160" y1="0" x2="190" y2="0" stroke="white" strokeWidth="2" />
          {/* Intercardinal ticks */}
          <line x1="120" y1="-120" x2="135" y2="-135" stroke="white" strokeWidth="1" />
          <line x1="120" y1="120" x2="135" y2="135" stroke="white" strokeWidth="1" />
          <line x1="-120" y1="-120" x2="-135" y2="-135" stroke="white" strokeWidth="1" />
          <line x1="-120" y1="120" x2="-135" y2="135" stroke="white" strokeWidth="1" />
          {/* N/S/E/W labels */}
          <text x="0" y="-200" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">N</text>
          <text x="0" y="215" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">S</text>
          <text x="210" y="5" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">E</text>
          <text x="-210" y="5" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">W</text>
          {/* Inner diamond */}
          <polygon points="0,-140 20,0 0,140 -20,0" fill="none" stroke="white" strokeWidth="0.5" />
        </g>

        {/* Small degree ticks around compass */}
        <g transform="translate(960, 350)" opacity="0.03">
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 10 * Math.PI) / 180;
            const inner = 170;
            const outer = i % 3 === 0 ? 185 : 178;
            return (
              <line
                key={`tick-${i}`}
                x1={Math.sin(angle) * inner}
                y1={-Math.cos(angle) * inner}
                x2={Math.sin(angle) * outer}
                y2={-Math.cos(angle) * outer}
                stroke="white"
                strokeWidth={i % 3 === 0 ? "1" : "0.5"}
              />
            );
          })}
        </g>
      </svg>

      {/* ═══ ANIMATED GLOWING ORBS — CSS only ═══ */}
      <div
        className="absolute rounded-full animate-ping-slow"
        style={{
          left: "18%", top: "22%", width: 100, height: 100,
          marginLeft: -50, marginTop: -50,
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute rounded-full animate-ping-slow"
        style={{
          left: "78%", top: "18%", width: 70, height: 70,
          marginLeft: -35, marginTop: -35, animationDelay: "1.5s",
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute rounded-full animate-ping-slow"
        style={{
          left: "55%", top: "50%", width: 90, height: 90,
          marginLeft: -45, marginTop: -45, animationDelay: "3s",
          background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
        }}
      />

      {/* ═══ FLOATING SIGNAL PARTICLES — CSS animated ═══ */}
      {[
        { left: "12%", top: "35%", delay: "0s", size: "3px", color: "bg-blue-400/25" },
        { left: "65%", top: "25%", delay: "1.5s", size: "2px", color: "bg-purple-400/20" },
        { left: "82%", top: "40%", delay: "0.8s", size: "3px", color: "bg-cyan-400/25" },
        { left: "35%", top: "50%", delay: "2.5s", size: "2px", color: "bg-blue-400/20" },
        { left: "50%", top: "15%", delay: "3.5s", size: "2px", color: "bg-emerald-400/20" },
        { left: "92%", top: "30%", delay: "1.2s", size: "3px", color: "bg-blue-400/15" },
      ].map((p, i) => (
        <div
          key={`p-${i}`}
          className={`absolute rounded-full ${p.color} animate-float-slow`}
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: p.delay }}
        />
      ))}

      {/* ═══ BOTTOM GRADIENT FADE — transition to next section ═══ */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#040810] via-[#040810]/80 to-transparent" />
    </div>
  );
}
