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
      system: "You are AI Radar's English editor. Write concise, source-grounded editorial analysis. Never invent sources.",
      prompt: JSON.stringify({
        task: "Write an English article draft as JSON with title, subtitle, tldr array, bodyMarkdown, whyItMatters, creatorTakeaway, tags array.",
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
