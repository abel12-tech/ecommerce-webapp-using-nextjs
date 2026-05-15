import CartPageClient from "@/components/cart/CartPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review and manage your cart items.",
};

export default function CartPage() {
  return <CartPageClient />;
}