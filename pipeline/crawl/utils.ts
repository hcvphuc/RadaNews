import { createHash } from "node:crypto";
import type { SourceConfig } from "../sources/sources.config.ts";
import type { SourceItem } from "../types/schema.ts";

type ParsedFeedItem = {
  title: string;
  link: string;
  summary: string;
  publishedAt?: string;
  author?: string;
};

const DEFAULT_TIMEOUT_MS = 10_000;

export function stableId(parts: string[]): string {
  return createHash("sha1").update(parts.join("|")).digest("hex").slice(0, 16);
}

export function stripHtml(value: string): string {
  return decodeEntities(value)
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function decodeEntities(value: string): string {
  const named: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: "\""
  };

  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity: string) => {
    if (entity.startsWith("#x")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    }
    return named[entity.toLowerCase()] ?? match;
  });
}

export async function fetchText(url: string, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<string> {
  const response = await fetch(url, {
    headers: {
      accept: "application/rss+xml, application/atom+xml, text/xml, text/html;q=0.9, */*;q=0.8",
      "user-agent": "AI Radar crawler/0.1 (+https://ai-radar-news-pi.vercel.app)"
    },
    signal: AbortSignal.timeout(timeoutMs)
  });

  if (!response.ok) {
    throw new Error(`Fetch failed ${response.status} ${response.statusText}`);
  }

  return response.text();
}

export function parseFeed(xml: string): ParsedFeedItem[] {
  const rssItems = collectBlocks(xml, "item").map(parseRssItem).filter(isParsedFeedItem);
  if (rssItems.length > 0) return rssItems;

  return collectBlocks(xml, "entry").map(parseAtomEntry).filter(isParsedFeedItem);
}

export function parseHtmlPage(html: string, source: SourceConfig): SourceItem[] {
  const title = textBetween(html, "title") || `${source.name} update`;
  const description =
    metaContent(html, "description") ||
    metaContent(html, "og:description") ||
    stripHtml(html).slice(0, 420);
  const now = new Date().toISOString();

  return [
    {
      id: `src_${source.id}_${stableId([source.url, title])}`,
      sourceConfigId: source.id,
      sourceType: source.sourceType,
      sourceName: source.name,
      sourceUrl: source.url,
      title: stripHtml(title),
      rawSummary: description || `Latest page snapshot from ${source.name}.`,
      publishedAt: now,
      crawledAt: now,
      categoryHints: source.categories,
      score: source.weight,
      crawlStatus: "live"
    }
  ];
}

export function toSourceItem(source: SourceConfig, parsed: ParsedFeedItem): SourceItem {
  const now = new Date().toISOString();
  const link = new URL(parsed.link || source.url, source.url).toString();

  return {
    id: `src_${source.id}_${stableId([link, parsed.title])}`,
    sourceConfigId: source.id,
    sourceType: source.sourceType,
    sourceName: source.name,
    sourceUrl: link,
    title: stripHtml(parsed.title || `${source.name} update`),
    rawSummary: stripHtml(parsed.summary || parsed.title || `${source.name} update`),
    publishedAt: normalizeDate(parsed.publishedAt) ?? now,
    crawledAt: now,
    categoryHints: source.categories,
    author: parsed.author ? stripHtml(parsed.author) : undefined,
    score: source.weight,
    crawlStatus: "live"
  };
}

export function fallbackSourceItem(source: SourceConfig, error: unknown): SourceItem {
  const now = new Date().toISOString();
  const message = error instanceof Error ? error.message : String(error);

  return {
    id: `src_${source.id}_${now.slice(0, 10)}_fallback`,
    sourceConfigId: source.id,
    sourceType: source.sourceType,
    sourceName: source.name,
    sourceUrl: source.url,
    title: `${source.name} signal for ${source.categories[0]}`,
    rawSummary: "Fallback crawler item. Live crawl was unavailable, so the pipeline preserved source coverage for local verification.",
    publishedAt: now,
    crawledAt: now,
    categoryHints: source.categories,
    score: source.weight * 0.65,
    crawlStatus: "fallback",
    crawlError: message
  };
}

function parseRssItem(block: string): ParsedFeedItem | undefined {
  const title = textBetween(block, "title");
  const link = textBetween(block, "link") || textBetween(block, "guid");
  if (!title || !link) return undefined;

  return {
    title,
    link,
    summary: textBetween(block, "description") || textBetween(block, "content:encoded") || title,
    publishedAt: textBetween(block, "pubDate") || textBetween(block, "dc:date"),
    author: textBetween(block, "author") || textBetween(block, "dc:creator")
  };
}

function parseAtomEntry(block: string): ParsedFeedItem | undefined {
  const title = textBetween(block, "title");
  const link = atomLink(block) || textBetween(block, "id");
  if (!title || !link) return undefined;

  return {
    title,
    link,
    summary: textBetween(block, "summary") || textBetween(block, "content") || title,
    publishedAt: textBetween(block, "published") || textBetween(block, "updated"),
    author: textBetween(textBetween(block, "author"), "name")
  };
}

function collectBlocks(value: string, tag: string): string[] {
  const blocks: string[] = [];
  const pattern = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(value)) !== null) {
    blocks.push(match[1] ?? "");
  }

  return blocks;
}

function textBetween(value: string, tag: string): string {
  const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`<${escapedTag}\\b[^>]*>([\\s\\S]*?)<\\/${escapedTag}>`, "i");
  return stripHtml(pattern.exec(value)?.[1] ?? "");
}

export function metaContent(html: string, name: string): string {
  const pattern = new RegExp(`<meta\\b(?=[^>]*(?:name|property)=["']${name}["'])[^>]*content=["']([^"']+)["'][^>]*>`, "i");
  return stripHtml(pattern.exec(html)?.[1] ?? "");
}

function atomLink(block: string): string {
  const alternate = /<link\b(?=[^>]*rel=["']alternate["'])[^>]*href=["']([^"']+)["'][^>]*\/?>/i.exec(block)?.[1];
  const first = /<link\b[^>]*href=["']([^"']+)["'][^>]*\/?>/i.exec(block)?.[1];
  return alternate || first || "";
}

function normalizeDate(value?: string): string | undefined {
  if (!value) return undefined;
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? undefined : new Date(timestamp).toISOString();
}

function isParsedFeedItem(value: ParsedFeedItem | undefined): value is ParsedFeedItem {
  return Boolean(value?.title && value.link);
}
