import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { GuideAffiliateBanner } from "@/components/GuideAffiliateBanner";
import { GuideRichText } from "@/components/GuideRichText";
import { ProductOfferList } from "@/components/ProductOfferList";
import { categoryIntentHref, getCategory } from "@/lib/categories";
import {
  formatPriceDkk,
  getFeedProductById,
  getProductsByCategory,
} from "@/lib/feeds/catalog";
import { CYKELPARTNER_MERCHANT } from "@/lib/feeds/cykelpartner-guide-ids";
import { getCachedCykelpartnerGuideProducts } from "@/lib/feeds/fetch";
import type { FeedProduct, MachineCategorySlug } from "@/lib/feeds/types";
import {
  getProductAffiliate,
  getRelatedGuides,
  guidePath,
  isModelGuide,
  type Guide,
  type GuideProduct,
} from "@/lib/guides";

async function resolveGuideOffers(
  products: GuideProduct[],
): Promise<Map<string, FeedProduct | undefined>> {
  const ids = new Set<string>();
  for (const product of products) {
    if (product.feedProductId) ids.add(product.feedProductId);
  }

  if ([...ids].some((id) => id.startsWith(`${CYKELPARTNER_MERCHANT}:`))) {
    await getCachedCykelpartnerGuideProducts();
  }

  const entries = await Promise.all(
    [...ids].map(async (id) => {
      const offer = await getFeedProductById(id);
      return [id, offer] as const;
    }),
  );
  return new Map(entries);
}

function isPladsLabel(label: string): boolean {
  const lower = label.toLowerCase();
  return (
    lower.includes("plads") ||
    lower.includes("footprint") ||
    lower.includes("pladskrav")
  );
}

function buildSpecRows(products: GuideProduct[]): {
  label: string;
  cells: string[];
}[] {
  const rows: { label: string; cells: string[] }[] = [
    {
      label: "Bedst til",
      cells: products.map((p) => p.badge?.replace(/^Bedst til\s+/i, "") || "—"),
    },
  ];

  const pladsCells = products.map((p) => {
    const hit = p.specs.find((s) => isPladsLabel(s.label));
    return hit?.value ?? "—";
  });
  if (pladsCells.some((c) => c !== "—")) {
    rows.push({ label: "Plads", cells: pladsCells });
  }

  rows.push({
    label: "Vigtigste funktion",
    cells: products.map((p) => p.summary),
  });

  const labelOrder: string[] = [];
  const seen = new Set<string>();
  for (const product of products) {
    for (const spec of product.specs) {
      if (isPladsLabel(spec.label)) continue;
      if (spec.label.toLowerCase() === "partner") continue;
      if (seen.has(spec.label)) continue;
      seen.add(spec.label);
      labelOrder.push(spec.label);
    }
  }

  for (const label of labelOrder) {
    rows.push({
      label,
      cells: products.map((p) => {
        const hit = p.specs.find((s) => s.label === label);
        return hit?.value ?? "—";
      }),
    });
  }

  return rows;
}

