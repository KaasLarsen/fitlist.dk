import Link from "next/link";
import { ProductOfferList } from "@/components/ProductOfferList";
import { getCategory } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/feeds/catalog";
import type { MachineCategorySlug } from "@/lib/feeds/types";
import {
  getProductAffiliate,
  getRelatedGuides,
  type Guide,
} from "@/lib/guides";

export async function GuideArticle({ guide }: { guide: Guide }) {
  const category = getCategory(guide.categorySlug);
  const related = getRelatedGuides(guide);
  const relatedOffers = await getProductsByCategory(
    guide.categorySlug as MachineCategorySlug,
    { limit: 3, inStockOnly: true },
  );

  return (
    <article className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          {category ? (
            <Link
              href={`/maskiner/${category.slug}`}
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

        {guide.products.length > 0 ? (
          <nav aria-label="Produkter i guiden" className="mt-12 border-t border-border pt-8">
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
          </nav>
        ) : null}

        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            Sådan vælger du
          </h2>
          <ul className="mt-6 space-y-6">
            {guide.criteria.map((criterion) => (
              <li key={criterion.title} className="border-l-2 border-accent/40 pl-5">
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

        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            Anbefalede modeller
          </h2>
          {guide.products.length === 0 ? (
            <p className="mt-4 text-muted leading-relaxed">
              Konkret rangering og købslinks lander her, så snart partneraftalerne
              er på plads. Kriterierne ovenfor er dem, vi vurderer efter.
            </p>
          ) : (
            <div className="mt-8 space-y-14">
              {guide.products.map((product) => {
                const affiliate = getProductAffiliate(product);
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
                          <div key={spec.label} className="flex justify-between gap-4">
                            <dt className="text-muted">{spec.label}</dt>
                            <dd className="text-right text-foreground">
                              {spec.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}

                    {affiliate ? (
                      <a
                        href={affiliate.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="mt-8 inline-flex items-center bg-accent px-5 py-3 font-display text-sm font-semibold uppercase tracking-[0.12em] text-accent-fg transition-colors hover:bg-accent-dim"
                      >
                        {affiliate.label}
                      </a>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="mt-14 border-t border-border pt-10">
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
            <p className="mt-4 text-muted leading-relaxed">{section.body}</p>
          </section>
        ))}

        {relatedOffers.length > 0 ? (
          <aside className="mt-14 border-t border-border pt-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-muted">
                Relaterede tilbud
              </p>
              {category ? (
                <Link
                  href={`/maskiner/${category.slug}`}
                  className="font-display text-xs uppercase tracking-[0.14em] text-accent transition-colors hover:text-accent-dim"
                >
                  Se alle {category.name.toLowerCase()} →
                </Link>
              ) : null}
            </div>
            <ProductOfferList products={relatedOffers} compact />
          </aside>
        ) : null}

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
