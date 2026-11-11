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
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <Link href="/tilbud" className="transition-colors hover:text-foreground">
            Tilbud
          </Link>
          <Link href="/maskiner" className="transition-colors hover:text-foreground">
            Maskiner
          </Link>
          <Link href="/guides" className="transition-colors hover:text-foreground">
            Guides
          </Link>
          <Link href="/om" className="transition-colors hover:text-foreground">
            Om
          </Link>
          <Link
            href="/saadan-tjener-vi-penge"
            className="transition-colors hover:text-foreground"
          >
            Sådan tjener vi penge
          </Link>
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Fitlist.dk · Siden indeholder affiliate-links</p>
          <nav className="flex flex-wrap gap-x-4 gap-y-1">
            <Link
              href="/privatlivspolitik"
              className="transition-colors hover:text-foreground"
            >
              Privatlivspolitik
            </Link>
            <Link href="/cookies" className="transition-colors hover:text-foreground">
              Cookies
            </Link>
            <Link href="/kontakt" className="transition-colors hover:text-foreground">
              Kontakt
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
