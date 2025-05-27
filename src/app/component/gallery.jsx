import React from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { getDictionary } from "../lib/dictionary";

function Gallery() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
  const lang = dict;

  const images = [
    { src: "/gallery/img1.jpg", className: "img1" },
    { src: "/gallery/img2.jpg", className: "img2" },
    { src: "/gallery/img3.jpg", className: "img3" },
    { src: "/gallery/img4.jpg", className: "img4" },
    { src: "/gallery/img5.jpg", className: "img5" },
    { src: "/gallery/img6.jpg", className: "img6" },
    { src: "/gallery/img7.jpg", className: "img7" },
  ];

  return (
    <div className="text-center py-16 px-4 md:px-20 gallery">
       <div className='flex justify-center'>
        <h3 className='heading'>{lang.gallery}</h3>
        </div>
      
       <div className="gallery-grid py-6">
        {images.map((image, index) => (
          <div key={index} className={image.className}>
            <Image
              src={image.src}
              alt={`Gallery ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
