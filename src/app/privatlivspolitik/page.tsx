import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privatlivspolitik",
  description:
    "Hvordan Fitlist behandler personoplysninger, når du bruger fitlist.dk.",
  alternates: { canonical: canonical("/privatlivspolitik") },
};

export default function PrivatlivspolitikPage() {
  return (
    <div className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Privatliv
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold uppercase tracking-wide text-foreground sm:text-5xl">
          Privatlivspolitik
        </h1>
        <p className="mt-3 text-sm text-muted">Senest opdateret: 4. november 2026</p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
          <p>
            Denne privatlivspolitik beskriver, hvordan Fitlist (fitlist.dk)
            behandler personoplysninger, når du besøger siden. Fitlist er en
            redaktionel sammenlignings- og guidesite finansieret via
            affiliate-links — ikke en webshop.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            Dataansvarlig
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Fitlist er dataansvarlig for den behandling, der sker på denne
            hjemmeside. Kontakt:{" "}
            <a
              href="mailto:info@fitlist.dk"
              className="text-accent transition-colors hover:text-accent-dim"
            >
              info@fitlist.dk
            </a>
            .
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            Hvilke oplysninger vi behandler
          </h2>
          <ul className="mt-5 space-y-4 text-muted leading-relaxed">
            <li className="border-l-2 border-accent/40 pl-5">
              <strong className="text-foreground">Tekniske serverlogs.</strong>{" "}
              Ved besøg kan hosting og infrastruktur midlertidigt registrere IP,
              tidspunkt, browser/OS og den side, du anmoder om — nødvendigt for
              at levere og sikre siden.
            </li>
            <li className="border-l-2 border-accent/40 pl-5">
              <strong className="text-foreground">Cookies.</strong> Se vores{" "}
              <Link
                href="/cookies"
                className="text-accent transition-colors hover:text-accent-dim"
              >
                cookiepolitik
              </Link>{" "}
              for status på cookies og tredjepartsscripts.
            </li>
            <li className="border-l-2 border-accent/40 pl-5">
              <strong className="text-foreground">Kontakt.</strong> Skriver du
              til os, behandler vi de oplysninger, du selv sender (fx
              e-mailadresse og indhold), for at kunne svare dig.
            </li>
            <li className="border-l-2 border-accent/40 pl-5">
              <strong className="text-foreground">Affiliate-klik.</strong> Når
              du klikker videre til en forhandler via vores links, kan
              affiliate-netværk og webshops (fx Partner-Ads, Adtraction og den enkelte
              butik) registrere klikket hos dem. Den behandling sker typisk hos
              dem som selvstændige dataansvarlige.
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            Formål og retsgrundlag
          </h2>
          <div className="mt-4 space-y-4 text-muted leading-relaxed">
            <p>
              Vi behandler oplysninger for at drive, sikre og forbedre Fitlist,
              besvare henvendelser og dokumentere affiliate-trafik. Retsgrundlag
              er typisk legitim interesse (GDPR art. 6, stk. 1, litra f) i at
              levere siden og drive vores forretning.
            </p>
            <p>
              Hvis vi senere aktiverer valgfrie tracking- eller
              annoncecookies, sker det kun med dit samtykke (GDPR art. 6, stk.
              1, litra a), medmindre andet er lovpligtigt.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            Deling med tredjeparter
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Vi deler ikke dine oplysninger til salg. Oplysninger kan behandles af
            leverandører, der hjælper os med hosting og drift, af
            affiliate-partnere når du klikker videre, og — hvis aktiveret — af
            annonce- eller analyseudbydere (fx Google). Leverandører behandler
            data efter aftale og gældende lov.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            Opbevaring
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Vi opbevarer oplysninger kun så længe, det er nødvendigt til formålet
            eller for at opfylde lovkrav. Serverlogs slettes eller anonymiseres
            efter hostingleverandørens normale praksis. E-mailkorrespondance
            slettes, når sagen er afsluttet, medmindre vi har brug for at gemme
            den længere af legitim grund.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            Dine rettigheder
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Du har efter omstændighederne ret til indsigt, berigtigelse,
            sletning, begrænsning, dataportabilitet og indsigelse. Du kan også
            klage til{" "}
            <a
              href="https://www.datatilsynet.dk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent transition-colors hover:text-accent-dim"
            >
              Datatilsynet
            </a>
            . Kontakt os på{" "}
            <a
              href="mailto:info@fitlist.dk"
              className="text-accent transition-colors hover:text-accent-dim"
            >
              info@fitlist.dk
            </a>
            , hvis du vil gøre brug af dine rettigheder.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            Ændringer
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Vi kan opdatere denne politik, når vores praksis eller lovgivning
            ændrer sig. Den seneste version offentliggøres altid på denne side.
          </p>
        </section>

        <p className="mt-12 text-sm text-muted">
          Se også{" "}
          <Link
            href="/cookies"
            className="text-accent transition-colors hover:text-accent-dim"
          >
            cookiepolitik
          </Link>{" "}
          og{" "}
          <Link
            href="/kontakt"
            className="text-accent transition-colors hover:text-accent-dim"
          >
            kontakt
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
