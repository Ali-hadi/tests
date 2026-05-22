import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import founder from "@/assets/founder-jon.jpg";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    createSeo({
      title: "About Jon | AItouchSolutions",
      description:
        "Learn about Jon, founder of AItouchSolutions, an AI and custom software studio building agents, automation, SaaS products, web apps, and mobile apps.",
      path: "/about",
      keywords: ["Jon", "AItouchSolutions founder", "AI software founder"],
    }),
  component: AboutPage,
});

const values = [
  {
    t: "Engineering excellence",
    d: "Production-grade code, observability built in, no shortcuts.",
  },
  {
    t: "AI-first by default",
    d: "We embed intelligence into every layer — not as an afterthought.",
  },
  { t: "Global, 24/7", d: "Timezone coverage from a distributed senior team." },
  { t: "Transparent partnership", d: "Clear scope, clear cost, clear communication." },
];

function AboutPage() {
  return (
    <>
      <section className="pt-40 lg:pt-52 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-8">
              About
            </p>
            <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-[-0.04em] leading-[0.9] max-w-5xl">
              Building the <span className="gradient-text">intelligence layer</span> of modern
              business.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-24 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-ink-2">
              <img src={founder} alt="Jon" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange mb-6">
              Founder
            </p>
            <h2 className="font-display text-5xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.95] mb-8">
              Jon
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Jon founded AItouchSolutions with a simple thesis: the next generation of software
              isn't just built — it thinks. After a decade shipping production systems for global
              clients, he assembled a senior team to deliver AI-first products at enterprise scale.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Under his leadership, the studio operates 24/7 across continents, delivering both
              fixed-price builds and embedded engineering pods for ambitious teams worldwide.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 border-t border-border bg-ink">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-[-0.03em] mb-16">
              What we stand for.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {values.map((v) => (
                <div key={v.t} className="bg-ink p-10 hover:bg-ink-2 transition-colors">
                  <h3 className="font-display text-2xl font-bold mb-4">{v.t}</h3>
                  <p className="text-muted-foreground leading-relaxed">{v.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 border-t border-border text-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <h2 className="font-display text-5xl lg:text-7xl font-bold tracking-[-0.03em] mb-8">
            Want to work with us?
          </h2>
          <Link
            to="/contact"
            className="inline-flex px-8 py-4 bg-teal text-ink rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-teal-glow"
          >
            Start a conversation →
          </Link>
        </div>
      </section>
    </>
  );
}
