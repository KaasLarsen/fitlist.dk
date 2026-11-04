import { unstable_cache } from "next/cache";
import {
  PARTNER_ADS_FEEDS,
  partnerAdsFeedUrl,
  type PartnerAdsFeed,
} from "@/lib/feeds/config";
import { decodeFeedText, parsePartnerAdsXml, UA } from "@/lib/feeds/parse";
import type { FeedProduct } from "@/lib/feeds/types";

const FEED_CACHE_VERSION = "v1";
const FEED_REVALIDATE_SECONDS = 21_600; // 6 timer
const DEFAULT_TIMEOUT_MS = 30_000;

/** Fjern tunge felter så Data Cache holder sig under Next.js 2MB-grænsen. */
function slimFeedProducts(products: FeedProduct[]): FeedProduct[] {
  return products.map((p) => ({
    ...p,
    desc: (p.desc || "").slice(0, 180),
  }));
}

export async function fetchFeedProductsInner(
  feed: PartnerAdsFeed,
  opts?: { timeoutMs?: number },
): Promise<FeedProduct[]> {
  const url = partnerAdsFeedUrl(feed);
  const timeoutMs = opts?.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  const res = await fetch(url, {
    headers: {
      "user-agent": UA,
      accept: "text/xml,application/xml,text/plain,*/*",
    },
    redirect: "follow",
    cache: "no-store",
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!res.ok) {
    throw new Error(
      `[feed] ${feed.merchant} HTTP ${res.status} for ${url}`,
    );
  }

  const buf = await res.arrayBuffer();
  const text = decodeFeedText(buf);
  return parsePartnerAdsXml(text, feed.merchant);
}

async function fetchFeedProductsForCache(
  feed: PartnerAdsFeed,
): Promise<FeedProduct[]> {
  const products = await fetchFeedProductsInner(feed);
  return slimFeedProducts(products);
}

export async function getCachedFeedProducts(
  feed: PartnerAdsFeed,
): Promise<FeedProduct[]> {
  const cached = unstable_cache(
    () => fetchFeedProductsForCache(feed),
    [
      "fitlist-feed",
      FEED_CACHE_VERSION,
      feed.id,
      feed.bannerId,
      feed.feedId,
    ],
    { revalidate: FEED_REVALIDATE_SECONDS, tags: ["fitlist-feeds"] },
  );

  try {
    return await cached();
  } catch (err) {
    console.error(`[feed] cache FAILED for ${feed.merchant}:`, err);
    return [];
  }
}

/** Opvarm Data Cache efter cron-revalidate (kaldes efter revalidateTag). */
export async function warmAllFeeds(): Promise<{
  merchant: string;
  count: number;
  ok: boolean;
  error?: string;
}[]> {
  return Promise.all(
    PARTNER_ADS_FEEDS.map(async (feed) => {
      try {
        const products = await getCachedFeedProducts(feed);
        return {
          merchant: feed.merchant,
          count: products.length,
          ok: true as const,
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`[feed] warm failed ${feed.merchant}:`, message);
        return {
          merchant: feed.merchant,
          count: 0,
          ok: false as const,
          error: message,
        };
      }
    }),
  );
}

export { FEED_REVALIDATE_SECONDS };
