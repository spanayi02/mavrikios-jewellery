import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import { ProductMedia } from "@/components/site/product-media";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { ParallaxLayer } from "@/components/site/parallax-layer";
import { formatPrice } from "@/lib/format";
import { getAllProducts } from "@/lib/data/products";

const featuredSlugs = ["eleni-tennis-bracelet", "nicosia-fine-chain-bracelet", "melina-baguette-bracelet"];

export async function CampaignFeature() {
  const products = await getAllProducts();
  const featured = featuredSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="relative w-full overflow-hidden bg-ink-950">
      <ParallaxLayer range={60} className="absolute inset-0">
        <PlaceholderArt motif="bracelet" tone="ink" />
      </ParallaxLayer>
      <div className="absolute inset-0 bg-ink-950/85" />

      <div className="container-mavrikios relative z-10 grid grid-cols-1 items-center gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <p className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-champagne-400">
            <span className="h-px w-8 bg-champagne-400/70" aria-hidden />
            The Mavrikios Edit
          </p>
          <h2 className="font-serif text-4xl italic leading-[1.1] text-marble-50 sm:text-5xl">
            Pieces for the moments that stay.
          </h2>
          <p className="mt-4 max-w-sm text-sm text-marble-50/60">
            Three pieces from the edit, chosen for the way they wear every day.
          </p>
          <Link
            href="/shop?collection=signature"
            className="group mt-8 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-marble-50"
          >
            Explore the Edit
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal delay={0.15} stagger={0.08} className="grid grid-cols-3 gap-3 lg:col-span-7 lg:col-start-6 sm:gap-5">
          {featured.map((product) => (
            <RevealItem key={product.id}>
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden">
                  <ProductMedia
                    image={product.images[0]}
                    sizes="(min-width: 1024px) 20vw, 33vw"
                    className="transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span className="absolute bottom-2 right-2 flex size-7 items-center justify-center rounded-full bg-marble-50/90 text-ink-950 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
                <p className="mt-3 truncate text-[11px] uppercase tracking-[0.08em] text-marble-50/60">
                  {product.name}
                </p>
                <p className="text-sm text-marble-50">{formatPrice(product.price)}</p>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
