"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

export function StickyAddToBag({ product }: { product: Product }) {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const hasVariants = Boolean(product.variants?.length);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      rootMargin: "-64px 0px 0px 0px",
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function handleClick() {
    if (hasVariants) {
      document.getElementById("purchase-panel")?.scrollIntoView({ behavior: "smooth", block: "center" });
      toast(`Choose a ${product.variantLabel?.toLowerCase() ?? "variant"} above`);
      return;
    }
    addItem(product);
    toast.success(`${product.name} added to your bag`);
  }

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="h-px" />
      <div
        className={`fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-stone-200 bg-marble-50/95 px-5 py-3 backdrop-blur-sm transition-transform duration-300 lg:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink-950">{product.name}</p>
          <p className="text-sm text-stone-600">{formatPrice(product.price)}</p>
        </div>
        <Button onClick={handleClick} className="shrink-0">
          Add to Bag
        </Button>
      </div>
    </>
  );
}
