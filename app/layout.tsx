import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#0a0f1d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Fietra | GPS Field Employee Tracking & Workforce Management",
  description:
    "Fietra helps businesses manage field teams with GPS employee tracking, attendance, visits, route history and offline-first field workforce management.",
  keywords: [
    "field workforce tracking",
    "GPS employee tracking",
    "field sales tracking",
    "live location monitoring",
    "route history GPS",
    "field visit verification",
    "offline tracking",
    "field staff attendance",
  ],
  authors: [{ name: "Fietra Technologies" }],
  openGraph: {
    title: "Fietra | GPS Field Employee Tracking & Workforce Management",
    description:
      "Real-time visibility into employee locations, routes, visits, attendance and field activity — even when connectivity isn't available.",
    url: "https://fietra.com",
    siteName: "Fietra",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fietra | GPS Field Employee Tracking & Workforce Management",
    description:
      "Real-time visibility into employee locations, routes, visits, attendance and field activity — even when connectivity isn't available.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-white text-navy-900 selection:bg-brand-600 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
