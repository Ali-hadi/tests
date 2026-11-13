import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Check,
  ChevronDown,
  ClipboardList,
  FileSearch,
  Loader2,
  PenLine,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  WandSparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { callGeminiTool } from "@/lib/gemini-client";

const MIN_WORDS = 30;
const MAX_CHARS = 4000;

type DetectorResult = {
  markersFound: string[];
  summary: string;
  signals: string[];
  /** Full AI analysis text from Gemini (likelihood band + reasoning). */
  aiReport: string;
  /** Honest error from the AI service, if the call failed. */
  error?: string;
};

type Faq = {
  question: string;
  answer: string;
};

type Step = {
  title: string;
  description: string;
  icon: LucideIcon;
};

function getWordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

// Local phrase highlight only: finds a few generic phrases in the text.
// It does NOT measure AI probability. The actual analysis comes from
// Gemini via /api/gemini (likelihood band + reasoning, no precise %).
function buildDemoCheck(input: string): DetectorResult {
  const normalized = input.toLowerCase();
  const markers = [
    "in conclusion",
    "it is important to note",
    "delve",
    "comprehensive",
    "furthermore",
    "moreover",
    "leverage",
    "optimize",
    "seamless",
    "robust",
  ];
  const markersFound = markers.filter((marker) => normalized.includes(marker));

  return {
    markersFound,
    summary:
      markersFound.length > 0
        ? `Found ${markersFound.length} generic phrase${markersFound.length > 1 ? "s" : ""} that often appear in AI-assisted drafts. This is a pattern highlight only — it is not an AI probability score.`
        : "No generic phrases from the demo list were found. This is a pattern highlight only — it is not an AI probability score.",
    signals: [
      "Sentence rhythm and transition patterns",
      "Generic phrasing density",
      "Specificity and example usage",
      "Probability-style language markers",
    ],
    aiReport: "",
  };
}

async function runAiDetectorApi(input: string): Promise<DetectorResult> {
  const local = buildDemoCheck(input);
  try {
    const { result } = await callGeminiTool("ai-detector", input);
    return { ...local, aiReport: result };
  } catch (error) {
    return {
      ...local,
      aiReport: "",
      error:
        error instanceof Error
          ? error.message
          : "The AI service is temporarily unavailable. Please try again shortly.",
    };
  }
}

const sampleText =
  "Artificial intelligence is changing how teams draft, edit, and review content across marketing, education, and business operations. A good AI detector should not punish writers, but it should help reviewers understand patterns, compare signals, and make careful decisions with context.";

const faqs: Faq[] = [
  {
    question: "Is AI Touch Solutions' detector free?",
    answer:
      "Yes. This page is built as a free AI checker experience with no signup gate in the frontend flow.",
  },
  {
    question: "How accurate is the AI checker?",
    answer:
      "The analysis is an AI estimate, not a definitive verdict — no detector is certain, and no precise percentage is shown. Use it as one review signal alongside human judgment.",
  },
  {
    question: "How does AI detection work?",
    answer:
      "AI detection looks at writing rhythm, probability markers, repeated phrases, sentence structure, and other signals that can appear in generated text.",
  },
  {
    question: "Should I rely only on AI detection?",
    answer:
      "No. Treat detection as one review signal. Human judgment, source checks, originality policies, and context should always guide final decisions.",
  },
];

const steps: Step[] = [
  {
    title: "Add Your Content",
    description: "Paste at least 30 words into the checker to prepare the scan.",
    icon: ClipboardList,
  },
  {
    title: "Run AI Detector",
    description: "Start the scan and review the loading state while the result is prepared.",
    icon: SearchCheck,
  },
  {
    title: "Get the Report",
    description: "See which generic phrases were found, with simple signals for editorial review.",
    icon: BarChart3,
  },
];

const toolkitCards = [
  {
    title: "AI Detector",
    description: "AI analysis: likelihood estimate with reasoning. No precise percentage.",
    icon: SearchCheck,
  },
  {
    title: "Paraphraser",
    description: "Rewrite stiff passages into clearer, more natural language.",
    icon: WandSparkles,
  },
  {
    title: "Writing Assistant",
    description: "Shape outlines, polish drafts, and improve flow before publishing.",
    icon: PenLine,
  },
];

