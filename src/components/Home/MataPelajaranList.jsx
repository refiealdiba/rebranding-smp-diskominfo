const MataPelajaranList = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
            {MapelData.map((mapel, i) => (
                <div
                    key={i}
                    className="bg-smporange flex gap-3 text-lg items-center px-5 py-3 rounded-lg"
                >
                    <img src={mapel.icon} alt="" className="w-9" />
                    <p className="font-poppins font-bold text-sm text-white">{mapel.title}</p>
                </div>
            ))}
        </div>
    );
};

const MapelData = [
    {
        icon: "icon/agama.png",
        title: "Pendidikan Agama",
    },
    {
        icon: "icon/pkn.png",
        title: "PPKn",
    },
    {
        icon: "icon/indonesia.png",
        title: "Bahasa Indonesia",
    },
    {
        icon: "icon/ips.png",
        title: "Ilmu Pengetahuan Sosial",
    },
    {
        icon: "icon/inggris.png",
        title: "Bahasa Inggris",
    },
    {
        icon: "icon/prakarya.png",
        title: "Prakarya",
    },
    {
        icon: "icon/seni.png",
        title: "Seni Budaya",
    },
    {
        icon: "icon/mtk.png",
        title: "Matematika",
    },
    {
        icon: "icon/ipa.png",
        title: "Ilmu Pengetahuan Alam",
    },
    {
        icon: "icon/pjok.png",
        title: "PJOK",
    },
];

export default MataPelajaranList;
