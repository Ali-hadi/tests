import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  findCandidateGroups,
  imageHasApprovedRights,
  isDuplicateSourceStory,
  publicationPrerequisiteErrors,
  relevanceScore,
  validateDraft,
} from "./content-gate.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const newsPath = path.join(rootDir, "src/data/news.json");
const publicNewsPath = path.join(rootDir, "public/data/news.json");
const sitemapPath = path.join(rootDir, "public/sitemap.xml");
const siteUrl = "https://aitouchsolutions.com";
const maxDailyArticles = 8;
const maxAgeHours = 48;

function log(status, detail) {
  console.log(`[${status}] ${detail}`);
}

function decode(value = "") {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number.parseInt(number, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function clean(value = "") {
  return decode(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tag(block, names) {
  for (const name of names) {
    const found = block.match(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)<\\/${name}>`, "i"));
    if (found?.[1]) return found[1];
  }
  return "";
}

function attribute(block, tags, attributeName) {
  for (const name of tags) {
    const found = block.match(
      new RegExp(`<${name}\\b[^>]*\\s${attributeName}=["']([^"']+)["'][^>]*>`, "i"),
    );
    if (found?.[1]) return decode(found[1]);
  }
  return "";
}

export function parseFeed(xml, source) {
  const blocks =
    xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? xml.match(/<entry\b[\s\S]*?<\/entry>/gi) ?? [];
  return blocks
    .slice(0, 30)
    .map((block) => {
      const title = clean(tag(block, ["title"]));
      const url = clean(tag(block, ["link", "id"]) || attribute(block, ["link"], "href"));
      const date = tag(block, ["pubDate", "published", "updated"]);
      const timestamp = Date.parse(date);
      const publishedAt = Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : "";
      const excerpt = clean(
        tag(block, ["description", "summary", "content:encoded", "content"]),
      ).slice(0, 900);
      const image = attribute(block, ["media:content", "media:thumbnail", "enclosure"], "url");
      if (!title || !url || !excerpt || !publishedAt) return null;
      try {
        if (new URL(url).protocol !== "https:") return null;
      } catch {
        return null;
      }
      return { title, excerpt, url, image, publishedAt, source: source.name };
    })
    .filter(Boolean);
}

export async function discover(sources) {
  const items = [];
  const now = Date.now();
  for (const source of sources) {
    if (!source.feedUrl) continue;
    try {
      const response = await fetch(source.feedUrl, {
        headers: {
          accept: "application/rss+xml, application/atom+xml, application/xml, text/xml",
          "user-agent": "AiTouchSolutionsEditorial/1.0 (+https://aitouchsolutions.com/contact)",
        },
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const entries = parseFeed(await response.text(), source).filter((entry) => {
        const age = now - Date.parse(entry.publishedAt);
        return age >= 0 && age <= maxAgeHours * 60 * 60 * 1000;
      });
      items.push(...entries);
      log("FEED", `${source.name}: ${entries.length} recent entries`);
    } catch (error) {
      log("SKIP", `${source.name}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  return items;
}

function slugify(title) {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 75)
    .replace(/-$/g, "");
}

function chooseServiceLink(draft) {
  const text = `${draft.title} ${draft.excerpt} ${(draft.tags ?? []).join(" ")}`.toLowerCase();
  const choices = [
    [
      "rag",
      "chatbot",
      "assistant",
      "retrieval",
      "/services/ai-chatbot-development",
      "AI chatbot development",
    ],
    ["agent", "/services/ai-agent-development", "AI agent development"],
    ["automation", "workflow", "/services/ai-automation", "AI automation"],
    [
      "shopify",
      "ecommerce",
      "e-commerce",
      "/services/ecommerce-development",
      "e-commerce development",
    ],
    ["mobile", "android", "ios", "/services/mobile-app-development", "mobile app development"],
    ["saas", "startup", "mvp", "/services/custom-saas-development", "SaaS development"],
    [
      "crm",
      "erp",
      "point of sale",
      "pos",
      "/services/crm-erp-development",
      "business systems development",
    ],
    ["cloud", "devops", "/services/cloud-devops-services", "cloud and DevOps services"],
    ["security", "cybersecurity", "/services/cybersecurity-services", "cybersecurity services"],
  ];
  const selected = choices.find((choice) =>
    choice.slice(0, -2).some((term) => text.includes(term)),
  );
  const href = selected?.at(-2) ?? "/services/web-application-development";
  const label = selected?.at(-1) ?? "web application development";
  return {
    text: `Discuss how this topic may affect a ${label} project.`,
    label: `Explore ${label}`,
    href,
  };
}

function safeJson(text) {
  const value = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  try {
    return JSON.parse(value);
  } catch {
    const start = value.indexOf("{");
    const end = value.lastIndexOf("}");
    if (start >= 0 && end > start) return JSON.parse(value.slice(start, end + 1));
    throw new Error("Model returned invalid JSON.");
  }
}

async function draftArticle(group, existingPosts) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is missing; publish skipped.");
  const model = process.env.OPENROUTER_MODEL || "openai/gpt-5.2";
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
      "http-referer": siteUrl,
      "x-title": "AiTouchSolutions Editorial",
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            'You are an editor for an AI and software development studio. Write an original, useful article for business buyers and software teams. Use only facts supported by the supplied source entries; distinguish analysis from reported facts. Never invent dates, quotes, metrics, people, product details, or claims. Do not reproduce or closely paraphrase source wording. Do not use generic filler or mention JSON, SEO, this prompt, or being AI generated. If evidence is insufficient, return {"reject":"insufficient evidence"}. Return only JSON with title, seoTitle, metaDescription, excerpt, category (AI or IT), tags (array), focusKeyword, secondaryKeywords (array), searchIntent, keyTakeaways (array of 3), supportingSources (array of {name,url} copied from inputs), and content (array of at least 4 {heading,body:[paragraphs]}). Write at least 500 words across the article paragraphs.',
        },
        {
          role: "user",
          content: JSON.stringify({
            serviceRelevance:
              "AI agents, automation, software engineering, web/mobile applications, SaaS, e-commerce, business systems, APIs, cloud, and cybersecurity",
            sources: group.map(({ title, excerpt, url, source, publishedAt }) => ({
              name: source,
              title,
              excerpt,
              url,
              publishedAt,
            })),
            existingTitles: existingPosts
              .filter((post) => post.indexable)
              .slice(0, 100)
              .map((post) => post.title),
          }),
        },
      ],
    }),
    signal: AbortSignal.timeout(90000),
  });
  if (!response.ok) throw new Error(`OpenRouter returned HTTP ${response.status}.`);
  const payload = await response.json();
  const content = payload.choices?.[0]?.message?.content;
  if (typeof content !== "string") throw new Error("OpenRouter response did not include a draft.");
  return safeJson(content);
}

