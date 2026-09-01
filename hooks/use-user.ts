"use client";

import { useSyncExternalStore } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

let currentUser: User | null = null;
let initialized = false;
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function ensureInitialized() {
  if (initialized) return;
  initialized = true;
  const supabase = createClient();
  supabase.auth.getUser().then(({ data }) => {
    currentUser = data.user;
    notify();
  });
  supabase.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user ?? null;
    notify();
  });
}

function subscribe(callback: () => void) {
  ensureInitialized();
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return currentUser;
}

function getServerSnapshot() {
  return null;
}

/** Current signed-in user, kept in sync with Supabase auth state — no effect/setState. */
export function useUser() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
