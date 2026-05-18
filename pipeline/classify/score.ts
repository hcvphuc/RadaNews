import type { SourceItem } from "../types/schema.ts";

export function scoreSource(item: SourceItem) {
  const sourceWeight = clamp(item.score ?? 0.5);
  const content = `${item.title}\n${item.rawSummary}\n${item.extractedText ?? ""}\n${item.transcript ?? ""}`;
  const contentDepth = clamp(content.length / 3_500);
  const recency = recencyScore(item.publishedAt);
  const sourceTypeBoost = item.sourceType === "blog" ? 0.08 : item.sourceType === "youtube" ? 0.06 : 0.03;
  const crossCategorySignal = item.categoryHints.length > 1 ? 0.08 : 0.03;
  const livePenalty = item.crawlStatus === "fallback" ? 0.18 : 0;
  const thinContentPenalty = item.rawSummary.length < 120 ? 0.12 : 0;

  return round(
    clamp(sourceWeight * 0.42 + contentDepth * 0.2 + recency * 0.22 + sourceTypeBoost + crossCategorySignal - livePenalty - thinContentPenalty)
  );
}

function recencyScore(value: string) {
  const publishedAt = Date.parse(value);
  if (Number.isNaN(publishedAt)) return 0.35;

  const ageHours = Math.max(0, (Date.now() - publishedAt) / 3_600_000);
  if (ageHours <= 36) return 1;
  if (ageHours <= 96) return 0.75;
  if (ageHours <= 24 * 14) return 0.5;
  return 0.25;
}

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function round(value: number) {
  return Number(value.toFixed(2));
}
