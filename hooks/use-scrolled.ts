"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getServerSnapshot() {
  return false;
}

/** Tracks whether the page has scrolled past `threshold`, without effect/setState. */
export function useScrolledPast(threshold: number) {
  return useSyncExternalStore(subscribe, () => window.scrollY > threshold, getServerSnapshot);
}
