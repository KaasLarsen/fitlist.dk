/**
 * Dump guide/category data then generate static OG JPEGs.
 * Run: npx tsx scripts/generate-og-images.ts
 */
import { writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { getAllCategories } from "../src/lib/categories";
import { getAllGuides } from "../src/lib/guides";

async function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const dataPath = path.join(root, ".og-data.json");

  const data = {
    categories: getAllCategories().map((c) => ({
      slug: c.slug,
      name: c.name,
      image: c.image,
      intents: c.intents.map((i) => ({ slug: i.slug, label: i.label })),
    })),
    guides: getAllGuides().map((g) => ({
      slug: g.slug,
      title: g.title,
      categorySlug: g.categorySlug,
    })),
  };

  await writeFile(dataPath, JSON.stringify(data));

  const result = spawnSync(
    process.execPath,
    [path.join(root, "scripts/generate-og-images.mjs")],
    {
      cwd: root,
      env: { ...process.env, OG_DATA_JSON: dataPath },
      stdio: "inherit",
    },
  );

  await unlink(dataPath).catch(() => undefined);
  process.exit(result.status ?? 1);
}

main();
