import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/api/products";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";

  if (!q.trim()) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  try {
    const results = await searchProducts(q);
    return NextResponse.json({
      query: q,
      total: results.length,
      results,
    });
  } catch {
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}