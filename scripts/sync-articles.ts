import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { GeneratedArticleDraft, SourceItem, SourceNote } from "../pipeline/types/schema.ts";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));

// ── New Article schema (matching apps/web/src/lib/schema.ts) ──
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
  text?: string;
  items?: string[];
}

interface Source {
  title: string;
  publisher?: string;
  url: string;
  publishedAt?: string;
}

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

// ── Helpers ──
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function readingTime(body: string): number {
  const words = body.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function stripMarkdownHeaders(text: string): string {
  return text.replace(/^#{1,4}\s+/gm, "").replace(/\*\*/g, "").replace(/\*/g, "");
}

/** Parse bodyMarkdown into sections based on ### headers */
function parseSections(bodyMd: string): ArticleSection[] {
  const sections: ArticleSection[] = [];
  const lines = bodyMd.split("\n");
  let currentSection: ArticleSection | null = null;
  let currentParagraphs: string[] = [];

  function flushParagraphs() {
    if (currentParagraphs.length === 0) return;
    const text = currentParagraphs.join("\n").trim();
    if (text) {
      const blocks: ContentBlock[] = [];

      // Check if this is a list
      const listItems = text
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.startsWith("*   ") || l.startsWith("- ") || l.startsWith("* "));
      if (listItems.length >= 2 && listItems.length === text.split("\n").filter((l) => l.trim()).length) {
        blocks.push({
          type: "list",
          items: listItems.map((l) => stripMarkdownHeaders(l.replace(/^[\*\-\s]+/, ""))),
        });
      } else {
        blocks.push({
          type: "paragraph",
          text: stripMarkdownHeaders(text),
        });
      }

      if (currentSection) {
        currentSection.blocks.push(...blocks);
      }
    }
    currentParagraphs = [];
  }

  for (const line of lines) {
    const h3Match = line.match(/^### (.+)/);
    if (h3Match) {
      flushParagraphs();
      if (currentSection && currentSection.blocks.length > 0) {
        sections.push(currentSection);
      }
      currentSection = {
        id: "sec_" + slugify(h3Match[1]),
        heading: stripMarkdownHeaders(h3Match[1]),
        blocks: [],
      };
    } else if (!line.trim()) {
      flushParagraphs();
    } else {
      currentParagraphs.push(line);
    }
  }

  flushParagraphs();
  if (currentSection && currentSection.blocks.length > 0) {
    sections.push(currentSection);
  }

  // If no sections found, create a single section with all content
  if (sections.length === 0 && bodyMd.trim()) {
    sections.push({
      id: "sec_main",
      heading: "Main Analysis",
      blocks: [{ type: "paragraph", text: stripMarkdownHeaders(bodyMd.trim()) }],
    });
  }

  return sections;
}

// ── Main ──
async function main() {
  const draftsPath = resolve(root, "content/exports/generation-drafts.mock.json");
  const notesPath = resolve(root, "content/notes/source-notes.mock.json");
  const outPath = resolve(root, "apps/web/src/data/articles-generated.ts");

  let drafts: { vi: GeneratedArticleDraft; en: GeneratedArticleDraft }[];
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
    if (latest) {
      sourceItems = JSON.parse(await readFile(resolve(rawDir, latest), "utf-8"));
    }
  } catch { /* best-effort */ }

  const imageUrlBySource = new Map<string, string>();
  for (const item of sourceItems) {
    if (item.imageUrl && item.id) imageUrlBySource.set(item.id, item.imageUrl);
  }

  // Also build source name/url map for inline media credits
  const sourceMetaById = new Map<string, { name: string; url: string }>();
  for (const item of sourceItems) {
    if (item.id) sourceMetaById.set(item.id, { name: item.sourceName, url: item.sourceUrl });
  }

  const articles: Article[] = [];

  for (const draftSet of drafts) {
    for (const draft of [draftSet.vi, draftSet.en]) {
      if (!draft.title || draft.generation.mode === "template-fallback") continue;

      const relatedNotes = notes.filter((n) => draft.sourceIds.includes(n.sourceId));

      // ── Sources (new format) ──
      const sources: Source[] = relatedNotes.map((n) => ({
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

      // ── Hero Media ──
      let bestImage = draft.imageUrl || undefined;
      if (!bestImage && draft.sourceIds) {
        for (const sid of draft.sourceIds) {
          const img = imageUrlBySource.get(sid);
          if (img) { bestImage = img; break; }
        }
      }

      let heroMedia: MediaBlock | undefined;
      if (bestImage) {
        heroMedia = {
          type: "image",
          src: bestImage,
          alt: draft.title,
          caption: draft.subtitle,
        };
      }

      // ── Highlights (from TL;DR) ──
      const tldr = Array.isArray(draft.tldr) ? draft.tldr : [String(draft.tldr || draft.subtitle)];
      const highlights: HighlightItem[] = tldr
        .filter(Boolean)
        .map((text) => ({ text }));

      // ── Sections (from bodyMarkdown) ──
      const sections = parseSections(draft.bodyMarkdown);

      // Collect inline media from source items (not hero) and inject into sections
      const inlineImages: { src: string; sourceName: string; sourceUrl: string }[] = [];
      if (draft.sourceIds) {
        for (const sid of draft.sourceIds) {
          const img = imageUrlBySource.get(sid);
          if (img && img !== bestImage) {
            const meta = sourceMetaById.get(sid);
            inlineImages.push({
              src: img,
              sourceName: meta?.name || "Source",
              sourceUrl: meta?.url || "#",
            });
          }
        }
      }

      // Distribute inline images across sections (one per section where applicable)
      for (let i = 0; i < Math.min(inlineImages.length, sections.length); i++) {
        sections[i].blocks.push({
          type: "media",
          mediaType: "image",
          src: inlineImages[i].src,
          alt: sections[i].heading,
          caption: "Hình minh họa",
          credit: inlineImages[i].sourceName,
          sourceUrl: inlineImages[i].sourceUrl,
          placement: "after-paragraph",
        });
      }

      // ── Insight Blocks ──
      const insightBlocks: InsightBlock[] = [];
      if (draft.whyItMatters) {
        insightBlocks.push({
          title: "Vì sao đáng chú ý",
          text: draft.whyItMatters,
          variant: "analysis",
        });
      }

      // ── Takeaway ──
      let takeaway: TakeawayBlock | undefined;
      if (draft.creatorTakeaway) {
        takeaway = {
          title: "Creator / Builder Takeaway",
          text: draft.creatorTakeaway,
        };
      }

      // ── Assemble ──
      const genTime = draft.generation.generatedAt || new Date().toISOString();
      const slug = `${slugify(draft.title.slice(0, 60))}-${genTime.slice(0, 10)}`;

      articles.push({
        id: draft.id,
        slug,
        lang: draft.lang,
        category: draft.category,
        title: draft.title,
        subtitle: draft.subtitle,
        publishedAt: genTime,
        readingTime: readingTime(draft.bodyMarkdown),
        sourceCount: sources.length,
        tags: Array.isArray(draft.tags) ? draft.tags : [draft.category],
        heroMedia,
        highlights,
        sections,
        insightBlocks,
        takeaway,
        sources,
        generation: {
          model: draft.generation.model,
          promptVersion: draft.generation.promptVersion,
          generatedAt: genTime,
          sourceClusterId: draft.generation.sourceClusterId,
          confidence: draft.generation.confidence,
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
