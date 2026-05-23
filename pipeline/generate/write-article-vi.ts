import type { GeneratedArticleDraft, SourceNote, TopicCluster } from "../types/schema.ts";
import { generateWithOllama, ollamaModel } from "./ollama.ts";
import { sanitizeGeneratedMedia } from "./media-sanitize.ts";

const STRUCTURED_PROMPT_VI = `Bạn là biên tập viên tiếng Việt của AI Radar. Viết bài phân tích chuyên sâu 800-1200 từ cho creator/developer.

QUAN TRỌNG — OUTPUT PHẢI LÀ JSON CÓ CẤU TRÚC SAU, KHÔNG ĐƯỢC VIẾT bodyMarkdown THÔ:
{
  "heroMedia": { "type": "image", "src": "URL ảnh đại diện (dùng ảnh từ source đầu tiên nếu có)", "alt": "mô tả ảnh", "caption": "chú thích ngắn", "credit": "tên nguồn" },
  "highlights": [
    { "text": "ý chính 1 — 1-2 dòng, dễ scan" },
    { "text": "ý chính 2" },
    { "text": "ý chính 3" },
    { "text": "ý chính 4 (tùy chọn)" }
  ],
  "sections": [
    {
      "heading": "Bối cảnh",
      "blocks": [
        { "type": "paragraph", "text": "Nội dung section... (150-200 từ, dẫn chứng từ nguồn)" },
        { "type": "media", "mediaType": "image", "src": "...", "alt": "...", "caption": "...", "credit": "...", "sourceUrl": "...", "placement": "after-paragraph" }
      ]
    },
    { "heading": "Phân tích chi tiết", "blocks": [{ "type": "paragraph", "text": "..." }] },
    { "heading": "Góc nhìn phản biện", "blocks": [{ "type": "paragraph", "text": "..." }] },
    { "heading": "Cơ hội cho Creator / Builder", "blocks": [{ "type": "paragraph", "text": "..." }] },
    { "heading": "Kết luận", "blocks": [{ "type": "paragraph", "text": "..." }] }
  ],
  "insightBlocks": [
    { "title": "Vì sao đáng chú ý", "text": "Giải thích tại sao tín hiệu này quan trọng...", "variant": "analysis" },
    { "title": "Tác động", "text": "...", "variant": "impact" }
  ],
  "takeaway": {
    "title": "Creator / Builder Takeaway",
    "items": ["Hành động cụ thể 1", "Hành động cụ thể 2", "Hành động cụ thể 3"]
  },
  "sources": [
    { "title": "Tiêu đề bài nguồn", "publisher": "Tên nguồn", "url": "https://...", "publishedAt": "2026-05-20" }
  ],
  "tags": ["tag1", "tag2", "tag3"]
}

QUY TẮC:
- "highlights" là "Điểm đáng chú ý" (KHÔNG gọi là TL;DR), 3-5 ý, mỗi ý 1-2 dòng
- "sections" là thân bài chính, mỗi section có heading + blocks (paragraph/list/callout)
- Ảnh minh họa đặt TRONG section (blocks[].media), không gom cuối bài
- heroMedia là 1 ảnh đại diện toàn bài, đặt sau title, trước highlights
- insightBlocks là phân tích cuối bài
- takeaway là hành động cụ thể cho creator/builder
- sources là danh sách nguồn tham khảo (chỉ title + publisher + url)
- Dùng dữ liệu từ sourceNotes, không bịa nguồn
- Giọng văn: chuyên nghiệp, sắc bén, có quan điểm`;

export async function writeArticleVi(cluster: TopicCluster, notes: SourceNote[] = []): Promise<GeneratedArticleDraft> {
  const generated = await tryGenerate(cluster, notes);
  if (generated) return generated;
  return templateDraft(cluster, notes);
}

async function tryGenerate(cluster: TopicCluster, notes: SourceNote[]): Promise<GeneratedArticleDraft | undefined> {
  try {
    const text = await generateWithOllama({
      system: STRUCTURED_PROMPT_VI,
      prompt: JSON.stringify({
        task: "Output JSON theo cấu trúc article schema (heroMedia, highlights, sections, insightBlocks, takeaway, sources, tags). Viết 800-1200 từ. KHÔNG viết bodyMarkdown.",
        cluster,
        sourceNotes: notes
      })
    });
    if (!text) return undefined;

    const parsed = sanitizeGeneratedMedia(parseJson(text), notes);
    return {
      ...templateDraft(cluster, notes),
      ...parsed,
      lang: "vi",
      category: cluster.category,
      sourceIds: cluster.sourceIds,
      sourceUrls: notes.map((note) => note.url),
      generation: {
        model: ollamaModel(),
        promptVersion: "article-vi-v2",
        generatedAt: new Date().toISOString(),
        sourceClusterId: cluster.clusterId,
        confidence: cluster.confidence,
        mode: "ollama"
      },
      status: "draft"
    };
  } catch (err) {
    console.error("[ollama] generate failed:", err instanceof Error ? err.message : String(err));
    return undefined;
  }
}

function templateDraft(cluster: TopicCluster, notes: SourceNote[]): GeneratedArticleDraft {
  const facts = notes.flatMap((note) => note.keyFacts).slice(0, 3);
  const sourceNames = [...new Set(notes.map((note) => note.sourceName))].join(", ") || "source registry";
  const firstSrc = notes[0];

  return {
    id: `${cluster.clusterId}_vi`,
    lang: "vi",
    category: cluster.category,
    title: `${cluster.topic}: góc nhìn cho creator và builder`,
    subtitle: `Tín hiệu được tổng hợp từ ${sourceNames}, chấm điểm theo độ mới, độ dày nội dung và độ tin cậy nguồn.`,
    heroMedia: undefined as any,
    highlights: facts.slice(0, 4).map((f) => ({ text: f })),
    sections: [{
      id: "main",
      heading: "Phân tích",
      blocks: [{ type: "paragraph" as const, text: facts.map((f) => `• ${f}`).join("\n\n") || cluster.reasonSelected }]
    }],
    insightBlocks: [{
      title: "Vì sao đáng chú ý",
      text: "Tín hiệu này có thể ảnh hưởng trực tiếp đến workflow sản xuất nội dung, coding hoặc prompt trong tuần.",
      variant: "analysis" as const
    }],
    takeaway: {
      title: "Creator / Builder Takeaway",
      items: ["Kiểm tra nguồn gốc tín hiệu từ các nguồn được liệt kê", "Thử nghiệm trên một workflow nhỏ trước khi scale", "Theo dõi diễn biến trong 1-2 tuần tới"]
    },
    tags: [cluster.category, "ai-radar", "daily-signal"],
    sourceIds: cluster.sourceIds,
    sourceUrls: notes.map((note) => note.url),
    generation: {
      model: ollamaModel(),
      promptVersion: "article-vi-v2",
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
