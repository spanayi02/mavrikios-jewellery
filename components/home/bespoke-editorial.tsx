import Link from "next/link";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import { Button } from "@/components/ui/button";
import { Reveal, RevealItem } from "@/components/site/reveal";

const steps = [
  { n: "01", label: "Conversation" },
  { n: "02", label: "Design" },
  { n: "03", label: "Craft" },
  { n: "04", label: "Reveal" },
];

export function BespokeEditorial() {
  return (
    <section className="container-mavrikios py-20 sm:py-28">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-stone-500">Bespoke</p>
          <h2 className="max-w-md font-serif text-3xl italic text-ink-950 sm:text-4xl">
            A piece designed entirely around you.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone-600">
            From a first conversation to the finished piece in your hands, our workshop designs
            and makes bespoke jewellery to order — heirlooms redesigned, ideas sketched into
            reality.
          </p>
          <Reveal stagger={0.08} className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4" as="ol">
            {steps.map((step) => (
              <RevealItem key={step.n} as="li" className="flex items-baseline gap-3">
                <span className="font-serif text-lg italic text-stone-400">{step.n}</span>
                <span className="text-sm text-ink-950">{step.label}</span>
              </RevealItem>
            ))}
          </Reveal>
          <Button asChild variant="outline" className="mt-8">
            <Link href="/bespoke">Begin a Bespoke Piece</Link>
          </Button>
        </Reveal>
        <Reveal delay={0.15} className="relative aspect-[4/5] overflow-hidden lg:col-span-6 lg:col-start-7">
          <PlaceholderArt motif="ring" tone="ink" label="Bespoke Workshop" />
        </Reveal>
      </div>
    </section>
  );
}
