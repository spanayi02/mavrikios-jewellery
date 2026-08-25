"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance (px) the content travels in from, and direction. */
  y?: number;
  /** Stagger children of this element (use with <RevealItem> children). */
  stagger?: number;
  as?: "div" | "section" | "ol" | "ul";
  once?: boolean;
}

/** Fades + slides content up into view once, the first time it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  stagger,
  as = "div",
  once = true,
}: RevealProps) {
  const variants: Variants = stagger
    ? {
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }
    : {
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease } },
      };

  const Comp = motion[as];

  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2, margin: "0px 0px -80px 0px" }}
      variants={variants}
      className={className}
    >
      {children}
    </Comp>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/** Child of a staggered <Reveal>; animates in as part of the parent's stagger sequence. */
export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Comp = motion[as];
  return (
    <Comp variants={itemVariants} className={className}>
      {children}
    </Comp>
  );
}
