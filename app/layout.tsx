import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});
const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hazcreates.dev"),
  title: "Haziq (IRSPlays) — Systems Architect & Founder @ Asirive",
  description:
    "Portfolio of Haziq (IRSPlays) — Systems Architect, AI/IoT Engineer and Founder of Asirive. Building Asirive Cortex, assistive AI wearables and ambient OS AI. Failing with Honour.",
  openGraph: {
    title: "Haziq (IRSPlays) — Systems Architect & Founder @ Asirive",
    description:
      "Systems Architect, AI/IoT Engineer and Founder of Asirive. Building Cortex, ambient AI and silly fox-powered web things.",
    images: ["/cypher-scene.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
