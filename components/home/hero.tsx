"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceholderArt } from "@/components/site/placeholder-art";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative -mt-20 flex min-h-[92vh] w-full items-end overflow-hidden bg-ink-950 sm:min-h-screen">
      <motion.div
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease }}
        className="absolute inset-0"
      >
        <PlaceholderArt motif="ring" tone="ink" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-ink-950/40" />
      </motion.div>

      <div className="container-mavrikios relative z-10 grid w-full grid-cols-1 gap-10 pb-16 pt-40 sm:pb-24 lg:grid-cols-12 lg:pb-28">
        <div className="lg:col-span-8 lg:col-start-1">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="mb-6 text-[11px] uppercase tracking-[0.35em] text-marble-50/70"
          >
            Mavrikios &middot; Nicosia &middot; Since 1967
          </motion.p>

          <h1 className="max-w-3xl font-serif text-[2.6rem] leading-[1.05] text-marble-50 sm:text-6xl lg:text-[4.6rem]">
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
                className="block italic text-balance"
              >
                become part of your story.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05, ease }}
            className="mt-6 max-w-md text-[15px] leading-relaxed text-marble-50/75"
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
            <Button asChild variant="inverse" size="lg">
              <Link href="/shop">Shop the Collection</Link>
            </Button>
            <Link
              href="/our-story"
              className="group flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-marble-50"
            >
              Discover Our Story
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 right-6 hidden flex-col items-end gap-1 text-right text-[11px] uppercase tracking-[0.2em] text-marble-50/60 sm:flex lg:right-12"
      >
        <span>Ayiou Georgiou 17C, Latsia</span>
        <span>Handled with care since 1967</span>
      </motion.div>
    </section>
  );
}
