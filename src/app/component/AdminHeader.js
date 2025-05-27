import { Menu } from "lucide-react"; // or any icon library
import Image from "next/image";
import logo from "/public/img/logos/header.png";
import { MdMenuOpen } from "react-icons/md";

export default function AdminHeader({ toggleSidebar }) {
  return (
    <header className="flex fixed w-full bg-amber-200 items-center justify-between px-4 py-2 z-10 shadow-sm">
      <Image
        src={logo}
        alt="Logo"
        className=" h-[70px] w-[260px]"
        onClick={() => navigate.push("/admin/dashboard")}
      />
      <button
        className="lg:hidden p-2 text-gray-700"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <MdMenuOpen size={30} />
      </button>
    </header>
  );
}
