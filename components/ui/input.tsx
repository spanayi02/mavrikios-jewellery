import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full rounded-sm border border-stone-300 bg-transparent px-3.5 py-2 text-sm text-ink-950 placeholder:text-stone-500 transition-colors outline-none",
        "focus-visible:border-ink-950 focus-visible:ring-1 focus-visible:ring-ink-950",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
