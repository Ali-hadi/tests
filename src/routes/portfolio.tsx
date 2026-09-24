import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, ShieldCheck, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import case1 from "@/assets/case-1.jpg";
import case2 from "@/assets/case-2.jpg";
import case3 from "@/assets/case-3.jpg";
import {
  enterpriseProjects,
  projectCategories,
  type EnterpriseProject,
} from "@/lib/project-catalog";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/portfolio")({
  head: ({ matches }) => {
    const currentMatch = matches[matches.length - 1];
    if (currentMatch?.fullPath !== "/portfolio") return {};

    return createSeo({
      title: "Software Solution Concepts | AiTouchSolutions",
      description:
        "Explore illustrative software solution concepts across CRM, ERP, AI automation, e-commerce, mobile apps, and SaaS. These examples are not client case studies.",
      path: "/portfolio",
      noIndex: true,
      keywords: [
        "CRM portfolio",
        "ERP project examples",
        "AI software portfolio",
        "SaaS dashboard examples",
        "enterprise software projects",
      ],
    });
  },
  component: PortfolioPage,
});

const featuredProjects = [
  {
    img: case1,
    industry: "Logistics / Enterprise AI",
    tag: "Control Tower",
    title: "NeuralCore Analytics",
    description:
      "A predictive operations dashboard concept for logistics teams, combining live events, route health, inventory signals, and AI recommendations.",
    stack: "React / Python / PostgreSQL / OpenAI",
    result: "Illustrative dashboard view",
  },
  {
    img: case2,
    industry: "Fintech / Automation",
    tag: "Workflow Engine",
    title: "AutoFlow Engine",
    description:
      "An automation platform pattern for approvals, reconciliation, team queues, audit trails, and exception handling at enterprise scale.",
    stack: "Node.js / LangChain / Redis / AWS",
    result: "Workflow design concept",
  },
  {
    img: case3,
    industry: "Healthcare / Mobile",
    tag: "Patient Platform",
    title: "Pulse Health App",
    description:
      "A healthcare product interface for appointments, wellness insights, reminders, patient history, and secure care-team messaging.",
    stack: "React Native / Supabase / AI Assistants",
    result: "Mobile app concept",
  },
];

const snapshotLabels = [
  "Pipeline",
  "Revenue",
  "Approvals",
  "Tickets",
  "Forecast",
  "Risk",
  "Inventory",
  "Engagement",
];

