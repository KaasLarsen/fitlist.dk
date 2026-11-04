import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sådan tjener vi penge",
  description:
    "Fitlist er reklamefinansieret. Sådan fungerer vores affiliate-links, og hvad det betyder for dig.",
};

export default function MonetizationPage() {
  return (
    <div className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Transparens
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold uppercase tracking-wide text-foreground sm:text-5xl">
          Sådan tjener vi penge
        </h1>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
          <p>
            Fitlist er gratis at bruge. Vi finansierer siden via affiliate-links
            til webshops og partnere. Når du klikker videre og køber noget via
            vores links, kan vi modtage en kommission.
          </p>
          <p>
            Det koster dig ikke ekstra. Prisen er den samme, som hvis du gik
            direkte til forhandleren.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            Hvordan vi vælger
          </h2>
          <ul className="mt-5 space-y-4 text-muted leading-relaxed">
            <li className="border-l-2 border-accent/40 pl-5">
              <strong className="text-foreground">Behov først.</strong> Vi
              starter med plads, budget, støj og træningsmål — ikke provision.
            </li>
            <li className="border-l-2 border-accent/40 pl-5">
              <strong className="text-foreground">Samme kriterier.</strong>{" "}
              Modeller i en guide vurderes efter de samme punkter (fx motor,
              footprint, støj, holdbarhed).
            </li>
            <li className="border-l-2 border-accent/40 pl-5">
              <strong className="text-foreground">Ingen betalte placeringer.</strong>{" "}
              En partner kan ikke købe sig til “bedst i test”. Links markeres, når
              de er affiliate.
            </li>
            <li className="border-l-2 border-accent/40 pl-5">
              <strong className="text-foreground">Opdateringer.</strong> Guides
              får en “opdateret”-dato, så du kan se, hvornår indholdet sidst er
              gennemgået.
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            Hvad vi ikke er
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Fitlist er ikke en webshop. Vi sælger ikke maskinerne selv — vi
            hjælper dig med at vælge og sender dig videre til forhandleren.
          </p>
        </section>

        <p className="mt-12 text-sm text-muted">
          Spørgsmål? Skriv til{" "}
          <a
            href="mailto:info@fitlist.dk"
            className="text-foreground underline-offset-2 hover:underline"
          >
            info@fitlist.dk
          </a>{" "}
          eller se{" "}
          <Link
            href="/kontakt"
            className="text-foreground underline-offset-2 hover:underline"
          >
            kontaktsiden
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
