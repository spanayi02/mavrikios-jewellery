import "server-only";
import { cache } from "react";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Product, ProductImage, ProductVariant } from "@/types/product";

/**
 * Product catalogue, backed by the `products` table in Supabase (migrated from
 * the old static data/products.ts — see CLAUDE.md's Admin dashboard section).
 * Reads are public (RLS `to public`); writes require staff (see lib/data/staff.ts).
 */

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  description: string;
  details: string[];
  care: string[];
  price: number;
  compare_at_price: number | null;
  currency: "EUR";
  category: Product["category"];
  collections: Product["collections"];
  material: Product["material"];
  stone: Product["stone"];
  images: ProductImage[];
  variants: ProductVariant[] | null;
  variant_label: string | null;
  availability: Product["availability"];
  stock_quantity: number;
  featured: boolean;
  is_new: boolean;
  best_seller: boolean;
  limited: boolean;
  seo_title: string;
  seo_description: string;
  created_at: string;
}

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description,
    description: row.description,
    details: row.details,
    care: row.care,
    price: Number(row.price),
    compareAtPrice: row.compare_at_price === null ? undefined : Number(row.compare_at_price),
    currency: row.currency,
    category: row.category,
    collections: row.collections,
    material: row.material,
    stone: row.stone,
    images: row.images,
    variants: row.variants ?? undefined,
    variantLabel: row.variant_label ?? undefined,
    availability: row.availability,
    stockQuantity: row.stock_quantity,
    featured: row.featured,
    isNew: row.is_new,
    bestSeller: row.best_seller,
    limited: row.limited,
    createdAt: row.created_at,
    seo: { title: row.seo_title, description: row.seo_description },
  };
}

/** Cache tag for every catalog read. Admin writes revalidate this, see app/admin/products/actions.ts. */
export const CATALOG_TAG = "catalog";

// Reads are public (RLS `to public`) and don't need the caller's session, so this
// uses the plain anon client rather than the cookie-based SSR one — that keeps
// catalog reads usable from build-time contexts like generateStaticParams, which
// run with no request/cookies available.
//
// The explicit fetch matters. supabase-js goes through global `fetch`, which Next persists in
// its build cache and will happily reuse on a *later* build: a product edited in the database
// kept rendering its old name, metal and photo on prerendered pages even after a fresh
// `next build`, because the underlying request was served from that cache. Tagging the read and
// giving it a lifetime means a stale entry can never outlive a minute on its own, and an admin
// write can drop it immediately via `revalidateTag`.
function catalogClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: (input, init) =>
          fetch(input, { ...init, next: { revalidate: 60, tags: [CATALOG_TAG] } }),
      },
    }
  );
}

export const getAllProducts = cache(async (): Promise<Product[]> => {
  const supabase = catalogClient();
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("Failed to load products", error);
    return [];
  }
  return (data as ProductRow[]).map(toProduct);
});

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((product) => product.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((product) => product.id === id);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, limit);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.featured);
}

export async function getBestSellers(): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.bestSeller);
}

export async function getNewArrivals(): Promise<Product[]> {
  const products = await getAllProducts();
  return [...products]
    .filter((p) => p.isNew)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getEngagementProducts(): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.collections.includes("engagement"));
}
