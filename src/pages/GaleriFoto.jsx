import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPhotos } from "../services/photos";

const GaleriFoto = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const getAllPhotos = async () => {
            try {
                const data = await getPhotos();
                setPhotos(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        getAllPhotos();
    }, []);

    return (
        <div className="flex flex-col items-center gap-16 px-4 py-12 font-poppins">
            <div className="font-bold flex flex-col gap-7">
                <h1 className="text-center text-3xl sm:text-4xl">
                    Galeri Foto <span className="text-smporange">SMP Negeri 20 Semarang</span>
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {photos.map((data, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm mx-auto flex flex-col"
                    >
                        <img
                            src={data.thumbnail}
                            alt={data.title}
                            className="w-full h-[180px] object-cover"
                        />
                        <div className="p-4 flex flex-col justify-between flex-grow h-[180px]">
                            <div className="flex flex-col gap-1">
                                <p className="text-xs font-medium text-smpgray">{data.date}</p>
                                <p className="text-sm font-semibold text-black line-clamp-2">
                                    {data.title}
                                </p>
                            </div>
                            <Link
                                to={`/galeriFoto/${data.id}`}
                                className="mt-4 text-sm text-smporange font-semibold"
                            >
                                Lihat Detail
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GaleriFoto;
