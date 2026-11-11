import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { warmCatalog } from "@/lib/feeds/catalog";
import {
  warmAllFeeds,
  warmCykelpartnerGuideProducts,
} from "@/lib/feeds/fetch";

/** Partner-feeds hentes sekventielt — kræver længere end default 60s. */
export const maxDuration = 300;

/**
 * Cron: varm feed- + katalog-cache op.
 * Invaliderer ikke længere før warm — et mislykket wipe efterlod tomt katalog
 * i 6 timer. Friskhed kommer via unstable_cache revalidate (6t) + denne warm.
 *
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

  // Cykelpartner-guide-subset (~46 MB XML) kører efter øvrige feeds, så
  // maskinekataloget ikke konkurrerer om hukommelse under parallel fetch.
  const feeds = await warmAllFeeds();
  const cykelpartnerGuides = await warmCykelpartnerGuideProducts();
  const okFeeds = feeds.filter((f) => f.ok && f.count > 0);
  if (okFeeds.length === 0) {
    return NextResponse.json(
      {
        ok: false,
        error: "All feeds failed — existing cache preserved",
        feeds,
        cykelpartnerGuides,
      },
      { status: 503 },
    );
  }

  try {
    const catalog = await warmCatalog();
    // Frisk Full Route Cache så forsiden/tilbud/maskiner ikke bliver ved at vise tomt.
    revalidatePath("/", "layout");
    revalidatePath("/tilbud");
    revalidatePath("/maskiner", "layout");
    revalidatePath("/guides", "layout");
    return NextResponse.json({
      ok: true,
      feeds,
      cykelpartnerGuides,
      catalog,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        ok: false,
        error: message,
        feeds,
        cykelpartnerGuides,
      },
      { status: 503 },
    );
  }
}
