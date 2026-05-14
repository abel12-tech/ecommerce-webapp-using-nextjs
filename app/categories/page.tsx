import type { Metadata } from "next";
import { getCategoriesWithSlugs } from "@/lib/api/categories";
import { getProductsByCategory } from "@/lib/api/products";
import CategoryCard from "@/components/categories/CategoryCard";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse all product categories in our store.",
};

export default async function CategoriesPage() {
  const categories = await getCategoriesWithSlugs();

  // fetch product counts per category in parallel
  const counts = await Promise.all(
    categories.map((cat) =>
      getProductsByCategory(cat.name).then((p) => p.length)
    )
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Categories</h1>
        <p className="text-gray-500 text-sm">
          {categories.length} categories to explore
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category, i) => (
          <CategoryCard
            key={category.slug}
            category={category}
            productCount={counts[i]}
          />
        ))}
      </div>
    </div>
  );
}