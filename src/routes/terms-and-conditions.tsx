import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { createSeo, siteConfig } from "@/lib/seo";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () =>
    createSeo({
      title: "Terms of Service | AItouchSolutions",
      description:
        "Read the AItouchSolutions terms of service for software services, subscriptions, digital tools, AI products, and website use.",
      path: "/terms-and-conditions",
      keywords: ["AItouchSolutions terms", "terms of service", "software subscription terms"],
    }),
  component: TermsPage,
});

const terms = [
  {
    title: "Scope of These Terms",
    body: "These terms apply when you use the AItouchSolutions website, request custom services, purchase digital tools, access AI products, or subscribe to any monthly, yearly, or usage-based plan. A separate signed agreement, invoice, order form, or proposal may add project-specific terms.",
  },
  {
    title: "Services and Project Work",
    body: "Custom services may include AI agents, automation, websites, apps, SaaS products, integrations, consulting, support, and maintenance. Work begins after scope, pricing, payment schedule, deliverables, and acceptance criteria are confirmed in writing.",
  },
  {
    title: "Subscriptions",
    body: "Subscription plans may renew automatically until cancelled. You are responsible for keeping billing information current and paying all recurring fees, usage charges, taxes, and overage fees shown at checkout, in the invoice, or in the subscription dashboard.",
  },
  {
    title: "Digital Tools and Licenses",
    body: "Tools, templates, scripts, automations, SaaS dashboards, AI utilities, downloads, and digital products are licensed, not sold, unless a written agreement says otherwise. You may not resell, share, reverse engineer, copy, sublicense, or redistribute them without written permission.",
  },
  {
    title: "Payments and Late Fees",
    body: "Fees are due according to the invoice, checkout page, subscription terms, or written agreement. Late or failed payments may pause access to tools, subscriptions, hosting, maintenance, support, or project delivery until the account is brought current.",
  },
  {
    title: "Client Responsibilities",
    body: "You are responsible for accurate requirements, approvals, content, credentials, third-party permissions, legal rights to supplied materials, data quality, security of your accounts, and decisions made from delivered software, automation, analytics, or AI output.",
  },
  {
    title: "Acceptable Use",
    body: "You may not use our services, subscriptions, or tools for illegal activity, spam, malware, scraping that violates third-party rules, credential theft, harmful automation, abuse, harassment, infringement, or attempts to bypass usage limits, licensing, or security controls.",
  },
  {
    title: "AI and Automation Output",
    body: "AI tools and automations can make mistakes. You are responsible for reviewing outputs, workflows, messages, decisions, and generated content before relying on them in business, legal, financial, medical, security, or public-facing contexts.",
  },
  {
    title: "Intellectual Property",
    body: "Ownership of custom deliverables is handled in the project agreement. AItouchSolutions may retain rights to pre-existing code, tools, templates, libraries, workflows, prompts, models, product ideas, and general know-how unless agreed otherwise.",
  },
  {
    title: "Third-Party Services",
    body: "Services and tools may depend on payment processors, hosting providers, app stores, AI model providers, APIs, analytics, databases, email services, and other third-party platforms. Their pricing, availability, rules, and performance are outside our direct control.",
  },
  {
    title: "Cancellations and Termination",
    body: "You may cancel eligible subscriptions according to the plan terms. We may suspend or terminate access for non-payment, misuse, security risk, policy violations, unlawful activity, or breach of these terms.",
  },
  {
    title: "Refunds",
    body: "Refund eligibility is explained in our Refund Policy. Custom service fees, subscription renewals, delivered digital tools, downloads, licenses, setup work, and completed milestones may have different refund rules.",
  },
  {
    title: "Disclaimers and Liability",
    body: "Services, subscriptions, tools, and content are provided as available and without guaranteed business results unless written in a signed agreement. To the maximum extent allowed by law, AItouchSolutions is not liable for indirect, incidental, special, consequential, or punitive damages.",
  },
];

function TermsPage() {
  return (
    <>
      <section className="pt-40 lg:pt-52 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-8">
              Terms of Service
            </p>
            <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-[-0.04em] leading-[0.9] max-w-5xl">
              Terms for services, subscriptions, and <span className="gradient-text">tools.</span>
            </h1>
            <p className="mt-10 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Last updated May 22, 2026. These terms apply to website use, custom software services,
              AI products, subscriptions, digital tools, and support from {siteConfig.name}.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 space-y-10">
          {terms.map((term, index) => (
            <Reveal key={term.title} delay={index}>
              <div className="border-t border-border pt-8">
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">{term.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{term.body}</p>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <div className="border-t border-border pt-8">
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">Questions</h2>
              <p className="text-muted-foreground leading-relaxed">
                For project-specific terms, start with the{" "}
                <Link to="/contact" className="text-teal hover:text-teal-glow">
                  contact page
                </Link>{" "}
                or email{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-teal hover:text-teal-glow">
                  {siteConfig.email}
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