function PortfolioPage() {
  const [category, setCategory] = useState("All concepts");
  const [query, setQuery] = useState("");
  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return enterpriseProjects.filter((project) => {
      const matchesCategory = category === "All concepts" || project.category === category;
      const matchesQuery =
        !normalizedQuery ||
        `${project.name} ${project.description} ${project.category} ${project.industry}`
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <>
      <section className="pt-40 lg:pt-52 pb-20 overflow-hidden relative">
        <div className="hero-wave-field opacity-40" aria-hidden="true">
          <span className="hero-wave hero-wave-a" />
          <span className="hero-wave hero-wave-b" />
          <span className="hero-wave hero-wave-c" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-8">
              Illustrative solution concepts
            </p>
            <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-[-0.04em] leading-[0.9] max-w-6xl">
              Examples of systems businesses may need.
            </h1>
            <p className="mt-10 max-w-3xl text-lg text-muted-foreground leading-relaxed">
              The following screens are illustrative product concepts, not client projects or
              evidence of delivered results. Use them to start a conversation about the workflows,
              integrations, and features your own product may need.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-12 grid max-w-3xl grid-cols-1 gap-px bg-border sm:grid-cols-2">
              {[
                {
                  icon: Sparkles,
                  value: `${enterpriseProjects.length}+`,
                  label: "Illustrative concepts",
                },
                { icon: ShieldCheck, value: "CRM / ERP", label: "Core business systems" },
              ].map((item) => (
                <div key={item.label} className="bg-background p-8">
                  <item.icon className="w-6 h-6 text-teal mb-6" />
                  <p className="font-display text-4xl font-bold">{item.value}</p>
                  <p className="mt-2 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-orange mb-5">
                  Visual concepts
                </p>
                <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-[-0.03em]">
                  Illustrative screen directions, not screenshots of delivered client work.
                </h2>
              </div>
              <p className="max-w-md text-muted-foreground leading-relaxed">
                Each preview uses a product-style composition: metrics, charts, records, alerts, and
                decision panels, not generic stock thumbnails.
              </p>
            </div>
          </Reveal>

          <div className="space-y-20">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.title}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border-t border-border pt-12">
                  <div className={`lg:col-span-7 ${index % 2 ? "lg:order-2" : ""}`}>
                    <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-ink-2 group relative">
                      <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                      <div className="absolute inset-x-5 bottom-5 glass rounded-xl p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-teal">
                              {project.tag}
                            </p>
                            <p className="font-display text-2xl font-bold mt-1">{project.title}</p>
                          </div>
                          <BarChart3 className="w-8 h-8 text-orange" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal mb-4">
                      {project.industry}
                    </p>
                    <h3 className="font-display text-4xl lg:text-6xl font-bold tracking-[-0.03em] mb-6">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {project.description}
                    </p>
                    <div className="space-y-3 mb-8">
                      <InfoRow label="Stack" value={project.stack} />
                      <InfoRow label="Result" value={project.result} strong />
                    </div>
                    <Link
                      to="/contact"
                      search={{ service: "Custom Software", project: project.title }}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-teal hover:text-teal-glow"
                    >
                      Discuss a similar concept <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 border-y border-border bg-ink">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-col lg:flex-row justify-between gap-8 mb-12">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-5">
                  Solution concept library
                </p>
                <h2 className="font-display text-4xl lg:text-7xl font-bold tracking-[-0.03em] max-w-4xl">
                  Illustrative patterns for common business workflows. These are not client case
                  studies.
                </h2>
              </div>
              <Link
                to="/contact"
                className="h-fit inline-flex items-center justify-center px-6 py-4 bg-teal text-ink rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-teal-glow"
              >
                Build one of these
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <div className="mb-10 space-y-5">
              <label className="block max-w-xl">
                <span className="sr-only">Search product concepts</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search systems, workflows, or industries"
                  className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
                />
              </label>
              <div
                className="flex gap-2 overflow-x-auto pb-2"
                aria-label="Filter concepts by category"
              >
                <button
                  type="button"
                  aria-pressed={category === "All concepts"}
                  onClick={() => setCategory("All concepts")}
                  className={`shrink-0 rounded-full border px-4 py-2 text-[10px] font-mono uppercase tracking-[0.16em] transition ${category === "All concepts" ? "border-teal bg-teal/10 text-teal" : "border-border bg-background/60 text-muted-foreground hover:border-teal/50 hover:text-foreground"}`}
                >
                  All concepts ({enterpriseProjects.length})
                </button>
                {projectCategories.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-pressed={category === item.name}
                    onClick={() => setCategory(item.name)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-[10px] font-mono uppercase tracking-[0.16em] transition ${category === item.name ? "border-teal bg-teal/10 text-teal" : "border-border bg-background/60 text-muted-foreground hover:border-teal/50 hover:text-foreground"}`}
                  >
                    {item.name} ({item.count})
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground" aria-live="polite">
                Showing {visibleProjects.length} of {enterpriseProjects.length} product concepts
              </p>
            </div>
          </Reveal>

          {visibleProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {visibleProjects.map((project, index) => (
                <Reveal key={project.id} delay={index % 6}>
                  <ProjectCard project={project} index={index} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-background p-10 text-center">
              <h3 className="font-display text-2xl font-bold">No matching concepts</h3>
              <p className="mt-3 text-muted-foreground">Try another phrase or clear your search.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("All concepts");
                }}
                className="mt-6 rounded-full border border-teal/40 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-teal hover:bg-teal/10"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-28 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-ink p-10 lg:p-16">
              <div className="absolute inset-0 grid-overlay opacity-20" />
              <div className="relative max-w-4xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-orange mb-6">
                  Start with your product idea
                </p>
                <h2 className="font-display text-5xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.95]">
                  Pick a system, then let us turn it into your business engine.
                </h2>
                <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-2xl">
                  These illustrative product directions can help AiTouchSolutions scope the
                  workflows, dashboard UX, database model, automation logic, and deployment plan for
                  your industry.
                </p>
                <Link
                  to="/contact"
                  className="mt-10 inline-flex px-8 py-4 bg-orange text-ink rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-orange-glow"
                >
                  Request a project quote
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ProjectCard({ project, index }: { project: EnterpriseProject; index: number }) {
  const accentClass =
    project.accent === "teal"
      ? "border-teal/30 bg-teal/10 text-teal"
      : "border-orange/30 bg-orange/10 text-orange";

  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:border-teal/50 hover:shadow-[0_24px_80px_-48px_rgba(14,140,142,0.6)]">
      <ProjectSnapshot project={project} index={index} />
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <span
            className={`px-3 py-1 rounded-full border text-[10px] font-mono uppercase tracking-[0.18em] ${accentClass}`}
          >
            {String(index + 1).padStart(3, "0")}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground text-right">
            {project.category}
          </span>
        </div>
        <h3 className="font-display text-2xl font-bold tracking-tight group-hover:text-teal transition-colors">
          {project.name}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-6 space-y-3">
          <InfoRow label="Stack" value={project.stack} />
          <InfoRow
            label="Concept focus"
            value={project.metrics[index % project.metrics.length]}
            strong
          />
        </div>
        <Link
          to="/portfolio/$projectId"
          params={{ projectId: project.id }}
          className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
        >
          Open concept blueprint <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

function ProjectSnapshot({ project, index }: { project: EnterpriseProject; index: number }) {
  const bars = [34, 58, 46, 78, 64, 88].map((value, itemIndex) =>
    Math.min(94, value + ((index + itemIndex * 7) % 18)),
  );
  const accentBar = project.accent === "teal" ? "bg-teal" : "bg-orange";
  const label = snapshotLabels[index % snapshotLabels.length];

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(14,140,142,0.25),transparent_35%),radial-gradient(circle_at_85%_25%,rgba(242,106,31,0.18),transparent_34%),linear-gradient(135deg,#07131f,#0d2031_55%,#111827)] p-4">
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="relative h-full rounded-xl border border-white/10 bg-ink/78 backdrop-blur-sm overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-orange" />
            <span className="h-2.5 w-2.5 rounded-full bg-teal" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
          </div>
          <p className="truncate text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
            {label} concept UI
          </p>
          <span className="h-2 w-2 rounded-full bg-teal/70" aria-hidden="true" />
        </div>

        <div className="grid h-[calc(100%-45px)] grid-cols-12 gap-3 p-4">
          <div className="col-span-5 space-y-3">
            {project.metrics.map((metric, metricIndex) => (
              <div key={metric} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  {metricIndex === 0 ? "Primary" : metricIndex === 1 ? "Signal" : "Status"}
                </p>
                <p className="mt-1 truncate text-sm font-bold text-foreground">{metric}</p>
              </div>
            ))}
          </div>
          <div className="col-span-7 grid grid-rows-[1fr_auto] gap-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <div className="flex h-full items-end gap-2">
                {bars.map((height, barIndex) => (
                  <span
                    key={barIndex}
                    className={`flex-1 rounded-t-sm ${barIndex === 4 ? accentBar : "bg-white/18"}`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["Roles", "Workflow", "Reports"].map((tag, tagIndex) => (
                <div key={tag} className="rounded-md border border-white/10 bg-white/[0.03] p-2">
                  <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                    {tag}
                  </p>
                  <div className="mt-2 h-1.5 rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full ${tagIndex === 1 ? "bg-orange" : "bg-teal"}`}
                      style={{ width: `${58 + ((index + tagIndex * 11) % 34)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border pb-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={`text-right font-mono text-xs ${strong ? "text-teal font-bold" : ""}`}>
        {value}
      </span>
    </div>
  );
}