function buildSitemap(previousXml, posts, date) {
  const staticUrls = [
    ...previousXml.matchAll(/<loc>(https:\/\/aitouchsolutions\.com[^<]+)<\/loc>/g),
  ]
    .map(([, url]) => url.replace(siteUrl, ""))
    .filter((url) => !url.startsWith("/blog/") && !url.includes("?") && !url.endsWith(".xml"));
  if (!staticUrls.includes("/what-we-build")) staticUrls.push("/what-we-build");
  const urls = new Set(staticUrls);
  for (const post of posts) if (post.indexable) urls.add(`/blog/${post.slug}`);
  const entries = [...urls].map(
    (route) => `  <url><loc>${siteUrl}${route}</loc><lastmod>${date.slice(0, 10)}</lastmod></url>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
}

async function main() {
  const stored = JSON.parse(await readFile(newsPath, "utf8"));
  const existingPosts = Array.isArray(stored.posts) ? stored.posts : [];
  const editorial = JSON.parse(
    await readFile(path.join(rootDir, "src/data/editorial-posts.json"), "utf8"),
  );
  const sources = Array.isArray(stored.sources) ? stored.sources : [];
  const now = new Date();
  const dayStart = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const publishedToday = existingPosts.filter(
    (post) => post.indexable && Date.parse(post.publishedAt) >= dayStart,
  ).length;
  if (publishedToday >= maxDailyArticles) {
    log("SKIP", `Daily publication limit reached (${maxDailyArticles}).`);
    return;
  }

  const allItems = await discover(sources);
  const groups = findCandidateGroups(allItems);
  if (!groups.length) {
    log("SKIP", "No fresh, business-relevant topic has two independent source domains.");
    return;
  }
  const approvedHosts = (process.env.NEWS_ALLOWED_IMAGE_HOSTS || "")
    .split(",")
    .map((host) => host.trim())
    .filter(Boolean);
  const prerequisites = publicationPrerequisiteErrors({
    apiKey: process.env.OPENROUTER_API_KEY,
    approvedImageHosts: approvedHosts,
    sourceGroup: groups[0],
  });
  if (prerequisites.length) {
    prerequisites.forEach((reason) => log("SKIP", reason));
    return;
  }
  let published;
  let draftAttempts = 0;
  for (const group of groups) {
    if (isDuplicateSourceStory(group, [...existingPosts, ...(editorial.posts ?? [])])) {
      log("SKIP", `Already covered in the stored archive: ${group[0].title}`);
      continue;
    }
    const imageEntry = group.find(
      (item) => item.image && imageHasApprovedRights(item.image, approvedHosts),
    );
    if (!imageEntry) {
      log("SKIP", `No licensed image on an approved host for: ${group[0].title}`);
      continue;
    }
    if (draftAttempts >= 3) {
      log("SKIP", "Stopped after three model draft attempts in this run.");
      break;
    }
    draftAttempts += 1;
    try {
      const raw = await draftArticle(group, [...existingPosts, ...(editorial.posts ?? [])]);
      if (raw.reject) {
        log("SKIP", `${group[0].title}: ${raw.reject}`);
        continue;
      }
      const errors = validateDraft(raw, {
        sources: group,
        existingPosts: [...existingPosts, ...(editorial.posts ?? [])],
      });
      if (errors.length) {
        log("SKIP", `${group[0].title}: ${errors.join(" ")}`);
        continue;
      }
      if (relevanceScore(`${raw.title} ${raw.excerpt}`) < 1) {
        log(
          "SKIP",
          `${group[0].title}: generated draft no longer matches a supported service topic.`,
        );
        continue;
      }
      const primary = group[0];
      const id = createHash("sha256")
        .update(
          group
            .map((item) => item.url)
            .sort()
            .join("\n"),
        )
        .digest("hex")
        .slice(0, 12);
      const post = {
        ...raw,
        id,
        slug: `${slugify(raw.title)}-${id}`,
        source: primary.source,
        url: primary.url,
        image: imageEntry.image,
        imageAlt: raw.title,
        publishedAt: now.toISOString(),
        updatedAt: now.toISOString(),
        author: "AiTouchSolutions Editorial",
        cta: chooseServiceLink(raw),
        readingTime: Math.max(3, Math.ceil(JSON.stringify(raw.content).split(/\s+/).length / 190)),
        contentType: "news",
        indexable: true,
      };
      published = post;
      break;
    } catch (error) {
      log("SKIP", `${group[0].title}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  if (!published) {
    log("SKIP", "No candidate passed all content, evidence, duplicate, and image checks.");
    return;
  }

  const posts = existingPosts.map((post) => ({ ...post, indexable: false }));
  posts.unshift(published);
  const output = { ...stored, generatedAt: now.toISOString(), posts };
  const xml = await readFile(sitemapPath, "utf8");
  const nextSitemap = buildSitemap(xml, [...(editorial.posts ?? []), ...posts], now.toISOString());
  await mkdir(path.dirname(publicNewsPath), { recursive: true });
  await writeFile(newsPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  await writeFile(publicNewsPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  await writeFile(sitemapPath, nextSitemap, "utf8");
  log("PUBLISHED", `${published.title} -> /blog/${published.slug}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    log("ERROR", error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
