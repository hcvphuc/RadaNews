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

// ── Media ──
export type MediaType = "image" | "diagram" | "screenshot" | "comparison" | "video" | "embed";

export type MediaBlock = {
  type: MediaType;
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  sourceUrl?: string;
};

// ── Highlights ──
export type HighlightItem = {
  text: string;
};

// ── Content Blocks (within sections) ──
export type ParagraphBlock = {
  type: "paragraph";
  text: string;
};

export type ListBlock = {
  type: "list";
  items: string[];
};

export type SectionMediaBlock = {
  type: "media";
  mediaType: MediaType;
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  sourceUrl?: string;
  placement?: "after-heading" | "after-paragraph" | "inline";
};

export type CalloutBlock = {
  type: "callout";
  variant: "note" | "technical" | "warning" | "insight" | "context";
  title?: string;
  text: string;
};

export type QuoteBlock = {
  type: "quote";
  text: string;
  attribution?: string;
};

export type CodeBlock = {
  type: "code";
  language?: string;
  code: string;
};

export type TableBlock = {
  type: "table";
  headers: string[];
  rows: string[][];
};

export type ContentBlock =
  | ParagraphBlock
  | ListBlock
  | SectionMediaBlock
  | CalloutBlock
  | QuoteBlock
  | CodeBlock
  | TableBlock;

// ── Section ──
export type ArticleSection = {
  id: string;
  heading: string;
  subheading?: string;
  blocks: ContentBlock[];
};

// ── Insight Block ──
export type InsightBlock = {
  title: string;
  text: string;
  variant?: "analysis" | "impact" | "risk" | "opportunity" | "context";
};

// ── Takeaway ──
export type TakeawayBlock = {
  title?: string;
  text?: string;
  items?: string[];
};

// ── Source (supports both old + new format) ──
export type Source = {
  title: string;
  url: string;
  // New format
  publisher?: string;
  publishedAt?: string;
  // Old format (mock data + sync-articles)
  sourceName?: string;
  sourceType?: string;
  usedFor?: string;
};

// ── Article (supports both old flat + new structured format) ──
// Old format: { tldr, bodyMarkdown, whyItMatters, creatorTakeaway, subtitle, imageUrl }
// New format: { highlights, sections, insightBlocks, takeaway, heroMedia }
export type Article = {
  id: string;
  slug: string;
  lang: Lang;
  status: ArticleStatus;
  category: Category;
  title: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  sources: Source[];
  generation: {
    model: string;
    promptVersion: string;
    generatedAt: string;
    sourceClusterId: string;
    confidence: Confidence;
  };

  // Old flat fields (still used by mock data + search)
  subtitle?: string;
  imageUrl?: string;
  tldr?: string[];
  bodyMarkdown?: string;
  whyItMatters?: string;
  creatorTakeaway?: string;

  // New structured fields
  heroMedia?: MediaBlock;
  highlights?: HighlightItem[];
  sections?: ArticleSection[];
  insightBlocks?: InsightBlock[];
  takeaway?: TakeawayBlock;
  sourceCount?: number;
  author?: string;
};

// ── Pipeline types (unchanged) ──
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
  imageUrl?: string;
  videoUrl?: string;
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
