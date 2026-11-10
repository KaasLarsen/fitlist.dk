export const SITE = "https://www.fitlist.dk";

/** Absolute www canonical. `path` is `/` or a pathname without a trailing slash. */
export function canonical(path: string = "/"): string {
  if (path === "/" || path === "") return SITE;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE}${normalized.replace(/\/+$/, "")}`;
}
