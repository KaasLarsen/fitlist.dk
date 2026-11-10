import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPageView } from "@/components/CategoryPageView";
import { getAllCategories, getCategory } from "@/lib/categories";
import {
  getGuideByCategoryAndIntent,
  getGuidesByCategory,
} from "@/lib/guides";
import { categoryIntentOgPath } from "@/lib/og";
import { canonical } from "@/lib/site";

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
  const url = canonical(`/maskiner/${category.slug}/${intent.slug}`);
  const imageUrl = categoryIntentOgPath(category.slug, intent.slug);
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
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: intent.description,
      images: [imageUrl],
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
