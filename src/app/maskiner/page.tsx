import type { Metadata } from "next";
import Link from "next/link";
import { getAllCategories } from "@/lib/categories";
import { getGuidesByCategory } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Træningsmaskiner",
  description:
    "Løbebånd, motionscykel, romaskine, crosstrainer og styrkemaskiner til hjemmet — vælg efter type og behov.",
};

export default function MaskinerPage() {
  const categories = getAllCategories();

  return (
    <div className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Maskiner
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold uppercase tracking-wide text-foreground sm:text-5xl">
          Træningsmaskiner til hjemmet
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Vælg maskintype — og zoom ind på foldbar, billig, støjsvag eller
          begrænset plads.
        </p>

        <ul className="mt-16 divide-y divide-border border-t border-border">
          {categories.map((category) => {
            const guideCount = getGuidesByCategory(category.slug).length;
            return (
              <li key={category.slug}>
                <Link
                  href={`/maskiner/${category.slug}`}
                  className="group block py-8"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h2 className="font-display text-2xl font-medium uppercase tracking-wide text-foreground transition-colors group-hover:text-accent sm:text-3xl">
                      {category.name}
                    </h2>
                    <span className="font-display text-xs uppercase tracking-[0.16em] text-muted">
                      {guideCount > 0
                        ? `${guideCount} guide${guideCount > 1 ? "s" : ""}`
                        : "Guides kommer"}
                    </span>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm text-muted">
                    {category.description}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.14em] text-accent/80">
                    {category.intents.map((i) => i.label).join(" · ")}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
