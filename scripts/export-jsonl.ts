import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { articles } from "../apps/web/src/data/articles.ts";
import type { Article, ArticleChunk, Lang } from "../apps/web/src/lib/schema.ts";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const publicAgentDir = resolve(root, "apps/web/public/data/agent");
const contentExportsDir = resolve(root, "content/exports");
const contentNotesDir = resolve(root, "content/notes");
const contentClustersDir = resolve(root, "content/clusters");

function jsonl(rows: unknown[]) {
  return rows.map((row) => JSON.stringify(row)).join("\n") + "\n";
}

function articleText(article: Article) {
  return [
    article.title,
    article.subtitle,
    article.tldr.join("\n"),
    article.bodyMarkdown,
    article.whyItMatters,
    article.creatorTakeaway
  ].join("\n\n");
}

function agentDoc(article: Article) {
  return {
    doc_id: article.id,
    type: "generated_article",
    lang: article.lang,
    category: article.category,
    title: article.title,
    text: articleText(article),
    tags: article.tags,
    source_urls: article.sources.map((source) => source.url),
    canonical_url: `https://ai-radar.vercel.app/${article.lang}/${article.category}/${article.slug}`,
    created_at: article.generation.generatedAt,
    license: "internal-training-allowed",
    version: 1
  };
}

function chunksForArticle(article: Article): ArticleChunk[] {
  const base = {
    articleId: article.id,
    lang: article.lang,
    category: article.category,
    title: article.title,
    tags: article.tags,
    sourceUrls: article.sources.map((source) => source.url),
    canonicalUrl: `https://ai-radar.vercel.app/${article.lang}/${article.category}/${article.slug}`,
    publishedAt: article.publishedAt
  };

  return [
    {
      ...base,
      chunkId: `${article.id}_tldr`,
      section: "tldr",
      text: article.tldr.join("\n")
    },
    {
      ...base,
      chunkId: `${article.id}_body`,
      section: "body",
      text: article.bodyMarkdown
    },
    {
      ...base,
      chunkId: `${article.id}_why`,
      section: "whyItMatters",
      text: article.whyItMatters
    },
    {
      ...base,
      chunkId: `${article.id}_takeaway`,
      section: "creatorTakeaway",
      text: article.creatorTakeaway
    },
    {
      ...base,
      chunkId: `${article.id}_sources`,
      section: "sources",
      text: article.sources.map((source) => `${source.sourceName}: ${source.title} (${source.url})`).join("\n")
    }
  ];
}

function promptWorkflows(lang: Lang) {
  return articles
    .filter((article) => article.lang === lang && article.category.startsWith("prompt-"))
    .map((article) => ({
      workflow_id: article.id,
      lang: article.lang,
      type: article.category === "prompt-image" ? "image" : "video",
      title: article.title,
      summary: article.subtitle,
      tags: article.tags,
      canonical_url: `https://ai-radar.vercel.app/${article.lang}/${article.category}/${article.slug}`,
      source_urls: article.sources.map((source) => source.url)
    }));
}

function sourceNotes() {
  return articles.flatMap((article) =>
    article.sources.map((source, index) => ({
      sourceId: `${article.id}_src_${index + 1}`,
      sourceType: source.sourceType,
      sourceName: source.sourceName,
      url: source.url,
      title: source.title,
      publishedAt: article.publishedAt,
      categoryHints: [article.category],
      keyFacts: article.tldr,
      claims: article.tldr.map((item) => ({
        text: item,
        confidence: article.generation.confidence,
        evidence: source.url
      })),
      usableFor: article.category.startsWith("prompt-") ? ["article", "prompt-workflow"] : ["article", "trend"],
      copyrightRisk: "low"
    }))
  );
}

function topicClusters() {
  const byCluster = new Map<string, Article[]>();
  articles.forEach((article) => {
    byCluster.set(article.generation.sourceClusterId, [...(byCluster.get(article.generation.sourceClusterId) ?? []), article]);
  });

  return [...byCluster.entries()].map(([clusterId, clusterArticles]) => ({
    clusterId,
    category: clusterArticles[0].category,
    topic: clusterArticles[0].title,
    sourceIds: clusterArticles.flatMap((article) => article.sources.map((source) => source.url)),
    articleWorthinessScore: 0.78,
    reasonSelected: "Mock MVP topic selected to validate publication structure and agent exports.",
    confidence: clusterArticles[0].generation.confidence,
    selectedForGeneration: true
  }));
}

async function writeBoth(relativePath: string, content: string) {
  const destinations = [resolve(publicAgentDir, relativePath), resolve(contentExportsDir, relativePath)];
  await Promise.all(
    destinations.map(async (destination) => {
      await mkdir(dirname(destination), { recursive: true });
      await writeFile(destination, content);
    })
  );
}

export async function exportAgentData() {
  const viArticles = articles.filter((article) => article.lang === "vi");
  const enArticles = articles.filter((article) => article.lang === "en");
  const viChunks = viArticles.flatMap(chunksForArticle);
  const enChunks = enArticles.flatMap(chunksForArticle);
  const notes = sourceNotes();
  const clusters = topicClusters();
  const workflows = [...promptWorkflows("vi"), ...promptWorkflows("en")];

  await writeBoth("articles.vi.jsonl", jsonl(viArticles.map(agentDoc)));
  await writeBoth("articles.en.jsonl", jsonl(enArticles.map(agentDoc)));
  await writeBoth("chunks.vi.jsonl", jsonl(viChunks));
  await writeBoth("chunks.en.jsonl", jsonl(enChunks));
  await writeBoth("source-notes.jsonl", jsonl(notes));
  await writeBoth("topic-clusters.jsonl", jsonl(clusters));
  await writeBoth("prompt-workflows.jsonl", jsonl(workflows));

  const manifest = {
    name: "AI Radar agent-ready export",
    generatedAt: new Date().toISOString(),
    primaryLanguage: "vi",
    secondaryLanguage: "en",
    articleCount: articles.length,
    chunkCount: viChunks.length + enChunks.length,
    files: [
      "articles.vi.jsonl",
      "articles.en.jsonl",
      "chunks.vi.jsonl",
      "chunks.en.jsonl",
      "source-notes.jsonl",
      "topic-clusters.jsonl",
      "prompt-workflows.jsonl"
    ],
    rawSourcesExposed: false
  };
  await writeBoth("training-manifest.json", JSON.stringify(manifest, null, 2) + "\n");

  await mkdir(contentNotesDir, { recursive: true });
  await mkdir(contentClustersDir, { recursive: true });
  await writeFile(resolve(contentNotesDir, "source-notes.jsonl"), jsonl(notes));
  await writeFile(resolve(contentClustersDir, "topic-clusters.jsonl"), jsonl(clusters));
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  await exportAgentData();
  console.log("Exported agent-ready JSONL data.");
}
