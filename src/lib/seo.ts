import { organicServiceKeywords, serviceLandingPages } from "@/lib/service-seo";

const SITE_URL = "https://aitouchsolutions.com";
const SITE_NAME = "AItouchSolutions";
const AUTHOR_NAME = "Jon";
const CONTACT_EMAIL = "shahzad.mern.dev@gmail.com";
const WHATSAPP_DISPLAY = "03244958672";
const WHATSAPP_INTERNATIONAL = "+923244958672";
const WHATSAPP_URL = "https://wa.me/923244958672";
const LINKEDIN_URL = "https://www.linkedin.com/in/ai-touch-solutions-91b727417";
const LINKEDIN_DISPLAY = "linkedin.com/in/ai-touch-solutions-91b727417";
const DEFAULT_IMAGE = "/og-image.jpg";
const FOUNDER_IMAGE = "/founder-jon.jpg";

const baseKeywords = [
  "AItouchSolutions",
  "Jon",
  "AI software company",
  "AI agent development",
  "workflow automation",
  "custom software development",
  "SaaS development",
  "web application development",
  "mobile app development",
  "MERN developer",
  ...organicServiceKeywords,
];

export const siteConfig = {
  name: SITE_NAME,
  url: SITE_URL,
  author: AUTHOR_NAME,
  email: CONTACT_EMAIL,
  whatsappDisplay: WHATSAPP_DISPLAY,
  whatsappInternational: WHATSAPP_INTERNATIONAL,
  whatsappUrl: WHATSAPP_URL,
  linkedinUrl: LINKEDIN_URL,
  linkedinDisplay: LINKEDIN_DISPLAY,
  defaultImage: DEFAULT_IMAGE,
  founderImage: FOUNDER_IMAGE,
  defaultTitle: "AItouchSolutions | AI Software, Web Apps & Automation",
  defaultDescription:
    "AItouchSolutions builds AI agents, automation systems, custom SaaS, web apps, mobile apps, and scalable digital products for global clients. Founded by Jon.",
  keywords: baseKeywords,
};

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createSeo({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  keywords = [],
  noIndex = false,
}: SeoOptions) {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const keywordContent = [...baseKeywords, ...keywords].join(", ");

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "author", content: AUTHOR_NAME },
      { name: "keywords", content: keywordContent },
      {
        name: "robots",
        content: noIndex
          ? "noindex,nofollow"
          : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      },
      {
        name: "googlebot",
        content: noIndex
          ? "noindex,nofollow"
          : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      },
      {
        name: "bingbot",
        content: noIndex
          ? "noindex,nofollow"
          : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:locale", content: "en_US" },
      { property: "og:type", content: type },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:image", content: imageUrl },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${SITE_NAME} AI software and automation services` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: `@${SITE_NAME}` },
      { name: "twitter:creator", content: AUTHOR_NAME },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
    ],
    links: [
      { rel: "canonical", href: canonical },
      { rel: "alternate", hrefLang: "en", href: canonical },
      { rel: "alternate", hrefLang: "x-default", href: canonical },
    ],
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: absoluteUrl("/logo-white.png"),
      image: absoluteUrl(DEFAULT_IMAGE),
      description: siteConfig.defaultDescription,
      founder: {
        "@type": "Person",
        name: AUTHOR_NAME,
        email: CONTACT_EMAIL,
        image: absoluteUrl(FOUNDER_IMAGE),
        url: absoluteUrl("/about"),
      },
      email: CONTACT_EMAIL,
      telephone: WHATSAPP_INTERNATIONAL,
      sameAs: [LINKEDIN_URL, WHATSAPP_URL],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: CONTACT_EMAIL,
          telephone: WHATSAPP_INTERNATIONAL,
          url: WHATSAPP_URL,
          availableLanguage: ["English", "Urdu"],
        },
      ],
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI and software development services",
        itemListElement: serviceLandingPages.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            url: absoluteUrl(`/services/${service.slug}`),
            description: service.summary,
            provider: { "@id": `${SITE_URL}/#organization` },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};
