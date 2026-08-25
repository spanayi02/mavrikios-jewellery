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
    <section className="relative -mt-20 flex min-h-[56vh] w-full items-end overflow-hidden bg-marble-50 sm:min-h-[64vh]">
      <div className="absolute inset-0">
        <PlaceholderArt motif={motif} />
        <div className="absolute inset-0 bg-gradient-to-t from-marble-50 via-marble-50/45 to-marble-50/15" />
      </div>
      <div className="container-mavrikios relative z-10 pb-16 pt-40 sm:pb-20">
        <p className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-champagne-600">
          <span className="h-px w-8 bg-champagne-400" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="max-w-2xl text-balance font-serif text-4xl italic leading-[1.1] text-ink-950 sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-stone-600">{description}</p>
        )}
      </div>
    </section>
  );
}
