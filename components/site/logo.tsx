import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  tone?: "ink" | "marble";
  showTagline?: boolean;
}

export function Logo({ className, tone = "ink", showTagline = true }: LogoProps) {
  const color = tone === "ink" ? "text-ink-950" : "text-marble-50";
  return (
    <span className={cn("inline-flex flex-col leading-none select-none", color, className)}>
      <span className="font-serif text-[1.35rem] font-medium tracking-[0.14em] sm:text-2xl">
        MAVRIKIOS
      </span>
      {showTagline && (
        <span
          className={cn(
            "mt-0.5 text-[9px] uppercase tracking-[0.32em]",
            tone === "ink" ? "text-stone-500" : "text-marble-50/60"
          )}
        >
          Jewellery Boutique &middot; Since 1967
        </span>
      )}
    </span>
  );
}
