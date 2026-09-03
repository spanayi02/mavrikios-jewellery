"use client";

import { useEffect } from "react";
import "./globals.css";

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
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-champagne-600">
            Something Went Wrong
          </p>
          <h1 className="max-w-md font-serif text-3xl italic text-ink-950 sm:text-4xl">
            We&rsquo;re sorry — the boutique hit a snag.
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-stone-600">
            Please try again in a moment. If the problem continues, feel free to contact us
            directly.
          </p>
          <button
            onClick={reset}
            className="mt-8 inline-flex h-11 items-center justify-center rounded-sm bg-ink-950 px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-marble-50 transition-colors hover:bg-ink-800"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
