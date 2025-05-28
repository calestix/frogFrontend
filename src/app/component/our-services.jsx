import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { getDictionary } from "../lib/dictionary";

function OurServices() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
  const lang = dict;
  const text = dict.OurServicesDes;
  return (
    <div className="text-center py-18 md:px-20 px-5">
      <div className="flex justify-center">
        <h3 className="heading">{lang.ourServices}</h3>
      </div>
      <div className="text-start text-white">
        <p className=" pt-6 text-white">{text.para}</p>
        <h5 className="pt-4 bold text-xl underline">{text.head1}</h5>
        <ul className="py-6">
          {text.list.map((item, index) => (
            <li className="py-2" key={index}>{item}</li>
          ))}
        </ul>
        <p>{text.footP}</p>
      </div>
    </div>
  );
}

export default OurServices;
