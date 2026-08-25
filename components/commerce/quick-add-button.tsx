"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCartStore } from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface QuickAddButtonProps {
  product: Product;
  className?: string;
}

export function QuickAddButton({ product, className }: QuickAddButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const hasVariants = Boolean(product.variants?.length);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (hasVariants) {
      toast(`Choose a size for ${product.name} on the product page`);
      router.push(`/products/${product.slug}`);
      return;
    }
    addItem(product);
    toast.success(`${product.name} added to your bag`);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Quick add ${product.name} to bag`}
      className={cn(
        "flex size-9 items-center justify-center rounded-full bg-ink-950 text-marble-50 shadow-sm transition-transform hover:scale-105 active:scale-95",
        className
      )}
    >
      <Plus className="size-4" />
    </button>
  );
}
