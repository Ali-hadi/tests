/**
 * Browser client for POST /api/gemini.
 *
 * All AI tool pages and the Jarvis widget call the Gemini endpoint through
 * here. The endpoint returns honest results or an honest error — this
 * client never substitutes canned/fake text. Callers must show the thrown
 * error message to the user instead of inventing a result.
 */

export type GeminiClientResult = {
  result: string;
  model: string;
};

export type JarvisChatMessage = {
  role: "user" | "assistant";
  content: string;
};

async function postGemini(body: Record<string, unknown>): Promise<GeminiClientResult> {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await response.json().catch(() => ({}))) as {
    result?: unknown;
    model?: unknown;
    error?: unknown;
  };
  if (!response.ok || typeof data.result !== "string" || !data.result.trim()) {
    throw new Error(
      typeof data.error === "string" && data.error.trim()
        ? data.error
        : "The AI service is temporarily unavailable. Please try again shortly.",
    );
  }
  return {
    result: data.result,
    model: typeof data.model === "string" ? data.model : "gemini",
  };
}

/** Call one of the 10 AI tools (or the resume-page helpers) via /api/gemini. */
export function callGeminiTool(
  tool: string,
  input: string,
  tone?: string,
): Promise<GeminiClientResult> {
  return postGemini({ tool, input, tone });
}

/** Call the Jarvis chat assistant via /api/gemini. */
export function callJarvis(messages: JarvisChatMessage[]): Promise<GeminiClientResult> {
  return postGemini({ tool: "jarvis", messages });
}
