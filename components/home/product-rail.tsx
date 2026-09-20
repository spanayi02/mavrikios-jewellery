import Link from "next/link";
import { ProductCard } from "@/components/commerce/product-card";
import { Reveal, RevealItem } from "@/components/site/reveal";
import type { Product } from "@/types/product";

interface ProductRailProps {
  eyebrow?: string;
  title: string;
  description?: string;
  viewAllHref: string;
  viewAllLabel?: string;
  products: Product[];
  tinted?: boolean;
  /** "grid" fills a 4-up grid on desktop; "scroll" stays a horizontal snap row at every size. */
  layout?: "grid" | "scroll";
}

export function ProductRail({
  eyebrow,
  title,
  description,
  viewAllHref,
  viewAllLabel = "View All",
  products,
  tinted = false,
  layout = "grid",
}: ProductRailProps) {
  return (
    <section className={`py-24 sm:py-32 ${tinted ? "bg-bone-100" : ""}`}>
      <div className="container-mavrikios">
        <Reveal className="mb-12 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {eyebrow && (
              <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-moss-600">{eyebrow}</p>
            )}
            <h2 className="max-w-lg text-balance font-serif text-4xl leading-[1.08] text-ink-950 sm:text-5xl">
              {title}
            </h2>
            {description && <p className="mt-3 max-w-md text-[15px] text-stone-600">{description}</p>}
          </div>
          <Link
            href={viewAllHref}
            className="veil-underline text-[13px] font-medium uppercase tracking-[0.12em] text-ink-950"
          >
            {viewAllLabel}
          </Link>
        </Reveal>

        {layout === "scroll" ? (
          <Reveal
            stagger={0.08}
            className="-mx-5 flex snap-x snap-proximity gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:gap-8 lg:px-12"
          >
            {products.map((product, i) => (
              <RevealItem key={product.id} className="w-[68vw] shrink-0 snap-start sm:w-[340px]">
                <ProductCard product={product} priority={i < 2} />
              </RevealItem>
            ))}
          </Reveal>
        ) : (
          <Reveal
            stagger={0.1}
            className="-mx-5 flex snap-x snap-proximity gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:overflow-visible sm:px-0 lg:grid-cols-4"
          >
            {products.map((product, i) => (
              <RevealItem key={product.id} className="w-[65vw] shrink-0 snap-start sm:w-auto">
                <ProductCard product={product} priority={i < 2} />
              </RevealItem>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
