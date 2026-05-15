import Link from "next/link";
import CartButton from "./CartButton";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg text-gray-900">
          NextStore
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/products" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Products
          </Link>
          <Link href="/categories" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Categories
          </Link>
          <Link href="/search" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Search
          </Link>
        </div>

        <CartButton />
      </nav>
    </header>
  );
}