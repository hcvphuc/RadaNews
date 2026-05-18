import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const articlesPath = resolve(root, "apps/web/src/data/articles.ts");

interface Source {
  title: string;
  sourceName: string;
  url: string;
}

async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const resp = await fetch(url, { signal: AbortSignal.timeout(8000) });
    const html = await resp.text();
    const match = html.match(
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/
    );
    if (match) return match[1];
    // fallback: twitter:image
    const tw = html.match(
      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/
    );
    if (tw) return tw[1];
    return null;
  } catch {
    return null;
  }
}

async function main() {
  const content = await readFile(articlesPath, "utf-8");

  // Extract URL-to-image map
  const urlMap = new Map<string, string>();
  const urlRegex = /url:\s*["'](https?:\/\/[^"']+)["']/g;
  const uniqueUrls = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = urlRegex.exec(content)) !== null) {
    uniqueUrls.add(m[1]);
  }

  console.log(`Fetching og:image for ${uniqueUrls.size} unique URLs...`);
  let done = 0;
  for (const url of uniqueUrls) {
    const img = await fetchOgImage(url);
    if (img) {
      urlMap.set(url, img);
      console.log(`  [${++done}/${uniqueUrls.size}] ✓ ${url.slice(0, 60)} -> ${img.slice(0, 70)}`);
    } else {
      console.log(`  [${++done}/${uniqueUrls.size}] ✗ ${url.slice(0, 60)}`);
    }
  }

  if (urlMap.size === 0) {
    console.log("No og:images found. Nothing to backfill.");
    return;
  }

  // Insert imageUrl before sources field in each article object
  let newContent = content;
  // Group articles by their source URLs and match them
  // Simpler approach: insert imageUrl field before `sources:` inside each article literal
  const sourceRegex = /sources:\s*(sources\.\w+)/g;
  
  // Match each article block and find the first source URL to use as image
  // Pattern: each article starts with { id: "...", and has sources: sources.xxx
  const articleBlocks = content.split("generation: generation(");
  
  // For each article, find its sources.xxx, look up URLs, take first with image
  for (const [key, urls] of [
    ["sources.agent", [...uniqueUrls].filter(u => u.includes("langchain") || u.includes("anthropic") || u.includes("reddit.com/r/AI_Agents"))] as [string, string[]],
    ["sources.image", [...uniqueUrls].filter(u => u.includes("bfl.ai") || u.includes("replicate") || u.includes("reddit.com/r/comfyui") || u.includes("reddit.com/r/StableDiffusion"))],
    ["sources.video", [...uniqueUrls].filter(u => u.includes("runwayml") || u.includes("deepmind") || u.includes("reddit.com/r/aivideo"))],
    ["sources.coding", [...uniqueUrls].filter(u => u.includes("cursor.com") || u.includes("github.blog") || u.includes("anthropic"))],
    ["sources.promptImage", [...uniqueUrls].filter(u => u.includes("reddit.com/r/StableDiffusion") || u.includes("youtube.com/@PromptMuse"))],
    ["sources.promptVideo", [...uniqueUrls].filter(u => u.includes("youtube.com/@TheoreticallyMedia") || u.includes("reddit.com/r/MediaSynthesis"))],
  ] as const) {
    const imgUrl = urls.find(u => urlMap.has(u));
    if (imgUrl) {
      const img = urlMap.get(imgUrl)!;
      // Replace `sources: ${key}` with `imageUrl: "...", sources: ${key}`
      newContent = newContent.replace(
        new RegExp(`(sources:\\s*${key.replace('.', '\\.')})`, "g"),
        `imageUrl: "${img}",\n    $1`
      );
    }
  }

  await writeFile(articlesPath, newContent);
  console.log(`\nBackfilled imageUrl for articles using ${urlMap.size} og:images`);
}

main();
