import { NewsletterForm } from "@/components/site/newsletter-form";
import { Reveal } from "@/components/site/reveal";

export function NewsletterSection() {
  return (
    <section className="marble-surface py-20 text-center sm:py-28">
      <Reveal className="container-mavrikios flex flex-col items-center">
        <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-champagne-600">
          <span className="h-px w-8 bg-champagne-400" aria-hidden />
          Notes from Mavrikios
          <span className="h-px w-8 bg-champagne-400" aria-hidden />
        </p>
        <h2 className="max-w-lg font-serif text-3xl italic text-ink-950 sm:text-4xl">
          New pieces, private selections and stories from the boutique.
        </h2>
        <div className="mt-8">
          <NewsletterForm />
        </div>
      </Reveal>
    </section>
  );
}
