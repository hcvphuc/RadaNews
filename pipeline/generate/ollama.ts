type ChatCompletionMessage = {
  role: "system" | "user";
  content: string;
};

type ChatCompletionResponse = {
  choices: {
    message: {
      content: string;
    };
  }[];
};

type GenerateResponse = {
  response?: string;
};

const ENDPOINT = "https://ollama.com/v1";
const MODEL = "gemma4:31b";

export function ollamaModel() {
  return MODEL;
}

export async function generateWithOllama(options: {
  system: string;
  prompt: string;
}): Promise<string | undefined> {
  const apiKey = process.env.OLLAMA_API_KEY;
  if (!apiKey) {
    console.error("[ollama] SKIPPED — OLLAMA_API_KEY not set");
    return undefined;
  }
  console.log("[ollama] OLLAMA_API_KEY found, calling API...");

  return generateWithChatCompletions(ENDPOINT, options, apiKey);
}

async function generateWithChatCompletions(
  endpoint: string,
  options: { system: string; prompt: string },
  apiKey?: string
): Promise<string | undefined> {
  const headers: Record<string, string> = {
    "content-type": "application/json",
  };
  if (apiKey) {
    headers["authorization"] = `Bearer ${apiKey}`;
  }

  const messages: ChatCompletionMessage[] = [
    { role: "system", content: options.system },
    { role: "user", content: options.prompt },
  ];

  const body: Record<string, unknown> = {
    model: ollamaModel(),
    messages,
    temperature: 0.45,
    max_tokens: 4096,
  };

  try {
    const response = await fetch(`${endpoint.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(300_000),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(`Ollama cloud failed ${response.status}: ${errorText.slice(0, 200)}`);
    }

    const data = (await response.json()) as ChatCompletionResponse;
    return data.choices?.[0]?.message?.content?.trim();
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Ollama cloud request timed out (120s)");
    }
    throw error;
  }
}

async function generateWithLegacyOllama(
  endpoint: string,
  options: { system: string; prompt: string }
): Promise<string | undefined> {
  const response = await fetch(`${endpoint.replace(/\/$/, "")}/api/generate`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      model: ollamaModel(),
      system: options.system,
      prompt: options.prompt,
      stream: false,
      options: { temperature: 0.45 },
    }),
    signal: AbortSignal.timeout(60_000),
  });

  if (!response.ok) {
    throw new Error(`Ollama failed ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as GenerateResponse;
  return data.response?.trim();
}
