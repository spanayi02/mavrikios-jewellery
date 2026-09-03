import type { Metadata } from "next";
import { ShopExperience } from "@/components/commerce/shop-experience";
import { getAllProducts } from "@/lib/data/products";
import type { SortKey } from "@/lib/shop";
import type { ProductCategory, ProductCollection } from "@/types/product";

export const metadata: Metadata = {
  title: "Shop All Jewellery",
  description:
    "Browse rings, earrings, necklaces and bracelets from Mavrikios Jewellery Boutique — fine jewellery in Nicosia, Cyprus.",
  alternates: { canonical: "/shop" },
};

const validCategories: ProductCategory[] = ["rings", "earrings", "necklaces", "bracelets"];
const validCollections: ProductCollection[] = ["engagement", "gifts", "signature", "everyday"];
const validSorts: SortKey[] = ["featured", "newest", "price-asc", "price-desc"];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; collection?: string; sort?: string; filter?: string }>;
}) {
  const params = await searchParams;
  const category = validCategories.includes(params.category as ProductCategory)
    ? (params.category as ProductCategory)
    : undefined;
  const collection = validCollections.includes(params.collection as ProductCollection)
    ? (params.collection as ProductCollection)
    : undefined;
  const sort: SortKey =
    params.filter === "bestseller"
      ? "featured"
      : validSorts.includes(params.sort as SortKey)
        ? (params.sort as SortKey)
        : "featured";

  const products = await getAllProducts();

  return (
    <div>
      <div className="border-b border-stone-200 py-10 text-center sm:py-14">
        <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-stone-500">Mavrikios</p>
        <h1 className="font-serif text-3xl italic text-ink-950 sm:text-4xl">All Jewellery</h1>
      </div>
      <ShopExperience
        products={products}
        initialCategory={category}
        initialCollection={collection}
        initialSort={sort}
      />
    </div>
  );
}
