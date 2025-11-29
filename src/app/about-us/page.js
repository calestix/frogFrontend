"use client";
import Image from "next/image";
import Navbar from "../component/navbar/nav";
import Footer from "../component/footer/footer";
import { useLanguage } from "../context/LanguageContext";
import { getDictionary } from "../lib/dictionary";
import { useState } from "react";



export default function AboutUs() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
  const content = dict.aboutpage;
  const [openPDF, setOpenPDF] = useState(false);
  return (
    <>
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
                src="/about1.jpg"
                alt="About Us"
                width={600}
                height={400}
                className="rounded-xl shadow-lg object-cover w-full"
              />
            </div>
          </div>

          {/* Mission */}
          <div className="sm:flex gap-5">
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
            <div className="border-1 border-dashed p-4 sm:mt-0 mt-4">
              <h3 className="text-2xl font-semibold mb-2">
                {content[0].vision.title}
              </h3>
              <p>{content[0].vision.paragraph}</p>
            </div>
          </div>


          {/* CEO Section */}
          <div className={`flex flex-col md:flex-row gap-10 items-center`}>
            <div className="flex-1">
              <Image
                src="/ceoimg.jpg"
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
        
<section className="text-black py-20 px-6 md:px-20">
  <div className="max-w-6xl mx-auto space-y-8">
    <h2 className="text-3xl font-bold mb-6 text-center">{content[0].certificate.certificates}</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Card */}
      <a
        href="/certificate1.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white border border-gray-200 rounded-xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        <img
          src="/certificate1.png"
          alt="certificate preview"
          className="w-full h-48 object-cover object-top"
        />
        <div className="p-4">
          <h4 className="text-lg font-semibold">{content[0].certificate.vat}</h4>
          <p className="text-gray-600 text-sm mt-1">{content[0].certificate.view}</p>
        </div>
      </a>
    </div>
  </div>
</section>



      </section>  
      <Footer />
    </>
  );
}
