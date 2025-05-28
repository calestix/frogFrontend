"use client";

import { useLanguage } from "../../context/LanguageContext";
import { getDictionary } from "../../lib/dictionary";

export default function Banner() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
  const banner = dict.banner;
  const lang = dict;
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        src="/home2.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0" />
      <div className="relative z-0 flex flex-col items-center justify-center h-full px-4">
        <h1 className="text-white md:text-5xl text-3xl font-bold text-center leading-tight">
          {banner.title}
        </h1>
        <h2 className="text-white md:text-5xl text-3xl pt-2 font-bold text-center leading-tight">
          {banner.subtitle}
        </h2>
        <button className="mainButton mt-5">{lang.contact_us}</button>
      </div>
    </section>
  );
}
