import type { SourceItem } from "../types/schema.ts";

export async function extractRedditPost(item: SourceItem): Promise<SourceItem> {
  if (item.sourceType !== "reddit") return item;
  return {
    ...item,
    extractedText: item.extractedText ?? `${item.title}\n\n${item.rawSummary}`
  };
}
