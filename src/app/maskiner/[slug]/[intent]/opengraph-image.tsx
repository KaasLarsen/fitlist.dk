import { getAllCategories, getCategory } from "@/lib/categories";
import { createFitlistOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-image";

export const alt = "Fitlist — maskiner";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

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

export default async function Image({ params }: Props) {
  const { slug, intent: intentSlug } = await params;
  const category = getCategory(slug);
  const intent = category?.intents.find((i) => i.slug === intentSlug);

  return createFitlistOgImage({
    title:
      category && intent
        ? `${category.name} · ${intent.label}`
        : "Maskiner",
    eyebrow: "Træningsmaskiner",
  });
}
