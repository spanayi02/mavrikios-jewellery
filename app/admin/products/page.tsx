import Link from "next/link";
import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { getAllProducts } from "@/lib/data/products";
import { ProductMedia } from "@/components/site/product-media";
import { formatPrice } from "@/lib/format";
import { DeleteProductButton } from "@/components/admin/delete-product-button";

export const metadata: Metadata = { title: "Products", robots: { index: false, follow: false } };

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-1 text-[11px] uppercase tracking-[0.25em] text-stone-500">Catalogue</p>
          <h1 className="font-serif text-3xl italic text-ink-950">Products ({products.length})</h1>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-ink-950 px-5 py-3 text-[12px] font-medium uppercase tracking-[0.1em] text-marble-50"
        >
          <Plus className="size-4" /> Add Product
        </Link>
      </div>

      <div className="overflow-x-auto border border-stone-200 bg-marble-50">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-stone-200 text-[11px] uppercase tracking-[0.1em] text-stone-500">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-stone-100 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden bg-stone-100">
                      <ProductMedia image={product.images[0]} sizes="48px" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink-950">{product.name}</p>
                      <p className="truncate text-xs text-stone-500">{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize text-stone-600">{product.category}</td>
                <td className="px-4 py-3 text-ink-950">{formatPrice(product.price)}</td>
                <td className="px-4 py-3 text-stone-600">{product.stockQuantity ?? 0}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      product.availability === "in-stock"
                        ? "text-xs text-emerald-700"
                        : product.availability === "out-of-stock"
                          ? "text-xs text-red-700"
                          : "text-xs text-stone-500"
                    }
                  >
                    {product.availability}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <Link href={`/admin/products/${product.id}/edit`} className="text-xs uppercase tracking-[0.08em] text-ink-950 underline">
                      Edit
                    </Link>
                    <DeleteProductButton id={product.id} name={product.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
