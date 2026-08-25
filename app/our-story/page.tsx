import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { PlaceholderArt } from "@/components/site/placeholder-art";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story of Mavrikios Jewellery Boutique — a family jewellery business in Latsia, Nicosia, since 1967.",
  alternates: { canonical: "/our-story" },
};

const values = [
  {
    title: "Craftsmanship",
    body: "Repairs, resizing and bespoke commissions are still made by hand in our own workshop, not outsourced.",
  },
  {
    title: "Personal Attention",
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
      />

      <section className="container-mavrikios py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p
            aria-hidden
            className="pointer-events-none select-none font-serif text-[6rem] italic leading-none text-ink-950/[0.05] sm:text-[8rem]"
          >
            1967
          </p>
          <p className="-mt-8 text-[15px] leading-relaxed text-stone-600 sm:-mt-12">
            For decades, Mavrikios has served customers looking for jewellery chosen with care,
            craftsmanship and personal attention. What began as a small family boutique in Latsia
            continues today in the same spirit — each piece considered, each customer known by
            name.
          </p>
          <p className="mt-6 text-[15px] leading-relaxed text-stone-600">
            Our workshop still handles repairs, resizing and bespoke commissions the way it always
            has: in-house, by hand, with the person wearing the piece in mind.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2">
        <div className="relative aspect-[4/3]">
          <PlaceholderArt motif="necklace" label="The Boutique" />
        </div>
        <div className="relative aspect-[4/3]">
          <PlaceholderArt motif="ring" tone="ink" label="The Workshop" />
        </div>
      </section>

      <section className="bg-marble-100 py-20 sm:py-28">
        <div className="container-mavrikios">
          <p className="mb-3 text-center text-[11px] uppercase tracking-[0.3em] text-stone-500">
            What Stays the Same
          </p>
          <h2 className="mx-auto mb-14 max-w-lg text-center font-serif text-3xl italic text-ink-950 sm:text-4xl">
            The values behind every piece
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
            {values.map((v) => (
              <div key={v.title}>
                <h3 className="font-serif text-xl text-ink-950">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
