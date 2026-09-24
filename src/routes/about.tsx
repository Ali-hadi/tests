import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import founder from "@/assets/founder-jon.jpg";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    createSeo({
      title: "About AiTouchSolutions | AI and Software Development",
      description:
        "Learn how AiTouchSolutions approaches AI, automation, custom software, web and mobile apps, and SaaS product development.",
      path: "/about",
      keywords: ["AiTouchSolutions", "AI development", "custom software development"],
    }),
  component: AboutPage,
});

const values = [
  {
    t: "Engineering excellence",
    d: "Production-grade code, observability built in, no shortcuts.",
  },
  {
    t: "AI-first by default",
    d: "We embed intelligence into every layer — not as an afterthought.",
  },
  {
    t: "Clear collaboration",
    d: "We make scope, tradeoffs, milestones, and open questions visible throughout a project.",
  },
  { t: "Transparent partnership", d: "Clear scope, clear cost, clear communication." },
];

function AboutPage() {
  return (
    <>
      <section className="pt-40 lg:pt-52 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-8">
              About
            </p>
            <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-[-0.04em] leading-[0.9] max-w-5xl">
              Building the <span className="gradient-text">intelligence layer</span> of modern
              business.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-24 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-ink-2">
              <img src={founder} alt="Jon" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange mb-6">
              Founder
            </p>
            <h2 className="font-display text-5xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.95] mb-8">
              Jon
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              AiTouchSolutions works with businesses to scope and build software products,
              applications, and automation. We start by understanding the users, business process,
              constraints, and outcome a project needs to support.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The team can help shape an MVP, design an application architecture, integrate AI where
              it is useful, test and deploy a product, and continue improving it after launch.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          <Reveal>
            <h2 className="mb-10 font-display text-4xl font-bold lg:text-6xl">How we build</h2>
            <ol className="grid gap-px bg-border md:grid-cols-2">
              {[
                [
                  "01",
                  "Requirement discovery",
                  "Understand the business model, users, problems, features, integrations, budget, and timeline.",
                ],
                [
                  "02",
                  "Product strategy",
                  "Define an MVP, roadmap, technology choices, architecture, data, APIs, and security needs.",
                ],
                [
                  "03",
                  "UI and UX",
                  "Map user flows and create responsive interfaces with accessibility in mind.",
                ],
                [
                  "04",
                  "Development and AI",
                  "Build the product and add AI, retrieval, agents, or automation where they fit the problem.",
                ],
                [
                  "05",
                  "Testing and deployment",
                  "Check functionality, security, performance, mobile behavior, APIs, and edge cases before release.",
                ],
                [
                  "06",
                  "Maintenance",
                  "Plan updates, monitoring, fixes, scaling, and product improvements after launch.",
                ],
              ].map(([number, title, description]) => (
                <li key={number} className="bg-background p-7 lg:p-9">
                  <p className="mb-5 font-mono text-xs text-teal">{number}</p>
                  <h3 className="mb-3 font-display text-2xl font-bold">{title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{description}</p>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-lg leading-relaxed text-muted-foreground">
              Tell us what you need to build. We’ll help turn the requirement into a technology
              solution.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 border-t border-border bg-ink">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-[-0.03em] mb-16">
              What we stand for.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {values.map((v) => (
                <div key={v.t} className="bg-ink p-10 hover:bg-ink-2 transition-colors">
                  <h3 className="font-display text-2xl font-bold mb-4">{v.t}</h3>
                  <p className="text-muted-foreground leading-relaxed">{v.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 border-t border-border text-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <h2 className="font-display text-5xl lg:text-7xl font-bold tracking-[-0.03em] mb-8">
            Want to work with us?
          </h2>
          <Link
            to="/contact"
            className="inline-flex px-8 py-4 bg-teal text-ink rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-teal-glow"
          >
            Start a conversation →
          </Link>
        </div>
      </section>
    </>
  );
}
