import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import { ParallaxLayer } from "@/components/site/parallax-layer";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Bespoke Jewellery",
  description:
    "Made-to-order, custom jewellery designed and crafted by hand at Mavrikios Jewellery Boutique in Nicosia, Cyprus.",
  alternates: { canonical: "/bespoke" },
};

const flow = [
  {
    n: "01",
    title: "Conversation",
    body: "We start by listening — the occasion, the person, the idea in your head that doesn't have a name yet. In-store or by phone.",
  },
  {
    n: "02",
    title: "Design",
    body: "We sketch and refine the concept together, choosing metal, stone and form until the design feels right.",
  },
  {
    n: "03",
    title: "Craft",
    body: "Your piece is made by hand in our workshop, with the same care we've applied to every commission since 1967.",
  },
  {
    n: "04",
    title: "Reveal",
    body: "You collect the finished piece in-store, where we check the fit and finish together before it's truly yours.",
  },
];

export default function BespokePage() {
  return (
    <div>
      <PageHero
        eyebrow="Bespoke"
        title="A piece designed entirely around you."
        description="From a first conversation to a finished piece in your hands — made to order, in our workshop."
        motif="ring"
      />

      <section className="container-mavrikios py-20 sm:py-28">
        <Reveal stagger={0.1} className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
          {flow.map((step) => (
            <RevealItem key={step.n} className="flex gap-6">
              <span className="font-serif text-4xl italic text-stone-300">{step.n}</span>
              <div>
                <h2 className="font-serif text-2xl text-ink-950">{step.title}</h2>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-stone-600">{step.body}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2">
        <Reveal y={0} className="relative aspect-square lg:aspect-auto">
          <ParallaxLayer range={30} className="h-full">
            <PlaceholderArt motif="necklace" tone="ink" label="Redesign" />
          </ParallaxLayer>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col justify-center bg-marble-100 px-6 py-16 sm:px-14 sm:py-20">
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-stone-500">Redesign</p>
          <h2 className="max-w-md font-serif text-3xl italic text-ink-950 sm:text-4xl">
            An heirloom, made to be worn again.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone-600">
            Inherited jewellery often carries more sentiment than style. We can take stones and
            gold you already own and redesign them into a piece that fits how you live now.
          </p>
        </Reveal>
      </section>

      <Reveal as="section" className="marble-surface-dark py-20 text-center sm:py-28">
        <div className="container-mavrikios flex flex-col items-center">
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-marble-50/50">Begin</p>
          <h2 className="max-w-lg font-serif text-3xl italic text-marble-50 sm:text-4xl">
            Begin a Bespoke Piece
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-marble-50/75">
            Tell us a little about what you have in mind and we&rsquo;ll be in touch to arrange a
            first conversation.
          </p>
          <Button asChild variant="inverse" size="lg" className="mt-8">
            <Link href="/contact?reason=bespoke">Start the Conversation</Link>
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
