import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { Reveal, RevealItem } from "@/components/site/reveal";

export function CraftServices() {
  const featured = services.slice(0, 4);
  return (
    <section className="bg-ink-950 py-20 text-marble-50 sm:py-28">
      <div className="container-mavrikios">
        <Reveal className="mb-12 flex flex-col gap-3 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-champagne-400">
              <span className="h-px w-8 bg-champagne-400/70" aria-hidden />
              Craft &amp; Care
            </p>
            <h2 className="max-w-lg font-serif text-3xl italic sm:text-4xl">
              A workshop, not just a shop front.
            </h2>
          </div>
          <Link
            href="/services"
            className="veil-underline text-[13px] font-medium uppercase tracking-[0.12em] text-marble-50"
          >
            All Services
          </Link>
        </Reveal>

        <Reveal stagger={0.06} className="grid grid-cols-1 gap-x-8 gap-y-0 sm:grid-cols-2">
          {featured.map((service) => (
            <RevealItem key={service.key}>
              <Link
                href="/services"
                className="group flex items-start justify-between gap-4 border-t border-marble-50/15 py-6"
              >
                <div>
                  <p className="font-serif text-lg italic">{service.title}</p>
                  <p className="mt-1.5 max-w-xs text-sm text-marble-50/60">{service.description}</p>
                </div>
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-marble-50/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-marble-50" />
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
