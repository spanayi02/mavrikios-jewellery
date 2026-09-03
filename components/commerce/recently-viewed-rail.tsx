"use client";

import { useRecentlyViewedStore } from "@/lib/store/recently-viewed-store";
import { ProductCard } from "@/components/commerce/product-card";
import { Reveal, RevealItem } from "@/components/site/reveal";
import type { Product } from "@/types/product";

interface RecentlyViewedRailProps {
  allProducts: Product[];
  excludeId?: string;
}

export function RecentlyViewedRail({ allProducts, excludeId }: RecentlyViewedRailProps) {
  const ids = useRecentlyViewedStore((s) => s.ids);
  const products = ids
    .filter((id) => id !== excludeId)
    .map((id) => allProducts.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section className="border-t border-stone-200 bg-marble-100 py-20 sm:py-28">
      <div className="container-mavrikios">
        <Reveal>
          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-stone-500">Recently Viewed</p>
          <h2 className="mb-10 font-serif text-3xl italic text-ink-950 sm:mb-14 sm:text-4xl">
            Pieces You&rsquo;ve Looked At
          </h2>
        </Reveal>
        <Reveal stagger={0.08} className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {products.map((product) => (
            <RevealItem key={product.id}>
              <ProductCard product={product} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
