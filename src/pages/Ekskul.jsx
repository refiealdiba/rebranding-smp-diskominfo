import EkskulList from "../components/Ekskul/EkskulList";

const Ekskul = () => {
    return (
        <div className="flex flex-col items-center gap-12 px-4 py-10">
            <div className="font-poppins font-bold text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl">
                    Ekstrakurikuler <span className="text-smporange">SMP Negeri 20 Semarang</span>
                </h1>
            </div>
            <EkskulList />
        </div>
    );
};

export default Ekskul;
