# PLAN.md — AI Radar Publication

## 0. Tóm tắt sản phẩm

**AI Radar Publication** là một website editorial/publication về AI, không phải trang tổng hợp link.

Hệ thống sẽ tự động crawl nguồn từ Reddit, YouTube, blog, changelog và các nguồn AI liên quan; sau đó chọn lọc chủ đề đáng viết, gom nhiều nguồn liên quan, dùng LLM qua Ollama API để viết lại thành **bài viết gốc của website** bằng tiếng Việt và tiếng Anh. Mỗi bài có phần nguồn tham khảo rõ ràng.

Định vị sản phẩm:

> Một AI editorial publication tự động đọc nguồn AI mới mỗi ngày, viết lại thành bài phân tích VI/EN cho creator, builder và người làm AI production. Mỗi bài có nguồn tham khảo rõ ràng và được lưu thành knowledge base để agent/chatbot dùng lại.

Website public sẽ giống một **premium AI magazine / AI production intelligence site**, không phải dashboard hiển thị tab Reddit, YouTube, X.

---

## 1. Mục tiêu chính

### 1.1. Mục tiêu sản phẩm

- Public website đọc bài AI hằng ngày.
- Mỗi ngày sinh bài mới từ nhiều nguồn.
- Ưu tiên tiếng Việt, có bản tiếng Anh riêng.
- Có VI/EN toggle.
- Có trang prompt riêng gồm 2 tab:
  - Prompt Image
  - Prompt Video
- Mỗi bài có nguồn tham khảo ở cuối bài.
- Có thể bookmark/save bài viết.
- Có archive bài cũ.
- Sau này có chatbot để user search/chat với toàn bộ knowledge base của website.
- Sau này có MCP read-only để agent của user truy vấn kho data.

### 1.2. Mục tiêu kỹ thuật

- Public site build bằng **Astro**.
- Admin backend làm sau bằng **Next.js** nếu cần.
- Pipeline bằng Node.js/TypeScript.
- LLM writer dùng **Ollama provider endpoint**.
- Deploy public site trên Vercel domain trước.
- Sau này gắn custom domain.
- Lưu raw content để debug/truy vết, nhưng không public raw content.
- Export dữ liệu sạch dạng JSONL để agent/chatbot/RAG dùng lại.

---

## 2. Không làm trong v1

V1 không làm các phần sau:

- Không làm social network.
- Không làm trang tổng hợp link.
- Không hiển thị dashboard phân tab theo nguồn Reddit/YouTube/X.
- Không build MCP ngay từ đầu.
- Không build chatbot ngay từ đầu.
- Không build admin backend ngay từ đầu.
- Không cần user login cho public site.
- Không dùng Supabase/vector database trong v1 nếu chưa cần.
- Không cho AI auto copy/paraphrase lại nguyên văn bài nguồn.

---

## 3. Category chính

Website có 6 mảng nội dung:

1. **AI Agentic**
2. **AI Image**
3. **AI Video**
4. **AI Vibe Coding**
5. **Prompt Image**
6. **Prompt Video**

Trang public navigation:

```txt
Today
AI Agentic
AI Image
AI Video
AI Vibe Coding
Prompts
Saved
Search
VI / EN
```

Trang **Prompts** có 2 tab:

```txt
Prompt Image
Prompt Video
```

---

## 4. Output mỗi ngày

V1 sinh mỗi mảng 1 bài/ngày để test chất lượng:

```txt
1 bài AI Agentic
1 bài AI Image
1 bài AI Video
1 bài AI Vibe Coding
1 bài Prompt Image
1 bài Prompt Video
```

Tổng: **6 bài/ngày**.

Sau khi chất lượng ổn, số bài mỗi mảng sẽ chỉnh được trong admin backend.

Homepage hiển thị:

```txt
6 bài hôm nay
+ archive bên dưới
```

Optional sau này:

```txt
Today's AI Brief — 1 bài tổng hợp toàn bộ ngày
```

---

## 5. Language strategy — VI/EN toggle

Chọn **Cách A**: generate 2 bản riêng.

Không generate tiếng Anh rồi dịch sang tiếng Việt, cũng không generate tiếng Việt rồi dịch sang tiếng Anh.

Pipeline đúng:

```txt
source notes
→ generate outline chung
→ write VI article from source notes
→ write EN article from source notes
→ validate both versions
→ publish same topic with language variant
```

URL đề xuất:

```txt
/vi/ai-video/video-ai-character-consistency-workflow
/en/ai-video/video-ai-character-consistency-workflow
```

Primary language:

```txt
Vietnamese first
English second
```

---

## 6. Writing style

Tone đã chốt:

