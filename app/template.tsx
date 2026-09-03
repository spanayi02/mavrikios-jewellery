"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Re-mounts on every navigation (unlike layout.tsx), so this is where a route's entrance
 * lives. A short fade+rise softens the hard cut between pages without a heavier
 * cross-fade/exit choreography, which the App Router doesn't support natively yet.
 */
export default function RootTemplate({ children }: { children: React.ReactNode }) {
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
