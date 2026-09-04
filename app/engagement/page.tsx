import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { ProductCard } from "@/components/commerce/product-card";
import { PlaceholderArt } from "@/components/site/placeholder-art";
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
    title: "Choose Your Stone",
    body: "Diamond, sapphire or another stone — we'll talk through cut, setting and budget together, in person or over the phone.",
  },
  {
    title: "Choose Your Metal",
    body: "18k yellow, white or rose gold, or platinum. We can show samples side by side in-store.",
  },
  {
    title: "Choose Your Setting",
    body: "From a classic monopetra to a halo or a fine pavé band — the setting is where the ring becomes personal.",
  },
];

export default async function EngagementPage() {
  const products = await getEngagementProducts();

  return (
    <div>
      <PageHero
        eyebrow="Engagement"
        title="The monopetra, made around your stone."
        description="A single stone, simply set — the ring most requested in Cyprus, built to order in our workshop."
        motif="monopetra"
      />

      <section className="container-mavrikios py-20 sm:py-28">
        <Reveal className="mb-10 flex items-end justify-between sm:mb-14">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-stone-500">Engagement Rings</p>
            <h2 className="max-w-lg font-serif text-3xl italic text-ink-950 sm:text-4xl">
              Made to order, for you
            </h2>
          </div>
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

      <section className="bg-marble-100 py-20 sm:py-28">
        <div className="container-mavrikios">
          <Reveal className="text-center">
            <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-stone-500">
              Choosing Your Ring
            </p>
            <h2 className="mx-auto mb-14 max-w-lg font-serif text-3xl italic text-ink-950 sm:text-4xl">
              Three conversations, one ring
            </h2>
          </Reveal>
          <Reveal stagger={0.1} className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
            {guideSteps.map((step, i) => (
              <RevealItem key={step.title}>
                <span className="font-serif text-3xl italic text-stone-400">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-serif text-xl text-ink-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{step.body}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="container-mavrikios grid grid-cols-1 items-center gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:gap-8">
        <Reveal y={0} className="order-2 aspect-[4/5] lg:order-1 lg:col-span-6">
          <ParallaxLayer range={30} className="h-full">
            <PlaceholderArt motif="ring" tone="ink" label="Bespoke Design" />
          </ParallaxLayer>
        </Reveal>
        <Reveal delay={0.1} className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-stone-500">Bespoke Design</p>
          <h2 className="max-w-md font-serif text-3xl italic text-ink-950 sm:text-4xl">
            Or design something entirely your own.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone-600">
            If nothing in the collection is quite right, our workshop can design and craft a ring
            from scratch — around a stone you already own, or one we help you choose.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/bespoke">Explore Bespoke</Link>
          </Button>
        </Reveal>
      </section>

      <Reveal as="section" className="marble-surface-dark py-20 text-center sm:py-28">
        <div className="container-mavrikios flex flex-col items-center">
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-marble-50/50">Craftsmanship</p>
          <h2 className="max-w-lg font-serif text-3xl italic text-marble-50 sm:text-4xl">
            Book a private consultation
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-marble-50/75">
            Visit our Latsia boutique or reach out ahead of time — we&rsquo;ll set aside time to
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
