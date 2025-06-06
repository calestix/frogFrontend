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
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.1633790008304!2d46.79817697514969!3d24.78985847797546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2effd8ae7ab0d5%3A0x27d707469ca4567d!2zUkZCQjM2OTXYjCAzNjk1INi02LnYsdin2YbYjCA2OTUy2Iwg2K3ZiiDYp9i02KjZitmE2YrYqSwgUml5YWRoIDEzMjI2LCBTYXVkaSBBcmFiaWE!5e0!3m2!1sen!2sin!4v1749197549051!5m2!1sen!2sin"
          height="100%"
          width="100%"
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
