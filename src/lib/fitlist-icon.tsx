import { ImageResponse } from "next/og";

const ACCENT = "#16a34a";

/**
 * Fitlist mark: geometric F + checkmark on brand green.
 * Pure shapes (no webfont) so it stays legible at 16–32px.
 */
export function createFitlistIcon(
  size: number,
  options?: { paddingRatio?: number; borderRadiusRatio?: number },
) {
  const paddingRatio = options?.paddingRatio ?? 0.14;
  const borderRadiusRatio = options?.borderRadiusRatio ?? 0.22;
  const pad = Math.round(size * paddingRatio);
  const inner = size - pad * 2;
  const stemW = Math.max(2, Math.round(inner * 0.22));
  const barH = Math.max(2, Math.round(inner * 0.18));
  const topBarW = Math.round(inner * 0.62);
  const midBarW = Math.round(inner * 0.48);
  const midTop = Math.round(inner * 0.38);
  const checkSize = Math.round(inner * 0.55);
  const checkLeft = Math.round(inner * 0.42);
  const checkTop = Math.round(inner * 0.38);
  const stroke = Math.max(2, Math.round(inner * 0.14));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: ACCENT,
          borderRadius: Math.round(size * borderRadiusRatio),
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            width: inner,
            height: inner,
          }}
        >
          {/* F stem */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: stemW,
              height: inner,
              background: "#ffffff",
              borderRadius: Math.max(1, Math.round(stemW * 0.2)),
            }}
          />
          {/* F top bar */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: topBarW,
              height: barH,
              background: "#ffffff",
              borderRadius: Math.max(1, Math.round(barH * 0.2)),
            }}
          />
          {/* F mid bar */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: midTop,
              width: midBarW,
              height: barH,
              background: "#ffffff",
              borderRadius: Math.max(1, Math.round(barH * 0.2)),
            }}
          />
          {/* Checkmark — list/done cue */}
          <svg
            width={checkSize}
            height={checkSize}
            viewBox="0 0 24 24"
            style={{
              position: "absolute",
              left: checkLeft,
              top: checkTop,
            }}
          >
            <path
              d="M4 12.5 L9.5 18 L20 6"
              fill="none"
              stroke="#ffffff"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    ),
    { width: size, height: size },
  );
}
