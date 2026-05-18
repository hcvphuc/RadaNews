import type { Category, SourceItem } from "../types/schema.ts";

const categoryKeywords: Record<Category, string[]> = {
  "ai-agentic": ["agent", "agents", "agentic", "workflow", "automation", "tool use", "multi-agent", "langgraph"],
  "ai-image": ["image", "diffusion", "flux", "midjourney", "comfyui", "reference image", "style transfer"],
  "ai-video": ["video", "runway", "sora", "veo", "pika", "luma", "kling", "shot", "continuity"],
  "ai-vibe-coding": ["coding", "cursor", "claude code", "codex", "developer", "ide", "repo", "pull request"],
  "prompt-image": ["image prompt", "prompt image", "negative prompt", "composition", "style lock"],
  "prompt-video": ["video prompt", "prompt video", "shot list", "camera move", "trailer", "storyboard"]
};

export function categorize(item: SourceItem): Category {
  const text = `${item.title} ${item.rawSummary} ${item.extractedText ?? ""}`.toLowerCase();
  const scored = (Object.entries(categoryKeywords) as [Category, string[]][])
    .map(([category, keywords]) => ({
      category,
      score: keywords.reduce((sum, keyword) => sum + (text.includes(keyword) ? 1 : 0), 0)
    }))
    .sort((a, b) => b.score - a.score);

  const best = scored[0];
  if (best && best.score > 0) return best.category;

  return item.categoryHints[0] ?? "ai-agentic";
}
