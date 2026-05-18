import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getAllProductIds, getProductsByCategory } from "@/lib/api/products";
import { formatPrice, truncate } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
import Badge from "@/components/ui/Badge";
import ImageGallery from "@/components/products/ImageGallery";
import AddToCartButton from "@/components/products/AddToCartButton";
import ProductGrid from "@/components/products/ProductGrid";

// pre-build all 20 product pages at deploy time
export async function generateStaticParams() {
  try {
    const ids = await getAllProductIds();
    return ids.map((id) => ({ id: String(id) }));
  } catch (error) {
    console.warn("Could not fetch product IDs at build time:", error);
    return [];
  }
}

// dynamic SEO metadata per product
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await getProductById(id);
    return {
      title: truncate(product.title, 50),
      description: truncate(product.description, 120),
    };
  } catch {
    return { title: "Product not found" };
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product;
  try {
    product = await getProductById(id);
  } catch {
    notFound();
  }

  // fetch related products from same category (exclude current)
  const related = (await getProductsByCategory(product.category))
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-gray-600 transition-colors">Products</Link>
        <span>/</span>
        <Link
          href={`/categories/${encodeURIComponent(product.category)}`}
          className="hover:text-gray-600 transition-colors capitalize"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-600 truncate max-w-[200px]">
          {truncate(product.title, 30)}
        </span>
      </nav>

      {/* Product layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">

        {/* Left — image */}
        <ImageGallery image={product.image} title={product.title} />

        {/* Right — details */}
        <div className="flex flex-col gap-5">

          <div>
            <Badge>{product.category}</Badge>
            <h1 className="text-2xl font-semibold text-gray-900 mt-3 mb-2 leading-snug">
              {product.title}
            </h1>
            <Rating
              rate={product.rating.rate}
              count={product.rating.count}
              showCount
            />
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {/* fake original price for visual */}
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.price * 1.2)}
            </span>
            <span className="text-sm text-green-600 font-medium">20% off</span>
          </div>

          {/* Description */}
          <div className="border-t border-gray-100 pt-5">
            <h2 className="text-sm font-medium text-gray-700 mb-2">
              About this product
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Stock indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-gray-500">In stock — ready to ship</span>
          </div>

          {/* Add to cart */}
          <AddToCartButton product={product} />

          {/* Product meta */}
          <div className="border-t border-gray-100 pt-5 grid grid-cols-2 gap-3">
            {[
              { label: "Product ID", value: `#${product.id}` },
              { label: "Category", value: product.category },
              { label: "Rating", value: `${product.rating.rate} / 5` },
              { label: "Reviews", value: `${product.rating.count} reviews` },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                <p className="text-sm text-gray-700 font-medium capitalize">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Related products</h2>
            <Link
              href={`/categories/${encodeURIComponent(product.category)}`}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              View all in {product.category} →
            </Link>
          </div>
          <ProductGrid products={related} />
        </section>
      )}

    </div>
  );
}