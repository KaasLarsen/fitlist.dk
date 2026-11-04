import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-lg font-semibold uppercase tracking-[0.12em] text-foreground">
            Fitlist
          </p>
          <p className="mt-1 text-sm text-muted">
            Hjælperen til træningsmaskiner til hjemmet.
          </p>
        </div>
        <nav className="flex gap-6 text-sm text-muted">
          <Link href="/guides" className="transition-colors hover:text-foreground">
            Guides
          </Link>
          <Link href="/om" className="transition-colors hover:text-foreground">
            Om
          </Link>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-5 py-4 text-xs text-muted sm:px-8">
          © {new Date().getFullYear()} Fitlist.dk
        </p>
      </div>
    </footer>
  );
}
