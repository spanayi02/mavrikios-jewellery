"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/types/product";

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: Product["images"][number];
  variantId?: string;
  variantLabel?: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  lastAdded?: string;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (product: Product, options?: { variantId?: string; variantLabel?: string; quantity?: number }) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, delta: number, variantId?: string) => void;
  clear: () => void;
}

function lineKey(productId: string, variantId?: string) {
  return `${productId}::${variantId ?? "default"}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      lastAdded: undefined,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      addItem: (product, options) => {
        const variantId = options?.variantId;
        const quantity = options?.quantity ?? 1;
        const key = lineKey(product.id, variantId);
        set((state) => {
          const existing = state.lines.find((l) => lineKey(l.productId, l.variantId) === key);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                lineKey(l.productId, l.variantId) === key
                  ? { ...l, quantity: l.quantity + quantity }
                  : l
              ),
              lastAdded: product.id,
            };
          }
          return {
            lines: [
              ...state.lines,
              {
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price + (product.variants?.find((v) => v.id === variantId)?.priceDelta ?? 0),
                image: product.images[0],
                variantId,
                variantLabel: options?.variantLabel,
                quantity,
              },
            ],
            lastAdded: product.id,
          };
        });
        get().open();
      },
      removeItem: (productId, variantId) =>
        set((state) => ({
          lines: state.lines.filter((l) => lineKey(l.productId, l.variantId) !== lineKey(productId, variantId)),
        })),
      updateQuantity: (productId, delta, variantId) =>
        set((state) => ({
          lines: state.lines
            .map((l) =>
              lineKey(l.productId, l.variantId) === lineKey(productId, variantId)
                ? { ...l, quantity: l.quantity + delta }
                : l
            )
            .filter((l) => l.quantity > 0),
        })),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "mavrikios-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ lines: state.lines }),
    }
  )
);

export function useCartTotals() {
  const lines = useCartStore((s) => s.lines);
  const totalItems = lines.reduce((sum, l) => sum + l.quantity, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  return { totalItems, subtotal };
}
