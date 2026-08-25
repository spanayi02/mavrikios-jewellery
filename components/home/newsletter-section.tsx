import { NewsletterForm } from "@/components/site/newsletter-form";

export function NewsletterSection() {
  return (
    <section className="marble-surface-dark py-20 text-center sm:py-28">
      <div className="container-mavrikios flex flex-col items-center">
        <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-marble-50/50">
          Notes from Mavrikios
        </p>
        <h2 className="max-w-lg font-serif text-3xl italic text-marble-50 sm:text-4xl">
          New pieces, private selections and stories from the boutique.
        </h2>
        <div className="mt-8">
          <NewsletterForm dark />
        </div>
      </div>
    </section>
  );
}
