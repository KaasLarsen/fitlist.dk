import { getCategory } from "@/lib/categories";
import { getAllGuides, getGuide } from "@/lib/guides";
import { createFitlistOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-image";

export const alt = "Fitlist-guide";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllGuides().map((guide) => ({ slug: guide.slug }));
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  const category = guide ? getCategory(guide.categorySlug) : undefined;

  return createFitlistOgImage({
    title: guide?.title ?? "Fitlist-guide",
    eyebrow: category?.name,
  });
}
