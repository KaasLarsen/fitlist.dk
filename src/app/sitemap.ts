import type { MetadataRoute } from "next";
import { categories, categoryIntentHref } from "@/lib/categories";
import { getAllGuides } from "@/lib/guides";
import { canonical } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: canonical("/"), lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: canonical("/guides"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: canonical("/maskiner"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: canonical("/om"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: canonical("/saadan-tjener-vi-penge"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: canonical("/kontakt"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: canonical("/privatlivspolitik"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.2,
    },
    {
      url: canonical("/cookies"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.2,
    },
  ];

  const guideRoutes: MetadataRoute.Sitemap = getAllGuides().map((guide) => ({
    url: canonical(`/guides/${guide.slug}`),
    lastModified: new Date(guide.updatedAt),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: canonical(`/maskiner/${category.slug}`),
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const intentRoutes: MetadataRoute.Sitemap = categories.flatMap((category) =>
    category.intents.map((intent) => ({
      url: canonical(categoryIntentHref(category.slug, intent.slug)),
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
  );

  return [...staticRoutes, ...guideRoutes, ...categoryRoutes, ...intentRoutes];
}
