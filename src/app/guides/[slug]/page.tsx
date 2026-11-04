import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAffiliate } from "@/lib/affiliates";
import { getGuide } from "@/lib/guides";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide ikke fundet" };
  return {
    title: guide.title,
    description: guide.excerpt,
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) notFound();

  const affiliateLinks = (guide.affiliateIds ?? [])
    .map((id) => getAffiliate(id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <article className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
          {guide.category}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold uppercase tracking-wide text-foreground sm:text-5xl">
          {guide.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{guide.excerpt}</p>

        {guide.body ? (
          <div className="prose-fitlist mt-12 whitespace-pre-wrap text-base leading-relaxed text-foreground/90">
            {guide.body}
          </div>
        ) : null}

        {affiliateLinks.length > 0 ? (
          <aside className="mt-14 border-t border-border pt-10">
            <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-muted">
              Anbefalede produkter
            </p>
            <ul className="mt-4 space-y-3">
              {affiliateLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center bg-accent px-5 py-3 font-display text-sm font-semibold uppercase tracking-[0.12em] text-accent-fg transition-colors hover:bg-accent-dim"
                  >
                    {link.label}
                  </a>
                  <span className="ml-3 text-xs text-muted">{link.partner}</span>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <Link
          href="/guides"
          className="mt-14 inline-flex font-display text-sm font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:text-accent-dim"
        >
          ← Alle guides
        </Link>
      </div>
    </article>
  );
}
