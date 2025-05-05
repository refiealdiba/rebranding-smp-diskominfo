const GaleriVideo = () => {
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
                        <a href={data.link} target="_blank" rel="noopener noreferrer">
                            <img
                                src={getYouTubeThumbnail(data.link)}
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
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;

    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
};

const dataVideo = [
    {
        title: "IMPLEMENTASI P5 TEMA BHINNEKA TUNGGAL IKA SMPN 20 SEMARANG TAHUN 2022",
        link: "https://www.youtube.com/watch?v=Cx6WM1rQfVY",
    },
    {
        title: "PAMERAN PENDIDIKAN TAHUN 2022",
        link: "https://www.youtube.com/watch?v=RlSEmTFuUSE",
    },
    {
        title: "Penampilan Tari Semarangan Kelas 9 SMP Negeri 20 Semarang Tahun 2022",
        link: "https://www.youtube.com/watch?v=0fCopYtr5h8",
    },
];

export default GaleriVideo;
