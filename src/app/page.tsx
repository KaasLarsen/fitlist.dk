import { CategorySection } from "@/components/CategorySection";
import { DailyDealsSection } from "@/components/DailyDealsSection";
import { Hero } from "@/components/Hero";
import { getDailyDeals } from "@/lib/feeds/catalog";

export default async function Home() {
  const deals = await getDailyDeals({ limit: 8 });

  return (
    <>
      <Hero />
      <DailyDealsSection products={deals} />
      <CategorySection />
    </>
  );
}
