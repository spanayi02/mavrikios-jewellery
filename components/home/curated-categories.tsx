import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { ParallaxLayer } from "@/components/site/parallax-layer";
import { shopCategories } from "@/data/categories";

export function CuratedCategories() {
  const [rings, earrings, necklaces, bracelets, engagement, gifts] = shopCategories;

  return (
    <section className="container-mavrikios py-24 sm:py-32">
      <Reveal className="mb-12 sm:mb-16">
        <h2 className="max-w-lg text-balance font-serif text-4xl leading-[1.08] text-ink-950 sm:text-5xl">
          Every piece, considered
        </h2>
      </Reveal>

      <Reveal stagger={0.08} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6 lg:grid-rows-2 lg:gap-5">
        <RevealItem className="aspect-[3/4] lg:col-span-2 lg:row-span-2 lg:aspect-auto">
          <CategoryTile item={rings} parallax />
        </RevealItem>
        <RevealItem className="aspect-[3/4] lg:col-span-4 lg:aspect-auto">
          <CategoryTile item={engagement} large parallax />
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

function CategoryTile({
  item,
  large,
  parallax,
}: {
  item: (typeof shopCategories)[number];
  large?: boolean;
  parallax?: boolean;
}) {
  const art = item.image ? (
    <Image
      src={item.image.src}
      alt={item.image.alt}
      fill
      sizes={large ? "(min-width: 1024px) 60vw, 50vw" : "(min-width: 1024px) 20vw, 50vw"}
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
    />
  ) : (
    <PlaceholderArt motif={item.motif} className="transition-transform duration-700 ease-out group-hover:scale-105" />
  );

  return (
    <Link href={item.href} className="group relative block h-full w-full overflow-hidden bg-stone-100">
      {parallax ? (
        <ParallaxLayer range={26} className="absolute inset-0">
          {art}
        </ParallaxLayer>
      ) : (
        art
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-ink-950/5 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-6">
        <div>
          <p className={`font-serif text-bone-50 ${large ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}`}>
            {item.title}
          </p>
          {large && <p className="mt-1 max-w-xs text-sm text-bone-50/80">{item.description}</p>}
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-bone-50/15 text-bone-50 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-bone-50 group-hover:text-ink-950">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
