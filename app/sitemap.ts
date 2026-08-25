import type { MetadataRoute } from "next";
import { getAllProducts } from "@/data/products";
import { siteConfig } from "@/lib/site-config";

const staticRoutes = [
  "",
  "/shop",
  "/engagement",
  "/bespoke",
  "/services",
  "/our-story",
  "/contact",
  "/wishlist",
  "/delivery",
  "/returns",
  "/terms",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = getAllProducts().map((product) => ({
    url: `${siteConfig.url}/products/${product.slug}`,
    lastModified: new Date(product.createdAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
