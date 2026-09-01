"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/app/account/actions";

export function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const email = String(data.get("email"));
    setIsSubmitting(true);
    const result = await signUp({
      fullName: String(data.get("fullName")),
      email,
      password: String(data.get("password")),
    });
    setIsSubmitting(false);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    setSubmittedEmail(email);
  }

  if (submittedEmail) {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <CheckCircle2 className="size-9 text-ink-950" />
        <p className="font-serif text-2xl italic text-ink-950">Check your inbox</p>
        <p className="max-w-sm text-sm leading-relaxed text-stone-600">
          We&rsquo;ve sent a confirmation link to <span className="font-medium text-ink-950">{submittedEmail}</span>.
          Confirm your email to finish creating your account.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" name="fullName" required autoComplete="name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" />
        <p className="text-xs text-stone-500">At least 8 characters.</p>
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating Account…" : "Create Account"}
      </Button>
      <p className="text-center text-sm text-stone-600">
        Already have an account?{" "}
        <Link href="/account/sign-in" className="veil-underline font-medium text-ink-950">
          Sign in
        </Link>
      </p>
    </form>
  );
}
