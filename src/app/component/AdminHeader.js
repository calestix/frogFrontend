

import { MdMenuOpen } from "react-icons/md";

export default function AdminHeader({ toggleSidebar }) {
  return (
    <header className="flex fixed w-full bg-white items-center justify-between px-4 py-2 z-10 shadow-sm">
      <h2 className="text-5xl font-bold text-black">FORGE T&C EST</h2>
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
