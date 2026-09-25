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

interface BusinessProfile {
  /** Short name, used for the wordmark and every "Welcome to X" style mention. */
  name: string;
  /** Founding year, shown as "Since <year>" across the site. */
  since: number;
  url: string;
  phone: string;
  phoneHref: string;
  email: string;
  instagram: string;
  instagramHandle: string;
  address: {
    line1: string;
    /** Suburb. Appears in copy on its own ("our <line2> boutique"), not just in the address block. */
    line2: string;
    city: string;
    postalCode: string;
    country: string;
    countryCode: string;
  };
  geo: { latitude: number; longitude: number };
}

/**
 * The real boutique. Restore it by pointing `activeProfile` below at this object, and nothing
 * else in the codebase has to change.
 */
const mavrikios: BusinessProfile = {
  name: "Mavrikios",
  since: 1967,
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
  geo: { latitude: 35.1219, longitude: 33.3419 },
};

/**
 * A stand-in identity for showing the build publicly while the engagement is unsigned. A demo
 * carrying a real business's name, phone, address and Instagram is a claim about them, so none
 * of that is rendered while this profile is active.
 *
 * **Every value here is invented and none of it is contactable on purpose.** The phone sits in
 * an unallocated Cyprus range, the email uses `.example`, which IANA reserves so it can never be
 * registered by anyone, the address is a made-up street in a different suburb, and the
 * coordinates are the generic centre of Nicosia rather than any shop. The Instagram link goes to
 * instagram.com itself rather than to a `zafiri.jewellery` profile, because that handle may well
 * belong to a real person and a demo must not send traffic at a stranger's account. Do not treat
 * any of it as real, and do not "improve" it into something that looks contactable.
 */
const zafiri: BusinessProfile = {
  name: "Zafiri",
  since: 1984,
  url: "https://zafiri-jewellery.example.com",
  phone: "+357 22 000000",
  phoneHref: "tel:+35722000000",
  email: "hello@zafiri.example",
  instagram: "https://www.instagram.com/",
  instagramHandle: "@zafiri.jewellery",
  address: {
    line1: "8 Anemonis Street",
    line2: "Strovolos",
    city: "Nicosia",
    postalCode: "2015",
    country: "Cyprus",
    countryCode: "CY",
  },
  geo: { latitude: 35.1856, longitude: 33.3823 },
};

/** Both identities, so the inactive one is a real export rather than dead code. */
export const businessProfiles = { mavrikios, zafiri } as const;

/**
 * The one switch. `zafiri` anonymises the whole site, `mavrikios` puts the real boutique back.
 * Every user-visible mention of the business on every page, plus the OG image, the sitemap host
 * and the LocalBusiness structured data, is derived from whichever is selected here, so there is
 * nothing else to find and change.
 */
const activeProfile: BusinessProfile = businessProfiles.zafiri;

const fullName = `${activeProfile.name} Jewellery Boutique`;

export const siteConfig = {
  ...activeProfile,
  fullName,
  tagline: "Jewellery made to become part of your story.",
  description: `${fullName} in ${activeProfile.address.line2}, ${activeProfile.address.city}. Fine jewellery, engagement rings and bespoke pieces, handled with care since ${activeProfile.since}.`,
  hours,
  currency: "EUR" as const,
} as const;
