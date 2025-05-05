// import { Link, useLocation } from "react-router-dom";
// import { LogOut } from "lucide-react";

// export default function Sidebar() {
//     const location = useLocation();

//     const navItems = [
//         { to: "/admin", label: "Dashboard" },
//         { to: "/admin/users", label: "Users" },
//         { to: "/admin/articles", label: "Articles" },
//         { to: "/admin/photos", label: "Photos" },
//         { to: "/admin/photo-details", label: "Photo Details" },
//         { to: "/admin/achievements", label: "Achievements" },
//         { to: "/admin/videos", label: "Videos" },
//     ];

//     return (
//         <aside className="bg-smporange text-black min-h-screen w-64 p-5 flex flex-col justify-between shadow-lg">
//             <div>
//                 {/* Logo dan Judul */}
//                 <div className="flex flex-col items-center mb-8">
//                     <img src="/logo.png" alt="Logo" className="w-16 mb-2" />
//                     <h2 className="font-bold text-center text-sm leading-tight">
//                         SMPN 20
//                         <br />
//                         SEMARANG
//                     </h2>
//                 </div>
//                 {/* Navigasi */}
//                 <nav className="space-y-2">
//                     {navItems.map((item) => (
//                         <Link
//                             key={item.to}
//                             to={item.to}
//                             className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
//                                 location.pathname === item.to
//                                     ? "bg-white text-smporange font-semibold"
//                                     : "hover:bg-orange-100"
//                             }`}
//                         >
//                             {item.label}
//                         </Link>
//                     ))}
//                 </nav>
//             </div>

//             {/* Footer Logout */}
//             <div className="text-sm flex items-center gap-2 mt-8 p-2 rounded-md hover:bg-orange-100 cursor-pointer transition-colors duration-200">
//                 <LogOut className="w-5 h-5" />
//                 <span>Logout</span>
//             </div>
//         </aside>
//     );
// }
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const [isGaleriOpen, setIsGaleriOpen] = useState(false);
  const location = useLocation();

  const toggleGaleri = () => {
    setIsGaleriOpen(!isGaleriOpen);
  };

  // Helper untuk menentukan apakah path saat ini aktif
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-smporange text-black min-h-screen w-64 p-5 flex flex-col shadow-lg font-inter">
      <div className="flex flex-col items-center mb-8">
        <img src="/logo.png" alt="Logo" className="w-16 mb-2" />
        <h2 className="font-bold text-center text-sm leading-tight text-white">
          SMPN 20
          <br />
          SEMARANG
        </h2>
      </div>

      <div className="flex flex-col gap-2 text-white">
        <Link
          to="/admin"
          className={
            isActive("/admin")
              ? "px-5 py-3 rounded-xl font-bold text-lg bg-white text-smporange"
              : "px-5 py-3 hover:bg-smporange/70 rounded-md"
          }
        >
          Dashboard
        </Link>
        <Link
          to="guruKaryawan"
          className={
            isActive("/admin")
              ? "px-5 py-3 rounded-xl font-bold text-lg bg-white text-smporange"
              : "px-5 py-3 hover:bg-smporange/70 rounded-md"
          }
        >
          Guru dan Karyawan
        </Link>
        <Link
          to="articles"
          className={
            isActive("/admins")
              ? "px-5 py-3 rounded-xl font-bold text-lg bg-white text-smporange"
              : "px-5 py-3 hover:bg-smporange/70 rounded-md"
          }
        >
          Berita
        </Link>

        {/* Dropdown Galeri */}
        <div>
          <button
            onClick={toggleGaleri}
            className="w-full flex justify-between items-center px-5 py-3 hover:bg-smporange/70 rounded-md"
          >
            <span>Galeri</span>
            {isGaleriOpen ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>
          {isGaleriOpen && (
            <div className="ml-6 mt-1 flex flex-col gap-1">
              <Link
                to="galeriFoto"
                className={
                  isActive("/admin/galeriFoto")
                    ? "px-4 py-2 text-sm rounded-xl bg-white text-smporange font-semibold"
                    : "px-4 py-2 text-sm hover:bg-smporange/60 rounded-md"
                }
              >
                Galeri Foto
              </Link>
              <Link
                to="galeriVideo"
                className={
                  isActive("/admin/galeriVideo")
                    ? "px-4 py-2 text-sm rounded-xl bg-white text-smporange font-semibold"
                    : "px-4 py-2 text-sm hover:bg-smporange/60 rounded-md"
                }
              >
                Galeri Video
              </Link>
              <Link
                to="galeriPrestasi"
                className={
                  isActive("/admin/galeriPrestasi")
                    ? "px-4 py-2 text-sm rounded-xl bg-white text-smporange font-semibold"
                    : "px-4 py-2 text-sm hover:bg-smporange/60 rounded-md"
                }
              >
                Galeri Prestasi
              </Link>
            </div>
          )}
        </div>

        <Link
          to="pengaduan"
          className={
            isActive("/admin/pengaduan")
              ? "px-5 py-3 rounded-xl font-bold text-lg bg-white text-smporange"
              : "px-5 py-3 hover:bg-smporange/70 rounded-md"
          }
        >
          Pengaduan
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
