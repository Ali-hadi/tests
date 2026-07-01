import newsData from "@/data/news.json";
import editorialData from "@/data/editorial-posts.json";

export type NewsCategory = "AI" | "IT";

export type NewsArticleTable = {
  columns: string[];
  rows: string[][];
};

export type NewsArticleSubsection = {
  heading: string;
  body?: string[];
  items?: string[];
  ordered?: boolean;
};

export type NewsArticleSection = {
  heading: string;
  body?: string[];
  items?: string[];
  ordered?: boolean;
  subsections?: NewsArticleSubsection[];
  table?: NewsArticleTable;
};

export type NewsFaq = {
  question: string;
  answer: string;
};

export type NewsCta = {
  text: string;
  label: string;
  href: string;
};

export type NewsPost = {
  id: string;
  slug: string;
  title: string;
  seoTitle?: string;
  metaDescription?: string;
  excerpt: string;
  source: string;
  category: NewsCategory;
  publishedAt: string;
  updatedAt?: string;
  url?: string;
  image: string;
  tags: string[];
  focusKeyword?: string;
  secondaryKeywords?: string[];
  longTailKeywords?: string[];
  searchIntent?: string;
  contentType?: "news" | "pillar";
  author: string;
  readingTime: number;
  keyTakeaways: string[];
  content: NewsArticleSection[];
  faq?: NewsFaq[];
  cta?: NewsCta;
};

export type NewsSource = {
  name: string;
  source?: string;
  category: NewsCategory;
  url: string;
  feedUrl?: string;
};

const fallbackImage = "/og-image.jpg";

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

function cleanText(value = "") {
  return value.replace(/\s+/g, " ").trim();
}

function sentence(value = "") {
  const text = cleanText(value);
  if (!text) return "";
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => cleanText(String(item))).filter(Boolean);
}

function postSlug(post: { id: string; slug?: string; title: string }) {
  return post.slug || `${slugify(post.title)}-${post.id}`;
}

function defaultSections(post: {
  title: string;
  excerpt: string;
  source: string;
  category: NewsCategory;
  tags: string[];
}) {
  const topic = post.tags.length > 0 ? post.tags.slice(0, 4).join(", ") : post.category;
  const categoryContext =
    post.category === "AI"
      ? "AI adoption is moving from experiments into practical systems, so timing, trust, infrastructure, and governance matter."
      : "IT teams are balancing modernization with reliability, security, cost, and user experience.";

  return [
    {
      heading: "Overview",
      body: [
        sentence(post.excerpt),
        "This brief is stored locally in JSON with article metadata, image, tags, and an internal detail URL.",
      ],
    },
    {
      heading: "Why It Matters",
      body: [
        categoryContext,
        `The important signal is how ${topic} affects real product, automation, infrastructure, and customer-facing decisions.`,
      ],
    },
    {
      heading: "AItouchSolutions Take",
      body: [
        `Treat this ${post.source} story as a planning signal, then validate the impact with a focused workflow or pilot.`,
      ],
    },
  ];
}

function estimateReadTime(post: Pick<NewsPost, "title" | "excerpt" | "keyTakeaways" | "content">) {
  function sectionText(section: NewsArticleSection): string[] {
    return [
      section.heading,
      ...(section.body ?? []),
      ...(section.items ?? []),
      ...(section.table ? [section.table.columns.join(" "), ...section.table.rows.flat()] : []),
      ...(section.subsections ?? []).flatMap((subsection) => [
        subsection.heading,
        ...(subsection.body ?? []),
        ...(subsection.items ?? []),
      ]),
    ];
  }

  const words = [
    post.title,
    post.excerpt,
    ...post.keyTakeaways,
    ...post.content.flatMap(sectionText),
  ]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(2, Math.ceil(words / 190));
}

function normalizeTable(value: unknown): NewsArticleTable | undefined {
  if (!value || typeof value !== "object") return undefined;
  const item = value as { columns?: unknown; rows?: unknown };
  const columns = toStringArray(item.columns);
  const rows = Array.isArray(item.rows)
    ? item.rows
        .map((row) => toStringArray(row))
        .filter((row) => row.length > 0)
        .map((row) => columns.map((_, index) => row[index] ?? ""))
    : [];

  if (columns.length === 0 || rows.length === 0) return undefined;
  return { columns, rows };
}

function normalizeSubsection(section: unknown): NewsArticleSubsection | null {
  if (!section || typeof section !== "object") return null;
  const item = section as { heading?: unknown; body?: unknown; items?: unknown; ordered?: unknown };
  const heading = cleanText(String(item.heading ?? ""));
  const body = toStringArray(item.body);
  const items = toStringArray(item.items);

  if (!heading || (body.length === 0 && items.length === 0)) return null;

  return {
    heading,
    ...(body.length > 0 ? { body } : {}),
    ...(items.length > 0 ? { items } : {}),
    ...(item.ordered === true ? { ordered: true } : {}),
  };
}

