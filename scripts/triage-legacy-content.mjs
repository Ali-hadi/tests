import { readFile, writeFile } from "node:fs/promises";

const siteUrl = "https://aitouchsolutions.com";
const news = JSON.parse(await readFile("src/data/news.json", "utf8"));
const editorial = JSON.parse(await readFile("src/data/editorial-posts.json", "utf8"));
const previousSitemap = await readFile("public/sitemap.xml", "utf8");
const posts = (news.posts ?? []).map((post) => {
  const archived = { ...post, indexable: false, keyTakeaways: [], content: [] };
  delete archived.faq;
  delete archived.cta;
  return archived;
});
const staticRoutes = [
  ...previousSitemap.matchAll(/<loc>(https:\/\/aitouchsolutions\.com[^<]+)<\/loc>/g),
]
  .map(([, url]) => url.replace(siteUrl, ""))
  .filter(
    (url) =>
      url !== "/portfolio" &&
      !url.startsWith("/blog/") &&
      !url.includes("?") &&
      !url.endsWith(".xml"),
  );
if (!staticRoutes.includes("/what-we-build")) staticRoutes.push("/what-we-build");
const blogRoutes = [...(editorial.posts ?? [])]
  .filter((post) => post.indexable !== false)
  .map((post) => `/blog/${post.slug}`);
const urls = [...new Set([...staticRoutes, ...blogRoutes])];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${siteUrl}${url}</loc></url>`).join("\n")}\n</urlset>\n`;
const json = `${JSON.stringify({ ...news, posts }, null, 2)}\n`;
await writeFile("src/data/news.json", json, "utf8");
await writeFile("public/data/news.json", json, "utf8");
await writeFile("public/sitemap.xml", sitemap, "utf8");
console.log(
  `Archived ${posts.length} legacy RSS pages as noindex and removed them from the sitemap.`,
);
console.log(`Sitemap now includes ${urls.length} static/editorial URLs.`);
