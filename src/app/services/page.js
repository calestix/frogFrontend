"use client";
import Image from "next/image";
import Navbar from "../component/navbar/nav";
import Footer from "../component/footer/footer";
import { getDictionary } from "../lib/dictionary";
import { useLanguage } from "../context/LanguageContext";
import { useRouter } from "next/navigation";

export default function Services() {
  const navigate = useRouter();
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
  const lang = dict.servicespage;
  const text = dict;
  return (
    <>

      <Navbar />
      <div className="py-20 px-6 md:px-20 text-white">
        <h1 className="text-4xl text-black font-bold text-center mb-12 mt-6">
          {text.ourServices}
        </h1>
        {lang.map((category, i) => (
          <div key={i} className="mb-20">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-black mb-2">
                {category.title}
              </h2>
              <p className="">{category.description}</p>
            </div>

            <div className="mb-6">
              <Image
                src={category.categoryImage}
                alt={category.title}
                width={1200}
                height={500}
                className="w-full h-[300px] object-cover rounded-xl shadow-md"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
              {category.services.map((service, j) => (
                <div
                  key={j}
                  className="border rounded-lg p-4 transition duration-300 ease-in-out transform shadow-lg hover:scale-105"
                >
                  <h3 className="text-lg font-medium">{service}</h3>
                </div>
              ))}
            </div>
            <button
              className="mainButton mt-5"
              onClick={() => navigate.push("/contact-us")}
            >
              {text.contact_us}
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
