"use server";

import { createClient } from "@/lib/supabase/server";

export type SubscribeResult = { ok: true } | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UNIQUE_VIOLATION = "23505";

export async function subscribeToNewsletter(email: string): Promise<SubscribeResult> {
  const trimmed = email.trim();
  if (!EMAIL_PATTERN.test(trimmed)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("newsletter_subscribers").insert({ email: trimmed });

  if (error && error.code !== UNIQUE_VIOLATION) {
    console.error("Failed to save newsletter subscriber", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  return { ok: true };
}
