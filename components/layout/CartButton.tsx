"use client";

import { useCartStore } from "@/store/cartStore";

export default function CartButton() {
  const { totalItems, openCart } = useCartStore();

  return (
    <button
      onClick={openCart}
      className="relative flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors hover:border-gray-400"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.962-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
      Cart
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-900 text-white text-xs font-medium rounded-full flex items-center justify-center">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </button>
  );
}