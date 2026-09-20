import type { Metadata } from "next";
import Link from "next/link";
import { FadeImage } from "@/components/site/fade-image";
import { PageHero } from "@/components/site/page-hero";
import { ProductCard } from "@/components/commerce/product-card";
import { ParallaxLayer } from "@/components/site/parallax-layer";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { getEngagementProducts } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Engagement Rings & Monopetra",
  description:
    "Engagement rings and the traditional monopetra, made to order at Mavrikios Jewellery Boutique in Nicosia, Cyprus.",
  alternates: { canonical: "/engagement" },
};

const guideSteps = [
  {
    title: "Choose your stone",
    body: "Diamond, sapphire or another stone. We'll talk through cut, setting and budget together, in person or over the phone.",
  },
  {
    title: "Choose your metal",
    body: "18k yellow, white or rose gold, or platinum. We can show samples side by side in-store.",
  },
  {
    title: "Choose your setting",
    body: "From a classic monopetra to a halo or a fine pavé band, the setting is where the ring becomes personal.",
  },
];

export default async function EngagementPage() {
  const products = await getEngagementProducts();

  return (
    <div>
      <PageHero
        eyebrow="Engagement"
        title="The monopetra, made around your stone."
        description="A single stone, simply set. The ring most requested in Cyprus, built to order in our workshop."
        motif="monopetra"
        image={{ src: "/images/products/aliki-solitaire-ring-1.jpg", alt: "Yellow gold solitaire engagement ring" }}
      />

      <section className="container-mavrikios py-24 sm:py-32">
        <Reveal className="mb-12 flex items-end justify-between sm:mb-16">
          <h2 className="max-w-lg text-balance font-serif text-4xl leading-[1.08] text-ink-950 sm:text-5xl">
            Made to order, for you
          </h2>
          <Link href="/shop?collection=engagement" className="veil-underline hidden text-[13px] font-medium uppercase tracking-[0.12em] text-ink-950 sm:block">
            View All
          </Link>
        </Reveal>
        <Reveal stagger={0.08} className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {products.map((product) => (
            <RevealItem key={product.id}>
              <ProductCard product={product} />
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <section className="bg-bone-100 py-24 sm:py-32">
        <div className="container-mavrikios grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <h2 className="max-w-md text-balance font-serif text-4xl leading-[1.08] text-ink-950 sm:text-5xl lg:sticky lg:top-32">
              Three conversations, one ring
            </h2>
          </Reveal>
          <Reveal stagger={0.1} as="ol" className="lg:col-span-6 lg:col-start-7">
            {guideSteps.map((step) => (
              <RevealItem key={step.title} as="li" className="border-t border-stone-300 py-7 first:border-t-0 first:pt-0">
                <h3 className="font-serif text-2xl text-ink-950">{step.title}</h3>
                <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-stone-600">{step.body}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="container-mavrikios grid grid-cols-1 items-center gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:gap-8">
        <Reveal y={0} className="order-2 aspect-[4/5] lg:order-1 lg:col-span-6">
          <ParallaxLayer range={30} className="h-full bg-stone-100">
            <FadeImage
              src="/images/products/ruby-emerald-swirl-ring.jpg"
              alt="Gold rings set with a ruby and an emerald"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </ParallaxLayer>
        </Reveal>
        <Reveal delay={0.1} className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
          <h2 className="max-w-md text-balance font-serif text-4xl leading-[1.08] text-ink-950 sm:text-5xl">
            Or design something entirely your own.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone-600">
            If nothing in the collection is quite right, our workshop can design and craft a ring
            from scratch, around a stone you already own or one we help you choose.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/bespoke">Explore Bespoke</Link>
          </Button>
        </Reveal>
      </section>

      <Reveal as="section" className="marble-surface-dark py-24 text-center sm:py-32">
        <div className="container-mavrikios flex flex-col items-center">
          <h2 className="max-w-lg text-balance font-serif text-4xl leading-[1.08] text-bone-50 sm:text-5xl">
            Book a private consultation
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-moss-200">
            Visit our Latsia boutique or reach out ahead of time. We&rsquo;ll set aside time to
            talk through stones, settings and budget with no pressure.
          </p>
          <Button asChild variant="inverse" size="lg" className="mt-8">
            <Link href="/contact?reason=engagement">Book a Consultation</Link>
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
