import { useEffect, useState } from "react";
import { getPhotoLatest } from "../../services/photos";
import { Link } from "react-router-dom";

const DokumentasiHomeList = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const getAllPhotos = async () => {
            try {
                const data = await getPhotoLatest(3);
                setPhotos(data);
            } catch (error) {
                console.error(error);
            }
        };

        getAllPhotos();
    }, []);

    return (
        <div className="w-full flex flex-col items-center gap-7 mt-5 font-poppins">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl px-3">
                {photos.map((photo) => (
                    <Link
                        key={photo.id}
                        to={`/galeriFoto/${photo.id}`}
                        className="relative rounded-md overflow-hidden shadow-md"
                    >
                        <img
                            src={photo.thumbnail}
                            alt={photo.title}
                            className="w-full h-80 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-black/40 text-white p-4 h-16 flex items-center">
                            <h3 className="font-bold text-base truncate w-full">{photo.title}</h3>
                        </div>
                    </Link>
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
