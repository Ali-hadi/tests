/**
 * Shared Google Gemini client for AiTouchSolutions server-side AI features.
 *
 * - Calls the Gemini REST API (generateContent) with the key read ONLY from
 *   process.env.GEMINI_API_KEY. The key is never hardcoded, logged, or
 *   committed. Set GEMINI_API_KEY in Vercel Project Settings for production.
 * - Primary model is gemini-flash-latest. Verified 2026-11-14: that model
 *   intermittently returns 503 "high demand", so on 503/429 the client falls
 *   back to gemini-3.5-flash, then gemini-3.6-flash (both verified working
 *   with the same key). gemini-2.5-flash / gemini-2.5-flash-lite are retired
 *   for new users (404) and are deliberately NOT in the chain.
 * - On failure the caller gets an honest GeminiError — never a canned fake
 *   result. Callers must surface an "AI is temporarily unavailable" message.
 */

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

/** Ordered fallback chain. First entry is the primary model. */
export const GEMINI_MODELS = [
  "gemini-flash-latest",
  "gemini-3.5-flash",
  "gemini-3.6-flash",
] as const;

export class GeminiError extends Error {
  status: number;
  /** True when another model / a later retry may succeed (overload, quota). */
  retryable: boolean;

  constructor(message: string, status: number, retryable = false) {
    super(message);
    this.name = "GeminiError";
    this.status = status;
    this.retryable = retryable;
  }
}

export function getGeminiApiKey(): string | undefined {
  return process.env.GEMINI_API_KEY?.trim() || undefined;
}

export type GeminiContent = {
  role: "user" | "model";
  text: string;
};

export type GenerateTextOptions = {
  prompt: string;
  /** Multi-turn conversation. When set, it replaces the single prompt. */
  contents?: GeminiContent[];
  systemInstruction?: string;
  /** Maximum output tokens. Default 1024. */
  maxOutputTokens?: number;
  /** Sampling temperature. Default 0.7. */
  temperature?: number;
  /** Per-attempt timeout in ms. Default 12_000. */
  timeoutMs?: number;
};

export type GenerateTextResult = {
  text: string;
  /** Model that actually produced the output. */
  model: string;
};

type GeminiPart = { text?: unknown; thoughtSignature?: unknown };
type GeminiResponse = {
  candidates?: Array<{ content?: { parts?: GeminiPart[] } }>;
  promptFeedback?: { blockReason?: string };
  error?: { code?: number; message?: string; status?: string };
};

function extractText(result: GeminiResponse): string {
  const parts = result.candidates?.[0]?.content?.parts ?? [];
  return parts
    .map((part) => (typeof part.text === "string" ? part.text : ""))
    .join("")
    .trim();
}

async function callModel(
  model: string,
  apiKey: string,
  options: GenerateTextOptions,
): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 12_000);
  try {
    const contents =
      options.contents && options.contents.length > 0
        ? options.contents.map((item) => ({
            role: item.role,
            parts: [{ text: item.text }],
          }))
        : [{ parts: [{ text: options.prompt }] }];
    const response = await fetch(
      `${GEMINI_API_BASE}/${model}:generateContent`,
      {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          system_instruction: options.systemInstruction
            ? { parts: [{ text: options.systemInstruction }] }
            : undefined,
          contents,
          generationConfig: {
            temperature: options.temperature ?? 0.7,
            maxOutputTokens: options.maxOutputTokens ?? 1024,
          },
        }),
      },
    );

    const result = (await response.json().catch(() => ({}))) as GeminiResponse;

    if (!response.ok) {
      const status = result.error?.code ?? response.status;
      const retryable = status === 429 || status === 503;
      throw new GeminiError(
        `Gemini returned ${status}: ${(result.error?.message ?? "request failed").slice(0, 200)}`,
        status,
        retryable,
      );
    }

    if (result.promptFeedback?.blockReason) {
      throw new GeminiError(
        `Gemini blocked the request (${result.promptFeedback.blockReason}).`,
        422,
        false,
      );
    }

    const text = extractText(result);
    if (!text) {
      throw new GeminiError("Gemini returned an empty completion.", 502, false);
    }
    return text;
  } catch (error) {
    if (error instanceof GeminiError) throw error;
    if ((error as Error)?.name === "AbortError") {
      throw new GeminiError("Gemini request timed out.", 504, true);
    }
    throw new GeminiError("Gemini request failed.", 502, true);
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Generate text with Gemini, trying models in fallback order.
 * Tries the primary model first, then at most ONE fallback model on
 * overload/quota errors (503/429) — one retry, as required.
 */
export async function generateGeminiText(
  options: GenerateTextOptions,
): Promise<GenerateTextResult> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new GeminiError("GEMINI_API_KEY is not configured.", 503, false);
  }

  const attempts = GEMINI_MODELS.slice(0, 2);
  let lastError: GeminiError | undefined;
  for (const model of attempts) {
    try {
      const text = await callModel(model, apiKey, options);
      return { text, model };
    } catch (error) {
      if (!(error instanceof GeminiError) || !error.retryable) throw error;
      lastError = error;
    }
  }
  throw (
    lastError ??
    new GeminiError("Gemini is temporarily unavailable.", 502, true)
  );
}
