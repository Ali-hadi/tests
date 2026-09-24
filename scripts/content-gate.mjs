const relevanceTerms = [
  "artificial intelligence",
  "generative ai",
  "ai agent",
  "agentic ai",
  "llm",
  "large language model",
  "openai",
  "chatgpt",
  "anthropic",
  "claude",
  "gemini",
  "chatbot",
  "rag",
  "retrieval augmented",
  "ai automation",
  "business automation",
  "workflow automation",
  "software development",
  "software engineering",
  "web application",
  "mobile app",
  "react native",
  "next.js",
  "node.js",
  "mern",
  "saas",
  "crm",
  "erp",
  "point of sale",
  "pos system",
  "e-commerce",
  "ecommerce",
  "shopify",
  "woocommerce",
  "wordpress",
  "cloud computing",
  "api",
  "cybersecurity",
  "developer tool",
  "programming",
  "machine learning",
  "computer vision",
  "voice ai",
];

const stopWords = new Set([
  "about",
  "after",
  "again",
  "also",
  "amid",
  "announces",
  "before",
  "being",
  "between",
  "could",
  "first",
  "from",
  "have",
  "into",
  "latest",
  "more",
  "new",
  "over",
  "says",
  "than",
  "that",
  "their",
  "there",
  "these",
  "this",
  "through",
  "today",
  "update",
  "using",
  "when",
  "where",
  "which",
  "while",
  "will",
  "with",
]);

export function relevanceScore(text = "") {
  const normalized = text.toLowerCase();
  return relevanceTerms.reduce((score, term) => score + (normalized.includes(term) ? 1 : 0), 0);
}

