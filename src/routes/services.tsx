import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { organicServiceKeywords, serviceGroups, serviceLandingPages } from "@/lib/service-seo";
import { absoluteUrl, createSeo, siteConfig } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () =>
    createSeo({
      title: "AI & Software Development Services | AItouchSolutions",
      description:
        "Explore AI agent development, AI automation, custom SaaS, web app development, mobile apps, CRM/ERP, e-commerce, dashboards, cloud, DevOps, cybersecurity, and dedicated developers.",
      path: "/services",
      keywords: [
        "AI development services",
        "custom SaaS development",
        "web app development",
        "mobile app development",
        ...organicServiceKeywords.slice(0, 45),
      ],
    }),
  component: ServicesPage,
});

function ServicesPage() {
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AItouchSolutions service landing pages",
    itemListElement: serviceLandingPages.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/services/${service.slug}`),
      name: service.title,
      description: service.summary,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="pt-40 pb-20 lg:pt-52 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.35em] text-teal">
              Services
            </p>
            <h1 className="font-display max-w-5xl text-6xl font-bold leading-[0.9] tracking-[-0.04em] md:text-8xl lg:text-9xl">
              Everything you need to build, <span className="gradient-text">launch & scale</span>.
            </h1>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Indexable service pages for AI agents, automation, SaaS, web apps, mobile apps,
              CRM/ERP, commerce, dashboards, cloud, DevOps, cybersecurity, and dedicated developers.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto space-y-20 px-6 lg:space-y-32 lg:px-10">
          {serviceGroups.map((group, groupIndex) => (
            <Reveal key={group.slug}>
              <div className="grid grid-cols-1 gap-10 border-t border-border pt-12 lg:grid-cols-12">
                <div className="h-fit lg:sticky lg:top-32 lg:col-span-4">
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-teal">
                    / {String(groupIndex + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-display text-4xl font-bold tracking-tight lg:text-5xl">
                    {group.label}
                  </h2>
                  <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {group.description}
                  </p>
                </div>
                <div className="grid gap-px bg-border sm:grid-cols-2 lg:col-span-8">
                  {group.services.map((service) => (
                    <Link
                      key={service.slug}
                      to="/services/$serviceId"
                      params={{ serviceId: service.slug }}
                      className="group flex min-h-[250px] flex-col bg-background p-8 transition-colors hover:bg-ink-2"
                    >
                      <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-teal">
                        {service.group}
                      </p>
                      <h3 className="mb-3 font-display text-xl font-bold transition-colors group-hover:text-teal">
                        {service.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {service.summary}
                      </p>
                      <div className="mt-auto flex items-center gap-2 pt-8 font-mono text-[10px] uppercase tracking-[0.24em] text-teal">
                        View service
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-ink py-32">
        <div className="max-w-[1400px] mx-auto px-6 text-center lg:px-10">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.35em] text-orange">
            Search-friendly service pages
          </p>
          <h2 className="mx-auto mb-8 max-w-3xl font-display text-5xl font-bold tracking-[-0.03em] lg:text-7xl">
            Land directly from Google on the right service.
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-muted-foreground">
            Each service now has its own indexed URL, canonical metadata, structured data, and
            internal links under {siteConfig.name}.
          </p>
          <Link
            to="/contact"
            className="inline-flex rounded-full bg-teal px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-ink hover:bg-teal-glow"
          >
            Get a custom quote
          </Link>
        </div>
      </section>
    </>
  );
}
