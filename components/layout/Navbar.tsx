import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-semibold text-lg text-gray-900">
          NextStore
        </Link>

        {/* Links */}
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

        {/* Cart icon — wired up in Phase 6 */}
        <Link
          href="/cart"
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors hover:border-gray-400"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.962-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          Cart
        </Link>

      </nav>
    </header>
  );
}