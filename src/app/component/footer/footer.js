"use client";
import { useRouter } from "next/navigation";


import { MdLocationOn, MdEmail, MdPhone, MdOutlineWhatsapp } from "react-icons/md";
import { useLanguage } from "../../context/LanguageContext";
import { getDictionary } from "../../lib/dictionary";
import { Facebook, Instagram, Twitter, Youtube,Whatsapp } from "lucide-react";

export default function Footer() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
  const footer = dict.footer;
  const router = useRouter();

  return (
    <footer className="bg-white text-black px-6 md:px-20 py-12">
      <img
        src="/headerlogo.png"
        alt="forge"
        className="mb-4 w-36 hover:scale-105 transition-transform duration-300"
      />
      <div className="grid md:grid-cols-[50%_25%_25%] gap-10 border-b border-yellow-300 pb-10">
        {/* Logo and Contact */}
        <div>
          <div className="space-y-2 text-sm leading-6">
            <p className="flex items-start gap-2">
              <MdLocationOn className="text-xl" />
              <span>{footer.address}</span>
            </p>
            <p className="flex items-center gap-2">
              <MdEmail className="text-lg" />
              {footer.email}
            </p>
            <p className="flex items-center gap-2">
              <MdPhone className="text-lg" />
              {footer.phoneumber}
            </p>
          </div>
          <p className="font-semibold mt-4">{footer.follow_us}</p>
          <div className="flex gap-4 mt-2 text-xl">
            {[
              {
                icon: <Instagram size={26} />,
                link: "https://www.instagram.com/forge3ats/",
                color: "hover:bg-pink-500",
              },
              {
                icon: <Youtube size={26} />,
                link: "https://www.youtube.com/channel/UCLPjviwQ5oezkKbYGYvnBjg",
                color: "hover:bg-red-600",
              },
              {
                icon: <Twitter size={26} />,
                link: "https://x.com/forgeats3",
                color: "hover:bg-black",
              },
              {
                icon: <Facebook size={26} />,
                link: "https://www.facebook.com/profile.php?id=61577260822002",
                color: "hover:bg-blue-600",
              },
              {
                icon: <MdOutlineWhatsapp size={26} />,
                link: "#",
                color: "hover:bg-green-600",
              },
            ].map((item, i) => (
              <a
                href={item.link}
                key={i}
                target="_blank"
                className={`w-12 h-12 flex items-center justify-center rounded-full border-2 border-black hover:border-0 text-black transition-all duration-300 hover:text-white ${item.color}`}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold text-lg mb-3">{footer.resources}</h3>
          <ul className="space-y-2 text-sm">
            {[
              { label: footer.privacy_policy, path: "/privacy-policy" },
              {
                label: footer.terms_and_conditions,
                path: "/terms-and-condition",
              },
            ].map((item, i) => (
              <li
                key={i}
                className="cursor-pointer hover:text-purple-800 transition duration-300"
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-lg mb-3">{footer.company}</h3>
          <ul className="space-y-2 text-sm">
            {[
              { label: footer.services, path: "/services" },
              { label: footer.about_us, path: "/about-us" },
              { label: footer.contact_us, path: "/contact-us" },
              { label: footer.blog, path: "/blog" },
            ].map((item, i) => (
              <li
                key={i}
                className="cursor-pointer hover:text-purple-800 transition duration-300"
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