```txt
Founder / builder insight
Dễ hiểu như newsletter
Thỉnh thoảng có nhận định mạnh khi có đủ cơ sở
```

Không viết như báo dịch máy. Không quá neutral, không nhạt, không copy văn phong nguồn.

Độ dài bài:

```txt
700–1000 chữ
```

Cấu trúc bài:

```txt
Title
Subtitle
TL;DR: 3–5 bullets
Main article: 5–8 đoạn
Why it matters
Creator / Builder takeaway
Sources
```

Tone mẫu:

> Thay đổi này không chỉ là một update tính năng. Nó cho thấy video AI đang bước sang giai đoạn mới: từ tạo clip đẹp mắt sang kiểm soát production workflow. Với người làm trailer, TVC hoặc nội dung lịch sử bằng AI, điểm đáng chú ý không nằm ở “prompt hay hơn”, mà nằm ở khả năng giữ nhân vật, góc máy và continuity qua nhiều shot.

---

## 7. Public UI direction

Public UI phải giống **premium editorial publication**, không phải analytics dashboard.

Style tham chiếu:

```txt
Dark premium
Luxury fintech/dashboard feeling
Near-black background
Charcoal panels
Warm orange/gold accent
Soft glow
Rounded cards
Sharp typography
Editorial layout
```

Không show public các thứ như:

```txt
Reddit tab
YouTube tab
X tab
Source percentage
Data health kỹ thuật
Crawl count quá chi tiết
Feed card kiểu link list
```

Nguồn chỉ hiện trong bài viết ở phần **Sources**.

### 7.1. Homepage layout

```txt
Top nav:
Logo | Today | Agentic | Image | Video | Vibe Coding | Prompts | Search | VI/EN

Hero:
Today's AI Brief
Một đoạn editorial ngắn về hôm nay AI có gì đáng chú ý

Featured article:
Bài đáng đọc nhất trong ngày

Daily sections:
AI Agentic
AI Image
AI Video
AI Vibe Coding
Prompts

Right rail / secondary area:
Hot Topics
Most Referenced Sources
Saved Articles

Archive:
Các ngày trước
```

### 7.2. Article card

Card bài viết không phải link card. Nó là editorial card.

Ví dụ:

```txt
AI VIDEO

Video AI đang chuyển từ “shot đẹp” sang workflow giữ nhân vật nhất quán

Các update mới cho thấy người làm video AI cần kiểm soát reference, camera movement và continuity tốt hơn, thay vì chỉ viết prompt đẹp.

4 min read · 5 sources
Read article →
```

### 7.3. Article page

```txt
Title
Subtitle
Category
Published date
VI/EN toggle

TL;DR
- 3–5 ý chính

Main article
Bài viết mới hoàn chỉnh

Why it matters
Vì sao chuyện này đáng chú ý

Builder / Creator Takeaway
Người làm AI production nên áp dụng gì

Sources
Danh sách nguồn gốc
```

---

## 8. Tech stack

### 8.1. Public site

```txt
Astro
Tailwind CSS
MDX / JSON content collections
Static deploy on Vercel
```

Astro phù hợp vì đây là content-heavy publication, cần SEO, tốc độ, static content và route theo ngôn ngữ.

### 8.2. Admin backend sau này

```txt
Next.js
Auth đơn giản hoặc protected admin
Source management
Generation settings
Article management
```

Admin làm sau khi public pipeline chạy ổn.

### 8.3. Pipeline

```txt
Node.js
TypeScript
RSS crawler
Content extractor
Classifier
Clusterer
Ollama generator
Validator
Publisher
```

### 8.4. LLM provider

Mày có sẵn **Ollama API endpoint** dạng provider/cloud endpoint.

Environment variables:

```env
OLLAMA_BASE_URL=
OLLAMA_API_KEY=
OLLAMA_MODEL_RESEARCHER=
OLLAMA_MODEL_WRITER_VI=
OLLAMA_MODEL_WRITER_EN=
OLLAMA_MODEL_REVIEWER=
```

Không gọi Ollama API trực tiếp từ browser.

---

## 9. Model strategy

Chưa chốt model cố định. Cần test thực tế trên 10 bài mẫu.

Đề xuất ban đầu:

```txt
Source selection / clustering:
DeepSeek V3.2 / DeepSeek V4 Preview hoặc model reasoning mạnh có trong endpoint

Vietnamese article writing:
Qwen3 bản lớn nhất endpoint có
hoặc Qwen2.5-72B / Qwen2.5 large instruct nếu có

English article writing:
Qwen hoặc DeepSeek đều được

Reviewer / validator:
Một model khác với writer để check grounding và hallucination
```

