import type { Product } from "@/types/product";

/**
 * Demo catalogue for development. This is sample data only — not verified
 * Mavrikios inventory. Replace with the real catalogue by keeping this
 * same `Product` shape (see types/product.ts).
 */
export const products: Product[] = [
  {
    id: "p-01",
    slug: "aliki-solitaire-ring",
    name: "Aliki Solitaire Ring",
    shortDescription: "A single brilliant-cut diamond set in a fine 18k gold band.",
    description:
      "The Aliki is built around one principle: let the stone speak. A brilliant-cut diamond is raised on a delicate claw setting above a fine, softly tapered 18k gold band — a solitaire designed to be worn every day, not just admired on occasion.",
    details: [
      "18k yellow gold band",
      "Brilliant-cut diamond, claw set",
      "Band width: 1.6mm",
      "Made to order in Cyprus sizes 48–62",
    ],
    care: [
      "Store separately in a soft pouch to avoid scratching",
      "Avoid contact with perfume, chlorine and household chemicals",
      "Bring in for a complimentary check and polish annually",
    ],
    price: 890,
    currency: "EUR",
    category: "rings",
    collections: ["engagement", "signature"],
    material: "18k-yellow-gold",
    stone: "diamond",
    images: [
      { alt: "Aliki Solitaire Ring, front view on marble", placeholder: "ring" },
      { alt: "Aliki Solitaire Ring, detail of the claw setting", placeholder: "ring", tone: "ink" },
    ],
    variants: [
      { id: "48", label: "48", available: true },
      { id: "50", label: "50", available: true },
      { id: "52", label: "52", available: true },
      { id: "54", label: "54", available: true },
      { id: "56", label: "56", available: false },
    ],
    variantLabel: "Ring Size",
    availability: "made-to-order",
    featured: true,
    bestSeller: true,
    createdAt: "2025-11-02",
    seo: {
      title: "Aliki Solitaire Ring — 18k Gold & Diamond",
      description:
        "A brilliant-cut diamond solitaire in 18k gold. Made to order in Cyprus, delivered by Mavrikios Jewellery Boutique.",
    },
  },
  {
    id: "p-02",
    slug: "selene-pearl-drop-earrings",
    name: "Selene Pearl Drop Earrings",
    shortDescription: "Freshwater pearls suspended from polished gold hooks.",
    description:
      "Named for the quiet light of the moon, Selene pairs a single freshwater pearl with a slim polished gold hook. Light enough for daily wear, considered enough for evening.",
    details: [
      "18k gold-plated sterling silver hooks",
      "Genuine freshwater pearls, 8mm",
      "Drop length: 2.4cm",
      "Sold as a pair",
    ],
    care: [
      "Wipe pearls with a soft, dry cloth after wear",
      "Keep away from perfume and hairspray",
      "Store flat, away from other jewellery",
    ],
    price: 145,
    currency: "EUR",
    category: "earrings",
    collections: ["gifts", "everyday"],
    material: "18k-yellow-gold",
    stone: "pearl",
    images: [
      { alt: "Selene Pearl Drop Earrings laid on stone", placeholder: "earring" },
      { alt: "Selene Pearl Drop Earrings, close detail", placeholder: "earring", tone: "ink" },
    ],
    availability: "in-stock",
    createdAt: "2026-06-14",
    seo: {
      title: "Selene Pearl Drop Earrings — Gold & Freshwater Pearl",
      description: "Freshwater pearl drop earrings on polished gold hooks, from Mavrikios Jewellery Boutique.",
    },
  },
  {
    id: "p-03",
    slug: "nicosia-fine-chain-bracelet",
    name: "Nicosia Fine Chain Bracelet",
    shortDescription: "A fine cable-link chain with a hidden clasp.",
    description:
      "A quietly confident everyday chain, sized to sit close to the wrist. The clasp is set to disappear into the line of the chain, so the bracelet reads as one unbroken thread of gold.",
    details: [
      "9k yellow gold",
      "Cable-link chain, 1.2mm",
      "Length: 17cm with 2cm extender",
      "Lobster clasp",
    ],
    care: [
      "Remove before swimming or bathing",
      "Clean gently with a jewellery cloth",
      "Have the clasp checked periodically by our workshop",
    ],
    price: 210,
    currency: "EUR",
    category: "bracelets",
    collections: ["everyday", "gifts"],
    material: "9k-yellow-gold",
    stone: "none",
    images: [
      { alt: "Nicosia Fine Chain Bracelet on the wrist", placeholder: "bracelet" },
      { alt: "Nicosia Fine Chain Bracelet, clasp detail", placeholder: "bracelet", tone: "ink" },
    ],
    availability: "in-stock",
    bestSeller: true,
    createdAt: "2025-09-20",
    seo: {
      title: "Nicosia Fine Chain Bracelet — 9k Gold",
      description: "A fine 9k gold cable-link bracelet for everyday wear, from Mavrikios Jewellery Boutique.",
    },
  },
  {
    id: "p-04",
    slug: "vasso-halo-ring",
    name: "Vasso Halo Ring",
    shortDescription: "A central diamond framed by a halo of smaller stones.",
    description:
      "Vasso takes a central brilliant-cut diamond and surrounds it with a fine halo, giving the stone more presence without adding visual weight. Set in 18k white gold for a cool, bright finish.",
    details: [
      "18k white gold band",
      "Central diamond with diamond halo",
      "Total carat weight: demo specification",
      "Made to order in Cyprus sizes 48–62",
    ],
    care: [
      "Store separately in a soft pouch",
      "Avoid impact against hard surfaces",
      "Bring in annually for a claw check",
    ],
    price: 1450,
    currency: "EUR",
    category: "rings",
    collections: ["engagement", "signature"],
    material: "18k-white-gold",
    stone: "diamond",
    images: [
      { alt: "Vasso Halo Ring, front view", placeholder: "ring" },
      { alt: "Vasso Halo Ring, side profile", placeholder: "ring", tone: "ink" },
    ],
    variants: [
      { id: "48", label: "48", available: true },
      { id: "50", label: "50", available: true },
      { id: "52", label: "52", available: true },
      { id: "54", label: "54", available: true },
    ],
    variantLabel: "Ring Size",
    availability: "made-to-order",
    featured: true,
    createdAt: "2025-12-01",
    seo: {
      title: "Vasso Halo Ring — 18k White Gold & Diamond Halo",
      description: "A diamond halo engagement ring in 18k white gold, made to order by Mavrikios Jewellery Boutique.",
    },
  },
  {
    id: "p-05",
    slug: "ianthe-huggie-hoops",
    name: "Ianthe Huggie Hoops",
    shortDescription: "Slim gold huggie hoops for everyday stacking.",
    description:
      "Small, close-fitting hoops that sit comfortably against the ear — the kind of earring you forget you're wearing until the light catches the gold.",
    details: [
      "18k yellow gold",
      "Diameter: 10mm",
      "Hinged snap closure",
      "Sold as a pair",
    ],
    care: [
      "Wipe clean with a soft cloth",
      "Avoid harsh chemicals and chlorinated water",
    ],
    price: 165,
    currency: "EUR",
    category: "earrings",
    collections: ["everyday"],
    material: "18k-yellow-gold",
    stone: "none",
    images: [
      { alt: "Ianthe Huggie Hoops on marble", placeholder: "earring" },
      { alt: "Ianthe Huggie Hoops worn detail", placeholder: "earring", tone: "ink" },
    ],
    availability: "in-stock",
    isNew: true,
    createdAt: "2026-07-01",
    seo: {
      title: "Ianthe Huggie Hoops — 18k Gold",
      description: "Slim 18k gold huggie hoop earrings, from Mavrikios Jewellery Boutique.",
    },
  },
  {
    id: "p-06",
    slug: "calliope-pendant-necklace",
    name: "Calliope Pendant Necklace",
    shortDescription: "A single diamond pendant on a fine trace chain.",
    description:
      "A single stone, a fine chain, nothing else required. Calliope is designed to be worn alone or layered beneath heavier pieces without competing for attention.",
    details: [
      "18k white gold trace chain",
      "Single brilliant-cut diamond pendant",
      "Chain length: 42cm with 4cm extender",
    ],
    care: [
      "Remove before sleeping or exercising",
      "Store flat to prevent tangling",
      "Clean with a soft jewellery cloth",
    ],
    price: 520,
    currency: "EUR",
    category: "necklaces",
    collections: ["signature", "gifts"],
    material: "18k-white-gold",
    stone: "diamond",
    images: [
      { alt: "Calliope Pendant Necklace laid flat", placeholder: "necklace" },
      { alt: "Calliope Pendant Necklace, pendant detail", placeholder: "necklace", tone: "ink" },
    ],
    availability: "in-stock",
    featured: true,
    isNew: true,
    createdAt: "2025-10-11",
    seo: {
      title: "Calliope Pendant Necklace — 18k White Gold & Diamond",
      description: "A single diamond pendant on a fine 18k white gold chain, from Mavrikios Jewellery Boutique.",
    },
  },
  {
    id: "p-07",
    slug: "monopetra-classic-ring",
    name: "Monopetra Classic Ring",
    shortDescription: "The traditional single-stone engagement ring, made to order.",
    description:
      "The monopetra — a single stone, simply set — remains the most requested engagement style in Cyprus. Ours is built to order around the stone you choose, in the metal and finish you prefer.",
    details: [
      "18k gold, yellow, white or rose",
      "Central stone chosen at consultation",
      "Made to order in our workshop",
      "Cyprus sizing 46–64",
    ],
    care: [
      "Store separately from other rings",
      "Remove before manual work or sport",
      "Annual check and polish recommended",
    ],
    price: 990,
    compareAtPrice: undefined,
    currency: "EUR",
    category: "rings",
    collections: ["engagement"],
    material: "18k-yellow-gold",
    stone: "diamond",
    images: [
      { alt: "Monopetra Classic Ring on ring cushion", placeholder: "ring" },
      { alt: "Monopetra Classic Ring, profile view", placeholder: "ring", tone: "ink" },
    ],
    variantLabel: "Ring Size",
    availability: "made-to-order",
    createdAt: "2025-08-04",
    seo: {
      title: "Monopetra Classic Ring — Made to Order Engagement Ring",
      description:
        "The classic monopetra single-stone engagement ring, made to order by Mavrikios Jewellery Boutique in Cyprus.",
    },
  },
  {
    id: "p-08",
    slug: "daphne-signet-ring",
    name: "Daphne Signet Ring",
    shortDescription: "A modern oval signet in solid 9k gold.",
    description:
      "A softened, oval take on the traditional signet, left bare for engraving or worn plain. Solid through the shank for weight that feels substantial without being heavy.",
    details: [
      "9k yellow gold, solid construction",
      "Oval face: 10mm x 8mm",
      "Engraving available in-store",
    ],
    care: [
      "Solid gold — safe for daily wear",
      "Clean with warm water and a soft brush",
    ],
    price: 260,
    currency: "EUR",
    category: "rings",
    collections: ["everyday", "gifts"],
    material: "9k-yellow-gold",
    stone: "none",
    images: [
      { alt: "Daphne Signet Ring on marble", placeholder: "ring" },
      { alt: "Daphne Signet Ring, engraving face detail", placeholder: "ring", tone: "ink" },
    ],
    variants: [
      { id: "50", label: "50", available: true },
      { id: "52", label: "52", available: true },
      { id: "54", label: "54", available: true },
      { id: "56", label: "56", available: true },
    ],
    variantLabel: "Ring Size",
    availability: "in-stock",
    isNew: true,
    createdAt: "2025-07-22",
    seo: {
      title: "Daphne Signet Ring — 9k Gold",
      description: "A solid 9k gold oval signet ring, engravable in-store at Mavrikios Jewellery Boutique.",
    },
  },
  {
    id: "p-09",
    slug: "eleni-tennis-bracelet",
    name: "Eleni Tennis Bracelet",
    shortDescription: "A continuous line of claw-set diamonds.",
    description:
      "An unbroken line of brilliant-cut diamonds, each individually claw set along an 18k white gold band. A tennis bracelet built for a lifetime of wear, with a secure box clasp and safety catch.",
    details: [
      "18k white gold",
      "Brilliant-cut diamonds, claw set",
      "Length: 18cm",
      "Box clasp with safety catch",
    ],
    care: [
      "Remove before sport or manual work",
      "Bring in annually to check claw settings",
    ],
    price: 2450,
    currency: "EUR",
    category: "bracelets",
    collections: ["signature"],
    material: "18k-white-gold",
    stone: "diamond",
    images: [
      { alt: "Eleni Tennis Bracelet laid straight", placeholder: "bracelet" },
      { alt: "Eleni Tennis Bracelet, stone setting detail", placeholder: "bracelet", tone: "ink" },
    ],
    availability: "made-to-order",
    limited: true,
    createdAt: "2025-11-19",
    seo: {
      title: "Eleni Tennis Bracelet — 18k White Gold & Diamonds",
      description: "A diamond tennis bracelet in 18k white gold, made to order by Mavrikios Jewellery Boutique.",
    },
  },
  {
    id: "p-10",
    slug: "thalia-sapphire-studs",
    name: "Thalia Sapphire Studs",
    shortDescription: "Round sapphires in a simple four-claw setting.",
    description:
      "A quiet flash of blue for everyday wear. The Thalia stud sets a round sapphire in a simple four-claw head, secured with a friction back.",
    details: [
      "18k yellow gold",
      "Round-cut natural sapphire",
      "Butterfly friction backs",
      "Sold as a pair",
    ],
    care: [
      "Clean gently with a soft, damp cloth",
      "Store in the provided pouch",
    ],
    price: 320,
    currency: "EUR",
    category: "earrings",
    collections: ["signature", "gifts"],
    material: "18k-yellow-gold",
    stone: "sapphire",
    images: [
      { alt: "Thalia Sapphire Studs on stone", placeholder: "earring" },
      { alt: "Thalia Sapphire Studs, close-up", placeholder: "earring", tone: "ink" },
    ],
    availability: "in-stock",
    createdAt: "2026-05-30",
    seo: {
      title: "Thalia Sapphire Studs — 18k Gold & Sapphire",
      description: "Round sapphire stud earrings in 18k gold, from Mavrikios Jewellery Boutique.",
    },
  },
  {
    id: "p-11",
    slug: "irini-layered-necklace",
    name: "Irini Layered Necklace",
    shortDescription: "Two fine chains, one clasp, designed to layer.",
    description:
      "Two chains of different lengths, joined at a single clasp, so the layered look stays effortless rather than tangled. Wear together or separate the lengths for two everyday pieces.",
    details: [
      "9k yellow gold",
      "Chain lengths: 38cm and 44cm",
      "Detachable double clasp",
    ],
    care: [
      "Store flat to avoid tangling",
      "Remove before swimming",
    ],
    price: 275,
    currency: "EUR",
    category: "necklaces",
    collections: ["everyday"],
    material: "9k-yellow-gold",
    stone: "none",
    images: [
      { alt: "Irini Layered Necklace laid flat", placeholder: "necklace" },
      { alt: "Irini Layered Necklace, clasp detail", placeholder: "necklace", tone: "ink" },
    ],
    availability: "in-stock",
    bestSeller: true,
    createdAt: "2025-06-15",
    seo: {
      title: "Irini Layered Necklace — 9k Gold",
      description: "A layered double-chain necklace in 9k gold, from Mavrikios Jewellery Boutique.",
    },
  },
  {
    id: "p-12",
    slug: "sophia-eternity-band",
    name: "Sophia Eternity Band",
    shortDescription: "A full circle of pavé-set diamonds.",
    description:
      "A continuous band of pavé-set diamonds, worn alone as a statement or stacked alongside an engagement ring. The eternity band is finished flush for comfortable everyday wear.",
    details: [
      "18k white gold",
      "Pavé-set diamonds, full eternity",
      "Band width: 2mm",
      "Made to order in Cyprus sizes 46–62",
    ],
    care: [
      "Store separately to avoid surface wear",
      "Bring in annually to check pavé settings",
    ],
    price: 1180,
    currency: "EUR",
    category: "rings",
    collections: ["engagement", "signature"],
    material: "18k-white-gold",
    stone: "diamond",
    images: [
      { alt: "Sophia Eternity Band, full circle view", placeholder: "ring" },
      { alt: "Sophia Eternity Band, pavé detail", placeholder: "ring", tone: "ink" },
    ],
    variantLabel: "Ring Size",
    availability: "made-to-order",
    createdAt: "2025-09-02",
    seo: {
      title: "Sophia Eternity Band — 18k White Gold & Diamond Pavé",
      description: "A full pavé diamond eternity band in 18k white gold, made to order by Mavrikios Jewellery Boutique.",
    },
  },
  {
    id: "p-13",
    slug: "melina-baguette-bracelet",
    name: "Melina Baguette Bracelet",
    shortDescription: "Emerald-cut zirconia baguettes in a delicate line.",
    description:
      "A refined evening bracelet: emerald-cut baguettes set edge to edge along a fine 18k gold-plated band, catching the light with every movement of the wrist.",
    details: [
      "18k gold-plated sterling silver",
      "Baguette-cut cubic zirconia",
      "Length: 17.5cm",
      "Box clasp",
    ],
    care: [
      "Avoid moisture and perfume contact",
      "Store in the provided pouch away from other pieces",
    ],
    price: 195,
    currency: "EUR",
    category: "bracelets",
    collections: ["gifts", "everyday"],
    material: "sterling-silver",
    stone: "zirconia",
    images: [
      { alt: "Melina Baguette Bracelet laid flat", placeholder: "bracelet" },
      { alt: "Melina Baguette Bracelet, stone line detail", placeholder: "bracelet", tone: "ink" },
    ],
    availability: "in-stock",
    isNew: true,
    createdAt: "2025-12-20",
    seo: {
      title: "Melina Baguette Bracelet — Silver & Baguette Stones",
      description: "A baguette-cut stone line bracelet in gold-plated silver, from Mavrikios Jewellery Boutique.",
    },
  },
  {
    id: "p-14",
    slug: "kyveli-emerald-pendant",
    name: "Kyveli Emerald Pendant",
    shortDescription: "An emerald-cut stone set in a bezel of 18k gold.",
    description:
      "A deep green emerald-cut stone, fully wrapped in a bezel setting for both protection and a clean architectural line. Suspended from a fine cable chain.",
    details: [
      "18k yellow gold bezel setting",
      "Emerald-cut green stone",
      "Chain length: 45cm",
    ],
    care: [
      "Avoid knocks against hard surfaces",
      "Clean with a soft, dry cloth",
    ],
    price: 610,
    currency: "EUR",
    category: "necklaces",
    collections: ["signature"],
    material: "18k-yellow-gold",
    stone: "emerald",
    images: [
      { alt: "Kyveli Emerald Pendant on marble", placeholder: "necklace" },
      { alt: "Kyveli Emerald Pendant, bezel detail", placeholder: "necklace", tone: "ink" },
    ],
    availability: "in-stock",
    limited: true,
    createdAt: "2025-10-28",
    seo: {
      title: "Kyveli Emerald Pendant — 18k Gold & Emerald",
      description: "An emerald-cut stone pendant in an 18k gold bezel setting, from Mavrikios Jewellery Boutique.",
    },
  },
  {
    id: "p-15",
    slug: "athina-drop-earrings",
    name: "Athina Ruby Drop Earrings",
    shortDescription: "A ruby drop suspended beneath a diamond stud.",
    description:
      "A diamond stud at the ear, a ruby drop below it — Athina is built for evenings that ask for a little more colour without losing restraint.",
    details: [
      "18k yellow gold",
      "Diamond stud with detachable ruby drop",
      "Drop length: 2.8cm",
      "Sold as a pair",
    ],
    care: [
      "Detach drops for everyday stud wear",
      "Store in the provided pouch",
    ],
    price: 780,
    currency: "EUR",
    category: "earrings",
    collections: ["signature", "gifts"],
    material: "18k-yellow-gold",
    stone: "ruby",
    images: [
      { alt: "Athina Ruby Drop Earrings on stone", placeholder: "earring" },
      { alt: "Athina Ruby Drop Earrings, detachable drop detail", placeholder: "earring", tone: "ink" },
    ],
    availability: "in-stock",
    bestSeller: true,
    createdAt: "2025-11-30",
    seo: {
      title: "Athina Ruby Drop Earrings — 18k Gold, Diamond & Ruby",
      description: "Diamond stud earrings with detachable ruby drops in 18k gold, from Mavrikios Jewellery Boutique.",
    },
  },
  {
    id: "p-16",
    slug: "orion-curb-chain-bracelet",
    name: "Orion Curb Chain Bracelet",
    shortDescription: "A substantial curb-link chain in solid gold.",
    description:
      "A confident, masculine-leaning curb chain with real weight in the hand. Solid 9k gold construction, finished with a secure lobster clasp.",
    details: [
      "9k yellow gold, solid construction",
      "Curb-link chain, 5mm",
      "Length: 21cm",
    ],
    care: [
      "Solid gold — durable for daily wear",
      "Clean periodically with warm soapy water",
    ],
    price: 340,
    currency: "EUR",
    category: "bracelets",
    collections: ["everyday", "gifts"],
    material: "9k-yellow-gold",
    stone: "none",
    images: [
      { alt: "Orion Curb Chain Bracelet on marble", placeholder: "bracelet" },
      { alt: "Orion Curb Chain Bracelet, link detail", placeholder: "bracelet", tone: "ink" },
    ],
    availability: "in-stock",
    createdAt: "2025-08-17",
    seo: {
      title: "Orion Curb Chain Bracelet — 9k Gold",
      description: "A solid 9k gold curb-link chain bracelet, from Mavrikios Jewellery Boutique.",
    },
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.bestSeller);
}

export function getNewArrivals(): Product[] {
  return [...products]
    .filter((p) => p.isNew)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getEngagementProducts(): Product[] {
  return products.filter((p) => p.collections.includes("engagement"));
}
