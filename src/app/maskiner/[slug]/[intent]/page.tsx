import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPageView } from "@/components/CategoryPageView";
import { getAllCategories, getCategory } from "@/lib/categories";
import {
  getGuideByCategoryAndIntent,
  getGuidesByCategory,
} from "@/lib/guides";

export const revalidate = 21600;

type Props = {
  params: Promise<{ slug: string; intent: string }>;
};

export function generateStaticParams() {
  return getAllCategories().flatMap((category) =>
    category.intents.map((intent) => ({
      slug: category.slug,
      intent: intent.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, intent: intentSlug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Kategori ikke fundet" };
  const intent = category.intents.find((i) => i.slug === intentSlug);
  if (!intent) return { title: "Filter ikke fundet" };
  const title = `${category.name} · ${intent.label}`;
  const url = `https://www.fitlist.dk/maskiner/${category.slug}/${intent.slug}`;
  return {
    title,
    description: intent.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: intent.description,
      url,
      type: "website",
      locale: "da_DK",
      siteName: "Fitlist",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: intent.description,
    },
  };
}

export default async function MaskineCategoryIntentPage({ params }: Props) {
  const { slug, intent: intentSlug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const activeIntent = category.intents.find((i) => i.slug === intentSlug);
  if (!activeIntent) notFound();

  const guides = getGuidesByCategory(category.slug);
  const intentGuide = getGuideByCategoryAndIntent(
    category.slug,
    activeIntent.slug,
  );

  return (
    <CategoryPageView
      category={category}
      activeIntent={activeIntent}
      guides={guides}
      intentGuide={intentGuide}
    />
  );
}
