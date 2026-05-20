import type { GeneratedArticleDraft, SourceNote, TopicCluster } from "../types/schema.ts";
import { generateWithOllama, ollamaModel } from "./ollama.ts";

export async function writeArticleVi(cluster: TopicCluster, notes: SourceNote[] = []): Promise<GeneratedArticleDraft> {
  const generated = await tryGenerate(cluster, notes);
  if (generated) return generated;

  return templateDraft(cluster, notes);
}

async function tryGenerate(cluster: TopicCluster, notes: SourceNote[]): Promise<GeneratedArticleDraft | undefined> {
  try {
    const text = await generateWithOllama({
      system: `Bạn là biên tập viên tiếng Việt của AI Radar — chuyên viết bài phân tích chuyên sâu cho creator và developer.
QUY TẮC:
- Viết bài 800-1200 từ, phân tích chuyên sâu, không hời hợt.
- Sử dụng dữ liệu từ sourceNotes, không bịa nguồn.
- Giọng văn: chuyên nghiệp, sắc bén, có quan điểm rõ ràng.
- Cấu trúc: mở đầu gây chú ý → phân tích chi tiết từng khía cạnh → góc nhìn phản biện → kết luận actionable cho creator/builder.
- Mỗi section tối thiểu 150-200 từ.`,

      prompt: JSON.stringify({
        task: `Viết bài phân tích chuyên sâu tiếng Việt (800-1200 từ) dạng JSON với các field:
- title: tiêu đề hấp dẫn, có góc nhìn riêng (không generic)
- subtitle: phụ đề 1-2 câu tóm tắt insight chính
- tldr: mảng 3-5 bullet points tóm tắt key takeaways
- bodyMarkdown: markdown đầy đủ với các section ##: Bối cảnh, Phân tích chi tiết, Góc nhìn phản biện, Cơ hội cho Creator/Builder, Kết luận. Mỗi section viết ít nhất 150 từ, có dẫn chứng cụ thể từ nguồn.
- whyItMatters: 3-5 câu giải thích tại sao tín hiệu này quan trọng với creator/developer
- creatorTakeaway: 2-4 hành động cụ thể creator/builder nên làm ngay
- tags: mảng 3-5 tag liên quan`,
        cluster,
        sourceNotes: notes
      })
    });
    if (!text) return undefined;

    const parsed = parseJson(text);
    return {
      ...templateDraft(cluster, notes),
      ...parsed,
      lang: "vi",
      category: cluster.category,
      sourceIds: cluster.sourceIds,
      sourceUrls: notes.map((note) => note.url),
      generation: {
        model: ollamaModel(),
        promptVersion: "article-vi-v1",
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

  return {
    id: `${cluster.clusterId}_vi`,
    lang: "vi",
    category: cluster.category,
    title: `${cluster.topic}: góc nhìn cho creator và builder`,
    subtitle: `Tín hiệu được tổng hợp từ ${sourceNames}, chấm điểm theo độ mới, độ dày nội dung và độ tin cậy nguồn.`,
    tldr: facts.length > 0 ? facts : [cluster.reasonSelected],
    bodyMarkdown: [
      "## Tín hiệu chính",
      `Cluster này đang đạt điểm ${cluster.articleWorthinessScore.toFixed(2)} với confidence ${cluster.confidence}.`,
      "## Phân tích",
      facts.map((fact) => `- ${fact}`).join("\n") || `- ${cluster.reasonSelected}`,
      "## Nguồn cần kiểm chứng",
      notes.map((note) => `- ${note.sourceName}: ${note.title}`).join("\n")
    ].join("\n\n"),
    whyItMatters: "Điểm đáng chú ý là tín hiệu này có thể ảnh hưởng trực tiếp đến workflow sản xuất nội dung, coding hoặc prompt trong tuần.",
    creatorTakeaway: "Creator/builder nên kiểm tra nguồn gốc, thử trên một workflow nhỏ và chỉ scale khi kết quả ổn định.",
    tags: [cluster.category, "ai-radar", "daily-signal"],
    sourceIds: cluster.sourceIds,
    sourceUrls: notes.map((note) => note.url),
    generation: {
      model: ollamaModel(),
      promptVersion: "article-vi-v1",
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
