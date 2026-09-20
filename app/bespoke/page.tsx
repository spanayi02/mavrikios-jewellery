import type { Metadata } from "next";
import Link from "next/link";
import { FadeImage } from "@/components/site/fade-image";
import { PageHero } from "@/components/site/page-hero";
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
    title: "Conversation",
    body: "We start by listening: the occasion, the person, the idea in your head that doesn't have a name yet. In-store or by phone.",
  },
  {
    title: "Design",
    body: "We sketch and refine the concept together, choosing metal, stone and form until the design feels right.",
  },
  {
    title: "Craft",
    body: "Your piece is made by hand in our workshop, with the same care we've applied to every commission since 1967.",
  },
  {
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
        description="From a first conversation to a finished piece in your hands, made to order in our workshop."
        motif="ring"
        image={{ src: "/images/products/ruby-emerald-swirl-ring.jpg", alt: "Gold rings set with a ruby and an emerald" }}
      />

      <section className="container-mavrikios py-24 sm:py-32">
        <Reveal stagger={0.1} className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2">
          {flow.map((step) => (
            <RevealItem key={step.title} className="border-t border-stone-300 pt-6">
              <h2 className="font-serif text-3xl text-ink-950">{step.title}</h2>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-stone-600">{step.body}</p>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2">
        <Reveal y={0} className="relative aspect-square lg:aspect-auto">
          <ParallaxLayer range={30} className="h-full bg-stone-100">
            <FadeImage
              src="/images/products/aquamarine-bezel-ring.jpg"
              alt="Gold ring with a round aquamarine cabochon"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </ParallaxLayer>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col justify-center bg-bone-100 px-6 py-20 sm:px-14 sm:py-24">
          <h2 className="max-w-md text-balance font-serif text-4xl leading-[1.08] text-ink-950 sm:text-5xl">
            An heirloom, made to be worn again.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone-600">
            Inherited jewellery often carries more sentiment than style. We can take stones and
            gold you already own and redesign them into a piece that fits how you live now.
          </p>
        </Reveal>
      </section>

      <Reveal as="section" className="marble-surface-dark py-24 text-center sm:py-32">
        <div className="container-mavrikios flex flex-col items-center">
          <h2 className="max-w-lg text-balance font-serif text-4xl leading-[1.08] text-bone-50 sm:text-5xl">
            Begin a bespoke piece
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-gold-200">
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
