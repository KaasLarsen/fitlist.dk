import Image from "next/image";
import { intersportBanner } from "@/lib/intersport";

export function IntersportBanner({ className = "" }: { className?: string }) {
  return (
    <aside aria-label="Annonce" className={`flex flex-col ${className}`}>
      <p className="font-display text-xs font-medium uppercase tracking-[0.16em] text-muted">
        Annonce
      </p>
      <a
        href={intersportBanner.href}
        target="_blank"
        rel="sponsored nofollow noopener"
        aria-label={intersportBanner.alt}
        className="mt-4 flex w-full max-w-[540px]"
      >
        <Image
          src={intersportBanner.src}
          alt=""
          width={intersportBanner.width}
          height={intersportBanner.height}
          className="h-auto w-full"
        />
      </a>
    </aside>
  );
}
