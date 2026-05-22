import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import case1 from "@/assets/case-1.jpg";
import case2 from "@/assets/case-2.jpg";
import case3 from "@/assets/case-3.jpg";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { createSeo, siteConfig } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    createSeo({
      title: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
      path: "/",
      keywords: ["AI software solutions", "AI automation agency", "custom web apps"],
    }),
  component: HomePage,
});

const services = [
  {
    n: "01",
    t: "AI Agents",
    d: "Autonomous LLM agents that reason, plan, and execute end-to-end workflows for your business 24/7.",
  },
  {
    n: "02",
    t: "Automation",
    d: "Custom workflow automation that replaces manual ops — from data pipelines to internal tools.",
  },
  {
    n: "03",
    t: "Custom SaaS",
    d: "Scalable cloud-native platforms built with Next.js, TypeScript, and high-performance architectures.",
  },
  {
    n: "04",
    t: "Web & Mobile",
    d: "Full-stack web apps, native iOS/Android, and cross-platform with React Native or Flutter.",
  },
  {
    n: "05",
    t: "CRM / ERP",
    d: "Bespoke internal tooling for complex global operations with localized security and compliance.",
  },
  {
    n: "06",
    t: "Cloud & DevOps",
    d: "AWS, GCP, Azure, Docker, Kubernetes — production-grade infra with CI/CD pipelines.",
  },
];

const techCategories = [
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Vue",
      "Nuxt",
      "Angular",
      "Svelte",
      "Tailwind",
      "GSAP",
      "Framer Motion",
    ],
  },
  {
    label: "Backend",
    items: ["Node.js", "NestJS", "Express", "Python", "Django", "Laravel", "Spring", "Go", ".NET"],
  },
  {
    label: "AI / ML",
    items: [
      "OpenAI",
      "LangChain",
      "LlamaIndex",
      "Pinecone",
      "Hugging Face",
      "TensorFlow",
      "PyTorch",
      "RAG",
      "Computer Vision",
    ],
  },
  {
    label: "Cloud / DevOps",
    items: ["AWS", "GCP", "Azure", "Vercel", "Docker", "Kubernetes", "GitHub Actions", "CI/CD"],
  },
  {
    label: "Database",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Supabase", "Firebase", "Elasticsearch"],
  },
  { label: "Mobile", items: ["React Native", "Flutter", "Swift", "Kotlin"] },
];

const projects = [
  {
    img: case1,
    tag: "Enterprise AI",
    t: "NeuralCore Analytics",
    d: "Real-time predictive modeling dashboard for global logistics — 84% ops reduction.",
  },
  {
    img: case2,
    tag: "Automation",
    t: "AutoFlow Engine",
    d: "End-to-end workflow automation platform serving 12k+ users across 4 continents.",
  },
  {
    img: case3,
    tag: "Mobile · iOS/Android",
    t: "Pulse Health App",
    d: "AI-driven wellness companion with on-device inference and HIPAA-grade security.",
  },
];

