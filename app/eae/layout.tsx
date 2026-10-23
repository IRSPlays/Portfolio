import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import "./eae.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-eae-serif",
});
const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-eae-sans",
});

export const metadata: Metadata = {
  title: "Haziq Shah — Portfolio · Early Admissions Exercise",
  description:
    "Haziq Shah's portfolio: assistive technology, edge AI and embedded systems — Asirive Cortex, TKKYIA 2026 Merit Award, and a year of co-design with SAVH.",
  icons: {
    icon: [{ url: "/eae-icon.png", sizes: "256x256", type: "image/png" }],
    shortcut: "/eae-icon.png",
    apple: "/eae-icon.png",
  },
  openGraph: {
    title: "Haziq Shah — Portfolio",
    description: "Assistive technology, edge AI and embedded systems.",
    images: ["/cortex-worn.png"],
  },
};

export default function EaeLayout({ children }: { children: React.ReactNode }) {
  return <div className={`eae ${serif.variable} ${sans.variable}`}>{children}</div>;
}
