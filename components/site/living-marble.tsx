"use client";

import { motion, useMotionTemplate, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface LivingMarbleProps {
  /** Normalized -0.5..0.5 pointer position relative to the container, e.g. Hero's mouseX/mouseY. */
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  className?: string;
}

/**
 * A cursor-reactive stand-in for the static .marble-surface texture: a soft highlight
 * follows the pointer as if catching polished stone, layered over the same veined
 * background via CSS mix-blend-mode.
 *
 * This used to be an animated <canvas> redrawn every frame forever (base fill + veins +
 * a soft-light radial gradient), which cost real main-thread time continuously — even
 * with the pointer sitting still — and was the site's main source of scroll/interaction
 * jank. A CSS radial-gradient whose position tracks the pointer's motion values costs
 * nothing at rest: it only repaints while the spring is actually still settling after a
 * pointer move, then goes idle.
 */
export function LivingMarble({ mouseX, mouseY, className }: LivingMarbleProps) {
  const prefersReducedMotion = useReducedMotion();
  const posX = useTransform(mouseX, (x) => `${(0.5 + x * 0.7) * 100}%`);
  const posY = useTransform(mouseY, (y) => `${(0.35 + y * 0.5) * 100}%`);
  const background = useMotionTemplate`radial-gradient(circle at ${posX} ${posY}, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.16) 42%, rgba(255,255,255,0) 68%)`;

  return (
    <div className={cn("marble-surface relative h-full w-full overflow-hidden", className)}>
      {!prefersReducedMotion && (
        <motion.div aria-hidden className="absolute inset-0 mix-blend-soft-light" style={{ background }} />
      )}
    </div>
  );
}
