"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { CartDrawer } from "@/components/commerce/cart-drawer";
import { SearchOverlay } from "@/components/commerce/search-overlay";
import { QuickViewDialog } from "@/components/commerce/quick-view-dialog";
import { useQuickViewStore } from "@/lib/store/quick-view-store";
import type { Product } from "@/types/product";

export function CartProvider({ children, products }: { children: ReactNode; products: Product[] }) {
  const product = useQuickViewStore((s) => s.product);
  const isOpen = useQuickViewStore((s) => s.isOpen);
  const close = useQuickViewStore((s) => s.close);

  return (
    <MotionConfig reducedMotion="user">
      {children}
      <CartDrawer />
      <SearchOverlay products={products} />
      <QuickViewDialog product={product} open={isOpen} onOpenChange={(open) => !open && close()} />
    </MotionConfig>
  );
}
