"use client";

import { useRef } from "react";
import Link from "next/link";
import { FadeImage } from "@/components/site/fade-image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LivingMarble } from "@/components/site/living-marble";

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
          className="relative z-10 flex flex-col justify-center overflow-hidden px-5 pb-10 pt-24 sm:px-8 sm:pb-14 sm:pt-28 lg:px-16 lg:pt-24"
        >
          <LivingMarble mouseX={springX} mouseY={springY} className="absolute inset-0 -z-10" />
          {/* Entrances here are CSS (`.enter-up`), not Framer: this copy is the first thing on
              screen, and a JS-driven entrance means it ships hidden and stays hidden until the
              bundle hydrates. Framer still owns the scroll-linked fade on the wrapper. */}
          <motion.div style={{ opacity: contentOpacity }}>
            <p className="enter-up text-[11px] font-medium uppercase tracking-[0.28em] text-gold-600">
              Latsia, Cyprus · Since 1967
            </p>

            <h1
              style={{ "--enter-delay": "0.1s" } as React.CSSProperties}
              className="enter-up mt-4 max-w-xl text-balance font-serif text-[2.4rem] leading-[1.0] text-ink-950 sm:mt-5 sm:text-6xl sm:leading-[0.98] lg:text-[4rem] xl:text-[4.5rem]"
            >
              Jewellery made <em className="italic text-gold-400">to stay</em> with you.
            </h1>

            <p
              style={{ "--enter-delay": "0.22s" } as React.CSSProperties}
              className="enter-up mt-5 max-w-sm text-[16px] leading-relaxed text-stone-600 sm:mt-6 sm:text-[17px]"
            >
              Fine jewellery, engagement rings and bespoke pieces, selected with care at our
              family boutique in Latsia.
            </p>

            <div
              style={{ "--enter-delay": "0.32s" } as React.CSSProperties}
              className="enter-up mt-7 flex flex-wrap items-center gap-x-8 gap-y-4 sm:mt-9"
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
            </div>
          </motion.div>
        </div>

        {/* Image: full bleed to the viewport edge, no boxed card, edge blended into the page. */}
        <div className="relative min-h-[56dvh] overflow-hidden bg-bone-100 lg:min-h-0">
          {/* No entrance animation on the photo itself. It's the LCP element, so the right
              thing is for it to be painted as early as the browser can manage rather than
              held at opacity 0 waiting on JS. Parallax still applies once hydrated. */}
          <motion.div style={{ y: imageY }} className="absolute inset-x-0 -inset-y-[8%]">
            <FadeImage
              src="/images/products/pearl-pendant-necklace.jpg"
              alt="Gold pendant necklace with a pearl drop, shown on a bronze sculpted bust"
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-[50%_42%]"
            />
          </motion.div>

          {/* Warm the photo's cool studio backdrop towards the page's ivory so the two don't
              meet as two different whites. */}
          <div className="pointer-events-none absolute inset-0 bg-gold-200/10 mix-blend-multiply" />

          {/* Blend the photo's left edge into the ivory content column instead of a hard seam. */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-bone-50 via-bone-50/35 to-transparent lg:w-1/5" />
        </div>
      </div>
    </section>
  );
}
