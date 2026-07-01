import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  ClipboardList,
  FileSearch,
  GraduationCap,
  Loader2,
  PenLine,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Star,
  WandSparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

const MIN_WORDS = 30;

type DetectorResult = {
  human: number;
  ai: number;
  confidence: string;
  summary: string;
  signals: string[];
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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function buildMockDetection(input: string): DetectorResult {
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
  const markerHits = markers.reduce((total, marker) => {
    return total + (normalized.includes(marker) ? 1 : 0);
  }, 0);
  const sentenceCount = Math.max(1, input.split(/[.!?]+/).filter(Boolean).length);
  const avgSentenceLength = getWordCount(input) / sentenceCount;
  const lengthSignal = avgSentenceLength > 24 ? 14 : avgSentenceLength > 18 ? 8 : 2;
  const seed = input.length % 17;
  const ai = clamp(18 + markerHits * 7 + lengthSignal + seed, 6, 94);
  const human = 100 - ai;

  return {
    human,
    ai,
    confidence:
      ai > 70 ? "High AI probability" : ai > 42 ? "Mixed writing pattern" : "Mostly human",
    summary:
      ai > 70
        ? "The writing shows repeated formal phrasing and predictable transitions."
        : ai > 42
          ? "The text has a blend of natural and AI-like structure."
          : "The writing looks natural, specific, and varied in rhythm.",
    signals: [
      "Sentence rhythm and transition patterns",
      "Generic phrasing density",
      "Specificity and example usage",
      "Probability-style language markers",
    ],
  };
}

async function runAiDetectorApi(input: string): Promise<DetectorResult> {
  // Replace this mock with your backend request when the real detector API is ready.
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(buildMockDetection(input)), 2000);
  });
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
      "The current result is mocked for UI development. Once connected to your backend model, accuracy will depend on the detector engine, training data, and the kind of writing being checked.",
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
    description: "See human and AI percentages with simple signals for editorial review.",
    icon: BarChart3,
  },
];

