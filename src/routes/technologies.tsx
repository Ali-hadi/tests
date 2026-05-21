import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/technologies")({
  head: () =>
    createSeo({
      title: "Technologies We Use | AItouchSolutions",
      description:
        "See the 100+ technologies AItouchSolutions uses across React, Next.js, Node.js, Python, AI/ML, cloud, mobile, CMS, and e-commerce projects.",
      path: "/technologies",
      keywords: [
        "React developers",
        "Next.js developers",
        "Node.js developers",
        "AI ML stack",
        "cloud DevOps",
      ],
    }),
  component: TechPage,
});

const stack = [
  {
    label: "Frontend",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Vue",
      "Nuxt",
      "Angular",
      "Svelte",
      "Tailwind",
      "Bootstrap",
      "GSAP",
      "Framer Motion",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "Express",
      "NestJS",
      "PHP",
      "Laravel",
      "WordPress",
      "Python",
      "Django",
      "Flask",
      "Ruby on Rails",
      "Java",
      "Spring Boot",
      ".NET",
      "Go",
    ],
  },
  {
    label: "AI / ML",
    items: [
      "OpenAI",
      "LangChain",
      "LlamaIndex",
      "Pinecone",
      "Vector DBs",
      "Hugging Face",
      "TensorFlow",
      "PyTorch",
      "Computer Vision",
      "NLP",
      "RAG Systems",
      "AI Agents",
      "Workflow Automation",
    ],
  },
  {
    label: "Database",
    items: ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Supabase", "Redis", "Elasticsearch"],
  },
  {
    label: "Cloud / DevOps",
    items: [
      "AWS",
      "Google Cloud",
      "Azure",
      "Vercel",
      "Netlify",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "CI/CD",
    ],
  },
  {
    label: "CMS / E-commerce",
    items: ["WordPress", "WooCommerce", "Shopify", "Webflow", "Strapi", "Sanity", "Contentful"],
  },
  { label: "Mobile", items: ["React Native", "Flutter", "Swift", "Kotlin"] },
  { label: "Design", items: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Canva", "Blender"] },
];

function TechPage() {
  return (
    <>
      <section className="pt-40 lg:pt-52 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal mb-8">
              Technologies
            </p>
            <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-[-0.04em] leading-[0.9]">
              100+ technologies. <br />
              <span className="gradient-text">One studio.</span>
            </h1>
          </Reveal>
        </div>
      </section>
      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 space-y-16">
          {stack.map((cat) => (
            <Reveal key={cat.label}>
              <div className="border-t border-border pt-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal mb-8">
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-3">
                  {cat.items.map((it) => (
                    <span
                      key={it}
                      className="px-5 py-3 glass rounded-full text-sm font-medium hover:bg-teal hover:text-ink transition-all cursor-default"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
