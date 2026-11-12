/**
 * Generates static 1200×630 JPEG Open Graph images under public/og/
 * so Facebook gets stable .jpg URLs with real category photos + unique titles.
 *
 * Run: node scripts/generate-og-images.mjs
 */
import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL, fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "og");
const WIDTH = 1200;
const HEIGHT = 630;

async function resolveFont(envKey, candidates) {
  if (process.env[envKey]) return process.env[envKey];
  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      /* try next */
    }
  }
  return candidates[0];
}

const FONT_BOLD = pathToFileURL(
  await resolveFont("OG_FONT_BOLD", [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
  ]),
).href;
const FONT_REG = pathToFileURL(
  await resolveFont("OG_FONT_REG", [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
  ]),
).href;

function escapeXml(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrapText(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 4);
}

function overlaySvg({ title, eyebrow }) {
  const titleLines = wrapText(title, title.length > 60 ? 28 : 32);
  const titleSize = titleLines.join("").length > 70 ? 46 : 54;
  const lineHeight = Math.round(titleSize * 1.18);
  const titleStartY = HEIGHT - 72 - (titleLines.length - 1) * lineHeight;

  const titleTspans = titleLines
    .map((line, i) => {
      const y = titleStartY + i * lineHeight;
      return `<tspan x="64" y="${y}">${escapeXml(line)}</tspan>`;
    })
    .join("");

  const eyebrowXml = eyebrow
    ? `<text x="64" y="${titleStartY - 36}" font-family="DejaVu Sans" font-size="26" font-weight="700" fill="#bbf7d0" letter-spacing="2">${escapeXml(eyebrow.toUpperCase())}</text>`
    : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0%" stop-color="#0f172a" stop-opacity="0.35"/>
      <stop offset="45%" stop-color="#0f172a" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#052e16" stop-opacity="0.88"/>
    </linearGradient>
    <style>
      @font-face {
        font-family: "DejaVuSans";
        src: url("${FONT_REG}");
      }
      @font-face {
        font-family: "DejaVuSansBold";
        src: url("${FONT_BOLD}");
      }
    </style>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#shade)"/>
  <text x="64" y="72" font-family="DejaVuSansBold" font-size="36" fill="#ffffff">Fitlist</text>
  ${eyebrowXml.replaceAll("DejaVu Sans", "DejaVuSansBold")}
  <text font-family="DejaVuSansBold" font-size="${titleSize}" fill="#ffffff">${titleTspans}</text>
</svg>`;
}

async function renderCard({ outName, title, eyebrow, backgroundPath }) {
  const bg = backgroundPath
    ? await sharp(backgroundPath)
        .rotate()
        .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
        .toBuffer()
    : await sharp({
        create: {
          width: WIDTH,
          height: HEIGHT,
          channels: 3,
          background: { r: 15, g: 23, b: 42 },
        },
      })
        .png()
        .toBuffer();

  const overlay = Buffer.from(overlaySvg({ title, eyebrow }));

  const jpg = await sharp(bg)
    .composite([{ input: await sharp(overlay).png().toBuffer() }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();

  const outPath = path.join(OUT, outName);
  await writeFile(outPath, jpg);
  return outPath;
}

async function main() {
  // Import guide/category data via a small JSON dump from tsx entry, or inline require of compiled —
  // This mjs is invoked by the .ts wrapper. Expect DATA_JSON env or sibling dump.
  const dataPath = process.env.OG_DATA_JSON || path.join(ROOT, ".og-data.json");
  const data = JSON.parse(await readFile(dataPath, "utf8"));

  await mkdir(OUT, { recursive: true });

  const hero = path.join(ROOT, "public", "images", "hero-home.webp");
  await renderCard({
    outName: "home.jpg",
    title: "Træningsmaskiner til hjemmet",
    eyebrow: "Guides · tilbud · anbefalinger",
    backgroundPath: hero,
  });

  for (const category of data.categories) {
    const bg = path.join(ROOT, "public", category.image.replace(/^\//, ""));
    await renderCard({
      outName: `maskiner-${category.slug}.jpg`,
      title: category.name,
      eyebrow: "Træningsmaskiner",
      backgroundPath: bg,
    });
    for (const intent of category.intents) {
      await renderCard({
        outName: `maskiner-${category.slug}-${intent.slug}.jpg`,
        title: `${category.name} · ${intent.label}`,
        eyebrow: "Træningsmaskiner",
        backgroundPath: bg,
      });
    }
  }

  for (const guide of data.guides) {
    const category = data.categories.find((c) => c.slug === guide.categorySlug);
    const bg = category
      ? path.join(ROOT, "public", category.image.replace(/^\//, ""))
      : hero;
    await renderCard({
      outName: `guide-${guide.slug}.jpg`,
      title: guide.title,
      eyebrow: category?.name,
      backgroundPath: bg,
    });
  }

  console.log(
    `Wrote OG JPEGs to public/og/ (${1 + data.guides.length + data.categories.reduce((n, c) => n + 1 + c.intents.length, 0)} files)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
