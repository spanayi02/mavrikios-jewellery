"use client";

import { useSyncExternalStore } from "react";
import { getStoreStatus, type StoreStatus } from "@/lib/store-hours";
import { cn } from "@/lib/utils";

let cachedStatus: StoreStatus | null = null;

function subscribe(callback: () => void) {
  cachedStatus = getStoreStatus();
  const id = setInterval(() => {
    cachedStatus = getStoreStatus();
    callback();
  }, 60_000);
  return () => clearInterval(id);
}

function getSnapshot() {
  return cachedStatus ?? (cachedStatus = getStoreStatus());
}

function getServerSnapshot() {
  return null;
}

export function StoreStatusBadge({ className }: { className?: string }) {
  const status = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!status) return null;

  return (
    <span className={cn("inline-flex items-center gap-2 text-sm", className)}>
      <span
        className={cn("size-1.5 rounded-full", status.isOpen ? "bg-emerald-600" : "bg-stone-400")}
        aria-hidden
      />
      <span>{status.label}</span>
    </span>
  );
}
