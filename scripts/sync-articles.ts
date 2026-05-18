import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { GeneratedArticleDraft, SourceNote } from "../pipeline/types/schema.ts";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));

type Article = {
  id: string;
  slug: string;
  lang: string;
  category: string;
  title: string;
  subtitle: string;
  tldr: string[];
  bodyMarkdown: string;
  whyItMatters: string;
  creatorTakeaway: string;
  tags: string[];
  readingTime: number;
  publishedAt: string;
  sources: {
    title: string;
    sourceName: string;
    url: string;
    sourceType: string;
    usedFor: string;
  }[];
  generation: {
    model: string;
    promptVersion: string;
    generatedAt: string;
    sourceClusterId: string;
    confidence: string;
  };
  status: string;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function readingTime(body: string): number {
  const words = body.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

async function main() {
  const draftsPath = resolve(root, "content/exports/generation-drafts.mock.json");
  const notesPath = resolve(root, "content/notes/source-notes.mock.json");
  const outPath = resolve(root, "apps/web/src/data/articles-generated.ts");

  let drafts: { vi: GeneratedArticleDraft; en: GeneratedArticleDraft }[];
  let notes: SourceNote[];

  try {
    drafts = JSON.parse(await readFile(draftsPath, "utf-8"));
    notes = JSON.parse(await readFile(notesPath, "utf-8"));
  } catch (e) {
    console.error("No draft data found. Run `npm run daily` first.");
    process.exit(0);
  }

  const articles: Article[] = [];

  for (const draftSet of drafts) {
    for (const draft of [draftSet.vi, draftSet.en]) {
      if (!draft.title || draft.generation.mode === "template-fallback") continue;

      const relatedNotes = notes.filter((n) => draft.sourceIds.includes(n.sourceId));

      const sources = relatedNotes.map((n) => ({
        title: n.title,
        sourceName: n.sourceName,
        url: n.url,
        sourceType: n.sourceType,
        usedFor: "primary" as const,
      }));

      const genTime = draft.generation.generatedAt || new Date().toISOString();
      const slug = `${slugify(draft.title.slice(0, 60))}-${genTime.slice(0, 10)}`;

      articles.push({
        id: draft.id,
        slug,
        lang: draft.lang,
        category: draft.category,
        title: draft.title,
        subtitle: draft.subtitle,
        tldr: Array.isArray(draft.tldr) ? draft.tldr : [String(draft.tldr || draft.subtitle)],
        bodyMarkdown: draft.bodyMarkdown,
        whyItMatters: draft.whyItMatters,
        creatorTakeaway: draft.creatorTakeaway,
        tags: Array.isArray(draft.tags) ? draft.tags : [draft.category],
        readingTime: readingTime(draft.bodyMarkdown),
        publishedAt: genTime,
        sources: sources.length > 0 ? sources : [{
          title: draft.title,
          sourceName: "AI Radar",
          url: `https://ai-radar-news-pi.vercel.app/${draft.lang}/${draft.category}/${slug}`,
          sourceType: "blog",
          usedFor: "primary",
        }],
        generation: {
          model: draft.generation.model,
          promptVersion: draft.generation.promptVersion,
          generatedAt: genTime,
          sourceClusterId: draft.generation.sourceClusterId,
          confidence: draft.generation.confidence,
        },
        status: "published",
      });
    }
  }

  const tsContent = `// Auto-generated from pipeline output — do not edit manually
// Generated at: ${new Date().toISOString()}
import type { Article } from "@/lib/schema";

export const generatedArticles: Article[] = ${JSON.stringify(articles, null, 2)};
`;

  await writeFile(outPath, tsContent);
  console.log(`Synced ${articles.length} articles to apps/web/src/data/articles-generated.ts`);
}

main();
