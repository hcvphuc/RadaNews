import type { Lang } from "@/lib/schema";

export type GlossaryEntry = {
  keyword: string;
  vi: string;
  en: string;
};

export type GlossaryCategory = {
  id: string;
  label: { vi: string; en: string };
  entries: GlossaryEntry[];
};

export const glossaryCategories: GlossaryCategory[] = [
  {
    id: "ai-agentic",
    label: { vi: "AI Agentic", en: "AI Agentic" },
    entries: [
      { keyword: "AI Agent", vi: "Phần mềm tự động thực hiện tác vụ theo mục tiêu được giao, có khả năng lập kế hoạch, dùng công cụ và tự sửa lỗi.", en: "Software that autonomously executes tasks based on assigned goals, with planning, tool use, and self-correction." },
      { keyword: "Autonomous", vi: "Tự vận hành mà không cần can thiệp của con người trong quá trình thực thi.", en: "Operating independently without human intervention during execution." },
      { keyword: "Tool Use", vi: "Khả năng của AI gọi và sử dụng các công cụ bên ngoài (API, database, file system) để hoàn thành tác vụ.", en: "AI's ability to call and use external tools (APIs, databases, file systems) to complete tasks." },
      { keyword: "Agentic Workflow", vi: "Quy trình làm việc mà AI agent tự động hóa từ A-Z: nhận input → lập kế hoạch → thực thi → kiểm tra → báo cáo.", en: "End-to-end workflow automated by AI agents: receive input → plan → execute → verify → report." },
    ],
  },
  {
    id: "ai-vibe-coding",
    label: { vi: "AI Vibe Coding", en: "AI Vibe Coding" },
    entries: [
      { keyword: "Vibe Coding", vi: "Phong cách lập trình bằng cách mô tả ý tưởng (vibe) cho AI, thay vì tự viết từng dòng code.", en: "Programming style where you describe ideas (vibes) to AI instead of writing code line-by-line." },
      { keyword: "Boilerplate", vi: "Code mẫu lặp đi lặp lại, thường dùng để khởi tạo project. AI có thể tự sinh boilerplate.", en: "Repetitive template code used to bootstrap projects. AI can generate this automatically." },
      { keyword: "Cursor Automations", vi: "Tính năng của IDE Cursor cho phép AI tự động thực hiện chuỗi thao tác lập trình theo kịch bản.", en: "Cursor IDE feature allowing AI to automatically execute programming tasks in sequence." },
      { keyword: "Replit Agent", vi: "AI agent tích hợp trong nền tảng Replit, có thể tự build và deploy app từ mô tả.", en: "AI agent built into Replit platform that can build and deploy apps from descriptions." },
    ],
  },
  {
    id: "ai-image",
    label: { vi: "AI Image", en: "AI Image" },
    entries: [
      { keyword: "Midjourney", vi: "Công cụ tạo ảnh từ prompt text, nổi tiếng với chất lượng nghệ thuật cao.", en: "AI image generation tool known for high artistic quality from text prompts." },
      { keyword: "--cref", vi: "Tham số Character Reference trong Midjourney — dùng ảnh reference để khóa khuôn mặt/đặc điểm nhân vật qua nhiều lần generate.", en: "Midjourney Character Reference parameter — uses a reference image to lock character face/features across generations." },
      { keyword: "IP-Adapter", vi: "Công cụ trong ComfyUI/Stable Diffusion cho phép 'nhúng' đặc điểm của ảnh reference vào quá trình generate, giúp giữ consistency.", en: "ComfyUI/Stable Diffusion tool that 'embeds' reference image features into generation for consistency." },
      { keyword: "LoRA", vi: "Low-Rank Adaptation — kỹ thuật fine-tune nhỏ gọn cho AI model, thường dùng để dạy model vẽ 1 style hoặc nhân vật cụ thể.", en: "Low-Rank Adaptation — compact fine-tuning technique to teach AI models specific styles or characters." },
      { keyword: "ControlNet", vi: "Công cụ kiểm soát chính xác bố cục, pose, depth map khi generate ảnh AI.", en: "Tool for precise control over composition, pose, and depth maps in AI image generation." },
    ],
  },
  {
    id: "ai-video",
    label: { vi: "AI Video", en: "AI Video" },
    entries: [
      { keyword: "Seedance", vi: "Công cụ Image-to-Video (I2V) — chuyển ảnh tĩnh thành video có chuyển động. Mạnh về consistency nhân vật.", en: "Image-to-Video (I2V) tool — converts static images to motion video. Strong character consistency." },
      { keyword: "Kling", vi: "Công cụ AI Video của Kuaishou (Trung Quốc). Mạnh về chất lượng motion và hỗ trợ text-to-video lẫn image-to-video.", en: "AI Video tool by Kuaishou (China). Strong motion quality, supports both text-to-video and image-to-video." },
      { keyword: "Runway", vi: "Nền tảng AI sáng tạo chuyên nghiệp, nổi tiếng với Gen-3/Gen-4 video model chất lượng điện ảnh.", en: "Professional creative AI platform, known for Gen-3/Gen-4 cinematic-quality video models." },
      { keyword: "I2V (Image-to-Video)", vi: "Kỹ thuật chuyển ảnh tĩnh thành video — AI 'đoán' chuyển động dựa trên nội dung ảnh và prompt.", en: "Technique converting still images to video — AI predicts motion based on image content and prompt." },
      { keyword: "ARRIRAW", vi: "Định dạng video raw của hãng ARRI — chuẩn công nghiệp trong điện ảnh. Dùng trong prompt để AI mô phỏng chất lượng hình ảnh điện ảnh.", en: "Raw video format by ARRI — industry standard in cinema. Used in prompts to simulate cinematic image quality." },
      { keyword: "Kodak Vision3", vi: "Dòng phim nhựa (film stock) nổi tiếng của Kodak, dùng trong điện ảnh. Prompt dùng tên này để AI tạo màu sắc và grain giống phim nhựa thật.", en: "Famous film stock line by Kodak used in cinema. Used in prompts for authentic film color and grain." },
      { keyword: "Storyboard", vi: "Bản vẽ phác thảo từng cảnh trong phim — chuẩn công nghiệp từ Hollywood. Dùng làm input cho AI video để giữ consistency.", en: "Visual outline of each scene in a film — Hollywood industry standard. Used as AI video input for consistency." },
      { keyword: "Film Grain", vi: "Hạt nhiễu tự nhiên trên phim nhựa — mô phỏng bằng prompt để video AI trông giống phim quay thật hơn.", en: "Natural noise texture on film stock — simulated via prompts to make AI video look more like real footage." },
      { keyword: "Entropy (Prompt)", vi: "Mức độ 'nhiễu' trong prompt — prompt càng mơ hồ, entropy càng cao, kết quả AI càng khó đoán và generic.", en: "Level of 'noise' in a prompt — vaguer prompts have higher entropy, leading to more unpredictable and generic AI output." },
      { keyword: "Color Grading", vi: "Quá trình chỉnh màu hậu kỳ trong điện ảnh, thường dùng DaVinci Resolve — bước cuối cùng trước khi xuất phim.", en: "Post-production color adjustment process in cinema, typically using DaVinci Resolve — final step before export." },
      { keyword: "Consistency", vi: "Tính nhất quán — khả năng giữ nguyên đặc điểm nhân vật, ánh sáng, phong cách qua nhiều shot khác nhau. Bài toán khó nhất của AI video.", en: "The ability to maintain character features, lighting, and style across multiple shots. The hardest problem in AI video." },
      { keyword: "DaVinci Resolve", vi: "Phần mềm chỉnh màu và hậu kỳ video chuyên nghiệp, chuẩn công nghiệp trong điện ảnh và TV.", en: "Professional color grading and video post-production software, industry standard in film and TV." },
    ],
  },
];

export function getGlossary(lang: Lang): (GlossaryEntry & { id: number })[] {
  const all: (GlossaryEntry & { id: number })[] = [];
  let id = 1;
  for (const cat of glossaryCategories) {
    for (const entry of cat.entries) {
      all.push({ ...entry, id: id++ });
    }
  }
  return all;
}

export function getGlossaryByCategory(lang: Lang): GlossaryCategory[] {
  return glossaryCategories;
}

export function getTerm(keyword: string, lang: Lang): string | undefined {
  for (const cat of glossaryCategories) {
    for (const entry of cat.entries) {
      if (entry.keyword.toLowerCase() === keyword.toLowerCase()) {
        return lang === "vi" ? entry.vi : entry.en;
      }
    }
  }
  return undefined;
}
