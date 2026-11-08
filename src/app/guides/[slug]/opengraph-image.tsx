import { getCategory } from "@/lib/categories";
import { getAllGuides, getGuide } from "@/lib/guides";
import { createFitlistOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllGuides().map((guide) => ({ slug: guide.slug }));
}

/** Dynamic per-guide alt for og:image:alt (replaces static "Fitlist-guide"). */
export function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const guide = getGuide(params.slug);

  return [
    {
      id: "og",
      alt: guide?.title ?? "Fitlist-guide",
      size: OG_SIZE,
      contentType: OG_CONTENT_TYPE,
    },
  ];
}

export default async function Image({
  params,
  id,
}: Props & { id: Promise<string | number> }) {
  await id;
  const { slug } = await params;
  const guide = getGuide(slug);
  const category = guide ? getCategory(guide.categorySlug) : undefined;

  return createFitlistOgImage({
    title: guide?.title ?? "Fitlist-guide",
    eyebrow: category?.name,
  });
}
