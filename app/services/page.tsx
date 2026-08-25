import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Jewellery Services",
  description:
    "Jewellery repair, ring resizing, stone setting, engraving, redesign and bespoke commissions at Mavrikios Jewellery Boutique in Nicosia.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Services"
        title="A workshop, not just a shop front."
        description="Our team handles repairs, resizing, setting and bespoke work in-house — the same as we always have."
        motif="gift"
      />

      <section className="container-mavrikios py-20 sm:py-28">
        <div className="grid grid-cols-1 divide-y divide-stone-200 border-t border-stone-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {services.map((service, i) => (
            <div
              key={service.key}
              className={`flex flex-col gap-3 px-0 py-8 sm:px-10 sm:py-12 ${
                i % 2 === 0 ? "sm:pl-0" : ""
              } border-b border-stone-200`}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-stone-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-serif text-2xl italic text-ink-950">{service.title}</h2>
              <p className="max-w-sm text-[15px] leading-relaxed text-stone-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="marble-surface py-20 text-center sm:py-28">
        <div className="container-mavrikios flex flex-col items-center">
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-stone-500">Enquire</p>
          <h2 className="max-w-lg font-serif text-3xl italic text-ink-950 sm:text-4xl">
            Bring your piece in, or send us a note first.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-stone-600">
            Most repairs and resizing can be assessed on the spot in our Latsia boutique. For
            larger commissions, tell us more beforehand.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact?reason=repair">Enquire About a Repair</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/bespoke">Explore Bespoke</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
