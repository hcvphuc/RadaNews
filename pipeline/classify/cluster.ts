import { categorize } from "./categorize.ts";
import { scoreSource } from "./score.ts";
import type { Category, SourceItem, TopicCluster } from "../types/schema.ts";

export function clusterSources(items: SourceItem[]): TopicCluster[] {
  const byCategory = new Map<Category, SourceItem[]>();
  items.forEach((item) => {
    const category = categorize(item);
    byCategory.set(category, [...(byCategory.get(category) ?? []), item]);
  });

  return [...byCategory.entries()]
    .map(([category, categoryItems]) => buildCluster(category, categoryItems))
    .sort((a, b) => b.articleWorthinessScore - a.articleWorthinessScore);
}

function buildCluster(category: Category, items: SourceItem[]): TopicCluster {
  const sortedItems = [...items].sort((a, b) => scoreSource(b) - scoreSource(a));
  const averageScore = sortedItems.reduce((sum, item) => sum + scoreSource(item), 0) / Math.max(1, sortedItems.length);
  const crossSourceBoost = Math.min(0.22, Math.max(0, sortedItems.length - 1) * 0.07);
  const liveCoverageBoost = sortedItems.some((item) => item.crawlStatus === "live") ? 0.08 : 0;
  const articleWorthinessScore = round(Math.min(1, averageScore + crossSourceBoost + liveCoverageBoost));
  const topic = topicLabel(category, sortedItems);

  return {
    clusterId: `cluster_${category}_${slugify(topic)}_${new Date().toISOString().slice(0, 10)}`,
    category,
    topic,
    sourceIds: sortedItems.map((item) => item.id),
    articleWorthinessScore,
    reasonSelected: reasonForSelection(sortedItems, articleWorthinessScore),
    confidence: confidenceFor(articleWorthinessScore, sortedItems),
    selectedForGeneration: articleWorthinessScore >= 0.32
  };
}

function topicLabel(category: Category, items: SourceItem[]) {
  const bestTitle = items[0]?.title.replace(/\s+/g, " ").trim();
  // Truncate long titles, remove "signal for" suffix
  let clean = (bestTitle && !bestTitle.toLowerCase().includes("signal for"))
    ? bestTitle
    : "AI signal";
  // Max 80 chars for topic label
  if (clean.length > 80) {
    clean = clean.slice(0, 77) + "...";
  }
  return clean;
}

function reasonForSelection(items: SourceItem[], score: number) {
  const liveCount = items.filter((item) => item.crawlStatus === "live").length;
  const sourceNames = [...new Set(items.map((item) => item.sourceName))].slice(0, 3).join(", ");
  return `Score ${score.toFixed(2)} from ${items.length} source item(s), ${liveCount} live crawl(s), strongest sources: ${sourceNames}.`;
}

function confidenceFor(score: number, items: SourceItem[]): TopicCluster["confidence"] {
  const hasLiveSource = items.some((item) => item.crawlStatus === "live");
  if (score >= 0.72 && hasLiveSource) return "high";
  if (score >= 0.45) return "medium";
  return "low";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

function round(value: number) {
  return Number(value.toFixed(2));
}
