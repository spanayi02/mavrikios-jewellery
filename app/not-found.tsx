import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceholderArt } from "@/components/site/placeholder-art";

export default function NotFound() {
  return (
    <div className="container-mavrikios grid grid-cols-1 items-center gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:gap-8">
      <div className="relative order-2 aspect-[4/5] overflow-hidden lg:order-1 lg:col-span-5">
        <PlaceholderArt motif="ring" label="404" />
      </div>
      <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
        <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-champagne-600">
          <span className="h-px w-8 bg-champagne-400" aria-hidden />
          Page Not Found
        </p>
        <h1 className="max-w-md font-serif text-4xl italic leading-[1.1] text-ink-950 sm:text-5xl">
          This piece isn&rsquo;t where we left it.
        </h1>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone-600">
          The page you&rsquo;re looking for may have moved or no longer exists. Let&rsquo;s get
          you back to the collection.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/">Return Home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/shop">Shop the Collection</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
