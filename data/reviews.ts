export interface Review {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  source: "Google";
  date: string;
}

/**
 * No verified reviews are wired in yet — we do not fabricate quotes,
 * names or review counts. Drop verified reviews into this array (matching
 * the `Review` shape) to have them replace the themed summary below.
 */
export const reviews: Review[] = [];

export const reviewThemes = [
  "Quality craftsmanship",
  "Beautiful, unique designs",
  "Attentive, personal service",
  "Good value",
  "Friendly staff",
];
