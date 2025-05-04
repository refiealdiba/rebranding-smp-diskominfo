import DropdownMenu from "./DropdownMenu";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex justify-center items-center gap-30 py-5 font-inter font-medium">
            <div className="logo">
                <img src="logo.png" alt="SMPN 20 Logo" className="w-16" />
            </div>
            <div className="linkList flex gap-8">
                <Link to="/" className="font-bold text-smporange">
                    Beranda
                </Link>
                <div className="relative cursor-pointer">
                    <DropdownMenu menu="Profil" />
                </div>
                <Link to="berita">Berita</Link>
                <div className="relative cursor-pointer">
                    <DropdownMenu menu="Galeri" />
                </div>
                <a href="https://sites.google.com/view/labipasmpn20semarang" target="_blank">
                    Lab. IPA
                </a>
                <Link to="ekstrakulikuler">Ekstrakulikuler</Link>
                <a href="https://pustaka20.smpn20.semarangkota.go.id/" target="_blank">
                    Perpustakaan
                </a>
                <Link to="kontak">Kontak</Link>
                <Link to="pengaduan">Pengaduan</Link>
            </div>
            <div className="login bg-smporange text-white px-5 py-2 rounded-full">
                <a href="">Login</a>
            </div>
        </div>
    );
};

export default Navbar;
