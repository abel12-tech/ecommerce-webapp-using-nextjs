"use client";

import type { Product } from "@/types/product";
import type { Category } from "@/types/category";

type ProductFiltersProps = {
  categories: Category[];
  products: Product[];
  onFilter: (filtered: Product[]) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  sortOrder: string;
  onSortChange: (order: string) => void;
};

export default function ProductFilters({
  categories,
  products,
  onFilter,
  activeCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
}: ProductFiltersProps) {
  function handleCategory(category: string) {
    onCategoryChange(category);
    const filtered =
      category === "all"
        ? products
        : products.filter((p) => p.category === category);
    const sorted = sortProducts(filtered, sortOrder);
    onFilter(sorted);
  }

  function handleSort(order: string) {
    onSortChange(order);
    const filtered =
      activeCategory === "all"
        ? products
        : products.filter((p) => p.category === activeCategory);
    const sorted = sortProducts(filtered, order);
    onFilter(sorted);
  }

  function sortProducts(list: Product[], order: string): Product[] {
    return [...list].sort((a, b) => {
      if (order === "price-asc") return a.price - b.price;
      if (order === "price-desc") return b.price - a.price;
      if (order === "rating") return b.rating.rate - a.rating.rate;
      return a.id - b.id; // default: original order
    });
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2 flex-1">
        <button
          onClick={() => handleCategory("all")}
          className={`text-sm px-4 py-1.5 rounded-xl border transition-colors capitalize ${
            activeCategory === "all"
              ? "bg-gray-900 text-white border-gray-900"
              : "border-gray-200 text-gray-600 hover:border-gray-400"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`text-sm px-4 py-1.5 rounded-xl border transition-colors capitalize ${
              activeCategory === cat
                ? "bg-gray-900 text-white border-gray-900"
                : "border-gray-200 text-gray-600 hover:border-gray-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <select
        value={sortOrder}
        onChange={(e) => handleSort(e.target.value)}
        className="text-sm border border-gray-200 rounded-xl px-3 py-1.5 text-gray-600 focus:outline-none focus:border-gray-400 bg-white"
      >
        <option value="default">Sort: Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Top Rated</option>
      </select>
    </div>
  );
}