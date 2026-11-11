/** Cache-bust when OG JPEGs are regenerated (Facebook caches by image URL). */
export const OG_IMAGE_VERSION = "20261111b";

export function ogJpegUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${clean}?v=${OG_IMAGE_VERSION}`;
}

export function guideOgPath(slug: string): string {
  return ogJpegUrl(`/og/guide-${slug}.jpg`);
}

export function categoryOgPath(slug: string): string {
  return ogJpegUrl(`/og/maskiner-${slug}.jpg`);
}

export function categoryIntentOgPath(
  categorySlug: string,
  intentSlug: string,
): string {
  return ogJpegUrl(`/og/maskiner-${categorySlug}-${intentSlug}.jpg`);
}

export function homeOgPath(): string {
  return ogJpegUrl("/og/home.jpg");
}
