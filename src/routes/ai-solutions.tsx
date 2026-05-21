import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/ai-solutions")({
  head: () => ({
    meta: [
      { title: "AI Solutions — AItouchSolutions" },
      {
        name: "description",
        content:
          "AI Agents, RAG systems, custom LLMs, intelligent automation, computer vision, and AI SaaS platforms.",
      },
      { property: "og:title", content: "AI Solutions — AItouchSolutions" },
      { property: "og:description", content: "Production AI for global enterprises." },
    ],
  }),
  component: AIPage,
});

const solutions = [
  {
    n: "01",
    t: "Autonomous AI Agents",
    d: "Multi-step reasoning agents that plan, call tools, and execute complex workflows independently. LangChain, custom tooling, and observability built-in.",
  },
  {
    n: "02",
    t: "RAG over your Knowledge",
    d: "Retrieval-augmented systems that turn your documents, wikis, and databases into conversational AI.",
  },
  {
    n: "03",
    t: "Custom LLM Fine-tuning",
    d: "Domain-specific models trained on your data — for accuracy, voice, and security.",
  },
  {
    n: "04",
    t: "Intelligent Automation",
    d: "Replace manual back-office work with AI-orchestrated pipelines and human-in-the-loop controls.",
  },
  {
    n: "05",
    t: "Computer Vision",
    d: "Visual inspection, OCR, video analysis, and on-device inference for mobile and edge.",
  },
  {
    n: "06",
    t: "AI SaaS Platforms",
    d: "From idea to scalable AI product — full-stack engineering with usage billing and tenant isolation.",
  },
];

function AIPage() {
  return (
    <>
      <section className="pt-40 lg:pt-52 pb-20 lg:pb-32 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-teal/15 blur-[160px] rounded-full -z-10" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-8">
              AI Solutions
            </p>
            <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-[-0.04em] leading-[0.9] max-w-5xl">
              Production AI <br />
              <span className="gradient-text">that ships.</span>
            </h1>
            <p className="mt-10 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              We build AI systems that survive contact with reality — observable, secure,
              cost-aware, and fully integrated with your stack.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {solutions.map((s, i) => (
            <Reveal key={s.n} delay={i}>
              <div className="bg-background p-10 lg:p-14 h-full hover:bg-ink-2 transition-colors group">
                <p className="font-mono text-xs text-teal mb-6">{s.n}</p>
                <h3 className="font-display text-3xl lg:text-4xl font-bold mb-5 tracking-tight group-hover:text-teal transition-colors">
                  {s.t}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-32 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-display text-5xl lg:text-7xl font-bold tracking-[-0.03em] mb-8">
            Have an AI use case in mind?
          </h2>
          <Link
            to="/contact"
            className="inline-flex px-8 py-4 bg-teal text-ink rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-teal-glow"
          >
            Scope it with us →
          </Link>
        </div>
      </section>
    </>
  );
}
