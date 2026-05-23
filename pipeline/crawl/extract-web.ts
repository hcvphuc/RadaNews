import type { SourceItem } from "../types/schema.ts";
import { fetchText, metaContent, stripHtml } from "./utils.ts";

export async function extractWebContent(item: SourceItem): Promise<SourceItem> {
  if (item.extractedText || item.sourceType === "youtube") return item;

  try {
    const html = await fetchText(item.sourceUrl, 8_000);
    const extractedText = stripHtml(html).slice(0, 6_000);
    if (extractedText.length < item.rawSummary.length) return item;

    // Extract verified social media metadata from the source page.
    const ogImage = metaContent(html, "og:image");
    const ogVideo = metaContent(html, "og:video:secure_url") || metaContent(html, "og:video:url") || metaContent(html, "og:video");
    const imageUrl = ogImage || undefined;
    const videoUrl = ogVideo && /\.(mp4|webm|mov)(?:[?#]|$)/i.test(ogVideo) ? ogVideo : undefined;

    return {
      ...item,
      extractedText,
      imageUrl: imageUrl || item.imageUrl,
      videoUrl: videoUrl || item.videoUrl,
    };
  } catch {
    if (item.extractedText) return item;
  }

  return {
    ...item,
    extractedText: item.extractedText ?? item.rawSummary
  };
}
