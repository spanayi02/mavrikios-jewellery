import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MarqueeProps {
  items: ReactNode[];
  className?: string;
  itemClassName?: string;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
}

/** Infinite horizontal ticker — duplicates the item set so the loop is seamless. */
export function Marquee({ items, className, itemClassName, duration = 32, reverse = false }: MarqueeProps) {
  return (
    <div className={cn("group relative overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center [animation-play-state:running] group-hover:[animation-play-state:paused]",
          reverse ? "[animation-direction:reverse]" : ""
        )}
        style={{ animation: `marquee ${duration}s linear infinite` }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className={cn("shrink-0", itemClassName)}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
