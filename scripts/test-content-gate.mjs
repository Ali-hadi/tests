import assert from "node:assert/strict";
import {
  findCandidateGroups,
  imageHasApprovedRights,
  isDuplicateSourceStory,
  publicationPrerequisiteErrors,
  relevanceScore,
  validateDraft,
} from "./content-gate.mjs";
import { discover, parseFeed } from "./publish-content.mjs";

const parsed = parseFeed(
  `<rss><channel><item><title>OpenAI AI assistant update</title><link>https://openai.com/news/assistant</link><pubDate>Tue, 24 Sep 2026 08:00:00 GMT</pubDate><description>A new AI assistant changes how software teams can review work.</description><enclosure url="https://images.example.org/assistant.jpg" type="image/jpeg" /></item></channel></rss>`,
  { name: "OpenAI News" },
);
assert.equal(parsed.length, 1);
assert.equal(parsed[0].image, "https://images.example.org/assistant.jpg");
assert.equal(
  parseFeed(
    `<rss><item><title>Invalid date</title><link>https://example.org/a</link><description>description</description></item></rss>`,
    { name: "broken" },
  ).length,
  0,
);
const originalFetch = globalThis.fetch;
globalThis.fetch = async () => {
  throw new Error("simulated feed outage");
};
assert.deepEqual(
  await discover([{ name: "Offline feed", feedUrl: "https://offline.example/rss" }]),
  [],
);
globalThis.fetch = originalFetch;

assert.ok(relevanceScore("A startup launches a RAG chatbot for customer support") > 0);
assert.equal(relevanceScore("A celebrity announces a movie tour"), 0);
assert.equal(
  imageHasApprovedRights("https://images.example.org/story.jpg", ["images.example.org"]),
  true,
);
assert.equal(
  imageHasApprovedRights("https://images.example.org.evil.test/story.jpg", ["images.example.org"]),
  false,
);
assert.ok(
  publicationPrerequisiteErrors({ apiKey: "", approvedImageHosts: [], sourceGroup: [] }).some(
    (error) => error.includes("OPENROUTER_API_KEY"),
  ),
);
assert.ok(
  publicationPrerequisiteErrors({
    apiKey: "key",
    approvedImageHosts: ["images.example.org"],
    sourceGroup: [{ url: "https://news-one.example/a" }],
  }).some((error) => error.includes("two independent")),
);
assert.ok(
  publicationPrerequisiteErrors({
    apiKey: "key",
    approvedImageHosts: ["images.example.org"],
    sourceGroup: [
      { url: "https://www.news-one.example/a" },
      { url: "https://blog.news-one.example/b" },
    ],
  }).some((error) => error.includes("two independent")),
);

const group = findCandidateGroups([
  {
    title: "OpenAI releases a new AI coding assistant",
    excerpt: "A new coding assistant adds AI tools for software developers.",
    url: "https://news-one.example/a",
    publishedAt: "2026-09-24T08:00:00.000Z",
  },
  {
    title: "OpenAI launches AI coding assistant for developers",
    excerpt: "The coding assistant brings new software development tools.",
    url: "https://news-two.example/b",
    publishedAt: "2026-09-24T08:05:00.000Z",
  },
  {
    title: "Actor announces an international movie tour",
    excerpt: "The upcoming film tour visits several cities.",
    url: "https://culture.example/c",
    publishedAt: "2026-09-24T08:05:00.000Z",
  },
]);
assert.equal(group.length, 1);
assert.equal(group[0].length, 2);
assert.equal(
  isDuplicateSourceStory(group[0], [
    { title: "Earlier duplicate story", url: "https://news-one.example/a" },
  ]),
  true,
);

const sourceEntries = [
  { name: "News One", url: "https://news-one.example/a" },
  { name: "News Two", url: "https://news-two.example/b" },
];
const paragraph =
  "The release gives engineering teams another option for testing code suggestions inside existing development workflows and tools.";
const validDraft = {
  title: "How the new coding assistant changes software development work",
  seoTitle: "AI Coding Assistant for Software Teams | AiTouchSolutions",
  metaDescription:
    "A review of the new coding assistant, its reported capabilities, and questions software teams should consider before adoption.",
  excerpt:
    "Two independent reports describe a new coding assistant for developers. Here is what teams can verify and assess before trying it.",
  focusKeyword: "AI coding assistant",
  searchIntent: "Informational and commercial research",
  category: "IT",
  tags: ["AI coding", "software development"],
  keyTakeaways: [
    "Engineering teams should compare the new workflow against their current tools.",
    "Source reporting identifies several features, but teams should verify availability before adoption.",
    "A small evaluation can reveal integration and review requirements before wider use.",
  ],
  supportingSources: sourceEntries,
  content: Array.from({ length: 5 }, (_, index) => ({
    heading: `Section ${index + 1}`,
    body: Array(5).fill(`${paragraph} Section detail ${index + 1}.`),
  })),
};
assert.deepEqual(validateDraft(validDraft, { sources: sourceEntries }), []);
assert.ok(
  validateDraft(validDraft, {
    sources: sourceEntries,
    existingPosts: [{ title: validDraft.title, content: validDraft.content, indexable: true }],
  }).some((error) => error.includes("duplicates")),
);
assert.ok(
  validateDraft(
    { ...validDraft, supportingSources: [sourceEntries[0]] },
    { sources: sourceEntries },
  ).some((error) => error.includes("two independent")),
);
assert.ok(
  validateDraft(
    {
      ...validDraft,
      content: [{ heading: "Overview", body: ["This brief is stored as JSON..."] }],
    },
    { sources: sourceEntries },
  ).length > 0,
);
assert.equal(
  findCandidateGroups([
    {
      title: "Unrelated celebrity news",
      excerpt: "A movie premiere and tour schedule.",
      url: "https://news-one.example/x",
      publishedAt: "2026-09-24T08:00:00.000Z",
    },
    {
      title: "Unrelated celebrity news",
      excerpt: "A film release event.",
      url: "https://news-two.example/y",
      publishedAt: "2026-09-24T08:05:00.000Z",
    },
  ]).length,
  0,
);
assert.equal(
  findCandidateGroups([
    {
      title: "OpenAI new AI coding tool",
      excerpt: "AI coding for developers.",
      url: "https://news-one.example/x",
      publishedAt: "2026-09-24T08:00:00.000Z",
    },
  ]).length,
  0,
);
console.log("Content quality gate checks passed.");
