import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Om Fitlist",
  description: "Hvad Fitlist er, og hvordan vi hjælper dig med hjemmetræning.",
  alternates: { canonical: canonical("/om") },
};

export default function OmPage() {
  return (
    <div className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Om
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold uppercase tracking-wide text-foreground sm:text-5xl">
          Fitlist
        </h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
          <p>
            Fitlist er den ultimative online-hjælper til træningsmaskiner til
            hjemmet. Vi samler guides, sammenligninger og konkrete anbefalinger,
            så du hurtigt finder det rigtige udstyr.
          </p>
          <p>
            Fokus er smalt med vilje: løbebånd, cykler, romaskiner, crosstrainere
            og styrkemaskiner — ikke hele fitness-universet. Færre, skarpere
            guides, der opdateres.
          </p>
          <p>
            Siden er under opbygning. Produktanbefalinger og partnerlinks kommer
            løbende.
          </p>
        </div>

        <p className="mt-10 text-sm text-muted">
          Læs hvordan indholdet finansieres:{" "}
          <Link
            href="/saadan-tjener-vi-penge"
            className="text-accent transition-colors hover:text-accent-dim"
          >
            Sådan tjener vi penge →
          </Link>
        </p>
        <p className="mt-4 text-sm text-muted">
          Kontakt:{" "}
          <Link
            href="/kontakt"
            className="text-accent transition-colors hover:text-accent-dim"
          >
            info@fitlist.dk
          </Link>
        </p>
      </div>
    </div>
  );
}
