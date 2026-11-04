import Image from "next/image";
import Link from "next/link";
import { ProductOfferList } from "@/components/ProductOfferList";
import { getCategory } from "@/lib/categories";
import {
  formatPriceDkk,
  getFeedProductById,
  getProductsByCategory,
} from "@/lib/feeds/catalog";
import type { FeedProduct, MachineCategorySlug } from "@/lib/feeds/types";
import {
  getProductAffiliate,
  getRelatedGuides,
  type Guide,
  type GuideProduct,
} from "@/lib/guides";

async function resolveGuideOffers(
  products: GuideProduct[],
): Promise<Map<string, FeedProduct | undefined>> {
  const ids = new Set<string>();
  for (const product of products) {
    if (product.feedProductId) ids.add(product.feedProductId);
    for (const item of product.bundleItems ?? []) {
      ids.add(item.feedProductId);
    }
  }

  const entries = await Promise.all(
    [...ids].map(async (id) => {
      const offer = await getFeedProductById(id);
      return [id, offer] as const;
    }),
  );
  return new Map(entries);
}

export async function GuideArticle({ guide }: { guide: Guide }) {
  const category = getCategory(guide.categorySlug);
  const related = getRelatedGuides(guide);
  const recommendationsHeading =
    guide.recommendationsHeading ?? "Anbefalede modeller";
  const [relatedOffers, offerMap] = await Promise.all([
    getProductsByCategory(guide.categorySlug as MachineCategorySlug, {
      intentSlug: guide.intentSlug,
      limit: 3,
      inStockOnly: true,
    }),
    resolveGuideOffers(guide.products),
  ]);

  const categoryHref = category
    ? guide.intentSlug
      ? `/maskiner/${category.slug}?intent=${guide.intentSlug}`
      : `/maskiner/${category.slug}`
    : "/maskiner";

  return (
    <article className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          {category ? (
            <Link
              href={categoryHref}
              className="font-display font-medium uppercase tracking-[0.2em] text-accent transition-colors hover:text-accent-dim"
            >
              {category.name}
            </Link>
          ) : (
            <span className="font-display font-medium uppercase tracking-[0.2em] text-accent">
              Guide
            </span>
          )}
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
        <p className="mt-6 text-base leading-relaxed text-foreground/90">
          {guide.intro}
        </p>

        <nav
          aria-label="Indhold i guiden"
          className="mt-12 border-t border-border pt-8"
        >
          <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-muted">
            I denne guide
          </p>
          <ul className="mt-4 space-y-2 text-foreground/90">
            {guide.products.length > 0 ? (
              <li>
                <a
                  href="#anbefalinger"
                  className="transition-colors hover:text-accent"
                >
                  {recommendationsHeading}
                </a>
              </li>
            ) : null}
            <li>
              <a
                href="#saadan-vaelger-du"
                className="transition-colors hover:text-accent"
              >
                Sådan vælger du
              </a>
            </li>
            <li>
              <a
                href="#opsummering"
                className="transition-colors hover:text-accent"
              >
                Kort opsummering
              </a>
            </li>
            {guide.faqs.length > 0 ? (
              <li>
                <a href="#faq" className="transition-colors hover:text-accent">
                  Ofte stillede spørgsmål
                </a>
              </li>
            ) : null}
            <li>
              <a
                href="#tilbud"
                className="transition-colors hover:text-accent"
              >
                Relaterede tilbud
              </a>
            </li>
          </ul>

          {guide.products.length > 0 ? (
            <div className="mt-8">
              <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-muted">
                I denne test
              </p>
              <ol className="mt-4 space-y-2">
                {guide.products.map((product, i) => (
                  <li key={product.id}>
                    <a
                      href={`#produkt-${product.id}`}
                      className="text-foreground/90 transition-colors hover:text-accent"
                    >
                      <span className="text-muted">{i + 1}.</span> {product.name}
                      {product.badge ? (
                        <span className="ml-2 text-sm text-accent">
                          ({product.badge})
                        </span>
                      ) : null}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </nav>

        <section id="anbefalinger" className="mt-14 scroll-mt-28">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            {recommendationsHeading}
          </h2>
          {guide.products.length === 0 ? (
            <p className="mt-4 text-muted leading-relaxed">
              Konkret rangering og købslinks lander her, så snart partneraftalerne
              er på plads. Kriterierne nedenfor er dem, vi vurderer efter.
            </p>
          ) : (
            <div className="mt-8 space-y-14">
              {guide.products.map((product) => {
                const offer = product.feedProductId
                  ? offerMap.get(product.feedProductId)
                  : undefined;
                const affiliate = getProductAffiliate(product);
                const shopHref = offer?.url ?? affiliate?.url;
                const shopLabel = offer
                  ? `Se pris hos ${offer.merchant}`
                  : affiliate?.label;
                const hasDiscount =
                  offer?.oldPrice != null &&
                  offer.price != null &&
                  offer.oldPrice > offer.price;
                const bundleItems = product.bundleItems ?? [];

                return (
                  <div
                    key={product.id}
                    id={`produkt-${product.id}`}
                    className="scroll-mt-28 border-t border-border pt-10"
                  >
                    {product.badge ? (
                      <p className="font-display text-xs font-medium uppercase tracking-[0.18em] text-accent">
                        {product.badge}
                      </p>
                    ) : null}
                    <h3 className="mt-2 font-display text-2xl font-medium uppercase tracking-wide text-foreground">
                      {product.name}
                    </h3>
                    <p className="mt-3 text-muted leading-relaxed">
                      {product.summary}
                    </p>

                    {offer ? (
                      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                        <div className="relative h-36 w-full shrink-0 overflow-hidden border border-border bg-surface sm:h-28 sm:w-36">
                          {offer.image ? (
                            <Image
                              src={offer.image}
                              alt=""
                              fill
                              sizes="(max-width: 640px) 100vw, 144px"
                              className="object-contain p-2"
                              unoptimized
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center font-display text-xs uppercase tracking-[0.14em] text-muted">
                              Intet billede
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-display text-xs uppercase tracking-[0.14em] text-muted">
                            {offer.merchant}
                            {!offer.inStock ? (
                              <span className="ml-2 text-muted/80">
                                · Ikke på lager
                              </span>
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
                      </div>
                    ) : null}

                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      <div>
                        <p className="font-display text-xs uppercase tracking-[0.16em] text-muted">
                          Fordele
                        </p>
                        <ul className="mt-2 space-y-1.5 text-sm text-foreground/90">
                          {product.pros.map((pro) => (
                            <li key={pro}>+ {pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-display text-xs uppercase tracking-[0.16em] text-muted">
                          Ulemper
                        </p>
                        <ul className="mt-2 space-y-1.5 text-sm text-foreground/90">
                          {product.cons.map((con) => (
                            <li key={con}>− {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {product.specs.length > 0 ? (
                      <dl className="mt-6 grid gap-2 border-t border-border pt-6 text-sm sm:grid-cols-2">
                        {product.specs.map((spec) => (
                          <div
                            key={spec.label}
                            className="flex justify-between gap-4"
                          >
                            <dt className="text-muted">{spec.label}</dt>
                            <dd className="text-right text-foreground">
                              {spec.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}

                    {bundleItems.length > 0 ? (
                      <div className="mt-8 border-t border-border pt-6">
                        <p className="font-display text-xs uppercase tracking-[0.16em] text-muted">
                          Pakken indeholder
                        </p>
                        <ul className="mt-4 space-y-4">
                          {bundleItems.map((item) => {
                            const itemOffer = offerMap.get(item.feedProductId);
                            const itemHref = itemOffer?.url;
                            return (
                              <li
                                key={item.feedProductId}
                                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                              >
                                <div className="min-w-0">
                                  {item.role ? (
                                    <p className="font-display text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                                      {item.role}
                                    </p>
                                  ) : null}
                                  <p className="text-sm text-foreground/90">
                                    {item.name}
                                  </p>
                                  {itemOffer ? (
                                    <p className="mt-0.5 text-sm tabular-nums text-muted">
                                      {formatPriceDkk(itemOffer.price)}
                                      <span className="ml-2">
                                        · {itemOffer.merchant}
                                      </span>
                                      {!itemOffer.inStock ? (
                                        <span className="ml-2">
                                          · Ikke på lager
                                        </span>
                                      ) : null}
                                    </p>
                                  ) : null}
                                </div>
                                {itemHref ? (
                                  <a
                                    href={itemHref}
                                    target="_blank"
                                    rel="noopener noreferrer sponsored"
                                    className="inline-flex shrink-0 items-center border border-border px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.12em] text-accent transition-colors hover:border-accent hover:text-accent-dim"
                                  >
                                    Se pris →
                                  </a>
                                ) : null}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ) : null}

                    {shopHref && shopLabel ? (
                      <a
                        href={shopHref}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="mt-8 inline-flex items-center bg-accent px-5 py-3 font-display text-sm font-semibold uppercase tracking-[0.12em] text-accent-fg transition-colors hover:bg-accent-dim"
                      >
                        {shopLabel}
                      </a>
                    ) : (
                      <Link
                        href={categoryHref}
                        className="mt-8 inline-flex items-center border border-border px-5 py-3 font-display text-sm font-semibold uppercase tracking-[0.12em] text-accent transition-colors hover:border-accent hover:text-accent-dim"
                      >
                        Se tilbud i kategorien →
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {category ? (
          <aside className="mt-12 border border-border bg-surface/40 px-5 py-6 sm:px-6">
            <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-muted">
              Klar til at shoppe?
            </p>
            <p className="mt-2 text-sm text-foreground/90 leading-relaxed">
              Se flere aktuelle tilbud på {category.name.toLowerCase()} hos vores
              partnere — priser opdateres løbende.
            </p>
            <Link
              href={categoryHref}
              className="mt-4 inline-flex font-display text-sm font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:text-accent-dim"
            >
              Se alle {category.name.toLowerCase()} →
            </Link>
          </aside>
        ) : null}

        <section id="saadan-vaelger-du" className="mt-14 scroll-mt-28">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            Sådan vælger du
          </h2>
          <ul className="mt-6 space-y-6">
            {guide.criteria.map((criterion) => (
              <li
                key={criterion.title}
                className="border-l-2 border-accent/40 pl-5"
              >
                <h3 className="font-display text-lg font-medium uppercase tracking-wide text-foreground">
                  {criterion.title}
                </h3>
                <p className="mt-2 text-muted leading-relaxed">
                  {criterion.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="opsummering"
          className="mt-14 scroll-mt-28 border-t border-border pt-10"
        >
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            Kort opsummering
          </h2>
          <p className="mt-4 text-muted leading-relaxed">{guide.howToChoose}</p>
        </section>

        {guide.learningSections.map((section) => (
          <section key={section.heading} className="mt-12">
            <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-muted leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            {section.comparison ? (
              <div className="mt-6 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
                {section.comparison.caption ? (
                  <p className="mb-3 font-display text-xs uppercase tracking-[0.14em] text-muted">
                    {section.comparison.caption}
                  </p>
                ) : null}
                <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th
                        scope="col"
                        className="py-3 pr-4 font-display text-xs font-medium uppercase tracking-[0.14em] text-muted"
                      >
                        {section.comparison.rowHeaderLabel ?? "App / platform"}
                      </th>
                      {section.comparison.columns.map((col) => (
                        <th
                          key={col}
                          scope="col"
                          className="py-3 pr-4 font-display text-xs font-medium uppercase tracking-[0.14em] text-muted last:pr-0"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.comparison.rows.map((row) => (
                      <tr key={row.label} className="border-b border-border/70">
                        <th
                          scope="row"
                          className="py-3 pr-4 align-top font-display text-sm font-medium uppercase tracking-wide text-foreground"
                        >
                          {row.label}
                        </th>
                        {row.cells.map((cell, i) => (
                          <td
                            key={`${row.label}-${i}`}
                            className="py-3 pr-4 align-top text-muted last:pr-0"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </section>
        ))}

        {guide.faqs.length > 0 ? (
          <section id="faq" className="mt-14 scroll-mt-28 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
              Ofte stillede spørgsmål
            </h2>
            <dl className="mt-8 space-y-8">
              {guide.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-display text-lg font-medium uppercase tracking-wide text-foreground">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-muted leading-relaxed">{faq.answer}</dd>
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

        {related.length > 0 ? (
          <aside className="mt-14 border-t border-border pt-10">
            <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-muted">
              Relaterede guides
            </p>
            <ul className="mt-4 space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/guides/${r.slug}`}
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
