import { useEffect, useState } from "react";
import { getPhotos } from "../../services/photos";
import { Link } from "react-router-dom";

const DokumentasiHomeList = () => {
    const [photos, setPhotos] = useState([]);

    // useEffect(() => {
    //     // Ganti dengan `getPhotos()` kalau sudah pakai API.
    //     setPhotos(getPhotos());
    // }, []);

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
        <div className="w-full flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl">
                {photos.map((photo) => (
                    <div key={photo.id} className="relative rounded-md overflow-hidden shadow-md">
                        <img
                            src={photo.image}
                            alt={photo.title}
                            className="w-full h-80 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-black/40 text-white p-4">
                            <h3 className="font-semibold text-lg">{photo.title}</h3>
                            <p className="text-sm">{photo.location}</p>
                            <p className="text-sm">{photo.city}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <Link
                    to="/galeriFoto"
                    className="font-inter font-bold text-base bg-smporange text-white px-7 py-4 rounded-full"
                >
                    Semua Foto
                </Link>
            </div>
        </div>
    );
};

export default DokumentasiHomeList;
