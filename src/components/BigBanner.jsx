import { Play, Facebook, Instagram, Youtube } from "lucide-react";
import BannerImage from "./BannerImage";

const BigBanner = () => {
    return (
        <div className="flex justify-center gap-35 mt-10 font-poppins">
            <div className="left flex flex-col justify-center gap-10">
                <h1 className="font-black text-6xl w-xl leading-20 text-left text-smporange">
                    SMP Negeri
                    <br />
                    20 SEMARANG
                </h1>
                <p className="font-medium max-w-xl text-xl text-smpgray leading-8.5">
                    Sekolah adalah tempat mencetak penerus bangsa <br />
                    yang berkualitas dan berprestasi di segala bidang <br />
                    yang dapat bersaing di dunia internasional
                </p>
                <div className="flex gap-7 mt-5">
                    <a
                        href=""
                        className="bg-smporange text-white px-9 py-3 rounded-full flex items-center gap-2 shadow-xl"
                    >
                        <p>Mars</p>
                        <Play />
                    </a>
                    <a
                        href=""
                        className=" text-smporange px-9 py-3 rounded-full flex items-center gap-2 shadow-xl border-2 border-smporange"
                    >
                        <p>Hymne</p>
                        <Play />
                    </a>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-xl font-inter font-medium">Sosial Media Kami:</p>
                    <div className="flex items-center gap-2">
                        <a href="">
                            <Facebook />
                        </a>
                        <a href="">
                            <Instagram />
                        </a>
                        <a href="">
                            <Youtube className="w-8 h-8" />
                        </a>
                    </div>
                </div>
            </div>
            <div>
                <BannerImage />
            </div>
        </div>
    );
};

export default BigBanner;
