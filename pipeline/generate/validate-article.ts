import type { GeneratedArticleDraft } from "../types/schema.ts";

export function validateArticle(article: Partial<GeneratedArticleDraft>) {
  const errors: string[] = [];
  if (!article.title) errors.push("Missing title");
  if (!article.subtitle) errors.push("Missing subtitle");
  if (!article.bodyMarkdown || article.bodyMarkdown.length < 120) errors.push("Body is too thin");
  if (!article.tldr || article.tldr.length === 0) errors.push("Missing TL;DR");
  if (!article.sourceIds || article.sourceIds.length === 0) errors.push("Missing source ids");
  if (!article.generation?.sourceClusterId) errors.push("Missing generation cluster id");
  if (article.status === "failed") errors.push("Article already marked failed");
  return {
    ok: errors.length === 0,
    errors
  };
}
