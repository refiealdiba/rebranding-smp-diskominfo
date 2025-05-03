import DropdownMenu from "./DropdownMenu";

const Navbar = () => {
    return (
        <div className="flex justify-center items-center gap-30 py-5 font-inter font-medium">
            <div className="logo">
                <img src="logo.png" alt="SMPN 20 Logo" className="w-16" />
            </div>
            <div className="linkList flex gap-8">
                <a href="" className="font-bold text-smporange">
                    Beranda
                </a>
                <div className="relative cursor-pointer">
                    <DropdownMenu menu="Profil" />
                </div>
                <a href="">Berita</a>
                <div className="relative cursor-pointer">
                    <DropdownMenu menu="Galeri" />
                </div>
                <a href="">Lab. IPA</a>
                <a href="">Ekstrakulikuler</a>
                <a href="">Perpustakaan</a>
                <a href="">Kontak</a>
                <a href="">Pengaduan</a>
            </div>
            <div className="login bg-smporange text-white px-5 py-2 rounded-full">
                <a href="">Login</a>
            </div>
        </div>
    );
};

export default Navbar;
