"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import type { Category } from "@/types/category";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";

type ProductsClientProps = {
  products: Product[];
  categories: Category[];
};

export default function ProductsClient({
  products,
  categories,
}: ProductsClientProps) {
  const [filtered, setFiltered] = useState<Product[]>(products);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  return (
    <div>
      <ProductFilters
        categories={categories}
        products={products}
        onFilter={setFiltered}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <p className="text-sm text-gray-400 mb-4">
        {filtered.length === products.length
          ? `${products.length} products`
          : `${filtered.length} of ${products.length} products`}
      </p>

      <ProductGrid products={filtered} />
    </div>
  );
}