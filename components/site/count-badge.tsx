"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * The small count on the bag and wishlist icons.
 *
 * This is the only persistent confirmation that adding something worked, and it used to both
 * appear and change value instantly: the badge popped into existence on the first add, and
 * every add after that swapped one digit for another with nothing in between. Neither read as
 * a response to the click.
 *
 * Both counts come from a localStorage-backed store, so they are always zero in the server
 * markup and the badge is genuinely absent until the store rehydrates. Animating its entry is
 * therefore free of the "hidden until JS" problem the rest of the site avoids: there is no
 * server-rendered content being hidden here, only a client-only element arriving.
 */
export function CountBadge({ count, className }: { count: number; className?: string }) {
  const [pulse, setPulse] = useState(false);
  const previous = useRef(count);

  useEffect(() => {
    if (count === previous.current) return;
    // Only pulse on a real change, and never on the jump from nothing, which is already
    // covered by the entry animation below.
    const wasVisible = previous.current > 0;
    previous.current = count;
    if (!wasVisible || count === 0) return;
    setPulse(true);
    const id = window.setTimeout(() => setPulse(false), 240);
    return () => window.clearTimeout(id);
  }, [count]);

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: pulse ? [1, 1.18, 1] : 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: pulse ? 0.24 : 0.18, ease: [0.16, 1, 0.3, 1] }}
          className={className}
        >
          {count}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
