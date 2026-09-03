import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/data/products";
import { ProductForm } from "@/components/admin/product-form";

export const metadata: Metadata = { title: "Edit Product", robots: { index: false, follow: false } };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <div>
      <p className="mb-1 text-[11px] uppercase tracking-[0.25em] text-stone-500">Products</p>
      <h1 className="mb-8 font-serif text-3xl italic text-ink-950">Edit {product.name}</h1>
      <ProductForm product={product} />
    </div>
  );
}
