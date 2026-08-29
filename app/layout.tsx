import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsTicker from "@/components/layout/NewsTicker";
import Duotone from "@/components/ui/Duotone";
import { SITE } from "@/lib/constants";
import "./globals.css";

/**
 * TYPEFACES
 *
 * The intended pairing is Financier Display for titles and GT America for
 * body and secondary text. Both are commercial retail faces — Financier from
 * Klim Type Foundry, GT America from Grilli Type — and neither may be served
 * from a website without a purchased web licence, so they are not shipped
 * here.
 *
 * These two are the closest free stand-ins: Playfair Display shares
 * Financier's high stroke contrast and sharp serifs, and Inter is a neutral
 * grotesque in the same territory as GT America.
 *
 * TO SWITCH TO THE LICENSED FILES: drop the .woff2 files into app/fonts/,
 * replace these two declarations with next/font/local pointing at them, and
 * keep the same `variable` names. Nothing else in the codebase needs to
 * change — every rule references the CSS variables, not the font names.
 */
const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    template: `%s | ${SITE.name}`,
    default: `${SITE.name} — Strategic Magnet Intelligence`,
  },
  description: SITE.description,
  openGraph: {
    siteName: SITE.name,
    type: "website",
    locale: "en_GB",
    url: SITE.url,
    title: `${SITE.name} — Strategic Magnet Intelligence`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${jetbrains.variable} antialiased`}>
        <Duotone />
        <Navbar />
        <NewsTicker />
        {children}
        <Footer />
      </body>
    </html>
  );
}
