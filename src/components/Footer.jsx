import { Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
    return (
        <div className="flex justify-between bg-smporange px-7 py-7 text-white">
            <div className="flex flex-col gap-3">
                <h2 className="font-bold text-2xl font-inter">SMP NEGERI 20 SEMARANG</h2>
                <p className="text-sm font-poppins font-normal max-w-md">
                    sekolah adalah tempat mencetak penerus bangsa yang berkualitas dan berprestasi
                    di segala bidang yang dapat bersaing di dunia internasional
                </p>
            </div>
            <div className="flex items-center gap-3">
                <a href="https://www.facebook.com/spekados.semarang" target="_blank">
                    <Facebook />
                </a>
                <a href="https://www.instagram.com/smpnegeri20semarang/" target="_blank">
                    <Instagram />
                </a>
                <a href="https://www.youtube.com/channel/UCWpVKY10zSTTdQHMqagFzUg" target="_blank">
                    <Youtube className="w-6 h-6 sm:w-8 sm:h-8" />
                </a>
            </div>
        </div>
    );
};

export default Footer;
