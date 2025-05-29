"use client";

import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/headerlogo.png";
import "./style.scss";

export default function Navbar() {
  const { locale, switchLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: { en: "Home", ar: "الرئيسية" } },
    { href: "/about-us", label: { en: "About Us", ar: "معلومات عنا" } },
    { href: "/services", label: { en: "Services", ar: "خدمات" } },
    { href: "/contact-us", label: { en: "Contact Us", ar: "اتصل بنا" } },
    { href: "/blog", label: { en: "Blog", ar: "مدونة" } },
  ];

  const handleLanguageChange = (e) => {
    switchLanguage(e.target.value);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white border-b border-gray-300 z-99 w-full fixed top-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <Link
          href="/"
          className="flex items-center space-x-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Image src={logo} alt="Logo" className="h-10 w-auto cursor-pointer" />
        </Link>

        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href
                  ? "active-nav-item"
                  : "hover:text-black duration-200"
              }
            >
              {item.label[locale]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center">
          <select
            aria-label="Select Language"
            value={locale}
            onChange={handleLanguageChange}
            className="border px-3 py-1 rounded bg-green-700  cursor-pointer"
          >
            <option value="en">EN</option>
            <option value="ar">عربي</option>
          </select>
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-1.5 cursor-pointer z-50 ms-4"
          >
            <span
              className={`block h-0.5 w-6 bg-amber-800 transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-amber-800 transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-amber-800 transition-transform duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-0 overflow-hidden bg-blue-950 text-white shadow-lg transition-width duration-300 ease-in-out md:hidden z-40 ${
          mobileMenuOpen ? "w-[300px]" : "w-0"
        }`}
      >
        <nav className="flex flex-col mt-16 space-y-2 text-lg font-semibold">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 px-3 ${
                pathname === item.href
                  ? "bg-white bg-opacity-30 text-black"
                  : "hover:bg-white hover:text-black hover:bg-opacity-20 transition-colors duration-200"
              }`}
            >
              {item.label[locale]}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