export async function ModelVsArticle({ guide }: { guide: Guide }) {
  await connection();

  const products = guide.products.slice(0, 2);
  const category = getCategory(guide.categorySlug);
  const related = getRelatedGuides(guide);
  const modelGuideLinks = related.filter(isModelGuide);
  const otherRelated = related.filter((g) => !isModelGuide(g));
  const [relatedOffers, offerMap] = await Promise.all([
    getProductsByCategory(guide.categorySlug as MachineCategorySlug, {
      intentSlug: guide.intentSlug,
      limit: 3,
      inStockOnly: true,
    }),
    resolveGuideOffers(products),
  ]);

  const categoryHref = category
    ? categoryIntentHref(category.slug, guide.intentSlug)
    : "/maskiner";

  const specRows = buildSpecRows(products);

  return (
    <article className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="font-display font-medium uppercase tracking-[0.2em] text-accent">
            Sammenligning
          </span>
          {category ? (
            <>
              <span className="text-muted">·</span>
              <Link
                href={categoryHref}
                className="font-display font-medium uppercase tracking-[0.2em] text-accent transition-colors hover:text-accent-dim"
              >
                {category.name}
              </Link>
            </>
          ) : null}
          <span className="text-muted">·</span>
          <time className="text-muted" dateTime={guide.updatedAt}>
            Opdateret{" "}
            {new Date(guide.updatedAt).toLocaleDateString("da-DK", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>

        <h1 className="mt-3 font-display text-4xl font-semibold uppercase tracking-wide text-foreground sm:text-5xl">
          {guide.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{guide.excerpt}</p>

        {/* Dual buy block */}
        <div className="animate-fade-up mt-12 grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {products.map((product, index) => {
            const offer = product.feedProductId
              ? offerMap.get(product.feedProductId)
              : undefined;
            const affiliate = getProductAffiliate(product);
            const shopHref = offer?.url ?? affiliate?.url;
            const shopLabel = offer
              ? `Se pris hos ${offer.merchant} →`
              : affiliate
                ? `Se pris hos ${affiliate.label} →`
                : null;
            const productImage = offer?.image || product.imageUrl;
            const hasDiscount =
              offer?.oldPrice != null &&
              offer.price != null &&
              offer.oldPrice > offer.price;
            const isPick = index === 0;

            return (
              <div
                key={product.id}
                id={`produkt-${product.id}`}
                className={`scroll-mt-28 px-0 py-8 sm:px-6 sm:py-10 first:sm:pl-0 last:sm:pr-0 ${
                  isPick ? "animate-fade-up sm:bg-accent/[0.03]" : "animate-fade-up-delay"
                }`}
              >
                {isPick ? (
                  <p className="font-display text-[0.65rem] font-medium uppercase tracking-[0.18em] text-accent">
                    Fitlist vælger
                  </p>
                ) : (
                  <p className="font-display text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted">
                    Alternativet
                  </p>
                )}

                <div className="relative mt-4 h-40 w-full overflow-hidden border border-border bg-surface">
                  {productImage ? (
                    <Image
                      src={productImage}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-contain p-3"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-display text-xs uppercase tracking-[0.14em] text-muted">
                      Intet billede
                    </div>
                  )}
                </div>

                <h2 className="mt-5 font-display text-xl font-semibold uppercase tracking-wide text-foreground sm:text-2xl">
                  {product.name}
                </h2>
                {product.badge ? (
                  <p className="mt-2 font-display text-xs uppercase tracking-[0.14em] text-accent">
                    {product.badge}
                  </p>
                ) : null}
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {product.summary}
                </p>

                {offer ? (
                  <div className="mt-5">
                    <p className="font-display text-xs uppercase tracking-[0.14em] text-muted">
                      {offer.merchant}
                      {!offer.inStock ? (
                        <span className="ml-2 text-muted/80">· Ikke på lager</span>
                      ) : null}
                    </p>
                    <p className="mt-2 font-display text-2xl font-semibold tabular-nums text-foreground">
                      {formatPriceDkk(offer.price)}
                      {hasDiscount ? (
                        <span className="ml-3 text-base font-normal text-muted line-through">
                          {formatPriceDkk(offer.oldPrice)}
                        </span>
                      ) : null}
                    </p>
                  </div>
                ) : null}

                {shopHref && shopLabel ? (
                  <a
                    href={shopHref}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="mt-6 inline-flex items-center bg-accent px-5 py-3 font-display text-sm font-semibold uppercase tracking-[0.12em] text-accent-fg transition-colors hover:bg-accent-dim"
                  >
                    {shopLabel}
                  </a>
                ) : (
                  <Link
                    href={categoryHref}
                    className="mt-6 inline-flex items-center border border-border px-5 py-3 font-display text-sm font-semibold uppercase tracking-[0.12em] text-accent transition-colors hover:border-accent hover:text-accent-dim"
                  >
                    Se tilbud i kategorien →
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Spec table */}
        <section id="specifikationer" className="mt-14 scroll-mt-28">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            Specifikationer
          </h2>
          <div className="mt-6 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th
                    scope="col"
                    className="sticky left-0 z-10 bg-background py-3 pr-4 font-display text-xs font-medium uppercase tracking-[0.14em] text-muted"
                  >
                    Spec
                  </th>
                  {products.map((product, index) => (
                    <th
                      key={product.id}
                      scope="col"
                      className={`py-3 pr-4 font-display text-xs font-medium uppercase tracking-[0.14em] last:pr-0 ${
                        index === 0 ? "text-accent" : "text-muted"
                      }`}
                    >
                      {product.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specRows.map((row) => (
                  <tr key={row.label} className="border-b border-border/70">
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-background py-3 pr-4 align-top font-display text-sm font-medium uppercase tracking-wide text-foreground"
                    >
                      {row.label}
                    </th>
                    {row.cells.map((cell, i) => (
                      <td
                        key={`${row.label}-${i}`}
                        className={`py-3 pr-4 align-top last:pr-0 ${
                          i === 0 ? "text-foreground/90" : "text-muted"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-b border-border/70">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-background py-3 pr-4 align-middle font-display text-sm font-medium uppercase tracking-wide text-foreground"
                  >
                    Køb
                  </th>
                  {products.map((product) => {
                    const offer = product.feedProductId
                      ? offerMap.get(product.feedProductId)
                      : undefined;
                    const affiliate = getProductAffiliate(product);
                    const shopHref = offer?.url ?? affiliate?.url;
                    return (
                      <td
                        key={`buy-${product.id}`}
                        className="py-3 pr-4 align-middle last:pr-0"
                      >
                        {shopHref ? (
                          <a
                            href={shopHref}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="inline-flex font-display text-xs font-semibold uppercase tracking-[0.12em] text-accent transition-colors hover:text-accent-dim"
                          >
                            Tjek aktuel pris →
                          </a>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* When to pick which */}
        {guide.learningSections.map((section) => (
          <section key={section.heading} className="mt-14 scroll-mt-28">
            <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-muted leading-relaxed"
                >
                  <GuideRichText text={paragraph} currentSlug={guide.slug} />
                </p>
              ))}
            </div>
          </section>
        ))}

        {guide.howToChoose ? (
          <section className="mt-14 scroll-mt-28 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
              Kort opsummering
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              <GuideRichText
                text={guide.howToChoose}
                currentSlug={guide.slug}
              />
            </p>
          </section>
        ) : null}

        {/* Deep links to modelguides */}
        {modelGuideLinks.length > 0 ? (
          <aside className="mt-14 border-t border-border pt-10">
            <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-muted">
              Gå i dybden
            </p>
            <ul className="mt-4 space-y-3">
              {modelGuideLinks.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={guidePath(r)}
                    className="font-display text-lg uppercase tracking-wide text-accent transition-colors hover:text-accent-dim"
                  >
                    {r.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <GuideAffiliateBanner guide={guide} />

        {guide.faqs.length > 0 ? (
          <section
            id="faq"
            className="mt-14 scroll-mt-28 border-t border-border pt-10"
          >
            <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
              Ofte stillede spørgsmål
            </h2>
            <dl className="mt-8 space-y-8">
              {guide.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-display text-lg font-medium uppercase tracking-wide text-foreground">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-muted leading-relaxed">
                    <GuideRichText
                      text={faq.answer}
                      currentSlug={guide.slug}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <aside
          id="tilbud"
          className="mt-14 scroll-mt-28 border-t border-border pt-10"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-muted">
              Relaterede tilbud
            </p>
            {category ? (
              <Link
                href={categoryHref}
                className="font-display text-xs uppercase tracking-[0.14em] text-accent transition-colors hover:text-accent-dim"
              >
                Se alle {category.name.toLowerCase()} →
              </Link>
            ) : null}
          </div>
          {relatedOffers.length > 0 ? (
            <ProductOfferList products={relatedOffers} compact />
          ) : (
            <p className="mt-4 text-sm text-muted">
              Ingen aktuelle tilbud i feedet lige nu.{" "}
              {category ? (
                <Link
                  href={categoryHref}
                  className="text-accent underline-offset-2 hover:underline"
                >
                  Se kategorien alligevel →
                </Link>
              ) : null}
            </p>
          )}
        </aside>

        {otherRelated.length > 0 ? (
          <aside className="mt-14 border-t border-border pt-10">
            <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-muted">
              Relaterede guides
            </p>
            <ul className="mt-4 space-y-3">
              {otherRelated.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={guidePath(r)}
                    className="font-display text-lg uppercase tracking-wide text-accent transition-colors hover:text-accent-dim"
                  >
                    {r.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <p className="mt-12 text-xs text-muted">
          Fitlist kan modtage provision, når du køber via vores links. Det påvirker
          ikke prisen for dig. Læs mere under{" "}
          <Link
            href="/saadan-tjener-vi-penge"
            className="text-foreground underline-offset-2 hover:underline"
          >
            Sådan tjener vi penge
          </Link>
          .
        </p>

        <Link
          href="/guides"
          className="mt-10 inline-flex font-display text-sm font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:text-accent-dim"
        >
          ← Alle guides
        </Link>
      </div>
    </article>
  );
}
