"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import type { SearchResults } from "@/lib/search";

const emptyResults: SearchResults = {
  categories: [],
  guides: [],
  products: [],
};

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 6l12 12" />
      <path d="M18 6l-12 12" />
    </svg>
  );
}

export function HeaderSearch() {
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>(emptyResults);
  const [loading, setLoading] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setResults(emptyResults);
    setLoading(false);
    abortRef.current?.abort();
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  const runSearch = useCallback(async (q: string) => {
    abortRef.current?.abort();
    if (q.trim().length < 2) {
      setResults(emptyResults);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`, {
        signal: controller.signal,
      });
      if (!res.ok) throw new Error("search failed");
      const data = (await res.json()) as SearchResults;
      setResults(data);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setResults(emptyResults);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    function onPointerDown(e: MouseEvent | PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) close();
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, close]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  function onQueryChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      void runSearch(value);
    }, 200);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    void runSearch(query);
  }

  const hasQuery = query.trim().length >= 2;
  const totalHits =
    results.categories.length +
    results.guides.length +
    results.products.length;
  const showEmpty = hasQuery && !loading && totalHits === 0;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label="Søg"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          if (open) close();
          else setOpen(true);
        }}
        className="header-chrome flex size-9 items-center justify-center transition-colors"
      >
        <SearchIcon />
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="Søg på Fitlist"
          className="fixed left-4 right-4 top-[calc(var(--campaign-banner-h)+4.5rem)] z-[70] border border-border bg-surface animate-fade-in md:absolute md:left-auto md:right-0 md:top-full md:mt-2 md:w-[min(100vw-2rem,22rem)]"
        >
          <form onSubmit={onSubmit} className="border-b border-border p-3">
            <div className="flex items-center gap-2">
              <label className="sr-only" htmlFor={`${panelId}-input`}>
                Søg
              </label>
              <div className="flex min-w-0 flex-1 items-center gap-2 border border-border bg-background px-3 py-2 focus-within:border-accent">
                <SearchIcon className="shrink-0 text-muted" />
                <input
                  ref={inputRef}
                  id={`${panelId}-input`}
                  type="search"
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  placeholder="Søg maskiner, guides…"
                  autoComplete="off"
                  className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted"
                />
              </div>
              <button
                type="button"
                aria-label="Luk søgning"
                onClick={close}
                className="flex size-9 shrink-0 items-center justify-center text-muted transition-colors hover:text-foreground md:hidden"
              >
                <CloseIcon />
              </button>
            </div>
          </form>

          <div className="max-h-[min(50dvh,24rem)] overflow-y-auto md:max-h-[min(70vh,24rem)]">
            {loading ? (
              <p className="px-4 py-6 text-center text-sm text-muted">
                Søger…
              </p>
            ) : null}

            {!loading && !hasQuery ? (
              <p className="px-4 py-6 text-center text-sm text-muted">
                Skriv mindst 2 tegn for at søge
              </p>
            ) : null}

            {showEmpty ? (
              <p className="px-4 py-6 text-center text-sm text-muted">
                Ingen resultater for &ldquo;{query.trim()}&rdquo;
              </p>
            ) : null}

            {!loading && results.categories.length > 0 ? (
              <section>
                <h2 className="px-4 pb-1 pt-3 font-display text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  Maskiner
                </h2>
                <ul className="divide-y divide-border border-t border-border">
                  {results.categories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/maskiner/${cat.slug}`}
                        onClick={close}
                        className="block px-4 py-3 transition-colors hover:bg-accent/5"
                      >
                        <span className="block text-sm font-medium text-foreground">
                          {cat.name}
                        </span>
                        <span className="mt-0.5 line-clamp-1 block text-xs text-muted">
                          {cat.description}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {!loading && results.guides.length > 0 ? (
              <section>
                <h2 className="px-4 pb-1 pt-3 font-display text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  Guides
                </h2>
                <ul className="divide-y divide-border border-t border-border">
                  {results.guides.map((guide) => (
                    <li key={guide.slug}>
                      <Link
                        href={`/guides/${guide.slug}`}
                        onClick={close}
                        className="block px-4 py-3 transition-colors hover:bg-accent/5"
                      >
                        <span className="block text-sm font-medium text-foreground">
                          {guide.title}
                        </span>
                        <span className="mt-0.5 line-clamp-1 block text-xs text-muted">
                          {guide.excerpt}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {!loading && results.products.length > 0 ? (
              <section>
                <h2 className="px-4 pb-1 pt-3 font-display text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  Produkter
                </h2>
                <ul className="divide-y divide-border border-t border-border">
                  {results.products.map((product) => (
                    <li key={product.id}>
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        onClick={close}
                        className="block px-4 py-3 transition-colors hover:bg-accent/5"
                      >
                        <span className="block text-sm font-medium text-foreground">
                          {product.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted">
                          {product.priceLabel}
                          {product.merchant ? ` · ${product.merchant}` : ""}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
