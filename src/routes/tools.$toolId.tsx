/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Download,
  Moon,
  Share2,
  Sun,
  WandSparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { AiDetectorPage } from "@/components/tools/AiDetectorPage";
import { createSeo } from "@/lib/seo";
import {
  accentClasses,
  buildScore,
  countCharacters,
  countWords,
  generateOutput,
  ScoreRing,
  ToolCatalogCard,
  ToolExperience,
  tools,
  type ToolTone,
} from "./tools";

export function getToolRouteHead(toolId: string) {
  if (toolId === "ai-detector") {
    return createSeo({
      title: "Free AI Detector: Check ChatGPT, Gemini & More with AI Checker",
      description:
        "Paste any text and run AI Touch Solutions' free AI checker to review ChatGPT, Gemini, Claude, and other AI-generated writing patterns.",
      path: "/tools/ai-detector",
      keywords: [
        "AI detector",
        "free AI detector",
        "AI checker",
        "ChatGPT detector",
        "Gemini detector",
        "AI Touch Solutions AI detector",
      ],
    });
  }

  const tool = tools.find((item) => item.id === toolId);
  const title = tool
    ? `${tool.name} | AItouchSolutions AI Tools`
    : "AI Tool Workspace | AItouchSolutions";
  const description = tool
    ? `${tool.summary} Use ${tool.name} with a dedicated workspace, live preview, copy, download, share, history, and production-ready workflow structure.`
    : "Use a dedicated AItouchSolutions AI tool page with unique UI, live preview, copy, download, share, history, and production-ready workflow structure.";

  return createSeo({
    title,
    description,
    path: tool ? `/tools/${tool.id}` : `/tools/${toolId}`,
    keywords: tool
      ? [
          tool.name,
          `${tool.shortName} tool`,
          ...tool.features,
          ...tool.outputs,
          "AI tool workspace",
          "AI SaaS tools",
        ]
      : ["AI tool workspace", "AI tools", "AI SaaS tools", "AI productivity tools"],
  });
}

export const Route = createFileRoute("/tools/$toolId")({
  head: ({ params }) => getToolRouteHead(params.toolId),
  component: DynamicToolPage,
});

function DynamicToolPage() {
  const { toolId } = Route.useParams();

  return <ToolPageForId toolId={toolId} />;
}

