import Link from "next/link";

export default function GuideNotFound() {
  return (
    <div className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
        <h1 className="font-display text-4xl font-semibold uppercase tracking-wide text-foreground">
          Guide ikke fundet
        </h1>
        <p className="mt-4 text-muted">
          Denne guide findes ikke — eller er ikke publiceret endnu.
        </p>
        <Link
          href="/guides"
          className="mt-8 inline-flex font-display text-sm font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:text-accent-dim"
        >
          ← Tilbage til guides
        </Link>
      </div>
    </div>
  );
}
