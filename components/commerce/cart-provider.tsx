"use client";

import type { ReactNode } from "react";
import { CartDrawer } from "@/components/commerce/cart-drawer";
import { SearchOverlay } from "@/components/commerce/search-overlay";

export function CartProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <CartDrawer />
      <SearchOverlay />
    </>
  );
}
