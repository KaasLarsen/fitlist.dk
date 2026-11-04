import type { MachineCategory } from "@/lib/categories";

export type MachineCategorySlug = MachineCategory["slug"];

export type FeedProduct = {
  id: string;
  merchant: string;
  title: string;
  desc: string;
  category: string;
  brand: string;
  price: number | null;
  oldPrice: number | null;
  image: string;
  url: string;
  inStock: boolean;
  /** Matcher MachineCategory.slug når klassificeret */
  categorySlug?: MachineCategorySlug;
  /** Intent-slugs fra categories.ts der matcher produktet */
  intentSlugs?: string[];
};