function hostOf(value) {
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function registrableDomain(value) {
  const host = hostOf(value)
    .replace(/^www\./, "")
    .split(".");
  if (host.length < 2) return host.join(".");
  const suffix = host.slice(-2).join(".");
  const twoPartSuffixes = new Set([
    "co.uk",
    "org.uk",
    "com.au",
    "net.au",
    "co.nz",
    "co.jp",
    "com.br",
    "com.pk",
  ]);
  return host.slice(twoPartSuffixes.has(suffix) ? -3 : -2).join(".");
}

export function imageHasApprovedRights(imageUrl, approvedHosts = []) {
  const host = hostOf(imageUrl);
  return Boolean(host && approvedHosts.map((item) => item.toLowerCase()).includes(host));
}

export function publicationPrerequisiteErrors({
  apiKey,
  approvedImageHosts = [],
  sourceGroup = [],
} = {}) {
  const errors = [];
  if (!apiKey?.trim()) errors.push("OPENROUTER_API_KEY is missing.");
  if (!Array.isArray(approvedImageHosts) || approvedImageHosts.length === 0)
    errors.push("No image reuse hosts are approved.");
  if (
    !Array.isArray(sourceGroup) ||
    new Set(sourceGroup.map((source) => registrableDomain(source.url)).filter(Boolean)).size < 2
  ) {
    errors.push("At least two independent source domains are required.");
  }
  return errors;
}

function words(value = "") {
  return new Set(
    value
      .toLowerCase()
      .replace(/https?:\/\/\S+/g, " ")
      .replace(/[^a-z0-9+#.]+/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2 && !stopWords.has(word)),
  );
}

function overlapRatio(left, right) {
  const a = words(left);
  const b = words(right);
  if (!a.size || !b.size) return 0;
  const common = [...a].filter((token) => b.has(token)).length;
  return common / Math.min(a.size, b.size);
}

export function findCandidateGroups(items) {
  const fresh = items
    .filter((item) => relevanceScore(`${item.title} ${item.excerpt}`) > 0)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
  const groups = [];
  const used = new Set();

  for (const item of fresh) {
    if (used.has(item.url)) continue;
    const group = [item];
    for (const candidate of fresh) {
      if (candidate === item || used.has(candidate.url)) continue;
      if (registrableDomain(candidate.url) === registrableDomain(item.url)) continue;
      const sameTopic =
        overlapRatio(`${item.title} ${item.excerpt}`, `${candidate.title} ${candidate.excerpt}`) >=
        0.32;
      if (sameTopic) group.push(candidate);
    }
    if (new Set(group.map((entry) => registrableDomain(entry.url))).size >= 2) {
      group.forEach((entry) => used.add(entry.url));
      groups.push(group);
    }
  }
  return groups;
}

export function isDuplicateArticle(draft, existingPosts = []) {
  const relevant = existingPosts.filter(
    (post) =>
      post.indexable === true || (post.indexable !== false && post.contentType === "pillar"),
  );
  const draftBody = [
    draft.title,
    ...(draft.content ?? []).flatMap((section) => [section.heading, ...(section.body ?? [])]),
  ].join(" ");
  return relevant.some((post) => {
    if (overlapRatio(draft.title ?? "", post.title ?? "") >= 0.72) return true;
    const oldBody = [
      post.title,
      ...(post.content ?? []).flatMap((section) => [section.heading, ...(section.body ?? [])]),
    ].join(" ");
    return overlapRatio(draftBody, oldBody) >= 0.58;
  });
}

export function isDuplicateSourceStory(sourceGroup, existingPosts = []) {
  const urls = new Set(sourceGroup.map((source) => source.url));
  const titles = sourceGroup.map((source) => source.title ?? "");
  return existingPosts.some((post) => {
    if (post.url && urls.has(post.url)) return true;
    return titles.some((title) => overlapRatio(title, post.title ?? "") >= 0.72);
  });
}

export function validateDraft(draft, { sources = [], existingPosts = [] } = {}) {
  const errors = [];
  if (!draft || typeof draft !== "object") return ["Draft must be a JSON object."];
  if (typeof draft.title !== "string" || draft.title.trim().length < 25 || draft.title.length > 100)
    errors.push("Title must be 25 to 100 characters.");
  if (
    typeof draft.seoTitle !== "string" ||
    draft.seoTitle.trim().length < 20 ||
    draft.seoTitle.length > 70
  )
    errors.push("SEO title must be 20 to 70 characters.");
  if (
    typeof draft.metaDescription !== "string" ||
    draft.metaDescription.trim().length < 50 ||
    draft.metaDescription.length > 180
  )
    errors.push("Meta description must be 50 to 180 characters.");
  if (
    typeof draft.excerpt !== "string" ||
    draft.excerpt.trim().length < 80 ||
    draft.excerpt.length > 280
  )
    errors.push("Excerpt must be 80 to 280 characters.");
  if (typeof draft.focusKeyword !== "string" || draft.focusKeyword.trim().length < 2)
    errors.push("A focused search topic is required.");
  if (typeof draft.searchIntent !== "string" || draft.searchIntent.trim().length < 5)
    errors.push("Search intent is required.");
  if (
    !Array.isArray(draft.tags) ||
    draft.tags.length < 1 ||
    draft.tags.length > 8 ||
    draft.tags.some((tag) => typeof tag !== "string" || tag.trim().length < 2)
  )
    errors.push("Article must have one to eight meaningful tags.");
  if (
    !Array.isArray(draft.keyTakeaways) ||
    draft.keyTakeaways.length < 3 ||
    draft.keyTakeaways.some((item) => typeof item !== "string" || item.trim().length < 30)
  )
    errors.push("Article needs three substantive key takeaways.");
  if (!Array.isArray(draft.content) || draft.content.length < 4)
    errors.push("Article needs at least four content sections.");
  if (
    Array.isArray(draft.content) &&
    draft.content.some(
      (section) =>
        typeof section?.heading !== "string" ||
        section.heading.trim().length < 4 ||
        !Array.isArray(section.body) ||
        section.body.length < 1,
    )
  )
    errors.push("Each section needs a useful heading and paragraphs.");
  const paragraphs = Array.isArray(draft.content)
    ? draft.content.flatMap((section) => section.body ?? [])
    : [];
  const wordCount = [draft.title, draft.excerpt, ...paragraphs]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  if (wordCount < 500) errors.push(`Article is too short (${wordCount} words; 500 required).`);
  if (paragraphs.some((item) => typeof item !== "string" || item.trim().length < 30))
    errors.push("Every article paragraph must contain substantive text.");
  const sourcesByUrl = new Map(sources.map((source) => [source.url, source]));
  if (!Array.isArray(draft.supportingSources) || draft.supportingSources.length < 2) {
    errors.push("At least two independent supporting sources are required.");
  } else {
    const hosts = new Set();
    for (const source of draft.supportingSources) {
      const approved = sourcesByUrl.get(source.url);
      if (!approved) errors.push("Supporting sources must come from discovered feed entries.");
      const host = registrableDomain(source.url);
      if (host) hosts.add(host);
    }
    if (hosts.size < 2) errors.push("Supporting sources must use at least two distinct domains.");
  }
  const flattened = [draft.title, draft.excerpt, ...paragraphs].join(" ").toLowerCase();
  if (
    /this (aitouchsolutions )?(brief|post) is (stored|rendered)|keeps? the brief internal|\.{3,}/.test(
      flattened,
    )
  ) {
    errors.push("Article contains filler, truncation, or template language.");
  }
  if (isDuplicateArticle(draft, existingPosts))
    errors.push("Article duplicates an existing indexed article.");
  return errors;
}
