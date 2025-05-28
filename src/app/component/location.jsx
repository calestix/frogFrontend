import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { getDictionary } from "../lib/dictionary";

function Location() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
  const lang = dict;
  return (
    <div className="text-center py-18 md:px-20 mx-5">
      <div className="flex justify-center">
        <h3 className="heading">{lang.location}</h3>
      </div>
       <div className="w-full h-[450px] overflow-hidden rounded-lg pt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4973365.094249646!2d51.30527990205757!3d22.47948589960076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1748349413888!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>{" "}
      </div>
    </div>
  );
}

export default Location;
