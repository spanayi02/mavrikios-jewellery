"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * A drop-in replacement for next/image that fades the photo in once it actually
 * finishes loading, instead of popping in unstyled.
 *
 * Without this, a lazily-loaded image's container can already be fully visible (its
 * own Reveal/ParallaxLayer entrance done) while the photo underneath is still blank,
 * then snap in the instant it decodes. Scroll past several of these in a row and the
 * page reads as sections flashing on and off, not a soft reveal — confirmed by
 * measuring real load timing under a throttled connection: images kept finishing load
 * 300ms-1.8s after they'd already scrolled into (and sometimes back out of) view.
 *
 * This owns the element's *entire* `transition-property` declaration (opacity, for the
 * fade, plus transform/scale/translate/rotate, for a hover-zoom some callers want)
 * rather than a plain `transition-opacity` class. `transition-property` isn't additive
 * across classes — a caller adding its own `transition-transform` would otherwise fully
 * replace (not combine with) this one via Tailwind's conflict resolution, silently
 * killing the fade. (Tailwind v4 also renders `scale-*`/`translate-*`/`rotate-*` as their
 * own standalone CSS properties, not `transform` — an arbitrary `transition-[opacity,
 * transform]` alone would miss a `group-hover:scale-105`, which is why all four are
 * listed explicitly here rather than just `transform`.) So callers style the hover zoom
 * itself (e.g. `group-hover:scale-105`) but never add their own
 * `transition-*`/`duration-*`/`ease-*` classes to a FadeImage.
 *
 * The `load` event isn't trusted as the only signal: it depends on React having
 * hydrated and attached the listener before the browser's own (React-independent)
 * lazy-loading finishes fetching the photo, which isn't guaranteed on a slow
 * connection — verified directly, this can leave the photo `complete` in the DOM with
 * no `load` event ever reaching React, stuck invisible forever, which is worse than the
 * flash this component exists to fix. A short poll on the underlying element is the
 * fallback net; it's cheap and stops the moment either signal reports loaded.
 */
export function FadeImage({ alt, className, onLoad, priority, ...props }: ImageProps) {
  // Priority images are eagerly fetched for the initial paint, so treat them as
  // already loaded to avoid an unnecessary fade on above-the-fold photos.
  const [loaded, setLoaded] = useState(!!priority);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (loaded) return;
    const id = window.setInterval(() => {
      if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
        setLoaded(true);
      }
    }, 150);
    return () => window.clearInterval(id);
  }, [loaded, props.src]);

  return (
    <Image
      {...props}
      ref={imgRef}
      alt={alt}
      priority={priority}
      className={cn(
        "transition-[opacity,transform,scale,translate,rotate] duration-700 ease-out",
        loaded ? "opacity-100" : "opacity-0",
        className
      )}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
}
