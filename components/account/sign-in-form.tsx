"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/app/account/actions";

export function SignInForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    setIsSubmitting(true);
    const result = await signIn({
      email: String(data.get("email")),
      password: String(data.get("password")),
    });
    setIsSubmitting(false);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    router.push("/account");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link href="/account/forgot-password" className="text-xs text-stone-500 hover:text-ink-950">
            Forgot password?
          </Link>
        </div>
        <Input id="password" name="password" type="password" required autoComplete="current-password" />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing In…" : "Sign In"}
      </Button>
      <p className="text-center text-sm text-stone-600">
        New to Mavrikios?{" "}
        <Link href="/account/sign-up" className="veil-underline font-medium text-ink-950">
          Create an account
        </Link>
      </p>
    </form>
  );
}
