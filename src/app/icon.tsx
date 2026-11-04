import { createFitlistIcon } from "@/lib/fitlist-icon";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return createFitlistIcon(32, { paddingRatio: 0.16 });
}
