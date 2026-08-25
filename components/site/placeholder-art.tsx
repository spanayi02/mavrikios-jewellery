import { cn } from "@/lib/utils";
import type { PlaceholderMotif } from "@/types/product";

const motifPaths: Record<PlaceholderMotif, React.ReactNode> = {
  ring: (
    <>
      <circle cx="100" cy="118" r="46" />
      <path d="M100 72 L84 50 L116 50 Z" />
      <path d="M88 54 L100 40 L112 54" />
    </>
  ),
  earring: (
    <>
      <circle cx="100" cy="58" r="10" />
      <path d="M100 68 L100 92" />
      <path d="M78 92 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0" />
    </>
  ),
  necklace: (
    <>
      <path d="M40 40 C40 110 160 110 160 40" />
      <path d="M100 108 L100 128 L88 148 L112 148 Z" />
    </>
  ),
  bracelet: (
    <>
      <ellipse cx="100" cy="100" rx="70" ry="34" />
      <ellipse cx="100" cy="100" rx="52" ry="20" />
    </>
  ),
  gift: (
    <>
      <rect x="52" y="86" width="96" height="72" />
      <path d="M52 112 L148 112" />
      <path d="M100 86 L100 158" />
      <path d="M100 86 C82 86 78 62 100 62 C122 62 118 86 100 86 Z" />
    </>
  ),
  monopetra: (
    <>
      <circle cx="100" cy="102" r="50" />
      <path d="M100 52 L80 24 L120 24 Z" />
      <path d="M86 30 L100 14 L114 30" />
      <circle cx="100" cy="102" r="10" />
    </>
  ),
};

interface PlaceholderArtProps {
  motif: PlaceholderMotif;
  tone?: "marble" | "ink";
  className?: string;
  label?: string;
}

/**
 * Fine-line procedural placeholder used wherever real product photography
 * has not yet been supplied. Swap the `src` on a ProductImage to replace it.
 */
export function PlaceholderArt({ motif, tone = "marble", className, label }: PlaceholderArtProps) {
  const isInk = tone === "ink";
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        isInk ? "marble-surface-dark" : "marble-surface",
        className
      )}
    >
      <svg
        viewBox="0 0 200 200"
        className={cn(
          "h-[42%] w-[42%] shrink-0",
          isInk ? "stroke-champagne-300/70" : "stroke-ink-950/25"
        )}
        fill="none"
        strokeWidth={1.1}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {motifPaths[motif]}
      </svg>
      {label && (
        <span
          className={cn(
            "absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.25em]",
            isInk ? "text-marble-50/40" : "text-ink-950/30"
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
