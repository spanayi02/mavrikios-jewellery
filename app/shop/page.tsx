import type { Metadata } from "next";
import { ShopExperience } from "@/components/commerce/shop-experience";
import { getAllProducts } from "@/lib/data/products";
import type { SortKey } from "@/lib/shop";
import type { ProductCategory, ProductCollection } from "@/types/product";

export const metadata: Metadata = {
  title: "Shop All Jewellery",
  description:
    "Browse rings, earrings, necklaces and bracelets from Mavrikios Jewellery Boutique. Fine jewellery in Nicosia, Cyprus.",
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
      <div className="border-b border-stone-200 py-12 sm:py-16">
        <div className="container-mavrikios">
          <h1 className="font-serif text-4xl text-ink-950 sm:text-5xl">All jewellery</h1>
        </div>
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
