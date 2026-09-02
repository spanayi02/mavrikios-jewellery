import Link from "next/link";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

const choices = ["Your Stone", "Your Metal", "Your Setting"];

export function EngagementFeature() {
  return (
    <section className="container-mavrikios py-20 sm:py-28">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal y={0} className="relative order-2 aspect-[4/5] lg:order-1 lg:col-span-6">
          <div className="absolute inset-0 right-10 top-10 overflow-hidden">
            <PlaceholderArt motif="monopetra" label="Engagement" />
          </div>
          <div className="absolute bottom-0 left-0 aspect-square w-2/5 overflow-hidden border-4 border-marble-50">
            <PlaceholderArt motif="ring" tone="ink" />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-stone-500">Engagement</p>
          <h2 className="max-w-md font-serif text-3xl italic text-ink-950 sm:text-4xl">
            The monopetra, made around your stone.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone-600">
            A single stone, simply set — the classic Cypriot engagement style, built to order in
            our workshop. Choose your stone, your metal and your setting, and we take care of the
            rest.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {choices.map((choice) => (
              <li key={choice} className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-stone-500">
                <span className="size-1.5 shrink-0 rounded-full bg-champagne-400" aria-hidden />
                {choice}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-8">
            <Link href="/engagement">Discover Engagement</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
