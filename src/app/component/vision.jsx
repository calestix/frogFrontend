import React from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { getDictionary } from "../lib/dictionary";

function Vision() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
  const lang = dict.aboutpage[0];

  return (
    <div className="py-16 px-5 md:px-20 space-y-24 bg-gray-50">
      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Image with diagonal clip-path */}
        <div className="group relative w-full h-[300px] md:h-[400px] overflow-hidden">
          <div className="w-full h-full diagonal-clip overflow-hidden">
            <Image
              src="/mision.jpg"
              alt="Our Mission"
              fill
              className="object-cover transform group-hover:scale-105 transition duration-700 ease-in-out"
            />
          </div>
        </div>

        {/* Text */}
        <div className="text-center md:text-left">
          <h3 className="text-4xl heading">{lang.mission?.title}</h3>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">{lang.mission?.paragraph}</p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center md:flex-row-reverse">
        {/* Text */}
        <div className="text-center md:text-left">
          <h3 className="text-4xl heading">{lang.vision?.title}</h3>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">{lang.vision?.paragraph}</p>
        </div>

        {/* Image with diagonal clip-path */}
        <div className="group relative w-full h-[300px] md:h-[400px] overflow-hidden">
          <div className="w-full h-full diagonal-clip overflow-hidden">
            <Image
              src="/vision.jpg"
              alt="Our Vision"
              fill
              className="object-cover transform group-hover:scale-105 transition duration-700 ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vision;
