import type { GeneratedArticleDraft, SourceNote, TopicCluster } from "../types/schema.ts";
import { generateWithOllama, ollamaModel } from "./ollama.ts";

export async function writeArticleEn(cluster: TopicCluster, notes: SourceNote[] = []): Promise<GeneratedArticleDraft> {
  const generated = await tryGenerate(cluster, notes);
  if (generated) return generated;

  return templateDraft(cluster, notes);
}

async function tryGenerate(cluster: TopicCluster, notes: SourceNote[]): Promise<GeneratedArticleDraft | undefined> {
  try {
    const text = await generateWithOllama({
      system: `You are AI Radar's English editor — writing in-depth analysis for creators and developers.
RULES:
- Write 800-1200 words, deep analysis, no fluff.
- Use data from sourceNotes, never invent sources.
- Tone: professional, sharp, with clear opinions.
- Structure: attention-grabbing lede → detailed multi-angle analysis → critical counterpoints → actionable conclusion for creators/builders.
- Each section minimum 150-200 words.`,

      prompt: JSON.stringify({
        task: `Write an in-depth English analysis article (800-1200 words) as JSON with these fields:
- title: compelling headline with a unique angle (not generic)
- subtitle: 1-2 sentence summary of the core insight
- tldr: array of 3-5 bullet points summarizing key takeaways
- bodyMarkdown: full markdown with ## sections: Context, Deep Analysis, Critical Perspective, Opportunities for Creators/Builders, Conclusion. Each section minimum 150 words, citing specific evidence from sources.
- whyItMatters: 3-5 sentences explaining why this signal matters for creators/developers
- creatorTakeaway: 2-4 specific actions creators/builders should take now
- tags: array of 3-5 relevant tags`,
        cluster,
        sourceNotes: notes
      })
    });
    if (!text) return undefined;

    const parsed = parseJson(text);
    return {
      ...templateDraft(cluster, notes),
      ...parsed,
      lang: "en",
      category: cluster.category,
      sourceIds: cluster.sourceIds,
      sourceUrls: notes.map((note) => note.url),
      generation: {
        model: ollamaModel(),
        promptVersion: "article-en-v1",
        generatedAt: new Date().toISOString(),
        sourceClusterId: cluster.clusterId,
        confidence: cluster.confidence,
        mode: "ollama"
      },
      status: "draft"
    };
  } catch {
    return undefined;
  }
}

function templateDraft(cluster: TopicCluster, notes: SourceNote[]): GeneratedArticleDraft {
  const facts = notes.flatMap((note) => note.keyFacts).slice(0, 3);
  const sourceNames = [...new Set(notes.map((note) => note.sourceName))].join(", ") || "source registry";

  return {
    id: `${cluster.clusterId}_en`,
    lang: "en",
    category: cluster.category,
    title: `${cluster.topic}: creator and builder analysis`,
    subtitle: `Signal synthesized from ${sourceNames}, scored by recency, content depth, and source reliability.`,
    tldr: facts.length > 0 ? facts : [cluster.reasonSelected],
    bodyMarkdown: [
      "## Main signal",
      `This cluster currently scores ${cluster.articleWorthinessScore.toFixed(2)} with ${cluster.confidence} confidence.`,
      "## Analysis",
      facts.map((fact) => `- ${fact}`).join("\n") || `- ${cluster.reasonSelected}`,
      "## Sources to verify",
      notes.map((note) => `- ${note.sourceName}: ${note.title}`).join("\n")
    ].join("\n\n"),
    whyItMatters: "The signal matters because it may change production, coding, or prompt workflows this week.",
    creatorTakeaway: "Creators and builders should verify the source trail, test the idea in one small workflow, then scale only after stable results.",
    tags: [cluster.category, "ai-radar", "daily-signal"],
    sourceIds: cluster.sourceIds,
    sourceUrls: notes.map((note) => note.url),
    generation: {
      model: ollamaModel(),
      promptVersion: "article-en-v1",
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
