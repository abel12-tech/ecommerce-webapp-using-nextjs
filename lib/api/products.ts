import { apiUrl, API_CONFIG } from "@/lib/config";
import type { Product } from "@/types/product";

// fetch all products — optionally limit how many
export async function getProducts(limit?: number): Promise<Product[]> {
  const url = limit
    ? apiUrl(`/products?limit=${limit}`)
    : apiUrl("/products");

  const res = await fetch(url, {
    next: { revalidate: API_CONFIG.revalidate },
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// fetch a single product by id
export async function getProductById(id: number | string): Promise<Product> {
  const res = await fetch(apiUrl(`/products/${id}`), {
    next: { revalidate: API_CONFIG.revalidate },
  });

  if (!res.ok) throw new Error(`Product ${id} not found`);
  return res.json();
}

// fetch all products in a category
export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const res = await fetch(
    apiUrl(`/products/category/${encodeURIComponent(category)}`),
    { next: { revalidate: API_CONFIG.revalidate } }
  );

  if (!res.ok) throw new Error(`Failed to fetch products for ${category}`);
  return res.json();
}

// fetch products sorted by price
export async function getProductsSorted(
  order: "asc" | "desc" = "asc"
): Promise<Product[]> {
  const res = await fetch(apiUrl(`/products?sort=${order}`), {
    next: { revalidate: API_CONFIG.revalidate },
  });

  if (!res.ok) throw new Error("Failed to fetch sorted products");
  return res.json();
}

// search products by title — FakeStoreAPI has no search endpoint
// so we fetch all and filter locally
export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getProducts();
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

// get all product ids — used by generateStaticParams
export async function getAllProductIds(): Promise<number[]> {
  const products = await getProducts();
  return products.map((p) => p.id);
}