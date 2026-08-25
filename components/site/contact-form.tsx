"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const reasons = [
  { value: "product", label: "Product Enquiry" },
  { value: "engagement", label: "Engagement" },
  { value: "bespoke", label: "Bespoke Jewellery" },
  { value: "repair", label: "Repair" },
  { value: "resizing", label: "Ring Resizing" },
  { value: "engraving", label: "Engraving" },
  { value: "other", label: "Other" },
];

export function ContactForm({ initialReason }: { initialReason?: string }) {
  const [reason, setReason] = useState(
    reasons.some((r) => r.value === initialReason) ? initialReason! : "product"
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value.trim();

    if (!name || !email.includes("@") || !message) {
      toast.error("Please fill in your name, a valid email and a short message.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 500);
  }

  if (submitted) {
    return (
      <div className="border border-stone-200 bg-marble-100 p-8 text-center">
        <p className="font-serif text-xl italic text-ink-950">Thank you</p>
        <p className="mt-2 text-sm text-stone-600">
          We&rsquo;ve received your message and will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reason">Reason</Label>
          <Select value={reason} onValueChange={setReason} name="reason">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {reasons.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full border border-stone-300 bg-transparent px-3.5 py-2.5 text-sm text-ink-950 outline-none placeholder:text-stone-500 focus-visible:border-ink-950 focus-visible:ring-1 focus-visible:ring-ink-950"
          placeholder="Tell us a little about what you're looking for…"
        />
      </div>

      <Button type="submit" size="lg" disabled={submitting} className="gap-2">
        <Send className="size-4" /> {submitting ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
