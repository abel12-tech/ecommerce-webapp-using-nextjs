// FakeStoreAPI returns categories as plain strings
export type Category = string;

export type CategoryWithSlug = {
  name: Category;
  slug: string; // URL-safe version e.g. "men's clothing" → "mens-clothing"
};