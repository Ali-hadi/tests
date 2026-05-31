/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Link, Outlet, useChildMatches } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  Clipboard,
  Download,
  FileText,
  Globe2,
  Image,
  Layers3,
  LineChart,
  Megaphone,
  PenLine,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/tools")({
  head: ({ matches }) => {
    const currentMatch = matches[matches.length - 1];
    if (currentMatch?.fullPath !== "/tools") return {};

    return createSeo({
      title: "AI Tools Suite | AItouchSolutions",
      description:
        "Explore AItouchSolutions AI tools for humanizing text, AI detection, resumes, thumbnails, proposals, websites, captions, domains, portfolios, and chatbots.",
      path: "/tools",
      keywords: [
        "AI tools",
        "AI humanizer",
        "AI detector",
        "AI resume builder",
        "AI thumbnail generator",
        "AI chatbot SaaS",
      ],
    });
  },
  component: ToolsPage,
});

export type ToolTone = "Professional" | "Casual" | "Academic" | "Marketing" | "Conversational";

export type Tool = {
  id: string;
  name: string;
  shortName: string;
  category: string;
  summary: string;
  icon: LucideIcon;
  accent: "teal" | "orange" | "blue" | "violet";
  metricLabel: string;
  metricValue: string;
  placeholder: string;
  sample: string;
  features: string[];
  workflows: string[];
  outputs: string[];
  backend: string[];
};

export const tones: ToolTone[] = [
  "Professional",
  "Casual",
  "Academic",
  "Marketing",
  "Conversational",
];

