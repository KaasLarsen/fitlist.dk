export const SITE = "https://www.fitlist.dk";

export const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61596489050680";

/** Absolute www canonical. `path` is `/` or a pathname without a trailing slash. */
export function canonical(path: string = "/"): string {
  if (path === "/" || path === "") return SITE;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE}${normalized.replace(/\/+$/, "")}`;
}
