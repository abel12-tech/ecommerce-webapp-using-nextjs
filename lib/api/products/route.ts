import { NextRequest, NextResponse } from "next/server";
import { getProducts, getProductsSorted } from "@/lib/api/products";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const sort = searchParams.get("sort") as "asc" | "desc" | null;

  try {
    const products = sort
      ? await getProductsSorted(sort)
      : await getProducts(limit ? Number(limit) : undefined);

    return NextResponse.json(products, {
      headers: {
        "X-Total-Count": String(products.length),
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 502 }
    );
  }
}