export const tools: Tool[] = [
  {
    id: "ai-humanizer",
    name: "AI Humanizer",
    shortName: "Humanizer",
    category: "Writing",
    summary:
      "Turn robotic AI text into natural, SEO-friendly, plagiarism-safe copy while preserving the original meaning and formatting.",
    icon: Sparkles,
    accent: "teal",
    metricLabel: "Human score",
    metricValue: "92%",
    placeholder: "Paste AI generated text to humanize it...",
    sample:
      "Our platform leverages artificial intelligence to optimize business workflows and improve operational productivity across departments.",
    features: [
      "Tone rewriting",
      "Human score indicator",
      "AI score detection",
      "Formatting preservation",
      "Multi-language support",
      "History and exports",
    ],
    workflows: ["Paste AI text", "Choose tone", "Humanize", "Compare", "Copy or download"],
    outputs: ["Rewritten content", "AI/Human score", "SEO notes", "History item"],
    backend: ["LLM rewrite API", "MongoDB history", "JWT + rate limits", "Prompt safety layer"],
  },
  {
    id: "ai-detector",
    name: "AI Detector",
    shortName: "Detector",
    category: "Analysis",
    summary:
      "Scan content, estimate AI probability, highlight suspicious phrases, and generate shareable reports for editorial review.",
    icon: SearchCheck,
    accent: "orange",
    metricLabel: "Detection score",
    metricValue: "78%",
    placeholder: "Paste content to scan for AI patterns...",
    sample:
      "In conclusion, it is important to note that this comprehensive solution can significantly enhance productivity and efficiency.",
    features: [
      "AI percentage score",
      "Human probability",
      "Sentence analysis",
      "Suspicious text highlights",
      "PDF-ready reports",
      "Usage analytics",
    ],
    workflows: ["Paste text", "Run scan", "Review highlighted terms", "Export report"],
    outputs: ["Detection score", "Sentence flags", "Report summary", "Scan statistics"],
    backend: ["Detection API", "Report generator", "Admin analytics", "Secure scan storage"],
  },
  {
    id: "resume-builder",
    name: "AI Resume Builder",
    shortName: "Resume",
    category: "Career",
    summary:
      "Build ATS-ready resumes, cover letters, role-specific summaries, skill recommendations, and polished PDF exports.",
    icon: BriefcaseBusiness,
    accent: "blue",
    metricLabel: "ATS match",
    metricValue: "88%",
    placeholder: "Enter your target role, experience, achievements, and skills...",
    sample:
      "Frontend developer with 4 years of React, TypeScript, dashboards, performance optimization, and SaaS product experience.",
    features: [
      "ATS templates",
      "Live preview",
      "Cover letters",
      "Skills suggestions",
      "PDF export",
      "Saved resumes",
    ],
    workflows: ["Add profile", "Pick template", "Optimize for job", "Export PDF"],
    outputs: ["Resume draft", "Cover letter", "ATS score", "Skill gaps"],
    backend: ["Resume database", "PDF renderer", "Subscriptions", "LinkedIn import queue"],
  },
  {
    id: "thumbnail-generator",
    name: "AI Thumbnail Generator",
    shortName: "Thumbnail",
    category: "Creator",
    summary:
      "Generate YouTube thumbnails with prompt enhancement, editable overlays, style presets, background removal, and HD export.",
    icon: Image,
    accent: "violet",
    metricLabel: "CTR lift",
    metricValue: "34%",
    placeholder: "Describe your video topic, niche, emotion, colors, and main text...",
    sample:
      "A bold YouTube thumbnail for a video about building a profitable AI automation agency in 30 days.",
    features: [
      "Prompt enhancement",
      "Text overlay editor",
      "Trending templates",
      "Background remover",
      "One-click resize",
      "Creator analytics",
    ],
    workflows: ["Describe video", "Select style", "Edit overlay", "Export HD"],
    outputs: ["Image prompt", "Overlay copy", "Template match", "Export sizes"],
    backend: ["Image generation API", "Object storage", "CDN optimization", "Template service"],
  },
  {
    id: "proposal-generator",
    name: "AI Proposal Generator",
    shortName: "Proposal",
    category: "Sales",
    summary:
      "Create customized Upwork, Fiverr, and agency proposals with smart CTAs, keyword targeting, and proposal scoring.",
    icon: FileText,
    accent: "teal",
    metricLabel: "Win score",
    metricValue: "81%",
    placeholder: "Paste the client brief, budget, project details, and your relevant experience...",
    sample:
      "Client needs a MERN developer to build an AI chatbot dashboard with admin panel and Stripe subscription support.",
    features: [
      "Marketplace templates",
      "Client personalization",
      "Tone selection",
      "Proposal scoring",
      "Keyword optimization",
      "Saved library",
    ],
    workflows: ["Paste brief", "Choose marketplace", "Personalize", "Copy or export"],
    outputs: ["Proposal draft", "CTA options", "Score", "Keyword notes"],
    backend: ["Proposal database", "Template library", "Analytics events", "Prompt guardrails"],
  },
  {
    id: "website-generator",
    name: "AI Website Generator",
    shortName: "Website",
    category: "Build",
    summary:
      "Generate multi-page website plans, React/Next.js components, Tailwind design systems, SEO structure, and live preview specs.",
    icon: Globe2,
    accent: "orange",
    metricLabel: "Pages ready",
    metricValue: "6",
    placeholder:
      "Describe the website, audience, pages, offer, tone, colors, and required integrations...",
    sample:
      "Create a premium landing page for an AI automation agency with services, pricing, case studies, and contact form.",
    features: [
      "Prompt-to-site",
      "Multi-page output",
      "Tailwind support",
      "SEO structure",
      "Live preview",
      "Source export",
    ],
    workflows: ["Describe product", "Generate layout", "Preview pages", "Export code"],
    outputs: ["Sitemap", "Components", "Color palette", "SEO checklist"],
    backend: ["Code generation worker", "Preview sandbox", "Hosting integration", "Export builder"],
  },
  {
    id: "caption-generator",
    name: "AI Caption Generator",
    shortName: "Captions",
    category: "Social",
    summary:
      "Generate viral hooks, platform-specific captions, hashtags, emoji suggestions, and engagement-focused social copy.",
    icon: Megaphone,
    accent: "blue",
    metricLabel: "Hook score",
    metricValue: "95%",
    placeholder: "Describe your post, platform, audience, offer, and desired tone...",
    sample:
      "A LinkedIn post about how small businesses can use AI automation to save 10 hours per week.",
    features: [
      "Instagram captions",
      "TikTok hooks",
      "LinkedIn posts",
      "Hashtags",
      "Emoji suggestions",
      "Share workflow",
    ],
    workflows: ["Choose platform", "Add topic", "Generate hooks", "Copy or share"],
    outputs: ["Caption set", "Hashtags", "Hook bank", "Engagement tips"],
    backend: ["Caption API", "Trend signals", "Saved campaigns", "Export endpoints"],
  },
  {
    id: "domain-generator",
    name: "AI Domain Name Generator",
    shortName: "Domains",
    category: "Naming",
    summary:
      "Discover short, brandable, SEO-friendly domain names with niche analysis, favorites, exports, and availability hooks.",
    icon: Clipboard,
    accent: "violet",
    metricLabel: "Names found",
    metricValue: "42",
    placeholder:
      "Enter your startup idea, niche, keywords, target market, and preferred domain extensions...",
    sample:
      "An AI customer support SaaS for ecommerce brands that want fast automated replies and analytics.",
    features: [
      "Brandable names",
      "SEO keywords",
      "Availability checker",
      "Niche filters",
      "Favorites",
      "Export list",
    ],
    workflows: ["Add keywords", "Pick niche", "Review names", "Save favorites"],
    outputs: ["Domain ideas", "Taglines", "SEO angle", "Availability queue"],
    backend: ["Domain API", "Favorites database", "Keyword analyzer", "CSV export"],
  },
  {
    id: "portfolio-builder",
    name: "AI Portfolio Builder",
    shortName: "Portfolio",
    category: "Creator",
    summary:
      "Generate developer, agency, and creative portfolio structures with animated sections, SEO content, resumes, and contact forms.",
    icon: Layers3,
    accent: "teal",
    metricLabel: "Sections",
    metricValue: "9",
    placeholder:
      "Tell us your role, projects, skills, audience, preferred style, and contact goals...",
    sample:
      "Full-stack MERN developer portfolio with AI projects, SaaS dashboards, client testimonials, and contact form.",
    features: [
      "Portfolio generation",
      "Animated sections",
      "Resume integration",
      "Contact forms",
      "SEO setup",
      "Deploy handoff",
    ],
    workflows: ["Add profile", "Choose style", "Generate sections", "Deploy"],
    outputs: ["Portfolio outline", "Case study copy", "SEO metadata", "Contact CTA"],
    backend: ["Portfolio database", "Deploy integration", "Form handling", "Asset storage"],
  },
  {
    id: "chatbot-saas",
    name: "AI Chatbot SaaS",
    shortName: "Chatbot",
    category: "Platform",
    summary:
      "A multi-model chat SaaS blueprint with streaming, history, files, voice input, team workspaces, memory, and admin controls.",
    icon: Bot,
    accent: "orange",
    metricLabel: "Latency target",
    metricValue: "1.2s",
    placeholder:
      "Describe your chatbot use case, data sources, models, users, and workflow requirements...",
    sample:
      "A customer support chatbot for a SaaS company that can answer from docs, create tickets, and escalate to humans.",
    features: [
      "Streaming chat",
      "Multi-model support",
      "Chat history",
      "File uploads",
      "Team spaces",
      "Admin dashboard",
    ],
    workflows: ["Connect data", "Choose model", "Chat and stream", "Analyze usage"],
    outputs: ["Bot strategy", "Memory plan", "Integration list", "Admin metrics"],
    backend: ["WebSocket gateway", "Vector memory", "AI key vault", "Tenant analytics"],
  },
];

