import type { SourceItem } from "../types/schema.ts";
import { fetchText, stripHtml } from "./utils.ts";

type RedditPostListing = [
  { data: { children: { kind: string; data: RedditPostData }[] } },
  { data: { children: { kind: string; data: RedditCommentData }[] } }
];

type RedditPostData = {
  title: string;
  selftext: string;
  url: string;
  permalink: string;
  author: string;
  created_utc: number;
  num_comments: number;
  score: number;
  subreddit: string;
  thumbnail?: string;
  is_self: boolean;
  domain: string;
  preview?: {
    images: { source: { url: string; width: number; height: number } }[];
  };
  media?: {
    reddit_video?: { fallback_url: string };
    oembed?: { thumbnail_url: string };
  };
};

type RedditCommentData = {
  body: string;
  author: string;
  score: number;
};

export async function extractRedditPost(item: SourceItem): Promise<SourceItem> {
  if (item.sourceType !== "reddit") return item;

  const redditUrl = extractRedditPermalink(item);
  if (!redditUrl) return enrichFromRss(item);

  try {
    const jsonUrl = `${redditUrl.replace(/\/$/, "")}.json`;
    const body = await fetchText(jsonUrl, 8_000);
    const posts = JSON.parse(body) as RedditPostListing;

    const postData = posts[0]?.data?.children?.[0]?.data;
    if (!postData) return enrichFromRss(item);

    const selftext = postData.selftext
      ? stripHtml(postData.selftext).slice(0, 4000)
      : "";

    // Extract image URL
    const imageUrl = extractRedditImage(postData);

    // Get top comments
    let topComments = "";
    try {
      const comments = posts[1]?.data?.children;
      if (comments) {
        topComments = comments
          .filter((c) => c.kind === "t1" && c.data?.body)
          .slice(0, 3)
          .map((c) => stripHtml(c.data.body).slice(0, 300))
          .join("\n\n");
      }
    } catch { /* best-effort */ }

    const extractedText = [
      selftext ? `Post: ${selftext}` : "",
      topComments ? `Top comments:\n${topComments}` : "",
      item.rawSummary ? `Summary: ${item.rawSummary}` : ""
    ].filter(Boolean).join("\n\n");

    return {
      ...item,
      title: postData.title || item.title,
      extractedText: extractedText || item.rawSummary,
      author: postData.author || item.author,
      imageUrl: imageUrl || item.imageUrl,
      score: item.score ?? clampRedditScore(postData.score, postData.num_comments)
    };
  } catch {
    return enrichFromRss(item);
  }
}

function extractRedditImage(data: RedditPostData): string | undefined {
  // Direct image post (i.redd.it, imgur, etc.)
  if (data.url && /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(data.url)) {
    return data.url;
  }
  // Preview images
  const preview = data.preview?.images?.[0]?.source?.url;
  if (preview) {
    return preview.replace(/&amp;/g, "&");
  }
  // Video thumbnail
  if (data.media?.oembed?.thumbnail_url) {
    return data.media.oembed.thumbnail_url;
  }
  // Regular thumbnail (not self/nsfw placeholder)
  if (data.thumbnail && data.thumbnail.startsWith("http")) {
    return data.thumbnail;
  }
  return undefined;
}

function enrichFromRss(item: SourceItem): SourceItem {
  return {
    ...item,
    extractedText: item.extractedText ?? `${item.title}\n\n${item.rawSummary}`,
  };
}

function extractRedditPermalink(item: SourceItem): string | undefined {
  if (/\/comments\/[a-z0-9]+\//i.test(item.sourceUrl)) {
    return item.sourceUrl;
  }
  return undefined;
}

function clampRedditScore(score: number, numComments: number): number {
  if (!score || score < 0) return 0.45;
  const norm = Math.log10(Math.max(1, score)) * 0.12 + Math.log10(Math.max(1, numComments)) * 0.08;
  return Math.min(1, Math.max(0.3, 0.4 + norm));
}
