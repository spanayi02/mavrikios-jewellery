import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { FadeImage } from "@/components/site/fade-image";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    `The story of ${siteConfig.fullName}, a family jewellery business in ${siteConfig.address.line2}, ${siteConfig.address.city}, since ${siteConfig.since}.`,
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
        title={`Since ${siteConfig.since}`}
        description={`A family jewellery boutique in ${siteConfig.address.line2}, built on craftsmanship and personal service.`}
        motif="ring"
        image={{ src: "/images/products/sophia-eternity-band.jpg", alt: "White gold band set with diamonds" }}
      />

      <section className="container-boutique py-24 sm:py-32">
        <Reveal className="max-w-[62ch]">
          <p className="text-lg leading-relaxed text-ink-950 sm:text-xl">
            For decades, {siteConfig.name} has served customers looking for jewellery chosen with care,
            craftsmanship and personal attention. What began as a small family boutique in{" "}
            {siteConfig.address.line2}{" "}
            continues today in the same spirit: each piece considered, each customer known by
            name.
          </p>
          <p className="mt-6 text-[15px] leading-relaxed text-stone-600">
            Our workshop still handles repairs, resizing and bespoke commissions the way it always
            has: in-house, by hand, with the person wearing the piece in mind.
          </p>
        </Reveal>
      </section>

      {/* Stand-in photography of the work itself. These are deliberately pieces, not a claimed
          photo of the Latsia shopfront or the bench: TODO swap for a real boutique interior and
          a real workshop shot, 1600x1200 each, once the client supplies them. */}
      <section className="grid grid-cols-1 sm:grid-cols-2">
        <div className="relative aspect-[4/3] bg-bone-100">
          <FadeImage
            src="/images/products/story-woven-necklace.jpg"
            alt="Sterling silver necklace of hand-shaped links, laid flat"
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="relative aspect-[4/3] bg-bone-100">
          <FadeImage
            src="/images/products/story-paired-bands.jpg"
            alt="A pair of hand-textured silver bands"
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="bg-bone-100 py-24 sm:py-32">
        <div className="container-boutique grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
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
