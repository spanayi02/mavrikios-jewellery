import { MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import { StoreStatusBadge } from "@/components/site/store-status";
import { Reveal } from "@/components/site/reveal";
import { ParallaxLayer } from "@/components/site/parallax-layer";
import { siteConfig } from "@/lib/site-config";

const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.city}, ${siteConfig.address.country}`
)}`;

export function BoutiqueLocation() {
  return (
    <section className="relative overflow-hidden bg-bone-100 py-24 sm:py-32">
      <div className="container-mavrikios grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        {/* TODO: boutique exterior / interior photo, 1600x1200. Placeholder art until supplied. */}
        <Reveal className="order-2 aspect-[4/3] lg:order-1 lg:col-span-7">
          <ParallaxLayer range={30} className="h-full">
            <PlaceholderArt motif="gift" />
          </ParallaxLayer>
        </Reveal>
        <Reveal delay={0.1} className="order-1 lg:order-2 lg:col-span-5">
          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-moss-600">Visit the Boutique</p>
          <h2 className="max-w-md text-balance font-serif text-4xl leading-[1.08] text-ink-950 sm:text-5xl">
            Come and see the pieces in person.
          </h2>

          <div className="mt-8 space-y-4 text-sm text-stone-600">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-ink-950" />
              <span>
                {siteConfig.address.line1}, {siteConfig.address.line2}
                <br />
                {siteConfig.address.city} {siteConfig.address.postalCode}, {siteConfig.address.country}
              </span>
            </p>
            <a href={siteConfig.phoneHref} className="flex items-center gap-3 veil-underline">
              <Phone className="size-4 text-ink-950" /> {siteConfig.phone}
            </a>
            <StoreStatusBadge className="pl-7 text-stone-600" />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="gap-2">
                <Navigation className="size-4" /> Get Directions
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={siteConfig.phoneHref} className="gap-2">
                <Phone className="size-4" /> Call Us
              </a>
            </Button>
          </div>

          <p className="mt-8 text-xs text-stone-500">
            <a
              href="https://www.google.com/search?q=Mavrikios+Jewellery+Boutique+Latsia+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="veil-underline"
            >
              Read our reviews on Google
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
