import Link from "next/link";
import type { CategoryWithSlug } from "@/types/category";

const categoryMeta: Record<string, { emoji: string; description: string }> = {
  "electronics": {
    emoji: "🖥️",
    description: "Phones, laptops, audio and more",
  },
  "jewelery": {
    emoji: "💍",
    description: "Rings, necklaces and fine accessories",
  },
  "men's clothing": {
    emoji: "👔",
    description: "Casual and formal wear for men",
  },
  "women's clothing": {
    emoji: "👗",
    description: "Dresses, tops and women's fashion",
  },
};

type CategoryCardProps = {
  category: CategoryWithSlug;
  productCount?: number;
};

export default function CategoryCard({
  category,
  productCount,
}: CategoryCardProps) {
  const meta = categoryMeta[category.name] ?? {
    emoji: "🛍️",
    description: "Browse this category",
  };

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex flex-col bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-400 hover:shadow-sm transition-all duration-200"
    >
      {/* Emoji icon */}
      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-200">
        {meta.emoji}
      </div>

      {/* Info */}
      <h3 className="font-medium text-gray-900 capitalize mb-1">
        {category.name}
      </h3>
      <p className="text-sm text-gray-500 mb-4">{meta.description}</p>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between">
        {productCount !== undefined && (
          <span className="text-xs text-gray-400">
            {productCount} products
          </span>
        )}
        <span className="text-xs text-gray-400 group-hover:text-gray-700 transition-colors ml-auto">
          Browse →
        </span>
      </div>
    </Link>
  );
}