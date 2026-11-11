import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { warmCatalog } from "@/lib/feeds/catalog";
import { warmAllFeeds } from "@/lib/feeds/fetch";

/** Partner-feeds hentes i batches — kræver længere end default 60s. */
export const maxDuration = 300;

/**
 * Cron: invalider feed-cache og varm den op igen.
 * På Vercel: sæt CRON_SECRET — Vercel Cron sender `Authorization: Bearer <CRON_SECRET>`.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    return NextResponse.json(
      {
        error:
          "CRON_SECRET is not configured. Add it in Vercel → Project → Environment Variables.",
      },
      { status: 503 },
    );
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("fitlist-feeds", "max");

  const feeds = await warmAllFeeds();
  const catalog = await warmCatalog();

  return NextResponse.json({
    ok: true,
    feeds,
    catalog,
  });
}
