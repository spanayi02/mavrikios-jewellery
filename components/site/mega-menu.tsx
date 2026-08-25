"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { megaMenu, type MegaMenuLink } from "@/data/navigation";
import { PlaceholderArt } from "@/components/site/placeholder-art";

interface MegaMenuProps {
  onNavigate?: () => void;
}

const defaultPanel: MegaMenuLink = { label: "The New Arrivals", href: "/shop?sort=newest", motif: "necklace" };

export function MegaMenu({ onNavigate }: MegaMenuProps) {
  const [active, setActive] = useState<MegaMenuLink>(defaultPanel);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-0 top-full border-t border-stone-200 bg-marble-50 shadow-2xl"
      onMouseLeave={() => setActive(defaultPanel)}
    >
      <div className="container-mavrikios grid grid-cols-12 gap-10 py-12">
        <MenuColumn title="Shop" items={megaMenu.shop} onNavigate={onNavigate} onHoverItem={setActive} />
        <MenuColumn title="Jewellery" items={megaMenu.jewellery} onNavigate={onNavigate} onHoverItem={setActive} />
        <MenuColumn title="Moments" items={megaMenu.moments} onNavigate={onNavigate} onHoverItem={setActive} />

        <Link
          href={active.href}
          onClick={onNavigate}
          className="group relative col-span-6 block h-64 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.motif}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <PlaceholderArt motif={active.motif} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 flex items-center gap-2 text-marble-50">
            <AnimatePresence mode="wait">
              <motion.span
                key={active.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="font-serif text-lg italic"
              >
                {active.label}
              </motion.span>
            </AnimatePresence>
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

function MenuColumn({
  title,
  items,
  onNavigate,
  onHoverItem,
}: {
  title: string;
  items: MegaMenuLink[];
  onNavigate?: () => void;
  onHoverItem: (item: MegaMenuLink) => void;
}) {
  return (
    <div className="col-span-2">
      <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-stone-500">{title}</p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              onMouseEnter={() => onHoverItem(item)}
              className="veil-underline text-[15px] text-ink-950"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
