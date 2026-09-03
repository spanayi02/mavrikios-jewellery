import type { Metadata } from "next";
import { getAllProducts } from "@/lib/data/products";
import { WishlistClient } from "./wishlist-client";

export const metadata: Metadata = {
  title: "Your Wishlist",
  robots: { index: false, follow: true },
};

export default async function WishlistPage() {
  const products = await getAllProducts();
  return <WishlistClient products={products} />;
}
