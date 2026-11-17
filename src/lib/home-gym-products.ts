import { getFeedProductById, getMachineCatalog } from "@/lib/feeds/catalog";
import {
  allFeedProductIds,
  type HomeGymOffer,
} from "@/lib/home-gym";

function toOffer(product: {
  id: string;
  merchant: string;
  title: string;
  price: number | null;
  oldPrice: number | null;
  image: string;
  url: string;
  inStock: boolean;
}): HomeGymOffer {
  return {
    id: product.id,
    merchant: product.merchant,
    title: product.title,
    price: product.price,
    oldPrice: product.oldPrice,
    image: product.image,
    url: product.url,
    inStock: product.inStock,
  };
}

/** Live partnerprodukter til de opskrifter, byggeren kan vise. */
export async function loadHomeGymProducts(): Promise<HomeGymOffer[]> {
  const ids = new Set(allFeedProductIds());
  const catalog = await getMachineCatalog();
  const found = new Map<string, HomeGymOffer>();

  for (const product of catalog) {
    if (ids.has(product.id)) found.set(product.id, toOffer(product));
  }

  const missing = [...ids].filter((id) => !found.has(id));
  const extras = await Promise.all(
    missing.map((id) => getFeedProductById(id)),
  );
  for (const product of extras) {
    if (product && ids.has(product.id)) found.set(product.id, toOffer(product));
  }

  return [...found.values()];
}
