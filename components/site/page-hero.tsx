"use client";

import { FadeImage } from "@/components/site/fade-image";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import { ParallaxLayer } from "@/components/site/parallax-layer";
import type { PlaceholderMotif } from "@/types/product";

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
      {/* CSS entrances, not Framer: this is above the fold on every secondary page, so a
          JS-driven one ships the copy hidden and leaves it blank until hydration. */}
      <div className="container-boutique relative z-10 pb-16 pt-40 sm:pb-20">
        <p className="enter-up mb-4 text-[11px] uppercase tracking-[0.3em] text-gold-600">
          {eyebrow}
        </p>
        <h1
          style={{ "--enter-delay": "0.1s" } as React.CSSProperties}
          className="enter-up max-w-2xl text-balance font-serif text-4xl leading-[1.08] text-ink-950 sm:text-5xl lg:text-6xl"
        >
          {title}
        </h1>
        {description && (
          <p
            style={{ "--enter-delay": "0.24s" } as React.CSSProperties}
            className="enter-up mt-5 max-w-md text-[15px] leading-relaxed text-stone-600"
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
