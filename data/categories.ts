import type { PlaceholderMotif, ProductCategory, ProductCollection } from "@/types/product";

export interface CategoryCard {
  key: string;
  title: string;
  description: string;
  href: string;
  motif: PlaceholderMotif;
  /** Real photo for the category tile. Falls back to the motif placeholder when absent. */
  image?: { src: string; alt: string };
  filter?: { category?: ProductCategory; collection?: ProductCollection };
}

export const shopCategories: CategoryCard[] = [
  {
    key: "rings",
    title: "Rings",
    description: "Solitaires, bands and signets, worn one at a time or stacked.",
    href: "/shop?category=rings",
    motif: "ring",
    image: { src: "/images/products/daphne-signet-ring.jpg", alt: "A plain 18k gold band" },
    filter: { category: "rings" },
  },
  {
    key: "earrings",
    title: "Earrings",
    description: "Studs, hoops and drops for everyday and evening.",
    href: "/shop?category=earrings",
    motif: "earring",
    image: { src: "/images/products/kite-drop-earrings.jpg", alt: "Gold kite-shaped drop earrings" },
    filter: { category: "earrings" },
  },
  {
    key: "necklaces",
    title: "Necklaces",
    description: "Pendants and chains, layered or worn alone.",
    href: "/shop?category=necklaces",
    motif: "necklace",
    image: { src: "/images/products/pearl-pendant-necklace.jpg", alt: "Gold pendant necklace with a pearl drop" },
    filter: { category: "necklaces" },
  },
  {
    key: "bracelets",
    title: "Bracelets",
    description: "Fine chains and statement lines for the wrist.",
    href: "/shop?category=bracelets",
    motif: "bracelet",
    image: { src: "/images/products/orion-curb-chain-bracelet.jpg", alt: "Gold curb chain bracelet" },
    filter: { category: "bracelets" },
  },
  {
    key: "engagement",
    title: "Engagement",
    description: "The monopetra and beyond, made to order around your stone.",
    href: "/engagement",
    motif: "monopetra",
    image: { src: "/images/products/aliki-solitaire-ring-1.jpg", alt: "Yellow gold solitaire engagement ring" },
  },
  {
    key: "gifts",
    title: "Gifts",
    description: "Considered pieces for the people you celebrate.",
    href: "/shop?collection=gifts",
    motif: "gift",
    image: { src: "/images/products/ruby-emerald-swirl-ring.jpg", alt: "Gold rings set with a ruby and an emerald" },
    filter: { collection: "gifts" },
  },
];
