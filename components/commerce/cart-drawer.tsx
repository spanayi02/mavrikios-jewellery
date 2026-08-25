"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { Minus, Plus, ShoppingBag, Truck, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ProductMedia } from "@/components/site/product-media";
import { useCartStore, useCartTotals } from "@/lib/store/cart-store";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const lines = useCartStore((s) => s.lines);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const { totalItems, subtotal } = useCartTotals();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-sans text-[13px] font-medium uppercase tracking-[0.14em]">
            <ShoppingBag className="size-4" />
            Your Bag {totalItems > 0 && `(${totalItems})`}
          </SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-serif text-xl text-ink-950">Your bag is empty</p>
            <p className="max-w-[22ch] text-sm text-stone-600">
              Pieces you add will appear here, ready whenever you are.
            </p>
            <Button onClick={close} asChild className="mt-2">
              <Link href="/shop">Shop the Collection</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-2">
              <AnimatePresence initial={false} mode="popLayout">
                {lines.map((line) => (
                  <motion.div
                    key={`${line.productId}-${line.variantId ?? "default"}`}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="flex gap-4 border-b border-stone-100 py-5"
                  >
                    <Link
                      href={`/products/${line.slug}`}
                      onClick={close}
                      className="relative size-20 shrink-0 overflow-hidden bg-stone-100"
                    >
                      <ProductMedia image={line.image} sizes="80px" />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={`/products/${line.slug}`}
                            onClick={close}
                            className="text-sm font-medium text-ink-950 veil-underline"
                          >
                            {line.name}
                          </Link>
                          {line.variantLabel && (
                            <p className="mt-0.5 text-xs text-stone-500">{line.variantLabel}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(line.productId, line.variantId)}
                          aria-label={`Remove ${line.name}`}
                          className="rounded-sm p-1 text-stone-400 transition-colors hover:text-ink-950"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center gap-3 border border-stone-200">
                          <button
                            onClick={() => updateQuantity(line.productId, -1, line.variantId)}
                            aria-label="Decrease quantity"
                            className="flex size-7 items-center justify-center text-ink-950 hover:bg-stone-100"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="min-w-4 text-center text-xs">{line.quantity}</span>
                          <button
                            onClick={() => updateQuantity(line.productId, 1, line.variantId)}
                            aria-label="Increase quantity"
                            className="flex size-7 items-center justify-center text-ink-950 hover:bg-stone-100"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <span className="text-sm text-ink-950">
                          <NumberFlow value={line.price * line.quantity} format={{ style: "currency", currency: "EUR", trailingZeroDisplay: "stripIfInteger" }} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="border-t border-stone-200 px-6 py-5">
              <p className="mb-4 flex items-center gap-2 text-xs text-stone-600">
                <Truck className="size-3.5" /> Free delivery across Cyprus
              </p>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium uppercase tracking-[0.08em] text-ink-950">
                  Subtotal
                </span>
                <span className="font-serif text-lg text-ink-950">
                  <NumberFlow value={subtotal} format={{ style: "currency", currency: "EUR", trailingZeroDisplay: "stripIfInteger" }} />
                </span>
              </div>
              <Button asChild size="lg" className="w-full" onClick={close}>
                <Link href="/checkout">Checkout</Link>
              </Button>
              <Button asChild variant="link" className="mt-2 w-full justify-center" onClick={close}>
                <Link href="/cart">View Bag</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
