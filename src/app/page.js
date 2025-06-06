"use client"
import Navbar from "./component/navbar/nav";
import Footer from "./component/footer/footer";
import Banner from "./component/banner/banner";
import Overview from "./component/overview.js";
import OurServices from "./component/our-services";
import Gallery from "./component/gallery";
import Location from "./component/location";
import Vision from "./component/vision"

export default function Home() {
  return (
    <>
    <head>
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
          <Navbar />
          <Banner/>
          <Overview/>
          <Vision/>
          <OurServices/>
          <Gallery/>
          <Location/>
          <Footer />
    </>
  );
}
