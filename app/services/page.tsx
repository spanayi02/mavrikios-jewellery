import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Jewellery Services",
  description:
    `Jewellery repair, ring resizing, stone setting, engraving, redesign and bespoke commissions at ${siteConfig.fullName} in ${siteConfig.address.city}.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Services"
        title="A workshop, not just a shop front."
        description="Our team handles repairs, resizing, setting and bespoke work in-house, the same as we always have."
        motif="gift"
        image={{ src: "/images/products/daphne-signet-ring.jpg", alt: "Plain 18k gold band" }}
      />

      <section className="container-mavrikios py-24 sm:py-32">
        <Reveal stagger={0.06} className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
          {services.map((service) => (
            <RevealItem key={service.key} className="flex flex-col gap-3 border-t border-stone-300 py-9">
              <h2 className="font-serif text-3xl text-ink-950">{service.title}</h2>
              <p className="max-w-sm text-[15px] leading-relaxed text-stone-600">{service.description}</p>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <Reveal as="section" className="marble-surface py-24 text-center sm:py-32">
        <div className="container-mavrikios flex flex-col items-center">
          <h2 className="max-w-lg text-balance font-serif text-4xl leading-[1.08] text-ink-950 sm:text-5xl">
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
      </Reveal>
    </div>
  );
}
