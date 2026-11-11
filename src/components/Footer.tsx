import Link from "next/link";
import { FACEBOOK_URL } from "@/lib/site";

function FacebookIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073" />
    </svg>
  );
}

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
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fitlist på Facebook"
            className="mt-3 inline-flex text-muted transition-colors hover:text-foreground"
          >
            <FacebookIcon />
          </a>
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