function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden"
      >
        <motion.div style={{ y, scale, opacity }} className="absolute inset-0 -z-10">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/40 to-background" />
          <div className="absolute inset-0 grid-overlay opacity-30" />
          <div className="hero-wave-field" aria-hidden="true">
            <span className="hero-wave hero-wave-a" />
            <span className="hero-wave hero-wave-b" />
            <span className="hero-wave hero-wave-c" />
          </div>
        </motion.div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full text-[10px] font-mono uppercase tracking-[0.3em] text-teal mb-10"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-teal opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal" />
            </span>
            Founded by Jon
          </motion.div>

          <h1 className="font-display font-bold text-[clamp(2.6rem,9vw,9rem)] leading-[0.9] tracking-[-0.04em] max-w-[18ch]">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="block"
            >
              AI-Powered
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="block gradient-text"
            >
              Software Solutions
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
              className="block text-foreground/70"
            >
              for the Future
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-10 max-w-xl text-base lg:text-lg text-muted-foreground leading-relaxed"
          >
            AItouchSolutions builds intelligent web apps, AI agents, automation systems, and
            scalable digital products for global clients — engineered for 24/7 mission-critical
            delivery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-6 py-4 bg-teal text-ink rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-teal-glow hover:shadow-[0_0_40px_-5px] hover:shadow-teal transition-all"
            >
              Start your project
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/ai-solutions"
              className="inline-flex items-center gap-3 px-6 py-4 glass rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-foreground/10"
            >
              Explore AI Solutions
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-6 py-4 border border-orange/40 text-orange rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-orange hover:text-ink"
            >
              Talk to Jarvis
            </Link>
          </motion.div>
        </div>

        {/* scan line */}
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-teal to-transparent opacity-40 animate-pulse-glow" />
      </section>

      {/* COUNTERS */}
      <section className="relative border-y border-border bg-ink">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4">
          {[
            { v: 100, s: "+", l: "Technologies mastered" },
            { v: 24, s: "/7", l: "Global delivery" },
            { v: 150, s: "+", l: "AI deployments" },
            { v: 40, s: "+", l: "Enterprise clients" },
          ].map((c, i) => (
            <div
              key={i}
              className={`p-8 lg:p-12 ${i < 3 ? "lg:border-r border-border" : ""} ${i < 2 ? "border-r border-b lg:border-b-0 border-border" : ""} ${i === 2 ? "border-r lg:border-r border-border" : ""}`}
            >
              <div className="font-display font-bold text-5xl lg:text-7xl text-teal mb-3">
                <Counter to={c.v} suffix={c.s} />
              </div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                {c.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative py-32 lg:py-44">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-6">
              / 01 — Capabilities
            </p>
            <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-20">
              <h2 className="font-display font-bold text-5xl lg:text-7xl tracking-[-0.03em] leading-[0.95] max-w-3xl">
                A specialised lab for <span className="gradient-text">intelligent software</span>.
              </h2>
              <p className="max-w-md text-muted-foreground text-lg leading-relaxed">
                From neural architecture to enterprise SaaS, we design and ship the systems that
                power modern intelligent businesses.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {services.map((s, i) => (
              <Reveal key={s.n} delay={i}>
                <div className="group bg-background p-10 lg:p-12 h-full hover:bg-ink-2 transition-colors duration-500 cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal/0 group-hover:bg-teal/10 blur-3xl transition-all duration-700" />
                  <div className="relative">
                    <p className="font-mono text-xs text-teal mb-8">{s.n}</p>
                    <h3 className="font-display text-2xl lg:text-3xl font-bold mb-4 tracking-tight">
                      {s.t}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-8 text-sm">{s.d}</p>
                    <Link
                      to="/services"
                      className="text-[10px] font-mono uppercase tracking-[0.3em] text-foreground inline-flex items-center gap-2 group-hover:text-teal transition-colors"
                    >
                      Explore <span>→</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TECH MARQUEE */}
      <section className="relative py-32 border-y border-border bg-ink overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-16">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-6">
              / 02 — Stack
            </p>
            <h2 className="font-display font-bold text-5xl lg:text-7xl tracking-[-0.03em] max-w-3xl">
              100+ technologies. <br />
              <span className="text-foreground/40">One integrated brain.</span>
            </h2>
          </Reveal>
        </div>
        <div className="space-y-6">
          {techCategories.map((cat, i) => (
            <div key={cat.label} className="overflow-hidden">
              <div
                className={`flex gap-8 whitespace-nowrap ${i % 2 === 0 ? "animate-marquee" : "animate-marquee"}`}
                style={{
                  animationDirection: i % 2 === 0 ? "normal" : "reverse",
                  animationDuration: `${30 + i * 4}s`,
                }}
              >
                {[...cat.items, ...cat.items, ...cat.items].map((it, idx) => (
                  <span
                    key={idx}
                    className="font-display text-3xl lg:text-5xl font-bold text-foreground/30 hover:text-teal transition-colors"
                  >
                    {it} <span className="text-foreground/10 mx-4">·</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-16">
          <Link
            to="/technologies"
            className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-teal border-b border-teal/30 pb-1"
          >
            View full stack →
          </Link>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="py-32 lg:py-44">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-6">
              / 03 — Selected work
            </p>
            <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20">
              <h2 className="font-display font-bold text-5xl lg:text-7xl tracking-[-0.03em] max-w-2xl leading-[0.95]">
                Built for ambitious teams worldwide.
              </h2>
              <Link
                to="/portfolio"
                className="text-[10px] font-mono uppercase tracking-[0.3em] text-teal border-b border-teal/30 pb-1"
              >
                View 100+ project catalog →
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {projects.map((p, i) => (
              <Reveal key={i} delay={i} className={i === 0 ? "lg:col-span-8" : "lg:col-span-4"}>
                <div className="group cursor-pointer">
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-5 relative bg-ink-2">
                    <img
                      src={p.img}
                      alt={p.t}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-60" />
                    <div className="absolute top-5 left-5">
                      <span className="px-3 py-1 bg-ink/60 backdrop-blur-md border border-border rounded-full text-[10px] font-mono uppercase tracking-widest text-teal">
                        {p.tag}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl font-bold mb-2 group-hover:text-teal transition-colors">
                    {p.t}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-32 border-t border-border bg-ink relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-teal/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange/10 blur-[120px] rounded-full" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-orange mb-6">
              / 04 — Founding vision
            </p>
            <blockquote className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.02em] max-w-5xl">
              "We don't just write code. We architect{" "}
              <span className="gradient-text">intelligent ecosystems</span> where every human
              touchpoint is enhanced — building the bridge between human logic and machine
              intelligence."
            </blockquote>
            <div className="mt-12 flex items-center gap-5">
              <div className="w-14 h-px bg-teal" />
              <div>
                <p className="font-display font-bold text-lg">Jon</p>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mt-1">
                  Founder · AItouchSolutions
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 lg:py-44">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="glass rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden">
              <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-6">
                Ready when you are
              </p>
              <h2 className="font-display font-bold text-5xl lg:text-8xl tracking-[-0.03em] leading-[0.95] max-w-4xl mx-auto">
                Start the <span className="gradient-text">sequence</span>.
              </h2>
              <p className="mt-8 max-w-xl mx-auto text-muted-foreground text-lg">
                Fixed-price or hourly. AI-first. Global delivery, 24/7. Let's scope what's possible.
              </p>
              <div className="mt-12 flex flex-wrap justify-center gap-3">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-teal text-ink rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-teal-glow"
                >
                  Start your project →
                </Link>
                <Link
                  to="/pricing"
                  className="px-8 py-4 glass rounded-full text-xs font-bold uppercase tracking-[0.2em]"
                >
                  View pricing
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
