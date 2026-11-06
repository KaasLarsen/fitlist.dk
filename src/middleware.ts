import { NextResponse, type NextRequest } from "next/server";
import { categoryIntentHref, getCategory } from "@/lib/categories";

/** Legacy /maskiner/[slug]?intent=… → /maskiner/[slug]/[intent] */
export function middleware(request: NextRequest) {
  const intentSlug = request.nextUrl.searchParams.get("intent");
  if (!intentSlug) return NextResponse.next();

  const match = request.nextUrl.pathname.match(/^\/maskiner\/([^/]+)\/?$/);
  if (!match) return NextResponse.next();

  const category = getCategory(match[1]);
  const intent = category?.intents.find((i) => i.slug === intentSlug);
  if (!intent || !category) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = categoryIntentHref(category.slug, intent.slug);
  url.search = "";
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/maskiner/:slug"],
};
