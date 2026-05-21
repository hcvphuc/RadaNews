import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { articles as mockArticles } from "../apps/web/src/data/articles.ts";
import { generatedArticles } from "../apps/web/src/data/articles-generated.ts";

const articles = [...mockArticles, ...generatedArticles];
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
  // Get highlights from either old (tldr) or new (highlights) format
  const highlights = article.tldr?.join("\n") ?? article.highlights?.map(h => h.text).join("\n") ?? "";
  // Get body from either old (bodyMarkdown) or new (sections) format
  const body = article.bodyMarkdown ?? article.sections?.map(s =>
    `## ${s.heading}\n${s.blocks.map(b => {
      if (b.type === "paragraph") return b.text;
      if (b.type === "list") return b.items.map(i => `- ${i}`).join("\n");
      if (b.type === "callout") return `> **${b.title ?? ""}**: ${b.text}`;
      if (b.type === "quote") return `> ${b.text}${b.attribution ? ` — ${b.attribution}` : ""}`;
      if (b.type === "media") return `![${b.alt}](${b.src})${b.caption ? `\n*${b.caption}*` : ""}`;
      return "";
    }).join("\n\n")}`
  ).join("\n\n") ?? "";
  // Get insights from either old (whyItMatters) or new (insightBlocks) format
  const insights = article.whyItMatters ?? article.insightBlocks?.map(i => `**${i.title}**: ${i.text}`).join("\n\n") ?? "";
  // Get takeaway from either old or new format
  const takeaway = article.creatorTakeaway ?? (article.takeaway 
    ? [article.takeaway.title, article.takeaway.text, ...(article.takeaway.items ?? [])].filter(Boolean).join("\n")
    : "");
  
  return [
    article.title,
    article.subtitle,
    highlights,
    body,
    insights,
    takeaway
  ].filter(Boolean).join("\n\n");
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

  const chunks: ArticleChunk[] = [];

  // Highlights (supports both old tldr and new highlights)
  const highlights = article.tldr ?? article.highlights?.map(h => h.text) ?? [];
  if (highlights.length > 0) {
    chunks.push({
      ...base,
      chunkId: `${article.id}_highlights`,
      section: "tldr",
      text: highlights.join("\n")
    });
  }

  // Body (supports both old bodyMarkdown and new sections)
  const bodyText = article.bodyMarkdown ?? article.sections?.map(s =>
    `## ${s.heading}\n${s.blocks.map(b => {
      if (b.type === "paragraph") return b.text;
      if (b.type === "list") return b.items.map(i => `- ${i}`).join("\n");
      if (b.type === "callout") return `> **${b.title ?? ""}**: ${b.text}`;
      if (b.type === "quote") return `> ${b.text}${b.attribution ? ` — ${b.attribution}` : ""}`;
      if (b.type === "media") return `![${b.alt}](${b.src})${b.caption ? `\n*${b.caption}*` : ""}`;
      return "";
    }).join("\n\n")}`
  ).join("\n\n") ?? "";
  if (bodyText) {
    chunks.push({
      ...base,
      chunkId: `${article.id}_body`,
      section: "body",
      text: bodyText
    });
  }

  // Insights (supports both old whyItMatters and new insightBlocks)
  const insightsText = article.whyItMatters ?? article.insightBlocks?.map(i => `**${i.title}**: ${i.text}`).join("\n\n") ?? "";
  if (insightsText) {
    chunks.push({
      ...base,
      chunkId: `${article.id}_insights`,
      section: "whyItMatters",
      text: insightsText
    });
  }

  // Takeaway (supports both formats)
  const takeawayText = article.creatorTakeaway ?? (article.takeaway
    ? [article.takeaway.title, article.takeaway.text, ...(article.takeaway.items ?? [])].filter(Boolean).join("\n")
    : "");
  if (takeawayText) {
    chunks.push({
      ...base,
      chunkId: `${article.id}_takeaway`,
      section: "creatorTakeaway",
      text: takeawayText
    });
  }

  // Sources
  const sourcesText = article.sources.map((source) => `${source.sourceName ?? source.publisher ?? ""}: ${source.title} (${source.url})`).filter(Boolean).join("\n");
  if (sourcesText) {
    chunks.push({
      ...base,
      chunkId: `${article.id}_sources`,
      section: "sources",
      text: sourcesText
    });
  }

  return chunks;
}

function promptWorkflows(lang: Lang) {
  return articles
    .filter((article) => article.lang === lang && article.category.startsWith("prompt-"))
    .map((article) => ({
      workflow_id: article.id,
      lang: article.lang,
      type: article.category === "prompt-image" ? "image" as const : "video" as const,
      title: article.title,
      summary: article.subtitle ?? article.highlights?.map(h => h.text).join("; ") ?? "",
      tags: article.tags,
      canonical_url: `https://ai-radar.vercel.app/${article.lang}/${article.category}/${article.slug}`,
      source_urls: article.sources.map((source) => source.url)
    }));
}

function sourceNotes() {
  return articles.flatMap((article) =>
    article.sources.map((source, index) => {
      const highlights = article.tldr ?? article.highlights?.map(h => h.text) ?? [];
      return {
        sourceId: `${article.id}_src_${index + 1}`,
        sourceType: (source.sourceType || "other") as SourceType,
        sourceName: source.sourceName ?? source.publisher ?? "",
        url: source.url,
        title: source.title,
        publishedAt: article.publishedAt,
        categoryHints: [article.category],
        keyFacts: highlights,
        claims: highlights.map((item) => ({
          text: item,
          confidence: article.generation.confidence,
          evidence: source.url
        })),
        usableFor: article.category.startsWith("prompt-") ? ["article", "prompt-workflow"] as const : ["article", "trend"] as const,
        copyrightRisk: "low" as Confidence
      };
    })
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
