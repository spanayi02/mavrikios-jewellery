import { PlaceholderArt } from "@/components/site/placeholder-art";
import { InstagramIcon } from "@/components/site/icons";
import { siteConfig } from "@/lib/site-config";
import type { PlaceholderMotif } from "@/types/product";

const tiles: PlaceholderMotif[] = ["ring", "earring", "necklace", "bracelet", "gift", "monopetra"];

export function InstagramSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-mavrikios">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-stone-500">Follow Along</p>
          <h2 className="font-serif text-3xl italic text-ink-950 sm:text-4xl">
            @mavrikios.jewellery.boutique
          </h2>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-ink-950 veil-underline"
          >
            <InstagramIcon className="size-4" /> Follow {siteConfig.instagramHandle}
          </a>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-6">
          {tiles.map((motif, i) => (
            <a
              key={`${motif}-${i}`}
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden"
            >
              <PlaceholderArt motif={motif} tone={i % 2 === 0 ? "marble" : "ink"} />
              <div className="absolute inset-0 flex items-center justify-center bg-ink-950/0 transition-colors duration-300 group-hover:bg-ink-950/20">
                <InstagramIcon className="size-5 text-marble-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
