"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-mavrikios flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-champagne-600">
        Something Went Wrong
      </p>
      <h1 className="max-w-md font-serif text-3xl italic text-ink-950 sm:text-4xl">
        We&rsquo;re sorry — that didn&rsquo;t work as expected.
      </h1>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-stone-600">
        Please try again, or head back to the homepage. If the problem continues, feel free to
        contact us directly.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button size="lg" onClick={reset}>
          Try Again
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
