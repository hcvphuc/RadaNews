import type { SourceItem } from "../types/schema.ts";
import { fetchText, stripHtml } from "./utils.ts";

export async function extractWebContent(item: SourceItem): Promise<SourceItem> {
  if (item.extractedText || item.sourceType === "youtube") return item;

  try {
    const html = await fetchText(item.sourceUrl, 8_000);
    const extractedText = stripHtml(html).slice(0, 6_000);
    if (extractedText.length < item.rawSummary.length) return item;

    // Extract og:image
    const ogMatch = /<meta\b(?=[^>]*property=["']og:image["'])[^>]*content=["']([^"']+)["'][^>]*>/i.exec(html);
    const imageUrl = ogMatch?.[1] || undefined;

    return {
      ...item,
      extractedText,
      imageUrl: imageUrl || item.imageUrl,
    };
  } catch {
    if (item.extractedText) return item;
  }

  return {
    ...item,
    extractedText: item.extractedText ?? item.rawSummary
  };
}
