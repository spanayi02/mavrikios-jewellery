"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Re-mounts on every navigation (unlike layout.tsx), so this is where a route's entrance
 * lives for in-app route changes. A short fade+rise softens the hard cut between pages
 * without a heavier cross-fade/exit choreography, which the App Router doesn't support
 * natively yet.
 *
 * The very first paint of a browser session (server-rendered HTML, or a hard refresh)
 * skips this fade entirely. That markup already carries its own nested entrance
 * animations (Hero's staggered copy, Reveal's scroll-triggered sections), so stacking a
 * whole-page opacity/y fade on top of them was the actual mechanism behind reports of
 * "everything flashes before it settles" on mobile: slower hydration there made the two
 * layered animations (outer page fade + inner element fades, both starting from the same
 * hidden SSR markup) visibly separate instead of reading as one smooth entrance. Module
 * scope, not just component state, on purpose: it needs to persist across the remounts
 * this component gets on every client-side navigation within the same tab, and reset on
 * an actual reload — a plain module variable does both for free, and the server/client
 * bundles never share this module instance so it can't leak between visitors. It's only
 * flipped from an effect (never during render, which must stay pure) — a tick's delay
 * before it's `true` is harmless here, since the next thing that reads it is the next
 * navigation's mount, well after this one's effect has run.
 */
let hasEnteredThisSession = false;

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  const [isFirstPaint] = useState(() => typeof window === "undefined" || !hasEnteredThisSession);

  useEffect(() => {
    hasEnteredThisSession = true;
  }, []);

  if (isFirstPaint) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      {children}
    </motion.div>
  );
}
