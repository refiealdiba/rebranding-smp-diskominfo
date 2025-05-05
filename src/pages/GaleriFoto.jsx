import { Link } from "react-router-dom";

const GaleriFoto = () => {
    return (
        <div className="flex flex-col items-center gap-16 px-3 py-12 font-poppins">
            <div className="font-poppins font-bold flex flex-col gap-7">
                <h1 className="text-center text-4xl">
                    Galeri Foto <span className="text-smporange">SMP Negeri 20 Semarang</span>
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {dummyData.map((data, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg overflow-hidden w-[320px] mx-auto flex flex-col"
                    >
                        <img
                            src={data.images[0]} // Ambil gambar pertama
                            alt={data.title}
                            className="w-full h-[170px] object-cover"
                        />
                        <div className="p-4 flex flex-col justify-between h-full">
                            <div>
                                <p className="text-xs font-medium text-smpgray">{data.date}</p>
                                <p className="text-sm font-semibold text-black">{data.title}</p>
                            </div>
                            <Link
                                to={`/galeriFoto/${data.id}`}
                                className="mt-4 text-sm text-smporange font-semibold"
                            >
                                Lihat Semua
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const dummyData = [
    {
        id: 1,
        date: "25 Oktober 2024",
        title: "PELAKSANAAN KEGIATAN SERTIFIKASI PELAJAR BAHASA INGGRIS",
        images: [
            "https://source.unsplash.com/400x300/?classroom,student",
            "https://source.unsplash.com/400x300/?student",
        ],
        link: "#",
    },
    {
        id: 2,
        date: "23 Oktober 2024",
        title: "KUNJUNGAN TIM PENILAI LOMBA SEKOLAH SEHAT",
        images: [
            "https://source.unsplash.com/400x300/?school,visit",
            "https://source.unsplash.com/400x300/?teacher",
        ],
        link: "#",
    },
    {
        id: 3,
        date: "19 Oktober 2024",
        title: "LOMBA MATH TRAILS COMPETITION 2024",
        images: [
            "https://source.unsplash.com/400x300/?math,competition",
            "https://source.unsplash.com/400x300/?students,challenge",
        ],
        link: "#",
    },
    {
        id: 4,
        date: "10 Oktober 2024",
        title: "PENGUMUMAN LOMBA BULAN BAHASA DAN HUT",
        images: [
            "https://source.unsplash.com/400x300/?announcement,language",
            "https://source.unsplash.com/400x300/?speech",
        ],
        link: "#",
    },
    {
        id: 5,
        date: "2 Oktober 2024",
        title: "HARI BATIK 2024",
        images: [
            "https://source.unsplash.com/400x300/?batik,indonesia",
            "https://source.unsplash.com/400x300/?culture",
        ],
        link: "#",
    },
    {
        id: 6,
        date: "1 Oktober 2024",
        title: "KUNJUNGAN DARI PERPUSTAKAAN KELILING 2024",
        images: [
            "https://source.unsplash.com/400x300/?library,van",
            "https://source.unsplash.com/400x300/?books",
        ],
        link: "#",
    },
];

export default GaleriFoto;
