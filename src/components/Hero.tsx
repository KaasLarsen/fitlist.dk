import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="noise relative flex min-h-[88svh] flex-col justify-end overflow-hidden sm:min-h-[92svh]">
      <Image
        src="/images/hero-home.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/45 to-foreground/25"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-foreground/50 to-transparent sm:h-32"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32">
        <p className="animate-fade-up font-display text-5xl font-semibold uppercase tracking-[0.08em] text-accent sm:text-7xl md:text-8xl">
          Fitlist
        </p>
        <h1 className="animate-fade-up-delay mt-5 max-w-2xl font-display text-3xl font-medium uppercase leading-[1.05] tracking-wide text-white sm:text-4xl md:text-5xl">
          Den ultimative hjælper til træningsmaskiner til hjemmet
        </h1>
        <p className="animate-fade-up-delay-2 mt-5 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
          Guides, sammenligninger og tilbud — så du vælger rigtigt første gang.
        </p>
        <div className="animate-fade-up-delay-2 mt-10 flex flex-wrap gap-4">
          <Link
            href="#dagens-tilbud"
            className="inline-flex items-center bg-accent px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.14em] text-accent-fg transition-all duration-200 hover:bg-accent-dim hover:tracking-[0.18em]"
          >
            Dagens tilbud
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center border border-white/40 bg-transparent px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:border-white hover:bg-white/10"
          >
            Se guides
          </Link>
        </div>
      </div>
    </section>
  );
}
