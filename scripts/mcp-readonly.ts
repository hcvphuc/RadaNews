import { readFile } from "node:fs/promises";
import { createInterface } from "node:readline";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

type JsonRpcRequest = {
  id?: string | number;
  method?: string;
  params?: {
    name?: string;
    arguments?: Record<string, unknown>;
  };
};

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const searchIndexPath = resolve(root, "apps/web/public/data/search/articles.json");
const runtimeManifestPath = resolve(root, "apps/web/public/data/agent/runtime/training-manifest.json");

const tools = [
  {
    name: "search_articles",
    description: "Search AI Radar public articles by text query. Read-only.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" },
        lang: { type: "string", enum: ["vi", "en"] },
        limit: { type: "number" }
      },
      required: ["query"]
    }
  },
  {
    name: "list_articles",
    description: "List AI Radar public article metadata. Read-only.",
    inputSchema: {
      type: "object",
      properties: {
        lang: { type: "string", enum: ["vi", "en"] },
        category: { type: "string" },
        limit: { type: "number" }
      }
    }
  },
  {
    name: "get_runtime_manifest",
    description: "Read the latest runtime agent export manifest. Read-only.",
    inputSchema: {
      type: "object",
      properties: {}
    }
  }
];

const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });

rl.on("line", async (line) => {
  if (!line.trim()) return;

  try {
    const request = JSON.parse(line) as JsonRpcRequest;
    const result = await handleRequest(request);
    respond(request.id, result);
  } catch (error) {
    respond(undefined, undefined, error instanceof Error ? error.message : String(error));
  }
});

async function handleRequest(request: JsonRpcRequest) {
  if (request.method === "initialize") {
    return {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "ai-radar-readonly", version: "0.1.0" }
    };
  }

  if (request.method === "tools/list") {
    return { tools };
  }

  if (request.method === "tools/call") {
    return callTool(request.params?.name, request.params?.arguments ?? {});
  }

  throw new Error(`Unsupported method: ${request.method}`);
}

async function callTool(name: string | undefined, args: Record<string, unknown>) {
  if (name === "search_articles") {
    const rows = await readSearchRows();
    const query = String(args.query ?? "").toLowerCase().trim();
    const lang = typeof args.lang === "string" ? args.lang : undefined;
    const limit = typeof args.limit === "number" ? args.limit : 8;
    const results = rows
      .filter((row) => !lang || row.lang === lang)
      .map((row) => ({ row, score: scoreRow(row, query) }))
      .filter((match) => match.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((match) => match.row);

    return textResult(JSON.stringify(results, null, 2));
  }

  if (name === "list_articles") {
    const rows = await readSearchRows();
    const lang = typeof args.lang === "string" ? args.lang : undefined;
    const category = typeof args.category === "string" ? args.category : undefined;
    const limit = typeof args.limit === "number" ? args.limit : 20;
    const results = rows
      .filter((row) => !lang || row.lang === lang)
      .filter((row) => !category || row.category === category)
      .slice(0, limit)
      .map(({ body, ...row }) => row);

    return textResult(JSON.stringify(results, null, 2));
  }

  if (name === "get_runtime_manifest") {
    return textResult(await readFile(runtimeManifestPath, "utf8"));
  }

  throw new Error(`Unknown tool: ${name}`);
}

async function readSearchRows() {
  return JSON.parse(await readFile(searchIndexPath, "utf8")) as Array<Record<string, string | string[] | number>>;
}

function scoreRow(row: Record<string, string | string[] | number>, query: string) {
  const terms = query.split(/\s+/).filter(Boolean);
  const text = [row.title, row.subtitle, row.category, ...(Array.isArray(row.tags) ? row.tags : []), row.body]
    .join(" ")
    .toLowerCase();

  return terms.reduce((sum, term) => sum + (text.includes(term) ? 1 : 0), 0);
}

function textResult(text: string) {
  return {
    content: [{ type: "text", text }]
  };
}

function respond(id: JsonRpcRequest["id"], result?: unknown, message?: string) {
  const payload = message
    ? { jsonrpc: "2.0", id: id ?? null, error: { code: -32000, message } }
    : { jsonrpc: "2.0", id: id ?? null, result };
  process.stdout.write(`${JSON.stringify(payload)}\n`);
}
