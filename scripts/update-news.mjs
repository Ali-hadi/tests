import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const srcNewsPath = path.join(rootDir, "src", "data", "news.json");
const publicNewsPath = path.join(rootDir, "public", "data", "news.json");
const maxPosts = Number.parseInt(process.env.NEWS_MAX_POSTS ?? "48", 10);
const perSourceLimit = Number.parseInt(process.env.NEWS_PER_SOURCE_LIMIT ?? "8", 10);

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

function mergePosts(fetchedPosts, existingPosts) {
  const byUrl = new Map();

  for (const post of [...fetchedPosts, ...existingPosts]) {
    const key = normalizeUrl(post.url || "") || post.id || post.title;
    if (!key || byUrl.has(key)) continue;
    byUrl.set(key, post);
  }

  return Array.from(byUrl.values())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, maxPosts);
}

async function main() {
  const existing = await readExisting();
  const fetchedPosts = [];

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
    generatedAt: new Date().toISOString(),
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

  console.log(
    `Stored ${output.posts.length} AI/IT posts in ${path.relative(rootDir, srcNewsPath)}`,
  );
  console.log(`Published JSON copy at ${path.relative(rootDir, publicNewsPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
