import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { getDictionary } from "../lib/dictionary";
import Image from "next/image";
import { useRouter } from "next/navigation";

function OurServices() {
  const { locale } = useLanguage();
  const navigate=useRouter()
  const dict = getDictionary(locale);
  const lang = dict;
  const text = dict.OurServicesDes;

  // const data = [
  //   {
  //     title: "Building & Structural Construction",
  //     categoryImage: "/services/img1.jpg",
  //   },
  //   {
  //     title: "Renovation & Remodeling",
  //     categoryImage: "/services/img5.jpg",
  //   },
  //   {
  //     title: "Electrical Installation & Systems",
  //     categoryImage: "/services/img2.jpg",
  //   },
  //   {
  //     title: "Mechanical & HVAC Services",
  //     categoryImage: "/services/img6.jpg",
  //   },
  //   {
  //     title: "Plumbing & Gas Systems",
  //     categoryImage: "/services/img7.jpg",
  //   },
  //   {
  //     title: "Solar & Renewable Energy Solutions",
  //     categoryImage: "/services/img8.jpg",
  //   },
  //   {
  //     title: "Interior Fit-Out & Finishing",
  //     categoryImage: "/services/img3.jpg",
  //   },
  //   {
  //     title: "Specialty Interior Solutions",
  //     categoryImage: "/services/img9.jpg",
  //   },
  //   {
  //     title: "Maintenance & Repairs",
  //     categoryImage: "/services/img4.jpg",
  //   },
  //   {
  //     title: "Waterproofing & Protective Coatings",
  //     categoryImage: "/services/img10.jpg",
  //   },
  // ];
  return (
    <div className="text-center py-18 md:px-20 px-5">
      <div className="flex justify-center">
        <h3 className="heading">{lang.ourServices}</h3>
      </div>
      {/* <div className="text-start text-white">
        <p className=" pt-6 text-white">{text.para}</p>
        <h5 className="pt-4 bold text-xl underline">{text.head1}</h5>
        <ul className="py-6">
          {text.list.map((item, index) => (
            <li className="py-2" key={index}>{item}</li>
          ))}
        </ul>
        <p>{text.footP}</p>
      </div> */}
      <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {text?.data?.map((item, index) => (
          <div
            key={index}
            onClick={()=>navigate.push("/services")}
            className="bg-white cursor-pointer shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl group"
          >
            <div className="w-full h-48 relative">
              <Image
                src={item.categoryImage}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-medium text-gray-800 relative inline-block after:content-[''] after:block after:w-0 after:h-[2px] after:bg-gray-800 after:transition-all after:duration-300 group-hover:after:w-full">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
}

export default OurServices;
