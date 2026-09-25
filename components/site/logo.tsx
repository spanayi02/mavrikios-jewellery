import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

interface LogoProps {
  className?: string;
  tone?: "ink" | "marble";
  showTagline?: boolean;
}

export function Logo({ className, tone = "ink", showTagline = true }: LogoProps) {
  const color = tone === "ink" ? "text-ink-950" : "text-bone-50";
  return (
    <span className={cn("inline-flex flex-col leading-none select-none", color, className)}>
      <span className="font-serif text-[1.45rem] font-semibold tracking-[0.16em] sm:text-[1.65rem]">
        {siteConfig.name.toUpperCase()}
      </span>
      {showTagline && (
        <span
          className={cn(
            "mt-0.5 text-[9px] uppercase tracking-[0.32em]",
            tone === "ink" ? "text-stone-500" : "text-bone-50/60"
          )}
        >
          Jewellery Boutique &middot; Since {siteConfig.since}
        </span>
      )}
    </span>
  );
}
