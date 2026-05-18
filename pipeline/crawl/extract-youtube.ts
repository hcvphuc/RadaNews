import type { SourceItem } from "../types/schema.ts";
import { fetchText, stripHtml } from "./utils.ts";

type YouTubeOembed = {
  title: string;
  author_name: string;
  author_url: string;
  thumbnail_url: string;
  html: string;
};

/**
 * Extract YouTube video metadata via oEmbed API.
 * Gets title, channel name, and attempts to get description from page.
 * Note: transcript extraction requires youtube-transcript package or innertube API.
 * For now, this gets rich metadata. Transcript support can be added later.
 */
export async function extractYouTubeMetadata(item: SourceItem): Promise<SourceItem> {
  if (item.sourceType !== "youtube") return item;

  const videoId = extractVideoId(item.sourceUrl);
  if (!videoId) return enrichBasic(item);

  try {
    // oEmbed API - no API key needed
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const oembedBody = await fetchText(oembedUrl, 6_000);
    const oembed = JSON.parse(oembedBody) as YouTubeOembed;

    // Also try to scrape page for description
    let description = "";
    try {
      const pageUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const pageBody = await fetchText(pageUrl, 12_000);
      // Extract from meta description
      const descMatch = /<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i.exec(pageBody);
      description = descMatch?.[1] ? stripHtml(descMatch[1]).slice(0, 1000) : "";
    } catch {
      // Page scrape is best-effort
    }

    const extractedText = [
      description ? `Description: ${description}` : "",
      item.rawSummary ? `Summary: ${item.rawSummary}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    return {
      ...item,
      title: oembed.title || item.title,
      author: oembed.author_name || item.author,
      extractedText: extractedText || item.rawSummary,
      rawSummary: description || item.rawSummary,
      score: item.score ?? 0.7
    };
  } catch {
    return enrichBasic(item);
  }
}

function enrichBasic(item: SourceItem): SourceItem {
  return {
    ...item,
    transcript: item.transcript ?? item.rawSummary,
  };
}

function extractVideoId(url: string): string | undefined {
  const patterns = [
    /(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/
  ];

  for (const pattern of patterns) {
    const match = pattern.exec(url);
    if (match?.[1]) return match[1];
  }

  return undefined;
}
