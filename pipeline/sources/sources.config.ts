import type { Category, SourceType } from "../types/schema.ts";

export type SourceConfig = {
  id: string;
  name: string;
  url: string;
  sourceType: SourceType;
  categories: Category[];
  weight: number;
  enabled: boolean;
};

export const sourceRegistry: SourceConfig[] = [
  {
    id: "langchain-blog",
    name: "LangChain Blog",
    url: "https://blog.langchain.dev/rss/",
    sourceType: "blog",
    categories: ["ai-agentic"],
    weight: 0.9,
    enabled: true
  },
  {
    id: "anthropic-news",
    name: "Anthropic News",
    url: "https://www.anthropic.com/news",
    sourceType: "blog",
    categories: ["ai-agentic", "ai-vibe-coding"],
    weight: 0.9,
    enabled: true
  },
  {
    id: "runway-research",
    name: "Runway Research",
    url: "https://runwayml.com/research",
    sourceType: "blog",
    categories: ["ai-video"],
    weight: 0.9,
    enabled: true
  },
  {
    id: "cursor-changelog",
    name: "Cursor Changelog",
    url: "https://www.cursor.com/changelog",
    sourceType: "blog",
    categories: ["ai-vibe-coding"],
    weight: 0.85,
    enabled: true
  },
  {
    id: "reddit-stablediffusion",
    name: "r/StableDiffusion",
    url: "https://www.reddit.com/r/StableDiffusion/.rss",
    sourceType: "reddit",
    categories: ["ai-image", "prompt-image"],
    weight: 0.65,
    enabled: true
  },
  {
    id: "reddit-aivideo",
    name: "r/aivideo",
    url: "https://www.reddit.com/r/aivideo/.rss",
    sourceType: "reddit",
    categories: ["ai-video", "prompt-video"],
    weight: 0.65,
    enabled: true
  }
];
