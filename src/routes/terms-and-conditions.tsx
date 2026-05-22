import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { createSeo, siteConfig } from "@/lib/seo";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () =>
    createSeo({
      title: "Terms & Conditions | AItouchSolutions",
      description:
        "Read the AItouchSolutions terms and conditions for using the website, requesting proposals, and engaging software services.",
      path: "/terms-and-conditions",
      keywords: ["AItouchSolutions terms", "terms and conditions"],
    }),
  component: TermsPage,
});

const terms = [
  {
    title: "Website Use",
    body: "You may browse this website for business information about AItouchSolutions. You agree not to misuse the website, attempt unauthorized access, disrupt availability, or copy protected content in a way that violates applicable law.",
  },
  {
    title: "Project Inquiries",
    body: "Submitting a form, email, or message does not create a client relationship by itself. Work begins only after scope, pricing, timeline, payment terms, and acceptance criteria are agreed in writing.",
  },
  {
    title: "Proposals and Pricing",
    body: "Estimates are based on the information available at the time. Changes in scope, integrations, compliance needs, content, or third-party requirements may affect cost and timeline.",
  },
  {
    title: "Client Responsibilities",
    body: "Clients are responsible for timely feedback, accurate requirements, legal rights to supplied materials, credentials, third-party approvals, and any business decisions made from delivered software or analysis.",
  },
  {
    title: "Intellectual Property",
    body: "Ownership of deliverables is handled in the project agreement. AItouchSolutions may retain rights to pre-existing tools, reusable libraries, workflows, and general know-how unless the agreement says otherwise.",
  },
  {
    title: "Third-Party Services",
    body: "Projects may depend on APIs, hosting providers, AI models, payment processors, analytics, or other third-party services. Their pricing, availability, policies, and performance are outside our direct control.",
  },
  {
    title: "Limitation of Liability",
    body: "To the maximum extent allowed by law, AItouchSolutions is not liable for indirect, incidental, special, consequential, or punitive damages arising from website use or service discussions.",
  },
];

function TermsPage() {
  return (
    <>
      <section className="pt-40 lg:pt-52 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-8">
              Terms & Conditions
            </p>
            <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-[-0.04em] leading-[0.9] max-w-5xl">
              Clear terms for <span className="gradient-text">clear work.</span>
            </h1>
            <p className="mt-10 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Last updated May 22, 2026. These terms apply to website use and early service
              discussions with {siteConfig.name}.
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
