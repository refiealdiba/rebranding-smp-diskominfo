import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";

const Sidebar = () => {
    const [isGaleriOpen, setIsGaleriOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleGaleri = () => setIsGaleriOpen(!isGaleriOpen);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Hamburger Button - mobile only */}
            <button
                onClick={toggleSidebar}
                className="md:hidden fixed top-4 right-4 z-50 bg-smporange text-white p-2 rounded"
            >
                <Menu size={24} />
            </button>

            {/* Sidebar Mobile */}
            <aside
                className={`
                    bg-smporange text-white w-64 p-5 shadow-lg font-inter h-screen
                    fixed top-0 left-0 z-40 transition-transform transform
                    md:hidden
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <SidebarContent
                    toggleSidebar={toggleSidebar}
                    isActive={isActive}
                    isGaleriOpen={isGaleriOpen}
                    toggleGaleri={toggleGaleri}
                />
            </aside>

            {/* Sidebar Desktop */}
            <aside
                className={`bg-smporange text-white w-64 p-5 shadow-lg font-inter h-screen hidden md:block fixed top-0 left-0 z-40`}
            >
                <SidebarContent
                    isActive={isActive}
                    isGaleriOpen={isGaleriOpen}
                    toggleGaleri={toggleGaleri}
                />
            </aside>
        </>
    );
};

const SidebarContent = ({ toggleSidebar, isActive, isGaleriOpen, toggleGaleri }) => (
    <>
        <Link to={"/"} className="flex flex-col items-center mb-8">
            <img src="/logo.png" alt="Logo" className="w-16 mb-2" />
            <h2 className="font-bold text-center text-sm leading-tight text-white">
                SMPN 20
                <br />
                SEMARANG
            </h2>
        </Link>

        <div className="flex flex-col gap-2 text-white">
            <Link
                to="/admin"
                className={`px-5 py-3 rounded-md ${
                    isActive("/admin")
                        ? "bg-white text-smporange font-bold text-lg"
                        : "hover:bg-smporange/70"
                }`}
                onClick={toggleSidebar}
            >
                Dashboard
            </Link>
            <Link
                to="guruKaryawan"
                className={`px-5 py-3 rounded-md ${
                    isActive("/admin/guruKaryawan")
                        ? "bg-white text-smporange font-bold text-lg"
                        : "hover:bg-smporange/70"
                }`}
                onClick={toggleSidebar}
            >
                Guru dan Karyawan
            </Link>
            <Link
                to="berita"
                className={`px-5 py-3 rounded-md ${
                    isActive("/admin/berita")
                        ? "bg-white text-smporange font-bold text-lg"
                        : "hover:bg-smporange/70"
                }`}
                onClick={toggleSidebar}
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
                    {isGaleriOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>
                {isGaleriOpen && (
                    <div className="ml-6 mt-1 flex flex-col gap-1">
                        <Link
                            to="galeriFoto"
                            className={`px-4 py-2 text-sm rounded-md ${
                                isActive("/admin/galeriFoto")
                                    ? "bg-white text-smporange font-semibold"
                                    : "hover:bg-smporange/60"
                            }`}
                            onClick={toggleSidebar}
                        >
                            Galeri Foto
                        </Link>
                        <Link
                            to="galeriVideo"
                            className={`px-4 py-2 text-sm rounded-md ${
                                isActive("/admin/galeriVideo")
                                    ? "bg-white text-smporange font-semibold"
                                    : "hover:bg-smporange/60"
                            }`}
                            onClick={toggleSidebar}
                        >
                            Galeri Video
                        </Link>
                        <Link
                            to="galeriPrestasi"
                            className={`px-4 py-2 text-sm rounded-md ${
                                isActive("/admin/galeriPrestasi")
                                    ? "bg-white text-smporange font-semibold"
                                    : "hover:bg-smporange/60"
                            }`}
                            onClick={toggleSidebar}
                        >
                            Galeri Prestasi
                        </Link>
                    </div>
                )}
            </div>

            <Link
                to="pengaduan"
                className={`px-5 py-3 rounded-md ${
                    isActive("/admin/pengaduan")
                        ? "bg-white text-smporange font-bold text-lg"
                        : "hover:bg-smporange/70"
                }`}
                onClick={toggleSidebar}
            >
                Pengaduan
            </Link>
        </div>
    </>
);

export default Sidebar;
