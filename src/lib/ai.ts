const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export async function callLLM(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }

  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  const res = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`LLM API error ${res.status}: ${errorBody}`);
  }

  const data = await res.json();
  const content: string = data.choices?.[0]?.message?.content ?? "";
  return content.trim();
}

export function parseJsonResponse<T>(raw: string): T {
  // Strip markdown code fences if the LLM wraps the response
  let cleaned = raw.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
  }
  return JSON.parse(cleaned) as T;
}
