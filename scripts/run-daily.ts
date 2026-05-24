import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { crawlSources } from "../pipeline/crawl/fetch-rss.ts";
import { extractRedditPost } from "../pipeline/crawl/extract-reddit.ts";
import { extractWebContent } from "../pipeline/crawl/extract-web.ts";
import { extractYouTubeMetadata } from "../pipeline/crawl/extract-youtube.ts";
import { clusterSources } from "../pipeline/classify/cluster.ts";
import { createSourceNotes } from "../pipeline/generate/create-source-notes.ts";
import { createOutline } from "../pipeline/generate/create-outline.ts";
import { writeArticleVi } from "../pipeline/generate/write-article-vi.ts";
import { writeArticleEn } from "../pipeline/generate/write-article-en.ts";
import { validateArticle } from "../pipeline/generate/validate-article.ts";
import { exportRuntimeAgentData } from "../pipeline/publish/export-agent-data.ts";
import { exportAgentData } from "./export-jsonl.ts";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const rawDir = resolve(root, "content/raw/mock");
const today = new Date().toISOString().slice(0, 10);

const crawled = await crawlSources();
const extracted = await Promise.all(
  crawled.map(async (item) => extractYouTubeMetadata(await extractRedditPost(await extractWebContent(item))))
);
const clusters = clusterSources(extracted);
const notes = createSourceNotes(extracted);
const selectedClusters = clusters
  .filter((cluster) => cluster.selectedForGeneration)
  .slice(0, 6);

if (selectedClusters.length !== 6) {
  throw new Error(`Daily pipeline requires exactly 6 selected clusters / 12 bilingual articles; got ${selectedClusters.length}.`);
}

const generationDrafts = await Promise.all(
  selectedClusters.map(async (cluster) => {
    const clusterNotes = notes.filter((note) => cluster.sourceIds.includes(note.sourceId));
    const vi = await writeArticleVi(cluster, clusterNotes);
    const en = await writeArticleEn(cluster, clusterNotes);

    return {
      outline: createOutline(cluster, clusterNotes),
      vi,
      en,
      viValidation: validateArticle(vi),
      enValidation: validateArticle(en)
    };
  })
);

const fallbackDrafts = generationDrafts.flatMap((draft) => [draft.vi, draft.en])
  .filter((draft) => draft.generation?.mode !== "ollama");

if (fallbackDrafts.length > 0) {
  const titles = fallbackDrafts.map((draft) => `${draft.lang}: ${draft.title}`).join("; ");
  throw new Error(`Refusing to publish template-fallback articles (${fallbackDrafts.length}). Fix Ollama/API quota first. ${titles}`);
}

await mkdir(rawDir, { recursive: true });
await writeFile(resolve(rawDir, `${today}.source-items.json`), JSON.stringify(extracted, null, 2) + "\n");
await writeFile(resolve(root, "content/notes/source-notes.mock.json"), JSON.stringify(notes, null, 2) + "\n");
await writeFile(resolve(root, "content/clusters/topic-clusters.mock.json"), JSON.stringify(clusters, null, 2) + "\n");
await writeFile(resolve(root, "content/exports/generation-drafts.mock.json"), JSON.stringify(generationDrafts, null, 2) + "\n");

await exportRuntimeAgentData({ notes, clusters, drafts: generationDrafts });
await exportAgentData();
await import("./sync-articles.ts");

console.log(`Daily pipeline completed with ${extracted.length} sources, ${clusters.length} clusters and ${generationDrafts.length} generation draft sets.`);
