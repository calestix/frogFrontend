"use client";

import { useState } from "react";

const aboutContent = {
  en: {
    title: "About FORGE T&C EST",
    sections: [
      {
        heading: "Our Story",
        text: `FORGE T&C EST was founded with the vision to be a leading construction and maintenance company in Saudi Arabia. With years of experience and a dedicated team, we have grown into a trusted partner for residential, commercial, and government projects.`,
      },
      {
        heading: "Our Mission",
        text: `To provide exceptional construction, repair, and installation services with utmost professionalism, quality, and safety. We aim to exceed client expectations by delivering timely and cost-effective solutions.`,
      },
      {
        heading: "Our Services",
        text: `We specialize in a wide range of services including metal tank repairs, welding, residential & government building construction, electrical and network wiring, solar energy systems, plumbing, HVAC, and much more.`,
      },
      {
        heading: "Our Values",
        text: `Integrity, innovation, and customer satisfaction are at the core of everything we do. We are committed to sustainable practices and continuous improvement.`,
      },
      {
        heading: "Why Choose Us?",
        text: `Experienced team, comprehensive service portfolio, commitment to safety and quality, and a customer-first approach make FORGE T&C EST your ideal partner for construction and maintenance needs.`,
      },
    ],
  },
  ar: {
    title: "عن شركة فورج T&C",
    sections: [
      {
        heading: "قصتنا",
        text: `تأسست شركة فورج T&C بهدف أن تكون شركة رائدة في مجال البناء والصيانة في المملكة العربية السعودية. مع سنوات من الخبرة وفريق مخصص، أصبحنا شريكًا موثوقًا للمشاريع السكنية والتجارية والحكومية.`,
      },
      {
        heading: "مهمتنا",
        text: `تقديم خدمات استثنائية في البناء والإصلاح والتركيب بأعلى معايير المهنية والجودة والسلامة. نسعى لتجاوز توقعات العملاء من خلال تقديم حلول فعالة من حيث الوقت والتكلفة.`,
      },
      {
        heading: "خدماتنا",
        text: `نحن متخصصون في مجموعة واسعة من الخدمات تشمل إصلاح خزانات المعادن، اللحام، بناء المباني السكنية والحكومية، تمديد الأسلاك الكهربائية وشبكات الاتصالات، أنظمة الطاقة الشمسية، السباكة، التدفئة والتهوية والتكييف، والمزيد.`,
      },
      {
        heading: "قيمنا",
        text: `النزاهة، الابتكار، ورضا العملاء هي أساس كل ما نقوم به. نحن ملتزمون بالممارسات المستدامة والتحسين المستمر.`,
      },
      {
        heading: "لماذا تختارنا؟",
        text: `فريق ذو خبرة، مجموعة خدمات شاملة، التزام بالسلامة والجودة، ونهج يركز على العميل يجعل شركة فورج T&C شريكك المثالي لاحتياجات البناء والصيانة.`,
      },
    ],
  },
};

export default function AboutUs() {
  const [lang, setLang] = useState("en");
  const content = aboutContent[lang];

  return (
    <div className={`min-h-screen p-8 max-w-5xl mx-auto ${lang === "ar" ? "rtl" : "ltr"}`}>
      {/* Language toggle */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setLang(lang === "en" ? "ar" : "en")}
          className="px-4 py-2 rounded bg-purple-700 text-white hover:bg-purple-800 transition"
        >
          {lang === "en" ? "العربية" : "English"}
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-purple-800">{content.title}</h1>

      {content.sections.map(({ heading, text }, i) => (
        <section key={i} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">{heading}</h2>
          <p className="text-gray-700 leading-relaxed">{text}</p>
        </section>
      ))}
    </div>
  );
}
