export type Lang = "vi" | "en";
export type Category = "ai-agentic" | "ai-image" | "ai-video" | "ai-vibe-coding" | "prompt-image" | "prompt-video";
export type SourceType = "reddit" | "youtube" | "blog" | "x" | "other";
export type Confidence = "high" | "medium" | "low";

export type SourceItem = {
  id: string;
  sourceConfigId: string;
  sourceType: SourceType;
  sourceName: string;
  sourceUrl: string;
  title: string;
  rawSummary: string;
  publishedAt: string;
  crawledAt: string;
  categoryHints: Category[];
  extractedText?: string;
  transcript?: string;
  author?: string;
  score?: number;
  crawlStatus?: "live" | "fallback";
  crawlError?: string;
  imageUrl?: string;
};

export type SourceNote = {
  sourceId: string;
  sourceType: SourceType;
  sourceName: string;
  url: string;
  title: string;
  publishedAt: string;
  categoryHints: Category[];
  keyFacts: string[];
  claims: {
    text: string;
    confidence: Confidence;
    evidence: string;
  }[];
  usableFor: ("article" | "trend" | "prompt-workflow")[];
  copyrightRisk: Confidence;
};

export type TopicCluster = {
  clusterId: string;
  category: Category;
  topic: string;
  sourceIds: string[];
  articleWorthinessScore: number;
  reasonSelected: string;
  confidence: Confidence;
  selectedForGeneration: boolean;
};

export type GeneratedArticleDraft = {
  id: string;
  lang: Lang;
  category: Category;
  title: string;
  subtitle: string;
  // Legacy fields (kept for backward compat)
  tldr: string[];
  bodyMarkdown: string;
  whyItMatters: string;
  creatorTakeaway: string;
  // New structured fields
  heroMedia?: {
    type: string;
    src: string;
    alt: string;
    caption?: string;
    credit?: string;
    sourceUrl?: string;
  };
  highlights?: { text: string }[];
  sections?: {
    id: string;
    heading: string;
    subheading?: string;
    blocks: Record<string, unknown>[];
  }[];
  insightBlocks?: {
    title: string;
    text: string;
    variant?: string;
  }[];
  takeaway?: {
    title?: string;
    text?: string | string[];
    items?: string[];
  };
  sources?: {
    title: string;
    publisher?: string;
    url: string;
    publishedAt?: string;
  }[];
  tags: string[];
  sourceIds: string[];
  sourceUrls: string[];
  imageUrl?: string;
  generation: {
    model: string;
    promptVersion: string;
    generatedAt: string;
    sourceClusterId: string;
    confidence: Confidence;
    mode: "ollama" | "template-fallback";
  };
  status: "draft" | "failed";
};
