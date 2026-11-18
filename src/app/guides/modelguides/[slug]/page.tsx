import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/GuideArticle";
import {
  getGuide,
  getModelGuides,
  guidePath,
  guideSeoTitle,
  isModelGuide,
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
  return getModelGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide || !isModelGuide(guide)) return { title: "Modelguide ikke fundet" };

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

export default async function ModelGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide || !isModelGuide(guide)) notFound();

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
