/**
 * POST /api/gemini — single Gemini-backed endpoint for all AiTouchSolutions
 * AI tools (AI Humanizer, AI Detector, Resume Builder, Thumbnail prompt,
 * Proposal, Website blueprint, Caption, Domain, Portfolio, Chatbot scope,
 * and the Jarvis chat widget).
 *
 * Request body:
 *   { "tool": "ai-humanizer", "input": "...", "tone": "Professional" }
 *   { "tool": "jarvis", "messages": [{ "role": "user", "content": "..." }] }
 *
 * Response: { "result": string, "model": string, "mode": "ai" }
 * On failure an honest error is returned — never a canned fake result.
 *
 * Limits (per request): input <= 4000 chars, Jarvis <= 10 messages of
 * <= 1500 chars each, ~10 requests/minute per IP, ~12s per model attempt
 * with one fallback-model retry on overload (503/429).
 *
 * Requires GEMINI_API_KEY set server-side (Vercel Project Settings).
 * NOTE (follow-up for the site owner): add a matching entry to vercel.json
 * functions, e.g. "api/gemini.ts": { "maxDuration": 25 }, the same as
 * api/jarvis.ts, so long Gemini calls are not cut off on Hobby defaults.
 */
import {
  generateGeminiText,
  getGeminiApiKey,
  GeminiError,
  type GeminiContent,
} from "../src/lib/gemini";
import {
  buildToolPrompt,
  buildJarvisSystemPrompt,
  GEMINI_TOOL_IDS,
  TOOL_TONES,
  type GeminiToolId,
} from "../src/lib/gemini-prompts";

type ChatMessage = { role: "user" | "assistant"; content: string };
type ApiRequest = {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
};
type ApiResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(body: unknown): void;
};

const MAX_INPUT_CHARS = 4000;
const RATE_LIMIT_PER_MINUTE = 10;
const requestCounts = new Map<string, { count: number; resetAt: number }>();

const blockedTopics =
  /\b(security|secure|cyber|hacking|hack into|exploit(?:ation)?|malware|ransomware|phishing|credential theft|steal passwords?|password cracking|keylogger|spyware|ddos|denial.of.service|sql injection|bypass (?:a |the )?(?:login|security|firewall)|unauthori[sz]ed access|account takeover|brute.?force|penetration test|vulnerability scan)\b/i;

function isValidTool(value: unknown): value is GeminiToolId {
  return (
    typeof value === "string" &&
    (GEMINI_TOOL_IDS as readonly string[]).includes(value)
  );
}

function isValidTone(value: unknown): value is (typeof TOOL_TONES)[number] {
  return (
    typeof value === "string" &&
    (TOOL_TONES as readonly string[]).includes(value)
  );
}

function isValidMessages(value: unknown): value is ChatMessage[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.length <= 10 &&
    value.every(
      (item) =>
        item &&
        typeof item === "object" &&
        ((item as ChatMessage).role === "user" ||
          (item as ChatMessage).role === "assistant") &&
        typeof (item as ChatMessage).content === "string" &&
        (item as ChatMessage).content.trim().length > 0 &&
        (item as ChatMessage).content.length <= 1500,
    ) &&
    (value.at(-1) as ChatMessage).role === "user"
  );
}

function checkRateLimit(clientIp: string): boolean {
  const now = Date.now();
  const current = requestCounts.get(clientIp);
  if (current && current.resetAt > now && current.count >= RATE_LIMIT_PER_MINUTE) {
    return false;
  }
  requestCounts.set(
    clientIp,
    current && current.resetAt > now
      ? { count: current.count + 1, resetAt: current.resetAt }
      : { count: 1, resetAt: now + 60_000 },
  );
  return true;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const host = req.headers.host;
  const origin = req.headers.origin;
  if (origin && host && new URL(origin).host !== host) {
    return res.status(403).json({ error: "Request not allowed" });
  }

  const forwardedFor = req.headers["x-forwarded-for"];
  const clientIp = (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor)
    ?.split(",")[0]
    ?.trim();
  if (!checkRateLimit(clientIp || "unknown-client")) {
    return res
      .status(429)
      .json({ error: "Too many requests. Please try again shortly." });
  }

  const body = req.body as
    | { tool?: unknown; input?: unknown; tone?: unknown; messages?: unknown }
    | undefined;

  if (!isValidTool(body?.tool)) {
    return res.status(400).json({ error: "Unknown or missing tool." });
  }
  const tool = body.tool;

  if (!getGeminiApiKey()) {
    return res.status(503).json({ error: "AI is not configured yet." });
  }

  try {
    if (tool === "jarvis") {
      if (!isValidMessages(body?.messages)) {
        return res
          .status(400)
          .json({ error: "Please enter a shorter message and try again." });
      }
      const messages = body.messages;
      const latestQuestion = messages.at(-1)?.content ?? "";
      if (blockedTopics.test(latestQuestion)) {
        return res.status(200).json({
          result:
            "I can’t help with cybersecurity or instructions that could compromise systems. For a legitimate software or AI project inquiry, contact us through WhatsApp or email.",
          model: "safety",
          mode: "safety",
        });
      }
      const contents: GeminiContent[] = messages.map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        text: message.content,
      }));
      const { text, model } = await generateGeminiText({
        prompt: latestQuestion,
        contents,
        systemInstruction: buildJarvisSystemPrompt(),
        maxOutputTokens: 450,
        temperature: 0.25,
      });
      return res.status(200).json({ result: text, model, mode: "ai" });
    }

    const input = typeof body?.input === "string" ? body.input.trim() : "";
    if (!input || input.length > MAX_INPUT_CHARS) {
      return res.status(400).json({
        error: `Input must be between 1 and ${MAX_INPUT_CHARS} characters.`,
      });
    }
    const tone = isValidTone(body?.tone) ? body.tone : "Professional";
    const { systemInstruction, prompt, maxOutputTokens, temperature } =
      buildToolPrompt(tool, input, tone);
    const { text, model } = await generateGeminiText({
      prompt,
      systemInstruction,
      maxOutputTokens,
      temperature,
    });
    return res.status(200).json({ result: text, model, mode: "ai" });
  } catch (error) {
    if (error instanceof GeminiError) {
      if (error.status === 503 && !getGeminiApiKey()) {
        return res.status(503).json({ error: "AI is not configured yet." });
      }
      return res
        .status(502)
        .json({ error: "AI is temporarily unavailable. Please try again shortly." });
    }
    return res
      .status(502)
      .json({ error: "AI is temporarily unavailable. Please try again shortly." });
  }
}
