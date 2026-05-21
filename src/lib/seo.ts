const SITE_URL = "https://aitouchsolutions.com";
const SITE_NAME = "AItouchSolutions";
const AUTHOR_NAME = "Shahzad Nazar";
const CONTACT_EMAIL = "shahzad.mern.dev@gmail.com";
const WHATSAPP_DISPLAY = "03244958672";
const WHATSAPP_INTERNATIONAL = "+923244958672";
const WHATSAPP_URL = "https://wa.me/923244958672";
const DEFAULT_IMAGE = "/og-image.jpg";
const FOUNDER_IMAGE = "/founder.jpg";

const baseKeywords = [
  "AItouchSolutions",
  "Shahzad Nazar",
  "AI software company",
  "AI agent development",
  "workflow automation",
  "custom software development",
  "SaaS development",
  "web application development",
  "mobile app development",
  "MERN developer",
];

export const siteConfig = {
  name: SITE_NAME,
  url: SITE_URL,
  author: AUTHOR_NAME,
  email: CONTACT_EMAIL,
  whatsappDisplay: WHATSAPP_DISPLAY,
  whatsappInternational: WHATSAPP_INTERNATIONAL,
  whatsappUrl: WHATSAPP_URL,
  defaultImage: DEFAULT_IMAGE,
  founderImage: FOUNDER_IMAGE,
  defaultTitle: "AItouchSolutions | AI Software, Web Apps & Automation",
  defaultDescription:
    "AItouchSolutions builds AI agents, automation systems, custom SaaS, web apps, mobile apps, and scalable digital products for global clients. Founded by Shahzad Nazar.",
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
      { property: "og:locale", content: "en_US" },
      { property: "og:type", content: type },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:image", content: imageUrl },
      { property: "og:image:alt", content: `${SITE_NAME} AI software and automation services` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
    ],
    links: [{ rel: "canonical", href: canonical }],
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
        itemListElement: [
          "AI Agent Development",
          "AI Automation",
          "Custom SaaS Development",
          "Web Application Development",
          "Mobile App Development",
          "CRM and ERP Systems",
          "Cloud and DevOps",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
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
