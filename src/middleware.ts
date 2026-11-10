import { NextResponse, type NextRequest } from "next/server";
import { categoryIntentHref, getCategory } from "@/lib/categories";
import { canonical } from "@/lib/site";

/** Legacy /maskiner/[slug]?intent=… → https://www.fitlist.dk/maskiner/[slug]/[intent] */
export function middleware(request: NextRequest) {
  const intentSlug = request.nextUrl.searchParams.get("intent");
  if (!intentSlug) return NextResponse.next();

  const match = request.nextUrl.pathname.match(/^\/maskiner\/([^/]+)\/?$/);
  if (!match) return NextResponse.next();

  const category = getCategory(match[1]);
  const intent = category?.intents.find((i) => i.slug === intentSlug);
  if (!intent || !category) return NextResponse.next();

  const destination = new URL(
    canonical(categoryIntentHref(category.slug, intent.slug)),
  );
  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: ["/maskiner/:slug"],
};
