import { Suspense } from "react";
import type { Metadata } from "next";
import { searchProducts } from "@/lib/api/products";
import SearchInput from "@/components/search/SearchInput";
import ProductGrid from "@/components/products/ProductGrid";
import Skeleton from "@/components/ui/Skeleton";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search: "${q}"` : "Search",
    description: q
      ? `Search results for "${q}" in NextStore.`
      : "Search all products in NextStore.",
  };
}

async function SearchResults({ query }: { query: string }) {
  if (!query) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-gray-500 text-sm">
          Start typing to search products
        </p>
      </div>
    );
  }

  const results = await searchProducts(query);

  if (results.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-3">😕</p>
        <p className="text-gray-700 font-medium mb-1">
          No results for `{query}`
        </p>
        <p className="text-gray-400 text-sm">
          Try a different keyword or browse by category
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-400 mb-6">
        {results.length} result{results.length !== 1 ? "s" : ""} for `{query}`
      </p>
      <ProductGrid products={results} />
    </div>
  );
}

function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
          <Skeleton className="aspect-square" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Search</h1>

      {/* Search input wrapped in Suspense — useSearchParams needs it */}
      <div className="mb-8">
        <Suspense fallback={<Skeleton className="h-12 w-full rounded-2xl" />}>
          <SearchInput />
        </Suspense>
      </div>

      {/* Results */}
      <Suspense key={q} fallback={<SearchResultsSkeleton />}>
        <SearchResults query={q} />
      </Suspense>
    </div>
  );
}