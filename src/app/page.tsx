import { CategorySection } from "@/components/CategorySection";
import { DailyDealsSection } from "@/components/DailyDealsSection";
import { FeaturedGuidesSection } from "@/components/FeaturedGuidesSection";
import { Hero } from "@/components/Hero";
import { getDailyDeals } from "@/lib/feeds/catalog";
import { getFeaturedGuides } from "@/lib/guides";

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
