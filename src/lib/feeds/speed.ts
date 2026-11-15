/**
 * Parse max hastighed (km/t) fra partner-titel/beskrivelse.
 * Typiske former: "1–12 km/t", "max 16 km/t", "op til 14 km/h".
 * Returnerer null hvis intet troværdigt tal findes.
 */
export function parseMaxSpeedKmh(text: string): number | null {
  if (!text) return null;

  const s = text
    .toLowerCase()
    .replace(/,/g, ".")
    .normalize("NFD")
    .replace(/\p{M}/gu, "");

  const unit = String.raw`km\s*\/?\s*t(?:ime|im)?\b|km\s*\/?\s*h\b|kph\b`;

  // Interval: 1-12 km/t, 1 – 12 km/h
  const rangeRe = new RegExp(
    String.raw`(\d+(?:\.\d+)?)\s*[-–—]\s*(\d+(?:\.\d+)?)\s*(?:${unit})`,
    "g",
  );
  let max = 0;
  for (const match of s.matchAll(rangeRe)) {
    const a = Number(match[1]);
    const b = Number(match[2]);
    if (Number.isFinite(a) && Number.isFinite(b)) {
      max = Math.max(max, a, b);
    }
  }

  // Eksplicit max / top / op til
  const maxRe = new RegExp(
    String.raw`(?:max(?:imum|\.|-)?|op\s*til|top(?:fart|hastighed)?|hastighed|speed)\s*[:=]?\s*(?:op\s*til\s*)?(\d+(?:\.\d+)?)\s*(?:${unit})`,
    "g",
  );
  for (const match of s.matchAll(maxRe)) {
    const n = Number(match[1]);
    if (Number.isFinite(n)) max = Math.max(max, n);
  }

  // Alle øvrige "N km/t" — tag den højeste (ofte tophastighed)
  const plainRe = new RegExp(String.raw`(\d+(?:\.\d+)?)\s*(?:${unit})`, "g");
  for (const match of s.matchAll(plainRe)) {
    const n = Number(match[1]);
    if (Number.isFinite(n)) max = Math.max(max, n);
  }

  // Hjemmeløbebånd ligger typisk 1–25 km/t; afvis outliers
  if (max < 1 || max > 40) return null;
  return Math.round(max * 10) / 10;
}
