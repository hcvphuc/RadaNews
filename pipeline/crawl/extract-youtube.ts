import type { SourceItem } from "../types/schema.ts";
import { fetchText, stripHtml } from "./utils.ts";

type YouTubeOembed = {
  title: string;
  author_name: string;
  author_url: string;
  thumbnail_url: string;
};

export async function extractYouTubeMetadata(item: SourceItem): Promise<SourceItem> {
  if (item.sourceType !== "youtube") return item;

  const videoId = extractVideoId(item.sourceUrl);
  if (!videoId) return enrichBasic(item);

  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const body = await fetchText(oembedUrl, 6_000);
    const oembed = JSON.parse(body) as YouTubeOembed;

    // Get page description
    let description = "";
    try {
      const pageBody = await fetchText(`https://www.youtube.com/watch?v=${videoId}`, 12_000);
      const m = /<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i.exec(pageBody);
      description = m?.[1] ? stripHtml(m[1]).slice(0, 1000) : "";
    } catch { /* best-effort */ }

    // Thumbnail: hi-res from video ID
    const imageUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    const extractedText = [
      description ? `Description: ${description}` : "",
      item.rawSummary ? `Summary: ${item.rawSummary}` : "",
    ].filter(Boolean).join("\n\n");

    return {
      ...item,
      title: oembed.title || item.title,
      author: oembed.author_name || item.author,
      extractedText: extractedText || item.rawSummary,
      rawSummary: description || item.rawSummary,
      imageUrl: imageUrl,
      score: item.score ?? 0.7
    };
  } catch {
    return enrichBasic(item);
  }
}

function enrichBasic(item: SourceItem): SourceItem {
  const videoId = extractVideoId(item.sourceUrl);
  const imageUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : undefined;
  return {
    ...item,
    transcript: item.transcript ?? item.rawSummary,
    imageUrl: imageUrl || item.imageUrl,
  };
}

function extractVideoId(url: string): string | undefined {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
  return m?.[1];
}
