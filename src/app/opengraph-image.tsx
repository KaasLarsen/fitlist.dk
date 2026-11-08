import { createFitlistOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-image";

export const alt = "Fitlist — Træningsmaskiner til hjemmet";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createFitlistOgImage({
    title: "Træningsmaskiner til hjemmet",
    eyebrow: "Guides · tilbud · anbefalinger",
  });
}
