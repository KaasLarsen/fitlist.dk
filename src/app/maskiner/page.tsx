import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IntersportBanner } from "@/components/IntersportBanner";
import { categoryIntentHref, getAllCategories } from "@/lib/categories";
import { getGuidesByCategory } from "@/lib/guides";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Træningsmaskiner",
  description:
    "Løbebånd, motionscykel, romaskine, crosstrainer, styrkemaskiner, Must-haves, restitution og isbad til hjemmet — vælg efter type og behov.",
  alternates: { canonical: canonical("/maskiner") },
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
          Vælg maskintype, Must-haves, restitution eller isbad — og zoom ind på
          foldbar, billig, støjsvag, kabeltårn eller begynder-udstyr.
        </p>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.flatMap((category, index) => {
            const guideCount = getGuidesByCategory(category.slug).length;
            const card = (
              <li key={category.slug}>
                <Link
                  href={`/maskiner/${category.slug}`}
                  className="group relative block aspect-[16/10] overflow-hidden border border-border bg-surface"
                >
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/25 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="font-display text-xl font-medium uppercase tracking-wide text-white transition-colors group-hover:text-accent sm:text-2xl">
                      {category.name}
                    </p>
                    <p className="mt-1 font-display text-xs uppercase tracking-[0.16em] text-white/70">
                      {guideCount > 0
                        ? `${guideCount} guide${guideCount > 1 ? "s" : ""}`
                        : "Guides kommer"}
                    </p>
                  </div>
                </Link>
                <p className="mt-3 text-sm text-muted">{category.description}</p>
                {category.intents.length > 0 ? (
                  <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted">
                    {category.intents.map((intent, intentIndex) => (
                      <span key={intent.slug}>
                        {intentIndex > 0 ? " · " : null}
                        <Link
                          href={categoryIntentHref(category.slug, intent.slug)}
                          className="inline-block py-1 transition-colors hover:text-accent hover:underline focus-visible:text-accent focus-visible:underline focus-visible:outline-none"
                        >
                          {intent.label}
                        </Link>
                      </span>
                    ))}
                  </p>
                ) : null}
              </li>
            );

            if (index !== 3) return [card];

            return [
              <li
                key="intersport-annonce"
                className="col-span-full flex justify-center py-4 sm:py-6"
              >
                <IntersportBanner className="items-center" />
              </li>,
              card,
            ];
          })}
        </ul>
      </div>
    </div>
  );
}
