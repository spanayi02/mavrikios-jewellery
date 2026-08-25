import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import { shopCategories } from "@/data/categories";

export function CuratedCategories() {
  const [rings, earrings, necklaces, bracelets, engagement, gifts] = shopCategories;

  return (
    <section className="container-mavrikios py-20 sm:py-28">
      <div className="mb-10 flex flex-col gap-3 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-stone-500">Shop by Category</p>
          <h2 className="max-w-lg font-serif text-3xl italic text-ink-950 sm:text-4xl">
            Every piece, considered
          </h2>
        </div>
        <Link href="/shop" className="veil-underline text-[13px] font-medium uppercase tracking-[0.12em] text-ink-950">
          View All Jewellery
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6 lg:grid-rows-2 lg:gap-5">
        <CategoryTile item={rings} className="lg:col-span-2 lg:row-span-2 aspect-[3/4] lg:aspect-auto" />
        <CategoryTile item={engagement} className="lg:col-span-4 aspect-[3/4] lg:aspect-auto" large />
        <CategoryTile item={earrings} className="aspect-[3/4]" />
        <CategoryTile item={necklaces} className="aspect-[3/4]" />
        <CategoryTile item={bracelets} className="aspect-[3/4]" />
        <CategoryTile item={gifts} className="aspect-[3/4]" />
      </div>
    </section>
  );
}

function CategoryTile({
  item,
  className,
  large,
}: {
  item: (typeof shopCategories)[number];
  className?: string;
  large?: boolean;
}) {
  return (
    <Link href={item.href} className={`group relative block overflow-hidden bg-stone-100 ${className}`}>
      <PlaceholderArt motif={item.motif} className="transition-transform duration-700 ease-out group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-ink-950/0 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-6">
        <div>
          <p className={`font-serif text-marble-50 ${large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}`}>
            {item.title}
          </p>
          {large && (
            <p className="mt-1 hidden max-w-xs text-sm text-marble-50/80 sm:block">{item.description}</p>
          )}
        </div>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-marble-50/15 text-marble-50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
