import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal, RevealItem } from "@/components/site/reveal";

const steps = [
  { label: "Conversation", description: "Share your story, your budget and what's inspiring you." },
  { label: "Design", description: "We sketch and refine the piece with you until it's right." },
  { label: "Craft", description: "Your piece is handmade in our workshop, here in Latsia." },
  { label: "Reveal", description: "Collect it in the boutique, finished and ready to wear." },
];

export function BespokeEditorial() {
  return (
    <section className="marble-surface py-24 sm:py-32">
      <div className="container-mavrikios">
        <Reveal className="max-w-xl">
          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold-600">Bespoke</p>
          <h2 className="text-balance font-serif text-4xl leading-[1.08] text-ink-950 sm:text-5xl">
            A piece designed entirely around you.
          </h2>
          <p className="mt-6 max-w-[60ch] text-[15px] leading-relaxed text-stone-600">
            From a first conversation to the finished piece in your hands, our workshop designs
            and makes bespoke jewellery to order. Heirlooms redesigned, ideas sketched into
            reality.
          </p>
        </Reveal>

        {/* The four steps are a sequence, so they arrive as one: the rule draws itself along
            its own length and the markers land behind it, slightly staggered. The stagger is
            tuned against the draw rather than picked for its own sake, so a marker appears at
            roughly the moment the line reaches it. */}
        <Reveal
          stagger={0.12}
          as="ol"
          className="relative mt-16 grid grid-cols-1 gap-10 sm:mt-20 sm:grid-cols-4 sm:gap-6"
        >
          {/* An <li>, not a bare <div>, so the list keeps only list items as children;
              aria-hidden leaves the step count at four. It is also deliberately the first
              child: the group's nth-child stagger then starts the steps one beat after the
              line, which is the order the animation reads in. */}
          <li
            aria-hidden
            className="rv-draw pointer-events-none absolute left-[5px] top-0 block h-full w-px origin-top bg-gold-600/30 sm:left-0 sm:top-[5px] sm:h-px sm:w-full sm:origin-left"
          />
          {steps.map((step) => (
            <RevealItem key={step.label} as="li" className="relative flex gap-5 sm:flex-col sm:gap-0">
              <span className="relative z-10 mt-[3px] size-[11px] shrink-0 bg-gold-600 sm:mt-0" aria-hidden />
              <div className="sm:mt-6">
                <p className="font-serif text-2xl text-ink-950">{step.label}</p>
                <p className="mt-2 max-w-[24ch] text-sm leading-relaxed text-stone-600">{step.description}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal delay={0.2}>
          <Button asChild variant="outline" className="mt-14 sm:mt-16">
            <Link href="/bespoke">Begin a Bespoke Piece</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
