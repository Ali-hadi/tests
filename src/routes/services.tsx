import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AItouchSolutions" },
      {
        name: "description",
        content:
          "AI Agents, Automation, Custom SaaS, Web & Mobile Apps, CRM/ERP, Cloud & DevOps. Fixed-price or hourly. 24/7 global delivery.",
      },
      { property: "og:title", content: "Services — AItouchSolutions" },
      {
        property: "og:description",
        content: "End-to-end AI and software services for global clients.",
      },
    ],
  }),
  component: ServicesPage,
});

const groups = [
  {
    label: "AI & Intelligence",
    items: [
      {
        t: "AI Agent Development",
        d: "Autonomous LLM agents that reason and execute multi-step workflows.",
      },
      { t: "AI Automation", d: "Custom workflow automation across your business systems." },
      { t: "AI Training", d: "Fine-tuning and proprietary model training on your data." },
      {
        t: "AI Chatbots",
        d: "Production-grade conversational AI with RAG over your knowledge base.",
      },
      { t: "AI SaaS Platforms", d: "End-to-end AI products from concept to scale." },
    ],
  },
  {
    label: "Product Engineering",
    items: [
      { t: "Web Application Development", d: "Next.js / React full-stack apps." },
      { t: "Mobile App Development", d: "Native iOS, Android, React Native, Flutter." },
      { t: "Custom Software", d: "Bespoke systems tailored to your operations." },
      { t: "SaaS Product Development", d: "From MVP to scaled multi-tenant platform." },
      { t: "MVP Development", d: "Production-ready MVPs shipped in 4–8 weeks." },
    ],
  },
  {
    label: "Commerce & CMS",
    items: [
      { t: "WordPress Development", d: "Headless and traditional WP at scale." },
      { t: "Shopify Development", d: "Custom themes, apps, and integrations." },
      { t: "E-commerce Solutions", d: "Multi-channel commerce architecture." },
      { t: "CRM / ERP Systems", d: "Custom business management systems." },
    ],
  },
  {
    label: "Design & Frontend",
    items: [
      { t: "UI/UX Design", d: "Product-led design with user research." },
      { t: "Frontend Development", d: "Pixel-perfect, performant, accessible." },
      { t: "Backend Development", d: "Node, Python, Go — scalable APIs." },
      { t: "API Integration", d: "Connect any third-party service." },
    ],
  },
  {
    label: "Cloud & Operations",
    items: [
      { t: "Cloud Deployment", d: "AWS, GCP, Azure, Vercel, Cloudflare." },
      { t: "DevOps", d: "CI/CD, containerization, observability." },
      { t: "Cybersecurity", d: "Audits, hardening, compliance." },
      { t: "Maintenance & Support", d: "Ongoing reliability and improvement." },
    ],
  },
  {
    label: "Engagement Models",
    items: [
      { t: "Dedicated Developers", d: "Embedded engineers for your team." },
      { t: "Fixed-Price Projects", d: "Defined scope, defined cost." },
      { t: "Hourly Development", d: "Flexible engagements from $45/hr." },
      { t: "Data Dashboards", d: "Custom analytics and BI dashboards." },
      { t: "Business Automation", d: "Replace manual ops with intelligent systems." },
    ],
  },
];

function ServicesPage() {
  return (
    <>
      <section className="pt-40 lg:pt-52 pb-20 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-8">
              Services
            </p>
            <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-[-0.04em] leading-[0.9] max-w-5xl">
              Everything you need to build, <span className="gradient-text">launch & scale</span>.
            </h1>
            <p className="mt-10 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              A complete software studio across AI, product engineering, design, and cloud — engaged
              on fixed-price or hourly terms, 24/7 globally.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 space-y-20 lg:space-y-32">
          {groups.map((g, gi) => (
            <Reveal key={g.label}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-border pt-12">
                <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal mb-4">
                    / 0{gi + 1}
                  </p>
                  <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
                    {g.label}
                  </h2>
                </div>
                <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-border">
                  {g.items.map((it) => (
                    <div
                      key={it.t}
                      className="bg-background p-8 hover:bg-ink-2 transition-colors group"
                    >
                      <h3 className="font-display text-xl font-bold mb-3 group-hover:text-teal transition-colors">
                        {it.t}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{it.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-32 border-t border-border bg-ink">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-display text-5xl lg:text-7xl font-bold tracking-[-0.03em] mb-8 max-w-3xl mx-auto">
            Not sure where to start?
          </h2>
          <Link
            to="/contact"
            className="inline-flex px-8 py-4 bg-teal text-ink rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-teal-glow"
          >
            Get a custom quote →
          </Link>
        </div>
      </section>
    </>
  );
}
