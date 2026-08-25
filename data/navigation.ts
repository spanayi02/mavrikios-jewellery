export interface NavLink {
  label: string;
  href: string;
}

export const primaryNav: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/shop" },
  { label: "Engagement", href: "/engagement" },
  { label: "Bespoke", href: "/bespoke" },
  { label: "Services", href: "/services" },
  { label: "Our Story", href: "/our-story" },
];

export const megaMenu = {
  shop: [
    { label: "New Arrivals", href: "/shop?sort=newest" },
    { label: "Best Sellers", href: "/shop?filter=bestseller" },
    { label: "All Jewellery", href: "/shop" },
  ],
  jewellery: [
    { label: "Rings", href: "/shop?category=rings" },
    { label: "Earrings", href: "/shop?category=earrings" },
    { label: "Necklaces", href: "/shop?category=necklaces" },
    { label: "Bracelets", href: "/shop?category=bracelets" },
  ],
  moments: [
    { label: "Engagement", href: "/engagement" },
    { label: "Bespoke", href: "/bespoke" },
    { label: "Gifts", href: "/shop?collection=gifts" },
  ],
};
