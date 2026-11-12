"use client";

import { useMemo, useState } from "react";
import { PriceRangeSlider } from "@/components/PriceRangeSlider";
import { ProductOfferList } from "@/components/ProductOfferList";
import type { FeedProduct } from "@/lib/feeds/types";

type Props = {
  products: FeedProduct[];
  emptyMessage: string;
  intentLabel?: string;
};

function brandKey(brand: string): string {
  return brand.trim().toLowerCase();
}

function collectBrands(products: FeedProduct[]): string[] {
  const byKey = new Map<string, string>();
  for (const product of products) {
    const raw = product.brand?.trim();
    if (!raw) continue;
    const key = brandKey(raw);
    if (!byKey.has(key)) byKey.set(key, raw);
  }
  return [...byKey.values()].sort((a, b) => a.localeCompare(b, "da"));
}

function priceBounds(
  products: FeedProduct[],
): { min: number; max: number } | null {
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for (const product of products) {
    if (product.price == null || !Number.isFinite(product.price)) continue;
    min = Math.min(min, product.price);
    max = Math.max(max, product.price);
  }
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  const roundedMin = Math.floor(min / 100) * 100;
  const roundedMax = Math.ceil(max / 100) * 100;
  return {
    min: roundedMin,
    max: Math.max(roundedMax, roundedMin + 100),
  };
}

export function CategoryOffersFilterable({
  products,
  emptyMessage,
  intentLabel,
}: Props) {
  const brands = useMemo(() => collectBrands(products), [products]);
  const bounds = useMemo(() => priceBounds(products), [products]);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [priceMin, setPriceMin] = useState(bounds?.min ?? 0);
  const [priceMax, setPriceMax] = useState(bounds?.max ?? 0);

  const selectedBrandKeys = useMemo(
    () => new Set(selectedBrands.map(brandKey)),
    [selectedBrands],
  );

  const priceFilterActive =
    bounds != null && (priceMin > bounds.min || priceMax < bounds.max);
  const brandFilterActive = selectedBrands.length > 0;
  const filtersActive = brandFilterActive || priceFilterActive;

  const filtered = useMemo(() => {
    return products.filter((product) => {
      if (brandFilterActive) {
        const key = brandKey(product.brand ?? "");
        if (!key || !selectedBrandKeys.has(key)) return false;
      }

      if (priceFilterActive) {
        if (product.price == null || !Number.isFinite(product.price)) {
          return false;
        }
        if (product.price < priceMin || product.price > priceMax) return false;
      }

      return true;
    });
  }, [
    products,
    brandFilterActive,
    selectedBrandKeys,
    priceFilterActive,
    priceMin,
    priceMax,
  ]);

  function toggleBrand(brand: string) {
    const key = brandKey(brand);
    setSelectedBrands((prev) => {
      const exists = prev.some((b) => brandKey(b) === key);
      if (exists) return prev.filter((b) => brandKey(b) !== key);
      return [...prev, brand];
    });
  }

  function resetFilters() {
    setSelectedBrands([]);
    if (bounds) {
      setPriceMin(bounds.min);
      setPriceMax(bounds.max);
    }
  }

  const filterEmptyMessage = filtersActive
    ? "Ingen tilbud matcher dine filtre. Prøv at justere mærke eller pris."
    : emptyMessage;

  if (products.length === 0) {
    return (
      <section className="mt-16 border-t border-border pt-10">
        <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
          Tilbud
        </h2>
        <ProductOfferList products={[]} emptyMessage={emptyMessage} />
      </section>
    );
  }

  const showFilters = brands.length > 0 || bounds != null;

  return (
    <section className="mt-16 border-t border-border pt-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
          Tilbud
        </h2>
        <p className="font-display text-xs uppercase tracking-[0.14em] text-muted">
          {filtered.length} produkt{filtered.length === 1 ? "" : "er"}
          {intentLabel ? ` · ${intentLabel}` : ""}
          {filtersActive && filtered.length !== products.length
            ? ` af ${products.length}`
            : ""}
        </p>
      </div>

      {showFilters ? (
        <div className="mt-8 space-y-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-muted">
              Filtrer tilbud
            </p>
            {filtersActive ? (
              <button
                type="button"
                onClick={resetFilters}
                className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:text-accent-dim"
              >
                Nulstil filtre
              </button>
            ) : null}
          </div>

          {brands.length > 0 ? (
            <div>
              <button
                type="button"
                onClick={() => setBrandsOpen((open) => !open)}
                aria-expanded={brandsOpen}
                className="flex w-full items-center justify-between gap-3 text-left transition-colors hover:text-foreground"
              >
                <span className="font-display text-sm font-medium uppercase tracking-[0.16em] text-muted">
                  Mærke
                  {brandFilterActive
                    ? ` · ${selectedBrands.length} valgt`
                    : ""}
                </span>
                <span
                  aria-hidden
                  className={`font-display text-sm text-muted transition-transform ${
                    brandsOpen ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>
              {brandsOpen ? (
                <ul className="mt-4 flex flex-wrap gap-3">
                  {brands.map((brand) => {
                    const active = selectedBrandKeys.has(brandKey(brand));
                    return (
                      <li key={brandKey(brand)}>
                        <button
                          type="button"
                          onClick={() => toggleBrand(brand)}
                          aria-pressed={active}
                          className={`inline-flex border px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                            active
                              ? "border-accent bg-accent text-accent-fg"
                              : "border-border text-muted hover:border-foreground hover:text-foreground"
                          }`}
                        >
                          {brand}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          ) : null}

          {bounds ? (
            <PriceRangeSlider
              min={bounds.min}
              max={bounds.max}
              valueMin={priceMin}
              valueMax={priceMax}
              onChange={({ min, max }) => {
                setPriceMin(min);
                setPriceMax(max);
              }}
            />
          ) : null}
        </div>
      ) : null}

      <ProductOfferList products={filtered} emptyMessage={filterEmptyMessage} />
    </section>
  );
}
