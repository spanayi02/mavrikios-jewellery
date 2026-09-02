"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await subscribeToNewsletter(email);
    setIsSubmitting(false);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    setSubmitted(true);
    toast.success("You're on the list. Welcome to Mavrikios.");
  }

  if (submitted) {
    return (
      <p className={dark ? "text-sm text-marble-50/80" : "text-sm text-stone-600"}>
        Thank you — you will hear from us soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm gap-2">
      <Input
        type="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
        className={dark ? "border-marble-50/30 bg-transparent text-marble-50 placeholder:text-marble-50/50 focus-visible:border-marble-50" : ""}
      />
      <Button
        type="submit"
        variant={dark ? "inverse" : "default"}
        size="icon"
        aria-label="Subscribe"
        disabled={isSubmitting}
      >
        <ArrowRight className="size-4" />
      </Button>
    </form>
  );
}
