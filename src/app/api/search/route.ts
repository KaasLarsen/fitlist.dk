import { NextResponse } from "next/server";
import { getMachineCatalog } from "@/lib/feeds/catalog";
import { searchSite } from "@/lib/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return NextResponse.json({
      categories: [],
      guides: [],
      products: [],
    });
  }

  const catalog = await getMachineCatalog();
  const results = searchSite(q, catalog);

  return NextResponse.json(results);
}
