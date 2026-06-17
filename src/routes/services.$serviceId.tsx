import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Boxes,
  CheckCircle2,
  Layers3,
  Search,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { getRelatedServiceLandingPages, getServiceLandingPage } from "@/lib/service-seo";
import { absoluteUrl, createSeo, siteConfig } from "@/lib/seo";

function getServiceRouteHead(serviceId: string) {
  const service = getServiceLandingPage(serviceId);

  return createSeo({
    title: service ? service.metaTitle : "Software Development Service | AItouchSolutions",
    description:
      service?.metaDescription ??
      "Explore AItouchSolutions software development, AI, automation, SaaS, web, mobile, cloud, and DevOps services.",
    path: service ? `/services/${service.slug}` : `/services/${serviceId}`,
    keywords: service
      ? [service.title, service.group, ...service.keywords]
      : ["software development services", "AI development services"],
  });
}

export const Route = createFileRoute("/services/$serviceId")({
  head: ({ params }) => getServiceRouteHead(params.serviceId),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { serviceId } = Route.useParams();
  const service = getServiceLandingPage(serviceId);

  if (!service) {
    return (
      <section className="pt-40 pb-24 lg:pt-52">
        <div className="max-w-[900px] mx-auto px-6 text-center lg:px-10">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-orange">
            Service not found
          </p>
          <h1 className="font-display text-5xl font-bold tracking-tight lg:text-7xl">
            This service page is not available.
          </h1>
          <Link
            to="/services"
            className="mt-9 inline-flex items-center gap-2 rounded-md bg-teal px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to services
          </Link>
        </div>
      </section>
    );
  }

  const relatedServices = getRelatedServiceLandingPages(service, 3);
  const serviceUrl = absoluteUrl(`/services/${service.slug}`);
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${serviceUrl}#service`,
        name: service.title,
        description: service.summary,
        url: serviceUrl,
        serviceType: service.title,
        category: service.group,
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          email: siteConfig.email,
          telephone: siteConfig.whatsappInternational,
        },
        areaServed: "Worldwide",
        audience: {
          "@type": "Audience",
          audienceType: "Startups, SaaS teams, agencies, enterprises, and business owners",
        },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          url: absoluteUrl("/contact"),
          priceCurrency: "USD",
          description: `Contact ${siteConfig.name} for ${service.title}.`,
        },
        keywords: service.keywords.join(", "),
      },
      {
        "@type": "FAQPage",
        "@id": `${serviceUrl}#faq`,
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${serviceUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: absoluteUrl("/services"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: serviceUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="pt-32 pb-16 lg:pt-44 lg:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Services
            </Link>
            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-end">
              <div>
                <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.35em] text-teal">
                  {service.group}
                </p>
                <h1 className="max-w-5xl font-display text-5xl font-bold leading-[0.95] tracking-[-0.04em] md:text-7xl lg:text-8xl">
                  {service.title} for <span className="gradient-text">growth teams</span>.
                </h1>
                <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
                  {service.summary}
                </p>
              </div>
              <div className="grid gap-px rounded-md border border-border bg-border">
                {service.searchIntents.map((intent) => (
                  <div key={intent} className="flex items-start gap-3 bg-ink p-5">
                    <Search className="mt-1 h-4 w-4 shrink-0 text-teal" />
                    <p className="text-sm leading-relaxed text-muted-foreground">{intent}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-ink">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 px-6 lg:grid-cols-4 lg:px-10">
          {[
            { label: "Service", value: service.shortTitle },
            { label: "Category", value: service.group },
            { label: "Coverage", value: "Worldwide" },
            { label: "Delivery", value: "Fixed or hourly" },
          ].map((item, index) => (
            <div
              key={item.label}
              className={`p-7 lg:p-9 ${index < 3 ? "lg:border-r border-border" : ""} ${index < 2 ? "border-b border-border lg:border-b-0" : ""}`}
            >
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                {item.label}
              </p>
              <p className="font-display text-2xl font-bold text-teal">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto grid gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <Reveal>
            <div>
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.35em] text-orange">
                Organic service keywords
              </p>
              <h2 className="font-display text-4xl font-bold tracking-tight lg:text-6xl">
                Built around how customers search.
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
                This page targets real service-intent phrases while keeping the content useful for
                humans first: what we build, what you get, and how delivery works.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-px bg-border md:grid-cols-2">
            {service.keywords.slice(0, 10).map((keyword) => (
              <div key={keyword} className="bg-background p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {keyword}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-ink py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto grid gap-px px-6 lg:grid-cols-3 lg:px-10">
          {[
            {
              title: "Business outcomes",
              icon: BadgeCheck,
              items: service.outcomes,
            },
            {
              title: "Deliverables",
              icon: Boxes,
              items: service.deliverables,
            },
            {
              title: "Tech stack",
              icon: Layers3,
              items: service.techStack,
            },
          ].map((column) => {
            const Icon = column.icon;

            return (
              <Reveal key={column.title}>
                <div className="h-full bg-background p-7 lg:p-9">
                  <div className="mb-7 flex items-center gap-3">
                    <Icon className="h-5 w-5 text-teal" />
                    <h2 className="font-display text-2xl font-bold">{column.title}</h2>
                  </div>
                  <div className="space-y-4">
                    {column.items.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                        <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.35em] text-teal">
              Delivery process
            </p>
            <h2 className="mb-12 font-display text-4xl font-bold tracking-tight lg:text-6xl">
              From search intent to shipped product.
            </h2>
          </Reveal>
          <div className="grid gap-px bg-border">
            {service.process.map((step, index) => (
              <Reveal key={step} delay={index}>
                <div className="grid gap-5 bg-background p-6 md:grid-cols-[120px_1fr] md:items-center lg:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground">{step}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-ink py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.35em] text-orange">
              FAQ
            </p>
            <h2 className="mb-12 font-display text-4xl font-bold tracking-tight lg:text-6xl">
              Questions before you start.
            </h2>
          </Reveal>
          <div className="grid gap-px bg-border">
            {service.faqs.map((faq) => (
              <Reveal key={faq.question}>
                <div className="bg-background p-7 lg:p-9">
                  <h3 className="mb-4 font-display text-2xl font-bold">{faq.question}</h3>
                  <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal">
                Related services
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight">
                Keep exploring AItouchSolutions.
              </h2>
            </div>
            <ArrowRight className="hidden h-7 w-7 text-orange md:block" />
          </div>
          <div className="grid gap-px bg-border md:grid-cols-3">
            {relatedServices.map((related) => (
              <Link
                key={related.slug}
                to="/services/$serviceId"
                params={{ serviceId: related.slug }}
                className="group bg-background p-6 transition-colors hover:bg-ink-2"
              >
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {related.group}
                </p>
                <h3 className="font-display text-2xl font-bold leading-tight group-hover:text-teal">
                  {related.title}
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {related.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-ink py-24">
        <div className="max-w-[1100px] mx-auto px-6 text-center lg:px-10">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.35em] text-teal">
            Ready to rank and convert
          </p>
          <h2 className="font-display text-5xl font-bold tracking-[-0.03em] lg:text-7xl">
            Start {service.shortTitle} with {siteConfig.name}.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl leading-relaxed text-muted-foreground">
            Tell us what you want to build. We will map the fastest useful scope, the right tech
            stack, and a delivery plan that can turn search traffic into qualified leads.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex rounded-full bg-teal px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-ink hover:bg-teal-glow"
          >
            Start project
          </Link>
        </div>
      </section>
    </>
  );
}