Rubric test model tiếng Việt:

```txt
- Văn tiếng Việt tự nhiên
- Không giống văn dịch máy
- Có góc nhìn builder/creator
- Không bịa claim
- Bám nguồn
- Title/subtitle có sức hút
- TL;DR rõ
- Không overhype
```

---

## 10. System architecture

### 10.1. High-level pipeline

```txt
Crawl nguồn
→ Extract raw content / transcript / summary
→ Normalize source items
→ Classify category
→ Deduplicate
→ Cluster related sources
→ Score article-worthiness
→ Select top 1 topic/category
→ Create source notes
→ Generate shared outline
→ Write VI article
→ Write EN article
→ Validate
→ Save article content
→ Export agent-ready JSONL
→ Deploy public site
```

### 10.2. Repo structure

```txt
ai-radar-publication/
  apps/
    web/                  # Astro public site
      src/
        components/
        layouts/
        pages/
        content/
        lib/
      public/
        data/
          agent/
          search/

    admin/                # Next.js admin, build later

  pipeline/
    sources/
      sources.config.ts
    crawl/
      fetch-rss.ts
      extract-web.ts
      extract-youtube.ts
      extract-reddit.ts
    classify/
      categorize.ts
      cluster.ts
      score.ts
    generate/
      create-source-notes.ts
      create-outline.ts
      write-article-vi.ts
      write-article-en.ts
      validate-article.ts
    publish/
      write-mdx.ts
      write-json.ts
      update-index.ts
      export-agent-data.ts

  content/
    articles/
      vi/
      en/
    sources/
    clusters/
    notes/
    raw/                  # private/internal, do not expose publicly
    exports/

  scripts/
    run-daily.ts
    build-search-index.ts
    export-jsonl.ts

  .github/
    workflows/
      daily-generate.yml

  PLAN.md
  README.md
```

---

## 11. Automation schedule

V1:

```txt
1 lần mỗi sáng
06:00 ICT
```

Sau này:

```txt
12 tiếng/lần
06:00 ICT
18:00 ICT
```

Vì đang dùng Ollama provider endpoint, có thể chạy trên GitHub Actions:

```txt
GitHub Actions
→ crawl
→ call Ollama API
→ generate articles
→ validate
→ commit content
→ Vercel auto deploy
```

GitHub secrets cần có:

```txt
OLLAMA_BASE_URL
OLLAMA_API_KEY
OLLAMA_MODEL_RESEARCHER
OLLAMA_MODEL_WRITER_VI
OLLAMA_MODEL_WRITER_EN
OLLAMA_MODEL_REVIEWER
```

---

## 12. Source strategy

Nguồn chia thành 2 nhóm:

```txt
Core source: đáng tin hơn, ưu tiên cao
Community source: nhiều tín hiệu, cần lọc mạnh
```

### 12.1. AI Agentic

Core:

```txt
LangChain Blog / YouTube
Anthropic Blog
OpenAI Blog
Microsoft Research / Microsoft AI Blog
```

Community:

```txt
r/AI_Agents
r/LocalLLaMA
r/LangChain
r/AutoGPT
YouTube: Matthew Berman
YouTube: AI Jason
```

### 12.2. AI Image

Core:

```txt
Stability AI Blog
Black Forest Labs / FLUX updates
Adobe Firefly Blog
Replicate Blog
```

Community:

```txt
r/StableDiffusion
r/comfyui
r/midjourney
r/FluxAI
YouTube: Olivio Sarikas
YouTube: Aitrepreneur
YouTube: Sebastian Kamph
```

### 12.3. AI Video

Core:

```txt
Runway Blog
Pika updates
Luma AI updates
Google DeepMind / Veo updates
OpenAI / Sora updates
```

Community:

```txt
r/aivideo
r/MediaSynthesis
r/RunwayML
YouTube: Theoretically Media
YouTube: Cyberjungle
YouTube: Matt Wolfe
```

### 12.4. AI Vibe Coding

Core:

```txt
Cursor changelog/blog
GitHub Copilot Blog
Replit Blog
Vercel Blog
Supabase Blog
Anthropic Claude Code updates
OpenAI Codex updates
```

Community:

```txt
r/ChatGPTCoding
r/cursor
r/ClaudeAI
YouTube: IndyDevDan
YouTube: AI Jason
YouTube: Theo
YouTube: Fireship
```

### 12.5. Prompt Image

Community:

```txt
r/StableDiffusion
r/midjourney
r/PromptEngineering
r/comfyui
YouTube: Prompt Muse
YouTube: Olivio Sarikas
YouTube: Tokenized AI
```

### 12.6. Prompt Video

Community:

