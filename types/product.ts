export type ProductCategory =
  | "rings"
  | "earrings"
  | "necklaces"
  | "bracelets";

export type ProductCollection =
  | "engagement"
  | "gifts"
  | "signature"
  | "everyday";

export type ProductMaterial =
  | "18k-yellow-gold"
  | "18k-white-gold"
  | "18k-rose-gold"
  | "9k-yellow-gold"
  | "sterling-silver"
  | "platinum";

export type ProductStone =
  | "diamond"
  | "pearl"
  | "sapphire"
  | "emerald"
  | "ruby"
  | "zirconia"
  | "none";

export type PlaceholderMotif =
  | "ring"
  | "earring"
  | "necklace"
  | "bracelet"
  | "gift"
  | "monopetra";

export interface ProductImage {
  /** Real photography path once supplied, e.g. /images/products/slug-1.jpg */
  src?: string;
  alt: string;
  /** Fine-line placeholder shown until real photography is supplied */
  placeholder: PlaceholderMotif;
  tone?: "marble" | "ink";
}

export interface ProductVariant {
  id: string;
  label: string;
  /** e.g. ring size, chain length, additional price delta in EUR */
  priceDelta?: number;
  available: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  details: string[];
  care: string[];
  price: number;
  compareAtPrice?: number;
  currency: "EUR";
  category: ProductCategory;
  collections: ProductCollection[];
  material: ProductMaterial;
  stone: ProductStone;
  images: ProductImage[];
  variants?: ProductVariant[];
  variantLabel?: string;
  availability: "in-stock" | "made-to-order" | "out-of-stock";
  /** Units on hand — informational for made-to-order pieces, tracked for in-stock ones. */
  stockQuantity?: number;
  featured?: boolean;
  isNew?: boolean;
  bestSeller?: boolean;
  limited?: boolean;
  createdAt: string;
  seo: {
    title: string;
    description: string;
  };
}
