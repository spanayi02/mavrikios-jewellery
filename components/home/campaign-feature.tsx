import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import { Reveal } from "@/components/site/reveal";
import { ShopTheLookHotspot } from "@/components/commerce/shop-the-look-hotspot";
import { getAllProducts } from "@/data/products";

const featuredSlugs = ["eleni-tennis-bracelet", "nicosia-fine-chain-bracelet", "melina-baguette-bracelet"];
const hotspotPositions = [
  { top: "32%", left: "62%" },
  { top: "58%", left: "78%" },
  { top: "74%", left: "48%" },
];

export function CampaignFeature() {
  const products = getAllProducts();
  const featured = featuredSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="relative flex min-h-[70vh] w-full items-center overflow-hidden bg-ink-950 sm:min-h-[85vh]">
      <div className="absolute inset-0">
        <PlaceholderArt motif="bracelet" tone="ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/30 to-transparent" />
      </div>

      {featured.map((product, i) => (
        <ShopTheLookHotspot key={product.id} product={product} style={hotspotPositions[i]} />
      ))}

      <Reveal className="container-mavrikios relative z-10 py-20">
        <div className="max-w-md">
          <p className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-champagne-400">
            <span className="h-px w-8 bg-champagne-400/70" aria-hidden />
            The Mavrikios Edit
          </p>
          <h2 className="font-serif text-4xl italic leading-[1.1] text-marble-50 sm:text-5xl">
            Pieces for the moments that stay.
          </h2>
          <p className="mt-4 text-sm text-marble-50/60">Tap the marks to shop the pieces shown.</p>
          <Link
            href="/shop?collection=signature"
            className="group mt-8 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-marble-50"
          >
            Explore the Edit
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