```txt
r/aivideo
r/MediaSynthesis
r/RunwayML
YouTube: Theoretically Media
YouTube: Cyberjungle
YouTube: AI Samson
```

Nguồn ban đầu chỉ là seed list. Sau này admin backend sẽ cho thêm/xóa/bật/tắt nguồn và chỉnh source weight.

---

## 13. Source selection rules

Mỗi category crawler lấy khoảng 20–50 candidate/ngày, rồi score.

### 13.1. Article score

```txt
articleScore =
  productionValue
+ novelty
+ practicalUsefulness
+ sourceCredibility
+ crossSourceSignal
+ trendMomentum
+ promptWorkflowValue
- duplicatePenalty
- hypePenalty
- thinContentPenalty
- dramaPenalty
```

### 13.2. Ưu tiên cao

```txt
- Tool/model mới ra mắt
- Workflow có thể áp dụng ngay
- Update ảnh hưởng đến AI video/image production
- Prompt technique mới
- Agent/coding workflow thực dụng
- Chủ đề được nhiều nguồn nhắc lại trong ngày
- Video/tutorial có transcript hoặc mô tả đủ chi tiết
- Thread có nhiều insight thực tế từ cộng đồng
```

### 13.3. Hạ điểm hoặc loại

```txt
- Tin quá chung chung
- Bài chỉ quảng cáo tool
- Meme/drama
- Reaction video ít nội dung
- Thread hỏi đáp lặp lại
- Source thiếu dữ liệu để viết bài
- Nội dung không liên quan production/workflow
- Chủ đề không có giá trị với creator/builder
```

---

## 14. Category logic

### 14.1. AI Agentic

Tập trung:

```txt
agents
multi-agent
tool use
MCP
browser agent
computer use
RAG agent
workflow automation
```

Bài nên trả lời:

```txt
Agent workflow này có áp dụng được thật không?
Nó giúp builder tiết kiệm gì?
Có ảnh hưởng gì đến automation/content production không?
```

### 14.2. AI Image

Tập trung:

```txt
Flux
Stable Diffusion
ComfyUI
LoRA
ControlNet
Midjourney
image editing
character consistency
style transfer
```

Bài nên trả lời:

```txt
Update này giúp tạo ảnh tốt hơn ở đâu?
Có workflow mới không?
Có liên quan đến storyboard/TVC/slide production không?
```

### 14.3. AI Video

Tập trung:

```txt
Sora
Runway
Pika
Kling
Veo
Seedance
Luma
camera control
motion consistency
image-to-video
text-to-video
```

Bài nên trả lời:

```txt
Video AI đang tiến bộ ở phần nào?
Có dùng được cho production thật chưa?
Workflow prompt + image + video nên thay đổi ra sao?
```

### 14.4. AI Vibe Coding

Tập trung:

```txt
Cursor
Claude Code
Codex
Copilot
Bolt
Lovable
Replit Agent
v0
Supabase workflow
background agents
project memory
```

Bài nên trả lời:

```txt
Tool này giúp build app nhanh hơn thật không?
Có workflow nào đáng học?
Có rủi ro gì về code quality/architecture không?
```

### 14.5. Prompt Image

Nằm trong page **Prompts** tab **Prompt Image**.

Tập trung:

```txt
image prompt structure
style lock
negative prompt
reference image
character consistency
composition
lighting
camera
ComfyUI workflow prompts
Midjourney prompt
```

Bài dạng:

```txt
Prompt technique
Prompt breakdown
Workflow prompt template
Before/after analysis
```

### 14.6. Prompt Video

Nằm trong page **Prompts** tab **Prompt Video**.

Tập trung:

```txt
video prompt structure
shot design
camera movement
scene continuity
motion control
cinematic prompt
image-to-video prompt
Seedance/Kling/Runway/Sora workflow
```

Bài dạng:

```txt
Video prompt breakdown
Shot-by-shot prompt system
Camera movement guide
AI trailer/TVC workflow
```

---

## 15. Content schema

### 15.1. Article schema

```ts
type Article = {
  id: string
  slug: string
  lang: "vi" | "en"
  category:
    | "ai-agentic"
    | "ai-image"
    | "ai-video"
    | "ai-vibe-coding"
    | "prompt-image"
    | "prompt-video"

  title: string
  subtitle: string
  tldr: string[]
  bodyMarkdown: string
  whyItMatters: string
  creatorTakeaway: string
  tags: string[]
  readingTime: number
  publishedAt: string

  sources: {
    title: string
    sourceName: string
    url: string
    sourceType: "reddit" | "youtube" | "blog" | "x" | "other"
    usedFor: "primary" | "context" | "discussion"
  }[]

  generation: {
    model: string
    promptVersion: string
    generatedAt: string
    sourceClusterId: string
    confidence: "high" | "medium" | "low"
  }

  status: "published" | "draft" | "failed"
}
```

