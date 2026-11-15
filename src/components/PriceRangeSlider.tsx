"use client";

import { formatPriceDkk } from "@/lib/format-price";

type Props = {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  onChange: (next: { min: number; max: number }) => void;
  label?: string;
  step?: number;
  formatValue?: (value: number) => string;
  minAriaLabel?: string;
  maxAriaLabel?: string;
};

export function PriceRangeSlider({
  min,
  max,
  valueMin,
  valueMax,
  onChange,
  label = "Pris",
  step = 100,
  formatValue = formatPriceDkk,
  minAriaLabel = "Minimumspris",
  maxAriaLabel = "Maksimumspris",
}: Props) {
  const span = Math.max(max - min, 1);
  const leftPct = ((valueMin - min) / span) * 100;
  const rightPct = ((valueMax - min) / span) * 100;
  // Når grebene overlapper, løft det der har mest “rum” til at bevæge sig.
  const minOnTop = valueMin > max - (max - min) * 0.5;

  return (
    <div className="w-full max-w-md">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-muted">
          {label}
        </p>
        <p className="font-display text-xs tabular-nums uppercase tracking-[0.12em] text-foreground">
          {formatValue(valueMin)} – {formatValue(valueMax)}
        </p>
      </div>

      <div className="relative mt-5 h-6">
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 bg-border" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 bg-accent"
          style={{
            left: `${leftPct}%`,
            width: `${Math.max(rightPct - leftPct, 0)}%`,
          }}
        />
        <input
          type="range"
          aria-label={minAriaLabel}
          min={min}
          max={max}
          step={step}
          value={valueMin}
          onChange={(e) => {
            const next = Math.min(Number(e.target.value), valueMax);
            onChange({ min: next, max: valueMax });
          }}
          className="price-range-thumb absolute inset-0 w-full appearance-none bg-transparent"
          style={{ zIndex: minOnTop ? 40 : 30 }}
        />
        <input
          type="range"
          aria-label={maxAriaLabel}
          min={min}
          max={max}
          step={step}
          value={valueMax}
          onChange={(e) => {
            const next = Math.max(Number(e.target.value), valueMin);
            onChange({ min: valueMin, max: next });
          }}
          className="price-range-thumb absolute inset-0 w-full appearance-none bg-transparent"
          style={{ zIndex: minOnTop ? 30 : 40 }}
        />
      </div>
    </div>
  );
}
