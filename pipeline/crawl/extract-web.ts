import type { SourceItem } from "../types/schema.ts";
import { fetchText, metaContent, stripHtml } from "./utils.ts";

export async function extractWebContent(item: SourceItem): Promise<SourceItem> {
  if (item.extractedText || item.sourceType === "youtube") return item;

  try {
    const html = await fetchText(item.sourceUrl, 8_000);
    const extractedText = stripHtml(html).slice(0, 6_000);
    if (extractedText.length < item.rawSummary.length) return item;

    // Extract og:image using shared metaContent helper
    const ogImage = metaContent(html, "og:image");
    const imageUrl = ogImage || undefined;

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
