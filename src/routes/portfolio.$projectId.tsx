import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Layers3, Workflow, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/site/Reveal";
import { enterpriseProjects } from "@/lib/project-catalog";
import { createSeo } from "@/lib/seo";

function getProject(projectId: string) {
  return enterpriseProjects.find((project) => project.id === projectId);
}

export const Route = createFileRoute("/portfolio/$projectId")({
  head: ({ params }) => {
    const project = getProject(params.projectId);
    return createSeo({
      title: project
        ? `${project.name} Product Concept | AiTouchSolutions`
        : "Product Concept | AiTouchSolutions",
      description: project
        ? `${project.description} Explore its proposed workflow, feature scope, and technology starting point.`
        : "Explore an illustrative software product concept from AiTouchSolutions.",
      path: `/portfolio/${params.projectId}`,
      noIndex: true,
    });
  },
  loader: ({ params }) => {
    const project = getProject(params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectConceptPage,
});

function ProjectConceptPage() {
  const { project } = Route.useLoaderData();
  const featureAreas = project.description
    .replace(/[.!?]$/, "")
    .split(/,\s*|\s+and\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
  const relatedProjects = enterpriseProjects
    .filter((item) => item.category === project.category && item.id !== project.id)
    .slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-36 lg:pb-28 lg:pt-48">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(14,140,142,0.16),transparent_32%),radial-gradient(circle_at_90%_12%,rgba(242,106,31,0.12),transparent_28%)]" />
        <div className="grid-overlay absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground transition hover:text-teal"
          >
            <ArrowLeft className="h-4 w-4" /> All concepts
          </Link>
          <Reveal>
            <div className="mt-12 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-teal">
              <Layers3 className="h-3.5 w-3.5" /> Illustrative product blueprint
            </div>
            <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.28em] text-orange">
              {project.category} / {project.industry}
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold leading-[0.96] tracking-[-0.04em] md:text-7xl lg:text-8xl">
              {project.name}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
              {project.description}
            </p>
            <p className="mt-6 max-w-3xl rounded-xl border border-orange/25 bg-orange/5 p-5 text-sm leading-relaxed text-muted-foreground">
              This page is a proposed product direction to make scope tangible. It is not a claim
              that AiTouchSolutions has built this system for a client. Features and technology
              should be validated against your requirements.
            </p>
            <Link
              to="/contact"
              search={{ service: "Custom Software", project: project.name }}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-teal px-6 py-4 text-xs font-bold uppercase tracking-[0.17em] text-ink transition hover:bg-teal-glow"
            >
              Discuss a similar product <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-6 md:grid-cols-3 lg:px-10">
          <ConceptPanel
            icon={<Workflow className="h-5 w-5" />}
            title="Workflow outline"
            description="A starting view of the workflows this product concept could support."
          >
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {featureAreas.slice(0, 5).map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" /> {item}
                </li>
              ))}
            </ul>
          </ConceptPanel>
          <ConceptPanel
            icon={<Layers3 className="h-5 w-5" />}
            title="Experience modules"
            description="Areas to map with your users before deciding the final feature set."
          >
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {project.metrics.map((metric) => (
                <li key={metric} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" /> {metric}
                </li>
              ))}
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" /> Roles,
                permissions, and team views as needed
              </li>
            </ul>
          </ConceptPanel>
          <ConceptPanel
            icon={<Wrench className="h-5 w-5" />}
            title="Technology starting point"
            description="An example stack from the concept library, subject to architecture discovery."
          >
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.split(/,\s*/).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-background px-3 py-2 text-xs text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </ConceptPanel>
        </div>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="border-t border-border bg-ink py-20 lg:py-28">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-teal">
              More in {project.category}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
              Related product directions
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {relatedProjects.map((related) => (
                <Link
                  key={related.id}
                  to="/portfolio/$projectId"
                  params={{ projectId: related.id }}
                  className="rounded-2xl border border-border bg-background p-6 transition hover:-translate-y-1 hover:border-teal/50"
                >
                  <h3 className="font-display text-xl font-bold">{related.name}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {related.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-teal">
                    Explore concept <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

function ConceptPanel({
  icon,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-border bg-background p-6 transition-colors hover:border-teal/35 lg:p-8">
      <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-teal/10 text-teal">
        {icon}
      </div>
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
      {children}
    </article>
  );
}
