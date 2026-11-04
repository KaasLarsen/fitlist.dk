import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om Fitlist",
  description: "Hvad Fitlist er, og hvordan vi hjælper dig med hjemmetræning.",
};

export default function OmPage() {
  return (
    <div className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
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
            Siden er under opbygning. Guides og partnerlinks kommer løbende —
            hold øje her, når indholdet går live.
          </p>
        </div>
      </div>
    </div>
  );
}
