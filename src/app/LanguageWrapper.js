"use client";

import { useLanguage } from "./context/LanguageContext";


export default function LanguageWrapper({ children }) {
  const { locale } = useLanguage();

  return <div dir={locale === "ar" ? "rtl" : "ltr"}>{children}</div>;
}
