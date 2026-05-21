import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, DatabaseZap, ShieldCheck, Sparkles } from "lucide-react";
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
  head: () =>
    createSeo({
      title: "100+ CRM, ERP, AI & SaaS Project Portfolio | AItouchSolutions",
      description:
        "Explore 100+ realistic enterprise project concepts and dashboard snapshots across CRM, ERP, AI automation, fintech, healthcare, logistics, real estate, and SaaS platforms.",
      path: "/portfolio",
      keywords: [
        "CRM portfolio",
        "ERP project examples",
        "AI software portfolio",
        "SaaS dashboard examples",
        "enterprise software projects",
      ],
    }),
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
    result: "Real-time decision layer",
  },
  {
    img: case2,
    industry: "Fintech / Automation",
    tag: "Workflow Engine",
    title: "AutoFlow Engine",
    description:
      "An automation platform pattern for approvals, reconciliation, team queues, audit trails, and exception handling at enterprise scale.",
    stack: "Node.js / LangChain / Redis / AWS",
    result: "Ops automation blueprint",
  },
  {
    img: case3,
    industry: "Healthcare / Mobile",
    tag: "Patient Platform",
    title: "Pulse Health App",
    description:
      "A healthcare product interface for appointments, wellness insights, reminders, patient history, and secure care-team messaging.",
    stack: "React Native / Supabase / AI Assistants",
    result: "Mobile health product pattern",
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
              Enterprise project catalog
            </p>
            <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-[-0.04em] leading-[0.9] max-w-6xl">
              100+ big-system ideas that look ready to ship.
            </h1>
            <p className="mt-10 max-w-3xl text-lg text-muted-foreground leading-relaxed">
              CRM, ERP, AI automation, fintech, healthcare, logistics, real estate, e-commerce,
              public-sector, and SaaS systems with realistic dashboard snapshots. The goal is
              simple: clients should instantly see the scale AItouchSolutions can build.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
              {[
                {
                  icon: Sparkles,
                  value: `${enterpriseProjects.length}+`,
                  label: "Project patterns",
                },
                { icon: DatabaseZap, value: "12", label: "Enterprise verticals" },
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
                  Showcase snapshots
                </p>
                <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-[-0.03em]">
                  Premium client-facing visuals.
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
                  100+ project library
                </p>
                <h2 className="font-display text-4xl lg:text-7xl font-bold tracking-[-0.03em] max-w-4xl">
                  Real-world systems clients already understand and need.
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
            <div className="mb-10 flex gap-2 overflow-x-auto pb-2">
              {projectCategories.map((category) => (
                <span
                  key={category.name}
                  className="shrink-0 px-4 py-2 rounded-full border border-border bg-background/60 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground"
                >
                  {category.name} ({category.count})
                </span>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {enterpriseProjects.map((project, index) => (
              <Reveal key={project.id} delay={index % 6}>
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-ink p-10 lg:p-16">
              <div className="absolute inset-0 grid-overlay opacity-20" />
              <div className="relative max-w-4xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-orange mb-6">
                  Client conversion section
                </p>
                <h2 className="font-display text-5xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.95]">
                  Pick a system, then let us turn it into your business engine.
                </h2>
                <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-2xl">
                  These are implementation-ready product directions. AItouchSolutions can scope the
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
    <article className="group h-full overflow-hidden rounded-2xl border border-border bg-background hover:border-teal/40 transition-colors">
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
          <InfoRow label="Metric" value={project.metrics[index % project.metrics.length]} strong />
        </div>
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
            {label} OS
          </p>
          <span className="h-2 w-2 rounded-full bg-teal animate-pulse-glow" />
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
              {["Live", "Secure", "AI"].map((tag, tagIndex) => (
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
