import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { prayers } from "../src/prayers.js";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const outputRoot = join(projectRoot, "dist");
const template = await readFile(join(outputRoot, "index.html"), "utf8");

const pages = [
  {
    path: "/",
    title: "Ora | Catholic Prayers and the Holy Rosary",
    description: "A quiet, personal companion for the Holy Rosary and beloved Catholic prayers.",
  },
  {
    path: "/rosary",
    title: "How to Pray the Rosary and Its Mysteries | Ora",
    description: "Follow the order of the Holy Rosary and meditate on the Joyful, Luminous, Sorrowful, and Glorious Mysteries.",
  },
  {
    path: "/prayers",
    title: "Catholic Prayers | Ora",
    description: "A quiet collection of beloved Catholic prayers for daily prayer, reflection, meals, and the Holy Rosary.",
  },
  ...prayers.map((prayer) => ({
    path: `/prayers/${prayer.id}`,
    title: `${prayer.title} | Ora`,
    description: prayer.intro,
  })),
];

function escapeAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderPage(page) {
  const title = escapeAttribute(page.title);
  const description = escapeAttribute(page.description);
  const path = escapeAttribute(page.path);

  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${description}" />`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${title}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${path}" />`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${path}" />`,
    );
}

for (const page of pages) {
  const destination = page.path === "/"
    ? join(outputRoot, "index.html")
    : join(outputRoot, page.path.slice(1), "index.html");

  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, renderPage(page));
}

console.log(`Generated ${pages.length} indexable pages.`);
