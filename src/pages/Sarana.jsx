import SaranaCard from "../components/Sarana/SaranaCard";

const Sarana = () => {
    return (
        <div className="flex flex-col items-center gap-10 py-10">
            <h1 className="font-poppinsfont-bold text-4xl max-w-md text-center">
                Sarana dan Prasarana <span className="text-smporange">SMP Negeri 20 Semarang</span>
            </h1>
            <div className="grid grid-cols-2 gap-10 bg-white drop-shadow-2xl max-w-5xl px-5 py-7">
                {dataSarana.map((data, index) => (
                    <SaranaCard image={data.image} key={index} />
                ))}
            </div>
        </div>
    );
};

const dataSarana = [
    {
        image: "sarpras4.jpg",
    },
    {
        image: "sarpras7.jpg",
    },
    {
        image: "sarpras9.jpg",
    },
    {
        image: "sarpras10.jpg",
    },
    {
        image: "sarpras12.jpg",
    },
    {
        image: "sarpras13.jpg",
    },
    {
        image: "sarpras15.jpg",
    },
];

export default Sarana;
