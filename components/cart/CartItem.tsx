"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, truncate } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/types/cart";

type CartItemProps = {
  item: CartItemType;
};

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const { product, quantity } = item;

  return (
    <div className="flex gap-3 py-4 border-b border-gray-100 last:border-0">
      {/* Image */}
      <div className="relative w-16 h-16 bg-gray-50 rounded-xl shrink-0 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="64px"
          className="object-contain p-2"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 leading-snug mb-1">
          {truncate(product.title, 45)}
        </p>
        <p className="text-sm text-gray-500 mb-2">
          {formatPrice(product.price)}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-colors text-sm"
          >
            −
          </button>
          <span className="text-sm font-medium w-4 text-center">
            {quantity}
          </span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-colors text-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* Right: subtotal + remove */}
      <div className="flex flex-col items-end justify-between shrink-0">
        <span className="text-sm font-semibold text-gray-900">
          {formatPrice(product.price * quantity)}
        </span>
        <button
          onClick={() => removeItem(product.id)}
          className="text-xs text-gray-400 hover:text-red-500 transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
}