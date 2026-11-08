import { getAllCategories, getCategory } from "@/lib/categories";
import { createFitlistOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-image";

export const alt = "Fitlist — maskinkategori";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);

  return createFitlistOgImage({
    title: category?.name ?? "Maskiner",
    eyebrow: "Træningsmaskiner",
  });
}
