"use server";

import { createClient } from "@/lib/supabase/server";

export type AuthResult = { ok: true } | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function signUp(input: { fullName: string; email: string; password: string }): Promise<AuthResult> {
  const fullName = input.fullName.trim();
  const email = input.email.trim();

  if (!fullName) return { ok: false, error: "Please enter your full name." };
  if (!EMAIL_PATTERN.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (input.password.length < 8) return { ok: false, error: "Password must be at least 8 characters." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password: input.password,
    options: { data: { full_name: fullName } },
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function signIn(input: { email: string; password: string }): Promise<AuthResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: input.email.trim(),
    password: input.password,
  });

  if (error) return { ok: false, error: "Incorrect email or password." };
  return { ok: true };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

export async function requestPasswordReset(email: string): Promise<AuthResult> {
  const trimmed = email.trim();
  if (!EMAIL_PATTERN.test(trimmed)) return { ok: false, error: "Please enter a valid email address." };

  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const { error } = await supabase.auth.resetPasswordForEmail(trimmed, {
    redirectTo: `${siteUrl}/account/update-password`,
  });

  // Always report success — never reveal whether an email address has an account.
  if (error) console.error("Failed to send password reset email", error);
  return { ok: true };
}

export async function updatePassword(newPassword: string): Promise<AuthResult> {
  if (newPassword.length < 8) return { ok: false, error: "Password must be at least 8 characters." };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
