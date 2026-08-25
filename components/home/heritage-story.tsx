import Link from "next/link";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import { Button } from "@/components/ui/button";

export function HeritageStory() {
  return (
    <section className="marble-surface relative overflow-hidden py-24 sm:py-32">
      <div className="container-mavrikios grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-stone-500">Our Heritage</p>
          <p
            aria-hidden
            className="pointer-events-none select-none font-serif text-[7rem] italic leading-none text-ink-950/[0.06] sm:text-[9rem]"
          >
            1967
          </p>
          <h2 className="-mt-10 max-w-md font-serif text-3xl italic text-ink-950 sm:-mt-16 sm:text-4xl">
            Since 1967
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone-600">
            For decades, Mavrikios has served customers looking for jewellery chosen with care,
            craftsmanship and personal attention. What began as a small family boutique in Latsia
            continues today in the same spirit — each piece considered, each customer known by
            name.
          </p>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone-600">
            Our workshop still handles repairs, resizing and bespoke commissions in-house, the way
            it always has.
          </p>
          <Button asChild variant="outline" className="mt-8">
            <Link href="/our-story">Read Our Story</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-7 lg:gap-5">
          <div className="relative aspect-[3/4] translate-y-6 overflow-hidden">
            <PlaceholderArt motif="ring" tone="ink" label="Archive" />
          </div>
          <div className="relative aspect-[3/4] -translate-y-6 overflow-hidden">
            <PlaceholderArt motif="necklace" label="Workshop" />
          </div>
        </div>
      </div>
    </section>
  );
}
