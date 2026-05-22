import type { Article } from "@/lib/schema";

export const articles: Article[] = [
  {
    "id": "art_2026_05_16_ai_agentic_001_vi",
    "slug": "agent-workflow-tu-thu-nghiem-den-doi-song-san-xuat",
    "lang": "vi",
    "category": "ai-agentic",
    "title": "AI Agentic đang rời khỏi demo để bước vào workflow sản xuất",
    "subtitle": "Điểm đáng chú ý không còn là agent có thể tự làm mọi thứ, mà là cách nó phối hợp công cụ, kiểm tra trạng thái và để con người can thiệp đúng lúc.",
    "tldr": [
      "Agent hữu ích nhất khi được giới hạn trong workflow rõ ràng, không phải khi được giao một nhiệm vụ mơ hồ.",
      "Tool use, memory và human approval là ba lớp kiểm soát quan trọng cho production.",
      "Builder nên bắt đầu bằng agent hẹp: research, triage, QA hoặc content ops."
    ],
    "bodyMarkdown": "Làn sóng agent mới đang bớt phụ thuộc vào những video demo nơi AI tự mở browser, tự click và tự hoàn thành một tác vụ dài. Câu hỏi thực tế hơn là: agent có thể trở thành một phần ổn định trong dây chuyền sản xuất hay không.\n\nTrong các workflow gần đây, điểm chung không nằm ở việc agent mạnh hơn bao nhiêu, mà nằm ở cách hệ thống chia nhỏ quyền hành. Agent đọc yêu cầu, gọi công cụ, ghi lại trạng thái, rồi dừng ở những điểm cần phê duyệt. Đây là khác biệt lớn so với kiểu tự động hóa đen hộp: người vận hành vẫn nhìn thấy agent đang dựa vào dữ liệu nào, vì sao chọn bước tiếp theo và khi nào cần dừng.\n\nVới creator và builder, điều này mở ra một cách dùng thực tế hơn. Thay vì yêu cầu agent 'làm toàn bộ chiến dịch', có thể giao nó rà nguồn, gom claim, tạo checklist, kiểm tra lỗi publish hoặc đề xuất bản nháp đầu tiên. Những việc này có ranh giới rõ và dễ kiểm chứng.\n\nRủi ro vẫn còn. Agent có thể hiểu sai context, gọi sai công cụ hoặc tự tin quá mức khi dữ liệu thiếu. Vì vậy production agent nên có logging, giới hạn quyền, schema output và điểm xác nhận của con người.\n\nNhận định mạnh ở đây là: agent tốt trong năm nay sẽ giống một operator phụ trong hệ thống hơn là một nhân viên ảo tự trị hoàn toàn. Đội nào thiết kế workflow quanh giới hạn đó sẽ có lợi thế sớm hơn đội chỉ chờ model tiếp theo.",
    "whyItMatters": "AI Agentic chỉ tạo giá trị khi đi vào vận hành thật. Việc chuyển từ demo sang workflow có kiểm soát giúp builder đo được thời gian tiết kiệm, lỗi giảm và điểm cần human review.",
    "creatorTakeaway": "Hãy chọn một tác vụ lặp lại có input/output rõ, thêm logging và approval step, rồi mới mở rộng quyền cho agent. Đừng bắt đầu bằng một agent tổng quát.",
    "tags": [
      "agentic",
      "workflow",
      "tool-use",
      "production"
    ],
    "readingTime": 5,
    "publishedAt": "2026-05-16T06:20:00+07:00",
    "imageUrl": "https://cdn.sanity.io/images/4zrzovbb/website/6d4a0d28992ade92d6fa63646fd9c9d318245c6c-2400x1260.jpg",
    "sources": [
      {
        "title": "Agent workflow patterns for tool-using systems",
        "url": "https://blog.langchain.dev/",
        "publisher": "LangChain Blog",
        "sourceName": "LangChain Blog",
        "sourceType": "blog",
        "usedFor": "primary"
      },
      {
        "title": "Computer use and autonomous agent updates",
        "url": "https://www.anthropic.com/news",
        "publisher": "Anthropic Blog",
        "sourceName": "Anthropic Blog",
        "sourceType": "blog",
        "usedFor": "context"
      },
      {
        "title": "Community discussion on production agents",
        "url": "https://www.reddit.com/r/AI_Agents/",
        "publisher": "r/AI_Agents",
        "sourceName": "r/AI_Agents",
        "sourceType": "reddit",
        "usedFor": "discussion"
      },
      {
        "title": "Cursor",
        "url": "https://www.cursor.com/changelog",
        "publisher": "Cursor"
      }
    ],
    "generation": {
      "model": "mock-ollama-writer",
      "promptVersion": "v1-editorial-2026-05-16",
      "generatedAt": "2026-05-16T06:00:00+07:00",
      "sourceClusterId": "cluster_ai_agentic_2026_05_16_001",
      "confidence": "medium"
    },
    "status": "published",
    "highlights": [
      {
        "text": "Agent hữu ích nhất khi được giới hạn trong workflow rõ ràng, không phải khi được giao một nhiệm vụ mơ hồ."
      },
      {
        "text": "Tool use, memory và human approval là ba lớp kiểm soát quan trọng cho production."
      },
      {
        "text": "Builder nên bắt đầu bằng agent hẹp: research, triage, QA hoặc content ops."
      }
    ],
    "insightBlocks": [
      {
        "variant": "why",
        "title": "Vì sao đáng chú ý",
        "text": "AI Agentic chỉ tạo giá trị khi đi vào vận hành thật. Việc chuyển từ demo sang workflow có kiểm soát giúp builder đo được thời gian tiết kiệm, lỗi giảm và điểm cần human review."
      }
    ],
    "takeaway": {
      "title": "Gợi ý cho creator",
      "text": "Hãy chọn một tác vụ lặp lại có input/output rõ, thêm logging và approval step, rồi mới mở rộng quyền cho agent. Đừng bắt đầu bằng một agent tổng quát."
    },
    "sections": [
      {
        "id": "section-1",
        "heading": "Vấn đề thật nằm ở workflow",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Làn sóng agent mới đang bớt phụ thuộc vào những video demo nơi AI tự mở browser, tự click và tự hoàn thành một tác vụ dài. Câu hỏi thực tế hơn là: agent có thể trở thành một phần ổn định trong dây chuyền sản xuất hay không."
          }
        ]
      },
      {
        "id": "section-2",
        "heading": "Cách production đang đổi",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Trong các workflow gần đây, điểm chung không nằm ở việc agent mạnh hơn bao nhiêu, mà nằm ở cách hệ thống chia nhỏ quyền hành. Agent đọc yêu cầu, gọi công cụ, ghi lại trạng thái, rồi dừng ở những điểm cần phê duyệt. Đây là khác biệt lớn so với kiểu tự động hóa đen hộp: người vận hành vẫn nhìn thấy agent đang dựa vào dữ liệu nào, vì sao chọn bước tiếp theo và khi nào cần dừng."
          }
        ]
      },
      {
        "id": "section-3",
        "heading": "Rủi ro cần kiểm soát",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Với creator và builder, điều này mở ra một cách dùng thực tế hơn. Thay vì yêu cầu agent 'làm toàn bộ chiến dịch', có thể giao nó rà nguồn, gom claim, tạo checklist, kiểm tra lỗi publish hoặc đề xuất bản nháp đầu tiên. Những việc này có ranh giới rõ và dễ kiểm chứng."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://ptht05hbb1ssoooe.public.blob.vercel-storage.com/assets/uploads/changelog-og.png",
            "alt": "Cursor changelog product visual",
            "caption": "Ảnh nguồn Cursor Changelog — coding agent/workflow đang đi vào sản phẩm thật.",
            "credit": "Cursor",
            "sourceUrl": "https://www.cursor.com/changelog",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-4",
        "heading": "Creator nên làm gì",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Rủi ro vẫn còn. Agent có thể hiểu sai context, gọi sai công cụ hoặc tự tin quá mức khi dữ liệu thiếu. Vì vậy production agent nên có logging, giới hạn quyền, schema output và điểm xác nhận của con người."
          }
        ]
      },
      {
        "id": "section-5",
        "heading": "Kết luận thực dụng",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Nhận định mạnh ở đây là: agent tốt trong năm nay sẽ giống một operator phụ trong hệ thống hơn là một nhân viên ảo tự trị hoàn toàn. Đội nào thiết kế workflow quanh giới hạn đó sẽ có lợi thế sớm hơn đội chỉ chờ model tiếp theo."
          }
        ]
      }
    ],
    "heroMedia": {
      "type": "image",
      "src": "https://cdn.sanity.io/images/4zrzovbb/website/6d4a0d28992ade92d6fa63646fd9c9d318245c6c-2400x1260.jpg",
      "alt": "AI Agentic đang rời khỏi demo để bước vào workflow sản xuất",
      "caption": "Điểm đáng chú ý không còn là agent có thể tự làm mọi thứ, mà là cách nó phối hợp công cụ, kiểm tra trạng thái và để con người can thiệp đúng lúc.",
      "credit": "LangChain Blog",
      "sourceUrl": "https://blog.langchain.dev/"
    }
  },
  {
    "id": "art_2026_05_16_ai_agentic_001_en",
    "slug": "agent-workflows-are-moving-from-demo-to-production",
    "lang": "en",
    "category": "ai-agentic",
    "title": "Agentic AI is moving from demos into production workflows",
    "subtitle": "The useful shift is not full autonomy. It is controlled tool use, visible state, and human checkpoints at the right moments.",
    "tldr": [
      "Agents work best inside narrow workflows with clear inputs and outputs.",
      "Tool use, memory, logging, and approval gates are becoming the production control layer.",
      "Builders should start with research, triage, QA, or content operations before broad autonomy."
    ],
    "bodyMarkdown": "The agent conversation is becoming less about spectacular demos and more about operating discipline. The interesting question is no longer whether an agent can click through a browser. It is whether that agent can become a dependable part of a production system.\n\nRecent workflow patterns share one trait: they distribute authority. The agent reads the task, calls tools, records state, and stops when approval is required. That is a very different shape from black-box automation. The operator can see what the agent used, why it chose the next step, and where confidence is low.\n\nFor creators and builders, this changes how to adopt agents. Instead of asking for a full campaign, use an agent to collect sources, group claims, produce checklists, inspect publication errors, or create the first draft for review. These jobs have boundaries, which makes the output easier to evaluate.\n\nThe risk is still real. Agents can misunderstand context, call the wrong tool, or overstate certainty when the data is thin. Production agents need logs, permission limits, structured outputs, and human checkpoints.\n\nThe strong read: useful agents this year will look more like junior operators inside well-designed systems than fully autonomous virtual employees. Teams that design around that constraint will move faster than teams waiting for a magical next model.",
    "whyItMatters": "Agentic AI only matters when it becomes operational. Controlled workflows let teams measure time saved, errors reduced, and the exact points where human review is still needed.",
    "creatorTakeaway": "Pick one repetitive task with clear input and output, add logs and approval gates, then expand capability. Do not begin with a general-purpose agent.",
    "tags": [
      "agentic",
      "workflow",
      "tool-use",
      "production"
    ],
    "readingTime": 5,
    "publishedAt": "2026-05-16T06:20:00+07:00",
    "imageUrl": "https://cdn.sanity.io/images/4zrzovbb/website/6d4a0d28992ade92d6fa63646fd9c9d318245c6c-2400x1260.jpg",
    "sources": [
      {
        "title": "Agent workflow patterns for tool-using systems",
        "url": "https://blog.langchain.dev/",
        "publisher": "LangChain Blog",
        "sourceName": "LangChain Blog",
        "sourceType": "blog",
        "usedFor": "primary"
      },
      {
        "title": "Computer use and autonomous agent updates",
        "url": "https://www.anthropic.com/news",
        "publisher": "Anthropic Blog",
        "sourceName": "Anthropic Blog",
        "sourceType": "blog",
        "usedFor": "context"
      },
      {
        "title": "Community discussion on production agents",
        "url": "https://www.reddit.com/r/AI_Agents/",
        "publisher": "r/AI_Agents",
        "sourceName": "r/AI_Agents",
        "sourceType": "reddit",
        "usedFor": "discussion"
      },
      {
        "title": "Cursor",
        "url": "https://www.cursor.com/changelog",
        "publisher": "Cursor"
      }
    ],
    "generation": {
      "model": "mock-ollama-writer",
      "promptVersion": "v1-editorial-2026-05-16",
      "generatedAt": "2026-05-16T06:00:00+07:00",
      "sourceClusterId": "cluster_ai_agentic_2026_05_16_001",
      "confidence": "medium"
    },
    "status": "published",
    "highlights": [
      {
        "text": "Agents work best inside narrow workflows with clear inputs and outputs."
      },
      {
        "text": "Tool use, memory, logging, and approval gates are becoming the production control layer."
      },
      {
        "text": "Builders should start with research, triage, QA, or content operations before broad autonomy."
      }
    ],
    "insightBlocks": [
      {
        "variant": "why",
        "title": "Why it matters",
        "text": "Agentic AI only matters when it becomes operational. Controlled workflows let teams measure time saved, errors reduced, and the exact points where human review is still needed."
      }
    ],
    "takeaway": {
      "title": "Creator takeaway",
      "text": "Pick one repetitive task with clear input and output, add logs and approval gates, then expand capability. Do not begin with a general-purpose agent."
    },
    "sections": [
      {
        "id": "section-1",
        "heading": "The real issue is workflow",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The agent conversation is becoming less about spectacular demos and more about operating discipline. The interesting question is no longer whether an agent can click through a browser. It is whether that agent can become a dependable part of a production system."
          }
        ]
      },
      {
        "id": "section-2",
        "heading": "How production is changing",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Recent workflow patterns share one trait: they distribute authority. The agent reads the task, calls tools, records state, and stops when approval is required. That is a very different shape from black-box automation. The operator can see what the agent used, why it chose the next step, and where confidence is low."
          }
        ]
      },
      {
        "id": "section-3",
        "heading": "Risks to control",
        "blocks": [
          {
            "type": "paragraph",
            "text": "For creators and builders, this changes how to adopt agents. Instead of asking for a full campaign, use an agent to collect sources, group claims, produce checklists, inspect publication errors, or create the first draft for review. These jobs have boundaries, which makes the output easier to evaluate."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://ptht05hbb1ssoooe.public.blob.vercel-storage.com/assets/uploads/changelog-og.png",
            "alt": "Cursor changelog product visual",
            "caption": "Ảnh nguồn Cursor Changelog — coding agent/workflow đang đi vào sản phẩm thật.",
            "credit": "Cursor",
            "sourceUrl": "https://www.cursor.com/changelog",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-4",
        "heading": "What creators should do",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The risk is still real. Agents can misunderstand context, call the wrong tool, or overstate certainty when the data is thin. Production agents need logs, permission limits, structured outputs, and human checkpoints."
          }
        ]
      },
      {
        "id": "section-5",
        "heading": "Practical conclusion",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The strong read: useful agents this year will look more like junior operators inside well-designed systems than fully autonomous virtual employees. Teams that design around that constraint will move faster than teams waiting for a magical next model."
          }
        ]
      }
    ],
    "heroMedia": {
      "type": "image",
      "src": "https://cdn.sanity.io/images/4zrzovbb/website/6d4a0d28992ade92d6fa63646fd9c9d318245c6c-2400x1260.jpg",
      "alt": "Agentic AI is moving from demos into production workflows",
      "caption": "The useful shift is not full autonomy. It is controlled tool use, visible state, and human checkpoints at the right moments.",
      "credit": "LangChain Blog",
      "sourceUrl": "https://blog.langchain.dev/"
    }
  },
  {
    "id": "art_2026_05_16_ai_image_001_vi",
    "slug": "reference-image-dang-tro-thanh-truc-chinh-cua-san-xuat-hinh-ai",
    "lang": "vi",
    "category": "ai-image",
    "title": "Reference image đang trở thành trục chính của sản xuất hình AI",
    "subtitle": "Prompt chữ vẫn quan trọng, nhưng workflow tạo ảnh nghiêm túc đang xoay quanh style lock, nhân vật nhất quán và kiểm soát composition bằng reference.",
    "tldr": [
      "Reference không còn là phụ kiện, mà là layer kiểm soát visual direction.",
      "Các workflow tốt tách rõ subject, style, lighting và composition reference.",
      "Creator nên lưu bộ reference theo brand thay vì viết lại prompt từ đầu mỗi lần."
    ],
    "bodyMarkdown": "Trong sản xuất hình bằng AI, prompt hay không còn đủ. Khi creator cần một bộ ảnh cùng chiến dịch, cùng nhân vật hoặc cùng moodboard, reference image trở thành thứ quyết định tính nhất quán.\n\nĐiểm thay đổi nằm ở cách người dùng tổ chức workflow. Thay vì nhồi tất cả vào một prompt dài, họ tách visual control thành nhiều lớp: ảnh tham chiếu nhân vật, ảnh tham chiếu ánh sáng, ảnh tham chiếu bố cục và mô tả bằng chữ để khóa ý định. Cách làm này giống art direction hơn là thử vận may.\n\nVới AI production, lợi ích lớn nhất là giảm số vòng sửa. Một brand có thể giữ palette, crop, lighting và nhân vật ổn định hơn nếu xây một thư viện reference nhỏ. Prompt lúc này không phải bài văn miêu tả, mà là lệnh điều phối giữa các asset.\n\nĐiểm cần cẩn trọng là bản quyền và nguồn ảnh tham chiếu. Reference tốt không có nghĩa là sao chép style hoặc nhân vật của người khác. Workflow chuyên nghiệp nên dùng asset tự tạo, ảnh brand có quyền sử dụng hoặc moodboard đủ trừu tượng.\n\nNhận định thực tế: kỹ năng prompt image đang tiến hóa thành kỹ năng thiết kế hệ thống reference. Người làm tốt sẽ không chỉ biết câu chữ, mà biết quản lý visual memory cho cả chiến dịch.",
    "whyItMatters": "Image AI bắt đầu hữu dụng hơn cho production khi output có thể lặp lại. Reference workflow giúp creator giữ brand, nhân vật và style ổn định qua nhiều asset.",
    "creatorTakeaway": "Tạo một folder reference cho từng brand gồm subject, lighting, composition và style. Mỗi prompt chỉ nên điều phối các lớp này thay vì viết lại mọi thứ.",
    "tags": [
      "ai-image",
      "reference-image",
      "style-lock",
      "comfyui"
    ],
    "readingTime": 4,
    "publishedAt": "2026-05-16T06:20:00+07:00",
    "imageUrl": "https://bfl.ai/opengraph-image-j8qpfc.png?47e2121a0eb4d5b0",
    "sources": [
      {
        "title": "Reference-driven image generation updates",
        "url": "https://bfl.ai/",
        "publisher": "Black Forest Labs",
        "sourceName": "Black Forest Labs",
        "sourceType": "blog",
        "usedFor": "primary"
      },
      {
        "title": "ComfyUI workflow notes from creators",
        "url": "https://www.reddit.com/r/comfyui/",
        "publisher": "r/comfyui",
        "sourceName": "r/comfyui",
        "sourceType": "reddit",
        "usedFor": "discussion"
      },
      {
        "title": "Replicate model deployment notes",
        "url": "https://replicate.com/blog",
        "publisher": "Replicate Blog",
        "sourceName": "Replicate Blog",
        "sourceType": "blog",
        "usedFor": "context"
      },
      {
        "title": "Cliprise",
        "url": "https://www.cliprise.app/learn/comparisons/features/best-ai-image-generator-2026-tested-ranked",
        "publisher": "Cliprise"
      }
    ],
    "generation": {
      "model": "mock-ollama-writer",
      "promptVersion": "v1-editorial-2026-05-16",
      "generatedAt": "2026-05-16T06:00:00+07:00",
      "sourceClusterId": "cluster_ai_image_2026_05_16_001",
      "confidence": "medium"
    },
    "status": "published",
    "highlights": [
      {
        "text": "Reference không còn là phụ kiện, mà là layer kiểm soát visual direction."
      },
      {
        "text": "Các workflow tốt tách rõ subject, style, lighting và composition reference."
      },
      {
        "text": "Creator nên lưu bộ reference theo brand thay vì viết lại prompt từ đầu mỗi lần."
      }
    ],
    "insightBlocks": [
      {
        "variant": "why",
        "title": "Vì sao đáng chú ý",
        "text": "Image AI bắt đầu hữu dụng hơn cho production khi output có thể lặp lại. Reference workflow giúp creator giữ brand, nhân vật và style ổn định qua nhiều asset."
      }
    ],
    "takeaway": {
      "title": "Gợi ý cho creator",
      "text": "Tạo một folder reference cho từng brand gồm subject, lighting, composition và style. Mỗi prompt chỉ nên điều phối các lớp này thay vì viết lại mọi thứ."
    },
    "sections": [
      {
        "id": "section-1",
        "heading": "Vấn đề thật nằm ở workflow",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Trong sản xuất hình bằng AI, prompt hay không còn đủ. Khi creator cần một bộ ảnh cùng chiến dịch, cùng nhân vật hoặc cùng moodboard, reference image trở thành thứ quyết định tính nhất quán."
          }
        ]
      },
      {
        "id": "section-2",
        "heading": "Cách production đang đổi",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Điểm thay đổi nằm ở cách người dùng tổ chức workflow. Thay vì nhồi tất cả vào một prompt dài, họ tách visual control thành nhiều lớp: ảnh tham chiếu nhân vật, ảnh tham chiếu ánh sáng, ảnh tham chiếu bố cục và mô tả bằng chữ để khóa ý định. Cách làm này giống art direction hơn là thử vận may."
          }
        ]
      },
      {
        "id": "section-3",
        "heading": "Rủi ro cần kiểm soát",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Với AI production, lợi ích lớn nhất là giảm số vòng sửa. Một brand có thể giữ palette, crop, lighting và nhân vật ổn định hơn nếu xây một thư viện reference nhỏ. Prompt lúc này không phải bài văn miêu tả, mà là lệnh điều phối giữa các asset."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://cdn.sanity.io/images/2gpum2i6/production/ce148fd9948b33e62687fc2005e27f46d3417714-2000x1081.webp",
            "alt": "Black Forest Labs image model sample",
            "caption": "Sample/source visual từ Black Forest Labs cho phần image generation.",
            "credit": "Black Forest Labs",
            "sourceUrl": "https://bfl.ai/",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-4",
        "heading": "Creator nên làm gì",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Điểm cần cẩn trọng là bản quyền và nguồn ảnh tham chiếu. Reference tốt không có nghĩa là sao chép style hoặc nhân vật của người khác. Workflow chuyên nghiệp nên dùng asset tự tạo, ảnh brand có quyền sử dụng hoặc moodboard đủ trừu tượng."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://replicate.com/_content/assets/cover.CjkY7aEO_Z1PeBfe.webp",
            "alt": "Replicate blog cover",
            "caption": "Ảnh nguồn Replicate Blog — triển khai model và workflow production.",
            "credit": "Replicate",
            "sourceUrl": "https://replicate.com/blog",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-5",
        "heading": "Kết luận thực dụng",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Nhận định thực tế: kỹ năng prompt image đang tiến hóa thành kỹ năng thiết kế hệ thống reference. Người làm tốt sẽ không chỉ biết câu chữ, mà biết quản lý visual memory cho cả chiến dịch."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://www.cliprise.app/creatives/seo/cliprise-ai-image-enhancement-cat-before-after.jpg",
            "alt": "Cliprise before after",
            "caption": "Ảnh nguồn Cliprise minh họa bài toán output/production AI image.",
            "credit": "Cliprise",
            "sourceUrl": "https://www.cliprise.app/learn/comparisons/features/best-ai-image-generator-2026-tested-ranked",
            "placement": "after-paragraph"
          }
        ]
      }
    ],
    "heroMedia": {
      "type": "image",
      "src": "https://bfl.ai/opengraph-image-j8qpfc.png?47e2121a0eb4d5b0",
      "alt": "Reference image đang trở thành trục chính của sản xuất hình AI",
      "caption": "Prompt chữ vẫn quan trọng, nhưng workflow tạo ảnh nghiêm túc đang xoay quanh style lock, nhân vật nhất quán và kiểm soát composition bằng reference.",
      "credit": "Black Forest Labs",
      "sourceUrl": "https://bfl.ai/"
    }
  },
  {
    "id": "art_2026_05_16_ai_image_001_en",
    "slug": "reference-images-are-becoming-the-backbone-of-ai-image-production",
    "lang": "en",
    "category": "ai-image",
    "title": "Reference images are becoming the backbone of AI image production",
    "subtitle": "Text prompts still matter, but serious image workflows now depend on style locks, character consistency, and composition control.",
    "tldr": [
      "References are becoming the control layer for visual direction.",
      "Strong workflows separate subject, style, lighting, and composition references.",
      "Creators should maintain brand reference kits instead of rewriting prompts from scratch."
    ],
    "bodyMarkdown": "In AI image production, a clever prompt is no longer enough. When a creator needs a campaign, a recurring character, or a stable brand mood, the reference image becomes the real control surface.\n\nThe shift is workflow design. Instead of stuffing every visual instruction into one long prompt, creators separate control into layers: subject reference, lighting reference, composition reference, and text instructions that lock the intent. That is closer to art direction than guesswork.\n\nFor production teams, the payoff is fewer revision loops. A brand can keep palette, crop logic, lighting, and character identity more stable when it has a small reference library. The prompt becomes coordination, not decoration.\n\nThe caution is rights and originality. A reference workflow should not become a shortcut for copying another artist's style or character. Professional teams should use owned assets, licensed references, or sufficiently abstract moodboards.\n\nThe practical read: image prompting is becoming reference-system design. The best operators will know how to manage visual memory across a campaign, not just write better adjectives.",
    "whyItMatters": "AI image tools become more useful for production when outputs repeat reliably. Reference workflows make brand, character, and style continuity easier to maintain across assets.",
    "creatorTakeaway": "Build a reference folder for each brand: subject, lighting, composition, and style. Use prompts to coordinate those layers rather than describing everything from scratch.",
    "tags": [
      "ai-image",
      "reference-image",
      "style-lock",
      "comfyui"
    ],
    "readingTime": 4,
    "publishedAt": "2026-05-16T06:20:00+07:00",
    "imageUrl": "https://bfl.ai/opengraph-image-j8qpfc.png?47e2121a0eb4d5b0",
    "sources": [
      {
        "title": "Reference-driven image generation updates",
        "url": "https://bfl.ai/",
        "publisher": "Black Forest Labs",
        "sourceName": "Black Forest Labs",
        "sourceType": "blog",
        "usedFor": "primary"
      },
      {
        "title": "ComfyUI workflow notes from creators",
        "url": "https://www.reddit.com/r/comfyui/",
        "publisher": "r/comfyui",
        "sourceName": "r/comfyui",
        "sourceType": "reddit",
        "usedFor": "discussion"
      },
      {
        "title": "Replicate model deployment notes",
        "url": "https://replicate.com/blog",
        "publisher": "Replicate Blog",
        "sourceName": "Replicate Blog",
        "sourceType": "blog",
        "usedFor": "context"
      },
      {
        "title": "Cliprise",
        "url": "https://www.cliprise.app/learn/comparisons/features/best-ai-image-generator-2026-tested-ranked",
        "publisher": "Cliprise"
      }
    ],
    "generation": {
      "model": "mock-ollama-writer",
      "promptVersion": "v1-editorial-2026-05-16",
      "generatedAt": "2026-05-16T06:00:00+07:00",
      "sourceClusterId": "cluster_ai_image_2026_05_16_001",
      "confidence": "medium"
    },
    "status": "published",
    "highlights": [
      {
        "text": "References are becoming the control layer for visual direction."
      },
      {
        "text": "Strong workflows separate subject, style, lighting, and composition references."
      },
      {
        "text": "Creators should maintain brand reference kits instead of rewriting prompts from scratch."
      }
    ],
    "insightBlocks": [
      {
        "variant": "why",
        "title": "Why it matters",
        "text": "AI image tools become more useful for production when outputs repeat reliably. Reference workflows make brand, character, and style continuity easier to maintain across assets."
      }
    ],
    "takeaway": {
      "title": "Creator takeaway",
      "text": "Build a reference folder for each brand: subject, lighting, composition, and style. Use prompts to coordinate those layers rather than describing everything from scratch."
    },
    "sections": [
      {
        "id": "section-1",
        "heading": "The real issue is workflow",
        "blocks": [
          {
            "type": "paragraph",
            "text": "In AI image production, a clever prompt is no longer enough. When a creator needs a campaign, a recurring character, or a stable brand mood, the reference image becomes the real control surface."
          }
        ]
      },
      {
        "id": "section-2",
        "heading": "How production is changing",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The shift is workflow design. Instead of stuffing every visual instruction into one long prompt, creators separate control into layers: subject reference, lighting reference, composition reference, and text instructions that lock the intent. That is closer to art direction than guesswork."
          }
        ]
      },
      {
        "id": "section-3",
        "heading": "Risks to control",
        "blocks": [
          {
            "type": "paragraph",
            "text": "For production teams, the payoff is fewer revision loops. A brand can keep palette, crop logic, lighting, and character identity more stable when it has a small reference library. The prompt becomes coordination, not decoration."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://cdn.sanity.io/images/2gpum2i6/production/ce148fd9948b33e62687fc2005e27f46d3417714-2000x1081.webp",
            "alt": "Black Forest Labs image model sample",
            "caption": "Sample/source visual từ Black Forest Labs cho phần image generation.",
            "credit": "Black Forest Labs",
            "sourceUrl": "https://bfl.ai/",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-4",
        "heading": "What creators should do",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The caution is rights and originality. A reference workflow should not become a shortcut for copying another artist's style or character. Professional teams should use owned assets, licensed references, or sufficiently abstract moodboards."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://replicate.com/_content/assets/cover.CjkY7aEO_Z1PeBfe.webp",
            "alt": "Replicate blog cover",
            "caption": "Ảnh nguồn Replicate Blog — triển khai model và workflow production.",
            "credit": "Replicate",
            "sourceUrl": "https://replicate.com/blog",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-5",
        "heading": "Practical conclusion",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The practical read: image prompting is becoming reference-system design. The best operators will know how to manage visual memory across a campaign, not just write better adjectives."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://www.cliprise.app/creatives/seo/cliprise-ai-image-enhancement-cat-before-after.jpg",
            "alt": "Cliprise before after",
            "caption": "Ảnh nguồn Cliprise minh họa bài toán output/production AI image.",
            "credit": "Cliprise",
            "sourceUrl": "https://www.cliprise.app/learn/comparisons/features/best-ai-image-generator-2026-tested-ranked",
            "placement": "after-paragraph"
          }
        ]
      }
    ],
    "heroMedia": {
      "type": "image",
      "src": "https://bfl.ai/opengraph-image-j8qpfc.png?47e2121a0eb4d5b0",
      "alt": "Reference images are becoming the backbone of AI image production",
      "caption": "Text prompts still matter, but serious image workflows now depend on style locks, character consistency, and composition control.",
      "credit": "Black Forest Labs",
      "sourceUrl": "https://bfl.ai/"
    }
  },
  {
    "id": "art_2026_05_16_ai_video_001_vi",
    "slug": "video-ai-chuyen-tu-shot-dep-sang-continuity-workflow",
    "lang": "vi",
    "category": "ai-video",
    "title": "Video AI đang chuyển từ shot đẹp sang continuity workflow",
    "subtitle": "Khi model tạo video tốt hơn, lợi thế không nằm ở một prompt xuất sắc, mà nằm ở cách kiểm soát nhân vật, camera và nhịp dựng qua nhiều shot.",
    "tldr": [
      "Shot đơn lẻ đẹp không đủ cho trailer, TVC hoặc nội dung dài.",
      "Workflow mới cần khóa nhân vật, góc máy, chuyển động và nhịp dựng.",
      "Image-to-video đang trở thành cầu nối thực tế giữa storyboard và motion."
    ],
    "bodyMarkdown": "Video AI đã qua giai đoạn chỉ gây ấn tượng bằng một clip vài giây. Với người làm production, câu hỏi khó hơn là làm sao giữ một nhân vật, một không gian và một nhịp kể chuyện qua nhiều shot.\n\nCác update gần đây cho thấy direction đang dịch chuyển: model tạo motion mượt hơn, hiểu camera tốt hơn và hỗ trợ reference rõ hơn. Nhưng điều này cũng làm lộ ra một vấn đề cũ của video AI: continuity. Một shot đẹp không tạo thành phim nếu shot kế tiếp đổi mặt nhân vật, sai ánh sáng hoặc phá nhịp dựng.\n\nWorkflow đáng học là bắt đầu từ storyboard tĩnh. Creator khóa nhân vật bằng ảnh reference, xác định lens/camera movement cho từng shot, rồi dùng image-to-video để thêm motion. Prompt video lúc này nên nói rõ chủ thể, hành động, camera, motion direction, duration và giới hạn không được phá vỡ.\n\nĐiểm này đặc biệt quan trọng với trailer, TVC, content lịch sử hoặc video giáo dục. Những format đó cần sự nhất quán hơn là hiệu ứng bất ngờ. Một hệ thống prompt tốt phải giúp model ít sáng tạo sai chỗ hơn.\n\nNhận định mạnh: trong AI video, người thắng không phải người có prompt đẹp nhất, mà là người xây được pipeline giữ continuity từ reference đến final edit.",
    "whyItMatters": "Video AI chỉ tiến vào production thật khi creator kiểm soát được chuỗi shot. Continuity workflow giúp giảm lỗi nhân vật, ánh sáng, camera và nhịp dựng.",
    "creatorTakeaway": "Đừng bắt đầu bằng text-to-video tự do. Hãy tạo storyboard ảnh, khóa reference, viết prompt theo từng shot và kiểm tra continuity trước khi dựng final.",
    "tags": [
      "ai-video",
      "continuity",
      "image-to-video",
      "workflow"
    ],
    "readingTime": 5,
    "publishedAt": "2026-05-16T06:20:00+07:00",
    "imageUrl": "https://runwayml.com/research/opengraph-image.jpg?opengraph-image.09drcy~~qw43q.jpg",
    "sources": [
      {
        "title": "Runway product updates",
        "url": "https://runwayml.com/research",
        "publisher": "Runway Blog",
        "sourceName": "Runway Blog",
        "sourceType": "blog",
        "usedFor": "primary"
      },
      {
        "title": "Veo and long-form generation notes",
        "url": "https://deepmind.google/discover/blog/",
        "publisher": "Google DeepMind",
        "sourceName": "Google DeepMind",
        "sourceType": "blog",
        "usedFor": "context"
      },
      {
        "title": "AI video creator workflow discussion",
        "url": "https://www.reddit.com/r/aivideo/",
        "publisher": "r/aivideo",
        "sourceName": "r/aivideo",
        "sourceType": "reddit",
        "usedFor": "discussion"
      },
      {
        "title": "Runway",
        "url": "https://runwayml.com/research/introducing-runway-gen-4",
        "publisher": "Runway"
      },
      {
        "title": "Google DeepMind",
        "url": "https://deepmind.google/models/veo/",
        "publisher": "Google DeepMind"
      },
      {
        "title": "Kling AI",
        "url": "https://kling.ai/",
        "publisher": "Kling AI"
      }
    ],
    "generation": {
      "model": "mock-ollama-writer",
      "promptVersion": "v1-editorial-2026-05-16",
      "generatedAt": "2026-05-16T06:00:00+07:00",
      "sourceClusterId": "cluster_ai_video_2026_05_16_001",
      "confidence": "medium"
    },
    "status": "published",
    "highlights": [
      {
        "text": "Shot đơn lẻ đẹp không đủ cho trailer, TVC hoặc nội dung dài."
      },
      {
        "text": "Workflow mới cần khóa nhân vật, góc máy, chuyển động và nhịp dựng."
      },
      {
        "text": "Image-to-video đang trở thành cầu nối thực tế giữa storyboard và motion."
      }
    ],
    "insightBlocks": [
      {
        "variant": "why",
        "title": "Vì sao đáng chú ý",
        "text": "Video AI chỉ tiến vào production thật khi creator kiểm soát được chuỗi shot. Continuity workflow giúp giảm lỗi nhân vật, ánh sáng, camera và nhịp dựng."
      }
    ],
    "takeaway": {
      "title": "Gợi ý cho creator",
      "text": "Đừng bắt đầu bằng text-to-video tự do. Hãy tạo storyboard ảnh, khóa reference, viết prompt theo từng shot và kiểm tra continuity trước khi dựng final."
    },
    "sections": [
      {
        "id": "section-1",
        "heading": "Vấn đề thật nằm ở workflow",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Video AI đã qua giai đoạn chỉ gây ấn tượng bằng một clip vài giây. Với người làm production, câu hỏi khó hơn là làm sao giữ một nhân vật, một không gian và một nhịp kể chuyện qua nhiều shot."
          }
        ]
      },
      {
        "id": "section-2",
        "heading": "Cách production đang đổi",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Các update gần đây cho thấy direction đang dịch chuyển: model tạo motion mượt hơn, hiểu camera tốt hơn và hỗ trợ reference rõ hơn. Nhưng điều này cũng làm lộ ra một vấn đề cũ của video AI: continuity. Một shot đẹp không tạo thành phim nếu shot kế tiếp đổi mặt nhân vật, sai ánh sáng hoặc phá nhịp dựng."
          }
        ]
      },
      {
        "id": "section-3",
        "heading": "Rủi ro cần kiểm soát",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Workflow đáng học là bắt đầu từ storyboard tĩnh. Creator khóa nhân vật bằng ảnh reference, xác định lens/camera movement cho từng shot, rồi dùng image-to-video để thêm motion. Prompt video lúc này nên nói rõ chủ thể, hành động, camera, motion direction, duration và giới hạn không được phá vỡ."
          },
          {
            "type": "media",
            "mediaType": "video",
            "src": "https://d3phaj0sisr2ct.cloudfront.net/site/content/videos/RW_HEADER_V2-2.mp4",
            "alt": "Runway Gen-4 official video demo",
            "caption": "Video demo chính thức Runway Gen-4 — minh họa world consistency.",
            "credit": "Runway",
            "sourceUrl": "https://runwayml.com/research/introducing-runway-gen-4",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-4",
        "heading": "Creator nên làm gì",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Điểm này đặc biệt quan trọng với trailer, TVC, content lịch sử hoặc video giáo dục. Những format đó cần sự nhất quán hơn là hiệu ứng bất ngờ. Một hệ thống prompt tốt phải giúp model ít sáng tạo sai chỗ hơn."
          },
          {
            "type": "media",
            "mediaType": "video",
            "src": "https://storage.googleapis.com/gdm-deepmind-com-prod-public/media/media/veo__veo-3__off-road.mp4",
            "alt": "Google DeepMind Veo sample video",
            "caption": "Sample video chính thức Google DeepMind Veo.",
            "credit": "Google DeepMind",
            "sourceUrl": "https://deepmind.google/models/veo/",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-5",
        "heading": "Kết luận thực dụng",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Nhận định mạnh: trong AI video, người thắng không phải người có prompt đẹp nhất, mà là người xây được pipeline giữ continuity từ reference đến final edit."
          },
          {
            "type": "media",
            "mediaType": "video",
            "src": "https://v16-kling.klingai.com/kos/s101/nlav112918/kling-website/page1-v3-1.mp4",
            "alt": "Kling AI official video demo",
            "caption": "Video demo chính thức Kling AI — motion-first AI video workflow.",
            "credit": "Kling AI",
            "sourceUrl": "https://kling.ai/",
            "placement": "after-paragraph"
          }
        ]
      }
    ],
    "heroMedia": {
      "type": "image",
      "src": "https://runwayml.com/research/opengraph-image.jpg?opengraph-image.09drcy~~qw43q.jpg",
      "alt": "Video AI đang chuyển từ shot đẹp sang continuity workflow",
      "caption": "Khi model tạo video tốt hơn, lợi thế không nằm ở một prompt xuất sắc, mà nằm ở cách kiểm soát nhân vật, camera và nhịp dựng qua nhiều shot.",
      "credit": "Runway Blog",
      "sourceUrl": "https://runwayml.com/research"
    }
  },
  {
    "id": "art_2026_05_16_ai_video_001_en",
    "slug": "ai-video-is-moving-from-beautiful-shots-to-continuity-workflows",
    "lang": "en",
    "category": "ai-video",
    "title": "AI video is moving from beautiful shots to continuity workflows",
    "subtitle": "As models improve, the advantage shifts from one clever prompt to controlling characters, camera, and editing rhythm across many shots.",
    "tldr": [
      "A single beautiful shot is not enough for trailers, ads, or longer content.",
      "The useful workflow locks character, camera, motion, and edit rhythm.",
      "Image-to-video is becoming the practical bridge between storyboard and motion."
    ],
    "bodyMarkdown": "AI video has moved beyond the phase where a few impressive seconds are enough. For production teams, the harder problem is keeping a character, a space, and a story rhythm consistent across multiple shots.\n\nRecent updates point in the same direction: smoother motion, better camera understanding, and stronger reference support. But those improvements expose the old weakness of AI video: continuity. A good shot does not become a film if the next shot changes the character's face, lighting, or pacing.\n\nThe workflow worth learning starts with still storyboards. Creators lock the character with references, define lens and camera movement per shot, then use image-to-video to add motion. A video prompt should specify subject, action, camera, motion direction, duration, and constraints the model should not break.\n\nThis matters most for trailers, ads, historical videos, and education content. Those formats need consistency more than surprise. A strong prompt system should make the model less creative in the wrong places.\n\nThe strong read: in AI video, the winner will not be the person with the prettiest prompt. It will be the team with a pipeline that preserves continuity from reference to final edit.",
    "whyItMatters": "AI video becomes production-ready only when creators can control shot sequences. Continuity workflows reduce errors in character identity, lighting, camera behavior, and pacing.",
    "creatorTakeaway": "Do not start with unconstrained text-to-video. Build a still storyboard, lock references, prompt shot by shot, and review continuity before the final edit.",
    "tags": [
      "ai-video",
      "continuity",
      "image-to-video",
      "workflow"
    ],
    "readingTime": 5,
    "publishedAt": "2026-05-16T06:20:00+07:00",
    "imageUrl": "https://runwayml.com/research/opengraph-image.jpg?opengraph-image.09drcy~~qw43q.jpg",
    "sources": [
      {
        "title": "Runway product updates",
        "url": "https://runwayml.com/research",
        "publisher": "Runway Blog",
        "sourceName": "Runway Blog",
        "sourceType": "blog",
        "usedFor": "primary"
      },
      {
        "title": "Veo and long-form generation notes",
        "url": "https://deepmind.google/discover/blog/",
        "publisher": "Google DeepMind",
        "sourceName": "Google DeepMind",
        "sourceType": "blog",
        "usedFor": "context"
      },
      {
        "title": "AI video creator workflow discussion",
        "url": "https://www.reddit.com/r/aivideo/",
        "publisher": "r/aivideo",
        "sourceName": "r/aivideo",
        "sourceType": "reddit",
        "usedFor": "discussion"
      },
      {
        "title": "Runway",
        "url": "https://runwayml.com/research/introducing-runway-gen-4",
        "publisher": "Runway"
      },
      {
        "title": "Google DeepMind",
        "url": "https://deepmind.google/models/veo/",
        "publisher": "Google DeepMind"
      },
      {
        "title": "Kling AI",
        "url": "https://kling.ai/",
        "publisher": "Kling AI"
      }
    ],
    "generation": {
      "model": "mock-ollama-writer",
      "promptVersion": "v1-editorial-2026-05-16",
      "generatedAt": "2026-05-16T06:00:00+07:00",
      "sourceClusterId": "cluster_ai_video_2026_05_16_001",
      "confidence": "medium"
    },
    "status": "published",
    "highlights": [
      {
        "text": "A single beautiful shot is not enough for trailers, ads, or longer content."
      },
      {
        "text": "The useful workflow locks character, camera, motion, and edit rhythm."
      },
      {
        "text": "Image-to-video is becoming the practical bridge between storyboard and motion."
      }
    ],
    "insightBlocks": [
      {
        "variant": "why",
        "title": "Why it matters",
        "text": "AI video becomes production-ready only when creators can control shot sequences. Continuity workflows reduce errors in character identity, lighting, camera behavior, and pacing."
      }
    ],
    "takeaway": {
      "title": "Creator takeaway",
      "text": "Do not start with unconstrained text-to-video. Build a still storyboard, lock references, prompt shot by shot, and review continuity before the final edit."
    },
    "sections": [
      {
        "id": "section-1",
        "heading": "The real issue is workflow",
        "blocks": [
          {
            "type": "paragraph",
            "text": "AI video has moved beyond the phase where a few impressive seconds are enough. For production teams, the harder problem is keeping a character, a space, and a story rhythm consistent across multiple shots."
          }
        ]
      },
      {
        "id": "section-2",
        "heading": "How production is changing",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Recent updates point in the same direction: smoother motion, better camera understanding, and stronger reference support. But those improvements expose the old weakness of AI video: continuity. A good shot does not become a film if the next shot changes the character's face, lighting, or pacing."
          }
        ]
      },
      {
        "id": "section-3",
        "heading": "Risks to control",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The workflow worth learning starts with still storyboards. Creators lock the character with references, define lens and camera movement per shot, then use image-to-video to add motion. A video prompt should specify subject, action, camera, motion direction, duration, and constraints the model should not break."
          },
          {
            "type": "media",
            "mediaType": "video",
            "src": "https://d3phaj0sisr2ct.cloudfront.net/site/content/videos/RW_HEADER_V2-2.mp4",
            "alt": "Runway Gen-4 official video demo",
            "caption": "Video demo chính thức Runway Gen-4 — minh họa world consistency.",
            "credit": "Runway",
            "sourceUrl": "https://runwayml.com/research/introducing-runway-gen-4",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-4",
        "heading": "What creators should do",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This matters most for trailers, ads, historical videos, and education content. Those formats need consistency more than surprise. A strong prompt system should make the model less creative in the wrong places."
          },
          {
            "type": "media",
            "mediaType": "video",
            "src": "https://storage.googleapis.com/gdm-deepmind-com-prod-public/media/media/veo__veo-3__off-road.mp4",
            "alt": "Google DeepMind Veo sample video",
            "caption": "Sample video chính thức Google DeepMind Veo.",
            "credit": "Google DeepMind",
            "sourceUrl": "https://deepmind.google/models/veo/",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-5",
        "heading": "Practical conclusion",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The strong read: in AI video, the winner will not be the person with the prettiest prompt. It will be the team with a pipeline that preserves continuity from reference to final edit."
          },
          {
            "type": "media",
            "mediaType": "video",
            "src": "https://v16-kling.klingai.com/kos/s101/nlav112918/kling-website/page1-v3-1.mp4",
            "alt": "Kling AI official video demo",
            "caption": "Video demo chính thức Kling AI — motion-first AI video workflow.",
            "credit": "Kling AI",
            "sourceUrl": "https://kling.ai/",
            "placement": "after-paragraph"
          }
        ]
      }
    ],
    "heroMedia": {
      "type": "image",
      "src": "https://runwayml.com/research/opengraph-image.jpg?opengraph-image.09drcy~~qw43q.jpg",
      "alt": "AI video is moving from beautiful shots to continuity workflows",
      "caption": "As models improve, the advantage shifts from one clever prompt to controlling characters, camera, and editing rhythm across many shots.",
      "credit": "Runway Blog",
      "sourceUrl": "https://runwayml.com/research"
    }
  },
  {
    "id": "art_2026_05_16_ai_vibe_coding_001_vi",
    "slug": "vibe-coding-can-guardrails-de-code-khong-vo-kien-truc",
    "lang": "vi",
    "category": "ai-vibe-coding",
    "title": "Vibe coding cần guardrails để không làm vỡ kiến trúc sản phẩm",
    "subtitle": "AI coding tool giúp ship nhanh hơn, nhưng lợi ích thật chỉ xuất hiện khi project có scope, test và ranh giới module đủ rõ.",
    "tldr": [
      "AI coding tăng tốc tốt nhất khi task nhỏ và contract rõ.",
      "Không có test và module boundary, vibe coding dễ tạo nợ kỹ thuật rất nhanh.",
      "Builder nên dùng AI như pair engineer, không phải người thay thế kiến trúc."
    ],
    "bodyMarkdown": "Vibe coding làm cảm giác build app trở nên nhanh hơn rất nhiều. Một yêu cầu ngắn có thể sinh ra component, route, API hoặc test trong vài phút. Nhưng tốc độ đó có mặt trái: nếu project không có ranh giới rõ, AI sẽ vá theo bề mặt và làm kiến trúc lệch dần.\n\nCác tool coding hiện nay mạnh ở việc đọc context, chỉnh nhiều file và đề xuất patch. Điểm yếu nằm ở yêu cầu mơ hồ. Khi user chỉ nói 'làm cho đẹp hơn' hoặc 'fix cái này', model có thể chọn cách nhanh nhất thay vì cách đúng với hệ thống.\n\nWorkflow tốt hơn là viết task như một contract nhỏ: input, output, file ownership, behavior cần giữ, test cần chạy và thứ không được đụng vào. Với cách này, AI trở thành pair engineer biết giới hạn, còn con người vẫn giữ quyết định kiến trúc.\n\nĐiểm đáng chú ý là các đội nhỏ có thể ship nhanh như đội lớn nếu biết tạo guardrails. README, design system, schema, test case và review checklist không phải thủ tục; chúng là hệ điều hành cho AI coding.\n\nNhận định thực tế: vibe coding không thay thế engineering discipline. Nó phóng đại discipline có sẵn. Project sạch sẽ được tăng tốc, project rối sẽ rối nhanh hơn.",
    "whyItMatters": "AI coding đang trở thành cách build sản phẩm mặc định của nhiều creator. Guardrails quyết định tốc độ đó tạo ra sản phẩm thật hay nợ kỹ thuật.",
    "creatorTakeaway": "Mỗi task nên có contract rõ: scope, file liên quan, hành vi phải giữ, test cần chạy và điều cấm đụng. Đó là cách dùng AI coding bền hơn.",
    "tags": [
      "vibe-coding",
      "cursor",
      "codex",
      "code-quality"
    ],
    "readingTime": 5,
    "publishedAt": "2026-05-16T06:20:00+07:00",
    "imageUrl": "https://cdn.sanity.io/images/4zrzovbb/website/6d4a0d28992ade92d6fa63646fd9c9d318245c6c-2400x1260.jpg",
    "sources": [
      {
        "title": "Cursor changelog",
        "url": "https://www.cursor.com/changelog",
        "publisher": "Cursor",
        "sourceName": "Cursor",
        "sourceType": "blog",
        "usedFor": "primary"
      },
      {
        "title": "GitHub Copilot product updates",
        "url": "https://github.blog/tag/github-copilot/",
        "publisher": "GitHub Blog",
        "sourceName": "GitHub Blog",
        "sourceType": "blog",
        "usedFor": "context"
      },
      {
        "title": "Claude Code workflow notes",
        "url": "https://www.anthropic.com/news",
        "publisher": "Anthropic News",
        "sourceName": "Anthropic News",
        "sourceType": "blog",
        "usedFor": "context"
      }
    ],
    "generation": {
      "model": "mock-ollama-writer",
      "promptVersion": "v1-editorial-2026-05-16",
      "generatedAt": "2026-05-16T06:00:00+07:00",
      "sourceClusterId": "cluster_ai_vibe_coding_2026_05_16_001",
      "confidence": "medium"
    },
    "status": "published",
    "highlights": [
      {
        "text": "AI coding tăng tốc tốt nhất khi task nhỏ và contract rõ."
      },
      {
        "text": "Không có test và module boundary, vibe coding dễ tạo nợ kỹ thuật rất nhanh."
      },
      {
        "text": "Builder nên dùng AI như pair engineer, không phải người thay thế kiến trúc."
      }
    ],
    "insightBlocks": [
      {
        "variant": "why",
        "title": "Vì sao đáng chú ý",
        "text": "AI coding đang trở thành cách build sản phẩm mặc định của nhiều creator. Guardrails quyết định tốc độ đó tạo ra sản phẩm thật hay nợ kỹ thuật."
      }
    ],
    "takeaway": {
      "title": "Gợi ý cho creator",
      "text": "Mỗi task nên có contract rõ: scope, file liên quan, hành vi phải giữ, test cần chạy và điều cấm đụng. Đó là cách dùng AI coding bền hơn."
    },
    "sections": [
      {
        "id": "section-1",
        "heading": "Vấn đề thật nằm ở workflow",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Vibe coding làm cảm giác build app trở nên nhanh hơn rất nhiều. Một yêu cầu ngắn có thể sinh ra component, route, API hoặc test trong vài phút. Nhưng tốc độ đó có mặt trái: nếu project không có ranh giới rõ, AI sẽ vá theo bề mặt và làm kiến trúc lệch dần."
          }
        ]
      },
      {
        "id": "section-2",
        "heading": "Cách production đang đổi",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Các tool coding hiện nay mạnh ở việc đọc context, chỉnh nhiều file và đề xuất patch. Điểm yếu nằm ở yêu cầu mơ hồ. Khi user chỉ nói 'làm cho đẹp hơn' hoặc 'fix cái này', model có thể chọn cách nhanh nhất thay vì cách đúng với hệ thống."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://github.blog/wp-content/uploads/2026/04/image-19.png?w=1600",
            "alt": "Cursor benchmark table",
            "caption": "Benchmark/source visual từ Cursor — vibe coding cần số đo và guardrails, không chỉ cảm giác.",
            "credit": "Cursor",
            "sourceUrl": "https://www.cursor.com/changelog",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-3",
        "heading": "Rủi ro cần kiểm soát",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Workflow tốt hơn là viết task như một contract nhỏ: input, output, file ownership, behavior cần giữ, test cần chạy và thứ không được đụng vào. Với cách này, AI trở thành pair engineer biết giới hạn, còn con người vẫn giữ quyết định kiến trúc."
          }
        ]
      },
      {
        "id": "section-4",
        "heading": "Creator nên làm gì",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Điểm đáng chú ý là các đội nhỏ có thể ship nhanh như đội lớn nếu biết tạo guardrails. README, design system, schema, test case và review checklist không phải thủ tục; chúng là hệ điều hành cho AI coding."
          }
        ]
      },
      {
        "id": "section-5",
        "heading": "Kết luận thực dụng",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Nhận định thực tế: vibe coding không thay thế engineering discipline. Nó phóng đại discipline có sẵn. Project sạch sẽ được tăng tốc, project rối sẽ rối nhanh hơn."
          }
        ]
      }
    ],
    "heroMedia": {
      "type": "image",
      "src": "https://cdn.sanity.io/images/4zrzovbb/website/6d4a0d28992ade92d6fa63646fd9c9d318245c6c-2400x1260.jpg",
      "alt": "Vibe coding cần guardrails để không làm vỡ kiến trúc sản phẩm",
      "caption": "AI coding tool giúp ship nhanh hơn, nhưng lợi ích thật chỉ xuất hiện khi project có scope, test và ranh giới module đủ rõ.",
      "credit": "Cursor",
      "sourceUrl": "https://www.cursor.com/changelog"
    }
  },
  {
    "id": "art_2026_05_16_ai_vibe_coding_001_en",
    "slug": "vibe-coding-needs-guardrails-or-it-breaks-product-architecture",
    "lang": "en",
    "category": "ai-vibe-coding",
    "title": "Vibe coding needs guardrails or it breaks product architecture",
    "subtitle": "AI coding tools can help teams ship faster, but the real benefit appears only when scope, tests, and module boundaries are clear.",
    "tldr": [
      "AI coding accelerates best when tasks are small and contracts are explicit.",
      "Without tests and module boundaries, speed quickly becomes technical debt.",
      "Builders should use AI as a pair engineer, not a substitute for architecture."
    ],
    "bodyMarkdown": "Vibe coding makes software feel dramatically faster. A short request can produce a component, route, API handler, or test in minutes. But that speed has a cost: without clear boundaries, the AI patches the surface and slowly distorts the architecture.\n\nCurrent coding tools are strong at reading context, editing multiple files, and proposing patches. The weak point is ambiguous intent. When the request is simply 'make it better' or 'fix this', the model may choose the fastest route instead of the one that fits the system.\n\nA better workflow is to write each task as a small contract: input, output, file ownership, behavior to preserve, tests to run, and areas that must not be touched. That turns the AI into a bounded pair engineer while humans keep architectural control.\n\nThe important point is that small teams can ship with the velocity of larger teams if they build guardrails. README files, design systems, schemas, test cases, and review checklists are not bureaucracy. They are the operating system for AI coding.\n\nThe practical read: vibe coding does not replace engineering discipline. It amplifies whatever discipline already exists. A clean project accelerates. A messy project becomes messy faster.",
    "whyItMatters": "AI coding is becoming a default way to build products. Guardrails decide whether that speed creates real software or just faster debt.",
    "creatorTakeaway": "Define each task with scope, related files, preserved behavior, required tests, and forbidden areas. That is the more durable way to use AI coding.",
    "tags": [
      "vibe-coding",
      "cursor",
      "codex",
      "code-quality"
    ],
    "readingTime": 5,
    "publishedAt": "2026-05-16T06:20:00+07:00",
    "imageUrl": "https://cdn.sanity.io/images/4zrzovbb/website/6d4a0d28992ade92d6fa63646fd9c9d318245c6c-2400x1260.jpg",
    "sources": [
      {
        "title": "Cursor changelog",
        "url": "https://www.cursor.com/changelog",
        "publisher": "Cursor",
        "sourceName": "Cursor",
        "sourceType": "blog",
        "usedFor": "primary"
      },
      {
        "title": "GitHub Copilot product updates",
        "url": "https://github.blog/tag/github-copilot/",
        "publisher": "GitHub Blog",
        "sourceName": "GitHub Blog",
        "sourceType": "blog",
        "usedFor": "context"
      },
      {
        "title": "Claude Code workflow notes",
        "url": "https://www.anthropic.com/news",
        "publisher": "Anthropic News",
        "sourceName": "Anthropic News",
        "sourceType": "blog",
        "usedFor": "context"
      }
    ],
    "generation": {
      "model": "mock-ollama-writer",
      "promptVersion": "v1-editorial-2026-05-16",
      "generatedAt": "2026-05-16T06:00:00+07:00",
      "sourceClusterId": "cluster_ai_vibe_coding_2026_05_16_001",
      "confidence": "medium"
    },
    "status": "published",
    "highlights": [
      {
        "text": "AI coding accelerates best when tasks are small and contracts are explicit."
      },
      {
        "text": "Without tests and module boundaries, speed quickly becomes technical debt."
      },
      {
        "text": "Builders should use AI as a pair engineer, not a substitute for architecture."
      }
    ],
    "insightBlocks": [
      {
        "variant": "why",
        "title": "Why it matters",
        "text": "AI coding is becoming a default way to build products. Guardrails decide whether that speed creates real software or just faster debt."
      }
    ],
    "takeaway": {
      "title": "Creator takeaway",
      "text": "Define each task with scope, related files, preserved behavior, required tests, and forbidden areas. That is the more durable way to use AI coding."
    },
    "sections": [
      {
        "id": "section-1",
        "heading": "The real issue is workflow",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Vibe coding makes software feel dramatically faster. A short request can produce a component, route, API handler, or test in minutes. But that speed has a cost: without clear boundaries, the AI patches the surface and slowly distorts the architecture."
          }
        ]
      },
      {
        "id": "section-2",
        "heading": "How production is changing",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Current coding tools are strong at reading context, editing multiple files, and proposing patches. The weak point is ambiguous intent. When the request is simply 'make it better' or 'fix this', the model may choose the fastest route instead of the one that fits the system."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://github.blog/wp-content/uploads/2026/04/image-19.png?w=1600",
            "alt": "Cursor benchmark table",
            "caption": "Benchmark/source visual từ Cursor — vibe coding cần số đo và guardrails, không chỉ cảm giác.",
            "credit": "Cursor",
            "sourceUrl": "https://www.cursor.com/changelog",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-3",
        "heading": "Risks to control",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A better workflow is to write each task as a small contract: input, output, file ownership, behavior to preserve, tests to run, and areas that must not be touched. That turns the AI into a bounded pair engineer while humans keep architectural control."
          }
        ]
      },
      {
        "id": "section-4",
        "heading": "What creators should do",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The important point is that small teams can ship with the velocity of larger teams if they build guardrails. README files, design systems, schemas, test cases, and review checklists are not bureaucracy. They are the operating system for AI coding."
          }
        ]
      },
      {
        "id": "section-5",
        "heading": "Practical conclusion",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The practical read: vibe coding does not replace engineering discipline. It amplifies whatever discipline already exists. A clean project accelerates. A messy project becomes messy faster."
          }
        ]
      }
    ],
    "heroMedia": {
      "type": "image",
      "src": "https://cdn.sanity.io/images/4zrzovbb/website/6d4a0d28992ade92d6fa63646fd9c9d318245c6c-2400x1260.jpg",
      "alt": "Vibe coding needs guardrails or it breaks product architecture",
      "caption": "AI coding tools can help teams ship faster, but the real benefit appears only when scope, tests, and module boundaries are clear.",
      "credit": "Cursor",
      "sourceUrl": "https://www.cursor.com/changelog"
    }
  },
  {
    "id": "art_2026_05_16_prompt_image_001_vi",
    "slug": "prompt-image-template-khoa-style-va-bo-cuc-cho-brand",
    "lang": "vi",
    "category": "prompt-image",
    "title": "Một prompt image template để khóa style và bố cục cho brand",
    "subtitle": "Prompt tốt cho hình ảnh không chỉ mô tả thứ cần tạo; nó chia rõ subject, composition, lighting, style và negative constraints.",
    "tldr": [
      "Prompt image nên tách thành các khối có thể tái sử dụng.",
      "Style lock cần đi cùng reference và negative constraints.",
      "Template tốt giúp tạo nhiều asset cùng brand mà ít lệch mood."
    ],
    "bodyMarkdown": "Một prompt image dùng được trong production nên giống brief thiết kế hơn là một câu mô tả dài. Nếu mục tiêu là giữ brand consistency, prompt cần có cấu trúc rõ để creator thay subject mà không làm vỡ style.\n\nTemplate thực dụng có thể gồm năm khối: subject, composition, lighting, style system và constraints. Subject trả lời ai hoặc cái gì xuất hiện. Composition nói khung hình, khoảng trống, góc camera và điểm nhấn. Lighting khóa mood. Style system gắn palette, chất liệu, lens hoặc reference. Constraints nói điều không được xuất hiện.\n\nVí dụ cấu trúc: 'Subject: founder standing beside a translucent AI dashboard. Composition: centered editorial portrait, 35mm lens, clean negative space on the left. Lighting: warm rim light, soft cinematic shadows. Style: AI Radar dark premium, amber glow, charcoal panels. Constraints: no extra text, no distorted hands, no logo imitation.'\n\nĐiều quan trọng là không dùng negative prompt như thùng rác chứa mọi thứ. Negative constraints nên ngắn và gắn với lỗi hay gặp của workflow đó. Nếu quá dài, prompt trở nên khó kiểm soát.\n\nTemplate này đặc biệt hữu ích cho thumbnail, hero image, article cover và social visual. Mỗi lần tạo asset mới, chỉ thay subject và góc kể chuyện; phần style system giữ nguyên.",
    "whyItMatters": "Prompt image có cấu trúc giúp creator tạo bộ asset nhất quán nhanh hơn, nhất là khi phải xuất nhiều hình cho cùng một publication hoặc brand.",
    "creatorTakeaway": "Lưu prompt thành module: subject, composition, lighting, style, constraints. Khi đổi bài viết, chỉ đổi subject và intent, giữ style module cố định.",
    "tags": [
      "prompt-image",
      "style-lock",
      "composition",
      "template"
    ],
    "readingTime": 4,
    "publishedAt": "2026-05-16T06:20:00+07:00",
    "imageUrl": "https://yt3.googleusercontent.com/YRGwKgejKhWyjTkDvi7D4kmXlfyM4Yg5flspybpJ_sah44A-h4N_HWRdyNOEGXnR91rd2-VeYhI=s900-c-k-c0x00ffffff-no-rj",
    "sources": [
      {
        "title": "Creator prompt breakdowns for style consistency",
        "url": "https://www.youtube.com/@PromptMuse",
        "publisher": "Prompt Muse",
        "sourceName": "Prompt Muse",
        "sourceType": "youtube",
        "usedFor": "primary"
      },
      {
        "title": "Stable Diffusion reference image techniques",
        "url": "https://www.reddit.com/r/StableDiffusion/",
        "publisher": "r/StableDiffusion",
        "sourceName": "r/StableDiffusion",
        "sourceType": "reddit",
        "usedFor": "discussion"
      },
      {
        "title": "r/midjourney",
        "url": "https://www.reddit.com/r/midjourney/comments/1tj8d6w/warrior/",
        "publisher": "r/midjourney"
      }
    ],
    "generation": {
      "model": "mock-ollama-writer",
      "promptVersion": "v1-editorial-2026-05-16",
      "generatedAt": "2026-05-16T06:00:00+07:00",
      "sourceClusterId": "cluster_prompt_image_2026_05_16_001",
      "confidence": "medium"
    },
    "status": "published",
    "highlights": [
      {
        "text": "Prompt image nên tách thành các khối có thể tái sử dụng."
      },
      {
        "text": "Style lock cần đi cùng reference và negative constraints."
      },
      {
        "text": "Template tốt giúp tạo nhiều asset cùng brand mà ít lệch mood."
      }
    ],
    "insightBlocks": [
      {
        "variant": "why",
        "title": "Vì sao đáng chú ý",
        "text": "Prompt image có cấu trúc giúp creator tạo bộ asset nhất quán nhanh hơn, nhất là khi phải xuất nhiều hình cho cùng một publication hoặc brand."
      }
    ],
    "takeaway": {
      "title": "Gợi ý cho creator",
      "text": "Lưu prompt thành module: subject, composition, lighting, style, constraints. Khi đổi bài viết, chỉ đổi subject và intent, giữ style module cố định."
    },
    "sections": [
      {
        "id": "section-1",
        "heading": "Vấn đề thật nằm ở workflow",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Một prompt image dùng được trong production nên giống brief thiết kế hơn là một câu mô tả dài. Nếu mục tiêu là giữ brand consistency, prompt cần có cấu trúc rõ để creator thay subject mà không làm vỡ style."
          }
        ]
      },
      {
        "id": "section-2",
        "heading": "Cách production đang đổi",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Template thực dụng có thể gồm năm khối: subject, composition, lighting, style system và constraints. Subject trả lời ai hoặc cái gì xuất hiện. Composition nói khung hình, khoảng trống, góc camera và điểm nhấn. Lighting khóa mood. Style system gắn palette, chất liệu, lens hoặc reference. Constraints nói điều không được xuất hiện."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://i.ytimg.com/vi/3AdO1TAT2ts/frame0.jpg",
            "alt": "Prompt Muse YouTube frame",
            "caption": "Frame nguồn từ Prompt Muse — prompt image cần kiểm soát style/composition bằng ví dụ cụ thể.",
            "credit": "Prompt Muse",
            "sourceUrl": "https://www.youtube.com/@PromptMuse",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-3",
        "heading": "Rủi ro cần kiểm soát",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Ví dụ cấu trúc: 'Subject: founder standing beside a translucent AI dashboard. Composition: centered editorial portrait, 35mm lens, clean negative space on the left. Lighting: warm rim light, soft cinematic shadows. Style: AI Radar dark premium, amber glow, charcoal panels. Constraints: no extra text, no distorted hands, no logo imitation.'"
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://i.ytimg.com/vi/UQI0vOhc8uc/frame0.jpg",
            "alt": "Prompt Muse reference workflow frame",
            "caption": "Frame nguồn Prompt Muse cho workflow khóa style bằng reference.",
            "credit": "Prompt Muse",
            "sourceUrl": "https://www.youtube.com/@PromptMuse",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-4",
        "heading": "Creator nên làm gì",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Điều quan trọng là không dùng negative prompt như thùng rác chứa mọi thứ. Negative constraints nên ngắn và gắn với lỗi hay gặp của workflow đó. Nếu quá dài, prompt trở nên khó kiểm soát."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://i.redd.it/t80zyrhste2h1.jpeg",
            "alt": "Midjourney warrior source image",
            "caption": "Ảnh nguồn r/midjourney — ví dụ style/character prompt có visual rõ.",
            "credit": "r/midjourney",
            "sourceUrl": "https://www.reddit.com/r/midjourney/comments/1tj8d6w/warrior/",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-5",
        "heading": "Kết luận thực dụng",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Template này đặc biệt hữu ích cho thumbnail, hero image, article cover và social visual. Mỗi lần tạo asset mới, chỉ thay subject và góc kể chuyện; phần style system giữ nguyên."
          }
        ]
      }
    ],
    "heroMedia": {
      "type": "image",
      "src": "https://yt3.googleusercontent.com/YRGwKgejKhWyjTkDvi7D4kmXlfyM4Yg5flspybpJ_sah44A-h4N_HWRdyNOEGXnR91rd2-VeYhI=s900-c-k-c0x00ffffff-no-rj",
      "alt": "Một prompt image template để khóa style và bố cục cho brand",
      "caption": "Prompt tốt cho hình ảnh không chỉ mô tả thứ cần tạo; nó chia rõ subject, composition, lighting, style và negative constraints.",
      "credit": "Prompt Muse",
      "sourceUrl": "https://www.youtube.com/@PromptMuse"
    }
  },
  {
    "id": "art_2026_05_16_prompt_image_001_en",
    "slug": "an-image-prompt-template-for-brand-style-and-composition-lock",
    "lang": "en",
    "category": "prompt-image",
    "title": "An image prompt template for brand style and composition lock",
    "subtitle": "A production image prompt does more than describe the subject. It separates subject, composition, lighting, style, and negative constraints.",
    "tldr": [
      "Image prompts should be modular and reusable.",
      "Style lock works best with references and concise negative constraints.",
      "A good template helps create many assets without drifting away from the brand."
    ],
    "bodyMarkdown": "A production-ready image prompt should feel more like a design brief than a long descriptive sentence. If the goal is brand consistency, the structure must let creators change the subject without breaking the style.\n\nA useful template has five blocks: subject, composition, lighting, style system, and constraints. Subject defines who or what appears. Composition defines frame, spacing, camera angle, and emphasis. Lighting locks the mood. Style system attaches palette, material, lens, or references. Constraints define what must not appear.\n\nFor example: 'Subject: founder standing beside a translucent AI dashboard. Composition: centered editorial portrait, 35mm lens, clean negative space on the left. Lighting: warm rim light, soft cinematic shadows. Style: AI Radar dark premium, amber glow, charcoal panels. Constraints: no extra text, no distorted hands, no logo imitation.'\n\nThe key is not to treat negative prompts as a dumping ground. Negative constraints should be short and tied to known failure modes. If they become too long, the prompt becomes harder to control.\n\nThis structure is especially useful for thumbnails, hero images, article covers, and social visuals. For each new asset, change the subject and story angle while preserving the style system.",
    "whyItMatters": "Structured image prompts help creators produce consistent asset sets faster, especially when a publication or brand needs many visuals.",
    "creatorTakeaway": "Save prompts as modules: subject, composition, lighting, style, constraints. Change the subject and intent per article while keeping the style module stable.",
    "tags": [
      "prompt-image",
      "style-lock",
      "composition",
      "template"
    ],
    "readingTime": 4,
    "publishedAt": "2026-05-16T06:20:00+07:00",
    "imageUrl": "https://yt3.googleusercontent.com/YRGwKgejKhWyjTkDvi7D4kmXlfyM4Yg5flspybpJ_sah44A-h4N_HWRdyNOEGXnR91rd2-VeYhI=s900-c-k-c0x00ffffff-no-rj",
    "sources": [
      {
        "title": "Creator prompt breakdowns for style consistency",
        "url": "https://www.youtube.com/@PromptMuse",
        "publisher": "Prompt Muse",
        "sourceName": "Prompt Muse",
        "sourceType": "youtube",
        "usedFor": "primary"
      },
      {
        "title": "Stable Diffusion reference image techniques",
        "url": "https://www.reddit.com/r/StableDiffusion/",
        "publisher": "r/StableDiffusion",
        "sourceName": "r/StableDiffusion",
        "sourceType": "reddit",
        "usedFor": "discussion"
      },
      {
        "title": "r/midjourney",
        "url": "https://www.reddit.com/r/midjourney/comments/1tj8d6w/warrior/",
        "publisher": "r/midjourney"
      }
    ],
    "generation": {
      "model": "mock-ollama-writer",
      "promptVersion": "v1-editorial-2026-05-16",
      "generatedAt": "2026-05-16T06:00:00+07:00",
      "sourceClusterId": "cluster_prompt_image_2026_05_16_001",
      "confidence": "medium"
    },
    "status": "published",
    "highlights": [
      {
        "text": "Image prompts should be modular and reusable."
      },
      {
        "text": "Style lock works best with references and concise negative constraints."
      },
      {
        "text": "A good template helps create many assets without drifting away from the brand."
      }
    ],
    "insightBlocks": [
      {
        "variant": "why",
        "title": "Why it matters",
        "text": "Structured image prompts help creators produce consistent asset sets faster, especially when a publication or brand needs many visuals."
      }
    ],
    "takeaway": {
      "title": "Creator takeaway",
      "text": "Save prompts as modules: subject, composition, lighting, style, constraints. Change the subject and intent per article while keeping the style module stable."
    },
    "sections": [
      {
        "id": "section-1",
        "heading": "The real issue is workflow",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A production-ready image prompt should feel more like a design brief than a long descriptive sentence. If the goal is brand consistency, the structure must let creators change the subject without breaking the style."
          }
        ]
      },
      {
        "id": "section-2",
        "heading": "How production is changing",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A useful template has five blocks: subject, composition, lighting, style system, and constraints. Subject defines who or what appears. Composition defines frame, spacing, camera angle, and emphasis. Lighting locks the mood. Style system attaches palette, material, lens, or references. Constraints define what must not appear."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://i.ytimg.com/vi/3AdO1TAT2ts/frame0.jpg",
            "alt": "Prompt Muse YouTube frame",
            "caption": "Frame nguồn từ Prompt Muse — prompt image cần kiểm soát style/composition bằng ví dụ cụ thể.",
            "credit": "Prompt Muse",
            "sourceUrl": "https://www.youtube.com/@PromptMuse",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-3",
        "heading": "Risks to control",
        "blocks": [
          {
            "type": "paragraph",
            "text": "For example: 'Subject: founder standing beside a translucent AI dashboard. Composition: centered editorial portrait, 35mm lens, clean negative space on the left. Lighting: warm rim light, soft cinematic shadows. Style: AI Radar dark premium, amber glow, charcoal panels. Constraints: no extra text, no distorted hands, no logo imitation.'"
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://i.ytimg.com/vi/UQI0vOhc8uc/frame0.jpg",
            "alt": "Prompt Muse reference workflow frame",
            "caption": "Frame nguồn Prompt Muse cho workflow khóa style bằng reference.",
            "credit": "Prompt Muse",
            "sourceUrl": "https://www.youtube.com/@PromptMuse",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-4",
        "heading": "What creators should do",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The key is not to treat negative prompts as a dumping ground. Negative constraints should be short and tied to known failure modes. If they become too long, the prompt becomes harder to control."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://i.redd.it/t80zyrhste2h1.jpeg",
            "alt": "Midjourney warrior source image",
            "caption": "Ảnh nguồn r/midjourney — ví dụ style/character prompt có visual rõ.",
            "credit": "r/midjourney",
            "sourceUrl": "https://www.reddit.com/r/midjourney/comments/1tj8d6w/warrior/",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-5",
        "heading": "Practical conclusion",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This structure is especially useful for thumbnails, hero images, article covers, and social visuals. For each new asset, change the subject and story angle while preserving the style system."
          }
        ]
      }
    ],
    "heroMedia": {
      "type": "image",
      "src": "https://yt3.googleusercontent.com/YRGwKgejKhWyjTkDvi7D4kmXlfyM4Yg5flspybpJ_sah44A-h4N_HWRdyNOEGXnR91rd2-VeYhI=s900-c-k-c0x00ffffff-no-rj",
      "alt": "An image prompt template for brand style and composition lock",
      "caption": "A production image prompt does more than describe the subject. It separates subject, composition, lighting, style, and negative constraints.",
      "credit": "Prompt Muse",
      "sourceUrl": "https://www.youtube.com/@PromptMuse"
    }
  },
  {
    "id": "art_2026_05_16_prompt_video_001_vi",
    "slug": "prompt-video-shot-by-shot-cho-trailer-ai-ngan",
    "lang": "vi",
    "category": "prompt-video",
    "title": "Prompt video shot-by-shot cho một trailer AI ngắn",
    "subtitle": "Muốn video AI có nhịp dựng tốt, hãy viết prompt như shot list: mục tiêu cảnh, camera movement, motion direction và continuity lock.",
    "tldr": [
      "Prompt video nên đi theo từng shot thay vì một mô tả dài cho cả clip.",
      "Mỗi shot cần subject, action, camera, motion, duration và continuity note.",
      "Workflow này giúp trailer ngắn có nhịp và ít lỗi chuyển cảnh hơn."
    ],
    "bodyMarkdown": "Video prompt thường thất bại khi cố mô tả cả một bộ phim trong một đoạn văn. Model có thể tạo ra hình ảnh đẹp, nhưng nhịp dựng và logic cảnh dễ bị rối. Cách thực dụng hơn là viết prompt theo shot list.\n\nMột shot prompt nên có sáu phần: mục tiêu cảnh, chủ thể, hành động, camera movement, motion direction và continuity lock. Ví dụ: 'Shot 01, 4s: wide establishing shot of a neon AI newsroom, slow dolly-in, warm amber glow, same female editor silhouette from reference, no face change, no text overlays.'\n\nKhi nối nhiều shot, hãy giữ một số biến cố định: nhân vật, palette, lens, môi trường và tempo. Biến thay đổi nên là góc máy, khoảng cách, hành động hoặc điểm nhấn cảm xúc. Nếu mọi thứ đều thay đổi, video sẽ giống montage ngẫu nhiên hơn là trailer.\n\nImage-to-video giúp workflow này ổn hơn vì mỗi shot bắt đầu từ một frame đã kiểm soát. Creator có thể tạo storyboard trước, chọn frame tốt, rồi mới thêm motion.\n\nTakeaway quan trọng: prompt video tốt không cố khiến model tưởng tượng nhiều hơn. Nó giới hạn đúng thứ cần giữ và chỉ cho model sáng tạo trong vùng an toàn.",
    "whyItMatters": "Shot-by-shot prompting biến video AI từ thử nghiệm may rủi thành workflow có thể kiểm soát, phù hợp hơn cho trailer, TVC và content series.",
    "creatorTakeaway": "Viết prompt như shot list. Mỗi shot có duration, camera movement và continuity lock. Dùng storyboard ảnh làm anchor trước khi generate motion.",
    "tags": [
      "prompt-video",
      "shot-list",
      "camera-movement",
      "continuity"
    ],
    "readingTime": 4,
    "publishedAt": "2026-05-16T06:20:00+07:00",
    "imageUrl": "https://yt3.googleusercontent.com/U4AE38fpp0B35ULJQlb8XP1NnIL0Y6NmBiniM9z7qiaGA_Vg4qD_tAldiNq2_nxWv-LygmOOJQ=s900-c-k-c0x00ffffff-no-rj",
    "sources": [
      {
        "title": "Cinematic video prompt tutorials",
        "url": "https://www.youtube.com/@TheoreticallyMedia",
        "publisher": "Theoretically Media",
        "sourceName": "Theoretically Media",
        "sourceType": "youtube",
        "usedFor": "primary"
      },
      {
        "title": "Runway and Kling shot prompting discussion",
        "url": "https://www.reddit.com/r/MediaSynthesis/",
        "publisher": "r/MediaSynthesis",
        "sourceName": "r/MediaSynthesis",
        "sourceType": "reddit",
        "usedFor": "discussion"
      },
      {
        "title": "r/aivideo",
        "url": "https://www.reddit.com/r/aivideo/comments/1tih68d/the_odyssey_but_accurate_trailer_4k/",
        "publisher": "r/aivideo"
      }
    ],
    "generation": {
      "model": "mock-ollama-writer",
      "promptVersion": "v1-editorial-2026-05-16",
      "generatedAt": "2026-05-16T06:00:00+07:00",
      "sourceClusterId": "cluster_prompt_video_2026_05_16_001",
      "confidence": "medium"
    },
    "status": "published",
    "highlights": [
      {
        "text": "Prompt video nên đi theo từng shot thay vì một mô tả dài cho cả clip."
      },
      {
        "text": "Mỗi shot cần subject, action, camera, motion, duration và continuity note."
      },
      {
        "text": "Workflow này giúp trailer ngắn có nhịp và ít lỗi chuyển cảnh hơn."
      }
    ],
    "insightBlocks": [
      {
        "variant": "why",
        "title": "Vì sao đáng chú ý",
        "text": "Shot-by-shot prompting biến video AI từ thử nghiệm may rủi thành workflow có thể kiểm soát, phù hợp hơn cho trailer, TVC và content series."
      }
    ],
    "takeaway": {
      "title": "Gợi ý cho creator",
      "text": "Viết prompt như shot list. Mỗi shot có duration, camera movement và continuity lock. Dùng storyboard ảnh làm anchor trước khi generate motion."
    },
    "sections": [
      {
        "id": "section-1",
        "heading": "Vấn đề thật nằm ở workflow",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Video prompt thường thất bại khi cố mô tả cả một bộ phim trong một đoạn văn. Model có thể tạo ra hình ảnh đẹp, nhưng nhịp dựng và logic cảnh dễ bị rối. Cách thực dụng hơn là viết prompt theo shot list."
          }
        ]
      },
      {
        "id": "section-2",
        "heading": "Cách production đang đổi",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Một shot prompt nên có sáu phần: mục tiêu cảnh, chủ thể, hành động, camera movement, motion direction và continuity lock. Ví dụ: 'Shot 01, 4s: wide establishing shot of a neon AI newsroom, slow dolly-in, warm amber glow, same female editor silhouette from reference, no face change, no text overlays.'"
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://external-preview.redd.it/Nzd4d2RnejBvOTJoMZcSEU7WXu84klbLxhb6XAQeF7gGC3dKNUsMwdE7y-RE.png?format=pjpg&auto=webp&s=985a8db94a1b2913dc2b701ae8a79cc3b3a4c460",
            "alt": "The Odyssey AI trailer source preview",
            "caption": "Preview từ source r/aivideo của trailer The Odyssey.",
            "credit": "r/aivideo",
            "sourceUrl": "https://www.reddit.com/r/aivideo/comments/1tih68d/the_odyssey_but_accurate_trailer_4k/",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-3",
        "heading": "Rủi ro cần kiểm soát",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Khi nối nhiều shot, hãy giữ một số biến cố định: nhân vật, palette, lens, môi trường và tempo. Biến thay đổi nên là góc máy, khoảng cách, hành động hoặc điểm nhấn cảm xúc. Nếu mọi thứ đều thay đổi, video sẽ giống montage ngẫu nhiên hơn là trailer."
          },
          {
            "type": "media",
            "mediaType": "video",
            "src": "https://v.redd.it/x3qa19z0o92h1/CMAF_1080.mp4?source=fallback",
            "alt": "The Odyssey AI trailer source video",
            "caption": "Video source từ r/aivideo — minh họa prompt video shot-by-shot trong bài.",
            "credit": "r/aivideo",
            "sourceUrl": "https://www.reddit.com/r/aivideo/comments/1tih68d/the_odyssey_but_accurate_trailer_4k/",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-4",
        "heading": "Creator nên làm gì",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Image-to-video giúp workflow này ổn hơn vì mỗi shot bắt đầu từ một frame đã kiểm soát. Creator có thể tạo storyboard trước, chọn frame tốt, rồi mới thêm motion."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://i.ytimg.com/vi/WMs79F8DF5Y/hqdefault.jpg",
            "alt": "Theoretically Media video prompt thumbnail",
            "caption": "Thumbnail nguồn Theoretically Media — prompt video cần thiết kế shot, camera và nhịp dựng.",
            "credit": "Theoretically Media",
            "sourceUrl": "https://www.youtube.com/@TheoreticallyMedia",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-5",
        "heading": "Kết luận thực dụng",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Takeaway quan trọng: prompt video tốt không cố khiến model tưởng tượng nhiều hơn. Nó giới hạn đúng thứ cần giữ và chỉ cho model sáng tạo trong vùng an toàn."
          }
        ]
      }
    ],
    "heroMedia": {
      "type": "image",
      "src": "https://yt3.googleusercontent.com/U4AE38fpp0B35ULJQlb8XP1NnIL0Y6NmBiniM9z7qiaGA_Vg4qD_tAldiNq2_nxWv-LygmOOJQ=s900-c-k-c0x00ffffff-no-rj",
      "alt": "Prompt video shot-by-shot cho một trailer AI ngắn",
      "caption": "Muốn video AI có nhịp dựng tốt, hãy viết prompt như shot list: mục tiêu cảnh, camera movement, motion direction và continuity lock.",
      "credit": "Theoretically Media",
      "sourceUrl": "https://www.youtube.com/@TheoreticallyMedia"
    }
  },
  {
    "id": "art_2026_05_16_prompt_video_001_en",
    "slug": "shot-by-shot-video-prompts-for-a-short-ai-trailer",
    "lang": "en",
    "category": "prompt-video",
    "title": "Shot-by-shot video prompts for a short AI trailer",
    "subtitle": "If you want AI video with better pacing, write prompts like a shot list: scene goal, camera movement, motion direction, and continuity lock.",
    "tldr": [
      "Video prompts should be written shot by shot instead of one long description.",
      "Each shot needs subject, action, camera, motion, duration, and continuity notes.",
      "This workflow gives short trailers stronger rhythm and fewer transition errors."
    ],
    "bodyMarkdown": "Video prompts often fail when they try to describe an entire film in one paragraph. The model may produce attractive frames, but pacing and scene logic become unstable. A more practical approach is to write prompts as a shot list.\n\nA shot prompt should contain six parts: scene goal, subject, action, camera movement, motion direction, and continuity lock. Example: 'Shot 01, 4s: wide establishing shot of a neon AI newsroom, slow dolly-in, warm amber glow, same female editor silhouette from reference, no face change, no text overlays.'\n\nAcross shots, keep several variables fixed: character, palette, lens, environment, and tempo. The variables that change should be camera angle, distance, action, or emotional focus. If everything changes at once, the video feels like a random montage rather than a trailer.\n\nImage-to-video makes this workflow more stable because each shot starts from a controlled frame. Creators can storyboard first, choose the best stills, and then add motion.\n\nThe useful takeaway: a good video prompt does not ask the model to imagine more. It limits what must stay stable and lets the model create only inside a safe range.",
    "whyItMatters": "Shot-by-shot prompting turns AI video from a luck-based experiment into a controllable workflow for trailers, ads, and recurring content.",
    "creatorTakeaway": "Write prompts like a shot list. Each shot needs duration, camera movement, and continuity lock. Use still storyboards as anchors before generating motion.",
    "tags": [
      "prompt-video",
      "shot-list",
      "camera-movement",
      "continuity"
    ],
    "readingTime": 4,
    "publishedAt": "2026-05-16T06:20:00+07:00",
    "imageUrl": "https://yt3.googleusercontent.com/U4AE38fpp0B35ULJQlb8XP1NnIL0Y6NmBiniM9z7qiaGA_Vg4qD_tAldiNq2_nxWv-LygmOOJQ=s900-c-k-c0x00ffffff-no-rj",
    "sources": [
      {
        "title": "Cinematic video prompt tutorials",
        "url": "https://www.youtube.com/@TheoreticallyMedia",
        "publisher": "Theoretically Media",
        "sourceName": "Theoretically Media",
        "sourceType": "youtube",
        "usedFor": "primary"
      },
      {
        "title": "Runway and Kling shot prompting discussion",
        "url": "https://www.reddit.com/r/MediaSynthesis/",
        "publisher": "r/MediaSynthesis",
        "sourceName": "r/MediaSynthesis",
        "sourceType": "reddit",
        "usedFor": "discussion"
      },
      {
        "title": "r/aivideo",
        "url": "https://www.reddit.com/r/aivideo/comments/1tih68d/the_odyssey_but_accurate_trailer_4k/",
        "publisher": "r/aivideo"
      }
    ],
    "generation": {
      "model": "mock-ollama-writer",
      "promptVersion": "v1-editorial-2026-05-16",
      "generatedAt": "2026-05-16T06:00:00+07:00",
      "sourceClusterId": "cluster_prompt_video_2026_05_16_001",
      "confidence": "medium"
    },
    "status": "published",
    "highlights": [
      {
        "text": "Video prompts should be written shot by shot instead of one long description."
      },
      {
        "text": "Each shot needs subject, action, camera, motion, duration, and continuity notes."
      },
      {
        "text": "This workflow gives short trailers stronger rhythm and fewer transition errors."
      }
    ],
    "insightBlocks": [
      {
        "variant": "why",
        "title": "Why it matters",
        "text": "Shot-by-shot prompting turns AI video from a luck-based experiment into a controllable workflow for trailers, ads, and recurring content."
      }
    ],
    "takeaway": {
      "title": "Creator takeaway",
      "text": "Write prompts like a shot list. Each shot needs duration, camera movement, and continuity lock. Use still storyboards as anchors before generating motion."
    },
    "sections": [
      {
        "id": "section-1",
        "heading": "The real issue is workflow",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Video prompts often fail when they try to describe an entire film in one paragraph. The model may produce attractive frames, but pacing and scene logic become unstable. A more practical approach is to write prompts as a shot list."
          }
        ]
      },
      {
        "id": "section-2",
        "heading": "How production is changing",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A shot prompt should contain six parts: scene goal, subject, action, camera movement, motion direction, and continuity lock. Example: 'Shot 01, 4s: wide establishing shot of a neon AI newsroom, slow dolly-in, warm amber glow, same female editor silhouette from reference, no face change, no text overlays.'"
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://external-preview.redd.it/Nzd4d2RnejBvOTJoMZcSEU7WXu84klbLxhb6XAQeF7gGC3dKNUsMwdE7y-RE.png?format=pjpg&auto=webp&s=985a8db94a1b2913dc2b701ae8a79cc3b3a4c460",
            "alt": "The Odyssey AI trailer source preview",
            "caption": "Preview từ source r/aivideo của trailer The Odyssey.",
            "credit": "r/aivideo",
            "sourceUrl": "https://www.reddit.com/r/aivideo/comments/1tih68d/the_odyssey_but_accurate_trailer_4k/",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-3",
        "heading": "Risks to control",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Across shots, keep several variables fixed: character, palette, lens, environment, and tempo. The variables that change should be camera angle, distance, action, or emotional focus. If everything changes at once, the video feels like a random montage rather than a trailer."
          },
          {
            "type": "media",
            "mediaType": "video",
            "src": "https://v.redd.it/x3qa19z0o92h1/CMAF_1080.mp4?source=fallback",
            "alt": "The Odyssey AI trailer source video",
            "caption": "Video source từ r/aivideo — minh họa prompt video shot-by-shot trong bài.",
            "credit": "r/aivideo",
            "sourceUrl": "https://www.reddit.com/r/aivideo/comments/1tih68d/the_odyssey_but_accurate_trailer_4k/",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-4",
        "heading": "What creators should do",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Image-to-video makes this workflow more stable because each shot starts from a controlled frame. Creators can storyboard first, choose the best stills, and then add motion."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://i.ytimg.com/vi/WMs79F8DF5Y/hqdefault.jpg",
            "alt": "Theoretically Media video prompt thumbnail",
            "caption": "Thumbnail nguồn Theoretically Media — prompt video cần thiết kế shot, camera và nhịp dựng.",
            "credit": "Theoretically Media",
            "sourceUrl": "https://www.youtube.com/@TheoreticallyMedia",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "section-5",
        "heading": "Practical conclusion",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The useful takeaway: a good video prompt does not ask the model to imagine more. It limits what must stay stable and lets the model create only inside a safe range."
          }
        ]
      }
    ],
    "heroMedia": {
      "type": "image",
      "src": "https://yt3.googleusercontent.com/U4AE38fpp0B35ULJQlb8XP1NnIL0Y6NmBiniM9z7qiaGA_Vg4qD_tAldiNq2_nxWv-LygmOOJQ=s900-c-k-c0x00ffffff-no-rj",
      "alt": "Shot-by-shot video prompts for a short AI trailer",
      "caption": "If you want AI video with better pacing, write prompts like a shot list: scene goal, camera movement, motion direction, and continuity lock.",
      "credit": "Theoretically Media",
      "sourceUrl": "https://www.youtube.com/@TheoreticallyMedia"
    }
  },
  {
    "id": "art_2026_05_21_google_io_2026_ai_update_vi",
    "slug": "google-io-2026-gemini-omni-antigravity-ai-search",
    "lang": "vi",
    "status": "published",
    "category": "ai-agentic",
    "title": "Google I/O 2026: Gemini Omni, Antigravity và cú bẻ lái sang AI agent",
    "subtitle": "Google không chỉ ra thêm model mới. Họ đang nhét agent vào Search, coding, Cloud, Workspace và video generation — tức là biến AI từ ô chat thành lớp vận hành.",
    "publishedAt": "2026-05-21T20:51:53+07:00",
    "readingTime": 11,
    "tags": [
      "Google I/O 2026",
      "Gemini 3.5",
      "Gemini Omni",
      "Antigravity",
      "AI Search",
      "agentic AI",
      "Veo"
    ],
    "imageUrl": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/100_things_Social.width-1300.png",
    "heroMedia": {
      "type": "image",
      "src": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/100_things_Social.width-1300.png",
      "alt": "Google I/O 2026 AI announcements official hero image",
      "caption": "Google gom gần như toàn bộ I/O 2026 quanh một trục: Gemini + agent + multimodal creation.",
      "credit": "Google Blog",
      "sourceUrl": "https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/"
    },
    "highlights": [
      {
        "text": "Google công bố Gemini 3.5 Flash, Gemini Omni, Antigravity 2.0, Managed Agents, AI Search agents, Gemini Spark, Workspace AI và nhiều lớp media/provenance mới."
      },
      {
        "text": "Điểm đáng chú ý không phải “thêm chatbot”, mà là Google đang đưa agent vào nơi có sẵn distribution: Search, Android Studio, AI Studio, Cloud, Workspace, YouTube và Gemini app."
      },
      {
        "text": "Với creator, Gemini Omni + Flow + YouTube Shorts Remix là mảng đáng nhìn nhất: video generation bắt đầu có editing, reference, voice/avatar và SynthID mặc định."
      },
      {
        "text": "Với builder, Antigravity 2.0, Managed Agents API, WebMCP và Android CLI là tín hiệu Google muốn biến agent thành hạ tầng phát triển phần mềm chứ không chỉ demo browser."
      }
    ],
    "sections": [
      {
        "id": "hook",
        "heading": "Google không ra “một AI mới”. Google ra một lớp vận hành mới",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Nếu chỉ đọc headline kiểu “Google ra Gemini mới”, sẽ bỏ lỡ chuyện chính. Google I/O 2026 là một cú gom quân: model, Search, Cloud, Workspace, YouTube, Android, developer tool và video generation được buộc vào cùng một hướng — AI không còn là ô chat đứng riêng, mà thành lớp vận hành chạy bên dưới sản phẩm."
          },
          {
            "type": "paragraph",
            "text": "Từ góc nhìn production, đây là điểm đáng chú ý: Google không cần thắng bằng một model benchmark đẹp nhất trong một ngày. Họ có Search, Gmail, Docs, Android, Chrome, YouTube, Cloud. Nếu agent chen được vào những điểm chạm đó, creator và builder sẽ gặp AI không phải trong một app riêng, mà ngay tại nơi đang làm việc."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/SundarKeynote_tempsocial.width-1300.png",
            "alt": "Sundar Pichai Google I/O 2026 keynote social image",
            "caption": "Keynote chính thức của Sundar Pichai gọi đây là “agentic Gemini era” — không phải thêm một chatbot, mà là agent đi vào sản phẩm hằng ngày.",
            "credit": "Google Blog",
            "sourceUrl": "https://blog.google/innovation-and-ai/sundar-pichai-io-2026/",
            "placement": "after-paragraph"
          },
          {
            "type": "quote",
            "text": "AI Mode đã vượt 1 tỷ người dùng hằng tháng; Gemini app đạt hơn 900 triệu MAU; Google nói lượng token xử lý hằng tháng đã lên hơn 3,2 quadrillion.",
            "attribution": "Google I/O 2026 keynote / Google Blog"
          }
        ]
      },
      {
        "id": "model-layer",
        "heading": "Gemini 3.5 Flash: model cho agent, không phải chỉ để chat nhanh",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Gemini 3.5 Flash là mảnh đầu tiên của dòng 3.5. Google định vị nó cho tác vụ dài hơi: coding, agentic workflow, xử lý công việc có nhiều bước, tạo UI, chạy tool và phối hợp nhiều ngữ cảnh. Nói thẳng: đây là model phục vụ operator, không chỉ phục vụ người hỏi đáp."
          },
          {
            "type": "paragraph",
            "text": "Google đưa vài con số đáng ghi: Terminal-Bench 2.1 đạt 76,2%, GDPval-AA 1656 Elo, MCP Atlas 83,6%, CharXiv 84,2%. Benchmark không phải chân lý, nhưng nhóm benchmark được chọn cho thấy Google đang khoe khả năng làm việc có hành động: terminal, công việc thực tế, MCP/tool-use và hiểu multimodal."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-3-5__keywordstatement__metacard__light.width-1300.png",
            "alt": "Gemini 3.5 official metacard",
            "caption": "Gemini 3.5 Flash được Google đặt làm nền cho nhiều tính năng agentic mới, từ Search đến developer tooling.",
            "credit": "Google Blog",
            "sourceUrl": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/",
            "placement": "after-paragraph"
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/gemini-3-5__benchmarks__light.gif",
            "alt": "Gemini 3.5 benchmark official chart",
            "caption": "Chart benchmark chính thức của Google cho Gemini 3.5 — phần đáng nhìn là nhóm benchmark coding/agentic, không phải điểm văn mẫu.",
            "credit": "Google Blog",
            "sourceUrl": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "creator-layer",
        "heading": "Gemini Omni: Google muốn ăn thẳng vào video workflow",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Gemini Omni là phần creator nên để mắt. Google mô tả đây là model “any output from any input”, bắt đầu bằng video. Nó không chỉ text-to-video, mà đi theo hướng trộn text, image, audio, video, editing, reference và world understanding. Nói cách khác: Google đang đi vào đúng chỗ Runway, Kling, Seedance, Veo và Flow đang tranh nhau — kiểm soát continuity và chỉnh sửa, không chỉ sinh một shot đẹp."
          },
          {
            "type": "paragraph",
            "text": "Trong Gemini app và Flow, Google nói người dùng có thể tạo/chỉnh video bằng hội thoại, đổi background, zoom cinematic, dùng ảnh/video từ camera roll, tạo avatar AI có ngoại hình và giọng nói giống người dùng. Nếu làm được ổn, đây là thứ đánh vào workflow social/short-form nhiều hơn là phim dài."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://lh3.googleusercontent.com/BXf7nFeF8HLOvRUH3C0Gm7vCGyIRUhaZ8oMkb_oFKW5RxrDWnsFx8wD-1kDG8z4vuwMgqDOmMn1YU9CxAewIKclglhcuUc_8RUfcfy7YaNTB03Sc3w=w1440-h810-n-nu",
            "alt": "Gemini Omni official visual",
            "caption": "Gemini Omni là lời tuyên chiến của Google ở mảng multimodal creation: input nào cũng có thể thành output media.",
            "credit": "Google Blog",
            "sourceUrl": "https://blog.google/innovation-and-ai/sundar-pichai-io-2026/",
            "placement": "after-paragraph"
          },
          {
            "type": "media",
            "mediaType": "video",
            "src": "https://storage.googleapis.com/gdm-deepmind-com-prod-public/media/media/veo__veo-3__off-road.mp4",
            "alt": "Google DeepMind Veo official sample video",
            "caption": "Sample video chính thức từ Google DeepMind Veo — đặt cạnh Gemini Omni cho thấy Google đang gom model video, app creation và distribution vào một stack.",
            "credit": "Google DeepMind",
            "sourceUrl": "https://deepmind.google/models/veo/",
            "placement": "after-paragraph"
          },
          {
            "type": "callout",
            "variant": "insight",
            "title": "Điểm creator cần nhớ",
            "text": "Nếu Gemini Omni/Flow đi đúng hướng, prompt video sẽ bớt là “viết một câu thần chú”, và chuyển thành workflow: reference → shot → edit → voice/avatar → export → publish. Đúng chuẩn production hơn, nhưng cũng đòi hỏi người làm biết art direction."
          }
        ]
      },
      {
        "id": "search-agent",
        "heading": "Search giờ không chỉ trả lời — nó bắt đầu làm việc nền",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Google Search là mảng có lực kéo lớn nhất. AI Mode đã vượt 1 tỷ MAU, và Gemini 3.5 Flash trở thành model mặc định cho AI Mode. Nhưng thứ quan trọng hơn là “Search agents”: người dùng có thể tạo agent theo dõi thông tin, chạy nền 24/7, tổng hợp update và giúp hành động khi cần."
          },
          {
            "type": "paragraph",
            "text": "Nếu Search agents chạy tốt, hành vi search sẽ đổi. Trước đây: cần gì thì gõ. Sau này: giao cho agent theo dõi, khi có tín hiệu thì báo. Đây là thay đổi cực lớn với tin tức, shopping, booking, research và cả SEO. Nội dung không chỉ cần được người đọc thấy, mà còn phải được agent hiểu, trích dẫn và tin."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Search_AI_and_search_engine_v46_16x9_1.width-1300.jpg",
            "alt": "Google AI Search official hero image",
            "caption": "Google gọi đây là nâng cấp lớn nhất của Search box trong hơn 25 năm: input dài hơn, multimodal hơn, agentic hơn.",
            "credit": "Google Blog",
            "sourceUrl": "https://blog.google/products-and-platforms/products/search/search-io-2026/",
            "placement": "after-paragraph"
          },
          {
            "type": "media",
            "mediaType": "video",
            "src": "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_videos/information-agents-search.mp4",
            "alt": "Information agents in Google Search official demo",
            "caption": "Demo chính thức: information agents trong Search chạy nền và tổng hợp update thay cho việc người dùng tự check liên tục.",
            "credit": "Google Blog",
            "sourceUrl": "https://blog.google/products-and-platforms/products/search/search-io-2026/",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "builder-layer",
        "heading": "Antigravity 2.0, Managed Agents, WebMCP: Google đang chuẩn hóa agent cho builder",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Developer keynote mới là phần builder nên đọc kỹ. Google nâng Antigravity lên 2.0, thêm Antigravity CLI, subagents chuyên biệt, terminal sandboxing, credential masking, Git policy, rồi đưa Managed Agents vào Gemini API: một API call có thể dựng remote sandbox cho agent plan, dùng tool, chạy code, quản lý file và browse web."
          },
          {
            "type": "paragraph",
            "text": "Điểm này rất thực dụng. Agent fail nhiều không phải vì “model ngu” đơn thuần, mà vì môi trường chạy bừa: quyền quá rộng, không có sandbox, không có policy, không có audit. Google đang bán một stack agent có guardrail sẵn. Nếu làm đúng, đây là đường ngắn để doanh nghiệp dùng agent mà không tự build cả đống hạ tầng."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/image_5.original_ZJXwGYp.png",
            "alt": "Google Developers I/O 2026 keynote official image",
            "caption": "Developer keynote đặt trọng tâm vào agent-first development: Antigravity, Android CLI, AI Studio, Managed Agents và WebMCP.",
            "credit": "Google Developers Blog",
            "sourceUrl": "https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/",
            "placement": "after-paragraph"
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/GoogleForDevelopers-ComboIO-Wagta.2e16d0ba.fill-1200x600_984jqJ0.png",
            "alt": "Managed Agents official image",
            "caption": "Managed Agents trong Gemini API: Google muốn biến agent sandbox thành dịch vụ nền, không phải project tự chế trong repo.",
            "credit": "Google Blog",
            "sourceUrl": "https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "enterprise-workspace",
        "heading": "Cloud và Workspace: agent cá nhân hoá sẽ là chiến trường thật",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Ở Cloud, Google nói rõ bài toán enterprise: Gemini Enterprise Agent Platform, Gemini Spark, Workspace AI, CodeMender, AI Content Detection API. Spark được mô tả như personal AI agent 24/7 cho doanh nghiệp. Workspace có Google Pics và voice feature trong Gmail, Docs, Keep."
          },
          {
            "type": "paragraph",
            "text": "Đây không hào nhoáng bằng video generation, nhưng có tiền. Doanh nghiệp không cần thêm một chatbot đẹp; họ cần agent đọc context, làm việc trong hệ thống có quyền, ghi log, không leak credential, và tạo output có thể kiểm tra. Google có lợi thế vì Workspace/Cloud đã là nơi dữ liệu nằm sẵn."
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://storage.googleapis.com/gweb-cloudblog-publish/images/1148-GC-IO-Header-GC-43-0519.max-2500x2500.jpg",
            "alt": "Google Cloud I/O AI announcements official image",
            "caption": "Google Cloud gom Gemini 3.5, Omni, Antigravity, Spark, Workspace AI và CodeMender vào thông điệp “agentic enterprise”.",
            "credit": "Google Cloud Blog",
            "sourceUrl": "https://cloud.google.com/blog/products/ai-machine-learning/innovations-from-google-io-26-on-google-cloud",
            "placement": "after-paragraph"
          },
          {
            "type": "media",
            "mediaType": "image",
            "src": "https://storage.googleapis.com/gweb-cloudblog-publish/images/Spark_task_-_done.max-2200x2200.png",
            "alt": "Gemini Spark task complete official image",
            "caption": "Gemini Spark được Google Cloud mô tả như agent cá nhân chạy 24/7 cho workflow doanh nghiệp.",
            "credit": "Google Cloud Blog",
            "sourceUrl": "https://cloud.google.com/blog/products/ai-machine-learning/innovations-from-google-io-26-on-google-cloud",
            "placement": "after-paragraph"
          }
        ]
      },
      {
        "id": "comparison",
        "heading": "Tóm tắt nhanh: cái nào đáng quan tâm nhất?",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Mảng",
              "Update chính",
              "Ý nghĩa thực tế",
              "Ai nên để ý"
            ],
            "rows": [
              [
                "Model",
                "Gemini 3.5 Flash, Gemini 3.5 Pro sắp ra",
                "Tối ưu cho agent/coding/task dài, không chỉ chat",
                "Builder, dev team, automation team"
              ],
              [
                "Media",
                "Gemini Omni + Flow + Veo stack",
                "Video generation đi gần hơn tới edit/reference/avatar/workflow",
                "Creator, studio, social video team"
              ],
              [
                "Search",
                "AI Mode + Search agents + new search box",
                "Search chuyển từ hỏi-đáp sang agent chạy nền",
                "Publisher, SEO, research team, commerce"
              ],
              [
                "Developer",
                "Antigravity 2.0, CLI, Managed Agents, WebMCP",
                "Agent có sandbox/tooling/policy rõ hơn",
                "AI engineer, product builder"
              ],
              [
                "Enterprise",
                "Gemini Spark, Workspace AI, CodeMender",
                "Agent đi vào dữ liệu và quy trình công ty",
                "Ops, IT, security, knowledge work"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Nhìn tổng thể, Google đang đánh theo kiểu “distribution trước, model sau”. Họ không cần thuyết phục người dùng tải thêm một app AI mới nếu agent nằm trong Search, Docs, Gmail, YouTube, Android Studio và Cloud Console. Đây là lợi thế OpenAI, Anthropic, Runway hay Perplexity không dễ copy."
          },
          {
            "type": "paragraph",
            "text": "Nhưng cũng đừng nuốt PR nguyên con. Agent 24/7 nghe rất hay, nhưng thực chiến sẽ vỡ ở permission, hallucination, stale context, audit log và chi phí. Bài toán không phải “agent có làm được demo không”, mà là “khi nó sai thì ai chịu trách nhiệm, rollback ra sao, có chứng cứ để kiểm tra không”."
          }
        ]
      },
      {
        "id": "takeaway-section",
        "heading": "Kết luận: creator và builder nên làm gì ngay?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Nếu làm media, hãy test Gemini Omni/Flow theo workflow thật: giữ nhân vật qua nhiều shot, dùng reference, edit lại shot lỗi, thêm voice/avatar, so thời gian với Runway/Kling/Seedance. Đừng chỉ prompt một clip đẹp rồi kết luận."
          },
          {
            "type": "paragraph",
            "text": "Nếu làm product/dev, hãy nhìn Antigravity và Managed Agents như một tín hiệu thiết kế: agent production phải có sandbox, credential masking, Git policy, tool permission và log. Không có mấy thứ đó thì chỉ là demo dễ cháy."
          },
          {
            "type": "paragraph",
            "text": "Nếu làm content/publisher, Search agents là cảnh báo sớm. Nội dung sắp không chỉ cạnh tranh để người đọc click, mà còn để agent chọn làm nguồn. Bài phải có dữ kiện rõ, nguồn thật, media thật, schema sạch và claim dễ trích dẫn."
          }
        ]
      }
    ],
    "insightBlocks": [
      {
        "variant": "analysis",
        "title": "Google đang bán hệ sinh thái, không bán một model",
        "text": "Sức mạnh của I/O 2026 nằm ở việc Google nối model vào distribution: Search, Workspace, Android, YouTube, Cloud và developer tooling. Đây là thứ làm update lần này nguy hiểm hơn một benchmark đơn lẻ."
      },
      {
        "variant": "risk",
        "title": "Agent càng sâu, trách nhiệm càng nặng",
        "text": "Search agents, Managed Agents và Spark đều chạm vào hành động thật. Nếu không có permission, audit, rollback và provenance, agent sẽ trở thành nguồn rủi ro vận hành."
      },
      {
        "variant": "opportunity",
        "title": "Creator có thêm một pipeline video đáng thử",
        "text": "Gemini Omni + Flow + Veo có thể mở ra workflow video hội thoại/reference/edit tốt hơn. Nhưng phải test continuity và controllability, không test bằng một clip viral."
      }
    ],
    "takeaway": {
      "title": "Checklist hành động",
      "items": [
        "Creator: test Gemini Omni/Flow bằng một scene 5 shot, có character reference và edit loop rõ.",
        "Builder: theo dõi Antigravity 2.0, Managed Agents API và WebMCP; đây là hướng agent infra đang chuẩn hóa.",
        "Publisher: chuẩn hóa source, schema, media credit và dữ kiện để Search agents dễ hiểu và trích dẫn.",
        "Team enterprise: đừng pilot agent nếu chưa có permission boundary, log, rollback và owner cho lỗi.",
        "Đừng bị PR làm mờ mắt: hãy đo bằng thời gian tiết kiệm, tỷ lệ output dùng được và số lỗi phải sửa tay."
      ]
    },
    "sources": [
      {
        "title": "100 things we announced at I/O 2026",
        "publisher": "Google Blog",
        "url": "https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/",
        "publishedAt": "2026-05-20"
      },
      {
        "title": "Google I/O 2026: Sundar Pichai’s opening keynote",
        "publisher": "Google Blog",
        "url": "https://blog.google/innovation-and-ai/sundar-pichai-io-2026/",
        "publishedAt": "2026-05-19"
      },
      {
        "title": "A new era for AI Search",
        "publisher": "Google Blog",
        "url": "https://blog.google/products-and-platforms/products/search/search-io-2026/",
        "publishedAt": "2026-05-19"
      },
      {
        "title": "All the news from the Google I/O 2026 Developer keynote",
        "publisher": "Google Developers Blog",
        "url": "https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/",
        "publishedAt": "2026-05-19"
      },
      {
        "title": "Innovations from Google I/O 26 on Google Cloud",
        "publisher": "Google Cloud Blog",
        "url": "https://cloud.google.com/blog/products/ai-machine-learning/innovations-from-google-io-26-on-google-cloud",
        "publishedAt": "2026-05-19"
      },
      {
        "title": "Gemini 3.5: frontier intelligence with action",
        "publisher": "Google Blog",
        "url": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/",
        "publishedAt": "2026-05-19"
      },
      {
        "title": "Veo 3.1 — Google DeepMind",
        "publisher": "Google DeepMind",
        "url": "https://deepmind.google/models/veo/",
        "publishedAt": "2026-05-21"
      }
    ],
    "generation": {
      "model": "manual-editorial-gpt-5.5",
      "promptVersion": "google-io-2026-source-media-v1",
      "generatedAt": "2026-05-21T20:51:53+07:00",
      "sourceClusterId": "cluster_google_io_2026_ai_updates_2026_05_21",
      "confidence": "high"
    },
    "sourceCount": 7,
    "author": "AI Radar"
  }
];
