"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Reveal, RevealItem } from "@/components/site/reveal";

const lineVariants: Variants = {
  hidden: { scaleY: 0, scaleX: 0 },
  visible: { scaleY: 1, scaleX: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 } },
};

const steps = [
  {
    n: "01",
    label: "Conversation",
    description: "Share your story, your budget and what's inspiring you.",
  },
  {
    n: "02",
    label: "Design",
    description: "We sketch and refine the piece with you until it's right.",
  },
  {
    n: "03",
    label: "Craft",
    description: "Your piece is handmade in our workshop, here in Latsia.",
  },
  {
    n: "04",
    label: "Reveal",
    description: "Collect it in the boutique, finished and ready to wear.",
  },
];

export function BespokeEditorial() {
  return (
    <section className="marble-surface py-24 sm:py-32">
      <div className="container-mavrikios">
        <Reveal className="max-w-lg">
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-stone-500">Bespoke</p>
          <h2 className="font-serif text-3xl italic text-ink-950 sm:text-4xl">
            A piece designed entirely around you.
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-stone-600">
            From a first conversation to the finished piece in your hands, our workshop designs
            and makes bespoke jewellery to order — heirlooms redesigned, ideas sketched into
            reality.
          </p>
        </Reveal>

        <Reveal
          stagger={0.1}
          as="ol"
          className="relative mt-16 grid grid-cols-1 gap-10 sm:mt-20 sm:grid-cols-4 sm:gap-6"
        >
          <motion.div
            aria-hidden
            variants={lineVariants}
            className="absolute left-[19px] top-0 h-full w-px origin-top bg-champagne-300/60 sm:top-[19px] sm:left-0 sm:h-px sm:w-full sm:origin-left"
          />
          {steps.map((step) => (
            <RevealItem key={step.n} as="li" className="relative flex gap-4 sm:flex-col sm:gap-0">
              <span className="relative z-10 flex size-10 shrink-0 items-center justify-center border border-champagne-400 bg-marble-50 font-serif text-base italic text-champagne-600">
                {step.n}
              </span>
              <div className="sm:mt-5">
                <p className="font-serif text-lg italic text-ink-950">{step.label}</p>
                <p className="mt-1.5 max-w-[22ch] text-sm leading-relaxed text-stone-600">
                  {step.description}
                </p>
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
