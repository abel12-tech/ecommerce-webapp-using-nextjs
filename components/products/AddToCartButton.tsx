"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import Button from "@/components/ui/Button";

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    // Phase 6: replace this with useCartStore
    console.log("Add to cart:", product.title);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={handleAdd}
        size="lg"
        className="w-full"
        disabled={added}
      >
        {added ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Added to cart
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.962-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            Add to cart
          </>
        )}
      </Button>

      <Button variant="secondary" size="lg" className="w-full">
        Save for later
      </Button>
    </div>
  );
}