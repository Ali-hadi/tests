import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { createSeo, siteConfig } from "@/lib/seo";

export const Route = createFileRoute("/refund-policy")({
  head: () =>
    createSeo({
      title: "Refund Policy | AItouchSolutions",
      description:
        "Read the AItouchSolutions refund policy for custom services, subscriptions, digital tools, licenses, setup fees, and support plans.",
      path: "/refund-policy",
      keywords: [
        "AItouchSolutions refund policy",
        "subscription refund policy",
        "digital tools refund",
      ],
    }),
  component: RefundPolicyPage,
});

const policies = [
  {
    title: "General Policy",
    body: "Refund eligibility depends on what you purchased: custom services, subscriptions, digital tools, licenses, setup work, support plans, or downloadable products. Any signed agreement, invoice, checkout terms, or order form may add specific refund rules.",
  },
  {
    title: "Custom Services",
    body: "Payments for discovery, planning, design, development, AI automation, integrations, consulting, and support are generally non-refundable once work has started, time has been reserved, or deliverables have been shared. If no work has started, a partial refund may be considered after deducting payment processing, admin, and planning costs.",
  },
  {
    title: "Milestones and Deposits",
    body: "Deposits, retainers, setup fees, sprint fees, milestone payments, and booked engineering time are normally non-refundable because they reserve capacity and cover work already performed. Approved refunds are handled case by case.",
  },
  {
    title: "Subscriptions",
    body: "You can cancel eligible subscriptions to stop future renewals. Subscription fees already charged are generally non-refundable, including partial billing periods, unused time, usage-based charges, add-ons, and renewal payments, unless required by law or stated in the plan terms.",
  },
  {
    title: "Digital Tools and Downloads",
    body: "Digital tools, templates, scripts, automations, dashboards, source files, downloads, license keys, AI utilities, and SaaS access are generally non-refundable after access, download, delivery, activation, or license issuance because the product cannot be returned.",
  },
  {
    title: "Defective or Duplicate Purchases",
    body: "If a tool is materially defective, inaccessible because of our issue, or accidentally charged twice, contact us within 7 days of purchase. We may fix the issue, replace access, credit the account, or approve a refund depending on the situation.",
  },
  {
    title: "Non-Refundable Items",
    body: "Refunds are not available for completed work, approved milestones, custom code, delivered digital products, expired subscriptions, account misuse, violation of terms, third-party fees, hosting fees, API usage, payment processing fees, or services already consumed.",
  },
  {
    title: "How to Request a Refund",
    body: "Send the order email, invoice number, purchase date, product or service name, and reason for the request. We review requests within a reasonable time and may ask for screenshots, logs, or access details to verify the issue.",
  },
  {
    title: "Chargebacks",
    body: "Please contact us before opening a chargeback so we can investigate and resolve the issue. Accounts, subscriptions, licenses, or services may be suspended while a chargeback or payment dispute is active.",
  },
];

function RefundPolicyPage() {
  return (
    <>
      <section className="pt-40 lg:pt-52 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-8">
              Refund Policy
            </p>
            <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-[-0.04em] leading-[0.9] max-w-5xl">
              Refund rules for services, subscriptions, and{" "}
              <span className="gradient-text">digital tools.</span>
            </h1>
            <p className="mt-10 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Last updated May 22, 2026. This policy explains how refund requests are handled for
              custom work, recurring plans, digital products, tool access, and support from{" "}
              {siteConfig.name}.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 space-y-10">
          {policies.map((policy, index) => (
            <Reveal key={policy.title} delay={index}>
              <div className="border-t border-border pt-8">
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">{policy.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{policy.body}</p>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <div className="border-t border-border pt-8">
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Refund requests can be sent through the{" "}
                <Link to="/contact" className="text-teal hover:text-teal-glow">
                  contact page
                </Link>{" "}
                or by email at{" "}
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
