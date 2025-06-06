"use client";
import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext({
  locale: "en",
  switchLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("en");
  useEffect(() => {
    const savedLang = sessionStorage.getItem("lang");
    if (savedLang) {
      setLocale(savedLang);
    }
  }, []);

  const switchLanguage = (lang) => {
    setLocale(lang);
    sessionStorage.setItem("lang", lang);
    window.location.reload()
  };

  return (
    <LanguageContext.Provider value={{ locale, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
