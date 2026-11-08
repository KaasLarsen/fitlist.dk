import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPageView } from "@/components/CategoryPageView";
import { getAllCategories, getCategory } from "@/lib/categories";
import { getGuidesByCategory } from "@/lib/guides";

export const revalidate = 21600;

const SITE = "https://www.fitlist.dk";

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
  const url = `${SITE}/maskiner/${category.slug}`;
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
      images: [category.image],
    },
    twitter: {
      card: "summary_large_image",
      title: category.name,
      description: category.description,
      images: [category.image],
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
