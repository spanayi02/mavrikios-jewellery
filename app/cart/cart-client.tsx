"use client";

import Link from "next/link";
import NumberFlow from "@number-flow/react";
import { Minus, Plus, ShoppingBag, Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductMedia } from "@/components/site/product-media";
import { useCartStore, useCartTotals } from "@/lib/store/cart-store";

export function CartClient() {
  const lines = useCartStore((s) => s.lines);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const { totalItems, subtotal } = useCartTotals();

  return (
    <div className="container-mavrikios py-16 sm:py-24">
      <div className="mb-10">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-stone-500">Your Bag</p>
        <h1 className="font-serif text-4xl italic text-ink-950 sm:text-5xl">
          Bag {totalItems > 0 && `(${totalItems})`}
        </h1>
      </div>

      {lines.length === 0 ? (
        <div className="flex flex-col items-center gap-4 border border-stone-200 py-24 text-center">
          <ShoppingBag className="size-8 text-stone-300" />
          <p className="font-serif text-xl text-ink-950">Your bag is empty</p>
          <Button asChild className="mt-2">
            <Link href="/shop">Shop the Collection</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="divide-y divide-stone-200 border-y border-stone-200 lg:col-span-8">
            {lines.map((line) => (
              <div key={`${line.productId}-${line.variantId ?? "default"}`} className="flex gap-5 py-6">
                <Link href={`/products/${line.slug}`} className="relative size-28 shrink-0 overflow-hidden bg-stone-100 sm:size-32">
                  <ProductMedia image={line.image} sizes="128px" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link href={`/products/${line.slug}`} className="font-serif text-lg text-ink-950 veil-underline">
                        {line.name}
                      </Link>
                      {line.variantLabel && <p className="mt-1 text-sm text-stone-500">{line.variantLabel}</p>}
                    </div>
                    <button
                      onClick={() => removeItem(line.productId, line.variantId)}
                      aria-label={`Remove ${line.name}`}
                      className="rounded-sm p-1 text-stone-400 hover:text-ink-950"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-3 border border-stone-200">
                      <button
                        onClick={() => updateQuantity(line.productId, -1, line.variantId)}
                        aria-label="Decrease quantity"
                        className="flex size-9 items-center justify-center transition-[background-color,transform] duration-150 ease-out hover:bg-stone-100 active:scale-90"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="min-w-4 text-center text-sm">{line.quantity}</span>
                      <button
                        onClick={() => updateQuantity(line.productId, 1, line.variantId)}
                        aria-label="Increase quantity"
                        className="flex size-9 items-center justify-center transition-[background-color,transform] duration-150 ease-out hover:bg-stone-100 active:scale-90"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <span className="text-base text-ink-950">
                      <NumberFlow value={line.price * line.quantity} format={{ style: "currency", currency: "EUR", trailingZeroDisplay: "stripIfInteger" }} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28 border border-stone-200 p-6">
              <p className="mb-4 flex items-center gap-2 text-xs text-stone-600">
                <Truck className="size-3.5" /> Free delivery across Cyprus
              </p>
              <div className="flex items-center justify-between border-t border-stone-200 pt-4">
                <span className="text-sm font-medium uppercase tracking-[0.08em] text-ink-950">Subtotal</span>
                <span className="font-serif text-xl text-ink-950">
                  <NumberFlow value={subtotal} format={{ style: "currency", currency: "EUR", trailingZeroDisplay: "stripIfInteger" }} />
                </span>
              </div>
              <p className="mt-2 text-xs text-stone-500">Taxes and any delivery details are confirmed at checkout.</p>
              <Button asChild size="lg" className="mt-6 w-full">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button asChild variant="link" className="mt-1 w-full justify-center">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
