import BeritaBaruList from "./BeritaBaruList";
import { getArticles } from "../../services/articles";

const BeritaBaru = () => {
    const articleData = getArticles();

    return (
        <div className="flex flex-col items-center mt-20 gap-17 px-3 py-13">
            <div className="font-poppins font-bold flex flex-col gap-7">
                <h1 className="max-w-md text-center text-4xl">
                    Berita terbaru di <span className="text-smporange">SMP Negeri 20 Semarang</span>
                </h1>
                <p className="font-medium text-lg text-center text-smpgray font-poppins">
                    Berita Terbaru tentang SMP Negeri 20 Semarang
                </p>
            </div>
            <div>
                <BeritaBaruList />
            </div>
            <div>
                <a
                    href=""
                    className="font-inter font-bold text-base bg-smporange text-white px-7 py-4 rounded-full"
                >
                    Semua Berita
                </a>
            </div>
        </div>
    );
};

export default BeritaBaru;
