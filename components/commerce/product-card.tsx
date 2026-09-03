"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductMedia } from "@/components/site/product-media";
import { WishlistButton } from "@/components/commerce/wishlist-button";
import { QuickAddButton } from "@/components/commerce/quick-add-button";
import { categoryLabels } from "@/lib/product-labels";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useQuickViewStore } from "@/lib/store/quick-view-store";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  className?: string;
}

export function ProductCard({ product, priority, className }: ProductCardProps) {
  const [primary, secondary] = product.images;
  // Only crossfade to a second photo on hover when one is actually photographed — swapping a
  // real photo for the generic placeholder art (e.g. a product with just one photo so far)
  // reads as the image breaking, not a nice alternate angle.
  const hasSecondaryPhoto = Boolean(secondary?.src);
  const openQuickView = useQuickViewStore((s) => s.open);

  function handleQuickView(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  }

  return (
    <div className={cn("group relative flex flex-col", className)}>
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-stone-100">
        <div
          className={cn(
            "absolute inset-0 overflow-hidden",
            hasSecondaryPhoto && "transition-opacity duration-500 ease-out group-hover:opacity-0"
          )}
        >
          <ProductMedia
            image={primary}
            priority={priority}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className={!hasSecondaryPhoto ? "transition-transform duration-700 ease-out group-hover:scale-105" : undefined}
          />
        </div>
        {hasSecondaryPhoto && (
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
            <ProductMedia image={secondary} sizes="(min-width: 1024px) 25vw, 50vw" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <div className="flex flex-wrap gap-1.5">
            {product.isNew && <Badge>New</Badge>}
            {product.limited && <Badge variant="champagne">Limited</Badge>}
            {product.bestSeller && <Badge variant="outline" className="bg-marble-50/80">Best Seller</Badge>}
          </div>
          <span className="pointer-events-auto">
            <WishlistButton product={product} />
          </span>
        </div>

        <div className="absolute bottom-3 right-3 flex flex-col items-end gap-2 opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100">
          <button
            type="button"
            onClick={handleQuickView}
            aria-label={`Quick view ${product.name}`}
            className="flex size-9 items-center justify-center rounded-full bg-marble-50/90 text-ink-950 shadow-sm backdrop-blur-sm transition-transform hover:scale-105 active:scale-95"
          >
            <Eye className="size-4" />
          </button>
          <QuickAddButton product={product} />
        </div>
      </Link>

      <Link href={`/products/${product.slug}`} className="mt-4 flex flex-col gap-1">
        <span className="text-[11px] uppercase tracking-[0.14em] text-stone-500">
          {categoryLabels[product.category]}
        </span>
        <span className="font-serif text-[17px] leading-snug text-ink-950">{product.name}</span>
        <span className="flex items-center gap-2 text-sm text-ink-950">
          {formatPrice(product.price)}
          {product.compareAtPrice && (
            <span className="text-stone-400 line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
          {product.availability === "made-to-order" && (
            <span className="text-xs text-stone-500">&middot; Made to order</span>
          )}
        </span>
      </Link>
    </div>
  );
}
