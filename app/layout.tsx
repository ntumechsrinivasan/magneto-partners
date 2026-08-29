import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsTicker from "@/components/layout/NewsTicker";
import Duotone from "@/components/ui/Duotone";
import { SITE } from "@/lib/constants";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
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
      <body className={`${archivo.variable} ${jetbrains.variable} antialiased`}>
        <Duotone />
        <Navbar />
        <NewsTicker />
        {children}
        <Footer />
      </body>
    </html>
  );
}
