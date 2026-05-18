import type { SourceItem } from "../types/schema.ts";
import { fetchText, stripHtml } from "./utils.ts";

type RedditPost = {
  data: {
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
  };
};

/**
 * Extracts richer content from Reddit posts using Reddit's JSON API.
 * Falls back to raw summary from RSS if API call fails.
 */
export async function extractRedditPost(item: SourceItem): Promise<SourceItem> {
  if (item.sourceType !== "reddit") return item;

  const redditUrl = extractRedditPermalink(item);
  if (!redditUrl) return enrichFromRss(item);

  try {
    const jsonUrl = `${redditUrl.replace(/\/$/, "")}.json`;
    const body = await fetchText(jsonUrl, 8_000);
    const posts = JSON.parse(body) as RedditPost[];

    // Reddit returns [postListing, commentsListing]
    const postData = Array.isArray(posts) ? posts[0]?.data?.children?.[0]?.data : undefined;
    if (!postData) return enrichFromRss(item);

    const selftext = postData.selftext
      ? stripHtml(postData.selftext).slice(0, 4000)
      : "";

    // Get top comments for context
    let topComments = "";
    try {
      const comments = Array.isArray(posts) ? posts[1]?.data?.children : undefined;
      if (comments) {
        topComments = comments
          .filter((c: any) => c.kind === "t1" && c.data?.body)
          .slice(0, 3)
          .map((c: any) => stripHtml(c.data.body).slice(0, 300))
          .join("\n\n");
      }
    } catch {
      // comments extraction is best-effort
    }

    const extractedText = [
      postData.selftext ? `Post: ${selftext}` : "",
      topComments ? `Top comments:\n${topComments}` : "",
      item.rawSummary ? `Summary: ${item.rawSummary}` : ""
    ]
      .filter(Boolean)
      .join("\n\n");

    return {
      ...item,
      title: postData.title || item.title,
      extractedText: extractedText || item.rawSummary,
      author: postData.author || item.author,
      score: item.score ?? clampRedditScore(postData.score, postData.num_comments)
    };
  } catch {
    return enrichFromRss(item);
  }
}

function enrichFromRss(item: SourceItem): SourceItem {
  return {
    ...item,
    extractedText: item.extractedText ?? `${item.title}\n\n${item.rawSummary}`,
  };
}

/**
 * Extract the Reddit permalink from a source URL.
 * Handles URLs like:
 * - https://www.reddit.com/r/subreddit/.rss
 * - https://www.reddit.com/r/subreddit/comments/id/title/
 */
function extractRedditPermalink(item: SourceItem): string | undefined {
  const url = item.sourceUrl;

  // Already a direct post link
  if (/\/comments\/[a-z0-9]+\//i.test(url)) {
    return url;
  }

  // If we have a link from RSS, try it
  // RSS feed items often have sourceUrl set to the actual post
  if (item.rawSummary && !item.rawSummary.includes("Fallback crawler")) {
    // Can't derive permalink from RSS feed URL alone
    // Return undefined so we use RSS enrichment
    return undefined;
  }

  return undefined;
}

function clampRedditScore(score: number, numComments: number): number {
  if (!score || score < 0) return 0.45;
  // Normalized: upvotes + engagement signal
  const normalized = Math.log10(Math.max(1, score)) * 0.12 + Math.log10(Math.max(1, numComments)) * 0.08;
  return Math.min(1, Math.max(0.3, 0.4 + normalized));
}
