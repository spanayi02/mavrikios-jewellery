import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProductMedia } from "@/components/site/product-media";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { formatPrice } from "@/lib/format";
import { getAllProducts } from "@/lib/data/products";

const featuredSlugs = ["sophia-eternity-band", "vasso-halo-ring", "calliope-pendant-necklace"];

/** The one deliberate dark moment on the homepage: deep moss, like the inside of a ring box. */
export async function CampaignFeature() {
  const products = await getAllProducts();
  const featured = featuredSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="marble-surface-dark relative w-full overflow-hidden">
      <div className="container-mavrikios relative grid grid-cols-1 items-center gap-14 py-24 sm:py-32 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <h2 className="text-balance font-serif text-4xl leading-[1.08] text-bone-50 sm:text-5xl">
            Pieces for the moments that stay.
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-moss-200">
            Three pieces from the edit, chosen for the way they wear every day.
          </p>
          <Link
            href="/shop?collection=signature"
            className="group mt-8 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-bone-50"
          >
            Explore the Edit
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal delay={0.15} stagger={0.08} className="grid grid-cols-3 gap-3 lg:col-span-7 lg:col-start-6 sm:gap-5">
          {featured.map((product) => (
            <RevealItem key={product.id}>
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-ink-900">
                  <ProductMedia
                    image={product.images[0]}
                    sizes="(min-width: 1024px) 20vw, 33vw"
                    className="transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-bone-50/90 text-ink-950 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
                <p className="mt-3 truncate text-sm text-bone-50">{product.name}</p>
                <p className="text-sm text-moss-200">{formatPrice(product.price)}</p>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
