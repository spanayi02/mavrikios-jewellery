"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductMedia } from "@/components/site/product-media";
import { WishlistButton } from "@/components/commerce/wishlist-button";
import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/format";
import { categoryLabels, materialLabels, stoneLabels } from "@/lib/product-labels";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface QuickViewDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickViewDialog({ product, open, onOpenChange }: QuickViewDialogProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [variantId, setVariantId] = useState<string | undefined>(undefined);
  const addItem = useCartStore((s) => s.addItem);

  if (!product) return null;

  const selectedVariant = product.variants?.find((v) => v.id === variantId);
  const requiresVariant = Boolean(product.variants?.length);

  function handleAddToBag() {
    if (!product) return;
    if (requiresVariant && !variantId) {
      toast.error(`Please select a ${product.variantLabel?.toLowerCase() ?? "variant"}`);
      return;
    }
    addItem(product, {
      variantId,
      variantLabel: selectedVariant ? `${product.variantLabel}: ${selectedVariant.label}` : undefined,
    });
    toast.success(`${product.name} added to your bag`);
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) {
          setActiveImage(0);
          setVariantId(undefined);
        }
      }}
    >
      <DialogContent className="grid w-[calc(100%-2rem)] max-w-3xl grid-cols-1 gap-0 overflow-hidden p-0 sm:grid-cols-2">
        <div className="relative aspect-square bg-stone-100 sm:aspect-auto">
          <ProductMedia image={product.images[activeImage]} sizes="(min-width: 640px) 50vw, 100vw" />
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={cn("size-1.5 rounded-full transition-colors", i === activeImage ? "bg-ink-950" : "bg-ink-950/25")}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">
            {categoryLabels[product.category]}
          </p>
          <h2 className="mt-2 font-serif text-2xl italic text-ink-950">{product.name}</h2>
          <p className="mt-2 text-lg text-ink-950">{formatPrice(product.price)}</p>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">{product.shortDescription}</p>
          <p className="mt-3 text-xs text-stone-500">
            {materialLabels[product.material]}
            {product.stone !== "none" && ` · ${stoneLabels[product.stone]}`}
          </p>

          {product.variants && product.variants.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-stone-500">
                {product.variantLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    disabled={!variant.available}
                    onClick={() => setVariantId(variant.id)}
                    className={cn(
                      "flex h-9 min-w-9 items-center justify-center border px-2.5 text-xs transition-colors",
                      variant.id === variantId
                        ? "border-ink-950 bg-ink-950 text-marble-50"
                        : "border-stone-300 text-ink-950 hover:border-ink-950",
                      !variant.available && "cursor-not-allowed border-stone-200 text-stone-300 line-through"
                    )}
                  >
                    {variant.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto flex flex-col gap-3 pt-6">
            <Button size="lg" onClick={handleAddToBag}>
              Add to Bag
            </Button>
            <div className="flex items-center justify-between">
              <WishlistButton product={product} variant="inline" />
              <Link
                href={`/products/${product.slug}`}
                onClick={() => onOpenChange(false)}
                className="veil-underline text-xs uppercase tracking-[0.1em] text-stone-500"
              >
                Full Details
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
