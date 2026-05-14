import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <p className="text-5xl font-semibold text-gray-200 mb-4">404</p>
      <h1 className="text-xl font-medium text-gray-900 mb-2">
        Page not found
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        The product or page you were looking for doesn&apos;t exist.
      </p>
      <Link
        href="/products"
        className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-700 transition-colors"
      >
        ← Back to products
      </Link>
    </div>
  );
}