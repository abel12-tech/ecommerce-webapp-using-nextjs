import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";
import type { CartItem, Cart } from "@/types/cart";

type CartStore = Cart & {
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

function calculateTotals(items: CartItem[]): {
  totalItems: number;
  totalPrice: number;
} {
  return {
    totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
    totalPrice: parseFloat(
      items
        .reduce((sum, i) => sum + i.product.price * i.quantity, 0)
        .toFixed(2)
    ),
  };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      isOpen: false,

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.id === product.id
          );

          const items = existing
            ? state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              )
            : [...state.items, { product, quantity: 1 }];

          return { items, ...calculateTotals(items), isOpen: true };
        }),

      removeItem: (productId) =>
        set((state) => {
          const items = state.items.filter(
            (i) => i.product.id !== productId
          );
          return { items, ...calculateTotals(items) };
        }),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          const items =
            quantity <= 0
              ? state.items.filter((i) => i.product.id !== productId)
              : state.items.map((i) =>
                  i.product.id === productId ? { ...i, quantity } : i
                );
          return { items, ...calculateTotals(items) };
        }),

      clearCart: () =>
        set({ items: [], totalItems: 0, totalPrice: 0, isOpen: false }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "nextstore-cart", // persists to localStorage
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }),
    }
  )
);