export function AiDetectorPage() {
  return (
    <div
      className="bg-[#FCFCFC] text-[#2B2B2B]"
      style={{ fontFamily: "Manrope, 'Inter Tight', system-ui, sans-serif" }}
    >
      <HeroSection />
      <WhyChooseSection />
      <HowItWorksSection />
      <ToolkitSection />
      <CtaSection />
      <FaqSection />
      {/* <EthicalUsePolicySection /> */}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FCFCFC] px-4 pb-14 pt-28 sm:px-6 md:pt-32 lg:px-10 lg:pb-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E8FBD8] px-4 py-2 text-sm font-semibold text-[#315F18] shadow-sm">
            <Sparkles className="h-4 w-4" />
            Check for AI
          </span>
        </div>

        <div className="mx-auto mt-7 max-w-5xl text-center">
          <h1 className="text-balance text-4xl font-extrabold leading-[1.05] text-[#2B2B2B] md:text-5xl lg:text-6xl">
            AI Detector: Try Our Pattern Checker
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[#666666] md:text-lg">
            Paste any text — Gemini analyses writing patterns and gives a likelihood estimate
            with reasoning. It is an estimate, not a definitive verdict, and no precise
            percentage is shown.
          </p>
        </div>

        <div id="ai-detector-tool" className="mt-10">
          <DetectorTool />
        </div>
      </div>
    </section>
  );
}

