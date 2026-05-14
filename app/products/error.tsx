"use client";

export default function ProductsError({ error }: { error: Error }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-lg font-medium text-red-600 mb-2">
        Failed to load products
      </h2>
      <p className="text-sm text-gray-500">{error.message}</p>
    </div>
  );
}