export function ToolPageForId({ toolId }: { toolId: string }) {
  const foundTool = tools.find((item) => item.id === toolId);
  const tool = foundTool ?? tools[0];
  const Icon = tool.icon;
  const [input, setInput] = useState(tool.sample);
  const [tone, setTone] = useState<ToolTone>("Professional");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [notice, setNotice] = useState("");
  const [history, setHistory] = useState<string[]>([
    `${tool.shortName} workspace opened`,
    "Ready for production API wiring",
  ]);

  useEffect(() => {
    setInput(tool.sample);
    setNotice("");
    setHistory([`${tool.shortName} workspace opened`, "Ready for production API wiring"]);
  }, [tool]);

  const hasInput = input.trim().length > 0;
  const output = useMemo(
    () => (hasInput ? generateOutput(tool, input, tone) : ""),
    [hasInput, tool, input, tone],
  );
  const score = useMemo(() => (hasInput ? buildScore(input, tool) : 0), [hasInput, tool, input]);
  const aiScore = hasInput ? Math.max(2, 100 - score) : 0;
  const words = countWords(input);
  const characters = countCharacters(input);
  const workspaceIsLight = theme === "light";

  const flash = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    flash("Copied to clipboard");
  };

  const downloadOutput = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${tool.id}-report.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
    flash("Download started");
  };

  const shareOutput = async () => {
    if (navigator.share) {
      await navigator.share({ title: tool.name, text: output });
      flash("Share sheet opened");
      return;
    }
    await navigator.clipboard.writeText(output);
    flash("Share text copied");
  };

  const submitTool = () => {
    if (!input.trim()) {
      flash("Add text before submitting");
      return;
    }
    setHistory((items) =>
      [`${tool.shortName} ${new Date().toLocaleTimeString()} submitted`, ...items].slice(0, 6),
    );
    flash(`${tool.shortName} submitted`);
  };

  const saveHistory = () => {
    setHistory((items) =>
      [`${tool.shortName} ${new Date().toLocaleTimeString()} saved`, ...items].slice(0, 6),
    );
    flash("Added to history");
  };

  if (!foundTool) {
    return (
      <section className="pt-40 pb-24 lg:pt-52">
        <div className="max-w-[900px] mx-auto px-6 text-center lg:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-orange">
            Tool not found
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold tracking-tight lg:text-7xl">
            This AI tool page does not exist.
          </h1>
          <Link
            to="/tools"
            className="mt-10 inline-flex items-center gap-2 rounded-md bg-teal px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to tools
          </Link>
        </div>
      </section>
    );
  }

  if (tool.id === "ai-detector") {
    return <AiDetectorPage />;
  }

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-16 lg:pt-48 lg:pb-24">
        <div className="absolute inset-0 -z-10 grid-overlay opacity-20" />
        <div className="absolute left-1/2 top-20 -z-10 h-[520px] w-[min(90vw,900px)] -translate-x-1/2 rounded-full bg-teal/10 blur-[120px]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All tools
            </Link>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
              <div>
                <div
                  className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-[10px] font-mono uppercase tracking-[0.25em] ${accentClasses[tool.accent]}`}
                >
                  <Icon className="h-4 w-4" />
                  {tool.category}
                </div>
                <h1 className="mt-7 max-w-5xl font-display text-5xl font-bold leading-[0.94] tracking-[-0.04em] md:text-7xl lg:text-8xl">
                  {tool.name}
                </h1>
                <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
                  {tool.summary}
                </p>
              </div>
              <div className="grid gap-px bg-border">
                {tool.workflows.map((step, index) => (
                  <div key={step} className="flex items-center gap-4 bg-background p-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-teal text-xs font-bold text-ink">
                      {index + 1}
                    </span>
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal">
                Dedicated workspace
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight lg:text-6xl">
                {tool.shortName} page
              </h2>
            </div>
            <div className="flex w-fit rounded-md border border-border p-1">
              <button
                onClick={() => setTheme("dark")}
                className={`grid h-10 w-10 place-items-center rounded-md ${
                  theme === "dark" ? "bg-teal text-ink" : "text-muted-foreground"
                }`}
                aria-label="Dark workspace"
              >
                <Moon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTheme("light")}
                className={`grid h-10 w-10 place-items-center rounded-md ${
                  theme === "light" ? "bg-teal text-ink" : "text-muted-foreground"
                }`}
                aria-label="Light workspace"
              >
                <Sun className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            className={`grid gap-px overflow-hidden rounded-md border ${
              workspaceIsLight
                ? "border-slate-200 bg-slate-200 text-slate-950"
                : "border-border bg-border text-foreground"
            } lg:grid-cols-[minmax(0,1fr)_360px]`}
          >
            <div className={workspaceIsLight ? "bg-white p-5 lg:p-8" : "bg-background p-5 lg:p-8"}>
              <ToolExperience
                tool={tool}
                input={input}
                setInput={setInput}
                output={output}
                tone={tone}
                setTone={setTone}
                words={words}
                characters={characters}
                score={score}
                aiScore={aiScore}
                light={workspaceIsLight}
              />

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={submitTool}
                  className="inline-flex items-center gap-2 rounded-md bg-orange px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ink hover:bg-orange-glow"
                >
                  <WandSparkles className="h-4 w-4" />
                  Submit
                </button>
                <button
                  onClick={copyOutput}
                  className="inline-flex items-center gap-2 rounded-md bg-teal px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ink hover:bg-teal-glow"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
                <button
                  onClick={downloadOutput}
                  className={`inline-flex items-center gap-2 rounded-md border px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] ${
                    workspaceIsLight
                      ? "border-slate-200 text-slate-700 hover:bg-slate-50"
                      : "border-border text-foreground hover:bg-foreground/10"
                  }`}
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
                <button
                  onClick={shareOutput}
                  className={`inline-flex items-center gap-2 rounded-md border px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] ${
                    workspaceIsLight
                      ? "border-slate-200 text-slate-700 hover:bg-slate-50"
                      : "border-border text-foreground hover:bg-foreground/10"
                  }`}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
                <button
                  onClick={saveHistory}
                  className={`inline-flex items-center gap-2 rounded-md border px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] ${
                    workspaceIsLight
                      ? "border-slate-200 text-slate-700 hover:bg-slate-50"
                      : "border-border text-foreground hover:bg-foreground/10"
                  }`}
                >
                  <Check className="h-4 w-4" />
                  Save
                </button>
              </div>
              {notice && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-md border border-teal/30 bg-teal/10 px-4 py-3 text-sm text-teal"
                >
                  {notice}
                </motion.div>
              )}
            </div>

            <aside className={workspaceIsLight ? "bg-slate-50 p-5 lg:p-6" : "bg-ink p-5 lg:p-6"}>
              <div className="grid gap-px overflow-hidden rounded-md bg-current/10">
                <ScoreRing label={tool.metricLabel} value={score} light={workspaceIsLight} />
                <ScoreRing label="AI score" value={aiScore} inverse light={workspaceIsLight} />
              </div>

              <div className="mt-5 rounded-md border border-current/10 p-5">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em]">History</p>
                <div className="space-y-3">
                  {history.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-current/70">
                      <Activity className="h-4 w-4 text-teal" />
                      <span className="break-words">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-md border border-current/10 p-5">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em]">Outputs</p>
                <div className="space-y-2">
                  {tool.outputs.map((item) => (
                    <div key={item} className="rounded-md border border-current/10 p-3 text-sm">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-ink py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-orange">
                Tool backend
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight lg:text-6xl">
                Production modules for {tool.shortName}.
              </h2>
            </Reveal>
            <div className="grid gap-px bg-border md:grid-cols-2">
              {tool.backend.map((item) => (
                <div key={item} className="bg-background p-6">
                  <Check className="mb-4 h-5 w-5 text-teal" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal">
                More tools
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight">
                Open another dedicated page.
              </h2>
            </div>
            <ArrowRight className="hidden h-7 w-7 text-orange md:block" />
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tools
              .filter((item) => item.id !== tool.id)
              .slice(0, 6)
              .map((item) => {
                return <ToolCatalogCard key={item.id} tool={item} />;
              })}
          </div>
        </div>
      </section>
    </>
  );
}
