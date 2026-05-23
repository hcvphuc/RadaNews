import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { GeneratedArticleDraft, SourceItem, SourceNote } from "../pipeline/types/schema.ts";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));

interface MediaBlock {
  type: "image" | "diagram" | "screenshot" | "comparison" | "video" | "embed";
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  sourceUrl?: string;
}

interface HighlightItem {
  text: string;
}

interface ContentBlock {
  type: string;
  text?: string;
  items?: string[];
  mediaType?: string;
  src?: string;
  alt?: string;
  caption?: string;
  credit?: string;
  sourceUrl?: string;
  placement?: string;
  variant?: string;
  title?: string;
  language?: string;
  code?: string;
  attribution?: string;
}

interface ArticleSection {
  id: string;
  heading: string;
  subheading?: string;
  blocks: ContentBlock[];
}

interface InsightBlock {
  title: string;
  text: string;
  variant?: "analysis" | "impact" | "risk" | "opportunity" | "context";
}

interface TakeawayBlock {
  title?: string;
  text?: string | string[];
  items?: string[];
}

interface Source {
  title: string;
  publisher?: string;
  url: string;
  publishedAt?: string;
}

type SourceMedia = MediaBlock & { sourceId: string };

interface Article {
  id: string;
  slug: string;
  lang: string;
  category: string;
  title: string;
  subtitle?: string;
  publishedAt: string;
  readingTime: number;
  sourceCount?: number;
  author?: string;
  tags: string[];
  heroMedia?: MediaBlock;
  highlights?: HighlightItem[];
  sections: ArticleSection[];
  insightBlocks?: InsightBlock[];
  takeaway?: TakeawayBlock;
  sources: Source[];
  generation: {
    model: string;
    promptVersion: string;
    generatedAt: string;
    sourceClusterId: string;
    confidence: string;
  };
  status: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function readingTimeFromWords(words: number): number {
  return Math.max(1, Math.ceil(words / 200));
}

/** Count words across all structured sections */
function countSectionWords(sections: ArticleSection[] | undefined): number {
  if (!sections) return 0;
  let count = 0;
  for (const sec of sections) {
    for (const block of sec.blocks) {
      if ((block as any).text) count += (block as any).text.split(/\s+/).length;
      if (block.items) count += block.items.join(" ").split(/\s+/).length;
    }
  }
  return count;
}

/** Parse bodyMarkdown into sections (legacy fallback for old format) */
function parseSections(bodyMd: string): ArticleSection[] {
  const sections: ArticleSection[] = [];
  const lines = bodyMd.split("\n");
  let currentSection: ArticleSection | null = null;
  let currentParagraphs: string[] = [];

  function flushParagraphs() {
    if (currentParagraphs.length === 0) return;
    const text = currentParagraphs.join("\n").trim();
    if (text && currentSection) {
      const listItems = text.split("\n").map((l) => l.trim()).filter((l) => l.startsWith("- ") || l.startsWith("* "));
      if (listItems.length >= 2 && listItems.length === text.split("\n").filter((l) => l.trim()).length) {
        currentSection.blocks.push({ type: "list", items: listItems.map((l) => l.replace(/^[\*\-]\s+/, "")) });
      } else {
        currentSection.blocks.push({ type: "paragraph", text });
      }
    }
    currentParagraphs = [];
  }

  for (const line of lines) {
    const h3Match = line.match(/^### (.+)/);
    if (h3Match) {
      flushParagraphs();
      if (currentSection && currentSection.blocks.length > 0) sections.push(currentSection);
      currentSection = { id: "sec_" + slugify(h3Match[1]), heading: h3Match[1], blocks: [] };
    } else if (!line.trim()) {
      flushParagraphs();
    } else {
      currentParagraphs.push(line);
    }
  }
  flushParagraphs();
  if (currentSection && currentSection.blocks.length > 0) sections.push(currentSection);

  if (sections.length === 0 && bodyMd.trim()) {
    sections.push({ id: "sec_main", heading: "Main Analysis", blocks: [{ type: "paragraph", text: bodyMd.trim() }] });
  }

  return sections;
}

function sourceMediaFromItem(item: SourceItem): SourceMedia[] {
  const media: SourceMedia[] = [];
  const videoUrl = (item as SourceItem & { videoUrl?: string }).videoUrl;
  if (videoUrl) {
    media.push({
      sourceId: item.id,
      type: "video",
      src: videoUrl.replace(/&amp;/g, "&"),
      alt: item.title,
      caption: `${item.title} — ${item.sourceName}`,
      credit: item.sourceName,
      sourceUrl: item.sourceUrl,
    });
  }
  if (item.imageUrl) {
    media.push({
      sourceId: item.id,
      type: "image",
      src: item.imageUrl.replace(/&amp;/g, "&"),
      alt: item.title,
      caption: `${item.title} — ${item.sourceName}`,
      credit: item.sourceName,
      sourceUrl: item.sourceUrl,
    });
  }
  return media;
}

function injectVerifiedSourceMedia(
  sections: ArticleSection[],
  sourceIds: string[] | undefined,
  mediaBySource: Map<string, SourceMedia[]>,
  heroMedia: MediaBlock | undefined,
  category: string,
): ArticleSection[] {
  if (!sections.length || !sourceIds?.length) return sections;

  const heroSrc = heroMedia?.src?.replace(/&amp;/g, "&");
  const pool = sourceIds.flatMap((sid) => mediaBySource.get(sid) || []);
  const seen = new Set<string>();
  const unique = pool.filter((m) => {
    if (!m.src || seen.has(m.src)) return false;
    seen.add(m.src);
    return true;
  });

  unique.sort((a, b) => {
    const aVideo = a.type === "video" ? 1 : 0;
    const bVideo = b.type === "video" ? 1 : 0;
    if ((category === "ai-video" || category === "prompt-video") && aVideo !== bVideo) return bVideo - aVideo;
    if (a.src === heroSrc) return 1;
    if (b.src === heroSrc) return -1;
    return 0;
  });

  const selected: SourceMedia[] = unique.slice(0, 2);
  if (selected.length === 0 && heroMedia?.src) {
    selected.push({ ...heroMedia, sourceId: sourceIds[0], caption: heroMedia.caption || heroMedia.alt });
  }
  if (selected.length === 0) return sections;

  const cloned: ArticleSection[] = JSON.parse(JSON.stringify(sections));
  let mediaIndex = 0;
  for (const section of cloned) {
    if (mediaIndex >= selected.length) break;
    if (section.blocks.some((block) => block.type === "media" && block.src)) continue;
    const paragraphIndex = section.blocks.findIndex((block) => block.type === "paragraph");
    const insertAfter = paragraphIndex >= 0 ? paragraphIndex : 0;
    const media = selected[mediaIndex++];
    section.blocks.splice(insertAfter + 1, 0, {
      type: "media",
      mediaType: media.type === "video" || media.type === "embed" ? "video" : "image",
      src: media.src,
      alt: media.alt,
      caption: media.caption,
      credit: media.credit,
      sourceUrl: media.sourceUrl,
      placement: "after-paragraph",
    });
  }

  return cloned;
}

async function main() {
  const draftsPath = resolve(root, "content/exports/generation-drafts.mock.json");
  const notesPath = resolve(root, "content/notes/source-notes.mock.json");
  const outPath = resolve(root, "apps/web/src/data/articles-generated.ts");

  let drafts: { vi: any; en: any }[];
  let notes: SourceNote[];

  try {
    drafts = JSON.parse(await readFile(draftsPath, "utf-8"));
    notes = JSON.parse(await readFile(notesPath, "utf-8"));
  } catch {
    console.error("No draft data found. Run `npm run daily` first.");
    process.exit(0);
  }

  // Load crawled source items for image URLs
  let sourceItems: SourceItem[] = [];
  const rawDir = resolve(root, "content/raw/mock");
  try {
    const { readdir } = await import("node:fs/promises");
    const files = (await readdir(rawDir)).filter((f) => f.endsWith(".json")).sort();
    const latest = files.pop();
    if (latest) sourceItems = JSON.parse(await readFile(resolve(rawDir, latest), "utf-8"));
  } catch { /* best-effort */ }

  const imageUrlBySource = new Map<string, string>();
  const mediaBySource = new Map<string, SourceMedia[]>();
  for (const item of sourceItems) {
    if (item.imageUrl && item.id) imageUrlBySource.set(item.id, item.imageUrl);
    const media = sourceMediaFromItem(item);
    if (item.id && media.length > 0) mediaBySource.set(item.id, media);
  }

  const sourceMetaById = new Map<string, { name: string; url: string }>();
  for (const item of sourceItems) {
    if (item.id) sourceMetaById.set(item.id, { name: item.sourceName, url: item.sourceUrl });
  }

  const articles: Article[] = [];

  for (const draftSet of drafts) {
    for (const draft of [draftSet.vi, draftSet.en]) {
      if (!draft.title) continue;

      const relatedNotes = notes.filter((n: SourceNote) => draft.sourceIds?.includes(n.sourceId));

      // ── Sources ──
      let sources: Source[];
      if (Array.isArray(draft.sources) && draft.sources.length > 0) {
        // Structured output — model provided sources directly
        sources = draft.sources;
      } else {
        sources = relatedNotes.map((n: SourceNote) => ({
          title: n.title,
          publisher: n.sourceName,
          url: n.url,
          publishedAt: n.publishedAt,
        }));
        if (sources.length === 0) {
          sources.push({
            title: draft.title,
            publisher: "AI Radar",
            url: `https://ai-radar-news-pi.vercel.app/${draft.lang}/${draft.category}/${draft.title}`,
          });
        }
      }

      // ── Hero Media ──
      let heroMedia: MediaBlock | undefined;
      if (draft.heroMedia && draft.heroMedia.src) {
        // Structured output — model provided heroMedia directly
        heroMedia = draft.heroMedia;
      } else {
        let bestImage = draft.imageUrl || undefined;
        if (!bestImage && draft.sourceIds) {
          for (const sid of draft.sourceIds) {
            const img = imageUrlBySource.get(sid);
            if (img) { bestImage = img; break; }
          }
        }
        if (bestImage) {
          heroMedia = { type: "image", src: bestImage, alt: draft.title, caption: draft.subtitle };
        }
      }

      // ── Highlights (Điểm đáng chú ý) ──
      let highlights: HighlightItem[];
      if (Array.isArray(draft.highlights) && draft.highlights.length > 0) {
        // Structured output
        highlights = draft.highlights;
      } else {
        const tldr = Array.isArray(draft.tldr) ? draft.tldr : [String(draft.tldr || draft.subtitle)];
        highlights = tldr.filter(Boolean).map((text: string) => ({ text }));
      }

      // ── Sections (Main Content) ──
      let sections: ArticleSection[];
      if (Array.isArray(draft.sections) && draft.sections.length > 0) {
        // Structured output — model provided sections directly
        sections = draft.sections;
      } else if (draft.bodyMarkdown) {
        // Legacy bodyMarkdown → parse into sections
        sections = parseSections(draft.bodyMarkdown);
      } else {
        sections = [{ id: "sec_main", heading: "Main Analysis", blocks: [] }];
      }
      sections = injectVerifiedSourceMedia(sections, draft.sourceIds, mediaBySource, heroMedia, draft.category);

      // ── Insight Blocks ──
      let insightBlocks: InsightBlock[];
      if (Array.isArray(draft.insightBlocks) && draft.insightBlocks.length > 0) {
        insightBlocks = draft.insightBlocks;
      } else if (draft.whyItMatters) {
        insightBlocks = [{ title: "Vì sao đáng chú ý", text: draft.whyItMatters, variant: "analysis" as const }];
      } else {
        insightBlocks = [];
      }

      // ── Takeaway ──
      let takeaway: TakeawayBlock | undefined;
      if (draft.takeaway && (draft.takeaway.items || draft.takeaway.text)) {
        takeaway = draft.takeaway;
      } else if (draft.creatorTakeaway) {
        takeaway = { title: "Creator / Builder Takeaway", text: draft.creatorTakeaway };
      }

      // ── Assemble ──
      const genTime = draft.generation?.generatedAt || new Date().toISOString();
      const slug = `${slugify(draft.title.slice(0, 60))}-${genTime.slice(0, 10)}`;
      const wordCount = countSectionWords(sections);

      articles.push({
        id: draft.id,
        slug,
        lang: draft.lang,
        category: draft.category,
        title: draft.title,
        subtitle: draft.subtitle,
        publishedAt: genTime,
        readingTime: readingTimeFromWords(wordCount),
        sourceCount: sources.length,
        tags: Array.isArray(draft.tags) ? draft.tags : [draft.category],
        heroMedia,
        highlights,
        sections,
        insightBlocks,
        takeaway,
        sources,
        generation: {
          model: draft.generation?.model || "gemma4:31b",
          promptVersion: draft.generation?.promptVersion || "unknown",
          generatedAt: genTime,
          sourceClusterId: draft.generation?.sourceClusterId || draft.id?.replace(/_(vi|en)$/, ""),
          confidence: draft.generation?.confidence || "medium",
        },
        status: "published",
      });
    }
  }

  const tsContent = `// Auto-generated from pipeline output — do not edit manually
// Generated at: ${new Date().toISOString()}
import type { Article } from "@/lib/schema";

export const generatedArticles: Article[] = ${JSON.stringify(articles, null, 2)};
`;

  await writeFile(outPath, tsContent);
  console.log(`Synced ${articles.length} articles to apps/web/src/data/articles-generated.ts`);
}

main();