### 15.2. Source item schema

```ts
type SourceItem = {
  id: string
  sourceType: "reddit" | "youtube" | "blog" | "x" | "other"
  sourceName: string
  sourceUrl: string
  title: string
  rawSummary: string
  publishedAt: string
  crawledAt: string
  categoryHints: string[]
  extractedText?: string
  transcript?: string
  author?: string
  score?: number
}
```

### 15.3. Source note schema

```ts
type SourceNote = {
  sourceId: string
  sourceType: "reddit" | "youtube" | "blog" | "x" | "other"
  sourceName: string
  url: string
  title: string
  publishedAt: string
  categoryHints: string[]
  keyFacts: string[]
  claims: {
    text: string
    confidence: "high" | "medium" | "low"
    evidence: string
  }[]
  usableFor: ("article" | "trend" | "prompt-workflow")[]
  copyrightRisk: "low" | "medium" | "high"
}
```

### 15.4. Topic cluster schema

```ts
type TopicCluster = {
  clusterId: string
  category: string
  topic: string
  sourceIds: string[]
  articleWorthinessScore: number
  reasonSelected: string
  confidence: "high" | "medium" | "low"
  selectedForGeneration: boolean
}
```

### 15.5. Chunk schema for chatbot/RAG

```ts
type ArticleChunk = {
  chunkId: string
  articleId: string
  lang: "vi" | "en"
  category: string
  title: string
  section: "tldr" | "body" | "whyItMatters" | "creatorTakeaway" | "sources"
  text: string
  tags: string[]
  sourceUrls: string[]
  canonicalUrl: string
  publishedAt: string
}
```

---

## 16. Data layer for agent/chatbot/training

Không chỉ lưu MDX. Phải lưu data sạch từ đầu.

### 16.1. Data layers

#### Layer 1 — Raw Archive

Private/internal.

```txt
data/raw/
  reddit/
  youtube/
  blogs/
```

Lưu:

```txt
- raw HTML hoặc transcript
- crawl timestamp
- source URL
- hash
- extraction status
```

Không public.

#### Layer 2 — Source Notes

Agent dùng tốt hơn raw content.

```txt
source-notes.jsonl
```

Nội dung:

```txt
- source metadata
- key facts
- extracted claims
- confidence
- usableFor
- copyrightRisk
```

#### Layer 3 — Topic Clusters

```txt
topic-clusters.jsonl
```

Nội dung:

```txt
- topic
- category
- sourceIds
- articleWorthinessScore
- reasonSelected
- confidence
```

#### Layer 4 — Generated Articles

Public.

```txt
articles.vi.jsonl
articles.en.jsonl
```

#### Layer 5 — Agent Exports

```txt
public/data/agent/
  articles.vi.jsonl
  articles.en.jsonl
  chunks.vi.jsonl
  chunks.en.jsonl
  source-notes.jsonl
  topic-clusters.jsonl
  prompt-workflows.jsonl
  training-manifest.json
```

Mỗi dòng JSONL là một document độc lập, dễ đưa vào RAG/fine-tune.

### 16.2. Agent document example

```json
{
  "doc_id": "art_2026_05_16_ai_video_001_vi",
  "type": "generated_article",
  "lang": "vi",
  "category": "ai-video",
  "title": "...",
  "text": "...",
  "tags": ["ai-video", "character-consistency", "workflow"],
  "source_urls": ["..."],
  "canonical_url": "https://your-site.vercel.app/vi/ai-video/...",
  "created_at": "2026-05-16T06:00:00+07:00",
  "license": "internal-training-allowed",
  "version": 1
}
```

---

## 17. `/llms.txt`

Thêm file:

```txt
/llms.txt
/llms-full.txt
```

Mục tiêu: giúp LLM/agent biết nên đọc gì trên website.

Ví dụ nội dung:

```txt
# AI Radar

AI Radar is a Vietnamese-first AI production intelligence publication.

## Core content
- /vi/today
- /vi/ai-video
- /vi/ai-image
- /vi/ai-agentic
- /vi/vibe-coding
- /vi/prompts

## Agent-ready exports
- /data/agent/articles.vi.jsonl
- /data/agent/articles.en.jsonl
- /data/agent/chunks.vi.jsonl
- /data/agent/chunks.en.jsonl
- /data/agent/topic-clusters.jsonl
- /data/agent/prompt-workflows.jsonl
```

---

## 18. Guardrails cho rewrite

AI không được:

