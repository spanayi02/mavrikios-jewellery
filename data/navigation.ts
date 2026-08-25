import type { PlaceholderMotif } from "@/types/product";

export interface NavLink {
  label: string;
  href: string;
}

export interface MegaMenuLink extends NavLink {
  motif: PlaceholderMotif;
}

export const primaryNav: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/shop" },
  { label: "Engagement", href: "/engagement" },
  { label: "Bespoke", href: "/bespoke" },
  { label: "Services", href: "/services" },
  { label: "Our Story", href: "/our-story" },
];

export const megaMenu: { shop: MegaMenuLink[]; jewellery: MegaMenuLink[]; moments: MegaMenuLink[] } = {
  shop: [
    { label: "New Arrivals", href: "/shop?sort=newest", motif: "necklace" },
    { label: "Best Sellers", href: "/shop?filter=bestseller", motif: "ring" },
    { label: "All Jewellery", href: "/shop", motif: "bracelet" },
  ],
  jewellery: [
    { label: "Rings", href: "/shop?category=rings", motif: "ring" },
    { label: "Earrings", href: "/shop?category=earrings", motif: "earring" },
    { label: "Necklaces", href: "/shop?category=necklaces", motif: "necklace" },
    { label: "Bracelets", href: "/shop?category=bracelets", motif: "bracelet" },
  ],
  moments: [
    { label: "Engagement", href: "/engagement", motif: "monopetra" },
    { label: "Bespoke", href: "/bespoke", motif: "ring" },
    { label: "Gifts", href: "/shop?collection=gifts", motif: "gift" },
  ],
};
