"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ProductMedia } from "@/components/site/product-media";
import { formatPrice } from "@/lib/format";
import { categoryLabels } from "@/lib/product-labels";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ShopTheLookHotspotProps {
  product: Product;
  style: { top: string; left: string };
}

export function ShopTheLookHotspot({ product, style }: ShopTheLookHotspotProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          style={style}
          aria-label={`Shop ${product.name}`}
          className="group absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-marble-50/40 [animation-duration:2.5s] group-hover:hidden" />
          <span
            className={cn(
              "flex size-7 items-center justify-center rounded-full border border-marble-50/70 bg-ink-950/40 text-marble-50 backdrop-blur-sm transition-transform duration-300",
              "group-hover:scale-110 group-hover:bg-marble-50 group-hover:text-ink-950"
            )}
          >
            <Plus className="size-3.5" />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" align="center" className="w-64 p-0">
        <Link href={`/products/${product.slug}`} className="flex gap-3 p-3">
          <div className="relative size-16 shrink-0 overflow-hidden bg-stone-100">
            <ProductMedia image={product.images[0]} sizes="64px" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.1em] text-stone-500">
              {categoryLabels[product.category]}
            </p>
            <p className="truncate text-sm font-medium text-ink-950">{product.name}</p>
            <p className="text-sm text-stone-600">{formatPrice(product.price)}</p>
          </div>
        </Link>
      </PopoverContent>
    </Popover>
  );
}
