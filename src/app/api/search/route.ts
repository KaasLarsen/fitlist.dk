import { NextResponse } from "next/server";
import { getMachineCatalog } from "@/lib/feeds/catalog";
import { searchSite } from "@/lib/search";

const SEARCH_CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return NextResponse.json(
      {
        categories: [],
        guides: [],
        products: [],
      },
      { headers: SEARCH_CACHE_HEADERS },
    );
  }

  const catalog = await getMachineCatalog();
  const results = searchSite(q, catalog);

  return NextResponse.json(results, { headers: SEARCH_CACHE_HEADERS });
}
