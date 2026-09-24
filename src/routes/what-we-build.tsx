import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/what-we-build")({
  head: () =>
    createSeo({
      title: "What Can We Build? Business Software and AI Solutions | AiTouchSolutions",
      description:
        "Explore software options for business workflows, customer relationships, online stores, mobile apps, AI assistants, automation, and SaaS products.",
      path: "/what-we-build",
    }),
  component: WhatWeBuildPage,
});

const solutions = [
  {
    need: "Need a CRM or ERP?",
    description:
      "Plan a business system around your sales, service, operations, reporting, and existing integrations.",
    service: "CRM and ERP development",
    href: "/services/crm-erp-development",
  },
  {
    need: "Need a point-of-sale or inventory workflow?",
    description:
      "Discuss the checkout, inventory, user roles, reporting, and integrations a retail system may need.",
    service: "Custom software development",
    href: "/services/custom-saas-development",
  },
  {
    need: "Need an AI assistant or knowledge search?",
    description:
      "Explore chatbots, retrieval-augmented generation, and agent workflows connected to approved business data.",
    service: "AI chatbot development",
    href: "/services/ai-chatbot-development",
  },
  {
    need: "Need an online store?",
    description:
      "Plan a Shopify, WooCommerce, headless, or custom commerce experience around your catalog and operations.",
    service: "E-commerce development",
    href: "/services/ecommerce-development",
  },
  {
    need: "Need a mobile app?",
    description:
      "Scope an iOS, Android, or cross-platform app with the backend, accounts, notifications, and integrations it needs.",
    service: "Mobile app development",
    href: "/services/mobile-app-development",
  },
  {
    need: "Need to automate a business process?",
    description:
      "Map the repetitive work, exceptions, approvals, and systems involved before choosing automation or AI.",
    service: "AI automation",
    href: "/services/ai-automation",
  },
  {
    need: "Need a SaaS product or MVP?",
    description:
      "Shape an initial product, user experience, application architecture, and path to an maintainable release.",
    service: "SaaS and MVP development",
    href: "/services/custom-saas-development",
  },
  {
    need: "Need a custom web application?",
    description:
      "Discuss a customer portal, internal platform, marketplace, dashboard, or other workflow-specific application.",
    service: "Web application development",
    href: "/services/web-application-development",
  },
];

function WhatWeBuildPage() {
  return (
    <>
      <section className="pt-40 pb-16 lg:pt-52 lg:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="mb-7 font-mono text-[10px] uppercase tracking-[0.35em] text-teal">
              Solutions by business need
            </p>
            <h1 className="max-w-5xl font-display text-6xl font-bold leading-[0.94] tracking-[-0.04em] md:text-8xl">
              What do you need to <span className="gradient-text">build?</span>
            </h1>
            <p className="mt-9 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              AiTouchSolutions helps businesses turn ideas, problems, and opportunities into
              software, AI, and digital products. Start with the workflow or outcome you need; we
              can discuss a suitable approach and whether it is a fit.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="border-y border-border bg-ink py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-px bg-border px-6 md:grid-cols-2 lg:px-10">
          {solutions.map((solution, index) => (
            <Reveal key={solution.need} delay={index % 4}>
              <article className="h-full bg-background p-8 lg:p-10">
                <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-orange">
                  {solution.service}
                </p>
                <h2 className="mb-4 font-display text-3xl font-bold">{solution.need}</h2>
                <p className="mb-8 leading-relaxed text-muted-foreground">{solution.description}</p>
                <Link
                  to={solution.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-teal"
                >
                  Explore service <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="py-24">
        <div className="mx-auto max-w-[1000px] px-6 text-center lg:px-10">
          <h2 className="font-display text-4xl font-bold lg:text-6xl">
            Have a different requirement?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground">
            Share the problem, who will use the solution, the systems involved, and any constraints.
            We can help clarify the scope before deciding what to build.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-full bg-teal px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-ink"
          >
            Discuss your project
          </Link>
        </div>
      </section>
    </>
  );
}
