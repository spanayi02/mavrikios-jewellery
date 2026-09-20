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
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const insetY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative -mt-20 w-full overflow-hidden bg-bone-50"
    >
      <LivingMarble mouseX={springX} mouseY={springY} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-bone-50 via-bone-50/70 to-bone-50/30" />

      <div className="container-mavrikios relative z-10 grid min-h-[100dvh] grid-cols-1 items-center gap-12 pb-16 pt-28 lg:grid-cols-12 lg:gap-8 lg:pt-24">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="lg:col-span-6">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="max-w-xl text-balance font-serif text-4xl leading-[1.1] text-ink-950 sm:text-5xl lg:text-[2.9rem] xl:text-[3.5rem]"
          >
            Jewellery made to <em className="italic text-moss-600">become part of your story.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="mt-6 max-w-md text-base leading-relaxed text-stone-600"
          >
            Fine jewellery, engagement rings and bespoke pieces, made with care at our boutique in
            Latsia since 1967.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
            className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <Button asChild size="lg">
              <Link href="/shop">Shop the Collection</Link>
            </Button>
            <Link
              href="/engagement"
              className="group flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-ink-950"
            >
              Engagement Rings
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="relative lg:col-span-6 lg:pl-6">
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease }}
            className="relative ml-auto aspect-[4/5] w-full max-w-[540px] overflow-hidden bg-stone-100"
          >
            <FadeImage
              src="/images/products/aliki-solitaire-ring-1.jpg"
              alt="Aliki solitaire ring in 18k yellow gold"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{ y: insetY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease }}
            className="absolute -bottom-10 left-0 hidden aspect-square w-[40%] max-w-[240px] overflow-hidden border-[10px] border-bone-50 bg-stone-100 sm:block lg:-left-4"
          >
            <FadeImage
              src="/images/products/sophia-eternity-band.jpg"
              alt="Sophia eternity band in 18k white gold"
              fill
              sizes="(min-width: 1024px) 18vw, 40vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
