import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const DropdownMenu = ({ menu }) => {
    const [isClicked, setIsClicked] = useState(false);
    const menuRef = useRef();

    const toggleDropdown = () => {
        setIsClicked(!isClicked);
    };

    const handleCloseMenu = () => {
        setIsClicked(false);
    };

    // Optional: Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsClicked(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <div className="flex items-center gap-1 cursor-pointer" onClick={toggleDropdown}>
                <p>{menu}</p>
                <ChevronRight
                    className={`w-5 h-5 transition-transform ${isClicked ? "rotate-90" : ""}`}
                />
            </div>

            <div
                className={`absolute left-0 top-full mt-2 w-max rounded-md bg-white shadow-md outline outline-smpgray/50 transition-all duration-300 z-50
                    ${isClicked ? "opacity-100 visible" : "opacity-0 invisible -translate-y-2"}
                `}
            >
                <div className="flex flex-col">
                    {menu === "Profil" ? (
                        <>
                            <LinkDropdown
                                name="Profil Sekolah"
                                link="/profilSekolah"
                                onClickLink={handleCloseMenu}
                            />
                            <LinkDropdown
                                name="Visi & Misi"
                                link="/visiMisi"
                                onClickLink={handleCloseMenu}
                            />
                            <LinkDropdown
                                name="Profil Guru & Karyawan"
                                link="/profilGuruKaryawan"
                                onClickLink={handleCloseMenu}
                            />
                            <LinkDropdown
                                name="Sarana & Prasarana"
                                link="/sarana"
                                onClickLink={handleCloseMenu}
                            />
                            <LinkDropdown
                                name="Struktur Organisasi"
                                link="/struktur"
                                onClickLink={handleCloseMenu}
                            />
                            <LinkDropdown
                                name="Prestasi"
                                link="/prestasi"
                                onClickLink={handleCloseMenu}
                            />
                        </>
                    ) : (
                        <>
                            <LinkDropdown
                                name="Galeri Foto"
                                link="/galeriFoto"
                                onClickLink={handleCloseMenu}
                            />
                            <LinkDropdown
                                name="Galeri Video"
                                link="/galeriVideo"
                                onClickLink={handleCloseMenu}
                            />
                            <LinkDropdown
                                name="Galeri Prestasi Siswa"
                                link="/galeriPrestasi"
                                onClickLink={handleCloseMenu}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const LinkDropdown = ({ name, link, onClickLink }) => {
    return (
        <Link
            to={link}
            onClick={onClickLink}
            className="py-2 px-4 whitespace-nowrap hover:bg-smporange hover:text-white transition"
        >
            {name}
        </Link>
    );
};

export default DropdownMenu;
