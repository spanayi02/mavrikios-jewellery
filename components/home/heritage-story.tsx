import Link from "next/link";
import { FadeImage } from "@/components/site/fade-image";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/site/count-up";
import { Reveal } from "@/components/site/reveal";
import { ParallaxLayer } from "@/components/site/parallax-layer";
import { siteConfig } from "@/lib/site-config";

export function HeritageStory() {
  const years = new Date().getFullYear() - siteConfig.since;

  return (
    <section className="marble-surface relative overflow-hidden py-24 sm:py-32">
      <div className="container-mavrikios grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <h2 className="max-w-md text-balance font-serif text-4xl leading-[1.08] text-ink-950 sm:text-5xl">
            Since 1967
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone-600">
            For decades, {siteConfig.name} has served customers looking for jewellery chosen with care,
            craftsmanship and personal attention. What began as a small family boutique in Latsia
            continues today in the same spirit: each piece considered, each customer known by
            name.
          </p>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone-600">
            Our workshop still handles repairs, resizing and bespoke commissions in-house, the way
            it always has.
          </p>

          <div className="mt-8 flex items-baseline gap-3 border-t border-gold-600/20 pt-6">
            <span className="font-serif text-5xl text-gold-600">
              <CountUp to={years} />
            </span>
            <span className="text-sm text-stone-600">years in the same neighbourhood.</span>
          </div>

          <Button asChild variant="outline" className="mt-8">
            <Link href="/our-story">Read Our Story</Link>
          </Button>
        </Reveal>

        <Reveal delay={0.15} className="grid grid-cols-2 gap-4 lg:col-span-7 lg:gap-5">
          <ParallaxLayer range={28} className="aspect-[3/4] translate-y-8 bg-stone-100">
            <FadeImage
              src="/images/products/sophia-eternity-band.jpg"
              alt="White gold band set with diamonds"
              fill
              sizes="(min-width: 1024px) 28vw, 50vw"
              className="object-cover"
            />
          </ParallaxLayer>
          <ParallaxLayer range={44} className="aspect-[3/4] -translate-y-8 bg-stone-100">
            <FadeImage
              src="/images/products/daphne-signet-ring.jpg"
              alt="Plain 18k gold band"
              fill
              sizes="(min-width: 1024px) 28vw, 50vw"
              className="object-cover"
            />
          </ParallaxLayer>
        </Reveal>
      </div>
    </section>
  );
}
