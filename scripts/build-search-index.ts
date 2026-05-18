import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { articles } from "../apps/web/src/data/articles.ts";
import { categoryById } from "../apps/web/src/lib/categories.ts";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const output = resolve(root, "apps/web/public/data/search/articles.json");

const searchRows = articles.map((article) => ({
  id: article.id,
  lang: article.lang,
  category: article.category,
  categoryLabel: categoryById[article.category].label,
  title: article.title,
  subtitle: article.subtitle,
  tags: article.tags,
  tldr: article.tldr,
  body: article.bodyMarkdown,
  whyItMatters: article.whyItMatters,
  creatorTakeaway: article.creatorTakeaway,
  publishedAt: article.publishedAt,
  readingTime: article.readingTime,
  url: `/${article.lang}/${article.category}/${article.slug}`
}));

await mkdir(resolve(root, "apps/web/public/data/search"), { recursive: true });
await writeFile(output, JSON.stringify(searchRows, null, 2) + "\n");
console.log(`Wrote ${searchRows.length} search documents.`);
