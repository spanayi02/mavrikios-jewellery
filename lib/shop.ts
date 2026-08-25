import type { Product, ProductCategory, ProductCollection, ProductMaterial } from "@/types/product";

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export interface ShopFilters {
  categories: ProductCategory[];
  materials: ProductMaterial[];
  collections: ProductCollection[];
  inStockOnly: boolean;
  maxPrice?: number;
}

export function getPriceBounds(products: Product[]) {
  const prices = products.map((p) => p.price);
  return { min: Math.floor(Math.min(...prices) / 10) * 10, max: Math.ceil(Math.max(...prices) / 10) * 10 };
}

export function filterProducts(products: Product[], filters: ShopFilters): Product[] {
  return products.filter((p) => {
    if (filters.categories.length && !filters.categories.includes(p.category)) return false;
    if (filters.materials.length && !filters.materials.includes(p.material)) return false;
    if (filters.collections.length && !filters.collections.some((c) => p.collections.includes(c))) return false;
    if (filters.inStockOnly && p.availability === "out-of-stock") return false;
    if (filters.maxPrice !== undefined && p.price > filters.maxPrice) return false;
    return true;
  });
}

export function sortProducts(products: Product[], sort: SortKey): Product[] {
  const list = [...products];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "newest":
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "featured":
    default:
      return list.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}
