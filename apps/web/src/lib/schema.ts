export type Lang = "vi" | "en";

export type Category =
  | "ai-agentic"
  | "ai-image"
  | "ai-video"
  | "ai-vibe-coding"
  | "prompt-image"
  | "prompt-video";

export type SourceType = "reddit" | "youtube" | "blog" | "x" | "other";

export type SourceUse = "primary" | "context" | "discussion";

export type ArticleStatus = "published" | "draft" | "failed";

export type Confidence = "high" | "medium" | "low";

export type Article = {
  id: string;
  slug: string;
  lang: Lang;
  category: Category;
  title: string;
  subtitle: string;
  tldr: string[];
  bodyMarkdown: string;
  whyItMatters: string;
  creatorTakeaway: string;
  tags: string[];
  readingTime: number;
  publishedAt: string;
  imageUrl?: string;
  sources: {
    title: string;
    sourceName: string;
    url: string;
    sourceType: SourceType;
    usedFor: SourceUse;
  }[];
  generation: {
    model: string;
    promptVersion: string;
    generatedAt: string;
    sourceClusterId: string;
    confidence: Confidence;
  };
  status: ArticleStatus;
};

export type SourceItem = {
  id: string;
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

export type ArticleChunk = {
  chunkId: string;
  articleId: string;
  lang: Lang;
  category: Category;
  title: string;
  section: "tldr" | "body" | "whyItMatters" | "creatorTakeaway" | "sources";
  text: string;
  tags: string[];
  sourceUrls: string[];
  canonicalUrl: string;
  publishedAt: string;
};
