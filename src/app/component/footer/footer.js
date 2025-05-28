"use client";
import { useRouter } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import { useLanguage } from "../../context/LanguageContext";
import { getDictionary } from "../../lib/dictionary";

export default function Footer() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
  const footer = dict.footer;
  const router = useRouter();

  return (
    <footer className="bg-white text-black px-6 md:px-20 py-12">
      <img
        src="/headerlogo.png"
        alt="Braj Kunj Logo"
        className="mb-4 w-36 hover:scale-105 transition-transform duration-300"
      />
      <div className="grid md:grid-cols-3 gap-10 border-b border-yellow-300 pb-10">
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
                icon: <FaFacebookF />,
                link: "#",
              },
              {
                icon: <FaInstagram />,
                link: "#",
              },
              {
                icon: <FaWhatsapp />,
                link: "#",
              },
              {
                icon: <FaYoutube />,
                link: "#",
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-800 transition-transform duration-300 hover:scale-110"
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
              { label: footer.terms_and_conditions, path: "/terms-and-condition" },
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
