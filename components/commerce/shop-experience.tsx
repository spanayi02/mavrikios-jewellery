"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/commerce/product-card";
import { ShopFiltersPanel } from "@/components/commerce/shop-filters-panel";
import { filterProducts, getPriceBounds, sortProducts, type SortKey } from "@/lib/shop";
import type { Product, ProductCategory, ProductCollection, ProductMaterial } from "@/types/product";

interface ShopExperienceProps {
  products: Product[];
  initialCategory?: ProductCategory;
  initialCollection?: ProductCollection;
  initialSort?: SortKey;
}

function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function ShopExperience({
  products,
  initialCategory,
  initialCollection,
  initialSort = "featured",
}: ShopExperienceProps) {
  const priceBounds = useMemo(() => getPriceBounds(products), [products]);
  const [categories, setCategories] = useState<ProductCategory[]>(initialCategory ? [initialCategory] : []);
  const [collections, setCollections] = useState<ProductCollection[]>(
    initialCollection ? [initialCollection] : []
  );
  const [materials, setMaterials] = useState<ProductMaterial[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [sort, setSort] = useState<SortKey>(initialSort);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const result = filterProducts(products, {
      categories,
      materials,
      collections,
      inStockOnly,
      maxPrice: maxPrice < priceBounds.max ? maxPrice : undefined,
    });
    return sortProducts(result, sort);
  }, [products, categories, materials, collections, inStockOnly, maxPrice, priceBounds.max, sort]);

  function reset() {
    setCategories([]);
    setCollections([]);
    setMaterials([]);
    setInStockOnly(false);
    setMaxPrice(priceBounds.max);
  }

  const panelProps = {
    categories,
    onToggleCategory: (v: ProductCategory) => setCategories((c) => toggleValue(c, v)),
    collections,
    onToggleCollection: (v: ProductCollection) => setCollections((c) => toggleValue(c, v)),
    materials,
    onToggleMaterial: (v: ProductMaterial) => setMaterials((m) => toggleValue(m, v)),
    inStockOnly,
    onToggleInStock: () => setInStockOnly((v) => !v),
    maxPrice,
    priceBounds,
    onPriceChange: setMaxPrice,
    onReset: reset,
  };

  return (
    <div className="container-mavrikios grid grid-cols-1 gap-10 py-10 lg:grid-cols-[240px_1fr] lg:gap-12 lg:py-14">
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <ShopFiltersPanel {...panelProps} />
        </div>
      </aside>

      <div>
        <div className="mb-6 flex items-center justify-between border-b border-stone-200 pb-4">
          <p className="text-sm text-stone-600">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="size-3.5" /> Filters
            </Button>
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-24 text-center">
            <p className="font-serif text-xl text-ink-950">No pieces match those filters</p>
            <p className="text-sm text-stone-500">Try widening your selection.</p>
            <Button variant="outline" size="sm" onClick={reset} className="mt-4">
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        )}
      </div>

      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetContent side="bottom" className="max-h-[85vh] rounded-t-lg">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <ShopFiltersPanel {...panelProps} />
          </div>
          <div className="border-t border-stone-200 px-6 py-4">
            <Button className="w-full" onClick={() => setMobileFiltersOpen(false)}>
              Show {filtered.length} Results
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
