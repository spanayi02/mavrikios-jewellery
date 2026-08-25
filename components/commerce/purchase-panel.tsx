"use client";

import { useState } from "react";
import { Minus, Plus, Truck, Banknote, ShieldCheck, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { WishlistButton } from "@/components/commerce/wishlist-button";
import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/format";
import { materialLabels, stoneLabels } from "@/lib/product-labels";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface PurchasePanelProps {
  product: Product;
}

export function PurchasePanel({ product }: PurchasePanelProps) {
  const [variantId, setVariantId] = useState(product.variants?.find((v) => v.available)?.id);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  const selectedVariant = product.variants?.find((v) => v.id === variantId);
  const requiresVariant = Boolean(product.variants?.length);
  const canAdd = !requiresVariant || Boolean(selectedVariant?.available);

  function handleAddToBag() {
    if (requiresVariant && !variantId) {
      toast.error(`Please select a ${product.variantLabel?.toLowerCase() ?? "variant"}`);
      return;
    }
    addItem(product, {
      variantId,
      variantLabel: selectedVariant ? `${product.variantLabel}: ${selectedVariant.label}` : undefined,
      quantity,
    });
    toast.success(`${product.name} added to your bag`);
  }

  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">
        {materialLabels[product.material]}
        {product.stone !== "none" && ` · ${stoneLabels[product.stone]}`}
      </p>
      <h1 className="mt-2 font-serif text-3xl italic text-ink-950 sm:text-4xl">{product.name}</h1>
      <p className="mt-3 text-xl text-ink-950">{formatPrice(product.price)}</p>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone-600">
        {product.shortDescription}
      </p>

      {product.variants && product.variants.length > 0 && (
        <div className="mt-8">
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone-500">
            {product.variantLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                disabled={!variant.available}
                onClick={() => setVariantId(variant.id)}
                className={cn(
                  "flex h-11 min-w-11 items-center justify-center border px-3 text-sm transition-colors",
                  variant.id === variantId
                    ? "border-ink-950 bg-ink-950 text-marble-50"
                    : "border-stone-300 text-ink-950 hover:border-ink-950",
                  !variant.available && "cursor-not-allowed border-stone-200 text-stone-300 line-through hover:border-stone-200"
                )}
              >
                {variant.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex items-stretch gap-3">
        <div className="flex items-center border border-stone-300">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="flex h-12 w-11 items-center justify-center text-ink-950 hover:bg-stone-100"
          >
            <Minus className="size-3.5" />
          </button>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="flex h-12 w-11 items-center justify-center text-ink-950 hover:bg-stone-100"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
        <Button size="lg" className="min-w-0 flex-1" disabled={!canAdd} onClick={handleAddToBag}>
          Add to Bag
        </Button>
      </div>
      {product.availability === "made-to-order" && (
        <p className="mt-2 text-xs text-stone-500">Made to order in our workshop.</p>
      )}

      <WishlistButton product={product} variant="inline" className="mt-5" />

      <dl className="mt-10 space-y-3 border-t border-stone-200 pt-6 text-sm text-stone-600">
        <div className="flex items-center gap-3">
          <Truck className="size-4 shrink-0 text-ink-950" />
          <dt className="sr-only">Delivery</dt>
          <dd>Free delivery across Cyprus</dd>
        </div>
        <div className="flex items-center gap-3">
          <Banknote className="size-4 shrink-0 text-ink-950" />
          <dt className="sr-only">Payment</dt>
          <dd>Cash on Delivery and QuickPay available</dd>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck className="size-4 shrink-0 text-ink-950" />
          <dt className="sr-only">Made</dt>
          <dd>
            {product.availability === "made-to-order" ? "Made to order in our workshop" : "In stock, ready to ship"}
          </dd>
        </div>
        <div className="flex items-center gap-3">
          <Users className="size-4 shrink-0 text-ink-950" />
          <dt className="sr-only">Assistance</dt>
          <dd>In-store assistance available in Latsia</dd>
        </div>
      </dl>
    </div>
  );
}
