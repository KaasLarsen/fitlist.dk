import { ensurePartnerAdsKlikUid } from "@/lib/feeds/config";
import type { FeedProduct } from "@/lib/feeds/types";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

export { UA };

export function decodeFeedText(buf: ArrayBuffer): string {
  try {
    const head = new TextDecoder("utf-8").decode(buf.slice(0, 200));
    const m = head.match(/encoding=["']([^"']+)["']/i);
    const enc = (m ? m[1] : "utf-8").toLowerCase();
    if (enc.includes("8859") || enc.includes("latin1")) {
      return new TextDecoder("iso-8859-1").decode(buf);
    }
    return new TextDecoder("utf-8").decode(buf);
  } catch {
    return new TextDecoder("utf-8").decode(buf);
  }
}

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCharCode(parseInt(h, 16)),
    );
}

function pickTag(block: string, tag: string): string {
  const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "i"));
  if (!m) return "";
  return decodeHtmlEntities(m[1].trim());
}

function parsePrice(raw: string): number | null {
  if (!raw) return null;
  const cleaned = raw
    .replace(/[A-Z]{3}/gi, "")
    .replace(/kr\.?/gi, "")
    .replace(/\s/g, "")
    .replace(",", ".");
  const n = Number.parseFloat(cleaned);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

function parseInStock(raw: string): boolean {
  const v = raw.trim().toLowerCase();
  if (!v) return true;
  if (
    v.includes("out of stock") ||
    v.includes("ikke på lager") ||
    v.includes("ikke paa lager") ||
    v === "0" ||
    v === "false"
  ) {
    return false;
  }
  return true;
}

function splitProduktBlocks(xml: string): string[] {
  const blocks: string[] = [];
  const re = /<produkt>([\s\S]*?)<\/produkt>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    blocks.push(m[1]);
  }
  return blocks;
}

export function parsePartnerAdsXml(
  xml: string,
  merchant: string,
): FeedProduct[] {
  const out: FeedProduct[] = [];

  for (const block of splitProduktBlocks(xml)) {
    const title = pickTag(block, "produktnavn");
    const urlRaw = pickTag(block, "vareurl");
    if (!title || !urlRaw) continue;

    const productId = pickTag(block, "produktid") || urlRaw;
    const nypris = parsePrice(pickTag(block, "nypris"));
    const glpris = parsePrice(pickTag(block, "glpris"));
    let image = pickTag(block, "billedurl");
    if (image.includes("|")) image = image.split("|")[0].trim();

    out.push({
      id: `${merchant}:${productId}`,
      merchant,
      title,
      desc: pickTag(block, "beskrivelse") || pickTag(block, "produktbeskrivelse"),
      category: pickTag(block, "kategorinavn"),
      brand: pickTag(block, "brand"),
      price: nypris,
      oldPrice: glpris != null && nypris != null && glpris > nypris ? glpris : null,
      image,
      url: ensurePartnerAdsKlikUid(urlRaw),
      inStock: parseInStock(
        pickTag(block, "lagerantal") || pickTag(block, "lagerstatus"),
      ),
    });
  }

  return out;
}
