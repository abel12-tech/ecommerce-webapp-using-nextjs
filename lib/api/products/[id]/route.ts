import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/api/products";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const product = await getProductById(id);
    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { error: `Product ${id} not found` },
      { status: 404 }
    );
  }
}