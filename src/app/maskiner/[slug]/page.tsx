import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPageView } from "@/components/CategoryPageView";
import { getAllCategories, getCategory } from "@/lib/categories";
import { getGuidesByCategory } from "@/lib/guides";
import { categoryOgPath } from "@/lib/og";
import { canonical } from "@/lib/site";

export const revalidate = 21600;

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Kategori ikke fundet" };
  const url = canonical(`/maskiner/${category.slug}`);
  const imageUrl = categoryOgPath(category.slug);
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: url },
    openGraph: {
      title: category.name,
      description: category.description,
      url,
      type: "website",
      locale: "da_DK",
      siteName: "Fitlist",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: category.name,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: category.name,
      description: category.description,
      images: [imageUrl],
    },
  };
}

export default async function MaskineCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const guides = getGuidesByCategory(category.slug);

  return <CategoryPageView category={category} guides={guides} />;
}
