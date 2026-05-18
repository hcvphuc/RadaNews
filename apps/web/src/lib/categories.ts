import type { Category, Lang } from "./schema";

export const languages: Lang[] = ["vi", "en"];

export const categories: {
  id: Category;
  label: string;
  shortLabel: string;
  description: string;
}[] = [
  {
    id: "ai-agentic",
    label: "AI Agentic",
    shortLabel: "Agentic",
    description: "Agent workflows, tool use, browser agents, MCP, automation, and RAG systems."
  },
  {
    id: "ai-image",
    label: "AI Image",
    shortLabel: "Image",
    description: "Image models, ComfyUI, style consistency, LoRA, editing, and production workflows."
  },
  {
    id: "ai-video",
    label: "AI Video",
    shortLabel: "Video",
    description: "Video AI, camera control, continuity, image-to-video, and production-ready motion."
  },
  {
    id: "ai-vibe-coding",
    label: "AI Vibe Coding",
    shortLabel: "Vibe Coding",
    description: "Cursor, Codex, Claude Code, Copilot, Replit Agent, and product-building workflows."
  },
  {
    id: "prompt-image",
    label: "Prompt Image",
    shortLabel: "Prompt Image",
    description: "Prompt systems for image composition, lighting, references, style lock, and consistency."
  },
  {
    id: "prompt-video",
    label: "Prompt Video",
    shortLabel: "Prompt Video",
    description: "Shot design, motion language, camera moves, scene continuity, and video prompt workflows."
  }
];

export const categoryById = Object.fromEntries(categories.map((category) => [category.id, category])) as Record<
  Category,
  (typeof categories)[number]
>;

export function localizeCategory(category: Category, lang: Lang) {
  const base = categoryById[category];
  if (lang === "en") return base.label;
  const vi: Record<Category, string> = {
    "ai-agentic": "AI Agentic",
    "ai-image": "AI Image",
    "ai-video": "AI Video",
    "ai-vibe-coding": "AI Vibe Coding",
    "prompt-image": "Prompt Image",
    "prompt-video": "Prompt Video"
  };
  return vi[category];
}

export function categoryPath(category: Category, lang: Lang) {
  return `/${lang}/${category}`;
}
