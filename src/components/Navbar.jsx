import { useEffect, useState } from "react";
import { supabase } from "../config/db";
import { signInWithGoogle, signOut } from "../services/auth";
import DropdownMenu from "./DropdownMenu";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const checkLogin = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
            }
        };
        checkLogin();
    }, []);

    const handleSignOut = async () => {
        const error = await signOut();
        if (!error) {
            setUser(null);
            window.location.reload();
        }
    };

    const isActive = (path) => {
        return location.pathname === path ? "text-smporange font-bold" : "";
    };

    return (
        <nav className="bg-white shadow-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between font-inter font-medium">
                {/* Logo - kiri */}
                <div className="flex items-center gap-4">
                    <img src="/logo.png" alt="Logo" className="w-12 h-12" />
                </div>

                {/* Menu Navigasi - tengah */}
                <div className="flex-1 flex justify-center">
                    <div className="hidden lg:flex gap-6 items-center">
                        <Link to="/" className={isActive("/")}>
                            Beranda
                        </Link>
                        <DropdownMenu menu="Profil" />
                        <Link to="/berita" className={isActive("/berita")}>
                            Berita
                        </Link>
                        <DropdownMenu menu="Galeri" />
                        <a
                            href="https://sites.google.com/view/labipasmpn20semarang"
                            target="_blank"
                            className=""
                        >
                            Lab. IPA
                        </a>
                        <Link to="/ekstrakulikuler" className={isActive("/ekstrakulikuler")}>
                            Ekstrakulikuler
                        </Link>
                        <a
                            href="https://pustaka20.smpn20.semarangkota.go.id/"
                            target="_blank"
                            className=""
                        >
                            Perpustakaan
                        </a>
                        <Link to="/kontak" className={isActive("/kontak")}>
                            Kontak
                        </Link>
                        <Link to="/pengaduan" className={isActive("/pengaduan")}>
                            Pengaduan
                        </Link>
                        {user && (
                            <Link to="/admin" className={isActive("/admin")}>
                                Admin
                            </Link>
                        )}
                    </div>
                </div>

                {/* Login / Avatar - kanan */}
                <div className="hidden lg:flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-2">
                            <img
                                src={user.user_metadata.avatar_url}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                            {/* <span>{user.user_metadata.full_name}</span> */}
                            <button
                                onClick={handleSignOut}
                                className="bg-red-500 text-white px-4 py-1 rounded-full"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={signInWithGoogle}
                            className="bg-smporange text-white px-4 py-2 rounded-full"
                        >
                            Login
                        </button>
                    )}
                </div>

                {/* Tombol menu untuk mobile */}
                <button className="lg:hidden text-smporange" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Menu Mobile */}
            {menuOpen && (
                <div className="lg:hidden bg-white px-6 pb-4 flex flex-col gap-4 text-sm font-medium">
                    <Link to="/" className={isActive("/")}>
                        Beranda
                    </Link>
                    <DropdownMenu menu="Profil" />
                    <Link to="/berita" className={isActive("/berita")}>
                        Berita
                    </Link>
                    <DropdownMenu menu="Galeri" />
                    <a
                        href="https://sites.google.com/view/labipasmpn20semarang"
                        target="_blank"
                        className=""
                    >
                        Lab. IPA
                    </a>
                    <Link to="/ekstrakulikuler" className={isActive("/ekstrakulikuler")}>
                        Ekstrakulikuler
                    </Link>
                    <a
                        href="https://pustaka20.smpn20.semarangkota.go.id/"
                        target="_blank"
                        className=""
                    >
                        Perpustakaan
                    </a>
                    <Link to="/kontak" className={isActive("/kontak")}>
                        Kontak
                    </Link>
                    <Link to="/pengaduan" className={isActive("/pengaduan")}>
                        Pengaduan
                    </Link>

                    {user ? (
                        <>
                            <Link to="/admin" className={isActive("/pengaduan")}>
                                Admin
                            </Link>
                            <div className="flex items-center gap-2 mt-3">
                                <img
                                    src={user.user_metadata.avatar_url}
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                                {/* <span>{user.user_metadata.full_name}</span> */}
                                <button
                                    onClick={handleSignOut}
                                    className="bg-red-500 text-white px-4 py-1 rounded-full"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </>
                    ) : (
                        <button
                            onClick={signInWithGoogle}
                            className="bg-smporange text-white px-4 py-2 rounded-full mt-2"
                        >
                            Login
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
