import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

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
                        <LinkDropdown name="Profil Sekolah" link="profilSekolah" />
                        <LinkDropdown name="Visi & Misi" link="visiMisi" />
                        <LinkDropdown name="Profil Guru & Karyawan" link="profilGuruKaryawan" />
                        {/* <LinkDropdown name="Profil Siswa" link="" /> */}
                        <LinkDropdown name="Sarana & Prasarana" link="sarana" />
                        <LinkDropdown name="Struktur Organisasi" link="struktur" />
                        <LinkDropdown name="Prestasi" link="prestasi" />
                    </>
                ) : (
                    <>
                        <LinkDropdown name="Galeri Foto" link="galeriFoto" />
                        <LinkDropdown name="Galeri Video" link="galeriVideo" />
                        <LinkDropdown name="Galeri Prestasi Siswa" link="galeriPrestasi" />
                    </>
                )}
            </div>
        </>
    );
};

const LinkDropdown = ({ name, link }) => {
    return (
        <Link
            to={link}
            className="py-2 px-4 hover:bg-smporange hover:text-white transition-all duration-100"
        >
            {name}
        </Link>
    );
};

export default DropdownMenu;
