"use client";

import { useRef } from "react";
import Link from "next/link";
import { FadeImage } from "@/components/site/fade-image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LivingMarble } from "@/components/site/living-marble";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section ref={sectionRef} className="relative -mt-20 w-full overflow-hidden bg-bone-50">
      <div className="grid grid-cols-1 lg:min-h-[100dvh] lg:grid-cols-[42fr_58fr]">
        {/* Content: constrained to ~42% on desktop, its own warm ivory ground. */}
        <div
          onMouseMove={handleMouseMove}
          className="relative z-10 flex flex-col justify-center overflow-hidden px-5 pb-14 pt-28 sm:px-8 lg:px-16 lg:pt-24"
        >
          <LivingMarble mouseX={springX} mouseY={springY} className="absolute inset-0 -z-10" />
          <motion.div style={{ opacity: contentOpacity }}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-600"
            >
              Latsia, Cyprus · Since 1967
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease }}
              className="mt-5 max-w-xl text-balance font-serif text-[2.75rem] leading-[0.98] text-ink-950 sm:text-6xl lg:text-[4rem] xl:text-[4.5rem]"
            >
              Jewellery made <em className="italic text-gold-400">to stay</em> with you.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease }}
              className="mt-6 max-w-sm text-[17px] leading-relaxed text-stone-600"
            >
              Fine jewellery, engagement rings and bespoke pieces, selected with care at our
              family boutique in Latsia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
              className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Button asChild size="lg">
                <Link href="/shop">Shop the Collection</Link>
              </Button>
              <Link
                href="/engagement"
                className="veil-underline group flex items-center gap-2 pb-0.5 text-[13px] font-medium uppercase tracking-[0.12em] text-ink-950"
              >
                Discover Engagement Rings
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Image: full bleed to the viewport edge, no boxed card, edge blended into the page. */}
        <div className="relative min-h-[56dvh] overflow-hidden bg-stone-100 lg:min-h-0">
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
            className="absolute inset-x-0 -inset-y-[8%]"
          >
            <FadeImage
              src="/images/products/aliki-solitaire-ring-1.jpg"
              alt="Aliki solitaire ring in 18k yellow gold, from the Mavrikios collection"
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          {/* Blend the photo's left edge into the ivory content column instead of a hard seam. */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-bone-50 via-bone-50/35 to-transparent lg:w-1/5" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="pointer-events-none absolute right-6 top-28 max-w-[9ch] text-right text-[10px] font-medium uppercase leading-[1.7] tracking-[0.18em] text-ink-950/45 sm:right-10 sm:top-32"
          >
            More than jewellery, a part of your story
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="pointer-events-none absolute bottom-8 right-6 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-950/45 sm:bottom-10 sm:right-10"
          >
            Est. 1967
          </motion.p>
        </div>
      </div>
    </section>
  );
}
