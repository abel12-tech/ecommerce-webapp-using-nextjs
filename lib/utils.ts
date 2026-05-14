// format a number as USD price
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

// turn a category string into a URL slug
// "men's clothing" → "mens-clothing"
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// reverse a slug back to a category name for API calls
// "mens-clothing" → "men's clothing"
// Note: FakeStoreAPI needs the original string, so we store it in the URL encoded
export function unslugify(slug: string): string {
  return decodeURIComponent(slug);
}

// clamp a string to a max length with ellipsis
export function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max).trimEnd() + "…" : str;
}

// calculate the discounted price (useful for fake sale badges)
export function discountedPrice(price: number, pct: number): number {
  return parseFloat((price * (1 - pct / 100)).toFixed(2));
}