```txt
- copy nguyên văn đoạn dài từ nguồn
- paraphrase từng câu một
- đổi từ đồng nghĩa rồi đăng lại
- lấy nguyên cấu trúc bài gốc
- bịa claim ngoài source notes
- giấu nguồn
- overhype quá mức
```

AI phải:

```txt
- tổng hợp từ nhiều nguồn
- viết lại bằng cấu trúc mới
- thêm phân tích “vì sao quan trọng”
- thêm takeaway cho creator/builder
- ghi rõ nguồn tham khảo
- link về nguồn gốc
- ghi rõ khi thông tin chưa chắc
```

Validation trước publish:

```txt
- Có title không?
- Có subtitle không?
- Có TL;DR không?
- Body có nằm trong 700–1000 chữ không?
- Có ít nhất 2 nguồn không?
- Nếu chỉ 1 nguồn thì mark low confidence hoặc không publish tùy config
- Có source URL không?
- Có bản VI và EN không?
- Có câu nào giống source quá dài không?
- Có hallucinated company/tool name không?
- Có whyItMatters không?
- Có creatorTakeaway không?
```

Nếu fail validation:

```txt
status = failed
không publish
log lỗi
đợi lần generate sau
```

---

## 19. Generation config v1

```ts
export const generationConfig = {
  primaryLanguage: "vi",
  secondaryLanguage: "en",

  autoPublish: true,

  articlesPerRun: {
    "ai-agentic": 1,
    "ai-image": 1,
    "ai-video": 1,
    "ai-vibe-coding": 1,
    "prompt-image": 1,
    "prompt-video": 1
  },

  articleLength: {
    minWords: 700,
    maxWords: 1000
  },

  homepage: {
    showTodayArticles: true,
    showArchiveBelow: true
  },

  promptsPage: {
    tabs: ["prompt-image", "prompt-video"]
  },

  rawArchive: {
    enabled: true,
    public: false
  },

  agentExport: {
    enabled: true,
    formats: ["jsonl", "markdown"],
    exposePublicIndexes: true,
    exposeRawSources: false
  },

  validation: {
    minimumSourcesPerArticle: 2,
    allowSingleSourceArticle: false,
    requireVietnameseVersion: true,
    requireEnglishVersion: true
  }
}
```

---

## 20. Prompt system

### 20.1. Source selection prompt

```txt
You are an AI editorial researcher for a daily AI publication.

Your job is to evaluate source items and decide which topic deserves one original article today.

Prioritize:
- practical AI production value
- AI video/image workflow impact
- agentic workflow relevance
- vibe coding productivity
- prompt engineering usefulness
- novelty
- cross-source confirmation

Reject:
- pure hype
- drama
- memes
- thin announcements
- duplicate posts
- low-signal reaction content

Return:
- selected topic
- category
- reason for selection
- source IDs used
- confidence
```

### 20.2. Article writing prompt

```txt
You are an AI industry editor writing an original article for creators, builders, and AI production teams.

Write a new article based only on the provided source notes.

Rules:
- Do not copy the wording or structure of any source.
- Do not paraphrase source text sentence by sentence.
- Synthesize the sources into a new editorial article.
- Keep factual claims grounded in the provided source notes.
- If information is uncertain, say so clearly.
- Add practical takeaways for AI creators/builders.
- Do not overhype.
- Use a clear newsletter-like style with founder/builder insight.
- Occasionally include a strong opinion when the evidence supports it.
- Include a Sources section using the provided source metadata.

Output:
title
subtitle
tldr
body
whyItMatters
creatorTakeaway
tags
sources
```

### 20.3. Prompt article prompt

```txt
You are an AI prompt workflow editor.

Write an original practical article about the prompt technique or workflow found in the source notes.

Focus on:
- prompt structure
- camera / composition / lighting / motion language
- repeatable workflow
- practical examples
- mistakes to avoid
- how creators can apply it immediately

For Prompt Image:
prioritize style consistency, subject consistency, reference images, composition, lighting, negative prompts, and model-specific prompt behavior.

For Prompt Video:
prioritize shot design, camera movement, motion direction, continuity, character consistency, scene transitions, and image-to-video workflow.

Do not copy source wording.
Write a useful, original guide-like article.
```

---

## 21. Chatbot feature — làm sau nhưng chuẩn bị data từ đầu

Ý tưởng:

User có thể search và chat với chatbot trên web. AI trả lời bằng kiến thức từ toàn bộ data trong website.

Ví dụ user hỏi:

```txt
“Tuần này AI video có workflow nào đáng chú ý?”
“Có prompt nào giúp giữ nhân vật nhất quán không?”
“So sánh Runway, Kling, Seedance gần đây có gì mới?”
“Có bài nào nói về vibe coding với Supabase không?”
```

