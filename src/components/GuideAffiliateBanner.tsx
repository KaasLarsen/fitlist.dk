import { getGuideBanner } from "@/lib/guideBanners";
import type { Guide } from "@/lib/guides";

export function GuideAffiliateBanner({ guide }: { guide: Guide }) {
  const banner = getGuideBanner(guide);
  if (!banner) return null;

  return (
    <aside aria-label="Annonce" className="mt-14">
      <p className="font-display text-xs font-medium uppercase tracking-[0.16em] text-muted">
        Annonce
      </p>
      <a
        href={banner.href}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="mt-4 flex justify-center"
      >
        {/* visbanner.php skal kaldes direkte, så Partner-Ads tæller visningen. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={banner.src} alt={banner.alt} className="h-auto max-w-full" />
      </a>
    </aside>
  );
}
