import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { createSeo, siteConfig } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    createSeo({
      title: "Privacy Policy | AItouchSolutions",
      description:
        "Read the AItouchSolutions privacy policy covering services, subscriptions, digital tools, billing, AI products, and account data.",
      path: "/privacy-policy",
      keywords: [
        "AItouchSolutions privacy policy",
        "subscription privacy policy",
        "AI tools privacy",
      ],
    }),
  component: PrivacyPolicyPage,
});

const sections = [
  {
    title: "Information We Collect",
    body: "We collect information you provide through forms, email, WhatsApp, checkout, account signup, subscription dashboards, support requests, discovery calls, and project documents. This can include your name, email, phone, company, billing details, tax details, project goals, budget, and technical requirements.",
  },
  {
    title: "Account, Subscription, and Billing Data",
    body: "When you buy a subscription, tool, license, template, automation, or digital product, we may process account status, plan level, purchase history, invoices, payment status, renewal dates, usage limits, and support history. Payment card details are handled by payment processors, not stored directly by us.",
  },
  {
    title: "Tool Usage and Product Data",
    body: "Digital tools, SaaS products, AI utilities, and automations may collect usage logs, feature events, device/browser data, error reports, API activity, license checks, and performance metrics so we can operate, secure, debug, and improve the products.",
  },
  {
    title: "Project and AI Data",
    body: "Client project files, prompts, datasets, content, credentials, and integration details are handled only for agreed work, support, hosting, security, and delivery. Where AI providers or third-party APIs are used, data may be processed under those providers' terms and privacy policies.",
  },
  {
    title: "How We Use Information",
    body: "We use information to respond to inquiries, create proposals, process orders, manage subscriptions, deliver tools and services, provide support, prevent abuse, improve products, secure systems, send important account notices, and meet legal or accounting obligations.",
  },
  {
    title: "Cookies and Analytics",
    body: "The website and products may use cookies, local storage, hosting logs, analytics, and similar technologies for login sessions, preferences, checkout, fraud prevention, traffic measurement, performance monitoring, and security events.",
  },
  {
    title: "Sharing and Service Providers",
    body: "We do not sell personal information. We may share limited data with service providers such as hosting, payment, analytics, email, CRM, support, AI model, security, and infrastructure vendors when needed to operate the business and deliver services.",
  },
  {
    title: "Retention and Security",
    body: "We keep records only as long as needed for delivery, support, subscriptions, legal, tax, accounting, fraud prevention, and security obligations. We use reasonable technical and organizational safeguards, but no online system can be guaranteed perfectly secure.",
  },
  {
    title: "Your Choices and Requests",
    body: "You can ask us to update, export, restrict, or delete your personal information where applicable. Some records may be retained when required for legal, accounting, security, contractual, or fraud-prevention reasons.",
  },
];

function PrivacyPolicyPage() {
  return (
    <>
      <section className="pt-40 lg:pt-52 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-8">
              Privacy Policy
            </p>
            <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-[-0.04em] leading-[0.9] max-w-5xl">
              Privacy, handled with <span className="gradient-text">care.</span>
            </h1>
            <p className="mt-10 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Last updated May 22, 2026. This policy explains how {siteConfig.name} handles
              information across the website, service projects, subscriptions, digital tools,
              purchases, AI products, and support channels.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 space-y-10">
          {sections.map((section, index) => (
            <Reveal key={section.title} delay={index}>
              <div className="border-t border-border pt-8">
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{section.body}</p>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <div className="border-t border-border pt-8">
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Privacy requests can be sent to{" "}
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
