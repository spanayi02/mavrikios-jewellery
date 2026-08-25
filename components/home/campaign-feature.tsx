import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PlaceholderArt } from "@/components/site/placeholder-art";

export function CampaignFeature() {
  return (
    <section className="relative flex min-h-[70vh] w-full items-center overflow-hidden bg-ink-950 sm:min-h-[85vh]">
      <div className="absolute inset-0">
        <PlaceholderArt motif="bracelet" tone="ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/30 to-transparent" />
      </div>
      <div className="container-mavrikios relative z-10 py-20">
        <div className="max-w-md">
          <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-marble-50/60">
            The Mavrikios Edit
          </p>
          <h2 className="font-serif text-4xl italic leading-[1.1] text-marble-50 sm:text-5xl">
            Pieces for the moments that stay.
          </h2>
          <Link
            href="/shop?collection=signature"
            className="group mt-8 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-marble-50"
          >
            Explore the Edit
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
