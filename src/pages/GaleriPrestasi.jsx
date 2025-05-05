const GaleriPrestasi = () => {
    return (
        <div className="flex flex-col items-center gap-16 px-4 py-12 font-poppins">
            <h1 className="font-bold text-center text-3xl md:text-4xl">
                Galeri Prestasi <span className="text-smporange">SMP Negeri 20 Semarang</span>
            </h1>

            <div className="w-full max-w-3xl flex flex-col gap-8">
                {dummyPrestasi.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden font-poppins"
                    >
                        <img
                            src={item.image}
                            alt="prestasi"
                            className="w-full md:w-56 md:h-56 object-cover"
                        />
                        <div className="flex flex-col items-start text-left p-4 gap-2 md:w-[calc(100%-14rem)]">
                            <p className="text-xs text-smpgray font-medium">{item.date}</p>
                            <p className="text-sm text-black font-medium">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const dummyPrestasi = [
    {
        id: 1,
        date: "12 Oktober 2024",
        image: "https://source.unsplash.com/600x400/?student,award",
        description:
            "Evan Tri Ananta Putra (Kelas 8A) meraih Juara 1 Kategori Laga kelas F Putra Pra Remaja dalam Kejuaraan Silat Festival Dji Pilka Kepada SMA Pangudi Luhur dan Basko Semarang Tahun 2024.",
    },
    {
        id: 2,
        date: "2 Oktober 2024",
        image: "https://source.unsplash.com/600x400/?silat,champion",
        description:
            "Damar Restu Gumilang (kelas 8D) meraih Juara Harapan I pada Kejuaraan Prestasi Pencak Silat Kota Semarang. Jatuh di tangan Wahyu Utami (kelas 8C) meraih Juara 2 Kategori TGR REMAJA PUTRI pada kejuaraan Pencak Silat Kota Wall Championship.",
    },
    {
        id: 3,
        date: "21 September 2024",
        image: "https://source.unsplash.com/600x400/?dance,student",
        description:
            "Athayya Khansa Pahladis S. (kelas 8B) dan Syarahatus Sabirin P. (kelas 9H) meraih Juara I pada LOMBA TARI GOLEK se-SMP TINGKAT KOTA SEMARANG.",
    },
    {
        id: 4,
        date: "9 Oktober 2024",
        image: "https://source.unsplash.com/600x400/?award,student",
        description:
            "Dinda Arinza Zevilla Renzi (kelas 8D) meraih Juara III Tanding Kelas C Putri Tingkat Pra Remaja pada Kejuaraan Pencak Silat Tugumuda Championship V Tingkat Nasional Tahun 2024.",
    },
];

export default GaleriPrestasi;
