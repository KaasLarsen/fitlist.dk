import type { Metadata } from "next";
import { connection } from "next/server";
import { HomeGymBuilder } from "@/components/HomeGymBuilder";
import { loadHomeGymProducts } from "@/lib/home-gym-products";
import { parseBudget, parseFocus, parseSpace } from "@/lib/home-gym";
import { canonical } from "@/lib/site";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: "Hjemme-gym bygger",
  description:
    "Vælg plads, fokus og budget. Fitlist sammensætter et hjemme-gym af partnernes maskiner med pris, lagerstatus og link til specifikationer.",
  alternates: { canonical: canonical("/hjemme-gym") },
  openGraph: {
    title: "Hjemme-gym bygger",
    description:
      "Tre spørgsmål om plads, fokus og budget. Så får du et konkret setup med live priser fra vores partnere.",
    url: canonical("/hjemme-gym"),
    type: "website",
    locale: "da_DK",
    siteName: "Fitlist",
  },
};

type Props = {
  searchParams: Promise<{
    plads?: string;
    fokus?: string;
    budget?: string;
  }>;
};

export default async function HomeGymPage({ searchParams }: Props) {
  await connection();
  const params = await searchParams;
  const space = parseSpace(params.plads);
  const focus = space ? parseFocus(params.fokus) : null;
  const budget = space && focus ? parseBudget(params.budget) : null;
  const products = await loadHomeGymProducts();

  return (
    <div className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Hjemme-gym
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold uppercase tracking-wide text-foreground sm:text-5xl">
          Byg dit setup efter plads og budget
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Tre spørgsmål. Så samler vi et setup af maskiner fra vores partnere
          — med pris, lager og link til specifikationer.
        </p>
        <div className="mt-12">
          <HomeGymBuilder
            products={products}
            initial={{ space, focus, budget }}
          />
        </div>
      </div>
    </div>
  );
}
