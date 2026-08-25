"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface WishlistButtonProps {
  product: Pick<Product, "id" | "name">;
  className?: string;
  variant?: "floating" | "inline";
}

export function WishlistButton({ product, className, variant = "floating" }: WishlistButtonProps) {
  const isSaved = useWishlistStore((s) => s.has(product.id));
  const toggle = useWishlistStore((s) => s.toggle);
  const [pop, setPop] = useState(false);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    setPop(true);
    setTimeout(() => setPop(false), 260);
    if (!isSaved) toast(`Added ${product.name} to your wishlist`);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isSaved}
      aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      className={cn(
        variant === "floating" &&
          "flex size-9 items-center justify-center rounded-full bg-marble-50/90 text-ink-950 shadow-sm backdrop-blur-sm transition-colors hover:bg-marble-50",
        variant === "inline" && "flex items-center gap-2 text-sm text-ink-950",
        className
      )}
    >
      <motion.span animate={pop ? { scale: [1, 1.35, 1] } : {}} transition={{ duration: 0.26 }}>
        <Heart
          className={cn("size-4 transition-colors", isSaved ? "fill-ink-950 text-ink-950" : "text-ink-950")}
        />
      </motion.span>
      {variant === "inline" && (isSaved ? "Saved" : "Add to Wishlist")}
    </button>
  );
}
