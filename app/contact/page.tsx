import type { Metadata } from "next";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";
import { InstagramIcon } from "@/components/site/icons";
import { StoreStatusBadge } from "@/components/site/store-status";
import { Reveal } from "@/components/site/reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mavrikios Jewellery Boutique in Latsia, Nicosia — visit the boutique, call us, or send an enquiry.",
  alternates: { canonical: "/contact" },
};

const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.city}, ${siteConfig.address.country}`
)}`;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;

  return (
    <div className="container-mavrikios py-16 sm:py-24">
      <Reveal className="mb-14 max-w-xl">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-stone-500">Contact</p>
        <h1 className="font-serif text-4xl italic text-ink-950 sm:text-5xl">Get in Touch</h1>
        <p className="mt-5 text-[15px] leading-relaxed text-stone-600">
          Whether it&rsquo;s a question about a piece, a repair, or something bespoke —
          we&rsquo;re happy to help.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
        <Reveal delay={0.1} className="lg:col-span-7">
          <ContactForm initialReason={reason} />
        </Reveal>

        <Reveal delay={0.2} className="space-y-8 lg:col-span-4 lg:col-start-9">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone-500">Visit</p>
            <p className="flex items-start gap-3 text-sm text-ink-950">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>
                {siteConfig.address.line1}, {siteConfig.address.line2}
                <br />
                {siteConfig.address.city} {siteConfig.address.postalCode}, {siteConfig.address.country}
              </span>
            </p>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 pl-7 text-sm text-ink-950 veil-underline"
            >
              <Navigation className="size-3.5" /> Get Directions
            </a>
          </div>

          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone-500">Call</p>
            <a href={siteConfig.phoneHref} className="flex items-center gap-3 text-sm text-ink-950 veil-underline">
              <Phone className="size-4" /> {siteConfig.phone}
            </a>
          </div>

          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone-500">Instagram</p>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-ink-950 veil-underline"
            >
              <InstagramIcon className="size-4" /> {siteConfig.instagramHandle}
            </a>
          </div>

          <div>
            <p className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-500">
              <Clock className="size-3.5" /> Opening Hours
            </p>
            <ul className="space-y-1 text-sm text-stone-600">
              {siteConfig.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-6">
                  <span>{h.day}</span>
                  <span>{h.closed ? "Closed" : `${h.open} – ${h.close}`}</span>
                </li>
              ))}
            </ul>
            <StoreStatusBadge className="mt-3 text-stone-600" />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
