import type { MetadataRoute } from "next";
import { getAllCategories } from "@/lib/categories";
import { getAllGuides } from "@/lib/guides";

const baseUrl = "https://www.fitlist.dk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/maskiner`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/om`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/saadan-tjener-vi-penge`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = getAllCategories().map(
    (category) => ({
      url: `${baseUrl}/maskiner/${category.slug}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    }),
  );

  const guidePages: MetadataRoute.Sitemap = getAllGuides().map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedAt),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticPages, ...categoryPages, ...guidePages];
}
