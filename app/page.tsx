import Link from "next/link";
import type { Metadata } from "next";
import { getProducts } from "@/lib/api/products";
import ProductGrid from "@/components/products/ProductGrid";
import { getCategoriesWithSlugs } from "@/lib/api/categories";
import CategoryCard from "@/components/categories/CategoryCard";

export const metadata: Metadata = {
  title: "NextStore — Home",
  description: "A Next.js e-commerce store powered by FakeStoreAPI.",
};

export default async function Home() {
  const [featured, categories] = await Promise.all([
    getProducts(8),
    getCategoriesWithSlugs(),
  ]);
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="bg-gray-50 rounded-3xl px-8 py-16 text-center mb-12">
        <h1 className="text-4xl font-semibold text-gray-900 mb-3">
          Everything you need
        </h1>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Browse hundreds of products across all categories — electronics,
          clothing, jewellery and more.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors"
        >
          Shop now →
        </Link>
      </div>
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Shop by category</h2>
          <Link
            href="/categories"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
      {/* Featured */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Featured products</h2>
        <Link
          href="/products"
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          View all →
        </Link>
      </div>

      <ProductGrid products={featured} />
    </div>
  );
}