function DetectorTool() {
  const [text, setText] = useState(sampleText);
  const [isLoading, setIsLoading] = useState(false);
  const [resultScore, setResultScore] = useState<DetectorResult | null>(null);

  const wordCount = useMemo(() => getWordCount(text), [text]);
  const canRun = wordCount >= MIN_WORDS && !isLoading;
  const wordsRemaining = Math.max(0, MIN_WORDS - wordCount);

  const checkForAi = async () => {
    if (!canRun) return;
    if (text.length > MAX_CHARS) {
      setResultScore({
        markersFound: [],
        summary: "",
        signals: [],
        aiReport: "",
        error: `Please paste up to ${MAX_CHARS.toLocaleString()} characters.`,
      });
      return;
    }
    setIsLoading(true);
    setResultScore(null);
    try {
      const result = await runAiDetectorApi(text);
      setResultScore(result);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-[8px] border border-[#E4E7EB] bg-white shadow-[0_24px_80px_rgba(25,35,45,0.08)]">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="border-b border-[#EEF1F4] p-4 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
            <div>
              <p className="text-sm font-bold text-[#2B2B2B]">AI content checker</p>
              <p className="mt-1 text-sm text-[#666666]">Paste your text below to begin.</p>
            </div>
            <button
              onClick={() => {
                setText(sampleText);
                setResultScore(null);
              }}
              className="inline-flex items-center gap-2 rounded-[8px] border border-[#DDE3EA] px-3 py-2 text-sm font-semibold text-[#4D5C68] transition hover:border-[#A7E872] hover:text-[#2B2B2B]"
            >
              <Zap className="h-4 w-4 text-[#6DAF39]" />
              Load sample
            </button>
          </div>

          <textarea
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              setResultScore(null);
            }}
            placeholder="Paste at least 30 words here..."
            className="min-h-[270px] w-full resize-none rounded-[8px] border border-[#DDE3EA] bg-[#FCFCFC] p-4 text-base leading-7 text-[#2B2B2B] outline-none transition placeholder:text-[#9AA3AC] focus:border-[#A7E872] focus:bg-white focus:ring-4 focus:ring-[#A7E872]/20"
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p
              className={`text-sm font-semibold ${
                wordCount >= MIN_WORDS ? "text-[#315F18]" : "text-[#666666]"
              }`}
            >
              {wordCount} words
              {wordCount < MIN_WORDS ? ` - ${wordsRemaining} more required` : " - ready to scan"}
            </p>
            <button
              onClick={checkForAi}
              disabled={!canRun}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-[#A7E872] px-6 py-3 text-sm font-extrabold text-[#19330E] shadow-[0_14px_30px_rgba(111,176,56,0.24)] transition hover:bg-[#95D85F] disabled:cursor-not-allowed disabled:bg-[#DDE3EA] disabled:text-[#7A858F] disabled:shadow-none"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <SearchCheck className="h-5 w-5" />
              )}
              {isLoading ? "Checking..." : "Run AI check"}
            </button>
          </div>
        </div>

        <div className="bg-[#F5F7F9] p-4 sm:p-6" aria-live="polite">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex h-full min-h-[330px] flex-col justify-between rounded-[8px] border border-[#E2E7ED] bg-white p-5"
              >
                <div>
                  <div className="h-4 w-32 rounded-full bg-[#E8ECF1]" />
                  <div className="mt-5 grid place-items-center">
                    <div className="grid h-44 w-44 place-items-center rounded-full bg-[#ECDCFF]">
                      <Loader2 className="h-9 w-9 animate-spin text-[#315F18]" />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 w-full rounded-full bg-[#E8ECF1]" />
                  <div className="h-3 w-10/12 rounded-full bg-[#E8ECF1]" />
                  <div className="h-3 w-7/12 rounded-full bg-[#E8ECF1]" />
                </div>
              </motion.div>
            ) : resultScore ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="min-h-[330px] rounded-[8px] border border-[#E2E7ED] bg-white p-5"
              >
                <ResultPanel result={resultScore} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex min-h-[330px] flex-col justify-between rounded-[8px] border border-dashed border-[#CBD3DB] bg-white p-5"
              >
                <div>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#ECDCFF] text-[#2B2B2B]">
                    <FileSearch className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-2xl font-extrabold">Your report will appear here</h2>
                  <p className="mt-3 text-sm leading-6 text-[#666666]">
                    Gemini gives a likelihood band (Low / Moderate / High) with reasoning. It is
                    an estimate, not a verdict.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[8px] bg-[#F5F7F9] p-4">
                    <p className="text-3xl font-extrabold text-[#2B2B2B]">30+</p>
                    <p className="mt-1 text-sm text-[#666666]">minimum words</p>
                  </div>
                  <div className="rounded-[8px] bg-[#E8FBD8] p-4">
                    <p className="text-3xl font-extrabold text-[#315F18]">AI</p>
                    <p className="mt-1 text-sm text-[#315F18]">estimate</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ResultPanel({ result }: { result: DetectorResult }) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[#666666]">AI analysis</p>
          <h2 className="mt-2 text-2xl font-extrabold text-[#2B2B2B]">
            {result.error
              ? "AI unavailable"
              : result.markersFound.length > 0
                ? "Generic phrases found"
                : "No generic phrases found"}
          </h2>
        </div>
        <span className="rounded-full bg-[#E8FBD8] px-3 py-1 text-xs font-bold text-[#315F18]">
          Gemini
        </span>
      </div>

      {result.error ? (
        <p className="mt-5 rounded-[8px] border border-[#F0CFD1] bg-[#FFF7F7] p-4 text-sm leading-6 text-[#B8474C]">
          {result.error}
        </p>
      ) : (
        <>
          <p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-[#2B2B2B]">
            {result.aiReport}
          </p>

          <p className="mt-5 text-sm leading-6 text-[#666666]">{result.summary}</p>

          {result.markersFound.length > 0 ? (
            <div className="mt-5 space-y-2">
              {result.markersFound.map((marker) => (
                <div key={marker} className="flex items-center gap-2 text-sm text-[#4D5C68]">
                  <Check className="h-4 w-4 text-[#6DAF39]" />
                  <span>&ldquo;{marker}&rdquo;</span>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-5 space-y-2">
            {result.signals.map((signal) => (
              <div key={signal} className="flex items-center gap-2 text-sm text-[#4D5C68]">
                <Check className="h-4 w-4 text-[#6DAF39]" />
                <span>{signal}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <p className="mt-5 rounded-[8px] bg-[#F5F7F9] p-4 text-sm leading-6 text-[#666666]">
        This is an AI estimate, not a definitive verdict — no detector is certain, and no
        precise percentage is shown.
      </p>
    </div>
  );
}

function WhyChooseSection() {
  const bullets = [
    "No limits, no locked features",
    "Clean, easy-to-read insights",
    "Simple phrase highlights for quick review",
  ];

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#6DAF39]">
            Why choose AI Touch Solutions
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#2B2B2B] md:text-5xl">
            A clearer way to understand AI-written content.
          </h2>
          <p className="mt-6 text-base leading-8 text-[#666666]">
            AI Touch Solutions focuses on practical review signals instead of confusing verdicts.
            You get instant AI analysis, clean insights, and a simple workflow that supports
            writers, teachers, editors, and teams.
          </p>
          <div className="mt-7 space-y-4">
            {bullets.map((item) => (
              <div key={item} className="flex items-center gap-3 text-[#2B2B2B]">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#E8FBD8]">
                  <Check className="h-4 w-4 text-[#315F18]" />
                </span>
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <DashboardIllustration />
      </div>
    </section>
  );
}

function DashboardIllustration() {
  return (
    <div className="relative overflow-hidden rounded-[8px] border border-[#E1E7ED] bg-[#F5F7F9] p-4 shadow-[0_24px_70px_rgba(43,43,43,0.1)] sm:p-6">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#A7E872] via-[#ECDCFF] to-[#A7E872]" />
      <div className="grid gap-4 md:grid-cols-[1fr_160px]">
        <div className="rounded-[8px] border border-[#E0E6EC] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[#666666]">Analysis dashboard</p>
              <p className="mt-1 text-2xl font-extrabold">AI report</p>
            </div>
            <BrainCircuit className="h-8 w-8 text-[#6DAF39]" />
          </div>
          <div className="mt-6 space-y-3">
            {["Generic phrasing", "Sentence rhythm", "Specificity", "Transition patterns"].map(
              (signal) => (
                <div key={signal} className="flex items-center gap-2 text-xs font-bold text-[#666666]">
                  <Check className="h-4 w-4 text-[#6DAF39]" />
                  <span>{signal}</span>
                </div>
              ),
            )}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-[8px] bg-[#ECDCFF] p-5">
            <p className="text-sm font-bold text-[#666666]">Demo check</p>
            <p className="mt-2 text-2xl font-extrabold">Pattern highlights only</p>
          </div>
          <div className="rounded-[8px] bg-[#0D1609] p-5 text-white">
            <ShieldCheck className="h-6 w-6 text-[#A7E872]" />
            <p className="mt-4 text-sm text-white/70">Cross-check ready</p>
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {["No limits", "Clean insights", "Fast review"].map((item) => (
          <div
            key={item}
            className="rounded-[8px] border border-[#E0E6EC] bg-white p-4 text-sm font-bold"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#6DAF39]">
            How it works
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-[#2B2B2B] md:text-5xl">
            Three simple steps.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <StepCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const Icon = step.icon;
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="rounded-[8px] border border-[#E4E8ED] bg-[#F5F7F9] p-6 transition-shadow hover:shadow-[0_20px_60px_rgba(43,43,43,0.08)]"
    >
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-[8px] bg-white text-[#315F18] shadow-sm">
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-sm font-extrabold text-[#B2BBC4]">0{index + 1}</span>
      </div>
      <h3 className="mt-8 text-xl font-extrabold text-[#2B2B2B]">{step.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#666666]">{step.description}</p>
    </motion.div>
  );
}

function ToolkitSection() {
  return (
    <section className="bg-[#F5F7F9] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#6DAF39]">
              Writing toolkit
            </p>
            <h2 className="mt-4 text-3xl font-extrabold text-[#2B2B2B] md:text-5xl">
              Tools for every draft.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#666666]">
            Detect AI, rewrite unclear sections, and polish your final copy in one connected flow.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {toolkitCards.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="relative min-h-[280px] overflow-hidden rounded-[8px] bg-gradient-to-br from-[#0a1a05] to-[#1a280e] p-6 text-white shadow-[0_20px_70px_rgba(10,26,5,0.25)]"
            >
              <div className="absolute right-5 top-5 h-20 w-20 rounded-full border border-[#A7E872]/30" />
              <div className="absolute bottom-0 left-6 h-24 w-24 translate-y-1/2 rounded-full bg-[#A7E872]/20 blur-2xl" />
              <div className="relative">
                <span className="grid h-12 w-12 place-items-center rounded-[8px] bg-[#A7E872] text-[#0a1a05]">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-16 text-2xl font-extrabold">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/70">{description}</p>
                <div className="mt-6 h-1.5 w-28 rounded-full bg-[#A7E872]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#0D1609] px-4 py-20 text-white sm:px-6 lg:px-10 lg:py-28">
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(167,232,114,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(167,232,114,0.18)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="relative mx-auto flex max-w-[1180px] flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#A7E872]/30 px-4 py-2 text-sm font-bold text-[#A7E872]">
          <Sparkles className="h-4 w-4" />
          AI Touch Solutions
        </span>
        <h2 className="mt-7 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
          Simplify Your Writing Flow
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
          Move from paste to review to action with a cleaner AI detection workflow.
        </p>
        <a
          href="#ai-detector-tool"
          className="mt-9 inline-flex min-h-14 items-center gap-3 rounded-[8px] bg-[#A7E872] px-8 py-4 text-sm font-extrabold text-[#19330E] transition hover:bg-[#95D85F]"
        >
          Detect AI Now
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[980px] gap-10 lg:grid-cols-[300px_1fr]">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#6DAF39]">FAQs</p>
          <h2 className="mt-4 text-3xl font-extrabold text-[#2B2B2B] md:text-5xl">
            Common questions.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ faq, isOpen, onToggle }: { faq: Faq; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-[#E4E8ED] bg-[#F5F7F9]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-extrabold text-[#2B2B2B]">{faq.question}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="shrink-0">
          <ChevronDown className="h-5 w-5 text-[#666666]" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <p className="px-5 pb-5 text-sm leading-7 text-[#666666]">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EthicalUsePolicySection() {
  return (
    <section className="bg-[#FCFCFC] px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[980px]">
        <div className="rounded-[8px] border border-[#F0CFD1] bg-[#FFF7F7] p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#B8474C]" />
            <div>
              <p className="font-extrabold text-[#2B2B2B]">Ethical Use Policy</p>
              <p className="mt-2 text-sm leading-7 text-[#666666]">
                AI Touch Solutions is designed to support honest review, learning, editing, and
                content quality checks. Do not use this detector to enable cheating, plagiarism,
                impersonation, or deceptive academic or professional activity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
