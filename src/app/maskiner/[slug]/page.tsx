import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPageView } from "@/components/CategoryPageView";
import { getAllCategories, getCategory } from "@/lib/categories";
import { getGuidesByCategory } from "@/lib/guides";

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
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function MaskineCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const guides = getGuidesByCategory(category.slug);

  return <CategoryPageView category={category} guides={guides} />;
}
