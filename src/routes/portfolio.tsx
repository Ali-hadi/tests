import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import case1 from "@/assets/case-1.jpg";
import case2 from "@/assets/case-2.jpg";
import case3 from "@/assets/case-3.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — AItouchSolutions" },
      { name: "description", content: "Selected case studies: AI dashboards, automation engines, mobile apps for global clients." },
      { property: "og:title", content: "Portfolio — AItouchSolutions" },
      { property: "og:description", content: "Award-grade work delivered for ambitious teams worldwide." },
    ],
  }),
  component: PortfolioPage,
});

const projects = [
  { img: case1, industry: "Logistics · Enterprise", tag: "AI Analytics", t: "NeuralCore Analytics", d: "Real-time predictive modeling platform unifying 14 data sources across 60+ global warehouses.", stack: "Next.js · Python · PostgreSQL · OpenAI", result: "84% ops reduction" },
  { img: case2, industry: "Fintech · SaaS", tag: "Automation", t: "AutoFlow Engine", d: "End-to-end workflow automation serving 12k+ users with sub-second triggers.", stack: "Node.js · LangChain · Redis · AWS", result: "12k+ users" },
  { img: case3, industry: "Healthcare · Mobile", tag: "Mobile · iOS/Android", t: "Pulse Health App", d: "AI wellness companion with on-device inference and HIPAA-grade security.", stack: "React Native · CoreML · Supabase", result: "4.8★ rating" },
];

function PortfolioPage() {
  return (
    <>
      <section className="pt-40 lg:pt-52 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-8">Selected Work</p>
            <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-[-0.04em] leading-[0.9]">
              Case studies.
            </h1>
          </Reveal>
        </div>
      </section>
      <section className="pb-32 space-y-24 lg:space-y-32">
        {projects.map((p, i) => (
          <Reveal key={i}>
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${i % 2 ? "lg:flex-row-reverse" : ""}`}>
                <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-ink-2 group">
                    <img src={p.img} alt={p.t} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal mb-4">{p.industry}</p>
                  <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-[-0.03em] mb-6">{p.t}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">{p.d}</p>
                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between text-sm border-b border-border pb-3">
                      <span className="text-muted-foreground">Stack</span>
                      <span className="font-mono text-xs">{p.stack}</span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-border pb-3">
                      <span className="text-muted-foreground">Result</span>
                      <span className="text-teal font-bold">{p.result}</span>
                    </div>
                  </div>
                  <span className="px-4 py-2 glass rounded-full text-[10px] font-mono uppercase tracking-widest text-orange">{p.tag}</span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
}
