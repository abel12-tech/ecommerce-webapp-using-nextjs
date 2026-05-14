import { apiUrl, API_CONFIG } from "@/lib/config";
import { slugify } from "@/lib/utils";
import type { Category, CategoryWithSlug } from "@/types/category";

// fetch all category strings from FakeStoreAPI
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(apiUrl("/products/categories"), {
    next: { revalidate: API_CONFIG.revalidate },
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

// return categories with their URL slugs attached
export async function getCategoriesWithSlugs(): Promise<CategoryWithSlug[]> {
  const categories = await getCategories();
  return categories.map((name) => ({
    name,
    slug: encodeURIComponent(name), // preserve apostrophes safely in URL
  }));
}

// get a single category name from a URL slug
// we encode the name as the slug so this is just a decode
export function categoryFromSlug(slug: string): string {
  return decodeURIComponent(slug);
}

// get all slugs — used by generateStaticParams
export async function getAllCategorySlugs(): Promise<string[]> {
  const categories = await getCategories();
  return categories.map((name) => encodeURIComponent(name));
}