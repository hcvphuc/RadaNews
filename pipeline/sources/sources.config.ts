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
  // ── AI Agentic ──
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
    id: "anthropic-research",
    name: "Anthropic Research",
    url: "https://www.anthropic.com/research",
    sourceType: "blog",
    categories: ["ai-agentic", "ai-vibe-coding"],
    weight: 0.92,
    enabled: true
  },
  {
    id: "openai-blog",
    name: "OpenAI Blog",
    url: "https://openai.com/blog",
    sourceType: "blog",
    categories: ["ai-agentic", "ai-vibe-coding"],
    weight: 0.9,
    enabled: true
  },
  {
    id: "mcp-blog",
    name: "MCP Blog",
    url: "https://modelcontextprotocol.io/blog",
    sourceType: "blog",
    categories: ["ai-agentic", "ai-vibe-coding"],
    weight: 0.85,
    enabled: true
  },
  {
    id: "reddit-aiagents",
    name: "r/AI_Agents",
    url: "https://www.reddit.com/r/AI_Agents/.rss",
    sourceType: "reddit",
    categories: ["ai-agentic"],
    weight: 0.6,
    enabled: true
  },

  // ── AI Image ──
  {
    id: "stability-ai-blog",
    name: "Stability AI Blog",
    url: "https://stability.ai/news/rss",
    sourceType: "blog",
    categories: ["ai-image"],
    weight: 0.88,
    enabled: true
  },
  {
    id: "black-forest-labs",
    name: "Black Forest Labs",
    url: "https://blackforestlabs.ai/blog/",
    sourceType: "blog",
    categories: ["ai-image"],
    weight: 0.9,
    enabled: true
  },
  {
    id: "replicate-blog",
    name: "Replicate Blog",
    url: "https://replicate.com/blog",
    sourceType: "blog",
    categories: ["ai-image", "ai-video", "ai-vibe-coding"],
    weight: 0.78,
    enabled: true
  },
  {
    id: "reddit-stablediffusion",
    name: "r/StableDiffusion",
    url: "https://www.reddit.com/r/StableDiffusion/.rss",
    sourceType: "reddit",
    categories: ["ai-image", "prompt-image"],
    weight: 0.62,
    enabled: true
  },
  {
    id: "reddit-comfyui",
    name: "r/comfyui",
    url: "https://www.reddit.com/r/comfyui/.rss",
    sourceType: "reddit",
    categories: ["ai-image", "prompt-image"],
    weight: 0.6,
    enabled: true
  },

  // ── AI Video ──
  {
    id: "runway-research",
    name: "Runway Research",
    url: "https://runwayml.com/research",
    sourceType: "blog",
    categories: ["ai-video"],
    weight: 0.92,
    enabled: true
  },
  {
    id: "pika-blog",
    name: "Pika Labs Blog",
    url: "https://pika.art/blog",
    sourceType: "blog",
    categories: ["ai-video"],
    weight: 0.82,
    enabled: true
  },
  {
    id: "luma-blog",
    name: "Luma Labs Blog",
    url: "https://lumalabs.ai/blog",
    sourceType: "blog",
    categories: ["ai-video"],
    weight: 0.8,
    enabled: true
  },
  {
    id: "reddit-aivideo",
    name: "r/aivideo",
    url: "https://www.reddit.com/r/aivideo/.rss",
    sourceType: "reddit",
    categories: ["ai-video", "prompt-video"],
    weight: 0.6,
    enabled: true
  },

  // ── AI Vibe Coding ──
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
    id: "github-copilot-blog",
    name: "GitHub Copilot Blog",
    url: "https://github.blog/tag/github-copilot/",
    sourceType: "blog",
    categories: ["ai-vibe-coding"],
    weight: 0.82,
    enabled: true
  },
  {
    id: "vercel-ai-blog",
    name: "Vercel AI Blog",
    url: "https://vercel.com/blog/ai",
    sourceType: "blog",
    categories: ["ai-vibe-coding", "ai-agentic"],
    weight: 0.78,
    enabled: true
  },
  {
    id: "replit-blog",
    name: "Replit Blog",
    url: "https://blog.replit.com/",
    sourceType: "blog",
    categories: ["ai-vibe-coding"],
    weight: 0.72,
    enabled: true
  },

  // ── Prompt Image ──
  {
    id: "comfyui-blog",
    name: "ComfyUI Blog",
    url: "https://blog.comfy.org/",
    sourceType: "blog",
    categories: ["prompt-image", "ai-image"],
    weight: 0.82,
    enabled: true
  },
  {
    id: "reddit-midjourney",
    name: "r/midjourney",
    url: "https://www.reddit.com/r/midjourney/.rss",
    sourceType: "reddit",
    categories: ["prompt-image", "ai-image"],
    weight: 0.58,
    enabled: true
  },

  // ── Prompt Video ──
  {
    id: "kling-blog",
    name: "Kling AI Blog",
    url: "https://klingai.com/blog",
    sourceType: "blog",
    categories: ["prompt-video", "ai-video"],
    weight: 0.8,
    enabled: true
  },
  {
    id: "reddit-mediasynthesis",
    name: "r/MediaSynthesis",
    url: "https://www.reddit.com/r/MediaSynthesis/.rss",
    sourceType: "reddit",
    categories: ["prompt-video", "ai-video"],
    weight: 0.55,
    enabled: true
  },

  // ── General AI / Cross-category ──
  {
    id: "huggingface-blog",
    name: "Hugging Face Blog",
    url: "https://huggingface.co/blog",
    sourceType: "blog",
    categories: ["ai-agentic", "ai-image", "ai-video", "ai-vibe-coding"],
    weight: 0.85,
    enabled: true
  },
  {
    id: "simonwillison-blog",
    name: "Simon Willison's Weblog",
    url: "https://simonwillison.net/atom/everything/",
    sourceType: "blog",
    categories: ["ai-agentic", "ai-vibe-coding"],
    weight: 0.82,
    enabled: true
  },
  {
    id: "lilianweng-blog",
    name: "Lil'Log",
    url: "https://lilianweng.github.io/",
    sourceType: "blog",
    categories: ["ai-agentic"],
    weight: 0.85,
    enabled: true
  }
];
