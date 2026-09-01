"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/account/actions";

export function SignOutButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignOut() {
    setIsSubmitting(true);
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <Button variant="outline" onClick={handleSignOut} disabled={isSubmitting}>
      {isSubmitting ? "Signing Out…" : "Sign Out"}
    </Button>
  );
}
