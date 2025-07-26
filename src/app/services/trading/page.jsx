"use client";
import Image from "next/image";
import Navbar from "../../component/navbar/nav";
import Footer from "../../component/footer/footer";
import { getDictionary } from "../../lib/dictionary";
import { useLanguage } from "../../context/LanguageContext";
import { useRouter } from "next/navigation";



export default function Services() {
  const navigate = useRouter();
  const { locale } = useLanguage();
  const dicts = getDictionary(locale);
  const dict = dicts.trading;
  const text = dict;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mt-8 tracking-tight sm:text-6xl">
            {dict.hero_section.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            {dict.hero_section.description}
          </p>
        </section>

        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-white shadow-lg rounded-lg p-8">
            {dict.introduction.description.map((paragraph, idx) => (
              <p key={idx} className="text-gray-700 mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Hand & Power Tools Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {dict.hand_power_tools.title}
          </h2>
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <Image
              src={dict.hand_power_tools.image}
              alt={dict.hand_power_tools.title}
              width={1200}
              height={500}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="mt-6">
            {dict.hand_power_tools.description.map((paragraph, idx) => (
              <p key={idx} className={`text-gray-700 ${idx > 0 ? "pt-3" : ""}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-16 space-y-16">
          {dict.categories.map((category, idx) => (
            <div key={idx} className="bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {category.title}
              </h2>
              <div className="relative rounded-xl overflow-hidden shadow-md mb-6">
                <Image
                  src={category.img}
                  alt={category.title}
                  width={1200}
                  height={500}
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.items.map((service, j) => (
                  <div
                    key={j}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition duration-300"
                  >
                    <h3 className="text-lg font-medium text-gray-800">
                      {service}
                    </h3>
                  </div>
                ))}
              </div>
              <button
                className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-700 transition duration-300"
                onClick={() => navigate.push("/contact-us")}
              >
                {dict.contact_us}
              </button>
            </div>
          ))}
        </section>

        {/* Pipes & Forged Bars Section */}
        <section className="bg-white shadow-lg mb-4 rounded-lg p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {dict.pipes_forged_bars.title}
          </h3>
          <div className="space-y-4">
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <strong>{locale === "en" ? "Materials:" : "المواد"}</strong> {dict.pipes_forged_bars.materials.join(", ")}
              </li>
              <li>
                <strong>{locale === "en" ? "Range:" : "النطاق"}</strong> {dict.pipes_forged_bars.range}
              </li>
              <li>
                <strong>{locale === "en" ? "Form:" : "النموذج"}</strong> {dict.pipes_forged_bars.form.join(", ")}
              </li>
              <li>
                <strong>{locale === "en" ? "Type:" : "النوع"}</strong> {dict.pipes_forged_bars.type.join(", ")}
              </li>
            </ul>
            <p className="text-gray-700 font-semibold">
              {dict.pipes_forged_bars.fittings}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <strong>{locale === "en" ? "Materials:" : "المواد"}</strong> {dict.pipes_forged_bars.fitting_materials.join(", ")}
              </li>
              <li>
                <strong>{locale === "en" ? "Size:" : "الحجم"}</strong> {dict.pipes_forged_bars.fitting_size}
              </li>
            </ul>
            <div className="mt-3">
              <Image
                src={dict.pipes_forged_bars.image}
                alt={dict.pipes_forged_bars.title}
                width={500}
                height={500}
                className="rounded-md"
              />
            </div>
          </div>
        </section>

        {/* Flanges Section */}
        <section className="bg-white shadow-lg mb-4 rounded-lg p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {dict.flanges.title}
          </h3>
          <p className="text-gray-700">
            {dict.flanges.description}
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
            <li>
              <strong>{locale === "en" ? "Materials:" : "المواد"}</strong> {dict.flanges.materials.join(", ")}
            </li>
          </ul>
          <div className="mt-3">
            <Image
              src={dict.flanges.image}
              alt={dict.flanges.title}
              width={500}
              height={500}
              className="rounded-md"
            />
          </div>
        </section>

        {/* Valves Section */}
        <section className="bg-white shadow-lg mb-4 rounded-lg p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {dict.valves.title}
          </h3>
          <p className="text-gray-700 font-semibold">
            {dict.valves.types.join(" | ")}
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
            <li>
              <strong>{locale === "en" ? "Materials:" : "المواد"}</strong> {dict.valves.materials.join(", ")}
            </li>
          </ul>
          <div className="mt-3">
            <Image
              src={dict.valves.image}
              alt={dict.valves.title}
              width={500}
              height={500}
              className="rounded-md"
            />
          </div>
        </section>

        {/* Fasteners & Fittings Section */}
        <section className="bg-white shadow-lg rounded-lg mb-4 p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {dict.fasteners_fittings.title}
          </h3>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {locale === "en" ? "Bolts and Screws" : "البراغي والمسامير"}
              </h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {dict.fasteners_fittings.bolts_screws.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                {locale === "en" ? "Nuts & Washers" : "المكسرات والغسالات"}
              </h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {dict.fasteners_fittings.nuts_washers.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={dict.fasteners_fittings.image}
                alt={dict.fasteners_fittings.title}
                width={500}
                height={500}
                className="rounded-md h-80 object-contain"
              />
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            <strong>{locale === "en" ? "Materials:" : "المواد"}</strong> {dict.fasteners_fittings.materials.join(", ")}
          </p>
        </section>

        {/* Oil Storage & Material Handling Section */}
        <section className="bg-white shadow-lg rounded-lg p-6 mb-4 md:p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {dict.oil_storage_material_handling.title}
          </h3>
          <Image
            src={dict.oil_storage_material_handling.image}
            alt={dict.oil_storage_material_handling.title}
            width={500}
            height={500}
            className="rounded-md mb-6"
          />
          {dict.oil_storage_material_handling.items.map((item, i) => (
            <div key={i} className="space-y-2 mb-6">
              <p className="font-semibold text-gray-800">{item.title}</p>
              {Array.isArray(item.description) ? (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {item.description.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              ) : item.description ? (
                <p className="text-gray-700">{item.description}</p>
              ) : null}
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={500}
                className="rounded-md"
              />
            </div>
          ))}
        </section>

        {/* Manpower Solutions Section */}
        <section className="bg-white text-gray-800 rounded-lg p-6 md:p-8 shadow-lg border border-gray-200">
          <div className="bg-teal-600 text-white px-6 py-2 rounded-full w-max text-lg font-bold mb-6">
            {dict.manpower_solutions.title}
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-semibold mb-2 text-teal-700">
                {locale === "en" ? "Candidate Evaluation Criteria:" : "معايير تقييم المرشحين"}
              </h3>
              <ul className="space-y-1 text-sm">
                {dict.manpower_solutions.candidate_evaluation_criteria.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 before:content-['✓'] before:text-teal-600 before:font-bold"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Image
              src={dict.manpower_solutions.image}
              alt={dict.manpower_solutions.title}
              width={300}
              height={300}
              className="rounded-full"
            />
          </div>
          <p className="text-base mb-6">
            {dict.manpower_solutions.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
            {dict.manpower_solutions.roles.map((group, i) => (
              <ul
                key={i}
                className="space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                {group.map((role, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2 before:content-['▸'] before:text-teal-500 before:font-bold"
                  >
                    {role}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
