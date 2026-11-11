import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Fredoka } from "next/font/google";
import { site } from "@/data/site";
import { buildLocalBusinessSchema, serializeJsonLd } from "@/lib/schema-org";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const title = `${site.name} | Pet Grooming in ${site.address.city}, ${site.address.countryName}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  keywords: ["pet grooming", "dog grooming", "cat grooming", site.address.city, "mobile groomer", "spa package"],
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: site.heroImage.src, width: 1200, height: 900, alt: site.heroImage.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: [site.heroImage.src],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = serializeJsonLd(buildLocalBusinessSchema());

  return (
    <html lang="en" className={`${fredoka.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </body>
    </html>
  );
}
