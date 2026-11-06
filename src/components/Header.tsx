"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { HeaderSearch } from "@/components/HeaderSearch";

const nav = [
  { href: "/#dagens-tilbud", label: "Tilbud" },
  { href: "/maskiner", label: "Maskiner" },
  { href: "/guides", label: "Guides" },
  { href: "/om", label: "Om" },
];

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 6l12 12" />
      <path d="M18 6l-12 12" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const panelId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    function onPointerDown(e: PointerEvent) {
      if (!menuRef.current?.contains(e.target as Node)) close();
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, close]);

  return (
    <header className="absolute inset-x-0 top-[var(--campaign-banner-h)] z-50 animate-fade-in">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link
          href="/"
          className="header-chrome font-display text-xl font-semibold uppercase tracking-[0.12em] transition-colors sm:text-2xl"
        >
          Fitlist
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="header-chrome text-sm font-medium tracking-wide transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div ref={menuRef} className="relative md:hidden">
            <button
              type="button"
              aria-label={open ? "Luk menu" : "Menu"}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((v) => !v)}
              className="header-chrome flex size-9 items-center justify-center transition-colors"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>

            {open ? (
              <nav
                id={panelId}
                aria-label="Hovedmenu"
                className="absolute right-0 top-full z-50 mt-2 min-w-44 border border-border bg-surface py-2 animate-fade-in"
              >
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="block px-4 py-2.5 text-sm font-medium tracking-wide text-foreground transition-colors hover:bg-background hover:text-accent"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            ) : null}
          </div>

          <HeaderSearch />
        </div>
      </div>
    </header>
  );
}
