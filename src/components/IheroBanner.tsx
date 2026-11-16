import Image from "next/image";
import { iheroBlackWeekBanner } from "@/lib/ihero";

export function IheroBanner({ className = "" }: { className?: string }) {
  return (
    <aside aria-label="Annonce" className={`flex flex-col ${className}`}>
      <p className="font-display text-xs font-medium uppercase tracking-[0.16em] text-muted">
        Annonce
      </p>
      <a
        href={iheroBlackWeekBanner.href}
        target="_blank"
        rel="sponsored nofollow noopener"
        aria-label={iheroBlackWeekBanner.alt}
        className="mt-4 flex w-full max-w-[728px]"
      >
        <Image
          src={iheroBlackWeekBanner.src}
          alt=""
          width={iheroBlackWeekBanner.width}
          height={iheroBlackWeekBanner.height}
          className="h-auto w-full"
        />
      </a>
    </aside>
  );
}
