import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookiepolitik",
  description:
    "Hvordan Fitlist bruger cookies, og hvad der sker når du klikker videre til forhandlere.",
  alternates: { canonical: canonical("/cookies") },
};

export default function CookiesPage() {
  return (
    <div className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Cookies
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold uppercase tracking-wide text-foreground sm:text-5xl">
          Cookiepolitik
        </h1>
        <p className="mt-3 text-sm text-muted">Senest opdateret: 17. november 2026</p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
          <p>
            Cookies er små tekstfiler, der lagres i din browser. De kan være
            nødvendige for at en side virker, eller bruges til statistik og
            annoncering.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            Status på Fitlist lige nu
          </h2>
          <div className="mt-4 space-y-4 text-muted leading-relaxed">
            <p>
              Fitlist indlæser Google Tag Manager. Statistik- og marketingtags i
              den container, herunder Google-tags, må først sætte cookies, når
              du har trykket Accepter i samtykkebanneret. Indtil da er de afvist
              som standard.
            </p>
            <p>
              Der kan være tekniske cookies eller lignende teknologier fra vores
              hosting/platform, som er nødvendige for at levere siden sikkert og
              stabilt. De kræver ikke samtykke.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            Typer af cookies
          </h2>
          <ul className="mt-5 space-y-4 text-muted leading-relaxed">
            <li className="border-l-2 border-accent/40 pl-5">
              <strong className="text-foreground">Nødvendige.</strong> Kræves
              for grundlæggende funktion, sikkerhed og drift. Kan sættes uden
              samtykke.
            </li>
            <li className="border-l-2 border-accent/40 pl-5">
              <strong className="text-foreground">Statistik og marketing.</strong>{" "}
              Bruges til at forstå brug eller vise annoncer. Sættes kun, når du
              har accepteret i samtykkebanneret.
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            Affiliate-links
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Når du klikker på et affiliate-link og forlader Fitlist, kan
            forhandleren eller affiliate-netværket (fx Partner-Ads og Adtraction) sætte egne
            cookies i deres regi for at registrere klik og køb. Det styres af
            dem — ikke af Fitlist. Se også{" "}
            <Link
              href="/saadan-tjener-vi-penge"
              className="text-accent transition-colors hover:text-accent-dim"
            >
              hvordan vi tjener penge
            </Link>
            .
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            Sådan styrer du cookies
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Du kan altid slette eller blokere cookies i din browsers
            indstillinger. Bemærk, at nogle funktioner på websites kan virke
            dårligere, hvis nødvendige cookies blokeres. Vil du ændre et
            tidligere valg i samtykkebanneret, skal du slette data for
            fitlist.dk i browseren og indlæse siden igen. Så vises banneret på
            ny.
          </p>
        </section>

        <p className="mt-12 text-sm text-muted">
          Læs mere i vores{" "}
          <Link
            href="/privatlivspolitik"
            className="text-accent transition-colors hover:text-accent-dim"
          >
            privatlivspolitik
          </Link>
          , eller{" "}
          <Link
            href="/kontakt"
            className="text-accent transition-colors hover:text-accent-dim"
          >
            kontakt os
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
