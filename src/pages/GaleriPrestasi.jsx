import { useState, useEffect } from "react";
import { getAchivements } from "../services/achievements";
import formatDate from "../middleware/formatDate";
import cleanText from "../middleware/cleanText";

const GaleriPrestasi = () => {
    const [dataPrestasi, setDataPrestasi] = useState([]);

    useEffect(() => {
        const getAllAchivements = async () => {
            const prestasi = await getAchivements();
            setDataPrestasi(prestasi);
            console.log(prestasi);
        };
        getAllAchivements();
    }, []);

    return (
        <div className="flex flex-col items-center gap-12 px-4 py-12 font-poppins">
            <h1 className="font-bold text-center text-3xl md:text-4xl leading-snug">
                Galeri Prestasi <span className="text-smporange">SMP Negeri 20 Semarang</span>
            </h1>

            <div className="w-full max-w-2xl flex flex-col gap-8">
                {dataPrestasi.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden"
                    >
                        <div className="w-full md:w-48 h-60 md:h-48 shrink-0">
                            <img
                                src={item.photo}
                                alt="prestasi"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-start p-4 gap-2">
                            <p className="text-xs text-smpgray font-medium">
                                {formatDate(item.created_at)}
                            </p>
                            <p className="text-sm md:text-base text-black font-medium">
                                {cleanText(item.title)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GaleriPrestasi;
