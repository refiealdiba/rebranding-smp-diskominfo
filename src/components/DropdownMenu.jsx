import { useState } from "react";
import { ChevronRight } from "lucide-react";

const DropdownMenu = ({ menu }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleMouseEnter = () => {
        setIsClicked(!isClicked);
    };

    return (
        <>
            <div className="flex items-center gap-1" onClick={handleMouseEnter}>
                <p>{menu}</p>
                <ChevronRight
                    className={`w-5 h-5 ${isClicked ? "rotate-90" : ""} transition-all ease-in-out`}
                />
            </div>
            <div
                className={`absolute flex ${
                    isClicked
                        ? "opacity-100 translate-y-0 visible"
                        : "opacity-0 -translate-y-2 invisible"
                }  flex-col w-max shadow-md border-0.5 rounded-md mt-2 bg-white transition-all duration-300 ease-in-out`}
            >
                {menu === "Profil" ? (
                    <>
                        <LinkDropdown name="Profil Sekolah" link="" />
                        <LinkDropdown name="Visi & Misi" link="" />
                        <LinkDropdown name="Profil Guru & Karyawan" link="" />
                        <LinkDropdown name="Profil Siswa" link="" />
                        <LinkDropdown name="Sarana & Prasarana" link="" />
                        <LinkDropdown name="Struktur Organisasi" link="" />
                        <LinkDropdown name="Prestasi" link="" />
                    </>
                ) : (
                    <>
                        <LinkDropdown name="Galeri Foto" link="" />
                        <LinkDropdown name="Galeri Video" link="" />
                        <LinkDropdown name="Galeri Prestasi Siswa" link="" />
                    </>
                )}
            </div>
        </>
    );
};

const LinkDropdown = ({ name, link }) => {
    return (
        <a
            href={link}
            className="p-2 hover:bg-smporange hover:text-white transition-all duration-100"
        >
            {name}
        </a>
    );
};

export default DropdownMenu;
