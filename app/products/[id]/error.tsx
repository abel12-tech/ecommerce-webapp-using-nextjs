"use client";

import Link from "next/link";

export default function ProductError({ error }: { error: Error }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-lg font-medium text-red-600 mb-2">
        Failed to load product
      </h2>
      <p className="text-sm text-gray-500 mb-4">{error.message}</p>
      <Link
        href="/products"
        className="text-sm text-blue-500 hover:underline"
      >
        ← Back to products
      </Link>
    </div>
  );
}