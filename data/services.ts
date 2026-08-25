export interface ServiceItem {
  key: string;
  title: string;
  description: string;
}

export const services: ServiceItem[] = [
  {
    key: "repair",
    title: "Jewellery Repair",
    description: "Gold, silver and precious jewellery repairs, carried out in our own workshop.",
  },
  {
    key: "resizing",
    title: "Ring Resizing",
    description: "Professional sizing and adjustment, for rings that fit the way they should.",
  },
  {
    key: "stone-setting",
    title: "Stone Setting",
    description: "Replacement and secure setting of stones, from a single claw to a full re-set.",
  },
  {
    key: "cleaning",
    title: "Cleaning & Polishing",
    description: "Restoration of jewellery finish and brilliance, bringing worn pieces back to life.",
  },
  {
    key: "engraving",
    title: "Engraving",
    description: "Personal names, dates, messages and symbols, engraved in-store.",
  },
  {
    key: "redesign",
    title: "Jewellery Redesign",
    description: "Transform existing or inherited jewellery into something new to wear.",
  },
  {
    key: "bespoke",
    title: "Bespoke Jewellery",
    description: "Custom pieces designed and made for the individual, from concept to reveal.",
  },
  {
    key: "assessment",
    title: "Jewellery Assessment",
    description: "In-store assessment and valuation enquiries for your existing pieces.",
  },
];
