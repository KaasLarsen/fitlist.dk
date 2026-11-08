import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

type FitlistOgImageProps = {
  title: string;
  eyebrow?: string;
};

/**
 * Branded 1200×630 share card. Unique title text = unique Facebook preview
 * (category webp alone made every guide in a category look identical).
 */
export function createFitlistOgImage({ title, eyebrow }: FitlistOgImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background:
            "linear-gradient(145deg, #0f172a 0%, #14532d 52%, #16a34a 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 40,
            fontWeight: 700,
            color: "#bbf7d0",
            letterSpacing: "-0.02em",
          }}
        >
          Fitlist
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 1040,
          }}
        >
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 600,
                color: "#86efac",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: title.length > 70 ? 52 : 64,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
