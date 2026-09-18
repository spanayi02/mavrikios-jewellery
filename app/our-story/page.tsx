import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import { Reveal, RevealItem } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story of Mavrikios Jewellery Boutique, a family jewellery business in Latsia, Nicosia, since 1967.",
  alternates: { canonical: "/our-story" },
};

const values = [
  {
    title: "Craftsmanship",
    body: "Repairs, resizing and bespoke commissions are still made by hand in our own workshop, not outsourced.",
  },
  {
    title: "Personal attention",
    body: "We take the time to understand what you're looking for, whether it's a first visit or your tenth.",
  },
  {
    title: "Longevity",
    body: "Jewellery is meant to last. We build and repair pieces with that in mind, not for a single season.",
  },
];

export default function OurStoryPage() {
  return (
    <div>
      <PageHero
        eyebrow="Our Story"
        title="Since 1967"
        description="A family jewellery boutique in Latsia, built on craftsmanship and personal service."
        motif="ring"
        image={{ src: "/images/products/sophia-eternity-band.jpg", alt: "White gold band set with diamonds" }}
      />

      <section className="container-mavrikios py-24 sm:py-32">
        <Reveal className="max-w-[62ch]">
          <p className="text-lg leading-relaxed text-ink-950 sm:text-xl">
            For decades, Mavrikios has served customers looking for jewellery chosen with care,
            craftsmanship and personal attention. What began as a small family boutique in Latsia
            continues today in the same spirit: each piece considered, each customer known by
            name.
          </p>
          <p className="mt-6 text-[15px] leading-relaxed text-stone-600">
            Our workshop still handles repairs, resizing and bespoke commissions the way it always
            has: in-house, by hand, with the person wearing the piece in mind.
          </p>
        </Reveal>
      </section>

      {/* TODO: boutique + workshop photos, 1600x1200 each. Placeholder art until supplied. */}
      <section className="grid grid-cols-1 sm:grid-cols-2">
        <div className="relative aspect-[4/3]">
          <PlaceholderArt motif="necklace" />
        </div>
        <div className="relative aspect-[4/3]">
          <PlaceholderArt motif="ring" tone="ink" />
        </div>
      </section>

      <section className="bg-bone-100 py-24 sm:py-32">
        <div className="container-mavrikios grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <h2 className="max-w-md text-balance font-serif text-4xl leading-[1.08] text-ink-950 sm:text-5xl lg:sticky lg:top-32">
              The values behind every piece
            </h2>
          </Reveal>
          <Reveal stagger={0.1} as="ul" className="lg:col-span-6 lg:col-start-7">
            {values.map((v) => (
              <RevealItem key={v.title} as="li" className="border-t border-stone-300 py-7 first:border-t-0 first:pt-0">
                <h3 className="font-serif text-2xl text-ink-950">{v.title}</h3>
                <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-stone-600">{v.body}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
