import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Dashboard" },
    { to: "/users", label: "Users" },
    { to: "/articles", label: "Articles" },
    { to: "/photos", label: "Photos" },
    { to: "/photo-details", label: "Photo Details" },
    { to: "/achievements", label: "Achievements" },
    { to: "/videos", label: "Videos" },
  ];

  return (
    <aside className="bg-smporange text-black min-h-screen w-64 p-5 flex flex-col justify-between shadow-lg">
      <div>
        {/* Logo dan Judul */}
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="Logo" className="w-16 mb-2" />
          <h2 className="font-bold text-center text-sm leading-tight">
            SMPN 20
            <br />
            SEMARANG
          </h2>
        </div>

        {/* Navigasi */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === item.to
                  ? "bg-white text-smporange font-semibold"
                  : "hover:bg-orange-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer Logout */}
      <div className="text-sm flex items-center gap-2 mt-8 p-2 rounded-md hover:bg-orange-100 cursor-pointer transition-colors duration-200">
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </div>
    </aside>
  );
}
