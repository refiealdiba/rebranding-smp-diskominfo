import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPhotoById } from "../services/photos";

const GaleriFotoDetail = () => {
    const { id } = useParams();
    const [dataFoto, setDataFoto] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getPhotoById(id);
                setDataFoto(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, [id]);

    if (!dataFoto) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="flex flex-col items-center gap-10 py-10">
            <h1 className="font-poppins font-bold text-4xl max-w-md text-center">
                Galeri Foto <span className="text-smporange">SMP Negeri 20 Semarang</span>
            </h1>
            <div className="flex flex-col items-center bg-white drop-shadow-2xl max-w-5xl px-5 py-7 gap-7 font-inter font-semibold text-lg">
                <h2>{dataFoto.title}</h2>
                <div className="grid grid-cols-2 gap-10 px-5 py-7">
                    {dataFoto.photo_details.map((img, index) => (
                        <div key={index} className="w-full">
                            <img src={img.photo} alt={`Image ${index + 1}`} />
                        </div>
                    ))}
                </div>
                {/* <div className="flex justify-center">
                    <div className="w-full">
                        <img src={dataFoto.thumbnail} alt={dataFoto.title} />
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default GaleriFotoDetail;
