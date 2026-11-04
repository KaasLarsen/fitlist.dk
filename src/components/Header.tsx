import Link from "next/link";

const nav = [
  { href: "/maskiner", label: "Maskiner" },
  { href: "/guides", label: "Guides" },
  { href: "/om", label: "Om" },
];

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 animate-fade-in">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link
          href="/"
          className="font-display text-xl font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:text-accent sm:text-2xl"
        >
          Fitlist
        </Link>
        <nav className="flex items-center gap-5 sm:gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-wide text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
