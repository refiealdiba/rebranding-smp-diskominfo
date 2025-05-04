const EkstrakulikulerList = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
            {EkskulData.map((ekskul, i) => (
                <div
                    key={i}
                    className="flex flex-col gap-3 justify-center items-center bg-white px-6 sm:px-10 lg:px-20 py-5 rounded-xl"
                >
                    <img src={ekskul.icon} alt="" className="w-13" />
                    <p className=" font-poppins font-bold tex-black text-2xl">
                        {ekskul.title.toUpperCase()}
                    </p>
                </div>
            ))}
        </div>
    );
};

const EkskulData = [
    {
        icon: "icon/pramuka.png",
        title: "pramuka",
    },
    {
        icon: "icon/pmr.png",
        title: "pmr",
    },
    {
        icon: "icon/paskib.png",
        title: "paskibra",
    },
    {
        icon: "icon/futsal.png",
        title: "futsal",
    },
];

export default EkstrakulikulerList;
