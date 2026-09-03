"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  /** Total travel distance in px as the layer scrolls through the viewport. */
  range?: number;
  /** Clip the moving content to the frame (for image panels). Set false for decorative
   * elements that already bleed past their section's edge (e.g. background typography). */
  clip?: boolean;
}

/**
 * Moves its content vertically at a different rate than the page scroll, giving imagery
 * physical depth — the same technique the hero already uses for its background/content
 * layers, carried down through the sections whose compositions are built for it.
 */
export function ParallaxLayer({ children, className, range = 40, clip = true }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  if (!clip) {
    return (
      <motion.div ref={ref} style={prefersReducedMotion ? undefined : { y }} className={className}>
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={prefersReducedMotion ? undefined : { y, position: "absolute", inset: `-${range}px 0` }}
        className={prefersReducedMotion ? "absolute inset-0" : undefined}
      >
        {children}
      </motion.div>
    </div>
  );
}
