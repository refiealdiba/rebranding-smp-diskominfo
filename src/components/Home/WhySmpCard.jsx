const WhySmpCard = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center font-inter font-medium px-4">
            {cardData.map((card, index) => (
                <div
                    key={index}
                    className="group flex flex-col justify-between items-center py-11 gap-5 px-10 shadow-xl text-center hover:shadow-2xl hover:scale-105 transition duration-300 ease-in-out hover:bg-smporange hover:text-white rounded-xl "
                >
                    <img src={card.icon} alt="" className="w-16 h-16" />
                    <h1 className="text-xl font-semibold">{card.title}</h1>
                    <p
                        className="text-smpgray text-base group-hover:text-white transition duration-300 ease-in-out"
                        dangerouslySetInnerHTML={{ __html: card.description }}
                    />
                </div>
            ))}
        </div>
    );
};

const cardData = [
    {
        icon: "icon/computer.png",
        title: "Fasilitas Lengkap",
        description: "Penunjang belajar<br />dengan kualitas terbaik",
    },
    {
        icon: "icon/bank.png",
        title: "Lingkungan Nyaman",
        description: "Berada di lingkungan<br />yang nyaman dan asri",
    },
    {
        icon: "icon/team2.png",
        title: "Pengajar Kompeten",
        description: "Guru terbaik dengan<br />pengalaman",
    },
    {
        icon: "icon/team.png",
        title: "Kerja Sama Luas",
        description: "Dapat kesempatan kerja<br />yang lebih terjamin",
    },
];

export default WhySmpCard;
