"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import { Marquee } from "@/components/site/marquee";
import type { PlaceholderMotif } from "@/types/product";

const ease = [0.16, 1, 0.3, 1] as const;

const tickerItems = [
  "Since 1967",
  "Engagement Rings",
  "Bespoke Design",
  "Free Delivery in Cyprus",
  "Handcrafted in Latsia",
  "Jewellery Repairs",
];

interface FloatCard {
  motif: PlaceholderMotif;
  tone: "marble" | "ink";
  className: string;
  rotate: number;
  depth: number;
  floatDelay: number;
}

const floatCards: FloatCard[] = [
  {
    motif: "ring",
    tone: "marble",
    className: "right-[6%] top-[12%] h-40 w-32 sm:h-52 sm:w-40 lg:right-[10%] lg:top-[9%] lg:h-64 lg:w-52",
    rotate: 4,
    depth: 0.18,
    floatDelay: 0,
  },
  {
    motif: "necklace",
    tone: "ink",
    className: "right-[30%] top-[46%] hidden h-32 w-28 sm:right-[34%] sm:block sm:h-40 sm:w-32 lg:right-[32%] lg:top-[44%] lg:h-48 lg:w-40",
    rotate: -3,
    depth: 0.1,
    floatDelay: 0.6,
  },
  {
    motif: "earring",
    tone: "marble",
    className: "right-[8%] top-[54%] hidden h-28 w-24 sm:right-[10%] sm:block sm:h-32 sm:w-28 lg:right-[13%] lg:top-[52%] lg:h-40 lg:w-36",
    rotate: -6,
    depth: 0.26,
    floatDelay: 1.2,
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

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
      className="relative -mt-20 flex min-h-[100vh] w-full flex-col overflow-hidden bg-marble-50 sm:min-h-[104vh]"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <PlaceholderArt motif="monopetra" />
        <div className="absolute inset-0 bg-gradient-to-t from-marble-50 via-marble-50/40 to-marble-50/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-marble-50/85 via-marble-50/10 to-transparent" />
      </motion.div>

      {/* Ghost wordmark watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[8%] select-none text-center font-serif text-[22vw] leading-none tracking-tight text-champagne-400/[0.14] sm:top-[10%]"
      >
        MAVRIKIOS
      </div>

      {/* Floating jewellery cards */}
      {floatCards.map((card, i) => (
        <FloatingCard key={i} card={card} index={i} mouseX={springX} mouseY={springY} />
      ))}

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-mavrikios relative z-10 flex flex-1 flex-col justify-end pb-20 pt-40 sm:pb-16"
      >
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-champagne-500"
          >
            <span className="h-px w-8 bg-champagne-400" aria-hidden />
            Mavrikios &middot; Nicosia &middot; Since 1967
          </motion.p>

          <h1 className="max-w-3xl font-serif text-[2.6rem] leading-[1.05] text-ink-950 sm:text-6xl lg:text-[4.6rem]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease }}
                className="block text-balance"
              >
                Jewellery made to
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.75, ease }}
                className="block italic text-balance text-champagne-500"
              >
                become part of your story.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05, ease }}
            className="mt-6 max-w-md text-[15px] leading-relaxed text-stone-600"
          >
            Fine jewellery, engagement rings and bespoke pieces, chosen and made with personal
            attention at our boutique in Latsia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25, ease }}
            className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <MagneticButton>
              <Link href="/shop">Shop the Collection</Link>
            </MagneticButton>
            <Link
              href="/our-story"
              className="group flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-ink-950"
            >
              Discover Our Story
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative z-10 border-t border-champagne-300/40 bg-marble-50/60 backdrop-blur-sm"
      >
        <Marquee
          duration={30}
          items={tickerItems.map((item) => (
            <span key={item} className="flex items-center gap-8 px-4 py-3.5 text-[11px] uppercase tracking-[0.28em] text-stone-500">
              {item}
              <span aria-hidden className="text-champagne-500">
                &#10022;
              </span>
            </span>
          ))}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="pointer-events-none absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-950/35 sm:flex"
      >
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}

function FloatingCard({
  card,
  index,
  mouseX,
  mouseY,
}: {
  card: FloatCard;
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const x = useTransform(mouseX, (v) => v * card.depth * 60);
  const y = useTransform(mouseY, (v) => v * card.depth * 60);

  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.92, rotate: card.rotate - 4 }}
      animate={{ opacity: 1, scale: 1, rotate: card.rotate }}
      transition={{ duration: 1.1, delay: 0.5 + index * 0.15, ease }}
      className={`absolute z-[1] ${card.className}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5.5, delay: card.floatDelay, repeat: Infinity, ease: "easeInOut" }}
        className="h-full w-full overflow-hidden border border-champagne-300/70 shadow-[0_24px_50px_-18px_rgba(163,132,79,0.35)]"
      >
        <PlaceholderArt motif={card.motif} tone={card.tone} />
      </motion.div>
    </motion.div>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.3 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Button asChild variant="default" size="lg">
        {children}
      </Button>
    </motion.div>
  );
}
