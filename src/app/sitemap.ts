import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { getAllGuides } from "@/lib/guides";

const SITE = "https://fitlist.dk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${SITE}/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE}/maskiner`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE}/om`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE}/saadan-tjener-vi-penge`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const guideRoutes: MetadataRoute.Sitemap = getAllGuides().map((guide) => ({
    url: `${SITE}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedAt),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE}/maskiner/${category.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticRoutes, ...guideRoutes, ...categoryRoutes];
}
