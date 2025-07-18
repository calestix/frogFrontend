// app/layout.tsx
import "./globals.css";
import { AuthProvider } from "./context/auth.context";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Forge",
  description:
    "Forgetc - Saudi Arabia's trusted construction & repair services partner.",
  keywords: [
    "Forge",
    "construction",
    "Saudi Arabia",
    "welding",
    "tank repair",
    "building",
    "maintenance",
    "infrastructure",
    "trading",
  ],
  authors: [{ name: "FORGE T&C EST" }],
  openGraph: {
    title: "Forgetc",
    description:
      "Explore our full-service construction and metal repair expertise in Saudi Arabia.",
    url: "https://forgetc.com/",
    images: [
      {
        url: "https://forgetc.com/images/logo.png",
        width: 800,
        height: 600,
        alt: "Forge Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forgetc",
    description:
      "Explore our full-service construction and metal repair expertise in Saudi Arabia.",
    images: ["https://forgetc.com/images/logo.png"],
  },
  metadataBase: new URL("https://forgetc.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Ancizar+Sans:ital,wght@0,100..1000;1,100..1000&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Forgetc",
              url: "https://forgetc.com/",
              logo: "https://forgetc.com/images/logo.png",
              sameAs: [
                "https://www.facebook.com/profile.php?id=61577260822002",
                "https://x.com/forgeats3",
                "https://www.instagram.com/forge3ats/",
                "https://www.youtube.com/channel/UCLPjviwQ5oezkKbYGYvnBjg",
              ],
            }),
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
