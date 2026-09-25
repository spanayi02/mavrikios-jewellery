import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { Reveal, RevealItem } from "@/components/site/reveal";

export function CraftServices() {
  const featured = services.slice(0, 4);
  return (
    <section className="bg-bone-100 py-24 sm:py-32">
      <div className="container-boutique">
        <Reveal className="mb-12 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-lg text-balance font-serif text-4xl leading-[1.08] text-ink-950 sm:text-5xl">
            A workshop, not just a shop front.
          </h2>
          <Link
            href="/services"
            className="veil-underline text-[13px] font-medium uppercase tracking-[0.12em] text-ink-950"
          >
            All Services
          </Link>
        </Reveal>

        <Reveal stagger={0.06} className="grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2">
          {featured.map((service) => (
            <RevealItem key={service.key}>
              <Link
                href="/services"
                className="group relative flex items-start justify-between gap-4 border-t border-stone-300 py-7"
              >
                {/* The row's own top rule, redrawn in gold and extended on hover. The list is
                    a stack of hairlines, so the hairline is the honest thing to animate: it
                    marks the row being pointed at without moving any of the type. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gold-600 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <div>
                  <p className="font-serif text-2xl text-ink-950">{service.title}</p>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-stone-600">{service.description}</p>
                </div>
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-stone-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-600" />
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
