"use client";

import { FadeImage } from "@/components/site/fade-image";
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
  /** Real photo behind the hero. Falls back to the motif placeholder when absent. */
  image?: { src: string; alt: string };
}

export function PageHero({ eyebrow, title, description, motif, image }: PageHeroProps) {
  return (
    <section className="relative -mt-20 flex min-h-[60dvh] w-full items-end overflow-hidden bg-bone-50 sm:min-h-[68dvh]">
      <ParallaxLayer range={30} className="absolute inset-0">
        {image ? (
          <FadeImage src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
        ) : (
          <PlaceholderArt motif={motif} />
        )}
      </ParallaxLayer>
      <div className="absolute inset-0 bg-gradient-to-t from-bone-50 via-bone-50/70 to-bone-50/25" />
      <div className="container-mavrikios relative z-10 pb-16 pt-40 sm:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mb-4 text-[11px] uppercase tracking-[0.3em] text-gold-600"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="max-w-2xl text-balance font-serif text-4xl leading-[1.08] text-ink-950 sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
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
