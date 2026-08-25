import Link from "next/link";
import { ProductCard } from "@/components/commerce/product-card";
import type { Product } from "@/types/product";

interface ProductRailProps {
  eyebrow: string;
  title: string;
  description?: string;
  viewAllHref: string;
  viewAllLabel?: string;
  products: Product[];
  tinted?: boolean;
}

export function ProductRail({
  eyebrow,
  title,
  description,
  viewAllHref,
  viewAllLabel = "View All",
  products,
  tinted = false,
}: ProductRailProps) {
  return (
    <section className={`py-20 sm:py-28 ${tinted ? "bg-marble-100" : ""}`}>
      <div className="container-mavrikios">
        <div className="mb-10 flex flex-col gap-3 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-stone-500">{eyebrow}</p>
            <h2 className="max-w-lg font-serif text-3xl italic text-ink-950 sm:text-4xl">{title}</h2>
            {description && <p className="mt-3 max-w-md text-sm text-stone-600">{description}</p>}
          </div>
          <Link
            href={viewAllHref}
            className="veil-underline text-[13px] font-medium uppercase tracking-[0.12em] text-ink-950"
          >
            {viewAllLabel}
          </Link>
        </div>

        <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {products.map((product, i) => (
            <div key={product.id} className="w-[65vw] shrink-0 snap-start sm:w-auto">
              <ProductCard product={product} priority={i < 2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
