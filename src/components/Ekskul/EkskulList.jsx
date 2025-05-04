const EkskulList = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {EkskulData.map((ekskul, i) => (
                <div
                    key={i}
                    className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden"
                >
                    <div className="bg-smporange flex items-center gap-2 text-white px-4 py-3">
                        <img src={ekskul.icon} alt={ekskul.title} className="w-6 h-6" />
                        <p className="font-poppins font-bold text-base sm:text-lg">
                            {ekskul.title}
                        </p>
                    </div>
                    <img
                        src={ekskul.image}
                        alt={ekskul.title}
                        className="w-full h-auto object-cover rounded-md p-2"
                    />
                </div>
            ))}
        </div>
    );
};

const EkskulData = [
    {
        image: "ekskulPramuka.jpg",
        icon: "icon/pramuka.png",
        title: "Pramuka (Praja Muda Karana)",
    },
    {
        image: "ekskulPmr.jpg",
        icon: "icon/pmr.png",
        title: "PMR (Palang Merah Remaja)",
    },
    {
        image: "ekskulPaskibra.jpg",
        icon: "icon/paskib.png",
        title: "Paskibra (Pasukan Pengibar Bendera)",
    },
    {
        image: "ekskulFutsal.jpg",
        icon: "icon/futsal.png",
        title: "Futsal",
    },
];

export default EkskulList;
