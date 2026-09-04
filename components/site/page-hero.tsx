"use client";

import { motion } from "framer-motion";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import { ParallaxLayer } from "@/components/site/parallax-layer";
import type { PlaceholderMotif } from "@/types/product";

const ease = [0.16, 1, 0.3, 1] as const;

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  motif: PlaceholderMotif;
}

export function PageHero({ eyebrow, title, description, motif }: PageHeroProps) {
  return (
    <section className="relative -mt-20 flex min-h-[56vh] w-full items-end overflow-hidden bg-marble-50 sm:min-h-[64vh]">
      <ParallaxLayer range={30} className="absolute inset-0">
        <PlaceholderArt motif={motif} />
      </ParallaxLayer>
      <div className="absolute inset-0 bg-gradient-to-t from-marble-50 via-marble-50/45 to-marble-50/15" />
      <div className="container-mavrikios relative z-10 pb-16 pt-40 sm:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-champagne-600"
        >
          <span className="h-px w-8 bg-champagne-400" aria-hidden />
          {eyebrow}
        </motion.p>
        <h1 className="max-w-2xl overflow-hidden text-balance font-serif text-4xl italic leading-[1.1] text-ink-950 sm:text-5xl">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="block"
          >
            {title}
          </motion.span>
        </h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease }}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-stone-600"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
