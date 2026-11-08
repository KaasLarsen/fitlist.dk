import type { Metadata } from "next";
import { CategorySection } from "@/components/CategorySection";
import { DailyDealsSection } from "@/components/DailyDealsSection";
import { FeaturedGuidesSection } from "@/components/FeaturedGuidesSection";
import { Hero } from "@/components/Hero";
import { getDailyDeals } from "@/lib/feeds/catalog";
import { getFeaturedGuides } from "@/lib/guides";

export const metadata: Metadata = {
  openGraph: {
    title: "Fitlist — Træningsmaskiner til hjemmet",
    description:
      "Den ultimative hjælper til træningsmaskiner til hjemmet. Guides, sammenligninger og anbefalinger.",
    url: "https://www.fitlist.dk",
    type: "website",
    locale: "da_DK",
    siteName: "Fitlist",
    images: ["/images/hero-home.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitlist — Træningsmaskiner til hjemmet",
    description:
      "Den ultimative hjælper til træningsmaskiner til hjemmet. Guides, sammenligninger og anbefalinger.",
    images: ["/images/hero-home.webp"],
  },
};

export default async function Home() {
  const deals = await getDailyDeals({ limit: 8 });
  const featuredGuides = getFeaturedGuides();

  return (
    <>
      <Hero />
      <DailyDealsSection products={deals} />
      <FeaturedGuidesSection guides={featuredGuides} />
      <CategorySection />
    </>
  );
}
