import { getCategory } from "@/lib/categories";
import type { FeedProduct } from "@/lib/feeds/types";
import {
  guidePath,
  isModelGuide,
  isModelVs,
  type Guide,
  type GuideProduct,
} from "@/lib/guides";
import { canonical, SITE } from "@/lib/site";

export type GuideOfferMap = Map<string, FeedProduct | undefined>;

type JsonLdNode = Record<string, unknown>;

const PUBLISHER_LOGO = `${SITE}/icon`;

function organization(): JsonLdNode {
  return {
    "@type": "Organization",
    name: "Fitlist",
    url: SITE,
  };
}

function publisher(): JsonLdNode {
  return {
    ...organization(),
    logo: {
      "@type": "ImageObject",
      url: PUBLISHER_LOGO,
    },
  };
}

function productUrl(guideUrl: string, product: GuideProduct): string {
  return `${guideUrl}#produkt-${product.id}`;
}

function buildOffer(offer: FeedProduct | undefined): JsonLdNode | null {
  if (!offer?.url) return null;

  const node: JsonLdNode = {
    "@type": "Offer",
    url: offer.url,
    priceCurrency: "DKK",
    availability: offer.inStock
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
  };

  if (offer.price != null) {
    node.price = String(offer.price);
  }
  if (offer.merchant) {
    node.seller = {
      "@type": "Organization",
      name: offer.merchant,
    };
  }

  return node;
}

function buildReview(
  guide: Guide,
  product: GuideProduct,
): JsonLdNode | null {
  if (product.rating == null || !Number.isFinite(product.rating)) return null;

  return {
    "@type": "Review",
    author: organization(),
    datePublished: guide.updatedAt,
    reviewBody: product.summary,
    reviewRating: {
      "@type": "Rating",
      ratingValue: product.rating,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

export function buildProductJsonLd(
  guide: Guide,
  product: GuideProduct,
  guideUrl: string,
  offerMap: GuideOfferMap,
): JsonLdNode {
  const offer = product.feedProductId
    ? offerMap.get(product.feedProductId)
    : undefined;

  const image = offer?.image || product.imageUrl;
  const node: JsonLdNode = {
    "@type": "Product",
    name: product.name,
    description: product.summary,
    url: productUrl(guideUrl, product),
  };

  if (image) node.image = image;
  if (offer?.brand) {
    node.brand = {
      "@type": "Brand",
      name: offer.brand,
    };
  }

  const offerNode = buildOffer(offer);
  if (offerNode) node.offers = offerNode;

  const review = buildReview(guide, product);
  if (review) node.review = review;

  return node;
}

function itemListName(guide: Guide): string {
  if (isModelGuide(guide)) return `Modellen — ${guide.title}`;
  if (isModelVs(guide)) return `Sammenligning — ${guide.title}`;
  return `Anbefalede modeller — ${guide.title}`;
}

function buildBreadcrumb(guide: Guide, guideUrl: string): JsonLdNode {
  const category = getCategory(guide.categorySlug);
  const elements: JsonLdNode[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Fitlist",
      item: SITE,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Guides",
      item: canonical("/guides"),
    },
  ];

  let position = 3;
  if (category) {
    elements.push({
      "@type": "ListItem",
      position,
      name: category.name,
      item: canonical(`/maskiner/${category.slug}`),
    });
    position += 1;
  }

  elements.push({
    "@type": "ListItem",
    position,
    name: guide.title,
    item: guideUrl,
  });

  return {
    "@type": "BreadcrumbList",
    itemListElement: elements,
  };
}

/**
 * JSON-LD @graph for guide detail pages (buying / modelguide / model-vs).
 * Pass live offerMap so Product.offers can include price + availability.
 */
export function buildGuideJsonLd(
  guide: Guide,
  offerMap: GuideOfferMap = new Map(),
): { "@context": string; "@graph": JsonLdNode[] } {
  const url = canonical(guidePath(guide));
  const image = `${SITE}/og/guide-${guide.slug}.jpg`;

  const article: JsonLdNode = {
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription || guide.excerpt,
    image,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    mainEntityOfPage: url,
    author: organization(),
    publisher: publisher(),
    inLanguage: "da-DK",
  };

  const faq: JsonLdNode | null =
    guide.faqs.length > 0
      ? {
          "@type": "FAQPage",
          mainEntity: guide.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  const products = guide.products.map((product) =>
    buildProductJsonLd(guide, product, url, offerMap),
  );

  let productBlock: JsonLdNode | null = null;
  if (products.length === 1 && isModelGuide(guide)) {
    productBlock = products[0] ?? null;
  } else if (products.length > 0) {
    productBlock = {
      "@type": "ItemList",
      name: itemListName(guide),
      itemListElement: products.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.products[index]?.name,
        url: productUrl(url, guide.products[index]!),
        item,
      })),
    };
  }

  const howTo: JsonLdNode | null =
    guide.howToSteps && guide.howToSteps.length > 0
      ? {
          "@type": "HowTo",
          name: guide.title,
          description: guide.metaDescription || guide.excerpt,
          step: guide.howToSteps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.name,
            text: step.text,
          })),
        }
      : null;

  const breadcrumb = buildBreadcrumb(guide, url);

  return {
    "@context": "https://schema.org",
    "@graph": [article, faq, productBlock, howTo, breadcrumb].filter(
      (n): n is JsonLdNode => n != null,
    ),
  };
}
