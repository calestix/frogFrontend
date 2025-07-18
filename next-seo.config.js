// next-seo.config.js

const SEO = {
  title: "Forgetc",
  titleTemplate: "%s | Forgetc",
  defaultTitle: "Forgetc",
  description:
    "Forgetc is a Saudi Arabia-based company offering expert services in construction, metal repair, welding, and civil engineering. Trusted by clients across the Kingdom.",
  canonical: "https://forgetc.com/",
  openGraph: {
    type: "website",
    url: "https://forgetc.com/",
    title: "Forgetc",
    description:
      "Professional construction, welding, and repair services in Saudi Arabia. Residential, commercial, and government projects by Forgetc.",
    images: [
      {
        url: "https://forgetc.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Forgetc - Saudi Arabia",
      },
    ],
    siteName: "Forgetc",
    profile: {
      firstName: "Forge",
      lastName: "Construction",
    },
  },
  twitter: {
    handle: "@forgeats3",
    site: "@forgeats3",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "construction Saudi Arabia, welding service, repair, building, residential construction, government construction, mobile welding, Forge Trading",
    },
    {
      name: "author",
      content: "Forgetc",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
};

export default SEO;
