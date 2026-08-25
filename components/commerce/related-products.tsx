import { ProductCard } from "@/components/commerce/product-card";
import type { Product } from "@/types/product";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="border-t border-stone-200 py-20 sm:py-28">
      <div className="container-mavrikios">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-stone-500">You May Also Like</p>
        <h2 className="mb-10 font-serif text-3xl italic text-ink-950 sm:mb-14 sm:text-4xl">
          Complete the Look
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
