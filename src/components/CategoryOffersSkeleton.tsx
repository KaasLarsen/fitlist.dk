/** Skeleton for the Tilbud section while feed products load. */
export function CategoryOffersSkeleton() {
  return (
    <section className="mt-16 border-t border-border pt-10" aria-hidden>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="h-8 w-28 animate-pulse bg-surface" />
        <div className="h-4 w-24 animate-pulse bg-surface" />
      </div>
      <div className="mt-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 border-t border-border py-8 sm:flex-row sm:items-center sm:gap-6"
          >
            <div className="h-28 w-full shrink-0 animate-pulse border border-border bg-surface sm:h-24 sm:w-32" />
            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-3 w-20 animate-pulse bg-surface" />
              <div className="h-5 w-64 max-w-full animate-pulse bg-surface" />
              <div className="h-4 w-28 animate-pulse bg-surface" />
            </div>
            <div className="flex shrink-0 flex-row items-center justify-between gap-4 sm:flex-col sm:items-end">
              <div className="h-7 w-20 animate-pulse bg-surface" />
              <div className="h-10 w-24 animate-pulse bg-surface" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
