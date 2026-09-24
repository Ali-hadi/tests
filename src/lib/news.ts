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
  indexable: boolean;
  supportingSources?: { name: string; url: string }[];
  image: string;
  imageAlt?: string;
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
    excerpt: sentence(raw.excerpt ?? raw.title ?? "A technology update from AiTouchSolutions."),
    source: cleanText(raw.source ?? "AiTouchSolutions"),
    category,
    publishedAt: raw.publishedAt ?? new Date(0).toISOString(),
    updatedAt: raw.updatedAt,
    url: raw.url,
    image: raw.image || fallbackImage,
    imageAlt: cleanText(raw.imageAlt ?? raw.title ?? "AiTouchSolutions article image"),
    indexable: raw.indexable === true || (raw.indexable !== false && raw.contentType === "pillar"),
    supportingSources: Array.isArray(raw.supportingSources)
      ? raw.supportingSources.filter(
          (source): source is { name: string; url: string } =>
            !!source && typeof source.name === "string" && typeof source.url === "string",
        )
      : [],
    tags: tags.length > 0 ? tags : [category],
    author: cleanText(raw.author ?? "AiTouchSolutions Editorial"),
  };
  const content = Array.isArray(raw.content)
    ? raw.content
        .map(normalizeSection)
        .filter((section): section is NewsArticleSection => Boolean(section))
    : [];
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
    keyTakeaways,
    content,
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

export const indexableNewsPosts = newsPosts.filter((post) => post.indexable);

// Source-attributed feed briefs stay visible to readers, while only reviewed
// editorial posts are indexable and eligible for the sitemap.
export const visibleNewsPosts = newsPosts.filter(
  (post) => post.indexable || (post.contentType === "news" && Boolean(post.url && post.excerpt)),
);

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
    .filter((item) => item.indexable && item.id !== post.id)
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
