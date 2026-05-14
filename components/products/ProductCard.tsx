import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice, truncate } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
import Badge from "@/components/ui/Badge";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-400 hover:shadow-sm transition-all duration-200"
    >
      {/* Image */}
      <div className="relative bg-gray-50 aspect-square p-6">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <Badge>{product.category}</Badge>

        <h3 className="text-sm font-medium text-gray-900 leading-snug">
          {truncate(product.title, 60)}
        </h3>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-base font-semibold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <Rating rate={product.rating.rate} count={product.rating.count} />
        </div>
      </div>
    </Link>
  );
}