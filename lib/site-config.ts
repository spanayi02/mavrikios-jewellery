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

export const siteConfig = {
  name: "Mavrikios",
  fullName: "Mavrikios Jewellery Boutique",
  since: 1967,
  tagline: "Jewellery made to become part of your story.",
  description:
    "Mavrikios Jewellery Boutique in Latsia, Nicosia — fine jewellery, engagement rings and bespoke pieces, handled with care since 1967.",
  url: "https://mavrikios-jewellery.example.com",
  phone: "+357 22 312564",
  phoneHref: "tel:+35722312564",
  email: "info@mavrikios.com.cy",
  instagram: "https://www.instagram.com/mavrikios.jewellery.boutique",
  instagramHandle: "@mavrikios.jewellery.boutique",
  address: {
    line1: "Ayiou Georgiou 17C",
    line2: "Latsia",
    city: "Nicosia",
    postalCode: "2231",
    country: "Cyprus",
    countryCode: "CY",
  },
  geo: {
    latitude: 35.1219,
    longitude: 33.3419,
  },
  hours,
  currency: "EUR" as const,
} as const;
