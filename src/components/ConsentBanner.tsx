"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  applyConsent,
  CONSENT_STORAGE_KEY,
  type ConsentChoice,
} from "@/lib/consent";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (stored !== "granted" && stored !== "denied") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const el = bannerRef.current;
    if (!el) return;

    const apply = () => {
      document.body.style.paddingBottom = `${el.offsetHeight}px`;
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.body.style.paddingBottom = "";
    };
  }, [visible]);

  function choose(choice: ConsentChoice) {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch {
      // Storage can be blocked; the in-page consent update still applies.
    }
    applyConsent(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      role="region"
      aria-label="Samtykke til cookies"
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-border bg-surface px-5 py-4 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] sm:px-8"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="consent-title" className="text-sm leading-relaxed text-muted">
          Vi bruger Google Tag Manager til statistik og marketing. De cookies
          sættes kun, hvis du accepterer.{" "}
          <Link
            href="/cookies"
            className="text-accent transition-colors hover:text-accent-dim"
          >
            Læs cookiepolitikken
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="inline-flex items-center justify-center border border-border bg-surface px-5 py-3 font-display text-sm font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Afvis
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="inline-flex items-center justify-center bg-accent px-5 py-3 font-display text-sm font-semibold uppercase tracking-[0.12em] text-accent-fg transition-colors hover:bg-accent-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
