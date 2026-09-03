"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { createProduct, updateProduct, type ProductFormInput } from "@/app/admin/products/actions";
import type { Product, ProductCategory, ProductCollection, ProductMaterial, ProductStone } from "@/types/product";

const categories: ProductCategory[] = ["rings", "earrings", "necklaces", "bracelets"];
const collectionOptions: ProductCollection[] = ["engagement", "gifts", "signature", "everyday"];
const materials: ProductMaterial[] = [
  "18k-yellow-gold",
  "18k-white-gold",
  "18k-rose-gold",
  "9k-yellow-gold",
  "sterling-silver",
  "platinum",
];
const stones: ProductStone[] = ["diamond", "pearl", "sapphire", "emerald", "ruby", "zirconia", "none"];
const availabilities: ProductFormInput["availability"][] = ["in-stock", "made-to-order", "out-of-stock"];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const isEditing = Boolean(product);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [collections, setCollections] = useState<Set<ProductCollection>>(new Set(product?.collections ?? []));
  const [category, setCategory] = useState<ProductCategory>(product?.category ?? "rings");
  const [material, setMaterial] = useState<ProductMaterial>(product?.material ?? "18k-yellow-gold");
  const [stone, setStone] = useState<ProductStone>(product?.stone ?? "none");
  const [availability, setAvailability] = useState<ProductFormInput["availability"]>(
    product?.availability ?? "in-stock"
  );

  function toggleCollection(value: ProductCollection) {
    setCollections((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);

    const input: ProductFormInput = {
      id: product?.id,
      slug,
      name: String(data.get("name")),
      shortDescription: String(data.get("shortDescription")),
      description: String(data.get("description")),
      details: String(data.get("details")).split("\n"),
      care: String(data.get("care")).split("\n"),
      price: Number(data.get("price")),
      compareAtPrice: data.get("compareAtPrice") ? Number(data.get("compareAtPrice")) : undefined,
      category,
      collections: Array.from(collections),
      material,
      stone,
      imageSrc: String(data.get("imageSrc") ?? ""),
      imageAlt: String(data.get("imageAlt") ?? ""),
      availability,
      stockQuantity: Number(data.get("stockQuantity")),
      featured: data.get("featured") === "on",
      isNew: data.get("isNew") === "on",
      bestSeller: data.get("bestSeller") === "on",
      limited: data.get("limited") === "on",
    };

    setIsSubmitting(true);
    const result = isEditing ? await updateProduct(input) : await createProduct(input);
    setIsSubmitting(false);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success(isEditing ? "Product updated." : "Product created.");
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-10">
      <section className="space-y-5">
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-stone-500">Basics</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              required
              defaultValue={product?.name}
              onChange={(e) => {
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              name="slug"
              required
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value));
              }}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="shortDescription">Short Description</Label>
          <Input id="shortDescription" name="shortDescription" required defaultValue={product?.shortDescription} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Full Description</Label>
          <Textarea id="description" name="description" required rows={4} defaultValue={product?.description} />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="details">Details (one per line)</Label>
            <Textarea id="details" name="details" rows={4} defaultValue={product?.details.join("\n")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="care">Care (one per line)</Label>
            <Textarea id="care" name="care" rows={4} defaultValue={product?.care.join("\n")} />
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-stone-500">Classification</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as ProductCategory)}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Material</Label>
            <Select value={material} onValueChange={(v) => setMaterial(v as ProductMaterial)}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {materials.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Stone</Label>
            <Select value={stone} onValueChange={(v) => setStone(v as ProductStone)}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {stones.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Collections</Label>
          <div className="flex flex-wrap gap-4">
            {collectionOptions.map((c) => (
              <label key={c} className="flex items-center gap-2 text-sm text-ink-950">
                <Checkbox checked={collections.has(c)} onCheckedChange={() => toggleCollection(c)} />
                {c}
              </label>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-stone-500">Pricing & Stock</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="price">Price (EUR)</Label>
            <Input id="price" name="price" type="number" min="0" step="1" required defaultValue={product?.price} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="compareAtPrice">Compare-at Price (optional)</Label>
            <Input id="compareAtPrice" name="compareAtPrice" type="number" min="0" step="1" defaultValue={product?.compareAtPrice} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stockQuantity">Stock Quantity</Label>
            <Input id="stockQuantity" name="stockQuantity" type="number" min="0" step="1" required defaultValue={product?.stockQuantity ?? 0} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Availability</Label>
          <Select value={availability} onValueChange={(v) => setAvailability(v as ProductFormInput["availability"])}>
            <SelectTrigger className="w-full sm:w-64"><SelectValue /></SelectTrigger>
            <SelectContent>
              {availabilities.map((a) => (
                <SelectItem key={a} value={a}>{a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-stone-500">Photography</h2>
        <p className="text-sm text-stone-600">
          Leave the path empty to use the on-brand placeholder art until a real photo is uploaded to{" "}
          <code className="text-xs">public/images/products/</code>.
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="imageSrc">Image Path</Label>
            <Input id="imageSrc" name="imageSrc" placeholder="/images/products/my-photo.jpg" defaultValue={product?.images[0]?.src} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageAlt">Image Alt Text</Label>
            <Input id="imageAlt" name="imageAlt" placeholder="Defaults to product name" defaultValue={product?.images[0]?.alt} />
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-stone-500">Flags</h2>
        <div className="flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-sm text-ink-950">
            <Checkbox name="featured" defaultChecked={product?.featured} />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm text-ink-950">
            <Checkbox name="isNew" defaultChecked={product?.isNew} />
            New Arrival
          </label>
          <label className="flex items-center gap-2 text-sm text-ink-950">
            <Checkbox name="bestSeller" defaultChecked={product?.bestSeller} />
            Best Seller
          </label>
          <label className="flex items-center gap-2 text-sm text-ink-950">
            <Checkbox name="limited" defaultChecked={product?.limited} />
            Limited
          </label>
        </div>
      </section>

      <div className="flex gap-3 border-t border-stone-200 pt-6">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : isEditing ? "Save Changes" : "Create Product"}
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={() => router.push("/admin/products")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