Chatbot nên ưu tiên trả lời bằng knowledge base của site, không trả lời bằng kiến thức chung trước.

### 21.1. Chatbot pipeline

```txt
Content generated mỗi ngày
→ chunk bài viết thành đoạn nhỏ
→ tạo search index / vector index
→ user hỏi chatbot
→ retrieve đoạn liên quan
→ gửi context vào Ollama
→ LLM trả lời
→ hiển thị answer + link bài nguồn
```

### 21.2. V1 chatbot — simple search + chat

```txt
Astro public site
Vercel serverless API route hoặc backend route riêng
FlexSearch / Pagefind / Lunr index
Ollama provider endpoint
```

Ưu điểm:

```txt
- Dễ build
- Không cần database
- Hợp v1.5
```

### 21.3. V2 chatbot — Vector RAG

```txt
Chunk content
→ Create embeddings
→ Store vector index
→ Semantic search
→ Answer with citations
```

Database sau này:

```txt
Supabase pgvector
hoặc LanceDB / SQLite local / Qdrant
```

### 21.4. Không expose Ollama key

Sai:

```txt
Browser → Ollama API
```

Đúng:

```txt
Browser
→ /api/chat
→ server gọi Ollama API
→ trả answer về browser
```

Cần có:

```txt
- rate limit
- timeout
- max context size
- abuse protection
- logging câu hỏi
- optional captcha nếu public bị spam
```

### 21.5. Chatbot answer format

```txt
Câu trả lời ngắn

Dựa trên các bài gần đây của AI Radar:
1. ...
2. ...
3. ...

Nguồn liên quan:
- Tên bài 1
- Tên bài 2
- Tên bài 3
```

---

## 22. MCP feature — làm sau

MCP không cần build ngay từ đầu.

Nhưng data layer phải chuẩn từ đầu để MCP sau này dễ đọc.

### 22.1. MCP v1 — read-only

Tools:

```txt
search_articles(query, lang, category, limit)
get_article(slug, lang)
get_daily_brief(date, lang)
get_sources(articleId)
get_topic_clusters(category, dateRange)
get_prompt_workflows(type, query, limit)
```

MCP đọc từ:

```txt
public/data/agent/articles.vi.jsonl
public/data/agent/articles.en.jsonl
public/data/agent/chunks.vi.jsonl
public/data/agent/chunks.en.jsonl
public/data/agent/topic-clusters.jsonl
public/data/agent/source-notes.jsonl
public/data/agent/prompt-workflows.jsonl
```

### 22.2. MCP v2 — search tốt hơn

Thêm:

```txt
- full-text search
- embedding/vector search
- category filter
- date filter
- source confidence filter
```

### 22.3. MCP v3 — admin/write actions

Chỉ làm sau cùng, cần auth/audit/approval.

Possible tools:

```txt
regenerate_article(articleId)
approve_article(articleId)
unpublish_article(articleId)
add_source(url)
run_crawler_now()
```

Không nên cho MCP quyền publish/sửa/xóa trong v1.

---

## 23. Admin backend — làm sau

Admin backend sau khi public site + generation pipeline ổn.

Chức năng admin:

```txt
Source Management
- thêm/xóa nguồn
- bật/tắt nguồn
- source weight
- suggested source approval

Generation Settings
- số bài mỗi mảng
- lịch generate
- model Ollama
- article length
- tone
- auto publish on/off

Prompt Settings
- prompt image rules
- prompt video rules
- article writing prompt
- source selection prompt

Article Management
- list bài đã publish
- regenerate
- unpublish
- edit title/subtitle
- xem nguồn gốc
- xem confidence/validation log
```

V1 không cần admin.

---

## 24. Market positioning

Thị trường có các sản phẩm gần giống:

```txt
- Feedly AI / Market Intelligence
- Particle
- Yahoo News with Artifact DNA
- Perplexity Discover
```

Nhưng project này khác ở:

```txt
- Vietnamese-first
- Tập trung AI production, AI video, AI image, prompt workflow, vibe coding
- Mỗi bài là original editorial article, không phải link card
- Có VI/EN riêng
- Có prompt image/video như 2 vertical riêng
- Có data layer để agent/chatbot/RAG dùng lại
```

Định vị nên tránh cạnh tranh trực diện với general AI news summarizer. Nên đi vào ngách:

```txt
AI production intelligence for Vietnamese creators and builders
```

---

## 25. Roadmap

### Phase 1 — Public site bằng mock data

Mục tiêu: chốt UI/UX và structure publication.

Tasks:

