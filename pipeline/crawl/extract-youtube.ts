import type { SourceItem } from "../types/schema.ts";

export async function extractYouTubeMetadata(item: SourceItem): Promise<SourceItem> {
  if (item.sourceType !== "youtube") return item;
  return {
    ...item,
    transcript: item.transcript ?? item.rawSummary
  };
}
