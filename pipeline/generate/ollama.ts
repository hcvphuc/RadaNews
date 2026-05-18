type OllamaOptions = {
  system: string;
  prompt: string;
};

type OllamaResponse = {
  response?: string;
};

const DEFAULT_MODEL = "llama3.1:8b";
const DEFAULT_ENDPOINT = "http://127.0.0.1:11434";

export function ollamaModel() {
  return process.env.OLLAMA_MODEL || DEFAULT_MODEL;
}

export async function generateWithOllama(options: OllamaOptions): Promise<string | undefined> {
  if (process.env.AI_RADAR_USE_OLLAMA !== "true") return undefined;

  const endpoint = process.env.OLLAMA_ENDPOINT || DEFAULT_ENDPOINT;
  const response = await fetch(`${endpoint.replace(/\/$/, "")}/api/generate`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      model: ollamaModel(),
      system: options.system,
      prompt: options.prompt,
      stream: false,
      options: { temperature: 0.45 }
    }),
    signal: AbortSignal.timeout(60_000)
  });

  if (!response.ok) {
    throw new Error(`Ollama failed ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as OllamaResponse;
  return data.response?.trim();
}
