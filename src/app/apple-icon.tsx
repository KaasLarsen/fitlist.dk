import { createFitlistIcon } from "@/lib/fitlist-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  // Extra padding so iOS rounded mask doesn't clip the mark
  return createFitlistIcon(180, {
    paddingRatio: 0.22,
    borderRadiusRatio: 0.22,
  });
}
