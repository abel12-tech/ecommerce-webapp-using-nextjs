export type Rating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

// used on the listing page — same shape, FakeStoreAPI returns the same object
export type ProductSummary = Pick<
  Product,
  "id" | "title" | "price" | "category" | "image" | "rating"
>;