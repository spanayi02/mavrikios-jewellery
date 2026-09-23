import Link from "next/link";
import { FadeImage } from "@/components/site/fade-image";
import { ArrowUpRight } from "lucide-react";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { shopCategories } from "@/data/categories";

const featuredKeys: Record<string, string> = {
  rings: "Timeless beauty",
  necklaces: "Everyday elegance",
  bracelets: "Modern classics",
};

export function CuratedCategories() {
  const featured = shopCategories.filter((c) => c.key in featuredKeys);

  return (
    <section className="container-mavrikios py-20 sm:py-28">
      <Reveal className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-gold-400" aria-hidden />
          <h2 className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-600">
            Our Collections
          </h2>
        </div>
        <Link
          href="/shop"
          className="veil-underline group flex items-center gap-2 pb-0.5 text-[13px] font-medium uppercase tracking-[0.12em] text-ink-950"
        >
          Explore All Collections
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </Reveal>

      <Reveal stagger={0.08} className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        {featured.map((item) => (
          <RevealItem key={item.key}>
            <CollectionCard item={item} subtitle={featuredKeys[item.key]} />
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}

function CollectionCard({
  item,
  subtitle,
}: {
  item: (typeof shopCategories)[number];
  subtitle: string;
}) {
  return (
    <Link
      href={item.href}
      className="group flex h-full items-stretch border border-ink-950/[0.08] bg-bone-100 transition-colors duration-300 hover:bg-bone-200/60"
    >
      <div className="relative aspect-[4/5] w-3/5 shrink-0 overflow-hidden bg-stone-100">
        {item.image ? (
          <FadeImage
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(min-width: 640px) 20vw, 45vw"
            className="object-cover group-hover:scale-[1.04]"
          />
        ) : (
          <PlaceholderArt
            motif={item.motif}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <p className="font-serif text-xl text-ink-950 sm:text-2xl">{item.title}</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-stone-500">{subtitle}</p>
        </div>
        <span className="mt-6 flex size-8 items-center justify-center border border-ink-950/15 text-ink-950 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-gold-400 group-hover:text-gold-600">
          <ArrowUpRight className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}
