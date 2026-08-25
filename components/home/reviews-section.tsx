import { Star } from "lucide-react";
import { reviews, reviewThemes } from "@/data/reviews";
import { Reveal } from "@/components/site/reveal";
import { Marquee } from "@/components/site/marquee";

export function ReviewsSection() {
  return (
    <section className="overflow-hidden border-y border-stone-200 bg-marble-100 py-20 sm:py-28">
      <div className="container-mavrikios">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-stone-500">
            Customer Experience
          </p>
          <h2 className="font-serif text-3xl italic text-ink-950 sm:text-4xl">
            Chosen with care, for decades.
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-stone-600">
            Customers who visit Mavrikios consistently mention the same things: careful
            craftsmanship, considered designs and a team that takes the time to help you find the
            right piece.
          </p>
        </Reveal>

        {reviews.length > 0 ? (
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {reviews.slice(0, 3).map((review) => (
              <figure key={review.author} className="border border-stone-200 bg-marble-50 p-6">
                <div className="mb-3 flex gap-0.5 text-champagne-500">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-ink-950">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-xs uppercase tracking-[0.1em] text-stone-500">
                  {review.author} &middot; {review.source}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <Reveal delay={0.15} className="mt-14">
            <Marquee
              duration={26}
              items={reviewThemes.map((theme) => (
                <span
                  key={theme}
                  className="mx-2 rounded-full border border-stone-300 bg-marble-50 px-4 py-2 text-xs uppercase tracking-[0.08em] text-stone-600"
                >
                  {theme}
                </span>
              ))}
            />
          </Reveal>
        )}

        <p className="mt-10 text-center text-xs text-stone-500">
          <a
            href="https://www.google.com/search?q=Mavrikios+Jewellery+Boutique+Latsia+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="veil-underline"
          >
            Find our reviews on Google
          </a>
        </p>
      </div>
    </section>
  );
}
