import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const srcNewsPath = path.join(rootDir, "src", "data", "news.json");
const editorialPostsPath = path.join(rootDir, "src", "data", "editorial-posts.json");
const publicNewsPath = path.join(rootDir, "public", "data", "news.json");
const sitemapPath = path.join(rootDir, "public", "sitemap.xml");
const maxPosts = Number.parseInt(process.env.NEWS_MAX_POSTS ?? "48", 10);
const perSourceLimit = Number.parseInt(process.env.NEWS_PER_SOURCE_LIMIT ?? "8", 10);
const siteUrl = "https://aitouchsolutions.com";
const fallbackImage = "/og-image.jpg";

const sitemapStaticRoutes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/services/ai-agent-development", changefreq: "monthly", priority: "0.86" },
  { path: "/services/ai-automation", changefreq: "monthly", priority: "0.86" },
  { path: "/services/ai-chatbot-development", changefreq: "monthly", priority: "0.86" },
  { path: "/services/ai-saas-development", changefreq: "monthly", priority: "0.86" },
  { path: "/services/custom-saas-development", changefreq: "monthly", priority: "0.86" },
  { path: "/services/web-application-development", changefreq: "monthly", priority: "0.86" },
  { path: "/services/mobile-app-development", changefreq: "monthly", priority: "0.86" },
  { path: "/services/mvp-development", changefreq: "monthly", priority: "0.86" },
  { path: "/services/ecommerce-development", changefreq: "monthly", priority: "0.86" },
  { path: "/services/crm-erp-development", changefreq: "monthly", priority: "0.86" },
  { path: "/services/data-dashboard-development", changefreq: "monthly", priority: "0.86" },
  { path: "/services/cloud-devops-services", changefreq: "monthly", priority: "0.86" },
  { path: "/services/cybersecurity-services", changefreq: "monthly", priority: "0.86" },
  { path: "/services/dedicated-developers", changefreq: "monthly", priority: "0.86" },
  { path: "/services/maintenance-support", changefreq: "monthly", priority: "0.86" },
  { path: "/ai-solutions", changefreq: "monthly", priority: "0.9" },
  { path: "/tools", changefreq: "weekly", priority: "0.95" },
  { path: "/tools/ai-humanizer", changefreq: "weekly", priority: "0.9" },
  { path: "/tools/ai-detector", changefreq: "weekly", priority: "0.9" },
  { path: "/tools/resume-builder", changefreq: "weekly", priority: "0.88" },
  { path: "/tools/thumbnail-generator", changefreq: "weekly", priority: "0.88" },
  { path: "/tools/proposal-generator", changefreq: "weekly", priority: "0.88" },
  { path: "/tools/website-generator", changefreq: "weekly", priority: "0.88" },
  { path: "/tools/caption-generator", changefreq: "weekly", priority: "0.88" },
  { path: "/tools/domain-generator", changefreq: "weekly", priority: "0.88" },
  { path: "/tools/portfolio-builder", changefreq: "weekly", priority: "0.88" },
  { path: "/tools/chatbot-saas", changefreq: "weekly", priority: "0.88" },
  { path: "/pricing", changefreq: "monthly", priority: "0.8" },
  { path: "/portfolio", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "daily", priority: "0.8" },
  { path: "/technologies", changefreq: "monthly", priority: "0.7" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.4" },
  { path: "/terms-and-conditions", changefreq: "yearly", priority: "0.4" },
  { path: "/refund-policy", changefreq: "yearly", priority: "0.4" },
];

const newsSources = [
  {
    name: "OpenAI News",
    category: "AI",
    url: "https://openai.com/news/",
    feedUrl: "https://openai.com/news/rss.xml",
  },
  {
    name: "Google AI Blog",
    category: "AI",
    url: "https://blog.google/technology/ai/",
    feedUrl: "https://blog.google/technology/ai/rss/",
  },
  {
    name: "Microsoft AI Blog",
    category: "AI",
    url: "https://blogs.microsoft.com/ai/",
    feedUrl: "https://blogs.microsoft.com/ai/feed/",
  },
  {
    name: "TechCrunch AI",
    category: "AI",
    url: "https://techcrunch.com/category/artificial-intelligence/",
    feedUrl: "https://techcrunch.com/category/artificial-intelligence/feed/",
  },
  {
    name: "The Verge",
    category: "IT",
    url: "https://www.theverge.com/tech",
    feedUrl: "https://www.theverge.com/rss/index.xml",
  },
  {
    name: "Ars Technica",
    category: "IT",
    url: "https://arstechnica.com/information-technology/",
    feedUrl: "https://feeds.arstechnica.com/arstechnica/technology-lab",
  },
  {
    name: "The Register",
    category: "IT",
    url: "https://www.theregister.com/",
    feedUrl: "https://www.theregister.com/headlines.atom",
  },
  {
    name: "ZDNET",
    category: "IT",
    url: "https://www.zdnet.com/",
    feedUrl: "https://www.zdnet.com/news/rss.xml",
  },
];

