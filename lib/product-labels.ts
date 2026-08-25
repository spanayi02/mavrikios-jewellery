import type { ProductCategory, ProductCollection, ProductMaterial, ProductStone } from "@/types/product";

export const categoryLabels: Record<ProductCategory, string> = {
  rings: "Rings",
  earrings: "Earrings",
  necklaces: "Necklaces",
  bracelets: "Bracelets",
};

export const collectionLabels: Record<ProductCollection, string> = {
  engagement: "Engagement",
  gifts: "Gifts",
  signature: "Signature",
  everyday: "Everyday",
};

export const materialLabels: Record<ProductMaterial, string> = {
  "18k-yellow-gold": "18k Yellow Gold",
  "18k-white-gold": "18k White Gold",
  "18k-rose-gold": "18k Rose Gold",
  "9k-yellow-gold": "9k Yellow Gold",
  "sterling-silver": "Sterling Silver",
  platinum: "Platinum",
};

export const stoneLabels: Record<ProductStone, string> = {
  diamond: "Diamond",
  pearl: "Pearl",
  sapphire: "Sapphire",
  emerald: "Emerald",
  ruby: "Ruby",
  zirconia: "Cubic Zirconia",
  none: "No Stone",
};
