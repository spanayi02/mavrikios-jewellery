"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestPasswordReset } from "@/app/account/actions";

export function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    setIsSubmitting(true);
    const result = await requestPasswordReset(String(data.get("email")));
    setIsSubmitting(false);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <CheckCircle2 className="size-9 text-ink-950" />
        <p className="font-serif text-2xl italic text-ink-950">Check your inbox</p>
        <p className="max-w-sm text-sm leading-relaxed text-stone-600">
          If an account exists for that email, we&rsquo;ve sent a link to reset your password.
        </p>
        <Link href="/account/sign-in" className="veil-underline text-sm font-medium text-ink-950">
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send Reset Link"}
      </Button>
      <p className="text-center text-sm text-stone-600">
        <Link href="/account/sign-in" className="veil-underline font-medium text-ink-950">
          Back to Sign In
        </Link>
      </p>
    </form>
  );
}
