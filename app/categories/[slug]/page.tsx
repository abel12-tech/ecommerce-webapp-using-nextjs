import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCategorySlugs, categoryFromSlug } from "@/lib/api/categories";
import { getProductsByCategory } from "@/lib/api/products";
import ProductGrid from "@/components/products/ProductGrid";

// pre-build all category pages at deploy time
export async function generateStaticParams() {
  try {
    const slugs = await getAllCategorySlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.warn("Could not fetch category slugs at build time:", error);
    return []; // pages will be generated on first request instead
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryFromSlug(slug);
  return {
    title: category.charAt(0).toUpperCase() + category.slice(1),
    description: `Browse all ${category} products in our store.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categoryFromSlug(slug);

  let products;
  try {
    products = await getProductsByCategory(category);
  } catch {
    notFound();
  }

  if (!products || products.length === 0) notFound();

  // sort options are handled client-side in ProductsClient
  // here we just display the raw list for simplicity
  // you can swap ProductGrid for ProductsClient if you want filters here too

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/categories"
          className="hover:text-gray-600 transition-colors"
        >
          Categories
        </Link>
        <span>/</span>
        <span className="text-gray-600 capitalize">{category}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold capitalize mb-1">
            {category}
          </h1>
          <p className="text-sm text-gray-500">
            {products.length} products in this category
          </p>
        </div>

        <Link
          href="/categories"
          className="text-sm text-gray-500 hover:text-gray-900 border border-gray-200 px-3 py-1.5 rounded-xl hover:border-gray-400 transition-colors"
        >
          ← All categories
        </Link>
      </div>

      {/* Products */}
      <ProductGrid products={products} />

      {/* Cross-links to other categories */}
      <div className="mt-16 border-t border-gray-100 pt-10">
        <h2 className="text-base font-medium text-gray-700 mb-4">
          Continue shopping
        </h2>
        <div className="flex flex-wrap gap-2">
          {["electronics", "jewelery", "men's clothing", "women's clothing"]
            .filter((c) => c !== category)
            .map((c) => (
              <Link
                key={c}
                href={`/categories/${encodeURIComponent(c)}`}
                className="text-sm capitalize border border-gray-200 px-4 py-1.5 rounded-xl text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
              >
                {c}
              </Link>
            ))}
        </div>
      </div>

    </div>
  );
}