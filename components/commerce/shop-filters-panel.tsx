"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { categoryLabels, collectionLabels, materialLabels } from "@/lib/product-labels";
import { formatPrice } from "@/lib/format";
import type { ProductCategory, ProductCollection, ProductMaterial } from "@/types/product";

interface ShopFiltersPanelProps {
  categories: ProductCategory[];
  onToggleCategory: (value: ProductCategory) => void;
  collections: ProductCollection[];
  onToggleCollection: (value: ProductCollection) => void;
  materials: ProductMaterial[];
  onToggleMaterial: (value: ProductMaterial) => void;
  inStockOnly: boolean;
  onToggleInStock: () => void;
  maxPrice: number;
  priceBounds: { min: number; max: number };
  onPriceChange: (value: number) => void;
  onReset: () => void;
}

export function ShopFiltersPanel({
  categories,
  onToggleCategory,
  collections,
  onToggleCollection,
  materials,
  onToggleMaterial,
  inStockOnly,
  onToggleInStock,
  maxPrice,
  priceBounds,
  onPriceChange,
  onReset,
}: ShopFiltersPanelProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">Refine</p>
        <button onClick={onReset} className="text-xs text-stone-500 underline-offset-2 hover:underline">
          Reset
        </button>
      </div>

      <FilterGroup title="Category">
        {(Object.keys(categoryLabels) as ProductCategory[]).map((key) => (
          <FilterCheckbox
            key={key}
            id={`cat-${key}`}
            label={categoryLabels[key]}
            checked={categories.includes(key)}
            onChange={() => onToggleCategory(key)}
          />
        ))}
      </FilterGroup>

      <Separator />

      <FilterGroup title="Collection">
        {(Object.keys(collectionLabels) as ProductCollection[]).map((key) => (
          <FilterCheckbox
            key={key}
            id={`col-${key}`}
            label={collectionLabels[key]}
            checked={collections.includes(key)}
            onChange={() => onToggleCollection(key)}
          />
        ))}
      </FilterGroup>

      <Separator />

      <FilterGroup title="Material">
        {(Object.keys(materialLabels) as ProductMaterial[]).map((key) => (
          <FilterCheckbox
            key={key}
            id={`mat-${key}`}
            label={materialLabels[key]}
            checked={materials.includes(key)}
            onChange={() => onToggleMaterial(key)}
          />
        ))}
      </FilterGroup>

      <Separator />

      <FilterGroup title="Price">
        <div className="px-0.5 pt-2">
          <Slider
            min={priceBounds.min}
            max={priceBounds.max}
            step={10}
            value={[maxPrice]}
            onValueChange={([v]) => onPriceChange(v)}
          />
          <div className="mt-3 flex items-center justify-between text-xs text-stone-600">
            <span>{formatPrice(priceBounds.min)}</span>
            <span>Up to {formatPrice(maxPrice)}</span>
          </div>
        </div>
      </FilterGroup>

      <Separator />

      <FilterGroup title="Availability">
        <FilterCheckbox id="in-stock" label="In stock only" checked={inStockOnly} onChange={onToggleInStock} />
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-5 first:pt-0">
      <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone-500">{title}</p>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FilterCheckbox({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <Label htmlFor={id} className="cursor-pointer text-[13px] font-normal normal-case tracking-normal text-ink-950">
        {label}
      </Label>
    </div>
  );
}
