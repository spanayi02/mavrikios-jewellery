import Image from "next/image";
import { cn } from "@/lib/utils";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import type { ProductImage } from "@/types/product";

interface ProductMediaProps {
  image: ProductImage;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/** Renders real photography when supplied, otherwise the brand placeholder art. */
export function ProductMedia({ image, className, sizes, priority }: ProductMediaProps) {
  if (image.src) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
        className={cn("object-cover", className)}
      />
    );
  }
  return (
    <div className={cn("absolute inset-0", className)}>
      <PlaceholderArt motif={image.placeholder} tone={image.tone} />
    </div>
  );
}
