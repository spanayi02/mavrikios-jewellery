import type { Metadata } from "next";
import { ProductForm } from "@/components/admin/product-form";

export const metadata: Metadata = { title: "Add Product", robots: { index: false, follow: false } };

export default function NewProductPage() {
  return (
    <div>
      <p className="mb-1 text-[11px] uppercase tracking-[0.25em] text-stone-500">Products</p>
      <h1 className="mb-8 font-serif text-3xl italic text-ink-950">Add Product</h1>
      <ProductForm />
    </div>
  );
}
