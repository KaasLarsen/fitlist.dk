import { getActiveCampaignBanner } from "@/lib/campaigns";

export function CampaignBanner() {
  const campaign = getActiveCampaignBanner();
  if (!campaign) return null;

  return (
    <a
      href={campaign.href}
      target="_blank"
      rel="nofollow sponsored noopener"
      aria-label={campaign.ariaLabel}
      className="group sticky top-0 z-[60] block bg-[#0a0a0a] px-4 py-2.5 text-center transition-colors hover:bg-black"
    >
      <span className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors group-hover:text-accent sm:text-sm sm:tracking-[0.14em]">
        {campaign.label}
      </span>
    </a>
  );
}
