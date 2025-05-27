"use client"
import { useState, useEffect } from "react";
import AdminSidebar from "../component/AdminSidebar/AdminSidebar";
import AdminHeader from "../component/AdminHeader";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen">
      <div
        className={`fixed z-40 lg:static transition-all duration-300 bg-white h-full shadow-md ${
          sidebarOpen ? "left-0 w-64" : "-left-64 w-64"
        }`}
      >
        <AdminSidebar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      <div className="flex flex-col w-[calc(100%-16rem)] bg-gray-100 flex-1">
        <AdminHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="w-auto h-screen overflow-y-auto pt-20">{children}</main>
      </div>
    </div>
  );
}
