import { sourceRegistry } from "../sources/sources.config.ts";
import type { SourceItem } from "../types/schema.ts";
import { fallbackSourceItem, fetchText, parseFeed, parseHtmlPage, toSourceItem } from "./utils.ts";

export type CrawlOptions = {
  maxItemsPerSource?: number;
  timeoutMs?: number;
  allowFallback?: boolean;
};

const DEFAULT_MAX_ITEMS = 5;

export async function crawlSources(options: CrawlOptions = {}): Promise<SourceItem[]> {
  const maxItemsPerSource = options.maxItemsPerSource ?? Number(process.env.AI_RADAR_MAX_ITEMS_PER_SOURCE ?? DEFAULT_MAX_ITEMS);
  const enabledSources = sourceRegistry.filter((source) => source.enabled);
  const results = await Promise.all(
    enabledSources.map(async (source) => {
      try {
        const body = await fetchText(source.url, options.timeoutMs);
        const feedItems = parseFeed(body);
        const items =
          feedItems.length > 0
            ? feedItems.slice(0, maxItemsPerSource).map((item) => toSourceItem(source, item))
            : parseHtmlPage(body, source);

        return items.length > 0 ? items : [fallbackSourceItem(source, new Error("No crawlable items found"))];
      } catch (error) {
        if (options.allowFallback === false) throw error;
        return [fallbackSourceItem(source, error)];
      }
    })
  );

  return dedupeByUrl(results.flat());
}

function dedupeByUrl(items: SourceItem[]): SourceItem[] {
  const seen = new Set<string>();
  const deduped: SourceItem[] = [];

  for (const item of items) {
    const key = item.sourceUrl.toLowerCase().replace(/\/$/, "");
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
  }

  return deduped;
}
