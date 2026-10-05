import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          950: "#060913",
          900: "#0a0f1d",
          850: "#0e162b",
          800: "#131d38",
          700: "#1e2c52",
          600: "#2d4177",
          500: "#3d579c",
        },
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        field: {
          active: "#10b981",    // Green: Active / Synced
          activeBg: "#ecfdf5",
          break: "#f59e0b",     // Orange: On Break / Warning
          breakBg: "#fffbeb",
          offline: "#ef4444",   // Red: Offline Warning / Issue
          offlineBg: "#fef2f2",
          visit: "#8b5cf6",     // Purple: Customer Visit
          visitBg: "#f5f3ff",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "pulse-subtle": "pulseSubtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ping-slow": "pingSlow 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "route-dash": "routeDash 20s linear infinite",
        "float-slow": "floatSlow 4s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        pingSlow: {
          "75%, 100%": {
            transform: "scale(2.2)",
            opacity: "0",
          },
        },
        routeDash: {
          to: {
            strokeDashoffset: "-1000",
          },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        "card-hover": "0 12px 24px -6px rgba(0, 0, 0, 0.08), 0 8px 16px -8px rgba(0, 0, 0, 0.04)",
        "glow-blue": "0 0 25px -5px rgba(37, 99, 235, 0.35)",
        "glow-green": "0 0 20px -5px rgba(16, 185, 129, 0.4)",
        modal: "0 25px 50px -12px rgba(10, 15, 29, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
