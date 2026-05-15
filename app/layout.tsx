import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: {
    default: "NextStore",
    template: "%s — NextStore",
  },
  description: "A Next.js e-commerce store powered by FakeStoreAPI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
      </body>
    </html>
  );
}