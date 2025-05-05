import { useState, useEffect } from "react";
import { getVideos } from "../services/videos";

const GaleriVideo = () => {
    const [dataVideo, setDataVideo] = useState([]);

    useEffect(() => {
        const getAllVideos = async () => {
            const videos = await getVideos();
            setDataVideo(videos);
            console.log(videos);
        };
        getAllVideos();
    }, []);

    return (
        <div className="flex flex-col items-center gap-16 px-3 py-12">
            <div className="font-poppins font-bold flex flex-col gap-7">
                <h1 className="text-center text-4xl">
                    Galeri Video <span className="text-smporange">SMP Negeri 20 Semarang</span>
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {dataVideo.map((data, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg overflow-hidden w-[300px] mx-auto flex flex-col"
                    >
                        <a href={data.link_embed} target="_blank" rel="noopener noreferrer">
                            <img
                                src={getYouTubeThumbnail(data.link_embed)}
                                alt={data.title}
                                className="w-full h-[170px] object-cover"
                            />
                        </a>
                        <div className="p-3">
                            <p className="text-xs font-semibold text-black">{data.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const getYouTubeThumbnail = (url) => {
    const cleanUrl = url.trim(); // hapus spasi awal dan akhir
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = cleanUrl.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;

    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
};

export default GaleriVideo;
