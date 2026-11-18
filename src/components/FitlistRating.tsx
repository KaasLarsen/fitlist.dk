/** Visible Fitlist editorial score — must match Product/Review JSON-LD. */
export function FitlistRating({ rating }: { rating: number }) {
  const clamped = Math.min(5, Math.max(1, rating));
  const label = clamped.toLocaleString("da-DK", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const fullStars = Math.floor(clamped);
  const hasHalf = clamped - fullStars >= 0.3 && clamped - fullStars < 0.8;
  const roundedUp = clamped - fullStars >= 0.8;

  const stars = Array.from({ length: 5 }, (_, i) => {
    const n = i + 1;
    if (n <= fullStars || (roundedUp && n === fullStars + 1)) return "full";
    if (hasHalf && n === fullStars + 1) return "half";
    return "empty";
  });

  return (
    <p
      className="mt-3 flex flex-wrap items-center gap-2 text-sm text-foreground"
      aria-label={`Fitlist-vurdering ${label} ud af 5`}
    >
      <span className="font-display text-xs uppercase tracking-[0.16em] text-muted">
        Fitlist-vurdering
      </span>
      <span className="inline-flex items-center gap-0.5 text-accent" aria-hidden>
        {stars.map((kind, i) => (
          <span key={i} className="text-base leading-none">
            {kind === "full" ? "★" : kind === "half" ? "★" : "☆"}
          </span>
        ))}
      </span>
      <span className="font-display tabular-nums text-foreground">
        {label}/5
      </span>
    </p>
  );
}
