const PrestasiList = () => {
    return (
        <div className="flex flex-col items-center max-w-4xl gap-10">
            {PrestasiData.map((prestasi, index) => (
                <div
                    key={index}
                    className="flex flex-col gap-3 font-inter bg-white drop-shadow-2xl rounded-2xl p-5"
                >
                    <h1 className="text-xl font-bold bg-smporange text-white w-max px-3 py-1 rounded-lg">
                        {prestasi.year}
                    </h1>
                    <ul className="list-disc px-5">
                        {prestasi.prestasis.map((prestasi, index) => (
                            <li key={index} className="font-medium text-sm text-smpblack">
                                {prestasi}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

const PrestasiData = [
    {
        year: 2022,
        prestasis: [
            "Juara II Kejuaraan Semarang Pencak Silat Open Championship (SPOC) Tingkat Nasional, September 2022",
            "Juara I Kejuaraan Nasional Wushu Surabaya, September 2022",
            "Juara III Lomba Seni Tari Tingkat SMP Sederajat DHC45 Kota Semarang, September 2022",
            "Juara I Lomba PBB Pramuka Putra & Juara II Lomba PBB Pramuka Putri, pada MILAD Ke - 21 SMA Islam Sultan Agung 3, November 2022",
            "Juara I Lomba Futsal SMP se-Kota Semarang, pada MILAD Ke - 21 SMA Islam Sultan Agung 3, November 2022",
            "Juara II dan III Lomba Sepakbola pada Peringatan HUT Angkatan Laut Kota Semarang K.U. 2009, November 2022",
            "Peringkat 4 dan 7 Kejuaraan Dunia Wushu 8th World Junior Wushu Championship Indonesia, Desember 2022",
        ],
    },
    {
        year: 2023,
        prestasis: [
            "Juara I Lomba Pencak Silat Piala Bergilir Kabupaten Demak, Januari 2023",
            "Juara II Lomba Futsal PELNUS 2 Futsal Cup, Mei 2023",
            "Meraih Piala Great Kota Semarang Kategori Baik Sekali pada Lomba PMR, dalam rangka Jumbara ke - 13 dan temukarya KSR, Juli 2023",
            "Juara Bina III Paskibra pada Lomba LKBB Berjaya 23, Oktober 2023",
            "Juara I, II, dan III pada Lomba Pencak Silat dalam Kejuaraan Demak Kota Wali Championship 1, Oktober 2023",
            "Juara I Pencak Silat Dewan Genuk Cup, Oktober 2023",
            "Juara III dan Harapan I Lomba Tari Tunggal Kreasi Nusantara di Java Mall Semarang, Oktober 2023",
            "Juara I Lomba Pencak Silat Open Championship (SPOC) Piala Ketua Umum IPSI dan Rektor USM Kelas Pra Remaja Tingkat Nasional, November 2023",
            "Juara III Lomba Tari Kreasi Tingkat Jawa Tengah di Sekolah Semesta, November 2023",
            "Juara III Lomba Futsal, pada MILAD Ke - 22 SMA Islam Sultan Agung 3, November 2023",
            "Juara I Lomba Tari Semarangan Tingkat Kota Semarang, Desember 2023",
        ],
    },
    {
        year: 2024,
        prestasis: [
            `Juara I Lomba Pionerring, Juara III LKBB (Regu Putra), dan Juara 2 Pionerring, Juara III Semaphore (Regu Putra) pada Lomba Pramuka Perayaan Hari Pelindung Sekolah "Don Bosco Care", Januari 2024`,
            `Juara Umum III Lomba Pramuka Lokagalang di SMK Tlogosari Semarang, Maret 2024`,
            `Juara II Lomba Tari Semarangan Tingkat SMP/sederajat se-Kota Semarang, April 2024`,
        ],
    },
];

export default PrestasiList;
