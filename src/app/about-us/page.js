"use client";
import Image from "next/image";
import Navbar from "../component/navbar/nav";
import Footer from "../component/footer/footer";
import { useLanguage } from "../context/LanguageContext";
import { getDictionary } from "../lib/dictionary";

export default function AboutUs() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
  const content = dict.aboutpage;
  return (
    <>
      <head>
        <title>About Us - FORGE Trading and Construction</title>
        <meta
          name="description"
          content="Learn about Forge Trading and Construction, a leading construction company in Saudi Arabia."
        />
        <meta property="og:title" content="About Us - FORGE" />
        <meta
          property="og:description"
          content="Trusted construction and repair services in Saudi Arabia."
        />
      </head>
      <Navbar />
      <section className={`text-black py-20 mt-10 px-6 md:px-20`}>
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              {content[0].header.title}
            </h2>
            <p className="text-lg">{content[0].header.tagline}</p>
          </div>

          {/* Company Overview & Image */}
          <div className={`flex flex-col md:flex-row gap-10 items-center`}>
            <div className="flex-1 space-y-4">
              {content[0].overview.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="flex-1">
              <Image
                src="/aboutus.jpg"
                alt="About Us"
                width={600}
                height={400}
                className="rounded-xl shadow-lg object-cover w-full"
              />
            </div>
          </div>

          {/* Mission */}
          <div className="flex gap-5">
            <div className="border-1 border-dashed p-4 ">
              <h3 className="text-2xl font-semibold mb-2">
                {content[0].mission.title}
              </h3>
              <p>{content[0].mission.paragraph}</p>
              <ul className="list-disc pl-5 mt-4">
                {content[0]?.mission?.point?.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-gray-700 text-[16px] leading-relaxed">
                {content[0].mission?.endpara}
              </p>
            </div>

            {/* Vision */}
            <div className="border-1 border-dashed p-4 ">
              <h3 className="text-2xl font-semibold mb-2">
                {content[0].vision.title}
              </h3>
              <p>{content[0].vision.paragraph}</p>
            </div>
          </div>

          {/* Services */}
          {/* <div>
            <h3 className="text-2xl font-semibold mb-4">
              {content[0].services.title}
            </h3>
            <ul className="list-disc list-inside space-y-2">
              {content[0].services.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div> */}

          {/* CEO Section */}
          <div className={`flex flex-col md:flex-row gap-10 items-center`}>
            <div className="flex-1">
              <Image
                src="/ceo.jpg"
                alt="CEO"
                width={400}
                height={400}
                className="rounded-full object-cover shadow-md w-64 h-64 mx-auto md:mx-0"
              />
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-semibold">{content[0].ceo.title}</h3>
              <p>
                <strong>{content[0].ceo.name}</strong>
              </p>
              {content[0].ceo.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