const aiKeywords = [
  "ai",
  "artificial intelligence",
  "chatgpt",
  "openai",
  "llm",
  "large language model",
  "machine learning",
  "generative ai",
  "robotics",
  "neural network",
  "copilot",
  "deepmind",
  "anthropic",
  "gemini",
];

const itKeywords = [
  "software",
  "developer",
  "programming",
  "cloud",
  "cybersecurity",
  "security",
  "data",
  "database",
  "server",
  "network",
  "hardware",
  "startup",
  "app",
  "web",
  "mobile",
  "chip",
  "semiconductor",
  "it",
  "technology",
];

const aiKeywordPatterns = aiKeywords.map(keywordPattern);
const itKeywordPatterns = itKeywords.map(keywordPattern);

function decodeEntities(value = "") {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number.parseInt(number, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'");
}

function cleanText(value = "") {
  return decodeEntities(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function summarize(value = "") {
  const text = cleanText(value);
  if (text.length <= 220) return text;
  return `${text.slice(0, 217).trim()}...`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function keywordPattern(keyword) {
  const phrase = keyword
    .trim()
    .split(/\s+/)
    .map((part) => escapeRegExp(part))
    .join("\\s+");
  return new RegExp(`\\b${phrase}\\b`, "i");
}

function getTag(block, names) {
  for (const name of names) {
    const pattern = new RegExp(
      `<${escapeRegExp(name)}\\b[^>]*>([\\s\\S]*?)<\\/${escapeRegExp(name)}>`,
      "i",
    );
    const match = block.match(pattern);
    if (match?.[1]) return match[1];
  }
  return "";
}

function getAttr(block, tagName, attrName) {
  const pattern = new RegExp(
    `<${escapeRegExp(tagName)}\\b[^>]*\\s${escapeRegExp(attrName)}=["']([^"']+)["'][^>]*>`,
    "i",
  );
  return block.match(pattern)?.[1] ?? "";
}

function getCategories(block) {
  const categories = [];
  const rssCategoryPattern = /<category\b[^>]*>([\s\S]*?)<\/category>/gi;
  for (const match of block.matchAll(rssCategoryPattern)) {
    const category = cleanText(match[1]);
    if (category) categories.push(category);
  }

  const atomCategoryPattern = /<category\b[^>]*\sterm=["']([^"']+)["'][^>]*>/gi;
  for (const match of block.matchAll(atomCategoryPattern)) {
    const category = cleanText(match[1]);
    if (category) categories.push(category);
  }

  return Array.from(new Set(categories)).slice(0, 6);
}

function normalizeUrl(value = "") {
  const url = decodeEntities(value).trim();
  if (!url) return "";

  try {
    const parsed = new URL(url);
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((param) =>
      parsed.searchParams.delete(param),
    );
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return url;
  }
}

function postId(url, title) {
  return createHash("sha1")
    .update(url || title)
    .digest("hex")
    .slice(0, 12);
}

function slugify(value = "") {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 82)
    .replace(/-+$/g, "");

  return slug || "technology-brief";
}

function postSlug(post) {
  const id = post.id || postId(post.url, post.title);
  return `${slugify(post.title)}-${id}`;
}

function unique(values) {
  return Array.from(
    new Set(
      values
        .filter(Boolean)
        .map((value) => cleanText(String(value)))
        .filter(Boolean),
    ),
  );
}

function normalizeTags(post) {
  const tags = unique([...(Array.isArray(post.tags) ? post.tags : []), post.category]);
  return tags.slice(0, 8);
}

function sentence(value = "") {
  const text = cleanText(value);
  if (!text) return "";
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function sourceDomain(value = "") {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function buildKeyTakeaways(post, tags) {
  const topic = tags.length > 0 ? tags.slice(0, 3).join(", ") : post.category;
  const audience =
    post.category === "AI"
      ? "AI teams, product leaders, and operators"
      : "engineering, security, and technology operations teams";

  return [
    `${post.source} is tracking this as a ${post.category} signal around ${topic}.`,
    `${audience} should watch how the story affects roadmap planning, risk, and customer expectations.`,
    "AItouchSolutions keeps the brief internal so readers can review the context without being sent to another site.",
  ];
}

function buildArticleSections(post, tags) {
  const topic = tags.length > 0 ? tags.slice(0, 4).join(", ") : post.category;
  const categoryContext =
    post.category === "AI"
      ? "AI adoption is moving from experimentation into practical systems, which makes timing, trust, infrastructure, and governance important for every technical decision."
      : "IT teams are under pressure to modernize infrastructure while keeping reliability, security, cost, and user experience under control.";
  const sourceLabel = sourceDomain(post.url) || post.source;

  return [
    {
      heading: "Overview",
      body: [
        sentence(post.excerpt),
        `This AItouchSolutions brief stores the story in JSON with its image, tags, source label, category, publish date, and internal blog URL so the article can be indexed on the site.`,
      ],
    },
    {
      heading: "Why It Matters",
      body: [
        categoryContext,
        `The useful signal is the connection between ${topic} and the day-to-day decisions teams make about products, automation, infrastructure, security, and customer-facing digital services.`,
      ],
    },
    {
      heading: "What To Watch",
      body: [
        `Watch for follow-up movement from ${post.source}, competing vendors, enterprise buyers, developers, and regulators as the story develops.`,
        "The next practical questions are adoption speed, integration cost, reliability, privacy, security posture, and whether the change creates measurable business value.",
      ],
    },
    {
      heading: "AItouchSolutions Take",
      body: [
        `For teams building software, AI agents, automation workflows, or cloud systems, this is worth reading as a planning signal rather than isolated news from ${sourceLabel}.`,
        "The safest next step is to connect the trend to a specific workflow, define the business outcome, and validate it with a small pilot before scaling.",
      ],
    },
  ];
}

function estimateReadTime(post) {
  const words = [
    post.title,
    post.excerpt,
    ...(post.keyTakeaways ?? []),
    ...(post.content ?? []).flatMap((section) => [section.heading, ...(section.body ?? [])]),
  ]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(2, Math.ceil(words / 190));
}

function hydratePost(input) {
  const id = input.id || postId(input.url, input.title);
  const post = {
    id,
    title: cleanText(input.title),
    excerpt: sentence(input.excerpt || input.summary || input.title),
    source: cleanText(input.source),
    category: input.category === "AI" ? "AI" : "IT",
    publishedAt: parseDate(input.publishedAt),
    url: normalizeUrl(input.url || ""),
    image: normalizeUrl(input.image || "") || fallbackImage,
  };
  const tags = normalizeTags({ ...input, ...post });
  const content =
    Array.isArray(input.content) && input.content.length > 0
      ? input.content
      : buildArticleSections(post, tags);
  const keyTakeaways =
    Array.isArray(input.keyTakeaways) && input.keyTakeaways.length > 0
      ? input.keyTakeaways.map((item) => sentence(item))
      : buildKeyTakeaways(post, tags);
  const hydrated = {
    ...post,
    slug: input.slug || postSlug(post),
    tags,
    author: input.author || "AItouchSolutions Editorial",
    readingTime: Number.isFinite(input.readingTime) ? input.readingTime : 0,
    keyTakeaways,
    content,
  };

  hydrated.readingTime = hydrated.readingTime || estimateReadTime(hydrated);
  return hydrated;
}

function hasKeyword(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function classifyPost(text, fallbackCategory) {
  if (hasKeyword(text, aiKeywordPatterns)) return "AI";
  if (hasKeyword(text, itKeywordPatterns)) return "IT";
  return fallbackCategory;
}

function parseDate(value) {
  const timestamp = Date.parse(cleanText(value));
  if (Number.isNaN(timestamp)) return new Date().toISOString();
  return new Date(timestamp).toISOString();
}

function extractItems(xml) {
  const rssItems = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
  if (rssItems.length > 0) return rssItems;
  return xml.match(/<entry\b[\s\S]*?<\/entry>/gi) ?? [];
}

function parseFeed(xml, source) {
  return extractItems(xml)
    .map((block) => {
      const title = cleanText(getTag(block, ["title"]));
      const link =
        normalizeUrl(getTag(block, ["link"])) ||
        normalizeUrl(getAttr(block, "link", "href")) ||
        normalizeUrl(getTag(block, ["guid", "id"]));
      const description = getTag(block, ["description", "content:encoded", "summary", "content"]);
      const excerpt = summarize(description || title);
      const tags = getCategories(block);
      const searchText = [title, excerpt, tags.join(" ")].join(" ");
      const category = classifyPost(searchText, source.category);
      const publishedAt = parseDate(getTag(block, ["pubDate", "published", "updated", "dc:date"]));
      const image =
        normalizeUrl(getAttr(block, "media:content", "url")) ||
        normalizeUrl(getAttr(block, "media:thumbnail", "url")) ||
        normalizeUrl(getAttr(block, "enclosure", "url"));

      if (!title || !link || !excerpt) return null;

      return {
        id: postId(link, title),
        title,
        excerpt,
        source: source.name,
        category,
        publishedAt,
        url: link,
        ...(image ? { image } : {}),
        ...(tags.length > 0 ? { tags } : {}),
      };
    })
    .filter(Boolean)
    .slice(0, perSourceLimit);
}

async function fetchSource(source) {
  const response = await fetch(source.feedUrl, {
    headers: {
      accept: "application/rss+xml, application/atom+xml, text/xml, application/xml, */*",
      "user-agent": "AItouchSolutionsNewsBot/1.0 (+https://aitouchsolutions.com)",
    },
    signal: AbortSignal.timeout(18000),
  });

  if (!response.ok) {
    throw new Error(`${source.name} returned ${response.status}`);
  }

  const xml = await response.text();
  return parseFeed(xml, source);
}

async function readExisting() {
  try {
    return JSON.parse(await readFile(srcNewsPath, "utf8"));
  } catch {
    return { generatedAt: "", sources: [], posts: [] };
  }
}

async function readEditorialPosts() {
  try {
    const data = JSON.parse(await readFile(editorialPostsPath, "utf8"));
    return Array.isArray(data.posts) ? data.posts.map(hydratePost) : [];
  } catch {
    return [];
  }
}

function mergePosts(fetchedPosts, existingPosts) {
  const byUrl = new Map();

  for (const post of [...fetchedPosts, ...existingPosts]) {
    const key = normalizeUrl(post.url || "") || post.id || post.title;
    if (!key || byUrl.has(key)) continue;
    byUrl.set(key, post);
  }

  return Array.from(byUrl.values())
    .map(hydratePost)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, maxPosts);
}

function sitemapUrl(route, lastmod) {
  return [
    "  <url>",
    `    <loc>${siteUrl}${route.path}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${route.changefreq}</changefreq>`,
    `    <priority>${route.priority}</priority>`,
    "  </url>",
  ].join("\n");
}

function buildSitemap(posts, generatedAt) {
  const today = generatedAt.slice(0, 10);
  const staticUrls = sitemapStaticRoutes.map((route) => sitemapUrl(route, today));
  const blogUrls = posts.map((post) =>
    sitemapUrl(
      {
        path: `/blog/${post.slug}`,
        changefreq: "weekly",
        priority: post.category === "AI" ? "0.75" : "0.7",
      },
      post.publishedAt.slice(0, 10),
    ),
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticUrls,
    ...blogUrls,
    "</urlset>",
    "",
  ].join("\n");
}

async function main() {
  const existing = await readExisting();
  const editorialPosts = await readEditorialPosts();
  const fetchedPosts = [];
  const generatedAt = new Date().toISOString();

  for (const source of newsSources) {
    try {
      const posts = await fetchSource(source);
      fetchedPosts.push(...posts);
      console.log(`Fetched ${posts.length} posts from ${source.name}`);
    } catch (error) {
      console.warn(`Skipped ${source.name}: ${error instanceof Error ? error.message : error}`);
    }
  }

  const output = {
    generatedAt,
    sources: newsSources.map(({ name, category, url, feedUrl }) => ({
      name,
      category,
      url,
      feedUrl,
    })),
    posts: mergePosts(fetchedPosts, Array.isArray(existing.posts) ? existing.posts : []),
  };

  await mkdir(path.dirname(srcNewsPath), { recursive: true });
  await mkdir(path.dirname(publicNewsPath), { recursive: true });

  const json = `${JSON.stringify(output, null, 2)}\n`;
  await writeFile(srcNewsPath, json, "utf8");
  await writeFile(publicNewsPath, json, "utf8");
  await writeFile(
    sitemapPath,
    buildSitemap([...editorialPosts, ...output.posts], generatedAt),
    "utf8",
  );

  console.log(
    `Stored ${output.posts.length} AI/IT posts in ${path.relative(rootDir, srcNewsPath)}`,
  );
  console.log(`Published JSON copy at ${path.relative(rootDir, publicNewsPath)}`);
  console.log(
    `Indexed ${editorialPosts.length + output.posts.length} blog detail URLs in ${path.relative(rootDir, sitemapPath)}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