function normalizeSection(section: unknown): NewsArticleSection | null {
  if (!section || typeof section !== "object") return null;
  const item = section as {
    heading?: unknown;
    body?: unknown;
    items?: unknown;
    ordered?: unknown;
    subsections?: unknown;
    table?: unknown;
  };
  const heading = cleanText(String(item.heading ?? ""));
  const body = toStringArray(item.body);
  const items = toStringArray(item.items);
  const subsections = Array.isArray(item.subsections)
    ? item.subsections
        .map(normalizeSubsection)
        .filter((subsection): subsection is NewsArticleSubsection => Boolean(subsection))
    : [];
  const table = normalizeTable(item.table);

  if (!heading || (body.length === 0 && items.length === 0 && subsections.length === 0 && !table)) {
    return null;
  }

  return {
    heading,
    ...(body.length > 0 ? { body } : {}),
    ...(items.length > 0 ? { items } : {}),
    ...(item.ordered === true ? { ordered: true } : {}),
    ...(subsections.length > 0 ? { subsections } : {}),
    ...(table ? { table } : {}),
  };
}

function normalizeFaq(value: unknown): NewsFaq[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const faq = item as { question?: unknown; answer?: unknown };
      const question = cleanText(String(faq.question ?? ""));
      const answer = cleanText(String(faq.answer ?? ""));
      return question && answer ? { question, answer } : null;
    })
    .filter((item): item is NewsFaq => Boolean(item));
}

function normalizeCta(value: unknown): NewsCta | undefined {
  if (!value || typeof value !== "object") return undefined;
  const item = value as { text?: unknown; label?: unknown; href?: unknown };
  const text = cleanText(String(item.text ?? ""));
  const label = cleanText(String(item.label ?? ""));
  const href = cleanText(String(item.href ?? ""));
  if (!text || !label || !href) return undefined;
  return { text, label, href };
}

function normalizePost(rawPost: unknown): NewsPost {
  const raw = rawPost as Partial<NewsPost>;
  const category: NewsCategory = raw.category === "AI" ? "AI" : "IT";
  const tags = toStringArray(raw.tags);
  const base = {
    id: cleanText(raw.id ?? ""),
    title: cleanText(raw.title ?? "Technology brief"),
    excerpt: sentence(raw.excerpt ?? raw.title ?? "A technology update from AItouchSolutions."),
    source: cleanText(raw.source ?? "AItouchSolutions"),
    category,
    publishedAt: raw.publishedAt ?? new Date(0).toISOString(),
    updatedAt: raw.updatedAt,
    url: raw.url,
    image: raw.image || fallbackImage,
    tags: tags.length > 0 ? tags : [category],
    author: cleanText(raw.author ?? "AItouchSolutions Editorial"),
  };
  const content =
    Array.isArray(raw.content) && raw.content.length > 0
      ? raw.content
          .map(normalizeSection)
          .filter((section): section is NewsArticleSection => Boolean(section))
      : defaultSections(base);
  const keyTakeaways = toStringArray(raw.keyTakeaways);
  const secondaryKeywords = toStringArray(raw.secondaryKeywords);
  const longTailKeywords = toStringArray(raw.longTailKeywords);
  const faq = normalizeFaq(raw.faq);
  const post = {
    ...base,
    slug: postSlug({ id: base.id, slug: raw.slug, title: base.title }),
    seoTitle: cleanText(raw.seoTitle ?? ""),
    metaDescription: sentence(raw.metaDescription ?? ""),
    focusKeyword: cleanText(raw.focusKeyword ?? ""),
    searchIntent: cleanText(raw.searchIntent ?? ""),
    secondaryKeywords,
    longTailKeywords,
    contentType: raw.contentType === "pillar" ? "pillar" : "news",
    keyTakeaways:
      keyTakeaways.length > 0
        ? keyTakeaways
        : [
            `${base.source} is tracking this as a ${base.category} signal.`,
            "The brief stays internal, so readers can review it without being redirected.",
          ],
    content: content.length > 0 ? content : defaultSections(base),
    faq: faq.length > 0 ? faq : undefined,
    cta: normalizeCta(raw.cta),
    readingTime: Number.isFinite(raw.readingTime) ? Number(raw.readingTime) : 0,
  };

  return {
    ...post,
    readingTime: post.readingTime || estimateReadTime(post),
  };
}

export const newsGeneratedAt = newsData.generatedAt as string | undefined;

export const newsPosts = [
  ...((editorialData as { posts?: unknown[] }).posts ?? []),
  ...(newsData.posts as unknown[]),
]
  .map(normalizePost)
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

export const newsSources = newsData.sources as NewsSource[];

export const newsCategoryCounts = newsPosts.reduce(
  (acc, post) => {
    acc[post.category] += 1;
    return acc;
  },
  { AI: 0, IT: 0 },
);

export function formatNewsDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function getNewsPost(slugOrId: string) {
  return newsPosts.find((post) => post.slug === slugOrId || post.id === slugOrId);
}

export function getNewsReadTime(post: NewsPost) {
  return post.readingTime || estimateReadTime(post);
}

export function getRelatedNewsPosts(post: NewsPost, limit = 3) {
  return newsPosts
    .filter((item) => item.id !== post.id)
    .map((item) => {
      const sharedTags = item.tags.filter((tag) => post.tags.includes(tag)).length;
      const categoryScore = item.category === post.category ? 2 : 0;
      return { item, score: sharedTags + categoryScore };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.item.publishedAt).getTime() - new Date(a.item.publishedAt).getTime(),
    )
    .map(({ item }) => item)
    .slice(0, limit);
}
