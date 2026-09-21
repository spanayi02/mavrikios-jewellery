"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
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
 * Here the server and the first client render are always the finished, visible state. A layout
 * effect then arms *only* the elements still below the fold — content the visitor cannot see
 * yet, so hiding it costs nothing — and those animate in on scroll exactly as before. Anything
 * already on screen at first paint simply stays put: no hidden state, nothing to wait for, so
 * there is no window in which it can flash. Same for reduced motion, which skips arming
 * entirely.
 */

// `useLayoutEffect` warns when React renders this on the server; the effect is client-only work
// either way, so fall back to `useEffect` there to keep the log clean.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function useScrollReveal(once: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen: leave it alone. Hiding it now, after the browser has painted it, is
    // precisely the flash this component is meant to avoid.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setShown(false);
          }
        }
      },
      // Threshold stays at 0 and the trigger line is pulled up with rootMargin instead: a
      // percentage threshold never fires for a section taller than the viewport, since that
      // share of it can't be on screen at once.
      { threshold: 0, rootMargin: "0px 0px -15% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [armed, once]);

  return { ref, armed, shown };
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
