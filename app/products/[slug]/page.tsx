import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ProductGallery } from "@/components/commerce/product-gallery";
import { PurchasePanel } from "@/components/commerce/purchase-panel";
import { ProductInfoAccordion } from "@/components/commerce/product-info-accordion";
import { RelatedProducts } from "@/components/commerce/related-products";
import { StickyAddToBag } from "@/components/commerce/sticky-add-to-bag";
import { JsonLd } from "@/components/site/json-ld";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/data/products";
import { categoryLabels } from "@/lib/product-labels";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.seo.title,
    description: product.seo.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Shop", path: "/shop" },
    { name: categoryLabels[product.category], path: `/shop?category=${product.category}` },
    { name: product.name, path: `/products/${product.slug}` },
  ]);

  return (
    <div>
      <JsonLd data={productJsonLd(product)} />
      <JsonLd data={breadcrumb} />

      <nav aria-label="Breadcrumb" className="container-mavrikios flex items-center gap-1.5 py-5 text-xs text-stone-500">
        <Link href="/shop" className="hover:text-ink-950">
          Shop
        </Link>
        <ChevronRight className="size-3" />
        <Link href={`/shop?category=${product.category}`} className="hover:text-ink-950">
          {categoryLabels[product.category]}
        </Link>
        <ChevronRight className="size-3" />
        <span className="text-ink-950">{product.name}</span>
      </nav>

      <div className="container-mavrikios grid grid-cols-1 gap-10 pb-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} productName={product.name} />
        <div id="purchase-panel" className="lg:sticky lg:top-28 lg:self-start">
          <PurchasePanel product={product} />
          <ProductInfoAccordion product={product} />
        </div>
      </div>

      <StickyAddToBag product={product} />
      <RelatedProducts products={related} />
    </div>
  );
}
