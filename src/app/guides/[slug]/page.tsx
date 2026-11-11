import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { GuideArticle } from "@/components/GuideArticle";
import {
  getBuyingGuides,
  getGuide,
  guidePath,
  isModelGuide,
} from "@/lib/guides";
import { guideOgPath } from "@/lib/og";
import { canonical, SITE } from "@/lib/site";

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
  if (isModelGuide(guide)) {
    return {
      title: guide.title,
      alternates: { canonical: canonical(guidePath(guide)) },
    };
  }

  const description = guide.metaDescription || guide.excerpt;
  const url = canonical(guidePath(guide));
  const imageUrl = guideOgPath(guide.slug);
  const imageAlt = guide.title;

  return {
    title: guide.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
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
      title: guide.title,
      description,
      images: [imageUrl],
    },
  };
}

function guideJsonLd(guide: NonNullable<ReturnType<typeof getGuide>>) {
  const url = canonical(guidePath(guide));
  const image = `${SITE}/og/guide-${guide.slug}.jpg`;

  const article = {
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription || guide.excerpt,
    image,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    mainEntityOfPage: url,
    author: {
      "@type": "Organization",
      name: "Fitlist",
      url: SITE,
    },
    publisher: {
      "@type": "Organization",
      name: "Fitlist",
      url: SITE,
    },
    inLanguage: "da-DK",
  };

  const faq =
    guide.faqs.length > 0
      ? {
          "@type": "FAQPage",
          mainEntity: guide.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  const itemList =
    guide.products.length > 0
      ? {
          "@type": "ItemList",
          name: `Anbefalede modeller — ${guide.title}`,
          itemListElement: guide.products.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: product.name,
            description: product.summary,
            url: `${url}#produkt-${product.id}`,
          })),
        }
      : null;

  return {
    "@context": "https://schema.org",
    "@graph": [article, faq, itemList].filter(Boolean),
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  if (isModelGuide(guide)) permanentRedirect(guidePath(guide));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(guideJsonLd(guide)),
        }}
      />
      <GuideArticle guide={guide} />
    </>
  );
}
