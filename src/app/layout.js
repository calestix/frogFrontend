import ClientLayout from "./ClientLayout";
import "./globals.css";
import { AuthProvider } from "./context/auth.context";

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Ancizar+Sans:ital,wght@0,100..1000;1,100..1000&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Ancizar+Sans:ital,wght@0,100..1000;1,100..1000&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />

        {/* SEO Meta Tags */}
        <meta
          name="description"
          content="FORGE Trading and Construction - Saudi Arabia's trusted construction & repair services partner."
        />
        <meta
          name="keywords"
          content="Forge, construction, Saudi Arabia, welding, tank repair, building, maintenance, infrastructure, trading"
        />
        <meta name="author" content="FORGE T&C EST" />
        <meta property="og:title" content="FORGE Trading and Construction" />
        <meta
          property="og:description"
          content="Explore our full-service construction and metal repair expertise in Saudi Arabia."
        />
        <meta
          property="og:image"
          content="https://forgetradingandconstruction.com/images/logo.png"
        />
        <meta
          property="og:url"
          content="https://forgetradingandconstruction.com/"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Forge</title>
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Forge Trading and Construction",
              url: "https://forgetradingandconstruction.com/",
              logo: "https://forgetradingandconstruction.com/images/logo.png",
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
