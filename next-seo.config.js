// next-seo.config.js

const SEO = {
  title: "Forge Trading and Construction",
  titleTemplate: "%s | Forge Trading and Construction",
  defaultTitle: "Forge Trading and Construction",
  description:
    "Forge Trading and Construction is a Saudi Arabia-based company offering expert services in construction, metal repair, welding, and civil engineering. Trusted by clients across the Kingdom.",
  canonical: "https://forgetradingandconstruction.com/",
  openGraph: {
    type: "website",
    url: "https://forgetradingandconstruction.com/",
    title: "Forge Trading and Construction",
    description:
      "Professional construction, welding, and repair services in Saudi Arabia. Residential, commercial, and government projects by Forge Trading and Construction.",
    images: [
      {
        url: "https://forgetradingandconstruction.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Forge Trading and Construction - Saudi Arabia",
      },
    ],
    siteName: "Forge Trading and Construction",
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
      content: "Forge Trading and Construction",
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
