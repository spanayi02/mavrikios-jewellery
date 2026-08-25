import { PlaceholderArt } from "@/components/site/placeholder-art";
import type { PlaceholderMotif } from "@/types/product";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  motif: PlaceholderMotif;
}

export function PageHero({ eyebrow, title, description, motif }: PageHeroProps) {
  return (
    <section className="relative -mt-20 flex min-h-[62vh] w-full items-end overflow-hidden bg-ink-950 sm:min-h-[72vh]">
      <div className="absolute inset-0">
        <PlaceholderArt motif={motif} tone="ink" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-ink-950/40" />
      </div>
      <div className="container-mavrikios relative z-10 pb-16 pt-40 sm:pb-20">
        <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-marble-50/70">{eyebrow}</p>
        <h1 className="max-w-2xl text-balance font-serif text-4xl italic leading-[1.1] text-marble-50 sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-marble-50/75">{description}</p>
        )}
      </div>
    </section>
  );
}
