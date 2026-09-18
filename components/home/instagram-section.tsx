import Image from "next/image";
import { InstagramIcon } from "@/components/site/icons";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { siteConfig } from "@/lib/site-config";

const tiles = [
  { src: "/images/products/aquamarine-bezel-ring.jpg", alt: "Gold ring with a round aquamarine cabochon" },
  { src: "/images/products/kite-drop-earrings.jpg", alt: "Gold kite-shaped drop earrings" },
  { src: "/images/products/pearl-pendant-necklace.jpg", alt: "Gold pendant necklace with a pearl drop" },
  { src: "/images/products/ruby-emerald-swirl-ring.jpg", alt: "Gold rings set with a ruby and an emerald" },
  { src: "/images/products/mama-charm-necklace.jpg", alt: "Gold charm necklace" },
  { src: "/images/products/orion-curb-chain-bracelet.jpg", alt: "Gold curb chain bracelet" },
];

export function InstagramSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-mavrikios">
        <Reveal className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-md text-balance font-serif text-4xl leading-[1.08] text-ink-950 sm:text-5xl">
            From the boutique, this week
          </h2>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-ink-950 veil-underline"
          >
            <InstagramIcon className="size-4" /> {siteConfig.instagramHandle}
          </a>
        </Reveal>

        <Reveal stagger={0.05} className="grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-6">
          {tiles.map((tile) => (
            <RevealItem key={tile.src}>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden bg-stone-100"
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 1024px) 16vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-ink-950/0 transition-colors duration-300 group-hover:bg-ink-950/25">
                  <InstagramIcon className="size-5 text-bone-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </a>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
