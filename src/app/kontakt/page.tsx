import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakt Fitlist på info@fitlist.dk.",
  alternates: { canonical: canonical("/kontakt") },
};

export default function KontaktPage() {
  return (
    <div className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Kontakt
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold uppercase tracking-wide text-foreground sm:text-5xl">
          Skriv til os
        </h1>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
          <p>
            Har du spørgsmål til Fitlist, vores guides eller samarbejde? Skriv
            til{" "}
            <a
              href="mailto:info@fitlist.dk"
              className="text-accent transition-colors hover:text-accent-dim"
            >
              info@fitlist.dk
            </a>
            .
          </p>
          <p>
            Fitlist er ikke en webshop. Vi sælger ikke træningsmaskiner selv —
            når du køber via vores links, sker købet hos forhandleren. Spørgsmål
            om ordre, levering, retur eller reklamation skal derfor sendes
            direkte til den forhandler, du har handlet hos.
          </p>
        </div>

        <p className="mt-10 text-sm text-muted">
          Læs også{" "}
          <Link
            href="/saadan-tjener-vi-penge"
            className="text-accent transition-colors hover:text-accent-dim"
          >
            hvordan vi tjener penge
          </Link>
          , vores{" "}
          <Link
            href="/privatlivspolitik"
            className="text-accent transition-colors hover:text-accent-dim"
          >
            privatlivspolitik
          </Link>{" "}
          og{" "}
          <Link
            href="/cookies"
            className="text-accent transition-colors hover:text-accent-dim"
          >
            cookiepolitik
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
