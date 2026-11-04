"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderSearch } from "@/components/HeaderSearch";

const nav = [
  { href: "/#dagens-tilbud", label: "Tilbud" },
  { href: "/maskiner", label: "Maskiner" },
  { href: "/guides", label: "Guides" },
  { href: "/om", label: "Om" },
];

export function Header() {
  const pathname = usePathname();
  const onDarkHero = pathname === "/";

  return (
    <header className="absolute inset-x-0 top-0 z-50 animate-fade-in">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link
          href="/"
          className={`font-display text-xl font-semibold uppercase tracking-[0.12em] transition-colors hover:text-accent sm:text-2xl ${
            onDarkHero
              ? "text-white drop-shadow-sm"
              : "text-foreground"
          }`}
        >
          Fitlist
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <nav className="flex items-center gap-4 sm:gap-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  onDarkHero
                    ? "text-white/75 drop-shadow-sm hover:text-white"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <HeaderSearch onDarkHero={onDarkHero} />
        </div>
      </div>
    </header>
  );
}
