import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound, permanentRedirect } from "next/navigation";
import { GuideArticle } from "@/components/GuideArticle";
import {
  getBuyingGuides,
  getGuide,
  guidePath,
  guideSeoTitle,
  isModelGuide,
  isModelVs,
} from "@/lib/guides";
import { resolveGuideOffers } from "@/lib/guides/offers";
import { guideOgPath } from "@/lib/og";
import { buildGuideJsonLd } from "@/lib/schema/guide-jsonld";
import { canonical } from "@/lib/site";

export const revalidate = 21600;

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBuyingGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide ikke fundet" };
  if (isModelGuide(guide) || isModelVs(guide)) {
    return {
      title: guideSeoTitle(guide),
      alternates: { canonical: canonical(guidePath(guide)) },
    };
  }

  const seoTitle = guideSeoTitle(guide);
  const description = guide.metaDescription || guide.excerpt;
  const url = canonical(guidePath(guide));
  const imageUrl = guideOgPath(guide.slug);
  const imageAlt = guide.title;

  return {
    title: seoTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: seoTitle,
      description,
      url,
      type: "article",
      locale: "da_DK",
      siteName: "Fitlist",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description,
      images: [imageUrl],
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  if (isModelGuide(guide) || isModelVs(guide)) permanentRedirect(guidePath(guide));

  // Avoid locking empty feed snapshots into Full Route Cache after deploy.
  await connection();
  const offerMap = await resolveGuideOffers(guide.products);
  const jsonLd = buildGuideJsonLd(guide, offerMap);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <GuideArticle guide={guide} offerMap={offerMap} />
    </>
  );
}
