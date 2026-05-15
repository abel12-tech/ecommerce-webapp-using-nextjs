import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase.",
};

export default function CheckoutPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="text-5xl mb-4">🏗️</div>
      <h1 className="text-xl font-semibold mb-2">Checkout coming soon</h1>
      <p className="text-gray-500 text-sm mb-8">
        This would integrate with Stripe, PayPal, or your payment provider
        of choice. For now, your cart is safe.
      </p>
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-xl hover:border-gray-400 transition-colors"
      >
        ← Back to cart
      </Link>
    </div>
  );
}