import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/components/commerce/cart-provider";
import { Navbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { JsonLd } from "@/components/site/json-ld";
import { organizationJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site-config";
import { getAllProducts } from "@/lib/data/products";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.fullName}, Since ${siteConfig.since}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "jewellery boutique Cyprus",
    siteConfig.name,
    "Latsia jewellery",
    "Nicosia jewellery",
    "engagement rings Cyprus",
    "monopetra",
    "bespoke jewellery Cyprus",
    "jewellery repairs Nicosia",
  ],
  authors: [{ name: siteConfig.fullName }],
  openGraph: {
    type: "website",
    locale: "en_CY",
    url: siteConfig.url,
    siteName: siteConfig.fullName,
    title: `${siteConfig.name} | ${siteConfig.fullName}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.fullName}`,
    description: siteConfig.description,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport = {
  themeColor: "#0b0e14",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const products = await getAllProducts();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${geist.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <JsonLd data={organizationJsonLd()} />
        <CartProvider products={products}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-ink-950 focus:px-4 focus:py-2 focus:text-sm focus:text-bone-50"
          >
            Skip to content
          </a>
          <AnnouncementBar />
          <Navbar />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
