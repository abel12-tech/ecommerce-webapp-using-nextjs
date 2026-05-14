import type { Metadata } from "next";
import { getProducts } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import ProductsClient from "@/components/products/ProductsClient";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our full collection of products.",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">All Products</h1>
        <p className="text-gray-500 text-sm">
          {products.length} items across {categories.length} categories
        </p>
      </div>

      <ProductsClient products={products} categories={categories} />
    </div>
  );
}