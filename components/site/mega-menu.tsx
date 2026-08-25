"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { megaMenu } from "@/data/navigation";
import { PlaceholderArt } from "@/components/site/placeholder-art";

interface MegaMenuProps {
  onNavigate?: () => void;
}

export function MegaMenu({ onNavigate }: MegaMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-0 top-full border-t border-stone-200 bg-marble-50 shadow-2xl"
    >
      <div className="container-mavrikios grid grid-cols-12 gap-10 py-12">
        <div className="col-span-2">
          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-stone-500">Shop</p>
          <ul className="space-y-3">
            {megaMenu.shop.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="veil-underline text-[15px] text-ink-950"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2">
          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-stone-500">Jewellery</p>
          <ul className="space-y-3">
            {megaMenu.jewellery.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="veil-underline text-[15px] text-ink-950"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2">
          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-stone-500">Moments</p>
          <ul className="space-y-3">
            {megaMenu.moments.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="veil-underline text-[15px] text-ink-950"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link
          href="/shop?sort=newest"
          onClick={onNavigate}
          className="group relative col-span-6 block h-64 overflow-hidden"
        >
          <PlaceholderArt motif="necklace" label="New Arrivals" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 flex items-center gap-2 text-marble-50">
            <span className="font-serif text-lg italic">The New Arrivals</span>
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
