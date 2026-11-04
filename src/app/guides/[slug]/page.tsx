import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/GuideArticle";
import { getAllGuides, getGuide } from "@/lib/guides";

export const revalidate = 21600;

const SITE = "https://fitlist.dk";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide ikke fundet" };

  const description = guide.metaDescription || guide.excerpt;
  const url = `${SITE}/guides/${guide.slug}`;

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
    },
    twitter: {
      card: "summary",
      title: guide.title,
      description,
    },
  };
}

function guideJsonLd(guide: NonNullable<ReturnType<typeof getGuide>>) {
  const url = `${SITE}/guides/${guide.slug}`;

  const article = {
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription || guide.excerpt,
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
