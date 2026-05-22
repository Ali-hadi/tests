import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { createSeo, siteConfig } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    createSeo({
      title: "Privacy Policy | AItouchSolutions",
      description:
        "Read the AItouchSolutions privacy policy covering contact forms, project inquiries, analytics, communications, and data protection.",
      path: "/privacy-policy",
      keywords: ["AItouchSolutions privacy policy", "privacy policy"],
    }),
  component: PrivacyPolicyPage,
});

const sections = [
  {
    title: "Information We Collect",
    body: "We collect information you choose to send through contact forms, email, WhatsApp, discovery calls, and project documents. This can include your name, email, phone number, company, project goals, budget range, and technical requirements.",
  },
  {
    title: "How We Use Information",
    body: "We use submitted information to respond to inquiries, prepare proposals, deliver software services, provide support, improve our website, and maintain security for our systems and client projects.",
  },
  {
    title: "Project Data",
    body: "Client project materials are handled only for agreed work. Access is limited to team members and service providers who need it for delivery, support, hosting, security, or communication.",
  },
  {
    title: "Cookies and Analytics",
    body: "The website may use basic cookies, hosting logs, and privacy-respecting analytics to understand performance, traffic, errors, and security events.",
  },
  {
    title: "Sharing and Retention",
    body: "We do not sell personal information. We keep records only as long as needed for business, legal, security, and service obligations, then delete or anonymize them when practical.",
  },
  {
    title: "Your Choices",
    body: "You can ask us to update, export, or delete your personal information where applicable. Some records may be retained when required for legal, accounting, security, or contractual reasons.",
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
              information collected through the website and client communication channels.
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
