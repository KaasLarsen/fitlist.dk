import { CategoryOffersSkeleton } from "@/components/CategoryOffersSkeleton";

export default function MaskineCategoryLoading() {
  return (
    <div className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
        <div className="h-4 w-24 animate-pulse bg-surface" />
        <div className="mt-4 h-12 w-64 max-w-full animate-pulse bg-surface sm:h-14" />
        <div className="mt-4 h-5 w-full max-w-2xl animate-pulse bg-surface" />
        <div className="mt-2 h-5 w-72 max-w-full animate-pulse bg-surface" />

        <section className="mt-12" aria-hidden>
          <div className="h-4 w-40 animate-pulse bg-surface" />
          <ul className="mt-4 flex flex-wrap gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i}>
                <div className="h-9 w-20 animate-pulse border border-border bg-surface" />
              </li>
            ))}
          </ul>
        </section>

        <CategoryOffersSkeleton />
      </div>
    </div>
  );
}
