import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — AItouchSolutions" },
      {
        name: "description",
        content:
          "Fixed-price projects, hourly engagements, dedicated teams, AI packages — transparent global pricing.",
      },
      { property: "og:title", content: "Pricing — AItouchSolutions" },
      {
        property: "og:description",
        content: "Flexible engagement models for projects of any size.",
      },
    ],
  }),
  component: PricingPage,
});

const tiers = [
  {
    name: "Hourly",
    price: "$45",
    unit: "/ hour",
    desc: "Flexible engagements for ongoing work, support, and iterative builds.",
    features: ["Senior engineers", "Weekly reports", "Slack collaboration", "No minimum commit"],
    cta: "Start hourly",
    accent: "teal" as const,
  },
  {
    name: "Fixed Project",
    price: "From $4,500",
    unit: "/ project",
    desc: "Defined scope, defined cost. Ideal for MVPs, websites, and AI POCs.",
    features: [
      "Scoped deliverables",
      "Milestone-based delivery",
      "QA & launch included",
      "30-day support",
    ],
    cta: "Request quote",
    accent: "orange" as const,
    featured: true,
  },
  {
    name: "Dedicated Team",
    price: "From $6,500",
    unit: "/ month",
    desc: "Embedded engineering pod operating as an extension of your team.",
    features: ["Full-stack pod", "Daily standups", "Quarterly OKRs", "24/7 timezone coverage"],
    cta: "Build a pod",
    accent: "teal" as const,
  },
];

const packages = [
  {
    t: "AI Automation Package",
    d: "Identify, build, and deploy 3 automation workflows in 30 days.",
    p: "From $9,500",
  },
  {
    t: "AI Chatbot Package",
    d: "Custom RAG chatbot trained on your content, integrated to web/Slack/WhatsApp.",
    p: "From $5,500",
  },
  {
    t: "Enterprise Custom",
    d: "Multi-quarter engagements with dedicated leadership and SLAs.",
    p: "Let's talk",
  },
];

function PricingPage() {
  return (
    <>
      <section className="pt-40 lg:pt-52 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-8">
              Pricing
            </p>
            <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-[-0.04em] leading-[0.9]">
              Transparent. <br />
              <span className="gradient-text">Global. Flexible.</span>
            </h1>
            <p className="mt-10 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Choose hourly, fixed-price, or dedicated team. Every engagement scoped clearly
              upfront.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i}>
              <div
                className={`relative p-10 rounded-2xl h-full ${t.featured ? "bg-gradient-to-b from-teal/10 to-orange/5 border-2 border-teal" : "glass"}`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange text-ink text-[10px] font-mono uppercase tracking-widest rounded-full">
                    Most popular
                  </span>
                )}
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
                  {t.name}
                </p>
                <div className="mb-8">
                  <span className="font-display text-5xl font-bold">{t.price}</span>
                  <span className="text-muted-foreground text-sm ml-1">{t.unit}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">{t.desc}</p>
                <ul className="space-y-3 mb-10">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className="text-teal mt-1">→</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`block text-center py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] ${
                    t.featured
                      ? "bg-teal text-ink hover:bg-teal-glow"
                      : "border border-border hover:bg-foreground/5"
                  }`}
                >
                  {t.cta} →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 border-t border-border bg-ink">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-[-0.03em] mb-12">
              Specialised packages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((p) => (
                <div key={p.t} className="glass p-8 rounded-2xl">
                  <h3 className="font-display text-2xl font-bold mb-3">{p.t}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{p.d}</p>
                  <p className="font-mono text-teal text-sm">{p.p}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
