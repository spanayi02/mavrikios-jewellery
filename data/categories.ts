import type { PlaceholderMotif, ProductCategory, ProductCollection } from "@/types/product";

export interface CategoryCard {
  key: string;
  title: string;
  description: string;
  href: string;
  motif: PlaceholderMotif;
  filter?: { category?: ProductCategory; collection?: ProductCollection };
}

export const shopCategories: CategoryCard[] = [
  {
    key: "rings",
    title: "Rings",
    description: "Solitaires, bands and signets, worn one at a time or stacked.",
    href: "/shop?category=rings",
    motif: "ring",
    filter: { category: "rings" },
  },
  {
    key: "earrings",
    title: "Earrings",
    description: "Studs, hoops and drops for everyday and evening.",
    href: "/shop?category=earrings",
    motif: "earring",
    filter: { category: "earrings" },
  },
  {
    key: "necklaces",
    title: "Necklaces",
    description: "Pendants and chains, layered or worn alone.",
    href: "/shop?category=necklaces",
    motif: "necklace",
    filter: { category: "necklaces" },
  },
  {
    key: "bracelets",
    title: "Bracelets",
    description: "Fine chains and statement lines for the wrist.",
    href: "/shop?category=bracelets",
    motif: "bracelet",
    filter: { category: "bracelets" },
  },
  {
    key: "engagement",
    title: "Engagement",
    description: "The monopetra and beyond — made to order around your stone.",
    href: "/engagement",
    motif: "monopetra",
  },
  {
    key: "gifts",
    title: "Gifts",
    description: "Considered pieces for the people you celebrate.",
    href: "/shop?collection=gifts",
    motif: "gift",
    filter: { collection: "gifts" },
  },
];
