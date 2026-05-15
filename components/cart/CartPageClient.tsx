"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, truncate } from "@/lib/utils";
import CartSummary from "./CartSummary";
import Rating from "@/components/ui/Rating";

export default function CartPageClient() {
  const { items, totalItems, updateQuantity, removeItem } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-xl font-semibold mb-2">Your cart is empty</h1>
        <p className="text-gray-500 text-sm mb-8">
          Looks like you have not added anything yet.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors"
        >
          Start shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-1">Your Cart</h1>
      <p className="text-sm text-gray-500 mb-8">
        {totalItems} {totalItems === 1 ? "item" : "items"}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-4 border border-gray-200 rounded-2xl p-4"
            >
              {/* Image */}
              <Link href={`/products/${product.id}`}>
                <div className="relative w-20 h-20 bg-gray-50 rounded-xl shrink-0 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                </div>
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.id}`}>
                  <p className="text-sm font-medium text-gray-900 hover:underline mb-1">
                    {truncate(product.title, 60)}
                  </p>
                </Link>
                <p className="text-xs text-gray-400 capitalize mb-1">
                  {product.category}
                </p>
                <Rating
                  rate={product.rating.rate}
                  count={product.rating.count}
                  showCount={false}
                />

                {/* Quantity + remove */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(product.id, quantity - 1)
                      }
                      className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 transition-colors"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium w-5 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(product.id, quantity + 1)
                      }
                      className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {formatPrice(product.price * quantity)}
                </p>
                {quantity > 1 && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatPrice(product.price)} each
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary sidebar */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-2xl p-5 sticky top-24">
            <h2 className="font-medium text-gray-900 mb-4">Order summary</h2>
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}