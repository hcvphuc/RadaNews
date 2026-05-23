import type { GeneratedArticleDraft, SourceNote, TopicCluster } from "../types/schema.ts";
import { generateWithOllama, ollamaModel } from "./ollama.ts";
import { sanitizeGeneratedMedia } from "./media-sanitize.ts";

const STRUCTURED_PROMPT_EN = `You are AI Radar's English editor. Write an in-depth 800-1200 word analysis for creators and developers.

CRITICAL — OUTPUT MUST BE JSON WITH THIS EXACT STRUCTURE. DO NOT OUTPUT bodyMarkdown:
{
  "heroMedia": { "type": "image", "src": "representative image URL (use first source image if available)", "alt": "image description", "caption": "brief caption", "credit": "source name" },
  "highlights": [
    { "text": "key point 1 — 1-2 lines, easy to scan" },
    { "text": "key point 2" },
    { "text": "key point 3" },
    { "text": "key point 4 (optional)" }
  ],
  "sections": [
    {
      "heading": "Context",
      "blocks": [
        { "type": "paragraph", "text": "Section content... (150-200 words, cite specific sources)" },
        { "type": "media", "mediaType": "image", "src": "...", "alt": "...", "caption": "...", "credit": "...", "sourceUrl": "...", "placement": "after-paragraph" }
      ]
    },
    { "heading": "Deep Analysis", "blocks": [{ "type": "paragraph", "text": "..." }] },
    { "heading": "Critical Perspective", "blocks": [{ "type": "paragraph", "text": "..." }] },
    { "heading": "Opportunities for Creators / Builders", "blocks": [{ "type": "paragraph", "text": "..." }] },
    { "heading": "Conclusion", "blocks": [{ "type": "paragraph", "text": "..." }] }
  ],
  "insightBlocks": [
    { "title": "Why This Matters", "text": "Explain why this signal is important...", "variant": "analysis" },
    { "title": "Impact", "text": "...", "variant": "impact" }
  ],
  "takeaway": {
    "title": "Creator / Builder Takeaway",
    "items": ["Specific action 1", "Specific action 2", "Specific action 3"]
  },
  "sources": [
    { "title": "Source article title", "publisher": "Source name", "url": "https://...", "publishedAt": "2026-05-20" }
  ],
  "tags": ["tag1", "tag2", "tag3"]
}

RULES:
- "highlights" is "Key Highlights" (NOT "TL;DR"), 3-5 items, 1-2 lines each
- "sections" is the main body, each section has heading + blocks (paragraph/list/callout)
- Images go INSIDE sections (blocks[].media), never grouped at the bottom
- heroMedia is one representative image for the whole article, placed after title, before highlights
- insightBlocks are analysis blocks near the end
- takeaway lists specific actionable items for creators/builders
- sources is reference list only (title + publisher + url), no images here
- Use data from sourceNotes, never invent sources
- Tone: professional, sharp, opinionated`;

export async function writeArticleEn(cluster: TopicCluster, notes: SourceNote[] = []): Promise<GeneratedArticleDraft> {
  const generated = await tryGenerate(cluster, notes);
  if (generated) return generated;
  return templateDraft(cluster, notes);
}

async function tryGenerate(cluster: TopicCluster, notes: SourceNote[]): Promise<GeneratedArticleDraft | undefined> {
  try {
    const text = await generateWithOllama({
      system: STRUCTURED_PROMPT_EN,
      prompt: JSON.stringify({
        task: "Output JSON matching the article schema (heroMedia, highlights, sections, insightBlocks, takeaway, sources, tags). Write 800-1200 words. DO NOT output bodyMarkdown.",
        cluster,
        sourceNotes: notes
      })
    });
    if (!text) return undefined;

    const parsed = sanitizeGeneratedMedia(parseJson(text), notes);
    return {
      ...templateDraft(cluster, notes),
      ...parsed,
      lang: "en",
      category: cluster.category,
      sourceIds: cluster.sourceIds,
      sourceUrls: notes.map((note) => note.url),
      generation: {
        model: ollamaModel(),
        promptVersion: "article-en-v2",
        generatedAt: new Date().toISOString(),
        sourceClusterId: cluster.clusterId,
        confidence: cluster.confidence,
        mode: "ollama"
      },
      status: "draft"
    };
  } catch (err) {
    console.error("[ollama] generate failed:", err instanceof Error ? err.message : String(err));
    return undefined;
  }
}

function templateDraft(cluster: TopicCluster, notes: SourceNote[]): GeneratedArticleDraft {
  const facts = notes.flatMap((note) => note.keyFacts).slice(0, 3);
  const sourceNames = [...new Set(notes.map((note) => note.sourceName))].join(", ") || "source registry";
  const firstSrc = notes[0];

  return {
    id: `${cluster.clusterId}_en`,
    lang: "en",
    category: cluster.category,
    title: `${cluster.topic}: creator and builder analysis`,
    subtitle: `Signal synthesized from ${sourceNames}, scored by recency, content depth, and source reliability.`,
    heroMedia: undefined as any,
    highlights: facts.slice(0, 4).map((f) => ({ text: f })),
    sections: [{
      id: "main",
      heading: "Analysis",
      blocks: [{ type: "paragraph" as const, text: facts.map((f) => `• ${f}`).join("\n\n") || cluster.reasonSelected }]
    }],
    insightBlocks: [{
      title: "Why This Matters",
      text: "This signal may directly impact production workflows, coding practices, or prompt engineering this week.",
      variant: "analysis" as const
    }],
    takeaway: {
      title: "Creator / Builder Takeaway",
      items: ["Verify the source trail from listed sources", "Test in one small workflow before scaling", "Monitor developments over the next 1-2 weeks"]
    },
    tags: [cluster.category, "ai-radar", "daily-signal"],
    sourceIds: cluster.sourceIds,
    sourceUrls: notes.map((note) => note.url),
    generation: {
      model: ollamaModel(),
      promptVersion: "article-en-v2",
      generatedAt: new Date().toISOString(),
      sourceClusterId: cluster.clusterId,
      confidence: cluster.confidence,
      mode: "template-fallback"
    },
    status: "draft"
  };
}

function parseJson(text: string) {
  const jsonText = text.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  return JSON.parse(jsonText) as Partial<GeneratedArticleDraft>;
}
