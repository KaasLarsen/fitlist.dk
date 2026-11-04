import Link from "next/link";

export function Hero() {
  return (
    <section className="noise relative flex min-h-[100svh] flex-col justify-end overflow-hidden hero-glow">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[55%] max-w-3xl opacity-40"
        style={{
          background:
            "linear-gradient(105deg, transparent 0%, rgba(200,245,49,0.03) 40%, transparent 70%), repeating-linear-gradient(-18deg, transparent, transparent 48px, rgba(200,245,49,0.04) 48px, rgba(200,245,49,0.04) 49px)",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32">
        <p className="animate-fade-up font-display text-5xl font-semibold uppercase tracking-[0.08em] text-accent sm:text-7xl md:text-8xl">
          Fitlist
        </p>
        <h1 className="animate-fade-up-delay mt-5 max-w-2xl font-display text-3xl font-medium uppercase leading-[1.05] tracking-wide text-foreground sm:text-4xl md:text-5xl">
          Den ultimative hjælper til træningsmaskiner til hjemmet
        </h1>
        <p className="animate-fade-up-delay-2 mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
          Guides, sammenligninger og anbefalinger — så du vælger rigtigt første
          gang.
        </p>
        <div className="animate-fade-up-delay-2 mt-10">
          <Link
            href="/guides"
            className="inline-flex items-center bg-accent px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.14em] text-accent-fg transition-all duration-200 hover:bg-accent-dim hover:tracking-[0.18em]"
          >
            Se guides
          </Link>
        </div>
      </div>
    </section>
  );
}
