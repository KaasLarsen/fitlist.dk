import type { Metadata } from "next";
import { connection } from "next/server";
import { CategorySection } from "@/components/CategorySection";
import { DailyDealsSection } from "@/components/DailyDealsSection";
import { FeaturedGuidesSection } from "@/components/FeaturedGuidesSection";
import { Hero } from "@/components/Hero";
import { SituationsSection } from "@/components/SituationsSection";
import { getDailyDeals } from "@/lib/feeds/catalog";
import { getFeaturedGuides } from "@/lib/guides";
import { homeOgPath } from "@/lib/og";
import { canonical } from "@/lib/site";

/** Feed-katalog skifter via cron — undgå at en tom cold-start caches for evigt. */
export const revalidate = 21600;

const homeImage = homeOgPath();

export const metadata: Metadata = {
  alternates: { canonical: canonical("/") },
  openGraph: {
    title: "Fitlist — Træningsmaskiner til hjemmet",
    description:
      "Den ultimative hjælper til træningsmaskiner til hjemmet. Guides, sammenligninger og anbefalinger.",
    url: canonical("/"),
    type: "website",
    locale: "da_DK",
    siteName: "Fitlist",
    images: [
      {
        url: homeImage,
        width: 1200,
        height: 630,
        alt: "Fitlist — Træningsmaskiner til hjemmet",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitlist — Træningsmaskiner til hjemmet",
    description:
      "Den ultimative hjælper til træningsmaskiner til hjemmet. Guides, sammenligninger og anbefalinger.",
    images: [homeImage],
  },
};

export default async function Home() {
  // Undgå tom Full Route Cache efter deploy (feeds hentes først via cron/runtime).
  await connection();
  const deals = await getDailyDeals({ limit: 8 });
  const featuredGuides = getFeaturedGuides();

  return (
    <>
      <Hero />
      <DailyDealsSection products={deals} />
      <SituationsSection />
      <FeaturedGuidesSection guides={featuredGuides} />
      <CategorySection />
    </>
  );
}
