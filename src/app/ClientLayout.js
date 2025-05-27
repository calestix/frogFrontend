"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LanguageWrapper from "./LanguageWrapper";
import { LanguageProvider } from "./context/LanguageContext";

export default function ClientLayout({ children }) {
  return (
    <LanguageProvider>
      <LanguageWrapper>{children}</LanguageWrapper>
      <ToastContainer position="top-center" autoClose={1000} />
    </LanguageProvider>
  );
}
