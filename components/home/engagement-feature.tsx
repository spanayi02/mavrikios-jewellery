import Link from "next/link";
import { FadeImage } from "@/components/site/fade-image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { ParallaxLayer } from "@/components/site/parallax-layer";

const choices = ["Your stone", "Your metal", "Your setting"];

export function EngagementFeature() {
  return (
    <section className="container-mavrikios py-24 sm:py-32">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <Reveal y={0} className="relative order-2 aspect-[4/5] lg:order-1 lg:col-span-6">
          <ParallaxLayer range={30} className="absolute inset-0 right-10 top-10 bg-stone-100">
            <FadeImage
              src="/images/products/sapphire-cluster-ring.jpg"
              alt="White gold ring set with a cluster of blue sapphires"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </ParallaxLayer>
          <ParallaxLayer
            range={16}
            className="absolute bottom-0 left-0 aspect-square w-2/5 border-[6px] border-bone-50 bg-stone-100"
          >
            <FadeImage
              src="/images/products/aliki-solitaire-ring-1.jpg"
              alt="Yellow gold solitaire engagement ring"
              fill
              sizes="(min-width: 1024px) 18vw, 40vw"
              className="object-cover"
            />
          </ParallaxLayer>
        </Reveal>
        <Reveal delay={0.1} className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-gold-600">
            Bespoke &amp; Engagement
          </p>
          <h2 className="max-w-md text-balance font-serif text-4xl leading-[1.08] text-ink-950 sm:text-5xl">
            A more personal kind of <em className="italic text-gold-400">forever.</em>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone-600">
            From the first idea to the final detail, we create meaningful pieces that tell your
            unique story, including the monopetra, the classic Cypriot engagement style, built to
            order around your stone.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {choices.map((choice) => (
              <li
                key={choice}
                className="border border-gold-400/40 px-3 py-1.5 text-[12px] uppercase tracking-[0.12em] text-gold-600"
              >
                {choice}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button asChild size="lg">
              <Link href="/bespoke">Explore Bespoke</Link>
            </Button>
            <Link
              href="/engagement"
              className="veil-underline pb-0.5 text-[13px] font-medium uppercase tracking-[0.12em] text-ink-950"
            >
              Engagement Rings
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
