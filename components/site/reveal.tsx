"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll reveals, driven by CSS classes + an IntersectionObserver rather than Framer Motion's
 * `whileInView`.
 *
 * The reason is the hidden state's lifetime, not the animation itself. Framer applies
 * `initial="hidden"` during SSR, so every revealed section shipped in the HTML at `opacity:0`
 * and stayed blank until the JS bundle had parsed, hydrated and wired up its observer. On a
 * desktop that gap is invisible; on a real phone it was long enough to see the whole page as
 * blank panels that snapped in afterwards, which is what kept getting reported as sections
 * "flashing" before settling.
 *
 * Here the server and the first client render are always the finished, visible state, and only
 * content the visitor cannot see yet is ever hidden. Two details matter:
 *
 * 1. The decision is made from the observer's own callback, not from a single measurement in a
 *    layout effect. A layout effect runs before images have contributed their height and before
 *    a phone's address bar has settled `innerHeight`, so sections that would end up far below
 *    the fold measured as on-screen and were skipped forever. The observer fires after layout,
 *    with real geometry.
 * 2. Reduced motion does not disable the reveal, it softens it (see globals.css, which drops the
 *    travel and scale and leaves a plain opacity fade). Switching it off entirely meant a phone
 *    with "Reduce Motion" on, which is a very common setting, got a completely static page.
 */
function useScrollReveal(once: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let decided = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!decided) {
            decided = true;
            // First pass uses true viewport geometry rather than the margin-adjusted report:
            // an element sitting in the bottom strip is really on screen, and hiding it now
            // would be the exact flash this component exists to prevent.
            const rect = el.getBoundingClientRect();
            const onScreen = rect.top < window.innerHeight && rect.bottom > 0;
            if (onScreen) {
              setState("shown");
              if (once) observer.disconnect();
            } else {
              setState("hidden");
            }
            continue;
          }
          if (entry.isIntersecting) {
            setState("shown");
            if (once) observer.disconnect();
          } else if (!once) {
            setState("hidden");
          }
        }
      },
      // Threshold stays at 0 and the trigger line is pulled up with rootMargin instead: a
      // percentage threshold never fires for a section taller than the viewport, since that
      // share of it can't be on screen at once.
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return { ref, armed: state !== "idle", shown: state === "shown" };
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance (px) the content travels in from. */
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
  const { ref, armed, shown } = useScrollReveal(once);
  const Comp = as as ElementType;

  return (
    <Comp
      ref={ref}
      className={cn(
        armed && (stagger ? "rv-group-armed" : "rv-armed"),
        shown && "rv-in",
        className
      )}
      style={
        {
          "--rv-y": `${y}px`,
          "--rv-delay": `${delay}s`,
          ...(stagger ? { "--rv-stagger": `${Math.round(stagger * 1000)}ms` } : {}),
        } as CSSProperties
      }
    >
      {children}
    </Comp>
  );
}

/**
 * Child of a staggered <Reveal>. It carries no animation state of its own — the parent's
 * `.rv-group-armed > *` rules drive it, so this stays a plain element and the stagger is a
 * handful of `nth-child` delays rather than per-item JS.
 */
export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Comp = as as ElementType;
  return <Comp className={className}>{children}</Comp>;
}
