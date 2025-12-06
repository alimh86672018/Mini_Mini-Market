import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const data = await fetch("https://dummyjson.com/products");
  const products = await data.json();
  return NextResponse.json(products);
}
