import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const articlesPath = resolve(root, "apps/web/src/data/articles.ts");

function slugify(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}

function stripMdHeaders(text: string): string {
  return text.replace(/^#{1,4}\s+/gm, "").replace(/\*\*/g, "").replace(/\*/g, "");
}

function parseSections(bodyMd: string) {
  const sections: any[] = [];
  const lines = bodyMd.split("\n");
  let current: any = null;
  let paragraphs: string[] = [];

  function flush() {
    if (paragraphs.length === 0) return;
    const text = paragraphs.join("\n").trim();
    if (text && current) {
      const listItems = text.split("\n").map(l => l.trim()).filter(l => l.startsWith("*   ") || l.startsWith("- ") || l.startsWith("* "));
      if (listItems.length >= 2 && listItems.length === text.split("\n").filter(l => l.trim()).length) {
        current.blocks.push({ type: "list", items: listItems.map(l => stripMdHeaders(l.replace(/^[\*\-\s]+/, ""))) });
      } else {
        current.blocks.push({ type: "paragraph", text: stripMdHeaders(text) });
      }
    }
    paragraphs = [];
  }

  for (const line of lines) {
    const h3 = line.match(/^### (.+)/);
    if (h3) {
      flush();
      if (current && current.blocks.length > 0) sections.push(current);
      current = { id: "sec_" + slugify(h3[1]), heading: stripMdHeaders(h3[1]), blocks: [] };
    } else if (!line.trim()) {
      flush();
    } else {
      paragraphs.push(line);
    }
  }
  flush();
  if (current && current.blocks.length > 0) sections.push(current);
  if (sections.length === 0 && bodyMd.trim()) {
    sections.push({ id: "sec_main", heading: "Main Analysis", blocks: [{ type: "paragraph", text: stripMdHeaders(bodyMd.trim()) }] });
  }
  return sections;
}

async function main() {
  console.log("Reading articles.ts...");
  const content = await readFile(articlesPath, "utf-8");

  // Build a converter that processes each article object inside the array
  // We'll do a targeted find-replace on each article block
  // Simpler: parse the TS, modify each article, rebuild

  // Extract the articles array
  const arrayMatch = content.match(/export const articles: Article\[\] = (\[[\s\S]*?\]);/);
  if (!arrayMatch) {
    console.error("Could not find articles array in file");
    process.exit(1);
  }

  let newContent = content;

  // For each article, add heroMedia, highlights, sections, insightBlocks, takeaway
  // Pattern: each article starts with { on its own line (after array items)
  // Strategy: find each `imageUrl: "..."` and replace with heroMedia block
  // Also transform tldr -> highlights, whyItMatters -> insightBlocks, creatorTakeaway -> takeaway

  // Use regex to find each article block and transform it
  // Match: { id: "art_...", ...   to  }, (end of article)
  const articleRegex = /\{\s*\n\s*id: "([^"]+)",[\s\S]*?generation: generation\("([^"]+)"\),\s*\n\s*status: "published"\s*\n\s*\}/g;

  let match: RegExpExecArray | null;
  const replacements: { old: string; new: string }[] = [];

  while ((match = articleRegex.exec(content)) !== null) {
    const block = match[0];
    const articleId = match[1];

    // Extract fields
    const title = (block.match(/title: "([^"]+)"/)?.[1] || "").replace(/\\"/g, '"');
    const subtitle = (block.match(/subtitle:\s*"([^"]*)"(?:\s*\n)?/s)?.[1] || "").replace(/\\"/g, '"').replace(/\n\s*/g, " ").trim();
    const category = block.match(/category: "([^"]+)"/)?.[1] || "";
    const lang = block.match(/lang: "([^"]+)"/)?.[1] || "";
    const publishedAt = block.match(/publishedAt(?:,)?\s*\n/)?.[0]
      ? block.match(/publishedAt\s*=\s*"([^"]+)"/)?.[1]
      : block.match(/publishedAt,\s*\n/)?.[0]
        ? "2026-05-16T06:20:00+07:00"
        : "";

    // tldr array
    const tldrMatch = block.match(/tldr:\s*\[([\s\S]*?)\],/);
    let tldr: string[] = [];
    if (tldrMatch) {
      const tldrBlock = tldrMatch[1];
      const tldrLines = [...tldrBlock.matchAll(/"([^"]*)"/g)].map(m => m[1].replace(/\\"/g, '"'));
      tldr = tldrLines;
    }

    const bodyMd = (block.match(/bodyMarkdown:\s*"([\s\S]*?)(?:"\s*\n\s*whyItMatters|",\s*\n\s*whyItMatters)/s)?.[1] || "")
      .replace(/\\n/g, "\n").replace(/\\"/g, '"');

    const whyMatch = block.match(/whyItMatters:\s*"([\s\S]*?)",?\s*\n\s*creatorTakeaway/s);
    const whyText = whyMatch?.[1]?.replace(/\\n/g, "\n").replace(/\\"/g, '"') || "";

    const creatorMatch = block.match(/creatorTakeaway:\s*"([\s\S]*?)",?\s*\n\s*tags/s);
    const creatorText = creatorMatch?.[1]?.replace(/\\n/g, "\n").replace(/\\"/g, '"') || "";

    const tagsMatch = block.match(/tags:\s*\[([\s\S]*?)\]/);
    const tags = tagsMatch ? [...tagsMatch[1].matchAll(/"([^"]+)"/g)].map(m => m[1]) : [category];

    const readingTime = parseInt(block.match(/readingTime:\s*(\d+)/)?.[1] || "1");

    // sources
    const srcMatch = block.match(/sources:\s*(sources\.\w+)/);
    const srcKey = srcMatch?.[1] || "";

    // Build new article block
    const sections = parseSections(bodyMd);
    const highlights = tldr.filter(Boolean).map(t => ({ text: t }));
    const insightBlocks = whyText ? [{ title: "Vì sao đáng chú ý", text: whyText, variant: "analysis" }] : [];
    const takeaway = creatorText ? { title: "Creator / Builder Takeaway", text: creatorText } : undefined;
    const srcCount = srcKey ? (srcKey.includes("image") ? 3 : srcKey.includes("agent") ? 3 : srcKey.includes("video") ? 3 : srcKey.includes("coding") ? 3 : srcKey.includes("Prompt") ? 2 : 3) : 0;

    // Don't include heroMedia if no imageUrl (mock articles don't have)
    const newBlock = [
      `{`,
      `    id: "${articleId}",`,
      `    slug: "${block.match(/slug: "([^"]+)"/)?.[1] || ""}",`,
      `    lang: "${lang}",`,
      `    category: "${category}",`,
      `    status: "published",`,
      `    title: "${title.replace(/"/g, '\\"')}",`,
      `    subtitle: "${subtitle.replace(/"/g, '\\"')}",`,
      `    publishedAt: ${publishedAt ? `"${publishedAt}"` : 'publishedAt'},`,
      `    readingTime: ${readingTime},`,
      `    sourceCount: ${srcCount},`,
      `    tags: ${JSON.stringify(tags)},`,
      `    highlights: ${JSON.stringify(highlights)},`,
      `    sections: ${JSON.stringify(sections)},`,
      `    insightBlocks: ${JSON.stringify(insightBlocks)},`,
      ...(takeaway ? [`    takeaway: ${JSON.stringify(takeaway)},`] : []),
      `    sources: ${srcKey},`,
      `    generation: generation("${block.match(/generation: generation\("([^"]+)"\)/)?.[1] || ""}"),`,
      `  }`,
    ].join("\n");

    replacements.push({ old: block, new: newBlock });
  }

  // Apply replacements
  for (const { old, new: newBlock } of replacements) {
    newContent = newContent.replace(old, newBlock);
  }

  // Update the type of sources to match new Source interface
  // Change `sources.agent` to match new format — need to transform source objects too
  // The sources objects currently have { title, sourceName, url, sourceType, usedFor }
  // New format requires { title, publisher, url }
  // We'll add publisher field = sourceName in the source definitions

  // Transform source definitions at top of file
  newContent = newContent.replace(
    /sourceName: "([^"]+)",\s*\n\s*url: "([^"]+)",\s*\n\s*sourceType: "([^"]+)",\s*\n\s*usedFor: "([^"]+)"/g,
    'publisher: "$1",\n      url: "$2",\n      sourceType: "$3",\n      usedFor: "$4"'
  );

  // Change type annotation
  newContent = newContent.replace(
    /satisfies Record<string, Article\["sources"\]>/,
    'satisfies Record<string, { title: string; publisher: string; url: string; sourceType: string; usedFor: string }[]>'
  );

  await writeFile(articlesPath, newContent);
  console.log("Converted mock articles to new structured format");
}

main();
