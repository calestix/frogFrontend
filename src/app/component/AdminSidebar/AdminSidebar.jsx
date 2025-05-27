"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { apiCall } from "../../utils/ApiCall";
import { useAuthActions } from "../../context/useAuthActions";

const navLinks = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Account Management", path: "/admin/account-management" },
  { name: "Products Category", path: "/admin/product-category" },
  { name: "Products Management", path: "/admin/product-management" },
  { name: "Purchase", path: "/admin/purchase-product" },
  { name: "CMS Management", path: "/admin/cms-management" },
  { name: "Contact us", path: "/admin/contact-us" },
  { name: "All Tax", path: "/admin/all-tax" },
  { name: "Daily Video", path: "/admin/daily-video" },
];

export default function AdminSidebar({ toggleSidebar }) {
  const pathname = usePathname();
  const { LogOut } = useAuthActions();
  const navigate = useRouter();
  const handleLogout = async () => {
    try {
      await apiCall("/admin/auth/private/logout", "put");
      await LogOut();
      navigate.push("/admin-login");
    } catch (error) {
    } finally {
    }
  };
  return (
    <aside className="w-64 bg-purple-800 h-full text-white p-2">
      <h2 className="text-2xl font-semibold mb-6 mt-3">Admin Panel</h2>
      <nav className="flex flex-col space-y-2">
        {navLinks.map((link) => (
          <div
            key={link.path}
            onClick={() => {
              navigate.push(link?.path);
              toggleSidebar();
            }}
            href={link.path}
            className={`p-2 rounded cursor-pointer hover:bg-purple-700 ${
              pathname.startsWith(link.path) ? "bg-purple-700" : ""
            }`}
          >
            {link.name}
          </div>
        ))}
        <div
          onClick={() => handleLogout()}
          className="p-2 rounded w-full hover:bg-purple-700 cursor-pointer"
        >
          Logout
        </div>
      </nav>
    </aside>
  );
}