const toolPagePaths = {
  "ai-humanizer": "/tools/ai-humanizer",
  "ai-detector": "/tools/ai-detector",
  "resume-builder": "/tools/resume-builder",
  "thumbnail-generator": "/tools/thumbnail-generator",
  "proposal-generator": "/tools/proposal-generator",
  "website-generator": "/tools/website-generator",
  "caption-generator": "/tools/caption-generator",
  "domain-generator": "/tools/domain-generator",
  "portfolio-builder": "/tools/portfolio-builder",
  "chatbot-saas": "/tools/chatbot-saas",
} as const;

export function getToolPagePath(toolId: string) {
  return toolPagePaths[toolId as keyof typeof toolPagePaths] ?? "/tools";
}

const highlights = [
  { label: "AI tools", value: "10", icon: BrainCircuit },
  { label: "Reusable modules", value: "40+", icon: Layers3 },
  { label: "Export formats", value: "PDF/TXT/CSV", icon: Download },
  { label: "Built for scale", value: "MERN ready", icon: ShieldCheck },
];

const pricing = [
  {
    name: "Starter",
    price: "$19",
    description: "For creators testing AI tools and lightweight exports.",
    features: ["2,000 credits", "History", "Copy/download", "Basic analytics"],
  },
  {
    name: "Pro",
    price: "$49",
    description: "For freelancers, marketers, and teams shipping weekly.",
    features: ["15,000 credits", "PDF reports", "Saved templates", "Priority speed"],
  },
  {
    name: "Scale",
    price: "Custom",
    description: "For SaaS platforms, agencies, and enterprise workflows.",
    features: ["API access", "Admin panel", "SSO/JWT", "Dedicated AI key routing"],
  },
];

const faqs = [
  {
    q: "Can these tools connect to OpenAI, Claude, or Gemini?",
    a: "Yes. The page is structured around secure model routing, API key management, rate limiting, and prompt guardrails.",
  },
  {
    q: "Is the layout Adsense and SEO friendly?",
    a: "Yes. It uses semantic sections, clear headings, FAQ content, content blocks, fast UI components, and ad-ready slots.",
  },
  {
    q: "Can users save history?",
    a: "The interface includes a history flow. In production it can persist through MongoDB with JWT authentication.",
  },
  {
    q: "Does it support mobile users?",
    a: "Every section is responsive, touch-friendly, and avoids layout shifts across small and large viewports.",
  },
];

const testimonials = [
  {
    quote:
      "The tool suite feels like a complete AI product catalog instead of a simple landing page.",
    name: "SaaS Founder",
  },
  {
    quote: "The proposal and caption workflows are exactly what a creator team needs every day.",
    name: "Growth Lead",
  },
  {
    quote: "Clean UI, clear exports, and a backend plan our engineers can actually implement.",
    name: "Agency CTO",
  },
];

export const accentClasses = {
  teal: "text-teal border-teal/30 bg-teal/10",
  orange: "text-orange border-orange/30 bg-orange/10",
  blue: "text-sky-300 border-sky-300/30 bg-sky-300/10",
  violet: "text-violet-300 border-violet-300/30 bg-violet-300/10",
} satisfies Record<Tool["accent"], string>;

const cardAccent = {
  teal: {
    bar: "from-teal via-teal-glow to-sky-300",
    glow: "bg-teal/20",
    text: "text-teal",
    border: "group-hover:border-teal/45",
    ring: "group-hover:shadow-teal/20",
  },
  orange: {
    bar: "from-orange via-orange-glow to-teal",
    glow: "bg-orange/20",
    text: "text-orange",
    border: "group-hover:border-orange/45",
    ring: "group-hover:shadow-orange/20",
  },
  blue: {
    bar: "from-sky-300 via-teal to-teal-glow",
    glow: "bg-sky-300/20",
    text: "text-sky-300",
    border: "group-hover:border-sky-300/45",
    ring: "group-hover:shadow-sky-300/20",
  },
  violet: {
    bar: "from-violet-300 via-sky-300 to-teal",
    glow: "bg-violet-300/20",
    text: "text-violet-300",
    border: "group-hover:border-violet-300/45",
    ring: "group-hover:shadow-violet-300/20",
  },
} satisfies Record<
  Tool["accent"],
  { bar: string; glow: string; text: string; border: string; ring: string }
>;

export function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

export function countCharacters(value: string) {
  return value.length;
}

export function buildScore(input: string, tool: Tool) {
  const seed = input.length + tool.name.length * 9;
  return Math.min(98, Math.max(58, (seed % 41) + 58));
}

