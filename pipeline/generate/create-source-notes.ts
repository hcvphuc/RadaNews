import type { SourceItem, SourceNote } from "../types/schema.ts";

export function createSourceNotes(items: SourceItem[]): SourceNote[] {
  return items.map((item) => ({
    sourceId: item.id,
    sourceType: item.sourceType,
    sourceName: item.sourceName,
    url: item.sourceUrl,
    title: item.title,
    publishedAt: item.publishedAt,
    categoryHints: item.categoryHints,
    keyFacts: factsFrom(item),
    claims: [
      {
        text: item.rawSummary,
        confidence: item.crawlStatus === "live" ? "medium" : "low",
        evidence: item.sourceUrl
      }
    ],
    usableFor: item.categoryHints.some((category) => category.startsWith("prompt-"))
      ? ["article", "prompt-workflow"]
      : ["article", "trend"],
    copyrightRisk: copyrightRisk(item)
  }));
}

function factsFrom(item: SourceItem) {
  const sourceText = item.extractedText || item.rawSummary;
  const facts = sourceText
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length >= 40)
    .slice(0, 4);

  return facts.length > 0 ? facts : [item.rawSummary];
}

function copyrightRisk(item: SourceItem): SourceNote["copyrightRisk"] {
  const textLength = (item.extractedText ?? "").length;
  if (textLength > 4_000) return "medium";
  return "low";
}
