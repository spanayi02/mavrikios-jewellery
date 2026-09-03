"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/commerce/product-card";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import type { Product } from "@/types/product";

export function WishlistClient({ products }: { products: Product[] }) {
  const ids = useWishlistStore((s) => s.ids);
  const saved = products.filter((p) => ids.includes(p.id));

  return (
    <div className="container-mavrikios py-16 sm:py-24">
      <div className="mb-10">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-stone-500">Wishlist</p>
        <h1 className="font-serif text-4xl italic text-ink-950 sm:text-5xl">
          Your Wishlist {saved.length > 0 && `(${saved.length})`}
        </h1>
      </div>

      {saved.length === 0 ? (
        <div className="flex flex-col items-center gap-4 border border-stone-200 py-24 text-center">
          <Heart className="size-8 text-stone-300" />
          <p className="font-serif text-xl text-ink-950">Nothing saved yet</p>
          <p className="max-w-xs text-sm text-stone-600">
            Tap the heart on any piece to save it here for later.
          </p>
          <Button asChild className="mt-2">
            <Link href="/shop">Shop the Collection</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {saved.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
