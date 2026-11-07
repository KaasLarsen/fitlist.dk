import { unstable_cache } from "next/cache";
import {
  CATALOG_FEEDS,
  isAdtractionFeed,
  partnerAdsFeedUrl,
  type AdtractionFeed,
  type CatalogFeed,
  type PartnerAdsFeed,
} from "@/lib/feeds/config";
import { classifyProduct, passesMerchantGate } from "@/lib/feeds/classify";
import {
  decodeFeedText,
  parseAdtractionGoogleRss,
  parsePartnerAdsXml,
  UA,
} from "@/lib/feeds/parse";
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

async function fetchFeedText(
  url: string,
  merchant: string,
  timeoutMs: number,
): Promise<string> {
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
    throw new Error(`[feed] ${merchant} HTTP ${res.status} for ${url}`);
  }

  const buf = await res.arrayBuffer();
  return decodeFeedText(buf);
}

export async function fetchFeedProductsInner(
  feed: PartnerAdsFeed,
  opts?: { timeoutMs?: number },
): Promise<FeedProduct[]> {
  const url = partnerAdsFeedUrl(feed);
  const timeoutMs = opts?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const text = await fetchFeedText(url, feed.merchant, timeoutMs);
  return parsePartnerAdsXml(text, feed.merchant).filter(passesMerchantGate);
}

/**
 * Adtraction-kataloget er stort (tøj, tilskud, kampsport).
 * Kun varer som klassificeringen accepterer caches — ellers rammer
 * Next.js’ 2 MB-grænse pr. cache-entry.
 */
export async function fetchAdtractionProductsInner(
  feed: AdtractionFeed,
  opts?: { timeoutMs?: number },
): Promise<FeedProduct[]> {
  const timeoutMs = opts?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const text = await fetchFeedText(feed.feedUrl, feed.merchant, timeoutMs);
  return parseAdtractionGoogleRss(text, feed.merchant).filter(
    (product) => classifyProduct(product) != null,
  );
}

export async function fetchCatalogFeedInner(
  feed: CatalogFeed,
  opts?: { timeoutMs?: number },
): Promise<FeedProduct[]> {
  if (isAdtractionFeed(feed)) return fetchAdtractionProductsInner(feed, opts);
  return fetchFeedProductsInner(feed, opts);
}

async function fetchFeedProductsForCache(
  feed: CatalogFeed,
): Promise<FeedProduct[]> {
  const products = await fetchCatalogFeedInner(feed);
  return slimFeedProducts(products);
}

function feedCacheKey(feed: CatalogFeed): string[] {
  if (isAdtractionFeed(feed)) {
    return [
      "fitlist-feed",
      FEED_CACHE_VERSION,
      "adtraction",
      feed.id,
      feed.feedUrl,
    ];
  }
  return [
    "fitlist-feed",
    FEED_CACHE_VERSION,
    feed.id,
    feed.bannerId,
    feed.feedId,
  ];
}

export async function getCachedFeedProducts(
  feed: CatalogFeed,
): Promise<FeedProduct[]> {
  const cached = unstable_cache(
    () => fetchFeedProductsForCache(feed),
    feedCacheKey(feed),
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
    CATALOG_FEEDS.map(async (feed) => {
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
