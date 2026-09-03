import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/site/icons";
import { Logo } from "@/components/site/logo";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { siteConfig } from "@/lib/site-config";

const shopLinks = [
  { label: "New Arrivals", href: "/shop?sort=newest" },
  { label: "Rings", href: "/shop?category=rings" },
  { label: "Earrings", href: "/shop?category=earrings" },
  { label: "Necklaces", href: "/shop?category=necklaces" },
  { label: "Bracelets", href: "/shop?category=bracelets" },
  { label: "Engagement", href: "/engagement" },
];

const careLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Services", href: "/services" },
  { label: "Delivery", href: "/delivery" },
  { label: "Returns", href: "/returns" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-marble-100">
      <div className="container-mavrikios grid grid-cols-1 gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone-600">
            A family jewellery boutique in Latsia, Nicosia, serving customers with care and
            craftsmanship since 1967.
          </p>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-ink-950 veil-underline"
          >
            <InstagramIcon className="size-4" /> {siteConfig.instagramHandle}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:col-span-4">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-stone-500">Shop</p>
            <ul className="space-y-2.5">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-950 veil-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-stone-500">Customer Care</p>
            <ul className="space-y-2.5">
              {careLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-950 veil-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-4">
          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-stone-500">Notes from Mavrikios</p>
          <p className="mb-4 text-sm text-stone-600">
            New pieces, private selections and stories from the boutique.
          </p>
          <NewsletterForm />

          <div className="mt-8 space-y-2 text-sm text-stone-600">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>
                {siteConfig.address.line1}, {siteConfig.address.line2}
                <br />
                {siteConfig.address.city} {siteConfig.address.postalCode}, {siteConfig.address.country}
              </span>
            </p>
            <a href={siteConfig.phoneHref} className="flex items-center gap-2 veil-underline">
              <Phone className="size-4" /> {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-200">
        <div className="container-mavrikios flex flex-col items-center justify-between gap-3 py-6 text-xs text-stone-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Mavrikios Jewellery Boutique. All rights reserved.</p>
          <p>Latsia, Nicosia, Cyprus</p>
        </div>
        <div className="container-mavrikios pb-6 text-center text-[11px] text-stone-400 sm:text-left">
          <p>
            Some product photos are temporary placeholders:{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File:Polaris_-_gold_ring.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              &ldquo;Polaris&rdquo;
            </a>{" "}
            and{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File:Starlight_-_white_gold_ring_with_diamonds.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              &ldquo;Starlight&rdquo;
            </a>{" "}
            by W.carter, licensed{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              CC BY-SA 4.0
            </a>
            , via Wikimedia Commons.
          </p>
        </div>
      </div>
    </footer>
  );
}
