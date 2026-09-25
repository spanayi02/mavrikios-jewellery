export interface StoreHour {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  open?: string;
  close?: string;
  closed?: boolean;
}

const hours: StoreHour[] = [
  { day: "Monday", open: "09:30", close: "18:00" },
  { day: "Tuesday", open: "09:30", close: "18:00" },
  { day: "Wednesday", open: "09:30", close: "18:00" },
  { day: "Thursday", open: "09:30", close: "18:00" },
  { day: "Friday", open: "09:30", close: "19:00" },
  { day: "Saturday", open: "09:30", close: "15:00" },
  { day: "Sunday", closed: true },
];

/**
 * The boutique's short name. Every user-visible mention of the brand on the site (wordmark,
 * page titles, meta descriptions, the footer, the OG image, admin) is derived from this and
 * from `fullName` below, so the whole site can be re-branded from these two lines. That
 * matters while the engagement is not signed: a public demo carrying a real business's name
 * is a claim about them, and this lets it be swapped for a placeholder and swapped back
 * without touching a single component.
 *
 * Note the name alone does not anonymise the site. The phone number, email, Instagram handle,
 * street address and map coordinates below identify the business just as plainly, so change
 * those too if the point is that the demo cannot be traced back.
 */
const name = "Mavrikios";
const fullName = `${name} Jewellery Boutique`;

const address = {
  line1: "Ayiou Georgiou 17C",
  line2: "Latsia",
  city: "Nicosia",
  postalCode: "2231",
  country: "Cyprus",
  countryCode: "CY",
} as const;

export const siteConfig = {
  name,
  fullName,
  since: 1967,
  tagline: "Jewellery made to become part of your story.",
  description: `${fullName} in ${address.line2}, ${address.city}. Fine jewellery, engagement rings and bespoke pieces, handled with care since 1967.`,
  url: "https://mavrikios-jewellery.example.com",
  phone: "+357 22 312564",
  phoneHref: "tel:+35722312564",
  email: "info@mavrikios.com.cy",
  instagram: "https://www.instagram.com/mavrikios.jewellery.boutique",
  instagramHandle: "@mavrikios.jewellery.boutique",
  address,
  geo: {
    latitude: 35.1219,
    longitude: 33.3419,
  },
  hours,
  currency: "EUR" as const,
} as const;
