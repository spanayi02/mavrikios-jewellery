"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getStaffRole } from "@/lib/data/staff";
import type { ProductCategory, ProductCollection, ProductMaterial, ProductStone } from "@/types/product";

export type ProductFormResult = { ok: true; id: string } | { ok: false; error: string };

export interface ProductFormInput {
  id?: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  details: string[];
  care: string[];
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  collections: ProductCollection[];
  material: ProductMaterial;
  stone: ProductStone;
  imageSrc?: string;
  imageAlt: string;
  availability: "in-stock" | "made-to-order" | "out-of-stock";
  stockQuantity: number;
  featured: boolean;
  isNew: boolean;
  bestSeller: boolean;
  limited: boolean;
}

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function validate(input: ProductFormInput): string | null {
  if (!input.name.trim()) return "Name is required.";
  if (!SLUG_PATTERN.test(input.slug)) return "Slug must be lowercase letters, numbers and hyphens only.";
  if (!Number.isFinite(input.price) || input.price <= 0) return "Price must be a positive number.";
  if (!Number.isInteger(input.stockQuantity) || input.stockQuantity < 0) return "Stock quantity must be 0 or more.";
  if (input.collections.length === 0) return "Select at least one collection.";
  return null;
}

async function requireStaff() {
  const role = await getStaffRole();
  if (!role) throw new Error("Not authorized.");
  return role;
}

function toRow(input: ProductFormInput) {
  return {
    slug: input.slug.trim(),
    name: input.name.trim(),
    short_description: input.shortDescription.trim(),
    description: input.description.trim(),
    details: input.details.filter((d) => d.trim().length > 0),
    care: input.care.filter((c) => c.trim().length > 0),
    price: input.price,
    compare_at_price: input.compareAtPrice ?? null,
    category: input.category,
    collections: input.collections,
    material: input.material,
    stone: input.stone,
    images: [
      {
        ...(input.imageSrc?.trim() ? { src: input.imageSrc.trim() } : {}),
        alt: input.imageAlt.trim() || input.name.trim(),
        placeholder: categoryPlaceholder(input.category),
      },
    ],
    availability: input.availability,
    stock_quantity: input.stockQuantity,
    featured: input.featured,
    is_new: input.isNew,
    best_seller: input.bestSeller,
    limited: input.limited,
    seo_title: `${input.name.trim()} — Mavrikios Jewellery Boutique`,
    seo_description: input.shortDescription.trim(),
    updated_at: new Date().toISOString(),
  };
}

function categoryPlaceholder(category: ProductCategory) {
  switch (category) {
    case "rings":
      return "ring";
    case "earrings":
      return "earring";
    case "necklaces":
      return "necklace";
    case "bracelets":
      return "bracelet";
  }
}

export async function createProduct(input: ProductFormInput): Promise<ProductFormResult> {
  await requireStaff();
  const error = validate(input);
  if (error) return { ok: false, error };

  const supabase = await createClient();
  const id = `p-${crypto.randomUUID().slice(0, 8)}`;
  const { error: dbError } = await supabase.from("products").insert({ id, created_at: new Date().toISOString(), ...toRow(input) });

  if (dbError) {
    console.error("Failed to create product", dbError);
    if (dbError.code === "23505") return { ok: false, error: "That slug is already in use." };
    return { ok: false, error: "Something went wrong saving the product." };
  }

  revalidatePath("/", "layout");
  return { ok: true, id };
}

export async function updateProduct(input: ProductFormInput): Promise<ProductFormResult> {
  await requireStaff();
  if (!input.id) return { ok: false, error: "Missing product id." };
  const error = validate(input);
  if (error) return { ok: false, error };

  const supabase = await createClient();
  const { error: dbError } = await supabase.from("products").update(toRow(input)).eq("id", input.id);

  if (dbError) {
    console.error("Failed to update product", dbError);
    if (dbError.code === "23505") return { ok: false, error: "That slug is already in use." };
    return { ok: false, error: "Something went wrong saving the product." };
  }

  revalidatePath("/", "layout");
  return { ok: true, id: input.id };
}

export async function deleteProduct(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireStaff();
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    console.error("Failed to delete product", error);
    return { ok: false, error: "Something went wrong deleting the product." };
  }
  revalidatePath("/", "layout");
  return { ok: true };
}
