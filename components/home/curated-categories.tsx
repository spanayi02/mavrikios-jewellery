import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { shopCategories } from "@/data/categories";

export function CuratedCategories() {
  const [rings, earrings, necklaces, bracelets, engagement, gifts] = shopCategories;

  return (
    <section className="container-mavrikios py-20 sm:py-28">
      <Reveal className="mb-10 flex flex-col gap-3 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-stone-500">Shop by Category</p>
          <h2 className="max-w-lg font-serif text-3xl italic text-ink-950 sm:text-4xl">
            Every piece, considered
          </h2>
        </div>
        <Link href="/shop" className="veil-underline text-[13px] font-medium uppercase tracking-[0.12em] text-ink-950">
          View All Jewellery
        </Link>
      </Reveal>

      <Reveal stagger={0.08} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6 lg:grid-rows-2 lg:gap-5">
        <RevealItem className="aspect-[3/4] lg:col-span-2 lg:row-span-2 lg:aspect-auto">
          <CategoryTile item={rings} />
        </RevealItem>
        <RevealItem className="aspect-[3/4] lg:col-span-4 lg:aspect-auto">
          <CategoryTile item={engagement} large />
        </RevealItem>
        <RevealItem className="aspect-[3/4]">
          <CategoryTile item={earrings} />
        </RevealItem>
        <RevealItem className="aspect-[3/4]">
          <CategoryTile item={necklaces} />
        </RevealItem>
        <RevealItem className="aspect-[3/4]">
          <CategoryTile item={bracelets} />
        </RevealItem>
        <RevealItem className="aspect-[3/4]">
          <CategoryTile item={gifts} />
        </RevealItem>
      </Reveal>
    </section>
  );
}

function CategoryTile({ item, large }: { item: (typeof shopCategories)[number]; large?: boolean }) {
  return (
    <Link href={item.href} className="group relative block h-full w-full overflow-hidden bg-stone-100">
      <PlaceholderArt motif={item.motif} className="transition-transform duration-700 ease-out group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-ink-950/0 to-transparent" />
      <div className="pointer-events-none absolute inset-0 border border-champagne-300/0 transition-colors duration-500 group-hover:border-champagne-300/50" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-6">
        <div>
          <p className={`font-serif text-marble-50 ${large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}`}>
            {item.title}
          </p>
          {large && (
            <p className="mt-1 hidden max-w-xs text-sm text-marble-50/80 sm:block">{item.description}</p>
          )}
        </div>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-marble-50/15 text-marble-50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-champagne-400 group-hover:text-ink-950">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
