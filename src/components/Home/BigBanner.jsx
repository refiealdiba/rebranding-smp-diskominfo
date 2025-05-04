import { Play, Facebook, Instagram, Youtube } from "lucide-react";
import BannerImage from "./BannerImage";

const BigBanner = () => {
    return (
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 mt-10 font-poppins px-4">
            <div className="flex flex-col justify-center gap-6 lg:gap-10 text-center lg:text-left">
                <h1 className="font-black text-4xl sm:text-5xl lg:text-6xl text-smporange leading-tight">
                    SMP Negeri <br /> 20 SEMARANG
                </h1>

                <p className="font-medium text-base sm:text-lg lg:text-xl text-smpgray leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Sekolah adalah tempat mencetak penerus bangsa <br />
                    yang berkualitas dan berprestasi di segala bidang <br />
                    yang dapat bersaing di dunia internasional
                </p>

                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-7 mt-3">
                    <a
                        href=""
                        className="text-lg sm:text-xl bg-smporange text-white px-6 sm:px-9 py-3 rounded-full flex items-center justify-center gap-2 shadow-xl"
                    >
                        <p>Mars</p>
                        <Play />
                    </a>
                    <a
                        href=""
                        className="text-lg sm:text-xl text-smporange px-6 sm:px-9 py-3 rounded-full flex items-center justify-center gap-2 shadow-xl border-2 border-smporange"
                    >
                        <p>Hymne</p>
                        <Play />
                    </a>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4">
                    <p className="text-base sm:text-lg font-inter font-medium">
                        Sosial Media Kami:
                    </p>
                    <div className="flex items-center gap-3">
                        <a href="">
                            <Facebook />
                        </a>
                        <a href="">
                            <Instagram />
                        </a>
                        <a href="">
                            <Youtube className="w-6 h-6 sm:w-8 sm:h-8" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-10 lg:mt-0">
                <BannerImage />
            </div>
        </div>
    );
};

export default BigBanner;
