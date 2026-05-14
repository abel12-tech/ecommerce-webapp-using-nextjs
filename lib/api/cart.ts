import { apiUrl } from "@/lib/config";

// FakeStoreAPI has a /carts endpoint for demo purposes
// In a real app this would hit your own backend
// We use it here just to demonstrate Route Handlers in Phase 7

export type FakeCart = {
  id: number;
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
};

// fetch a cart by user id (FakeStoreAPI demo)
export async function getCartByUser(userId: number): Promise<FakeCart> {
  const res = await fetch(apiUrl(`/carts/user/${userId}`), {
    next: { revalidate: 0 }, // never cache — cart is user-specific
  });

  if (!res.ok) throw new Error("Failed to fetch cart");
  const carts: FakeCart[] = await res.json();
  return carts[0]; // return the most recent cart
}

// fetch all carts (for admin demo)
export async function getAllCarts(): Promise<FakeCart[]> {
  const res = await fetch(apiUrl("/carts"), {
    next: { revalidate: 0 },
  });

  if (!res.ok) throw new Error("Failed to fetch carts");
  return res.json();
}