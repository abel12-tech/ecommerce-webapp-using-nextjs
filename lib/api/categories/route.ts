import { NextResponse } from "next/server";
import { getCategoriesWithSlugs } from "@/lib/api/categories";

export async function GET() {
  try {
    const categories = await getCategoriesWithSlugs();
    return NextResponse.json(categories, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 502 }
    );
  }
}