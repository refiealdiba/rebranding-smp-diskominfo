import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const location = useLocation();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

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
          <Link
            to="/admin"
            className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
              isActive("/admin")
                ? "bg-white text-smporange font-semibold"
                : "hover:bg-orange-100"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
              isActive("/admin/users")
                ? "bg-white text-smporange font-semibold"
                : "hover:bg-orange-100"
            }`}
          >
            Guru & Karyawan
          </Link>

          <Link
            to="/admin/articles"
            className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
              isActive("/admin/articles")
                ? "bg-white text-smporange font-semibold"
                : "hover:bg-orange-100"
            }`}
          >
            Berita
          </Link>

          {/* Dropdown Galeri */}
          <div>
            <div
              onClick={() => setIsGalleryOpen(!isGalleryOpen)}
              className="cursor-pointer px-4 py-2 rounded-lg hover:bg-orange-100 transition-colors duration-200 font-medium"
            >
              Galeri ▾
            </div>
            {isGalleryOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <Link
                  to="/admin/photos"
                  className={`block px-3 py-1 rounded-md text-sm ${
                    isActive("/admin/photos")
                      ? "bg-white text-smporange font-semibold"
                      : "hover:bg-orange-100"
                  }`}
                >
                  Foto
                </Link>
                <Link
                  to="/admin/videos"
                  className={`block px-3 py-1 rounded-md text-sm ${
                    isActive("/admin/videos")
                      ? "bg-white text-smporange font-semibold"
                      : "hover:bg-orange-100"
                  }`}
                >
                  Video
                </Link>
                <Link
                  to="/admin/achievements"
                  className={`block px-3 py-1 rounded-md text-sm ${
                    isActive("/admin/achievements")
                      ? "bg-white text-smporange font-semibold"
                      : "hover:bg-orange-100"
                  }`}
                >
                  Prestasi
                </Link>
              </div>
            )}
          </div>

          {/* Photo Details */}
          <Link
            to="/admin/photo-details"
            className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
              isActive("/admin/photo-details")
                ? "bg-white text-smporange font-semibold"
                : "hover:bg-orange-100"
            }`}
          >
            Pengaduan
          </Link>
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
