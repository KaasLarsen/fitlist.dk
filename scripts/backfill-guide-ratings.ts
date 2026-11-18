/**
 * Inserts editorial `rating:` on every GuideProduct missing one.
 * Heuristic from badge + position within the guide.
 *
 * Usage: npx tsx scripts/backfill-guide-ratings.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const FILES = [
  "src/lib/guides.ts",
  "src/lib/price-tier-guides.ts",
  "src/lib/recovery-guides.ts",
];

function defaultRating(badge: string | undefined, index: number): number {
  const b = (badge ?? "").toLowerCase();
  if (
    b.includes("bedst samlet") ||
    b.includes("vinder") ||
    b.includes("fitlist vælger") ||
    b.includes("vores valg")
  ) {
    return 4.8;
  }
  if (b.includes("premium") || b.includes("luksus") || b.includes("pro")) {
    return 4.9;
  }
  if (
    b.includes("billig") ||
    b.includes("budget") ||
    b.includes("pris") ||
    b.includes("under")
  ) {
    return 4.3;
  }
  if (
    b.includes("kompakt") ||
    b.includes("plads") ||
    b.includes("fold") ||
    b.includes("lejlighed")
  ) {
    return 4.5;
  }
  if (b.includes("måned 1") || b.includes("fase 1")) return 4.6;
  if (b.includes("måned 3") || b.includes("fase 2")) return 4.7;
  if (b.includes("måned 6") || b.includes("fase 3")) return 4.4;

  const raw = 4.7 - index * 0.15;
  const clamped = Math.min(4.9, Math.max(3.8, raw));
  return Math.round(clamped * 10) / 10;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

type ProductHit = {
  id: string;
  badge?: string;
  indexInGuide: number;
};

function findProducts(src: string): ProductHit[] {
  const hits: ProductHit[] = [];
  // Reset index when we see a top-level guide slug (approx).
  let indexInGuide = 0;
  let lastSlugPos = -1;

  const slugRe = /\n\s*slug:\s*"([^"]+)"/g;
  const idRe = /\n\s*id:\s*"([^"]+)"/g;

  const slugPositions: number[] = [];
  for (const m of src.matchAll(slugRe)) {
    if (m.index != null) slugPositions.push(m.index);
  }

  for (const m of src.matchAll(idRe)) {
    const id = m[1];
    if (!id || m.index == null) continue;
    // Skip non-product ids (bundle items use feedProductId, not bare id near products)
    // Guide products always have `id:` then `name:` soon after.
    const window = src.slice(m.index, m.index + 400);
    if (!/\n\s*name:\s*"/.test(window)) continue;
    // Bundle items don't have name right after id in the same shape with summary/pros
    if (!/\n\s*summary:\s*"/.test(window) && !/\n\s*summary:\s*\n/.test(window)) {
      // summary might be further; look a bit more
      const wider = src.slice(m.index, m.index + 1200);
      if (!/\n\s*summary:\s*"/.test(wider)) continue;
    }

    // New guide → reset index when we've crossed a slug since last product
    const crossedSlug = slugPositions.some(
      (p) => p > lastSlugPos && p < m.index,
    );
    if (crossedSlug || lastSlugPos < 0) {
      // Count slugs between
      const slugsBetween = slugPositions.filter(
        (p) => p > lastSlugPos && p < m.index,
      );
      if (slugsBetween.length > 0) indexInGuide = 0;
    }

    const wider = src.slice(m.index, m.index + 1500);
    const badgeMatch = wider.match(/\n\s*badge:\s*"([^"]*)"/);
    const badge = badgeMatch?.[1];

    // Already has rating?
    if (/\n\s*rating:\s*[0-9]/.test(wider.split(/\n\s*pros:/)[0] ?? wider)) {
      indexInGuide += 1;
      lastSlugPos = m.index;
      continue;
    }

    hits.push({ id, badge, indexInGuide });
    indexInGuide += 1;
    lastSlugPos = m.index;
  }

  return hits;
}

function insertRatingAfterSummary(
  src: string,
  productId: string,
  rating: number,
): string {
  // Match from id through the summary line (single-line string).
  const re = new RegExp(
    `(id:\\s*"${escapeRegExp(productId)}",(?:.|\\n)*?\\n\\s*summary:\\s*"(?:\\\\.|[^"\\\\])*",\\n)(?!\\s*rating:)`,
  );
  const m = src.match(re);
  if (!m || m.index == null) {
    console.warn(`  skip (no match): ${productId}`);
    return src;
  }
  // Detect indent from the summary line
  const summaryLine = m[0].match(/\n(\s*)summary:/);
  const indent = summaryLine?.[1] ?? "        ";
  return (
    src.slice(0, m.index) +
    m[1] +
    `${indent}rating: ${rating},\n` +
    src.slice(m.index + m[0].length)
  );
}

function processFile(relPath: string): void {
  const path = resolve(process.cwd(), relPath);
  let src = readFileSync(path, "utf8");
  const products = findProducts(src);
  console.log(`${relPath}: ${products.length} products without rating (candidates)`);

  let inserted = 0;
  // Re-scan after each insert is expensive; compute all ratings first from initial scan,
  // then insert from end to start so indices stay valid — but we use id-based replace.
  for (const p of products) {
    const rating = defaultRating(p.badge, p.indexInGuide);
    const before = src;
    src = insertRatingAfterSummary(src, p.id, rating);
    if (src !== before) inserted += 1;
  }

  writeFileSync(path, src);
  console.log(`  inserted ${inserted} ratings`);
}

for (const file of FILES) {
  processFile(file);
}
