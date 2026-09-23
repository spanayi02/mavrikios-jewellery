import type { PlaceholderMotif } from "@/types/product";

export interface NavLink {
  label: string;
  href: string;
}

export interface MegaMenuLink extends NavLink {
  motif: PlaceholderMotif;
  /** Real photo shown in the mega menu preview panel when this link is hovered. */
  image?: string;
}

export const primaryNav: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Engagement", href: "/engagement" },
  { label: "Bespoke", href: "/bespoke" },
  { label: "Services", href: "/services" },
  { label: "Our Story", href: "/our-story" },
];

/**
 * Index of the one nav item matching the current path, or -1.
 *
 * Index-based, not `item.href === pathname` per item, on purpose. "Collections" used to sit
 * beside "Shop" pointing at the same `/shop`, so on that page both lit up: two underlines and,
 * worse, two `aria-current="page"` links, which tells a screen reader the page is in two places
 * at once. The duplicate entry is gone (the mega menu under "Shop" already surfaces the
 * collections), and resolving to a single index means a future duplicate href can't bring the
 * double highlight back.
 */
export function activeNavIndex(pathname: string): number {
  return primaryNav.findIndex((item) => item.href === pathname);
}

export const megaMenu: { shop: MegaMenuLink[]; jewellery: MegaMenuLink[]; moments: MegaMenuLink[] } = {
  shop: [
    { label: "New Arrivals", href: "/shop?sort=newest", motif: "necklace", image: "/images/products/calliope-fog-veil-necklace.jpg" },
    { label: "Best Sellers", href: "/shop?filter=bestseller", motif: "ring", image: "/images/products/aliki-solitaire-ring-1.jpg" },
    { label: "All Jewellery", href: "/shop", motif: "bracelet", image: "/images/products/sophia-eternity-band.jpg" },
  ],
  jewellery: [
    { label: "Rings", href: "/shop?category=rings", motif: "ring", image: "/images/products/daphne-signet-ring.jpg" },
    { label: "Earrings", href: "/shop?category=earrings", motif: "earring", image: "/images/products/kite-drop-earrings.jpg" },
    { label: "Necklaces", href: "/shop?category=necklaces", motif: "necklace", image: "/images/products/irini-layered-necklace.jpg" },
    { label: "Bracelets", href: "/shop?category=bracelets", motif: "bracelet", image: "/images/products/orion-curb-chain-bracelet.jpg" },
  ],
  moments: [
    { label: "Engagement", href: "/engagement", motif: "monopetra", image: "/images/products/aliki-solitaire-ring-1.jpg" },
    { label: "Bespoke", href: "/bespoke", motif: "ring", image: "/images/products/ruby-emerald-swirl-ring.jpg" },
    { label: "Gifts", href: "/shop?collection=gifts", motif: "gift", image: "/images/products/aquamarine-bezel-ring.jpg" },
  ],
};
