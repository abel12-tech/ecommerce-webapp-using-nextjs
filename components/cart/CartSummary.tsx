"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export default function CartSummary() {
  const { totalItems, totalPrice, clearCart, closeCart } = useCartStore();

  const shipping = totalPrice > 50 ? 0 : 4.99;
  const tax = parseFloat((totalPrice * 0.08).toFixed(2));
  const grandTotal = parseFloat((totalPrice + shipping + tax).toFixed(2));

  return (
    <div className="border-t border-gray-100 pt-4 space-y-3">
      {/* Line items */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal ({totalItems} items)</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Tax (8%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
      </div>

      {/* Free shipping nudge */}
      {totalPrice < 50 && (
        <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
          Add {formatPrice(50 - totalPrice)} more for free shipping
        </p>
      )}

      {/* Total */}
      <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t border-gray-100">
        <span>Total</span>
        <span>{formatPrice(grandTotal)}</span>
      </div>

      {/* Actions */}
      <Link
        href="/checkout"
        onClick={closeCart}
        className="block w-full text-center bg-gray-900 text-white text-sm font-medium px-4 py-3 rounded-xl hover:bg-gray-700 transition-colors"
      >
        Checkout →
      </Link>

      <div className="flex gap-2">
        <Link
          href="/cart"
          onClick={closeCart}
          className="flex-1 text-center border border-gray-200 text-gray-600 text-sm font-medium px-4 py-2.5 rounded-xl hover:border-gray-400 transition-colors"
        >
          View cart
        </Link>
        <button
          onClick={clearCart}
          className="text-sm text-gray-400 hover:text-red-500 border border-gray-200 px-4 py-2.5 rounded-xl hover:border-red-200 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
}