const toolkitCards = [
  {
    title: "AI Detector",
    description: "Estimate AI probability, review signals, and make faster editorial decisions.",
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

const trustedLogos = [
  { label: "Academy", icon: GraduationCap },
  { label: "Editorial", icon: BookOpenCheck },
  { label: "Enterprise", icon: Building2 },
  { label: "Teams", icon: BriefcaseBusiness },
];

export function AiDetectorPage() {
  return (
    <div
      className="bg-[#FCFCFC] text-[#2B2B2B]"
      style={{ fontFamily: "Manrope, 'Inter Tight', system-ui, sans-serif" }}
    >
      <HeroSection />
      <WhyChooseSection />
      <StatsSection />
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
            Free AI Detector: Check ChatGPT, Gemini & More with AI Checker
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[#666666] md:text-lg">
            Paste any text and run our free AI checker to review ChatGPT, Gemini, Claude, and other
            AI-generated writing patterns in seconds.
          </p>
        </div>

        <div id="ai-detector-tool" className="mt-10">
          <DetectorTool />
        </div>

        <RatingStrip />
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
              {isLoading ? "Checking..." : "Check for AI"}
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
                    The mock detector returns a human score, AI score, confidence label, and review
                    signals.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[8px] bg-[#F5F7F9] p-4">
                    <p className="text-3xl font-extrabold text-[#2B2B2B]">30+</p>
                    <p className="mt-1 text-sm text-[#666666]">minimum words</p>
                  </div>
                  <div className="rounded-[8px] bg-[#E8FBD8] p-4">
                    <p className="text-3xl font-extrabold text-[#315F18]">2s</p>
                    <p className="mt-1 text-sm text-[#315F18]">mock scan</p>
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
          <p className="text-sm font-bold text-[#666666]">Detection result</p>
          <h2 className="mt-2 text-2xl font-extrabold text-[#2B2B2B]">{result.confidence}</h2>
        </div>
        <span className="rounded-full bg-[#E8FBD8] px-3 py-1 text-xs font-bold text-[#315F18]">
          Mock API
        </span>
      </div>

      <div className="mt-6 grid place-items-center">
        <div
          className="grid h-44 w-44 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#A7E872 ${result.human * 3.6}deg, #ECDCFF 0deg)`,
          }}
        >
          <div className="grid h-32 w-32 place-items-center rounded-full bg-white text-center shadow-inner">
            <div>
              <p className="text-4xl font-extrabold text-[#2B2B2B]">{result.human}%</p>
              <p className="text-sm font-bold text-[#315F18]">Human</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <ScoreBox label="Human" value={result.human} tone="green" />
        <ScoreBox label="AI" value={result.ai} tone="purple" />
      </div>

      <p className="mt-5 text-sm leading-6 text-[#666666]">{result.summary}</p>

      <div className="mt-5 space-y-2">
        {result.signals.map((signal) => (
          <div key={signal} className="flex items-center gap-2 text-sm text-[#4D5C68]">
            <Check className="h-4 w-4 text-[#6DAF39]" />
            <span>{signal}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoreBox({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "green" | "purple";
}) {
  return (
    <div
      className={
        tone === "green" ? "rounded-[8px] bg-[#E8FBD8] p-4" : "rounded-[8px] bg-[#ECDCFF] p-4"
      }
    >
      <p className="text-sm font-bold text-[#666666]">{label}</p>
      <p className="mt-1 text-3xl font-extrabold text-[#2B2B2B]">{value}%</p>
    </div>
  );
}

function RatingStrip() {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
      <span className="text-lg font-bold text-[#2B2B2B]">Excellent!</span>
      <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-7 w-7 fill-[#A7E872] text-[#6DAF39]" aria-hidden="true" />
        ))}
      </div>
      <span className="text-base font-semibold text-[#2B2B2B] underline">5,467 reviews</span>
    </div>
  );
}

function WhyChooseSection() {
  const bullets = [
    "No limits, no locked features",
    "Clean, easy-to-read insights",
    "Cross-checking logic for more consistent results",
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
            You get fast scanning, clean insights, and a simple workflow that supports writers,
            teachers, editors, and teams.
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
            {[76, 54, 88, 42].map((value, index) => (
              <div key={value}>
                <div className="mb-2 flex justify-between text-xs font-bold text-[#666666]">
                  <span>Signal {index + 1}</span>
                  <span>{value}%</span>
                </div>
                <div className="h-3 rounded-full bg-[#EDF1F5]">
                  <div
                    className="h-full rounded-full bg-[#A7E872]"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-[8px] bg-[#ECDCFF] p-5">
            <p className="text-sm font-bold text-[#666666]">Human score</p>
            <p className="mt-2 text-4xl font-extrabold">82%</p>
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

function StatsSection() {
  return (
    <section className="bg-[#F5F7F9] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-5 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-[8px] bg-gradient-to-br from-[#F4E9FF] via-[#ECDCFF] to-[#BDA2F5] p-8 lg:col-span-4">
            <div className="absolute bottom-0 right-0 h-40 w-40 translate-x-8 translate-y-8 rounded-full border border-white/60" />
            <p className="text-6xl font-extrabold text-[#2B2B2B] md:text-7xl">99%</p>
            <p className="mt-3 text-xl font-extrabold text-[#2B2B2B]">Success Rate</p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[#4D4D4D]">
              Built for fast text review workflows and clear confidence scoring.
            </p>
          </div>

          <div className="rounded-[8px] border border-[#E0E6EC] bg-white p-8 lg:col-span-5">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#666666]">
              Trusted by professionals
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {trustedLogos.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex min-h-24 flex-col items-center justify-center rounded-[8px] border border-[#E4E8ED] bg-[#F8FAFB] text-center grayscale transition hover:grayscale-0"
                >
                  <Icon className="h-7 w-7 text-[#666666]" />
                  <span className="mt-2 text-xs font-bold text-[#666666]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[8px] bg-[#0D1609] p-8 text-white lg:col-span-3">
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(167,232,114,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(167,232,114,0.18)_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="relative">
              <p className="text-5xl font-extrabold leading-none text-[#A7E872]">1.7 million+</p>
              <p className="mt-5 text-lg font-bold">Texts analyzed</p>
              <p className="mt-4 text-sm leading-6 text-white/70">
                Across drafts, reports, essays, blogs, and editorial reviews.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
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