export function generateOutput(tool: Tool, input: string, tone: ToolTone) {
  const source = input.trim() || tool.sample;

  switch (tool.id) {
    case "ai-humanizer":
      return `Humanized ${tone.toLowerCase()} draft:\n\n${source.replace(
        /\b(leverage|utilize|comprehensive|significantly|optimize)\b/gi,
        (match) =>
          ({
            leverage: "use",
            utilize: "use",
            comprehensive: "complete",
            significantly: "meaningfully",
            optimize: "improve",
          })[match.toLowerCase()] ?? match,
      )}\n\nSEO note: clearer verbs, less robotic phrasing, and a more natural reader flow.`;
    case "ai-detector":
      return `AI detection report:\n\nAI probability: ${Math.max(12, 100 - buildScore(source, tool))}%\nHuman probability: ${buildScore(
        source,
        tool,
      )}%\n\nFlagged patterns: repeated generic claims, overly formal transitions, and low specificity.\nRecommended fix: add examples, concrete numbers, and personal context.`;
    case "resume-builder":
      return `ATS resume draft:\n\nTarget summary: ${tone} ${source}\n\nImpact bullets:\n- Built scalable product workflows with measurable business outcomes.\n- Improved performance, reliability, and delivery speed across product teams.\n- Collaborated with stakeholders to convert requirements into shipped features.\n\nSuggested skills: React, TypeScript, APIs, analytics, automation, communication.`;
    case "thumbnail-generator":
      return `Thumbnail generation prompt:\n\nCreate a high-contrast YouTube thumbnail about "${source}". Use expressive subject framing, readable 3-word headline, bold lighting, creator-style composition, and 16:9 HD export.\n\nOverlay ideas: "AI Changed This", "30 Day Build", "Stop Doing This".`;
    case "proposal-generator":
      return `Client-ready proposal:\n\nHi, I reviewed your brief and can help with ${source}.\n\nMy approach:\n1. Clarify the core workflow and success metrics.\n2. Build a clean MVP with secure architecture.\n3. Add analytics, testing, and launch support.\n\nSmart CTA: I can share a short implementation plan today.`;
    case "website-generator":
      return `Website blueprint:\n\nProject: ${source}\n\nPages: Home, Services, Pricing, Case Studies, Blog, Contact.\nDesign system: Tailwind, modern SaaS layout, fast loading, semantic SEO.\nComponents: Hero, proof strip, feature grid, process, testimonials, FAQ, CTA.\nExport: Next.js/React-ready source plan.`;
    case "caption-generator":
      return `Caption pack:\n\nHook: Most teams are using AI the slow way.\nCaption: ${source}\n\nCTA: Comment "AI" and I will send the workflow.\nHashtags: #AIautomation #SaaS #BusinessGrowth #Productivity #NoCodeAI`;
    case "domain-generator":
      return `Brandable domain ideas:\n\n- NeuralDesk.ai\n- ReplyPilot.com\n- FlowSignal.ai\n- SupportMint.com\n- CartNexus.io\n\nNaming angle: short, memorable, benefit-led, and easy to say out loud.\nBased on: ${source}`;
    case "portfolio-builder":
      return `Portfolio structure:\n\nHero: ${source}\nSections: About, Skills, Featured Projects, Case Studies, Resume, Testimonials, Contact.\nSEO title: Full-stack developer portfolio with AI and SaaS projects.\nCTA: Start a project.`;
    case "chatbot-saas":
      return `Chatbot SaaS architecture:\n\nUse case: ${source}\n\nCore modules: streaming chat UI, model router, file upload, RAG memory, team workspaces, admin analytics, rate limits, and API key vault.\nLaunch path: MVP chat, knowledge base, billing, admin controls.`;
    default:
      return source;
  }
}

export function getSuspiciousParts(input: string) {
  const source = input.trim();
  if (!source) return [];

  const pattern = /(in conclusion|important to note|comprehensive|significantly)/gi;
  const parts: Array<{ text: string; flagged: boolean; key: string }> = [];
  let lastIndex = 0;

  for (const match of source.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push({
        text: source.slice(lastIndex, index),
        flagged: false,
        key: `text-${lastIndex}`,
      });
    }
    parts.push({ text: match[0], flagged: true, key: `flag-${index}` });
    lastIndex = index + match[0].length;
  }

  if (lastIndex < source.length) {
    parts.push({ text: source.slice(lastIndex), flagged: false, key: `text-${lastIndex}` });
  }

  return parts;
}

function ToolsPage() {
  const childMatches = useChildMatches();
  return childMatches.length ? <Outlet /> : <ToolsHubPage />;
}

function ToolsHubPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-20 lg:pt-48 lg:pb-28">
        <div className="absolute inset-0 -z-10 grid-overlay opacity-20" />
        <div className="absolute left-1/2 top-20 -z-10 h-[520px] w-[min(90vw,900px)] -translate-x-1/2 rounded-full bg-teal/10 blur-[120px]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-md border border-teal/30 bg-teal/10 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.3em] text-teal">
              <Sparkles className="h-3.5 w-3.5" />
              AI Tools Suite 2026
            </div>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
              <div>
                <h1 className="font-display max-w-5xl text-5xl font-bold leading-[0.94] tracking-[-0.04em] md:text-7xl lg:text-8xl">
                  Ten premium AI tools in one <span className="gradient-text">production hub</span>.
                </h1>
                <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
                  Humanizer, detector, resume builder, thumbnail generator, proposal writer, website
                  generator, captions, domains, portfolio builder, and chatbot SaaS interface in one
                  responsive tools page.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a
                    href="#tool-pages"
                    className="inline-flex items-center gap-2 rounded-md bg-teal px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-teal-glow"
                  >
                    View tool pages <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-foreground/10"
                  >
                    Build backend
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-px bg-border">
                {highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="bg-background p-5">
                      <Icon className="h-5 w-5 text-teal" />
                      <div className="mt-5 font-display text-2xl font-bold">{item.value}</div>
                      <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="tool-pages" className="border-y border-border bg-ink py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-orange">
              Complete catalog
            </p>
            <h2 className="mt-4 max-w-4xl font-display text-4xl font-bold tracking-tight lg:text-6xl">
              Every tool has its own workflow, metrics, exports, and backend path.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool, index) => {
              return (
                <Reveal key={tool.id} delay={index} className="h-full">
                  <ToolCatalogCard tool={tool} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal">
                Production architecture
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight lg:text-6xl">
                Ready for MERN, AI APIs, subscriptions, and analytics.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground lg:text-base">
                This page keeps the existing app safe while mapping the full backend required for
                secure prompt handling, authenticated history, rate limits, API key management, and
                admin dashboards.
              </p>
            </Reveal>
            <div className="grid gap-px bg-border md:grid-cols-2">
              {[
                {
                  title: "Secure API layer",
                  icon: ShieldCheck,
                  copy: "Node/Express routes, JWT sessions, Redis rate limits, prompt validation, and API key vaulting.",
                },
                {
                  title: "Data and history",
                  icon: BarChart3,
                  copy: "MongoDB collections for users, generations, saved templates, reports, favorites, and analytics.",
                },
                {
                  title: "AI model router",
                  icon: WandSparkles,
                  copy: "OpenAI, Claude, Gemini, image generation, detector APIs, and fallback model orchestration.",
                },
                {
                  title: "Admin and billing",
                  icon: LineChart,
                  copy: "Usage graphs, scan statistics, subscriptions, credit limits, and team-level reporting.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-background p-7">
                    <Icon className="h-6 w-6 text-orange" />
                    <h3 className="mt-5 font-display text-2xl font-bold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.copy}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-ink py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-orange">
              SEO and monetization
            </p>
            <h2 className="mt-4 max-w-4xl font-display text-4xl font-bold tracking-tight lg:text-6xl">
              Built as a search-friendly AI tools landing page.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_360px]">
            <article className="grid gap-px bg-border md:grid-cols-2">
              {[
                "Dynamic meta tags and canonical URL",
                "Semantic sections for each AI tool",
                "FAQ content for rich search coverage",
                "Fast client interactions with loading-ready states",
                "Share, copy, and export interactions",
                "Programmatic SEO structure for future tool pages",
              ].map((item) => (
                <div key={item} className="bg-background p-6 text-sm text-muted-foreground">
                  <Check className="mb-4 h-5 w-5 text-teal" />
                  {item}
                </div>
              ))}
            </article>
            <aside className="rounded-md border border-dashed border-border bg-background p-6">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                Adsense-ready slot
              </p>
              <div className="mt-6 grid aspect-[4/3] place-items-center rounded-md border border-border bg-ink text-center text-sm text-muted-foreground">
                336 x 280 responsive ad space
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal">Pricing</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight lg:text-6xl">
              Plans for creators, freelancers, and SaaS teams.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-border lg:grid-cols-3">
            {pricing.map((plan) => (
              <div key={plan.name} className="bg-background p-8">
                <h3 className="font-display text-3xl font-bold">{plan.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {plan.description}
                </p>
                <div className="mt-8 font-display text-5xl font-bold text-teal">{plan.price}</div>
                <div className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <Check className="h-4 w-4 text-teal" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-ink py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-orange">FAQ</p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight lg:text-6xl">
                Questions teams ask before launch.
              </h2>
            </Reveal>
            <div className="space-y-px bg-border">
              {faqs.map((faq) => (
                <details key={faq.q} className="group bg-background p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-bold">
                    {faq.q}
                    <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal">
              Testimonials
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight lg:text-6xl">
              Designed for real product workflows.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-border lg:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="bg-background p-8">
                <blockquote className="font-display text-2xl font-bold leading-snug">
                  "{item.quote}"
                </blockquote>
                <figcaption className="mt-6 text-[10px] font-mono uppercase tracking-[0.25em] text-teal">
                  {item.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-ink py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 text-center lg:px-10">
          <Reveal>
            <PenLine className="mx-auto h-8 w-8 text-orange" />
            <h2 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-bold tracking-tight lg:text-7xl">
              Want these tools connected to real AI APIs?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground lg:text-base">
              AItouchSolutions can wire this interface to authentication, subscriptions, MongoDB,
              Redis, analytics, OpenAI, Claude, Gemini, image generation, and admin dashboards.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-md bg-teal px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ink hover:bg-teal-glow"
            >
              Start implementation <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function ToolCatalogCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  const accent = cardAccent[tool.accent];

  return (
    <Link
      to={getToolPagePath(tool.id)}
      className={`group relative flex h-full min-h-[390px] w-full flex-col overflow-hidden rounded-lg border border-border bg-background/85 p-6 text-left shadow-[0_24px_80px_-70px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1 hover:bg-ink-2/95 hover:shadow-[0_28px_90px_-58px] ${accent.border} ${accent.ring}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent.bar}`} />
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full ${accent.glow} blur-3xl transition-opacity duration-300 group-hover:opacity-90`}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_42%)] opacity-60" />

      <div className="relative flex items-start justify-between gap-4">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-md border ${accentClasses[tool.accent]} shadow-[0_0_38px_-24px_currentColor]`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span className="rounded-md border border-border/80 bg-ink/70 px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
          {tool.category}
        </span>
      </div>

      <div className="relative mt-7">
        <p className={`mb-3 text-[10px] font-mono uppercase tracking-[0.25em] ${accent.text}`}>
          {tool.shortName} workflow
        </p>
        <h3 className="font-display text-2xl font-bold leading-tight tracking-tight transition-colors group-hover:text-teal lg:text-3xl">
          {tool.name}
        </h3>
        <p className="mt-4 min-h-[72px] text-sm leading-relaxed text-muted-foreground">
          {tool.summary}
        </p>
      </div>

      <div className="relative mt-6 grid grid-cols-2 gap-2">
        {tool.features.slice(0, 4).map((feature) => (
          <span
            key={feature}
            className="flex min-h-11 items-center rounded-md border border-border/80 bg-foreground/[0.025] px-3 py-2 text-[12px] leading-snug text-muted-foreground transition-colors group-hover:border-foreground/15 group-hover:text-foreground/80"
          >
            {feature}
          </span>
        ))}
      </div>

      <div className="relative mt-auto pt-7">
        <div className="mb-5 grid grid-cols-2 gap-3">
          <div className="rounded-md border border-border/80 bg-ink/50 p-3">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              {tool.metricLabel}
            </p>
            <p className={`mt-2 font-display text-2xl font-bold ${accent.text}`}>
              {tool.metricValue}
            </p>
          </div>
          <div className="rounded-md border border-border/80 bg-ink/50 p-3">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              Outputs
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-foreground">
              {tool.outputs.length}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-border/80 pt-4">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">
            Open tool
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-md bg-teal text-ink transition-transform group-hover:translate-x-1">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

type ToolExperienceProps = {
  tool: Tool;
  input: string;
  setInput: (value: string) => void;
  output: string;
  tone: ToolTone;
  setTone: (value: ToolTone) => void;
  words: number;
  characters: number;
  score: number;
  aiScore: number;
  light: boolean;
};

export function ToolExperience({
  tool,
  input,
  setInput,
  output,
  tone,
  setTone,
  words,
  characters,
  score,
  aiScore,
  light,
}: ToolExperienceProps) {
  const panel = light ? "border-slate-200 bg-slate-50" : "border-border bg-ink";
  const card = light ? "border-slate-200 bg-white" : "border-border bg-background";
  const mutedText = light ? "text-slate-500" : "text-muted-foreground";
  const textarea = `w-full resize-none rounded-md border p-4 text-sm leading-relaxed outline-none transition-colors ${
    light
      ? "border-slate-200 bg-white text-slate-950 placeholder:text-slate-400 focus:border-teal"
      : "border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-teal"
  }`;
  const source = input.trim() || tool.sample;
  const headline = source.split(/\s+/).slice(0, 4).join(" ");
  const sentences = source
    .split(/[.!?]+/)
    .filter(Boolean)
    .slice(0, 4);
  const domainBase = source
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .slice(0, 2)
    .join("");

  const ToneButtons = () => (
    <div className="flex flex-wrap gap-2">
      {tones.map((item) => (
        <button
          key={item}
          onClick={() => setTone(item)}
          className={`rounded-md border px-3 py-2 text-xs font-semibold transition-colors ${
            tone === item
              ? "border-teal bg-teal text-ink"
              : light
                ? "border-slate-200 text-slate-600 hover:bg-slate-100"
                : "border-border text-muted-foreground hover:bg-foreground/10"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );

  if (tool.id === "ai-humanizer") {
    return (
      <div className="grid gap-4 xl:grid-cols-[1fr_220px_1fr]">
        <div className={`rounded-md border p-5 ${panel}`}>
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em]">AI draft</p>
            <span className={`text-[11px] ${mutedText}`}>
              {words} words / {characters} chars
            </span>
          </div>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={tool.placeholder}
            className={`${textarea} min-h-[360px]`}
          />
        </div>
        <div className={`rounded-md border p-5 ${card}`}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Rewrite controls</p>
          <div className="mt-4">
            <ToneButtons />
          </div>
          <div className="mt-6 space-y-4">
            {[
              ["Human", score, "bg-teal"],
              ["AI", aiScore, "bg-orange"],
            ].map(([label, value, color]) => (
              <div key={label as string}>
                <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-[0.16em]">
                  <span>{label}</span>
                  <span>{value}%</span>
                </div>
                <div className={`h-2 rounded-full ${light ? "bg-slate-200" : "bg-foreground/10"}`}>
                  <div
                    className={`h-full rounded-full ${color as string}`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-md border border-teal/30 bg-teal/10 p-4 text-sm text-teal">
            Natural phrasing, varied rhythm, SEO-safe structure.
          </div>
        </div>
        <div className={`rounded-md border p-5 ${card}`}>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em]">Humanized output</p>
          <pre className={`min-h-[360px] whitespace-pre-wrap text-sm leading-relaxed ${mutedText}`}>
            {output}
          </pre>
        </div>
      </div>
    );
  }

  if (tool.id === "ai-detector") {
    return (
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className={`rounded-md border p-5 ${panel}`}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em]">Scanner input</p>
            <span className="rounded-md bg-orange/10 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-orange">
              Live scan
            </span>
          </div>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={tool.placeholder}
            className={`${textarea} mt-4 min-h-[260px]`}
          />
          <div className="mt-4 rounded-md border border-current/10 p-4 text-sm leading-relaxed">
            {getSuspiciousParts(input).map((part) => (
              <span
                key={part.key}
                className={
                  part.flagged ? "rounded-md bg-orange/20 px-1 text-orange" : "text-current/75"
                }
              >
                {part.text}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <div className={`rounded-md border p-5 ${card}`}>
            <div className="grid gap-4 sm:grid-cols-2">
              <ScoreRing label="Human probability" value={score} light={light} />
              <ScoreRing label="AI probability" value={aiScore} inverse light={light} />
            </div>
          </div>
          <div className={`rounded-md border p-5 ${card}`}>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em]">Sentence analysis</p>
            <div className="space-y-3">
              {(sentences.length ? sentences : [tool.sample]).map((sentence, index) => (
                <div
                  key={`${sentence}-${index}`}
                  className={`rounded-md border p-3 text-sm ${panel}`}
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="font-bold">Sentence {index + 1}</span>
                    <span className={index % 2 === 0 ? "text-orange" : "text-teal"}>
                      {index % 2 === 0 ? "Review" : "Likely human"}
                    </span>
                  </div>
                  <p className={mutedText}>{sentence.trim()}.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (tool.id === "resume-builder") {
    return (
      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
        <div className={`rounded-md border p-5 ${panel}`}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Resume brief</p>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={tool.placeholder}
            className={`${textarea} mt-4 min-h-[220px]`}
          />
          <div className="mt-4 grid grid-cols-2 gap-2">
            {["Modern", "ATS", "Executive", "Creative"].map((item) => (
              <button key={item} className={`rounded-md border p-3 text-xs font-bold ${card}`}>
                {item}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-md border border-teal/30 bg-teal/10 p-4 text-sm text-teal">
            ATS match: {score}% | Cover letter ready
          </div>
        </div>
        <div className={`rounded-md border p-6 ${card}`}>
          <div className="flex flex-col gap-4 border-b border-current/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-3xl font-bold">Alex Morgan</p>
              <p className={`mt-1 text-sm ${mutedText}`}>AI Product Engineer</p>
            </div>
            <span className="rounded-md bg-teal px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-ink">
              ATS {score}%
            </span>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_240px]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em]">Generated summary</p>
              <p className={`mt-3 text-sm leading-relaxed ${mutedText}`}>{source}</p>
              <div className="mt-5 space-y-3">
                {[
                  "Improved delivery speed with reusable React and TypeScript systems.",
                  "Built dashboards, API flows, and automation features for SaaS teams.",
                  "Converted user needs into polished, measurable product outcomes.",
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`rounded-md border p-4 ${panel}`}>
              <p className="text-xs font-bold uppercase tracking-[0.2em]">Skill fit</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["React", "TypeScript", "AI APIs", "MongoDB", "UX"].map((item) => (
                  <span key={item} className="rounded-md bg-teal/10 px-2 py-1 text-xs text-teal">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (tool.id === "thumbnail-generator") {
    return (
      <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
        <div className={`rounded-md border p-5 ${panel}`}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Creator prompt</p>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={tool.placeholder}
            className={`${textarea} mt-4 min-h-[180px]`}
          />
          <div className="mt-4 space-y-2">
            {["Shock", "Tutorial", "Luxury", "Viral"].map((item) => (
              <button
                key={item}
                className={`flex w-full items-center justify-between rounded-md border p-3 text-sm ${card}`}
              >
                {item}
                <ArrowRight className="h-4 w-4 text-teal" />
              </button>
            ))}
          </div>
        </div>
        <div className={`rounded-md border p-5 ${card}`}>
          <div className="aspect-video overflow-hidden rounded-md border border-current/10 bg-gradient-to-br from-orange/80 via-ink to-teal/80 p-6">
            <div className="flex h-full flex-col justify-between">
              <div className="flex justify-between">
                <span className="rounded-md bg-ink px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-orange">
                  YouTube
                </span>
                <span className="rounded-md bg-white px-3 py-2 text-xs font-bold text-ink">4K</span>
              </div>
              <div>
                <p className="max-w-[12ch] font-display text-4xl font-bold leading-none text-white md:text-6xl">
                  {headline || "AI Build"}
                </p>
                <div className="mt-4 h-3 w-40 rounded-full bg-teal" />
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {["Text overlay", "Background remove", "HD export"].map((item) => (
              <div key={item} className={`rounded-md border p-3 text-sm ${panel}`}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (tool.id === "proposal-generator") {
    return (
      <div className="grid gap-4 xl:grid-cols-[320px_1fr_260px]">
        <div className={`rounded-md border p-5 ${panel}`}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Client brief</p>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={tool.placeholder}
            className={`${textarea} mt-4 min-h-[300px]`}
          />
        </div>
        <div className={`rounded-md border p-5 ${card}`}>
          <div className="mb-4 flex flex-wrap gap-2">
            {["Upwork", "Fiverr", "Agency", "Cold email"].map((item) => (
              <span key={item} className="rounded-md border border-current/10 px-3 py-2 text-xs">
                {item}
              </span>
            ))}
          </div>
          <pre className={`min-h-[300px] whitespace-pre-wrap text-sm leading-relaxed ${mutedText}`}>
            {output}
          </pre>
        </div>
        <div className={`rounded-md border p-5 ${panel}`}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Proposal score</p>
          <div className="mt-5 font-display text-6xl font-bold text-teal">{score}</div>
          <div className="mt-5 space-y-3">
            {["Personalization", "Proof", "CTA", "Keyword fit"].map((item, index) => (
              <div key={item}>
                <div className="mb-1 flex justify-between text-xs">
                  <span>{item}</span>
                  <span>{score - index * 6}%</span>
                </div>
                <div className={`h-2 rounded-full ${light ? "bg-slate-200" : "bg-foreground/10"}`}>
                  <div
                    className="h-full rounded-full bg-teal"
                    style={{ width: `${score - index * 6}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (tool.id === "website-generator") {
    return (
      <div className="grid gap-4 lg:grid-cols-[330px_1fr]">
        <div className={`rounded-md border p-5 ${panel}`}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Website prompt</p>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={tool.placeholder}
            className={`${textarea} mt-4 min-h-[190px]`}
          />
          <div className="mt-4 grid grid-cols-2 gap-2">
            {["Home", "Pricing", "Blog", "Contact", "SEO", "Deploy"].map((item) => (
              <div key={item} className={`rounded-md border p-3 text-xs ${card}`}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className={`rounded-md border p-5 ${card}`}>
          <div className={`rounded-md border ${panel}`}>
            <div className="flex gap-2 border-b border-current/10 p-3">
              <span className="h-3 w-3 rounded-full bg-orange" />
              <span className="h-3 w-3 rounded-full bg-teal" />
              <span className="h-3 w-3 rounded-full bg-sky-300" />
            </div>
            <div className="grid gap-4 p-5 md:grid-cols-[1fr_240px]">
              <div>
                <p className="font-display text-4xl font-bold leading-tight">{headline}</p>
                <p className={`mt-4 text-sm leading-relaxed ${mutedText}`}>
                  Generated SaaS layout with hero, proof, services, pricing, FAQ, and conversion
                  CTA.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {["React", "Tailwind", "SEO"].map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-teal/10 p-3 text-center text-xs text-teal"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                {["Hero", "Features", "Pricing", "FAQ", "CTA"].map((item) => (
                  <div key={item} className="rounded-md border border-current/10 p-3 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (tool.id === "caption-generator") {
    return (
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className={`rounded-md border p-5 ${panel}`}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Social brief</p>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={tool.placeholder}
            className={`${textarea} mt-4 min-h-[180px]`}
          />
          <div className="mt-4 grid grid-cols-2 gap-2">
            {["Instagram", "TikTok", "YouTube", "LinkedIn"].map((item) => (
              <button key={item} className={`rounded-md border p-3 text-xs font-bold ${card}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[270px_1fr]">
          <div className={`rounded-[28px] border p-4 ${card}`}>
            <div className={`rounded-[20px] border p-4 ${panel}`}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal">New post</p>
              <p className="mt-5 font-display text-2xl font-bold leading-tight">
                Most teams are using AI the slow way.
              </p>
              <p className={`mt-4 text-sm leading-relaxed ${mutedText}`}>{source}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["#AI", "#Growth", "#SaaS"].map((item) => (
                  <span key={item} className="rounded-md bg-teal/10 px-2 py-1 text-xs text-teal">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-3">
            {[
              "Stop scrolling if your team still repeats this task.",
              "This AI workflow saves 10 hours every week.",
              "The simplest automation is usually the most profitable one.",
            ].map((hook) => (
              <div key={hook} className={`rounded-md border p-4 text-sm ${card}`}>
                <Megaphone className="mb-3 h-4 w-4 text-orange" />
                {hook}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (tool.id === "domain-generator") {
    const domains = [
      `${domainBase || "neuraldesk"}.ai`,
      `${domainBase || "flowpilot"}hq.com`,
      `get${domainBase || "supportmint"}.com`,
      `${domainBase || "cartnexus"}.io`,
      `${domainBase || "replysignal"}.app`,
      `${domainBase || "brandforge"}.co`,
    ];
    return (
      <div className="grid gap-4 lg:grid-cols-[330px_1fr]">
        <div className={`rounded-md border p-5 ${panel}`}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Naming keywords</p>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={tool.placeholder}
            className={`${textarea} mt-4 min-h-[220px]`}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {["SaaS", "AI", "Ecommerce", "Short names", ".com"].map((item) => (
              <span key={item} className="rounded-md border border-current/10 px-3 py-2 text-xs">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {domains.map((domain, index) => (
            <div key={domain} className={`rounded-md border p-5 ${card}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-2xl font-bold">{domain}</p>
                  <p className={`mt-2 text-sm ${mutedText}`}>
                    {index % 2 === 0 ? "Available check ready" : "Premium-like brand fit"}
                  </p>
                </div>
                <span className={index % 2 === 0 ? "text-teal" : "text-orange"}>
                  {index % 2 === 0 ? "Open" : "Check"}
                </span>
              </div>
              <div className="mt-5 flex gap-2">
                <button className="rounded-md bg-teal px-3 py-2 text-xs font-bold text-ink">
                  Save
                </button>
                <button className={`rounded-md border px-3 py-2 text-xs ${panel}`}>Export</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tool.id === "portfolio-builder") {
    return (
      <div className="grid gap-4 lg:grid-cols-[330px_1fr]">
        <div className={`rounded-md border p-5 ${panel}`}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Profile input</p>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={tool.placeholder}
            className={`${textarea} mt-4 min-h-[220px]`}
          />
          <div className="mt-5 space-y-3">
            {["Hero", "Projects", "Case studies", "Resume", "Contact"].map((item, index) => (
              <div key={item} className="flex items-center gap-3 text-sm">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-teal text-xs font-bold text-ink">
                  {index + 1}
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className={`rounded-md border p-5 ${card}`}>
          <div className={`rounded-md border p-6 ${panel}`}>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-teal">
              Portfolio preview
            </p>
            <h3 className="mt-5 max-w-2xl font-display text-5xl font-bold leading-none">
              {headline || "Full-stack AI builder"}
            </h3>
            <p className={`mt-5 max-w-xl text-sm leading-relaxed ${mutedText}`}>{source}</p>
            <div className="mt-8 grid gap-px bg-current/10 md:grid-cols-3">
              {["SaaS dashboard", "AI automation", "Mobile app"].map((item) => (
                <div key={item} className={`p-5 ${card}`}>
                  <Layers3 className="mb-4 h-5 w-5 text-orange" />
                  <p className="font-bold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className={`rounded-md border ${card}`}>
        <div
          className={`flex items-center justify-between border-b border-current/10 p-4 ${panel}`}
        >
          <div className="flex items-center gap-3">
            <Bot className="h-5 w-5 text-teal" />
            <div>
              <p className="text-sm font-bold">Support AI</p>
              <p className={`text-xs ${mutedText}`}>GPT-4.1 routing | Memory on</p>
            </div>
          </div>
          <span className="rounded-md bg-teal/10 px-2 py-1 text-xs text-teal">Streaming</span>
        </div>
        <div className="space-y-4 p-5">
          <div className={`max-w-[78%] rounded-md border p-4 text-sm ${panel}`}>{source}</div>
          <div className="ml-auto max-w-[82%] rounded-md bg-teal p-4 text-sm text-ink">
            I can answer from your docs, create tickets, remember users, and escalate complex cases
            to your team.
          </div>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={tool.placeholder}
            className={`${textarea} min-h-[120px]`}
          />
        </div>
      </div>
      <div className={`rounded-md border p-5 ${panel}`}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">SaaS controls</p>
        <div className="mt-5 space-y-3">
          {["Model router", "File upload", "Voice input", "Team space", "Admin logs"].map(
            (item) => (
              <div
                key={item}
                className={`flex items-center justify-between rounded-md border p-3 ${card}`}
              >
                <span className="text-sm">{item}</span>
                <Check className="h-4 w-4 text-teal" />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export function ScoreRing({
  label,
  value,
  inverse = false,
  light = false,
}: {
  label: string;
  value: number;
  inverse?: boolean;
  light?: boolean;
}) {
  const color = inverse ? "var(--color-orange)" : "var(--color-teal)";
  return (
    <div className={light ? "bg-white p-5" : "bg-background/60 p-5"}>
      <div className="flex items-center gap-4">
        <div
          className="grid h-20 w-20 shrink-0 place-items-center rounded-full"
          style={{
            background: `conic-gradient(${color} ${value * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
          }}
        >
          <div
            className={`grid h-14 w-14 place-items-center rounded-full text-sm font-bold ${
              light ? "bg-white text-slate-950" : "bg-background"
            }`}
          >
            {value}%
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em]">{label}</p>
          <p
            className={light ? "mt-2 text-sm text-slate-500" : "mt-2 text-sm text-muted-foreground"}
          >
            {inverse
              ? "Lower is better for authenticity checks."
              : "Live estimate from the current input."}
          </p>
        </div>
      </div>
    </div>
  );
}
