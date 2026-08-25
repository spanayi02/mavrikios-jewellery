const eurFormatterWhole = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const eurFormatterFraction = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formats EUR prices, only showing decimals when they are meaningful (e.g. €149.50). */
export function formatPrice(amount: number): string {
  const hasFraction = Math.round(amount * 100) % 100 !== 0;
  return hasFraction ? eurFormatterFraction.format(amount) : eurFormatterWhole.format(amount);
}

export function formatPriceRange(min: number, max: number): string {
  if (min === max) return formatPrice(min);
  return `${formatPrice(min)} – ${formatPrice(max)}`;
}
