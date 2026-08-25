import Link from "next/link";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import { Button } from "@/components/ui/button";

export function EngagementFeature() {
  return (
    <section className="container-mavrikios py-20 sm:py-28">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="relative order-2 aspect-[4/5] overflow-hidden lg:order-1 lg:col-span-6">
          <PlaceholderArt motif="monopetra" label="Engagement" />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-stone-500">Engagement</p>
          <h2 className="max-w-md font-serif text-3xl italic text-ink-950 sm:text-4xl">
            The monopetra, made around your stone.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone-600">
            A single stone, simply set — the classic engagement style, built to order in our
            workshop. Choose your stone, your metal and your setting, and we take care of the
            rest.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/engagement">Discover Engagement</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