```txt
- Astro setup
- Tailwind setup
- Homepage publication style
- Category page
- Prompts page với 2 tab: Prompt Image / Prompt Video
- Article detail page
- VI/EN routes
- Search UI
- Bookmark localStorage
- Mock article JSON
- Archive section
```

### Phase 2 — Crawler

Tasks:

```txt
- source registry
- crawl RSS
- extract article text
- extract YouTube metadata/transcript nếu có
- extract Reddit post/comment nếu có
- normalize source items
- dedupe
- store raw private cache
```

### Phase 3 — Scoring + clustering

Tasks:

```txt
- classify source theo category
- cluster nguồn cùng topic
- chấm articleScore
- chọn top 1 cluster/category
- tạo source notes
```

### Phase 4 — Ollama article generator

Tasks:

```txt
- tạo shared outline
- viết bản VI
- viết bản EN
- validate
- ghi MDX/JSON
- ghi generation metadata
```

### Phase 5 — Agent-ready exports

Tasks:

```txt
- articles.vi.jsonl
- articles.en.jsonl
- chunks.vi.jsonl
- chunks.en.jsonl
- source-notes.jsonl
- topic-clusters.jsonl
- prompt-workflows.jsonl
- training-manifest.json
- /llms.txt
```

### Phase 6 — GitHub Actions automation

Tasks:

```txt
- daily-generate.yml
- secrets config
- run crawler
- run generator
- run validator
- commit generated content
- trigger Vercel deploy
```

### Phase 7 — Search site

Tasks:

```txt
- build search index
- search by title/body/tags/category
- support VI/EN search
```

### Phase 8 — Chatbot RAG trên web

Tasks:

```txt
- chunk retrieval
- simple full-text search first
- /api/chat route
- Ollama server-side call
- answer with source links
- rate limit
- logging
```

### Phase 9 — MCP read-only

Tasks:

```txt
- local MCP server
- search_articles
- get_article
- get_daily_brief
- get_sources
- get_topic_clusters
- get_prompt_workflows
```

### Phase 10 — Admin backend

Tasks:

```txt
- Next.js admin
- source management
- generation config
- article management
- prompt management
- validation logs
```

---

## 26. Implementation priority

Thứ tự đúng:

```txt
1. Data schema
2. Mock content
3. Astro public UI
4. Article page + VI/EN routing
5. Agent-ready JSONL format
6. Crawler
7. Source notes
8. Writer pipeline
9. Validator
10. Auto publish
11. Search
12. Chatbot
13. MCP
14. Admin
```

Không build MCP/chatbot trước khi có content data sạch.

---

## 27. Definition of Done for MVP

MVP được xem là xong khi:

```txt
- Public website chạy trên Vercel
- Homepage hiển thị 6 bài hôm nay + archive
- Có route VI/EN
- Có article detail page đầy đủ TL;DR, body, whyItMatters, creatorTakeaway, sources
- Có Prompts page với 2 tab Prompt Image / Prompt Video
- Có bookmark localStorage
- Pipeline crawl được nguồn
- Pipeline sinh được 6 bài/ngày bằng Ollama endpoint
- Có validation trước publish
- Có JSONL exports cho agent
- Có chunks exports cho chatbot sau này
- Có /llms.txt
```

---

## 28. Key decisions đã chốt

```txt
Product type:
AI editorial publication, không phải link aggregator.

Public UI:
Premium dark editorial publication, không phải source dashboard.

Primary language:
Vietnamese first.

VI/EN:
Generate 2 bản riêng.

Daily output:
6 bài/ngày, mỗi mảng 1 bài.

Writing tone:
Founder/builder insight + newsletter dễ hiểu + thỉnh thoảng opinionated.

Article length:
700–1000 chữ.

LLM:
Ollama provider endpoint.

Frontend:
Astro public site.

Admin:
Next.js sau này.

Domain:
Vercel domain trước, custom domain sau.

Raw content:
Có lưu, nhưng private/internal, không public.

Homepage:
6 bài hôm nay + archive.

Prompt page:
2 tab Prompt Image / Prompt Video.

Chatbot:
Làm sau bằng RAG trên data website.

MCP:
Làm sau, read-only trước.

Data layer:
Phải chuẩn từ đầu bằng Article schema + JSONL exports + chunks.
```

---

## 29. Final product sentence

> AI Radar là một publication AI tiếng Việt-first, tự động đọc nhiều nguồn AI mỗi ngày, chọn lọc tín hiệu quan trọng cho creator/builder, viết lại thành bài phân tích gốc VI/EN có nguồn rõ ràng, đồng thời xây dựng một knowledge base sạch để chatbot và agent có thể truy vấn lại toàn bộ tri thức của website.
